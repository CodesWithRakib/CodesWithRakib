"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface Palette {
  slabs: [string, string, string, string];
  accent: string;
  line: string;
  shadow: string;
  ambient: number;
  key: number;
}

const PALETTES: Record<"light" | "dark", Palette> = {
  light: {
    slabs: ["#f8f4ea", "#eae3d5", "#d9d1c0", "#c9bfab"],
    accent: "#1b2ae0",
    line: "#bdb3a0",
    shadow: "#2a2418",
    ambient: 1.15,
    key: 2.4,
  },
  dark: {
    slabs: ["#3a3c45", "#31333b", "#282a31", "#1f2026"],
    accent: "#8f9bff",
    line: "#4a4d59",
    shadow: "#000000",
    ambient: 0.55,
    key: 1.6,
  },
};

const SLABS = Array.from({ length: 11 }, (_, index) => {
  const progress = index / 10;
  return {
    width: 3.2 - progress * 0.8,
    depth: 2.15 + progress * 0.55,
    height: 0.14,
    y: 1.35 - index * 0.27,
    rotation: -0.5 + index * 0.088,
    offsetZ: (index % 2 === 0 ? 1 : -1) * 0.035,
    accent: index === 5,
  };
});

function Sculpture({ theme }: { theme: "light" | "dark" }) {
  const group = React.useRef<THREE.Group>(null);
  const palette = PALETTES[theme];

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) return;

    const targetY = -0.38 + state.pointer.x * 0.3;
    const targetX = 0.04 - state.pointer.y * 0.16;

    node.rotation.y = THREE.MathUtils.damp(
      node.rotation.y,
      targetY,
      4.5,
      delta
    );
    node.rotation.x = THREE.MathUtils.damp(
      node.rotation.x,
      targetX,
      4.5,
      delta
    );
  });

  return (
    <>
      <ambientLight intensity={palette.ambient} />
      <directionalLight
        position={[4.5, 6, 5]}
        intensity={palette.key}
        color={theme === "dark" ? "#cfd4ff" : "#fff6e6"}
      />
      <directionalLight
        position={[-4, -2, 3]}
        intensity={theme === "dark" ? 0.5 : 0.7}
        color={theme === "dark" ? "#6f79c9" : "#c9d0ff"}
      />
      <pointLight
        position={[0.2, -0.4, 1.4]}
        intensity={theme === "dark" ? 14 : 8}
        distance={6}
        color={palette.accent}
      />

      <group ref={group} position={[0, 0.05, 0]} rotation={[-0.02, -0.38, 0.02]}>
        <Float
          speed={1.1}
          rotationIntensity={0.12}
          floatIntensity={0.45}
          floatingRange={[-0.04, 0.06]}
        >
          {SLABS.map((slab, index) => (
            <RoundedBox
              key={index}
              args={[slab.width, slab.height, slab.depth]}
              radius={0.055}
              smoothness={4}
              position={[slab.offsetZ * 2, slab.y, slab.offsetZ]}
              rotation={[0, slab.rotation, Math.sin(index) * 0.012]}
            >
              <meshStandardMaterial
                color={slab.accent ? palette.accent : palette.slabs[index % 4]}
                roughness={slab.accent ? 0.35 : 0.58}
                metalness={slab.accent ? 0.2 : 0.08}
                emissive={slab.accent ? palette.accent : "#000000"}
                emissiveIntensity={slab.accent ? 0.14 : 0}
              />
            </RoundedBox>
          ))}
        </Float>

        <mesh position={[0, 0, -2.1]} rotation={[0.05, 0, 0]}>
          <ringGeometry args={[2.28, 2.29, 128]} />
          <meshBasicMaterial
            color={palette.line}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0, -2.35]} rotation={[0.05, 0, 0]}>
          <ringGeometry args={[2.66, 2.67, 128]} />
          <meshBasicMaterial
            color={palette.line}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      <ContactShadows
        position={[0, -1.95, 0]}
        opacity={theme === "dark" ? 0.55 : 0.32}
        scale={8}
        blur={2.6}
        far={4}
        color={palette.shadow}
      />
    </>
  );
}

export function StackSculpture({
  theme,
  active,
}: {
  theme: "light" | "dark";
  active: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.15, 7.2], fov: 30 }}
      frameloop={active ? "always" : "never"}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ touchAction: "pan-y" }}
      aria-hidden="true"
    >
      <Sculpture theme={theme} />
    </Canvas>
  );
}
