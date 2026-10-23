"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GSAP_EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Seconds to offset the reveal. */
  delay?: number;
  /** Vertical travel in pixels. */
  distance?: number;
}

/**
 * Reveals its children once, when they enter the viewport. Deliberately
 * conservative: a short rise and fade, skipped entirely for reduced motion so
 * content is never hidden behind an animation.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 26,
  ...props
}: RevealProps) {
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = root.current;
      if (!element) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        // Opacity rather than autoAlpha: off-screen copy stays in the
        // accessibility tree and in find-in-page until it is scrolled into view.
        const tween = gsap.fromTo(
          element,
          { y: distance, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            delay,
            ease: GSAP_EASE.out,
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          }
        );

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => media.revert();
    },
    { scope: root, dependencies: [] }
  );

  return (
    <div ref={root} className={cn(className)} {...props}>
      {children}
    </div>
  );
}
