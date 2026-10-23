/**
 * Motion system — shared vocabulary.
 *
 * Ownership (kept strict so no two engines fight over one element):
 * - GSAP (`components/motion/*`, hero + poster choreography): one-shot entrances,
 *   scroll-triggered reveals and scroll-linked progress. Always cleaned up.
 * - Framer Motion: component state, hover/layout transitions, menu, theme and copy.
 * - React Three Fiber: the hero sculpture only.
 * - CSS: colour, border and simple hover transitions.
 */

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const DURATION = {
  micro: 0.16,
  fast: 0.26,
  base: 0.45,
  slow: 0.75,
} as const;

/** GSAP equivalents for the same motion language. */
export const GSAP_EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
} as const;

export const springSoft = {
  type: "spring" as const,
  stiffness: 280,
  damping: 32,
  mass: 0.7,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
};
