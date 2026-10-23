"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { CommandResult, HistoryEntry } from "@/types/terminal";

const MAX_RENDERED_ENTRIES = 150;

function ResultView({ result }: { result: CommandResult }) {
  switch (result.type) {
    case "text":
      return <pre className="term-text">{result.lines.join("\n")}</pre>;
    case "error":
      return <p className="term-error">error: {result.message}</p>;
    case "element":
      return <div className="term-element">{result.component}</div>;
    case "clear":
      return null;
  }
}

function EntryView({ entry }: { entry: HistoryEntry }) {
  return (
    <div className="term-entry">
      <p className="term-command-line">
        <span className="term-prompt">visitor@portfolio:~$</span>
        <span>{entry.input}</span>
      </p>
      <ResultView result={entry.result} />
    </div>
  );
}

interface TerminalScreenProps {
  entries: HistoryEntry[];
  scanlines: boolean;
  boot: ReactNode;
}

export function TerminalScreen({ entries, scanlines, boot }: TerminalScreenProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const windowed =
    entries.length > 200 ? entries.slice(-MAX_RENDERED_ENTRIES) : entries;
  const trimmed = entries.length - windowed.length;

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [entries.length]);

  return (
    <div className={`term-screen-wrap${scanlines ? " term-scanlines" : ""}`}>
      <div
        ref={scrollRef}
        className="term-screen"
        role="region"
        aria-label="Terminal output"
        tabIndex={0}
      >
        <div className="term-output">
          {boot}
          {trimmed > 0 ? (
            <p className="term-text term-muted">… {trimmed} earlier commands trimmed …</p>
          ) : null}
          {windowed.map((entry) => (
            <EntryView key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}
