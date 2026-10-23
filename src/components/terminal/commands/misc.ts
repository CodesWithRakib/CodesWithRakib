import type { Command } from "@/types/terminal";

export const whoami = {
  name: "whoami",
  description: "Identify the current session.",
  usage: "whoami",
  run: () => ({
    type: "text",
    lines: ["visitor — curious, and possibly a future collaborator."],
  }),
} satisfies Command;

export const date = {
  name: "date",
  description: "Print the current date and time.",
  usage: "date",
  run: () => ({
    type: "text",
    lines: [new Date().toString()],
  }),
} satisfies Command;

export const uname = {
  name: "uname",
  description: "System information.",
  usage: "uname",
  run: () => ({
    type: "text",
    lines: ["PortfolioOS 1.0 (Next.js) x86_64"],
  }),
} satisfies Command;

export const classic = {
  name: "classic",
  description: "Switch to the plain, readable portfolio view.",
  usage: "classic",
  run: (_args, context) => {
    context.openClassic();
    return {
      type: "text",
      lines: ["Opening classic view…"],
    };
  },
} satisfies Command;

export const exit = {
  name: "exit",
  description: "Attempt to leave.",
  usage: "exit",
  run: () => ({
    type: "error",
    message: "There is no escape. But `classic` will help.",
  }),
} satisfies Command;
