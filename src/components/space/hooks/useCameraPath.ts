"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { registerGsapPlugins } from "@/lib/motion";

export const SECTION_IDS = ["hero", "about", "skills", "projects", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

interface CameraStop {
  position: [number, number, number];
  lookAt: [number, number, number];
}

/** Five stops, one per section. The camera floats toward each as you scroll. */
const CAMERA_STOPS: Record<SectionId, CameraStop> = {
  hero: { position: [0, 0.6, 13], lookAt: [0, 0.2, 0] },
  about: { position: [2.8, 1, 3], lookAt: [-2, 0.6, -8] },
  skills: { position: [-2.6, -0.4, -5], lookAt: [2, 0.2, -17] },
  projects: { position: [2.4, 1.2, -11], lookAt: [-2.6, -1.2, -23] },
  contact: { position: [0, 1.6, -17], lookAt: [0, -0.4, -33] },
};

function isSectionId(value: string): value is SectionId {
  return (SECTION_IDS as readonly string[]).includes(value);
}

/**
 * Drives the camera with a scrubbed GSAP timeline over the whole journey, then
 * damps toward the timeline's value every frame so the motion never snaps.
 * Also reports which section currently owns the viewport.
 */
export function useCameraPath(reducedMotion: boolean): SectionId {
  const { camera } = useThree();
  const [currentSection, setCurrentSection] = useState<SectionId>("hero");

  const basePosition = useRef(new THREE.Vector3(...CAMERA_STOPS.hero.position));
  const targetPosition = useRef(new THREE.Vector3(...CAMERA_STOPS.hero.position));
  const baseLookAt = useRef(new THREE.Vector3(...CAMERA_STOPS.hero.lookAt));
  const targetLookAt = useRef(new THREE.Vector3(...CAMERA_STOPS.hero.lookAt));

  useEffect(() => {
    camera.position.copy(basePosition.current);
    camera.lookAt(baseLookAt.current);
  }, [camera]);

  // Active section for the dot navigation. A narrow band in the middle of the
  // viewport decides; sections are taller than the screen, so ratios alone lie.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible || !isSectionId(visible.target.id)) return;
        setCurrentSection(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      basePosition.current.set(...CAMERA_STOPS.hero.position);
      targetPosition.current.set(...CAMERA_STOPS.hero.position);
      baseLookAt.current.set(...CAMERA_STOPS.hero.lookAt);
      targetLookAt.current.set(...CAMERA_STOPS.hero.lookAt);
      camera.position.copy(basePosition.current);
      camera.lookAt(baseLookAt.current);
      return;
    }

    registerGsapPlugins();

    const journey = document.getElementById("journey") ?? document.body;
    const timeline = gsap.timeline({
      defaults: { duration: 1, ease: "power1.inOut" },
      scrollTrigger: {
        trigger: journey,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    SECTION_IDS.slice(1).forEach((id, index) => {
      const stop = CAMERA_STOPS[id];
      timeline.to(
        targetPosition.current,
        { x: stop.position[0], y: stop.position[1], z: stop.position[2] },
        index,
      );
      timeline.to(
        targetLookAt.current,
        { x: stop.lookAt[0], y: stop.lookAt[1], z: stop.lookAt[2] },
        index,
      );
    });

    // Section heights depend on fonts and layout; measure once painting settles.
    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshFrame);
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [camera, reducedMotion]);

  useFrame((state, delta) => {
    const damping = 3.2;

    basePosition.current.x = THREE.MathUtils.damp(
      basePosition.current.x,
      targetPosition.current.x,
      damping,
      delta,
    );
    basePosition.current.y = THREE.MathUtils.damp(
      basePosition.current.y,
      targetPosition.current.y,
      damping,
      delta,
    );
    basePosition.current.z = THREE.MathUtils.damp(
      basePosition.current.z,
      targetPosition.current.z,
      damping,
      delta,
    );

    baseLookAt.current.x = THREE.MathUtils.damp(
      baseLookAt.current.x,
      targetLookAt.current.x,
      damping,
      delta,
    );
    baseLookAt.current.y = THREE.MathUtils.damp(
      baseLookAt.current.y,
      targetLookAt.current.y,
      damping,
      delta,
    );
    baseLookAt.current.z = THREE.MathUtils.damp(
      baseLookAt.current.z,
      targetLookAt.current.z,
      damping,
      delta,
    );

    // A slow bob keeps the frame from feeling locked to a tripod.
    const bob = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.22) * 0.09;

    camera.position.set(
      basePosition.current.x,
      basePosition.current.y + bob,
      basePosition.current.z,
    );
    camera.lookAt(baseLookAt.current.x, baseLookAt.current.y + bob * 0.4, baseLookAt.current.z);
  });

  return currentSection;
}
