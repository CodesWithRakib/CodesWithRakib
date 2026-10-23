import type { ReactNode } from "react";

export const ACCENTS = ["violet", "cyan", "green", "amber"] as const;

export type AccentName = (typeof ACCENTS)[number];

export type ViewMode = "terminal" | "classic";

export type CommandResult =
  | { type: "text"; lines: string[] }
  | { type: "element"; component: ReactNode }
  | { type: "clear" }
  | { type: "error"; message: string };

export interface HistoryEntry {
  id: string;
  input: string;
  result: CommandResult;
}

export interface CommandContext {
  history: HistoryEntry[];
  accent: AccentName;
  scanlines: boolean;
  setAccent: (name: string) => void;
  toggleScanlines: () => void;
  openClassic: () => void;
}

export interface Command {
  name: string;
  aliases?: string[];
  description: string;
  usage?: string;
  hidden?: boolean;
  run: (args: string[], context: CommandContext) => CommandResult;
}
