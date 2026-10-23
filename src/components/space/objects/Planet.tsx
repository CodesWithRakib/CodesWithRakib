"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createPlanetTexture, createRingTexture } from "../textures";

interface PlanetProps {
  position: [number, number, number];
  radius: number;
  /** Any CSS colour value, normally a theme accent token. */
  color: string;
  emissive?: string;
  hasRing?: boolean;
  hasAtmosphere?: boolean;
  rotationSpeed?: number;
  seed?: number;
}

export function Planet({
  position,
  radius,
  color,
  emissive,
  hasRing = false,
  hasAtmosphere = true,
  rotationSpeed = 0.04,
  seed = 1,
}: PlanetProps) {
  const spinRef = useRef<THREE.Mesh>(null);

  const surface = useMemo(() => createPlanetTexture(color, seed), [color, seed]);
  useEffect(() => () => surface.dispose(), [surface]);

  useFrame((_, delta) => {
    if (!spinRef.current) return;
    spinRef.current.rotation.y += delta * rotationSpeed;
  });

  return (
    <group position={position}>
      <mesh ref={spinRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          map={surface}
          bumpMap={surface}
          bumpScale={0.05}
          roughness={0.92}
          metalness={0.08}
          emissive={emissive ?? color}
          emissiveIntensity={0.1}
        />
      </mesh>

      {hasAtmosphere ? <Atmosphere radius={radius} color={color} /> : null}
      {hasRing ? <PlanetaryRing radius={radius} color={color} /> : null}
    </group>
  );
}

/**
 * A back-side shell with a fresnel shader. The rim glows where the surface
 * curves away from the camera, which is what sells the atmosphere.
 */
function Atmosphere({ radius, color }: { radius: number; color: string }) {
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: 0.85 },
    }),
    [color],
  );

  return (
    <mesh scale={1.16}>
      <sphereGeometry args={[radius, 48, 48]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={ATMOSPHERE_VERTEX_SHADER}
        fragmentShader={ATMOSPHERE_FRAGMENT_SHADER}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function PlanetaryRing({ radius, color }: { radius: number; color: string }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => createRingTexture(radius * 100), [radius]);
  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((_, delta) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z += delta * 0.012;
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2 - 0.34, 0, 0.26]}>
      <ringGeometry args={[radius * 1.45, radius * 2.1, 128]} />
      <meshBasicMaterial
        map={texture}
        color={color}
        transparent
        opacity={0.85}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

const ATMOSPHERE_VERTEX_SHADER = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDirection;

  void main() {
    // View-space normal and the direction from the surface to the camera.
    vNormal = normalize(normalMatrix * normal);
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDirection = normalize(-viewPosition.xyz);
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const ATMOSPHERE_FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;

  varying vec3 vNormal;
  varying vec3 vViewDirection;

  void main() {
    // Fresnel rim: 1.0 on the silhouette, 0.0 face-on.
    float rim = 1.0 - abs(dot(normalize(vNormal), normalize(vViewDirection)));
    float glow = pow(rim, 3.0) * uIntensity;
    gl_FragColor = vec4(uColor, glow);
  }
`;
