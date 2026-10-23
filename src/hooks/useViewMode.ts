"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { ViewMode } from "@/types/terminal";

const STORAGE_KEY = "portfolio:view";
const CHANGE_EVENT = "portfolio:view-change";

function readView(): ViewMode {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "classic" ? "classic" : "terminal";
  } catch {
    return "terminal";
  }
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

export function useViewMode(): { view: ViewMode; setView: (next: ViewMode) => void } {
  const view = useSyncExternalStore(subscribe, readView, () => "terminal" as const);

  const setView = useCallback((next: ViewMode) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode or storage disabled: the in-memory change still works.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { view, setView };
}
