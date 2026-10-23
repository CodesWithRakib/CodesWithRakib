import type { Command } from "@/types/terminal";

export interface HelpRow {
  name: string;
  description: string;
}

export const HELP_ROW: HelpRow = {
  name: "help",
  description: "List every available command.",
};

export function createHelpCommand(getRows: () => HelpRow[]): Command {
  return {
    name: "help",
    aliases: ["?"],
    description: HELP_ROW.description,
    usage: "help",
    run: () => ({
      type: "element",
      component: (
        <div className="term-help" role="table" aria-label="Available commands">
          {getRows().map((row) => (
            <div key={row.name} className="term-help-row" role="row">
              <span className="term-help-name" role="cell">
                {row.name}
              </span>
              <span className="term-help-desc" role="cell">
                {row.description}
              </span>
            </div>
          ))}
        </div>
      ),
    }),
  };
}
