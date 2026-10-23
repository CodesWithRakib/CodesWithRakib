import type { Command, CommandContext, CommandResult } from "@/types/terminal";
import { about } from "./about";
import { clear } from "./clear";
import { contact } from "./contact";
import { experience } from "./experience";
import { createHelpCommand, HELP_ROW, type HelpRow } from "./help";
import { matrix } from "./matrix";
import { classic, date as dateCommand, exit, uname, whoami } from "./misc";
import { projects } from "./projects";
import { skills } from "./skills";
import { sudo } from "./sudo";
import { theme } from "./theme";

const baseCommands: Command[] = [
  about,
  skills,
  projects,
  experience,
  contact,
  clear,
  theme,
  matrix,
  sudo,
  whoami,
  dateCommand,
  uname,
  classic,
  exit,
];

function helpRows(): HelpRow[] {
  return [
    HELP_ROW,
    ...baseCommands
      .filter((command) => !command.hidden)
      .map((command) => ({ name: command.name, description: command.description })),
  ].sort((a, b) => a.name.localeCompare(b.name));
}

export const commands: Command[] = [createHelpCommand(helpRows), ...baseCommands];

const lookup = new Map<string, Command>();
for (const command of commands) {
  lookup.set(command.name.toLowerCase(), command);
  command.aliases?.forEach((alias) => lookup.set(alias.toLowerCase(), command));
}

export function findCommand(name: string): Command | null {
  return lookup.get(name.toLowerCase()) ?? null;
}

export function visibleCommands(): Command[] {
  return commands.filter((command) => !command.hidden);
}

function matchesQuery(command: Command, query: string): boolean {
  return [command.name, ...(command.aliases ?? [])].some((value) =>
    value.toLowerCase().includes(query),
  );
}

function startsWithQuery(command: Command, query: string): boolean {
  return [command.name, ...(command.aliases ?? [])].some((value) =>
    value.toLowerCase().startsWith(query),
  );
}

/** Starts-with matches first, then substring matches, capped at five. */
export function fuzzyCommands(query: string): Command[] {
  const normalised = query.trim().toLowerCase();
  if (!normalised) return [];

  const pool = visibleCommands();
  const starts = pool.filter((command) => startsWithQuery(command, normalised));
  const rest = pool.filter(
    (command) => !starts.includes(command) && matchesQuery(command, normalised),
  );

  return [...starts, ...rest].slice(0, 5);
}

export function executeCommand(input: string, context: CommandContext): CommandResult {
  const [name, ...args] = input.trim().split(/\s+/);
  if (!name) return { type: "text", lines: [] };

  const command = findCommand(name);
  if (!command) {
    const suggestion = fuzzyCommands(name)[0]?.name ?? "help";
    return {
      type: "error",
      message: `command not found: ${name}. Did you mean \`${suggestion}\`?`,
    };
  }

  return command.run(args, context);
}

export function describeResult(result: CommandResult): string {
  switch (result.type) {
    case "text":
      return result.lines.join(" ");
    case "error":
      return `Error: ${result.message}`;
    case "clear":
      return "Terminal cleared.";
    case "element":
      return "Output rendered in the terminal.";
  }
}
