"use client";

import { useCallback, useEffect, useRef } from "react";

const STORAGE_KEY = "portfolio:terminal-history";
const MAX_ENTRIES = 100;

export function useCommandHistory(): {
  push: (command: string) => void;
  recall: (direction: "up" | "down", draft: string) => string | null;
} {
  const entriesRef = useRef<string[]>([]);
  const cursorRef = useRef(-1);
  const draftRef = useRef("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        entriesRef.current = parsed
          .filter((value): value is string => typeof value === "string")
          .slice(-MAX_ENTRIES);
      }
    } catch {
      // Storage may be unavailable; history just starts empty.
    }
  }, []);

  const push = useCallback((command: string) => {
    const trimmed = command.trim();
    if (!trimmed) return;

    const previous = entriesRef.current[entriesRef.current.length - 1];
    if (previous === trimmed) {
      cursorRef.current = -1;
      return;
    }

    entriesRef.current = [...entriesRef.current, trimmed].slice(-MAX_ENTRIES);
    cursorRef.current = -1;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entriesRef.current));
    } catch {
      // Ignore quota/private-mode failures.
    }
  }, []);

  const recall = useCallback((direction: "up" | "down", draft: string): string | null => {
    const entries = entriesRef.current;
    if (entries.length === 0) return null;

    if (direction === "up") {
      if (cursorRef.current < 0) {
        draftRef.current = draft;
        cursorRef.current = entries.length - 1;
      } else {
        cursorRef.current = Math.max(0, cursorRef.current - 1);
      }
      return entries[cursorRef.current] ?? null;
    }

    if (cursorRef.current < 0) return null;

    cursorRef.current += 1;
    if (cursorRef.current >= entries.length) {
      cursorRef.current = -1;
      return draftRef.current;
    }

    return entries[cursorRef.current] ?? null;
  }, []);

  return { push, recall };
}
