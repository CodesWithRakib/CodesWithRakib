"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface GsapRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Animate children matching this selector. Pass `null` to animate the wrapper itself. */
  selector?: string | null;
  stagger?: number;
  delay?: number;
  y?: number;
  start?: string;
  duration?: number;
}

/**
 * GSAP owns these scroll entrances. Content is fully present in the DOM and
 * remains visible when JS, WebGL, or animation is unavailable.
 */
export function GsapReveal({
  children,
  className,
  selector = "[data-reveal]",
  stagger = 0.08,
  delay = 0,
  y = 24,
  start = "top 88%",
  duration = 0.85,
}: GsapRevealProps) {
  const scope = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = selector
          ? Array.from(root.querySelectorAll<HTMLElement>(selector))
          : [root as HTMLElement];

        if (!targets.length) return;

        gsap.from(targets, {
          y,
          autoAlpha: 0,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start,
            once: true,
          },
          // Preserve the final styles so later interactions are unaffected.
          clearProps: "opacity,visibility,transform",
        });
      });

      return () => media.revert();
    },
    { scope, dependencies: [] }
  );

  return (
    <div ref={scope} className={cn(className)}>
      {children}
    </div>
  );
}

interface GsapMediaRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/** Clip-path reveal for the large project plates. */
export function GsapMediaReveal({
  children,
  className,
  delay = 0,
}: GsapMediaRevealProps) {
  const scope = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            scale: 1.035,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.15,
            delay,
            ease: "power3.out",
            clearProps: "clipPath,transform",
            scrollTrigger: {
              trigger: root,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      return () => media.revert();
    },
    { scope, dependencies: [delay] }
  );

  return (
    <div ref={scope} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
