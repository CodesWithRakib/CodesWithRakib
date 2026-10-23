"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion, registerGsapPlugins } from "@/lib/motion";

let lenisInstance: Lenis | null = null;

export interface ScrollToOptions {
  /** Pixels to subtract from the target's top edge, e.g. for a fixed header. */
  offset?: number;
  immediate?: boolean;
}

/**
 * Scroll programmatically. Lenis drives it when smooth scrolling is active;
 * otherwise this falls back to native scrolling (including reduced motion).
 */
export function scrollTo(
  target: number | string | HTMLElement,
  { offset = 0, immediate = false }: ScrollToOptions = {},
): void {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, immediate });
    return;
  }

  if (typeof window === "undefined") return;

  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

  if (typeof target === "number") {
    window.scrollTo({ top: target + offset, behavior });
    return;
  }

  const element = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior });
}

/**
 * Mount Lenis and keep it in lockstep with the GSAP ticker and ScrollTrigger.
 * Returns early — leaving native scrolling in place — for reduced motion.
 */
export function useLenis(): void {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    registerGsapPlugins();

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      autoRaf: false,
    });

    lenisInstance = lenis;

    const updateScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", updateScrollTrigger);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
      if (lenisInstance === lenis) lenisInstance = null;
    };
  }, []);
}
