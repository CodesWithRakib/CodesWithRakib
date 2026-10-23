"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * UI and state only — no audio is wired yet. A theme branch can subscribe to
 * the same state to mute its own soundtrack.
 */
export function SoundToggle({ className }: { className?: string }) {
  const [muted, setMuted] = useState(true);

  return (
    <button
      type="button"
      onClick={() => setMuted((value) => !value)}
      aria-pressed={!muted}
      aria-label={muted ? "Enable sound" : "Mute sound"}
      data-cursor="hover"
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border",
        "text-fg-muted transition-colors duration-[var(--dur-fast)] hover:text-fg",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="h-4 w-4"
      >
        <path d="M4 9v6h4l5 4V5L8 9H4Z" />
        {muted ? (
          <path d="m17 9 4 6M21 9l-4 6" />
        ) : (
          <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
        )}
      </svg>
    </button>
  );
}
