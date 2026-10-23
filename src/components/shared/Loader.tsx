"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { registerGsapPlugins } from "@/lib/motion";
import { useHydrated, useMediaQuery } from "@/lib/useMediaQuery";
import { siteConfig } from "@/content/profile";

export interface LoaderProps {
  /** Fired once, after the exit animation (or immediately with reduced motion). */
  onComplete?: () => void;
}

/**
 * Full-screen preloader. It only mounts after hydration, so the page is never
 * hidden from clients without JavaScript, and reduced motion skips it outright.
 */
export function Loader({ onComplete }: LoaderProps) {
  const hydrated = useHydrated();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [done, setDone] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onComplete);
  const finishedRef = useRef(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!hydrated || reducedMotion || finishedRef.current) return;

    registerGsapPlugins();

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      setDone(true);
      onCompleteRef.current?.();
    };

    const progress = { value: 0 };
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });

    timeline
      .to(progress, {
        value: 100,
        duration: 1.05,
        ease: "power1.inOut",
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(progress.value)).padStart(3, "0");
          }
        },
      })
      .to(barRef.current, { scaleX: 1, duration: 1.05, ease: "power1.inOut" }, 0)
      .to(rootRef.current, { yPercent: -100, duration: 0.7, ease: "expo.inOut" }, "+=0.08");

    return () => {
      timeline.kill();
    };
  }, [hydrated, reducedMotion]);

  useEffect(() => {
    if (!hydrated || !reducedMotion || finishedRef.current) return;
    finishedRef.current = true;
    onCompleteRef.current?.();
  }, [hydrated, reducedMotion]);

  if (!hydrated || reducedMotion || done) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      className="fixed inset-0 z-[var(--z-loader)] flex flex-col justify-end gap-6 bg-bg px-[var(--space-gutter)] pb-[var(--space-gutter)]"
    >
      <div className="flex items-end justify-between gap-4">
        <p className="font-display text-3xl tracking-tight text-fg">{siteConfig.name}</p>
        <span ref={countRef} aria-hidden className="font-mono text-xs text-fg-muted">
          000
        </span>
      </div>
      <div className="h-px w-full overflow-hidden bg-border">
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
