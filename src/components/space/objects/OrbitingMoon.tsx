"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OrbitingMoonProps {
  center: [number, number, number];
  orbitRadius: number;
  size: number;
  color: string;
  speed?: number;
  reducedMotion?: boolean;
}

/** One sphere, one rotation: the cheapest way to add scale to a planet. */
export function OrbitingMoon({
  center,
  orbitRadius,
  size,
  color,
  speed = 0.12,
  reducedMotion = false,
}: OrbitingMoonProps) {
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reducedMotion || !orbitRef.current) return;
    orbitRef.current.rotation.y += delta * speed;
  });

  return (
    <group position={center} rotation={[0.38, 0, 0.16]}>
      <group ref={orbitRef}>
        <mesh position={[orbitRadius, 0, 0]}>
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial
            color={color}
            roughness={1}
            emissive={color}
            emissiveIntensity={0.12}
          />
        </mesh>
      </group>
    </group>
  );
}
