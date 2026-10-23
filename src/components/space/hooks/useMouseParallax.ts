"use client";

import { useEffect, useRef, type RefObject } from "react";

export interface ParallaxPoint {
  x: number;
  y: number;
}

/**
 * Normalised pointer offset in [-1, 1]. Returned as a ref so the render loop can
 * read it without re-rendering React on every mouse move.
 */
export function useMouseParallax(strength = 0.14): RefObject<ParallaxPoint> {
  const pointer = useRef<ParallaxPoint>({ x: 0, y: 0 });

  useEffect(() => {
    if (strength === 0) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2 * strength;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * -2 * strength;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [strength]);

  return pointer;
}
