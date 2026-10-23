"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createRandom } from "../textures";

interface AsteroidFieldProps {
  count: number;
  color: string;
  reducedMotion: boolean;
}

/** At most ten instanced rocks — one draw call, no per-frame allocations. */
export function AsteroidField({ count, color, reducedMotion }: AsteroidFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const geometry = useMemo(() => new THREE.DodecahedronGeometry(0.22, 0), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.95,
        metalness: 0.1,
        emissive: color,
        emissiveIntensity: 0.08,
      }),
    [color],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  const rocks = useMemo(() => {
    const random = createRandom(99);
    return Array.from({ length: count }, () => ({
      position: [(random() - 0.5) * 22, (random() - 0.5) * 10, -14 - random() * 18] as [
        number,
        number,
        number,
      ],
      rotation: [random() * Math.PI, random() * Math.PI, random() * Math.PI] as [
        number,
        number,
        number,
      ],
      scale: 0.45 + random() * 1.1,
    }));
  }, [count]);

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    rocks.forEach((rock, index) => {
      dummy.position.set(...rock.position);
      dummy.rotation.set(...rock.rotation);
      dummy.scale.setScalar(rock.scale);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [rocks]);

  useFrame((state, delta) => {
    if (reducedMotion || !meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.015;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.4;
  });

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} frustumCulled={false} />;
}
