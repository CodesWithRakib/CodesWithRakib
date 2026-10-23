export type PosterTone = "ink" | "clay" | "olive";

export interface Project {
  id: string;
  index: string;
  title: string;
  nativeTitle: string;
  domain: string;
  description: string;
  contribution: string;
  stack: string[];
  repoUrl: string;
  poster: PosterTone;
  artworkCaption: string;
  /** Short, verified facts used by the poster artwork. */
  facts: {
    label: string;
    value: string;
  }[];
}

export interface CompactProject {
  title: string;
  category: string;
  description: string;
  stack: string[];
  repoUrl: string;
}

export const featuredProjects: Project[] = [
  {
    id: "ogroniedu",
    index: "01",
    title: "OgroniEdu",
    nativeTitle: "অগ্রণী এডু",
    domain: "EdTech marketplace · LMS",
    description:
      "A tutoring marketplace for Bangladesh with verified tutors, four role-based workspaces and a shared learning platform.",
    contribution:
      "Architected the Turborepo monorepo and built the Next.js role dashboards, 18 RTK Query services and the Zod contracts shared with the NestJS API.",
    stack: ["Next.js 16", "TypeScript", "RTK Query", "NestJS", "PostgreSQL"],
    repoUrl: "https://github.com/CodesWithRakib/ogroniedu",
    poster: "ink",
    artworkCaption: "Guardian workspace · role-aware booking and contracts",
    facts: [
      { label: "Roles", value: "4 isolated workspaces" },
      { label: "Data layer", value: "18 RTK Query services" },
      { label: "Contracts", value: "Shared Zod schemas" },
    ],
  },
  {
    id: "dhruto",
    index: "02",
    title: "Dhruto",
    nativeTitle: "দ্রুত",
    domain: "Logistics operations system",
    description:
      "A courier operating system that moves every parcel through a guarded 21-state lifecycle, from pickup to verified cash settlement.",
    contribution:
      "Modelled the 21-state parcel lifecycle, built the Redis and BullMQ workers, the merchant portal and the double-entry COD settlement ledger.",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Redis", "BullMQ"],
    repoUrl: "https://github.com/CodesWithRakib/dhruto",
    poster: "clay",
    artworkCaption: "Merchant portal · parcel lifecycle and settlement",
    facts: [
      { label: "Lifecycle", value: "21 guarded states" },
      { label: "Queue", value: "BullMQ / Redis workers" },
      { label: "Ledger", value: "CASH_PENDING → CASH_VERIFIED" },
    ],
  },
  {
    id: "gramer-bazar",
    index: "03",
    title: "Gramer Bazar",
    nativeTitle: "গ্রামের বাজার",
    domain: "Hyperlocal marketplace SaaS",
    description:
      "A mobile-first marketplace that connects rural producers with nearby buyers through a fast, faceted catalogue and live chat.",
    contribution:
      "Led the customer and merchant frontend, engineered URL-synchronised faceted filtering, integrated Socket.io chat and wrote the Autocannon load benchmarks.",
    stack: ["Next.js", "TypeScript", "Socket.io", "NestJS", "Redis"],
    repoUrl: "https://github.com/CodesWithRakib/gramer-bazar-saas",
    poster: "olive",
    artworkCaption: "Storefront catalogue · faceted search and buyer chat",
    facts: [
      { label: "Catalogue", value: "Faceted, URL-synced filters" },
      { label: "Realtime", value: "Socket.io buyer chat" },
      { label: "Reads", value: "Redis-backed caching" },
    ],
  },
];

export const additionalProjects: CompactProject[] = [
  {
    title: "Globira E-Commerce",
    category: "Full-stack storefront",
    description:
      "An earlier MERN e-commerce build covering Firebase authentication, product catalogues and cart flows.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    repoUrl: "https://github.com/CodesWithRakib/globira-client-side",
  },
  {
    title: "Plant Tracker",
    category: "Frontend application",
    description:
      "A responsive plant-care tracker with search, filtering and persisted client-side state.",
    stack: ["React", "JavaScript", "Tailwind CSS"],
    repoUrl: "https://github.com/CodesWithRakib/plant-care-client-side",
  },
];
