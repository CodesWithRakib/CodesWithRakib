"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useCameraPath, type SectionId } from "./hooks/useCameraPath";
import { useMouseParallax } from "./hooks/useMouseParallax";
import { usePageVisible, useReducedQuality } from "./hooks/useReducedQuality";
import { AsteroidField } from "./objects/AsteroidField";
import { Nebula } from "./objects/Nebula";
import { OrbitingMoon } from "./objects/OrbitingMoon";
import { Planet } from "./objects/Planet";
import { Starfield } from "./objects/Starfield";

interface SpacePalette {
  bg: string;
  accent: string;
  accent2: string;
}

export interface SpaceSceneProps {
  onSectionChange?: (section: SectionId) => void;
}

const HERO_CAMERA: [number, number, number] = [0, 0.6, 13];

/**
 * The accents and background come from the shared tokens at runtime, so this
 * theme never hardcodes a colour. There is no theme toggle here, which is why
 * reading once on mount is enough.
 */
function readPalette(): SpacePalette {
  if (typeof document === "undefined") {
    return { bg: "black", accent: "white", accent2: "white" };
  }

  const styles = getComputedStyle(document.documentElement);
  const read = (token: string, fallback: string) =>
    styles.getPropertyValue(token).trim() || fallback;

  return {
    bg: read("--bg", "black"),
    accent: read("--accent", "white"),
    accent2: read("--accent-2", "white"),
  };
}

/**
 * Fixed, aria-hidden canvas behind the page. It is dynamically imported with
 * `ssr: false`, so it never blocks first paint or search indexing.
 */
export function SpaceScene({ onSectionChange }: SpaceSceneProps) {
  const [palette] = useState<SpacePalette>(readPalette);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const lowQuality = useReducedQuality();
  const pageVisible = usePageVisible();

  return (
    <div className="space-canvas" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: HERO_CAMERA, fov: 52, near: 0.1, far: 220 }}
        frameloop={pageVisible ? "always" : "never"}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={[palette.bg]} />
        <fog attach="fog" args={[palette.bg, 26, 96]} />

        <Suspense fallback={null}>
          <JourneyScene
            palette={palette}
            lowQuality={lowQuality}
            reducedMotion={reducedMotion}
            onSectionChange={onSectionChange}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

interface JourneySceneProps {
  palette: SpacePalette;
  lowQuality: boolean;
  reducedMotion: boolean;
  onSectionChange?: (section: SectionId) => void;
}

function JourneyScene({ palette, lowQuality, reducedMotion, onSectionChange }: JourneySceneProps) {
  const currentSection = useCameraPath(reducedMotion);
  const pointer = useMouseParallax(reducedMotion ? 0 : 0.14);
  const backgroundRef = useRef<THREE.Group>(null);

  useEffect(() => {
    onSectionChange?.(currentSection);
  }, [currentSection, onSectionChange]);

  // The background drifts against the pointer; planets stay on their own path.
  useFrame((_, delta) => {
    if (!backgroundRef.current) return;
    backgroundRef.current.position.x = THREE.MathUtils.damp(
      backgroundRef.current.position.x,
      pointer.current.x * 4,
      1.6,
      delta,
    );
    backgroundRef.current.position.y = THREE.MathUtils.damp(
      backgroundRef.current.position.y,
      pointer.current.y * 2.5,
      1.6,
      delta,
    );
  });

  const starCount = lowQuality ? 1000 : 3000;
  const nebulaCount = lowQuality ? 2 : 4;
  const asteroidCount = lowQuality ? 6 : 10;

  return (
    <>
      <ambientLight intensity={0.42} />
      <directionalLight position={[8, 10, 6]} intensity={1.15} color={palette.accent} />
      <pointLight position={[-7, -3, -10]} intensity={38} distance={55} color={palette.accent2} />

      <group ref={backgroundRef}>
        <Starfield
          count={starCount}
          accent={palette.accent}
          accent2={palette.accent2}
          reducedMotion={reducedMotion}
        />
        <Nebula
          count={nebulaCount}
          accent={palette.accent}
          accent2={palette.accent2}
          reducedMotion={reducedMotion}
        />
      </group>

      <Planet
        position={[6.2, 3.4, -10]}
        radius={1.9}
        color={palette.accent}
        rotationSpeed={0.035}
        seed={3}
      />
      <OrbitingMoon
        center={[6.2, 3.4, -10]}
        orbitRadius={3.1}
        size={0.26}
        color={palette.accent2}
        reducedMotion={reducedMotion}
      />
      <Planet
        position={[8.6, -4.4, -28]}
        radius={2.7}
        color={palette.accent2}
        hasRing
        rotationSpeed={0.02}
        seed={8}
      />
      <AsteroidField count={asteroidCount} color={palette.accent} reducedMotion={reducedMotion} />
    </>
  );
}
