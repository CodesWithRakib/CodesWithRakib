"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";

type Palette = {
  panel: string;
  chrome: string;
  line: string;
  ink: string;
  accent: string;
  secondary: string;
  screen: string;
  dark: boolean;
};

const FALLBACK: Palette = {
  panel: "#fbf6ec",
  chrome: "#e9e0cf",
  line: "#cbbda6",
  ink: "#2a241c",
  accent: "#a63e14",
  secondary: "#3c5a46",
  screen: "#f6f0e4",
  dark: false,
};

function readPalette(): Palette {
  if (typeof window === "undefined") return FALLBACK;
  const styles = getComputedStyle(document.documentElement);
  const read = (token: string, fallback: string) =>
    styles.getPropertyValue(token).trim() || fallback;

  return {
    panel: read("--scene-panel", FALLBACK.panel),
    chrome: read("--scene-chrome", FALLBACK.chrome),
    line: read("--scene-line", FALLBACK.line),
    ink: read("--scene-ink", FALLBACK.ink),
    accent: read("--scene-accent", FALLBACK.accent),
    secondary: read("--scene-secondary", FALLBACK.secondary),
    screen: read("--scene-screen", FALLBACK.screen),
    dark: document.documentElement.classList.contains("dark"),
  };
}

function Bar({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.7} metalness={0.05} />
    </mesh>
  );
}

