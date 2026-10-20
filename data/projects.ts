export interface Project {
  id: string;
  title: string;
  nativeTitle: string;
  tagline: string;
  category: string;
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  summary: string;
  status: "Implemented" | "In Progress";
  problem: string;
  role: string;
  keyFeatures: string[];
  architecturalHighlights: string[];
}

export const projectsData: Project[] = [
  {
    id: "ogroniedu",
    title: "OgroniEdu",
    nativeTitle: "অগ্রণী এডু",
    tagline: "Enterprise Tutoring Marketplace, LMS & Tutor Workspace Platform",
    category: "EdTech & Marketplace Monorepo",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Redux Toolkit",
      "RTK Query",
      "NestJS 12",
      "PostgreSQL",
      "TypeORM",
      "Socket.io",
      "next-intl",
    ],
    repoUrl: "https://github.com/CodesWithRakib/ogroniedu",
    summary:
      "A structured tutoring platform for Bangladesh featuring verified tutor credentials, role-based dashboards, 18 modular RTK Query services, and shared monorepo type contracts.",
    status: "Implemented",
    problem:
      "Informal academic tutoring in Bangladesh suffers from unverified credentials, scheduling conflicts, lack of parental tracking, and payment defaults.",
    role: "Architect & Lead Developer: Built monorepo structure, Next.js 16 role-protected layouts, 18 RTK Query services, @contracts package, and Web Audio notification sounds.",
    keyFeatures: [
      "Role-based routing for Admin, Tutor, Guardian, and Student",
      "Bilingual English/Bangla localization via next-intl",
      "Real-time notifications via Socket.io with in-browser audio synthesis",
      "Shared isomorphic Zod validation schemas across frontend and backend",
    ],
    architecturalHighlights: [
      "Shared contracts package (@ogroniedu/contracts) guarantees type parity between Next.js and NestJS.",
      "18 isolated RTK Query services with tag-based cache invalidation.",
      "Custom authentication gates: RequireAuth, RequireRole, and OnboardingGate.",
    ],
  },
  {
    id: "dhruto",
    title: "Dhruto",
    nativeTitle: "দ্রুত",
    tagline: "Courier & Logistics Management Operating System",
    category: "Logistics SaaS & Queue Processing",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Redux Toolkit",
      "NestJS 11",
      "PostgreSQL",
      "TypeORM",
      "Redis",
      "BullMQ",
      "React Hook Form",
      "Zod",
    ],
    repoUrl: "https://github.com/CodesWithRakib/dhruto",
    summary:
      "A tech-first courier operating system automating the parcel lifecycle with a 21-state machine, Redis/BullMQ background queue processing, and COD reconciliation ledgers.",
    status: "Implemented",
    problem:
      "Bangladeshi e-commerce logistics face high return-to-origin (RTO) rates, cash-on-delivery reconciliation delays, and uncoordinated hub bag dispatching.",
    role: "Full-Stack Architect & Engineer: Modeled 21-state parcel state machine, designed Redis/BullMQ queue processors, built Next.js merchant portal, and modeled relational PostgreSQL ledgers.",
    keyFeatures: [
      "Merchant shipment creation, tracking, and bulk import",
      "Asynchronous queue workers for parcel lifecycle transitions",
      "Double-entry COD settlement and merchant wallet tracking",
      "Normalized hierarchical geographic database schema (Division → District → Upazila → Hub)",
    ],
    architecturalHighlights: [
      "Strict 21-state parcel state machine preventing invalid status transitions.",
      "Decoupled background processing with BullMQ and Redis prevents HTTP request timeouts during heavy batch uploads.",
      "Transactional locking prevents race conditions during multi-operator hub scans.",
    ],
  },
  {
    id: "gramer-bazar",
    title: "Gramer Bazar SaaS",
    nativeTitle: "গ্রামের বাজার",
    tagline: "Hyperlocal Rural Marketplace SaaS Platform",
    category: "E-Commerce & Real-Time Communication",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "NestJS 12",
      "PostgreSQL",
      "TypeORM",
      "Redis Cache",
      "Socket.io",
      "Autocannon",
    ],
    repoUrl: "https://github.com/CodesWithRakib/gramer-bazar-saas",
    summary:
      "A mobile-first rural marketplace connecting village producers, consumers, and riders with faceted multi-attribute catalog filtering, Socket.io real-time chat, and load benchmarks.",
    status: "Implemented",
    problem:
      "Rural cottage artisans and agricultural producers in Bangladesh lack digital storefronts to sell locally without paying steep middleman fees.",
    role: "Full-Stack Developer & Frontend Lead: Built Next.js catalog and cart drawer, faceted filtering with URL sync, real-time chat gateway, Redis caching, and Autocannon load-test benchmarks.",
    keyFeatures: [
      "Faceted catalog filter sidebar with URL query synchronization",
      "Real-time customer-merchant support chat powered by Socket.io",
      "Fashion size chart modals, product requests, and quick checkout",
      "Automated load testing and query benchmarking scripts using Autocannon",
    ],
    architecturalHighlights: [
      "Redis caching layer for catalog queries optimizes response times on low-bandwidth rural connections.",
      "Client-side image compression reduces upload payload size on mobile networks.",
      "Comprehensive load-testing scripts benchmark offset vs cursor pagination under high concurrency.",
    ],
  },
];
