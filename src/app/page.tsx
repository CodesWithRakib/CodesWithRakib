"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/content/profile";
import { fadeUp, staggerContainer } from "@/lib/motion";

/**
 * Deliberately minimal: name, role and tagline only. This is the canvas each
 * theme branch replaces — no theme-specific layout or 3D lives here.
 */
export default function HomePage() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden px-[var(--space-gutter)] py-[var(--space-section)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 20%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 70%)",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial={reducedMotion ? false : "hidden"}
        animate="visible"
        className="relative mx-auto w-full max-w-2xl text-center"
      >
        <motion.p
          data-reveal
          variants={fadeUp}
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-muted"
        >
          {profile.location} · Open to work
        </motion.p>

        <motion.h1
          data-reveal
          variants={fadeUp}
          className="font-display text-5xl leading-[0.95] tracking-tight text-balance sm:text-6xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p data-reveal variants={fadeUp} className="mt-4 text-2xl text-accent">
          {profile.role}
        </motion.p>

        <motion.p
          data-reveal
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl text-base text-fg-muted text-pretty"
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          data-reveal
          variants={fadeUp}
          className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted/70"
        >
          Foundation build · replace this page in a theme branch
        </motion.p>
      </motion.div>
    </section>
  );
}
