"use client";

import { useSyncExternalStore } from "react";

interface DeviceMemoryNavigator extends Navigator {
  deviceMemory?: number;
}

const MOBILE_QUERY = "(max-width: 767px)";

function subscribeToWidth(onStoreChange: () => void): () => void {
  const mediaQueryList = window.matchMedia(MOBILE_QUERY);
  mediaQueryList.addEventListener("change", onStoreChange);
  return () => mediaQueryList.removeEventListener("change", onStoreChange);
}

function getQualitySnapshot(): boolean {
  const narrow = window.matchMedia(MOBILE_QUERY).matches;
  const memory = (navigator as DeviceMemoryNavigator).deviceMemory ?? 8;
  return narrow || memory <= 4;
}

/**
 * True on phones and low-memory devices. Star, nebula and asteroid counts are
 * derived from this rather than from a resize listener that re-renders the scene.
 */
export function useReducedQuality(): boolean {
  return useSyncExternalStore(subscribeToWidth, getQualitySnapshot, () => false);
}

function subscribeToVisibility(onStoreChange: () => void): () => void {
  document.addEventListener("visibilitychange", onStoreChange);
  return () => document.removeEventListener("visibilitychange", onStoreChange);
}

/** Pauses the render loop entirely while the tab is in the background. */
export function usePageVisible(): boolean {
  return useSyncExternalStore(
    subscribeToVisibility,
    () => document.visibilityState === "visible",
    () => true,
  );
}
