export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  highlights: string[];
  stack: string[];
  platforms: string[];
}

export interface ToolkitGroup {
  title: string;
  items: string[];
}

export const experienceData: ExperienceEntry[] = [
  {
    company: "SOFOF Tech",
    role: "Junior Frontend Developer",
    location: "Dhaka, Bangladesh",
    period: "Present",
    type: "Full-time",
    summary:
      "Building production web applications for international clients with React, Next.js and TypeScript.",
    highlights: [
      "Ship client platforms (Tamkeen, MyCoifeur) with locale-aware Arabic RTL layouts, bidirectional text and typographic detail.",
      "Integrated Agora WebRTC consultations, Socket.io updates and multi-step React Hook Form + Zod workflows.",
      "Work directly with backend engineers on typed REST contracts, loading states and failure handling.",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Redux Toolkit",
      "Zod",
      "Agora RTC",
    ],
    platforms: ["Tamkeen", "MyCoifeur", "Deshbyte"],
  },
];

export const toolkitData: ToolkitGroup[] = [
  {
    title: "Frontend",
    items: [
      "React 19",
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS 4",
      "Radix UI",
      "Framer Motion",
    ],
  },
  {
    title: "State & data",
    items: [
      "Redux Toolkit",
      "RTK Query",
      "React Hook Form",
      "Zod",
      "REST APIs",
      "Socket.io",
    ],
  },
  {
    title: "Backend",
    items: [
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "TypeORM",
      "MongoDB",
      "Redis / BullMQ",
    ],
  },
  {
    title: "Workflow",
    items: [
      "Turborepo",
      "pnpm workspaces",
      "Git / GitHub",
      "Vitest",
      "Autocannon",
      "ESLint",
    ],
  },
];
