"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

const SPRING = { stiffness: 180, damping: 22, mass: 0.6 } as const;

/**
 * Two-layer cursor: a tight dot on the pointer and a slower glow ring.
 * It only mounts for fine pointers with motion allowed, and the native cursor
 * is restored the moment those conditions stop applying.
 */
export function Cursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const active = finePointer && !reducedMotion;

  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const opacity = useMotionValue(0);
  const glowX = useSpring(x, SPRING);
  const glowY = useSpring(y, SPRING);

  useEffect(() => {
    if (!active) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      opacity.set(1);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target;
      setHovering(
        target instanceof Element && Boolean(target.closest("a, button, [data-cursor='hover']")),
      );
    };

    const onLeave = () => opacity.set(0);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [active, x, y, opacity]);

  if (!active) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[var(--z-cursor)]">
      <motion.div className="absolute left-0 top-0" style={{ x: glowX, y: glowY, opacity }}>
        <motion.div
          className="h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60 bg-accent/10"
          animate={{ scale: hovering ? 1.5 : 1 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x, y, opacity }}>
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </motion.div>
    </div>
  );
}