function BrowserPanel({
  palette,
  position,
  rotation,
  scale = 1,
  compact = false,
}: {
  palette: Palette;
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  compact?: boolean;
}) {
  const width = compact ? 2.35 : 4.5;
  const height = compact ? 1.55 : 2.9;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <RoundedBox
        args={[width, height, 0.1]}
        radius={0.09}
        smoothness={4}
        castShadow={false}
      >
        <meshStandardMaterial
          color={palette.panel}
          emissive={palette.dark ? palette.chrome : "#000000"}
          emissiveIntensity={palette.dark ? 0.55 : 0}
          roughness={0.52}
          metalness={0.18}
        />
      </RoundedBox>

      {/* Window chrome */}
      <Bar
        position={[0, height / 2 - 0.17, 0.06]}
        size={[width - 0.06, 0.3, 0.02]}
        color={palette.chrome}
      />
      {[-width / 2 + 0.2, -width / 2 + 0.33, -width / 2 + 0.46].map(
        (x, index) => (
          <mesh key={x} position={[x, height / 2 - 0.17, 0.08]}>
            <circleGeometry args={[0.035, 20]} />
            <meshStandardMaterial
              color={index === 0 ? palette.accent : palette.line}
              roughness={0.6}
            />
          </mesh>
        )
      )}

      {compact ? (
        <group>
          <Bar
            position={[0, 0.22, 0.07]}
            size={[width - 0.5, 0.09, 0.015]}
            color={palette.ink}
          />
          <Bar
            position={[-0.3, 0.04, 0.07]}
            size={[width - 1.1, 0.045, 0.012]}
            color={palette.line}
          />
          <Bar
            position={[-0.45, -0.06, 0.07]}
            size={[width - 1.4, 0.045, 0.012]}
            color={palette.line}
          />
          <mesh position={[-width / 2 + 0.35, -0.35, 0.07]}>
            <circleGeometry args={[0.11, 28]} />
            <meshStandardMaterial
              color={palette.accent}
              emissive={palette.accent}
              emissiveIntensity={palette.dark ? 0.55 : 0.12}
              roughness={0.4}
            />
          </mesh>
          <Bar
            position={[0.35, -0.35, 0.06]}
            size={[width - 1.2, 0.055, 0.012]}
            color={palette.line}
          />
        </group>
      ) : (
        <group>
          {/* Sidebar */}
          <Bar
            position={[-width / 2 + 0.4, -0.1, 0.07]}
            size={[0.5, height - 0.85, 0.02]}
            color={palette.chrome}
          />
          {[0.72, 0.42, 0.12, -0.18].map((y, index) => (
            <Bar
              key={y}
              position={[-width / 2 + 0.4, y, 0.09]}
              size={[0.24, 0.045, 0.01]}
              color={index === 0 ? palette.accent : palette.line}
            />
          ))}

          {/* Content heading */}
          <Bar
            position={[0.55, 0.96, 0.07]}
            size={[2.6, 0.14, 0.015]}
            color={palette.ink}
          />
          <Bar
            position={[0.25, 0.78, 0.07]}
            size={[2.0, 0.055, 0.012]}
            color={palette.line}
          />

          {/* Interface tiles */}
          <RoundedBox
            args={[1.55, 0.78, 0.05]}
            radius={0.04}
            smoothness={3}
            position={[-0.36, 0.22, 0.08]}
          >
            <meshStandardMaterial
              color={palette.screen}
              roughness={0.75}
              metalness={0.05}
            />
          </RoundedBox>
          <Bar
            position={[-0.7, 0.38, 0.12]}
            size={[0.65, 0.055, 0.01]}
            color={palette.ink}
          />
          <Bar
            position={[-0.62, 0.24, 0.12]}
            size={[0.95, 0.035, 0.01]}
            color={palette.line}
          />
          <Bar
            position={[-0.82, 0.08, 0.12]}
            size={[0.4, 0.035, 0.01]}
            color={palette.accent}
          />

          <RoundedBox
            args={[1.55, 0.78, 0.05]}
            radius={0.04}
            smoothness={3}
            position={[1.36, 0.22, 0.08]}
          >
            <meshStandardMaterial
              color={palette.chrome}
              roughness={0.7}
              metalness={0.08}
            />
          </RoundedBox>
          {[0.42, 0.29, 0.16].map((y, index) => (
            <Bar
              key={y}
              position={[1.2 + index * 0.15, y, 0.12]}
              size={[0.12 + index * 0.18, 0.04, 0.01]}
              color={index === 0 ? palette.secondary : palette.line}
            />
          ))}

          {/* Wide chart strip */}
          <RoundedBox
            args={[3.3, 0.9, 0.05]}
            radius={0.04}
            smoothness={3}
            position={[0.5, -0.62, 0.08]}
          >
            <meshStandardMaterial
              color={palette.screen}
              roughness={0.78}
              metalness={0.04}
            />
          </RoundedBox>
          {[0.2, 0.4, 0.28, 0.52, 0.34, 0.62, 0.44].map((bar, index) => (
            <Bar
              key={index}
              position={[-0.55 + index * 0.27, -0.88 + bar / 2, 0.12]}
              size={[0.11, bar, 0.02]}
              color={index === 5 ? palette.accent : palette.line}
            />
          ))}
          <Bar
            position={[1.65, -0.3, 0.12]}
            size={[0.65, 0.04, 0.01]}
            color={palette.ink}
          />
          <Bar
            position={[1.55, -0.42, 0.12]}
            size={[0.45, 0.035, 0.01]}
            color={palette.line}
          />
        </group>
      )}

      {/* Screen edge highlight */}
      <mesh position={[0, 0, 0.055]}>
        <planeGeometry args={[width - 0.08, height - 0.08]} />
        <meshBasicMaterial color={palette.panel} transparent opacity={0.02} />
      </mesh>
    </group>
  );
}

