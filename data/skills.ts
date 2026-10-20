export interface SkillItem {
  name: string;
  context: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  badge: string;
  hierarchy: "primary" | "additional" | "developing";
  summary: string;
  skills: SkillItem[];
}

export const skillsData: SkillGroup[] = [
  {
    id: "frontend-core",
    title: "Frontend Development",
    badge: "Primary Focus & Daily Production",
    hierarchy: "primary",
    summary:
      "Core production stack applied daily at SOFOF Tech and across flagship applications with strict attention to performance and type safety.",
    skills: [
      {
        name: "React 19 & Next.js 16",
        context: "App Router, Server Components (RSC), Client leaf nodes, and route handlers",
      },
      {
        name: "TypeScript",
        context: "Strict typing, generics, interfaces, and isomorphic DTO validation",
      },
      {
        name: "Tailwind CSS 4",
        context: "Utility-first design tokens, responsive layouts, and modern CSS variables",
      },
      {
        name: "UI Primitives & Systems",
        context: "shadcn/ui, Radix UI headless primitives, Lucide icons, and Figma token translation",
      },
      {
        name: "Bidirectional & i18n",
        context: "Arabic RTL layouts, bidi text reshaping (bidi-js), and next-intl routing",
      },
    ],
  },
  {
    id: "state-forms",
    title: "State Management & Forms",
    badge: "Daily Production Practice",
    hierarchy: "primary",
    summary:
      "Managing complex client state, predictable data fetching, and bulletproof input validation pipelines.",
    skills: [
      {
        name: "Redux Toolkit & RTK Query",
        context: "Normalized caching, optimistic updates, tag invalidation, and persistent slices",
      },
      {
        name: "React Hook Form & Zod",
        context: "High-performance uncontroller forms with runtime schema validation",
      },
      {
        name: "REST API Integration",
        context: "Typed fetch clients, error boundaries, retry policies, and loading skeletons",
      },
      {
        name: "Real-Time & Multimedia",
        context: "Socket.io event subscriptions, WebRTC audio/video (Agora RTC), and Web Audio API",
      },
    ],
  },
  {
    id: "backend-databases",
    title: "Backend & Database Architecture",
    badge: "Demonstrated in Monorepos",
    hierarchy: "additional",
    summary:
      "Applied practical full-stack capabilities built and verified in flagship monorepos (OgroniEdu, Dhruto, Gramer Bazar).",
    skills: [
      {
        name: "NestJS & Node.js",
        context: "Modular controllers, dependency injection, validation pipes, and guards",
      },
      {
        name: "Express.js",
        context: "RESTful endpoints, custom middleware pipelines, and CORS configuration",
      },
      {
        name: "PostgreSQL & TypeORM",
        context: "Relational data modeling, foreign keys, migrations, and ACID transactions",
      },
      {
        name: "MongoDB & Mongoose",
        context: "Document schemas, embedded documents, and query indexing",
      },
    ],
  },
  {
    id: "engineering-workflows",
    title: "Engineering Workflows & Tools",
    badge: "Active Practice & Growth",
    hierarchy: "developing",
    summary:
      "Modern development tooling, repository hygiene, asynchronous queues, and testing frameworks.",
    skills: [
      {
        name: "Monorepo Tooling",
        context: "Turborepo, pnpm workspaces, and shared packages (@contracts)",
      },
      {
        name: "Background Queues & Caching",
        context: "BullMQ job workers and Redis caching (implemented in Dhruto & Gramer Bazar)",
      },
      {
        name: "Git & GitHub Workflows",
        context: "Feature branching, PR reviews, semantic commits, and issue tracking",
      },
      {
        name: "Testing & Code Quality",
        context: "Vitest unit tests, Autocannon load testing scripts, ESLint 9, and Prettier",
      },
    ],
  },
];
