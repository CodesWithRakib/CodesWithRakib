import { ACCENTS, type AccentName } from "@/types/terminal";
import type { Command } from "@/types/terminal";

export const theme = {
  name: "theme",
  aliases: ["accent"],
  description: "Cycle the accent, or toggle CRT scanlines.",
  usage: "theme [violet|cyan|green|amber|scanlines]",
  run: (args, context) => {
    const argument = args[0]?.toLowerCase();

    if (argument === "scanlines" || argument === "scanline") {
      context.toggleScanlines();
      return {
        type: "text",
        lines: [`scanlines ${context.scanlines ? "off" : "on"}.`],
      };
    }

    if (argument && !(ACCENTS as readonly string[]).includes(argument)) {
      return {
        type: "error",
        message: `unknown theme: ${argument}. Try ${ACCENTS.join(", ")} or scanlines.`,
      };
    }

    const next: AccentName = argument
      ? (argument as AccentName)
      : (ACCENTS[(ACCENTS.indexOf(context.accent) + 1) % ACCENTS.length] ?? "violet");

    context.setAccent(next);

    return { type: "text", lines: [`accent → ${next}.`] };
  },
} satisfies Command;
