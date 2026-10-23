"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { describeResult, executeCommand } from "@/components/terminal/commands";
import { useCommandHistory } from "@/hooks/useCommandHistory";
import { ACCENTS, type AccentName, type CommandContext, type HistoryEntry } from "@/types/terminal";

interface UseTerminalOptions {
  onOpenClassic: () => void;
}

// Remounting the shell (classic → terminal) should not replay the boot sequence.
let bootedThisSession = false;

export function useTerminal({ onOpenClassic }: UseTerminalOptions) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [accent, setAccentName] = useState<AccentName>("green");
  const [scanlines, setScanlines] = useState(true);
  const [booted, setBooted] = useState(bootedThisSession);
  const [bootSkipped, setBootSkipped] = useState(bootedThisSession);
  const [showBoot, setShowBoot] = useState(!bootedThisSession);
  const [announcement, setAnnouncement] = useState("");

  const entryId = useRef(0);
  const history = useCommandHistory();

  // Hard stop so the input is never blocked by a stalled animation.
  useEffect(() => {
    if (booted) return;
    const timer = window.setTimeout(() => {
      bootedThisSession = true;
      setBooted(true);
      setBootSkipped(true);
    }, 2400);
    return () => window.clearTimeout(timer);
  }, [booted]);

  const setAccent = useCallback((name: string) => {
    if (!(ACCENTS as readonly string[]).includes(name)) return;
    const next = name as AccentName;
    setAccentName(next);
    document.documentElement.style.setProperty("--accent", `var(--term-accent-${next})`);
    document.documentElement.style.setProperty("--ring", `var(--term-accent-${next})`);
  }, []);

  const toggleScanlines = useCallback(() => {
    setScanlines((value) => !value);
  }, []);

  const clear = useCallback(() => {
    setEntries([]);
    setShowBoot(false);
    setAnnouncement("Terminal cleared.");
  }, []);

  const completeBoot = useCallback((skipped: boolean) => {
    bootedThisSession = true;
    setBooted(true);
    if (skipped) setBootSkipped(true);
  }, []);

  const skipBoot = useCallback(() => completeBoot(true), [completeBoot]);

  const submit = useCallback(
    (raw: string) => {
      const input = raw.trim();
      if (!input) return;

      history.push(input);

      const context: CommandContext = {
        history: entries,
        accent,
        scanlines,
        setAccent,
        toggleScanlines,
        openClassic: onOpenClassic,
      };

      const result = executeCommand(input, context);

      if (result.type === "clear") {
        clear();
        return;
      }

      entryId.current += 1;
      const entry: HistoryEntry = { id: `entry-${entryId.current}`, input, result };
      setEntries((current) => [...current, entry]);
      setAnnouncement(`$ ${input}. ${describeResult(result)}`);
    },
    [accent, clear, entries, history, onOpenClassic, scanlines, setAccent, toggleScanlines],
  );

  return {
    entries,
    accent,
    scanlines,
    booted,
    bootSkipped,
    showBoot,
    announcement,
    submit,
    clear,
    recall: history.recall,
    completeBoot,
    skipBoot,
  };
}
