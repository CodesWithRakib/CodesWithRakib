import type { Project } from "@/types";

/**
 * Placeholder projects. `image` paths are intentionally left for the theme
 * branches to fill; the foundation page does not render them.
 */
export const projects = [
  {
    slug: "northwind-analytics",
    title: "Northwind Analytics",
    description:
      "A self-serve analytics workspace for small product teams, built around a fast query builder and readable dashboards.",
    longDescription:
      "Northwind turns raw event tables into shared dashboards without a data team. I led the frontend: a keyboard-first query builder, virtualised result grids and a chart layer that stays interactive at 50k rows.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Postgres", "Recharts"],
    image: "/projects/northwind-analytics.png",
    liveUrl: "https://northwind.example.com",
    repoUrl: "https://github.com/jordanavery/northwind-analytics",
    featured: true,
    year: 2025,
    category: "web-app",
  },
  {
    slug: "atlas-design-system",
    title: "Atlas Design System",
    description:
      "An accessible component library and token pipeline shared by four product teams, with documentation generated from the source.",
    tech: ["React", "TypeScript", "Radix UI", "Storybook", "Style Dictionary"],
    image: "/projects/atlas-design-system.png",
    repoUrl: "https://github.com/jordanavery/atlas",
    featured: true,
    year: 2024,
    category: "design-system",
  },
  {
    slug: "pulse-habits",
    title: "Pulse",
    description:
      "A calm habit tracker for iOS and the web that favours streaks you can recover from over streaks you are afraid to break.",
    tech: ["React", "Vite", "Zustand", "IndexedDB", "Framer Motion"],
    image: "/projects/pulse-habits.png",
    liveUrl: "https://pulse.example.com",
    featured: false,
    year: 2024,
    category: "web-app",
  },
  {
    slug: "relay-docs",
    title: "Relay Docs",
    description:
      "A documentation engine that turns typed API comments into searchable reference pages at build time.",
    tech: ["Astro", "MDX", "TypeScript", "Pagefind"],
    image: "/projects/relay-docs.png",
    repoUrl: "https://github.com/jordanavery/relay-docs",
    featured: false,
    year: 2023,
    category: "open-source",
  },
] satisfies readonly Project[];
