"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createRandom } from "../textures";

interface StarfieldProps {
  count: number;
  accent: string;
  accent2: string;
  reducedMotion: boolean;
}

/** 3000 stars as a single Points draw call (1000 on constrained devices). */
export function Starfield({ count, accent, accent2, reducedMotion }: StarfieldProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { positions, colors } = useMemo(() => {
    const random = createRandom(1337);
    const positionArray = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    // Mostly white with a few tinted stars; a full accent palette reads as confetti.
    const white = new THREE.Color("white");
    const violet = new THREE.Color(accent);
    const cyan = new THREE.Color(accent2);

    for (let index = 0; index < count; index += 1) {
      // A shell around the flight path rather than a flat wall of dots.
      const radius = 30 + random() * 44;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);

      positionArray[index * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      positionArray[index * 3 + 1] = Math.cos(phi) * radius * 0.62;
      positionArray[index * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius - 22;

      const roll = random();
      const tint = roll < 0.6 ? white : roll < 0.82 ? violet : cyan;
      const brightness = 0.3 + random() * 0.65;
      colorArray[index * 3] = tint.r * brightness;
      colorArray[index * 3 + 1] = tint.g * brightness;
      colorArray[index * 3 + 2] = tint.b * brightness;
    }

    return { positions: positionArray, colors: colorArray };
  }, [count, accent, accent2]);

  const geometry = useMemo(() => {
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    buffer.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return buffer;
  }, [positions, colors]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    // Barely-there drift; the camera does the travelling.
    groupRef.current.rotation.y += delta * 0.006;
    groupRef.current.rotation.x = Math.sin(groupRef.current.rotation.y * 0.4) * 0.02;
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry} frustumCulled={false}>
        <pointsMaterial
          size={0.075}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.92}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
