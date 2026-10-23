"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/content/profile";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { scrollTo } from "@/lib/useLenis";

export function HeroOverlay() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="space-shell relative flex min-h-svh flex-col justify-center py-28">
      <motion.div
        variants={staggerContainer}
        initial={reducedMotion ? false : "hidden"}
        animate="visible"
        className="space-hero-copy max-w-3xl"
      >
        <motion.p data-reveal variants={fadeUp} className="space-eyebrow">
          {profile.location} · Available for work
        </motion.p>

        <motion.h1
          data-reveal
          variants={fadeUp}
          className="mt-6 font-display text-[clamp(2.9rem,9vw,6.8rem)] leading-[0.92] tracking-[0.01em] text-balance text-fg"
        >
          {profile.name}
        </motion.h1>

        <motion.p data-reveal variants={fadeUp} className="mt-5 text-xl text-accent sm:text-2xl">
          {profile.role}
        </motion.p>

        <motion.p
          data-reveal
          variants={fadeUp}
          className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted text-pretty sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div data-reveal variants={fadeUp} className="mt-10">
          <MagneticButton onClick={() => scrollTo("#about")}>
            Begin journey <span aria-hidden>↓</span>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <p className="space-scroll-hint absolute bottom-8 left-[var(--space-gutter)] flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-fg-muted">
        <span aria-hidden className="space-scroll-line" />
        Scroll to travel
      </p>
    </div>
  );
}
