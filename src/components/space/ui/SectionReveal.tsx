"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { registerGsapPlugins } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Fades and lifts its children when they enter the viewport. Nothing is hidden
 * until this effect runs on the client, so the server-rendered copy stays
 * readable without JavaScript and for reduced-motion visitors.
 */
export function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;

    registerGsapPlugins();

    gsap.set(element, { autoAlpha: 0, y: 36 });

    const tween = gsap.to(element, {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      delay,
      ease: "power3.out",
      scrollTrigger: { trigger: element, start: "top 82%", once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(element, { clearProps: "opacity,visibility,transform" });
    };
  }, [reducedMotion, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
