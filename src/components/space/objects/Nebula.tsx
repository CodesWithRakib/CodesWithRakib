"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNebulaTexture } from "../textures";

interface NebulaProps {
  count: number;
  accent: string;
  accent2: string;
  reducedMotion: boolean;
}

const PLACEMENTS: Array<{ position: [number, number, number]; size: number; opacity: number }> = [
  { position: [-22, 9, -52], size: 42, opacity: 0.28 },
  { position: [24, -7, -58], size: 52, opacity: 0.22 },
  { position: [-4, 15, -68], size: 60, opacity: 0.18 },
  { position: [12, 6, -44], size: 30, opacity: 0.24 },
];

/** Soft additive planes far behind the planets; cheap atmosphere for the void. */
export function Nebula({ count, accent, accent2, reducedMotion }: NebulaProps) {
  const groupRef = useRef<THREE.Group>(null);

  const clouds = useMemo(
    () =>
      PLACEMENTS.slice(0, count).map((placement, index) => ({
        ...placement,
        texture: createNebulaTexture(21 + index * 13),
        tint: index % 2 === 0 ? accent : accent2,
      })),
    [count, accent, accent2],
  );

  useEffect(
    () => () => {
      clouds.forEach((cloud) => cloud.texture.dispose());
    },
    [clouds],
  );

  useFrame((state, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.03) * 0.04;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.8;
    groupRef.current.rotation.y += delta * 0.002;
  });

  return (
    <group ref={groupRef}>
      {clouds.map((cloud, index) => (
        <mesh key={index} position={cloud.position}>
          <planeGeometry args={[cloud.size, cloud.size]} />
          <meshBasicMaterial
            map={cloud.texture}
            color={cloud.tint}
            transparent
            opacity={cloud.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
