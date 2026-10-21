/**
 * Motion system — shared vocabulary.
 *
 * Ownership (kept deliberately strict so no two engines fight over one element):
 * - GSAP (`components/motion/*`): choreographed entrances, scroll-linked sequences,
 *   and media clip reveals. Runs once per element and cleans up its own context.
 * - Framer Motion: component state, hover/layout transitions, menu and tab panels.
 * - React Three Fiber: genuine 3D rendering in the hero visual only.
 * - CSS: color, border, shadow and simple hover transitions.
 */

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const DURATION = {
  micro: 0.16,
  fast: 0.28,
  base: 0.5,
  slow: 0.8,
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE_OUT } },
};

export const staggerGroup = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export const panelTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: EASE_OUT } },
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 260,
  damping: 32,
  mass: 0.7,
};
