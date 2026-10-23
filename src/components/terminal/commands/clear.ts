import type { Command } from "@/types/terminal";

export const clear = {
  name: "clear",
  aliases: ["cls"],
  description: "Wipe the screen and start fresh.",
  usage: "clear",
  run: () => ({ type: "clear" }),
} satisfies Command;
