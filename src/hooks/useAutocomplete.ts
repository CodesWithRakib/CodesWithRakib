"use client";

import { useEffect, useState } from "react";
import { fuzzyCommands } from "@/components/terminal/commands";
import type { Command } from "@/types/terminal";

export function useAutocomplete(query: string, enabled: boolean): Command[] {
  const [matches, setMatches] = useState<Command[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMatches(enabled ? fuzzyCommands(query) : []);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [query, enabled]);

  return matches;
}
