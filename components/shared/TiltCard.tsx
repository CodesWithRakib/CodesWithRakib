"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees on each axis. */
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
}

/**
 * Framer Motion owns pointer-driven depth here. GSAP never animates these
 * properties, so there is no competing writer on the same element.
 */
export function TiltCard({
  children,
  className = "",
  maxTilt = 5,
  scale = 1.012,
  glare = false,
}: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rotateX = useSpring(useMotionValue(0), {
    stiffness: 140,
    damping: 20,
    mass: 0.5,
  });
  const rotateY = useSpring(useMotionValue(0), {
    stiffness: 140,
    damping: 20,
    mass: 0.5,
  });

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * maxTilt * 2);
    rotateX.set(-y * maxTilt * 2);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onBlur={reset}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformPerspective: 1200,
      }}
      whileHover={reduced ? undefined : { scale }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative", className)}
    >
      {children}
      {glare && !reduced && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] bg-[radial-gradient(420px_circle_at_50%_0%,rgba(255,255,255,0.14),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
    </motion.div>
  );
}
