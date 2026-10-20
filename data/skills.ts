export interface SkillCategory {
  title: string;
  tier: "production" | "learning";
  skills: {
    name: string;
    description: string;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Frontend Development",
    tier: "production",
    skills: [
      { name: "React", description: "Hooks, component lifecycles, and modern rendering patterns" },
      { name: "Next.js", description: "App Router, Server Components (RSC), and hybrid rendering" },
      { name: "TypeScript", description: "Strict typing, generics, interfaces, and DTO contracts" },
      { name: "Tailwind CSS", description: "Design tokens, utility-first styling, and mobile responsiveness" },
      { name: "shadcn/ui & Radix UI", description: "Accessible, unstyled headless UI primitives" },
    ],
  },
  {
    title: "State Management & Forms",
    tier: "production",
    skills: [
      { name: "Redux Toolkit", description: "Predictable client store with slices and selectors" },
      { name: "RTK Query", description: "Data fetching, caching, and tag-based invalidation" },
      { name: "React Hook Form", description: "High-performance form state without unnecessary re-renders" },
      { name: "Zod", description: "Schema-based runtime validation and isomorphic type inference" },
    ],
  },
  {
    title: "Backend Development",
    tier: "production",
    skills: [
      { name: "NestJS", description: "Modular monoliths, dependency injection, and decorators" },
      { name: "Node.js & Express", description: "RESTful API development and middleware pipelines" },
      { name: "REST APIs & Swagger", description: "Self-documenting OpenAPI endpoints and DTO contracts" },
      { name: "WebSockets & Socket.io", description: "Authenticated real-time bidirectional communication" },
    ],
  },
  {
    title: "Databases & Data Modeling",
    tier: "production",
    skills: [
      { name: "PostgreSQL", description: "Relational modeling, foreign keys, and ACID transactions" },
      { name: "TypeORM", description: "Entity definitions, query builder, and migration versioning" },
      { name: "MongoDB & Mongoose", description: "Document collections and schema validation" },
    ],
  },
  {
    title: "Actively Learning & System Architecture",
    tier: "learning",
    skills: [
      { name: "Redis & BullMQ", description: "Asynchronous job queues and worker scheduling (applied in Dhruto)" },
      { name: "Testing (Vitest & Playwright)", description: "Unit, integration, and cross-browser end-to-end tests" },
      { name: "Docker", description: "Containerized development environments and multi-stage builds" },
      { name: "System Design", description: "API rate limiting, caching strategies, and scalable SaaS topology" },
    ],
  },
];
