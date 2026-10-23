import type { Skill } from "@/types";

export const skills = [
  { name: "React", category: "frontend", level: 5, icon: "react" },
  { name: "TypeScript", category: "frontend", level: 5, icon: "typescript" },
  { name: "Next.js", category: "frontend", level: 4, icon: "nextjs" },
  { name: "CSS & Tailwind", category: "frontend", level: 5, icon: "css" },
  { name: "Node.js", category: "backend", level: 3, icon: "node" },
  { name: "PostgreSQL", category: "backend", level: 3, icon: "postgres" },
  { name: "Vitest & Playwright", category: "tooling", level: 4, icon: "test" },
  { name: "Git & CI", category: "tooling", level: 4, icon: "git" },
  { name: "Figma", category: "design", level: 4, icon: "figma" },
  { name: "Motion design", category: "design", level: 4, icon: "motion" },
] satisfies readonly Skill[];
