"use client";

import * as React from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  delayMs?: number;
  durationMs?: number;
  threshold?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delayMs = 0,
  durationMs = 600,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const [isIntersected, setIsIntersected] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  const prefersReducedMotion = React.useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
    () => false
  );

  const isVisible = prefersReducedMotion || isIntersected;

  React.useEffect(() => {
    if (prefersReducedMotion) return;

    if (!elementRef.current) return;

    if (typeof IntersectionObserver === "undefined") {
      const timer = setTimeout(() => setIsIntersected(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsIntersected(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once, prefersReducedMotion]);

  // Initial hidden transform styles based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translate3d(0, 24px, 0)";
      case "down":
        return "translate3d(0, -24px, 0)";
      case "left":
        return "translate3d(24px, 0, 0)";
      case "right":
        return "translate3d(-24px, 0, 0)";
      case "scale":
        return "scale(0.96)";
      case "fade":
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  const transitionStyle: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate3d(0, 0, 0) scale(1)" : getInitialTransform(),
    transitionProperty: "opacity, transform",
    transitionDuration: `${durationMs}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: `${delayMs}ms`,
    willChange: isVisible ? "auto" : "opacity, transform",
  };

  return (
    <div ref={elementRef} style={transitionStyle} className={className}>
      {children}
    </div>
  );
}
