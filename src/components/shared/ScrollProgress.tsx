"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Hairline reading-progress indicator pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[var(--z-progress)] h-0.5 origin-left bg-accent"
      style={{ scaleX: reducedMotion ? scrollYProgress : smoothProgress }}
    />
  );
}