function AtlasGroup({ palette }: { palette: Palette }) {
  const group = React.useRef<THREE.Group>(null);
  const { viewport, pointer } = useThree();

  const responsiveScale = Math.min(1.02, Math.max(0.7, viewport.width / 7.6));

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      pointer.x * 0.24,
      3,
      delta
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      pointer.y * -0.15,
      3,
      delta
    );
  });

  return (
    <group ref={group} scale={responsiveScale}>
      {/* Ruled backdrop, echoing the editorial grid */}
      <group position={[0, 0, -1.8]}>
        {[-2.7, -1.35, 0, 1.35, 2.7].map((x) => (
          <mesh key={x} position={[x, 0, 0]}>
            <boxGeometry args={[0.006, 5.6, 0.006]} />
            <meshStandardMaterial
              color={palette.line}
              transparent
              opacity={0.45}
              roughness={1}
            />
          </mesh>
        ))}
      </group>

      <mesh position={[-2.15, -1.15, -1.15]} rotation={[0.35, 0.2, 0.5]}>
        <torusGeometry args={[0.62, 0.008, 12, 64]} />
        <meshStandardMaterial
          color={palette.secondary}
          emissive={palette.secondary}
          emissiveIntensity={palette.dark ? 0.7 : 0.12}
          roughness={0.4}
        />
      </mesh>

      <Float
        speed={1.1}
        rotationIntensity={0.18}
        floatIntensity={0.32}
        floatingRange={[-0.04, 0.07]}
      >
        <BrowserPanel
          palette={palette}
          position={[0, 0, 0.15]}
          rotation={[-0.03, -0.1, 0]}
        />
      </Float>

      <Float
        speed={1.4}
        rotationIntensity={0.22}
        floatIntensity={0.4}
        floatingRange={[-0.06, 0.06]}
      >
        <BrowserPanel
          palette={palette}
          position={[-1.72, 0.78, -0.85]}
          rotation={[0.06, 0.32, -0.05]}
          scale={0.62}
          compact
        />
      </Float>

      <Float
        speed={1.2}
        rotationIntensity={0.2}
        floatIntensity={0.36}
        floatingRange={[-0.05, 0.08]}
      >
        <BrowserPanel
          palette={palette}
          position={[1.9, -0.85, -0.55]}
          rotation={[-0.04, -0.36, 0.04]}
          scale={0.55}
          compact
        />
      </Float>

      {/* Single luminous cursor node — the only continuous light in the scene */}
      <group position={[2.05, 0.95, 0.55]}>
        <mesh>
          <sphereGeometry args={[0.062, 24, 24]} />
          <meshStandardMaterial
            color={palette.accent}
            emissive={palette.accent}
            emissiveIntensity={palette.dark ? 2.4 : 0.75}
            roughness={0.25}
          />
        </mesh>
        <pointLight
          color={palette.accent}
          intensity={palette.dark ? 5 : 2.2}
          distance={2.6}
          decay={2}
        />
      </group>
    </group>
  );
}

export default function InterfaceAtlas() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [palette, setPalette] = React.useState<Palette>(() => readPalette());
  const [inView, setInView] = React.useState(true);
  const [pageVisible, setPageVisible] = React.useState(true);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const refresh = () => setPalette(readPalette());

    const observer = new MutationObserver(refresh);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    media.addEventListener("change", refresh);
    refresh();

    return () => {
      observer.disconnect();
      media.removeEventListener("change", refresh);
    };
  }, []);

  React.useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(element);

    const handleVisibility = () =>
      setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const active = inView && pageVisible;

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 7.4], fov: 38 }}
        dpr={[1, 1.75]}
        frameloop={active ? "always" : "demand"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.setClearColor(0x000000, 0);
        }}
        aria-hidden="true"
      >
        <ambientLight intensity={palette.dark ? 1.25 : 0.85} />
        <directionalLight
          position={[4, 5, 6]}
          intensity={palette.dark ? 2.6 : 1.9}
          color={palette.dark ? "#ffe6bd" : "#fff6e8"}
        />
        <directionalLight
          position={[-4, -2, 3]}
          intensity={palette.dark ? 1.4 : 0.55}
          color={palette.secondary}
        />
        <directionalLight
          position={[-2, 4, -4]}
          intensity={palette.dark ? 1.1 : 0.45}
          color={palette.accent}
        />
        <AtlasGroup palette={palette} />
      </Canvas>
    </div>
  );
}
