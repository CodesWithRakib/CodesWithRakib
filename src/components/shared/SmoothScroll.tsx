"use client";

import type { ReactNode } from "react";
import { useLenis } from "@/lib/useLenis";

/** Mounts Lenis once for the whole app; content itself stays server-rendered. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useLenis();

  return <>{children}</>;
}
