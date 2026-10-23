"use client";

import type { ViewMode } from "@/types/terminal";

interface ViewToggleProps {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  const isClassic = view === "classic";

  return (
    <button
      type="button"
      aria-pressed={isClassic}
      onClick={() => onChange(isClassic ? "terminal" : "classic")}
      className="view-toggle"
    >
      <span aria-hidden>{isClassic ? ">_" : "▤"}</span>
      {isClassic ? "Terminal view" : "Classic view"}
    </button>
  );
}
