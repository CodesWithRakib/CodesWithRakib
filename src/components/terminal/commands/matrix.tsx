import type { Command } from "@/types/terminal";
import { MatrixRain } from "../output/MatrixRain";

export const matrix = {
  name: "matrix",
  description: "Decorative rain, three seconds, then silence.",
  usage: "matrix",
  run: () => ({
    type: "element",
    component: <MatrixRain />,
  }),
} satisfies Command;
