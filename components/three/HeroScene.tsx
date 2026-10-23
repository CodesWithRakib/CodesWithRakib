"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { StaticStack } from "@/components/three/StaticStack";
import { cn } from "@/lib/utils";

const StackSculpture = dynamic(
  () =>
    import("@/components/three/StackSculpture").then(
      (module) => module.StackSculpture
    ),
  {
    ssr: false,
    loading: () => <StaticStack />,
  }
);

const emptySubscribe = () => () => {};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const LARGE_VIEWPORT_QUERY = "(min-width: 768px)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function subscribeToViewport(onChange: () => void) {
  const query = window.matchMedia(LARGE_VIEWPORT_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getLargeViewport() {
  return window.matchMedia(LARGE_VIEWPORT_QUERY).matches;
}

function detectWebgl(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroScene({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const reducedMotion = React.useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    () => false
  );
  const largeViewport = React.useSyncExternalStore(
    subscribeToViewport,
    getLargeViewport,
    () => false
  );

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [webgl] = React.useState<boolean>(detectWebgl);
  const [shouldMount, setShouldMount] = React.useState(false);
  const [inView, setInView] = React.useState(true);
  const [pageVisible, setPageVisible] = React.useState(true);

  React.useEffect(() => {
    if (reducedMotion || !webgl || !largeViewport) return;

    let cancelled = false;
    const mount = () => {
      if (!cancelled) setShouldMount(true);
    };

    let handle: number;
    if (typeof window.requestIdleCallback === "function") {
      handle = window.requestIdleCallback(mount, { timeout: 1400 });
    } else {
      handle = window.setTimeout(mount, 280);
    }

    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(handle);
      }
      window.clearTimeout(handle);
    };
  }, [reducedMotion, webgl, largeViewport]);

  React.useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const theme = mounted && resolvedTheme === "dark" ? "dark" : "light";
  const showCanvas =
    mounted && webgl && largeViewport && !reducedMotion && shouldMount;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className="relative aspect-[4/3] w-full overflow-hidden"
      >
        {showCanvas ? (
          <StackSculpture theme={theme} active={inView && pageVisible} />
        ) : (
          <StaticStack className="absolute inset-0 h-full w-full" />
        )}
      </div>
    </div>
  );
}
