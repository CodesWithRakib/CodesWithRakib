"use client";

import { useEffect } from "react";
import { profile } from "@/content/profile";
import { useTerminal } from "@/hooks/useTerminal";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { CommandChips } from "./CommandChips";
import { TypewriterText } from "./output/TypewriterText";
import { TerminalInput } from "./TerminalInput";
import { TerminalScreen } from "./TerminalScreen";

const BOOT_TEXT = [
  "[ OK ] Mounting /dev/portfolio",
  "[ OK ] Loading profile.json",
  "[ OK ] Establishing secure connection",
  "",
  `Welcome, ${profile.name}. Type \`help\` or pick a command below.`,
].join("\n");

export function TerminalShell({ onOpenClassic }: { onOpenClassic: () => void }) {
  const terminal = useTerminal({ onOpenClassic });
  const { booted, skipBoot } = terminal;
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const ready = booted || reducedMotion;

  // Any key skips the boot sequence while it is still running.
  useEffect(() => {
    if (booted) return;
    const onKeyDown = () => skipBoot();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [booted, skipBoot]);

  const runSuggestion = (command: string) => {
    terminal.submit(command);
    window.requestAnimationFrame(() => {
      document.getElementById("terminal-input")?.focus();
    });
  };

  const boot = terminal.showBoot ? (
    <div className="term-boot">
      {reducedMotion || terminal.bootSkipped ? (
        <pre className="term-text">{BOOT_TEXT}</pre>
      ) : (
        <TypewriterText text={BOOT_TEXT} speed={10} onDone={() => terminal.completeBoot(false)} />
      )}
      {ready ? null : (
        <button type="button" className="term-skip" onClick={terminal.skipBoot}>
          skip boot [any key]
        </button>
      )}
    </div>
  ) : null;

  return (
    <div
      className="term-shell"
      onPointerDown={() => {
        if (!ready) terminal.skipBoot();
      }}
    >
      <div className="term-titlebar">
        <div aria-hidden className="term-dots">
          <span className="term-dot" />
          <span className="term-dot" />
          <span className="term-dot" />
        </div>
        <p className="term-title">visitor@portfolio — zsh</p>
        <p className="term-status" aria-live="off">
          {ready ? "online" : "booting"}
        </p>
      </div>

      <TerminalScreen
        entries={terminal.entries}
        scanlines={terminal.scanlines && !reducedMotion}
        boot={boot}
      />

      <div className="term-footer">
        <TerminalInput
          disabled={!ready}
          onSubmit={terminal.submit}
          onClear={terminal.clear}
          recall={terminal.recall}
        />
        <CommandChips
          runCount={terminal.entries.length}
          disabled={!ready}
          onRun={runSuggestion}
        />
        <p className="term-hint">
          help · ↑ history · tab complete · ctrl+l clear · "classic" for the plain view
        </p>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {terminal.announcement}
      </p>
    </div>
  );
}
