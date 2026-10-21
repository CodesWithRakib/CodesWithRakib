"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Scroll-linked accent line. It only animates `scaleY` and never pins or
 * hijacks scrolling; with reduced motion the track stays at full height.
 */
export function TimelineProgress({
  children,
}: {
  children: React.ReactNode;
}) {
  const scope = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".timeline-progress-line",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top 72%",
              end: "bottom 72%",
              scrub: 0.6,
            },
          }
        );
      });

      return () => media.revert();
    },
    { scope, dependencies: [] }
  );

  return (
    <div ref={scope} className="relative">
      <div
        aria-hidden="true"
        className="absolute left-[3px] top-2 bottom-2 hidden w-px bg-border/80 sm:block"
      >
        <span className="timeline-progress-line block h-full w-px origin-top bg-primary" />
      </div>
      {children}
    </div>
  );
}
