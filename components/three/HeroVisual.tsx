"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { StaticAtlas } from "@/components/three/StaticAtlas";

const InterfaceAtlas = dynamic(
  () => import("@/components/three/InterfaceAtlas"),
  {
    ssr: false,
    loading: () => <StaticAtlas />,
  }
);

const emptySubscribe = () => () => {};
let cachedWebglSupport: boolean | null = null;

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  if (cachedWebglSupport !== null) return cachedWebglSupport;

  try {
    const canvas = document.createElement("canvas");
    cachedWebglSupport = Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    cachedWebglSupport = false;
  }

  return cachedWebglSupport;
}

export function HeroVisual() {
  const reducedMotion = useReducedMotion();
  const webglAvailable = React.useSyncExternalStore(
    emptySubscribe,
    detectWebGL,
    () => false
  );
  const [shouldLoadScene, setShouldLoadScene] = React.useState(false);

  // Keep the CSS study on screen until the browser is idle, so the WebGL
  // chunk never competes with the hero's first paint or the LCP text.
  React.useEffect(() => {
    if (!webglAvailable || reducedMotion) return;

    let cancelled = false;
    const activate = () => {
      if (!cancelled) setShouldLoadScene(true);
    };

    let timeoutId: number | undefined;
    let idleId: number | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(activate, { timeout: 1600 });
    } else {
      timeoutId = window.setTimeout(activate, 900);
    }

    return () => {
      cancelled = true;
      if (
        idleId !== undefined &&
        typeof window.cancelIdleCallback === "function"
      ) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [webglAvailable, reducedMotion]);

  const showScene = webglAvailable && reducedMotion !== true && shouldLoadScene;

  return (
    <div className="relative">
      <div className="relative aspect-[5/4.3] w-full sm:aspect-[5/4] lg:aspect-[5/4.4]">
        {showScene ? <InterfaceAtlas /> : <StaticAtlas />}
      </div>

      <p className="sr-only">
        Decorative visual: layered browser interface panels rendered in three
        dimensions, representing interface design and frontend engineering work.
      </p>

      <div className="mt-3 flex items-center justify-between gap-4 border-t border-border/70 pt-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          Interface atlas — layered product surfaces
        </span>
        <span className="hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground sm:inline-flex">
          {showScene ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              move to explore
            </>
          ) : (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-border" />
              static study
            </>
          )}
        </span>
      </div>
    </div>
  );
}
