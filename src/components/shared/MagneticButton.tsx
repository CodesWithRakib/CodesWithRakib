"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/cn";

export type MagneticButtonProps = HTMLMotionProps<"button"> & {
  /** How far the button follows the pointer, as a fraction of the offset. */
  strength?: number;
};

const SPRING = { stiffness: 260, damping: 20, mass: 0.5 } as const;

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  type = "button",
  onPointerMove,
  onPointerLeave,
  onBlur,
  ...props
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const reducedMotion = useReducedMotion();

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type={type}
      {...props}
      style={{ x: reducedMotion ? 0 : springX, y: reducedMotion ? 0 : springY }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (reducedMotion || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event);
        reset();
      }}
      onBlur={(event) => {
        onBlur?.(event);
        reset();
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3",
        "text-sm font-medium text-accent-fg transition-colors duration-[var(--dur-fast)]",
        "hover:bg-accent/90 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
