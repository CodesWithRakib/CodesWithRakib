export interface ProjectTechnicalApproach {
  title: string;
  description: string;
}

export interface ImplementationDetail {
  title: string;
  fileRef?: string;
  description: string;
}

export interface ChallengeTradeoff {
  challenge: string;
  solution: string;
}

export interface ProjectStatusBreakdown {
  statusBadge: "Verified Implemented" | "Active Monorepo" | "In Development";
  implemented: string[];
  inProgress: string[];
  planned: string[];
  liveDemoStatus: string;
}

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
  problem: string;
  targetUsers: string[];
  role: string;
  technicalApproach: ProjectTechnicalApproach[];
  implementationDetails: ImplementationDetail[];
  challenges: ChallengeTradeoff[];
  statusBreakdown: ProjectStatusBreakdown;
  inspectableAreas: string[];
}

export interface EarlyProject {
  title: string;
  category: string;
  techStack: string[];
  repoUrl: string;
  description: string;
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
    problem:
      "Informal academic tutoring in Bangladesh suffers from unverified credentials, scheduling conflicts, lack of parental tracking, and payment defaults. OgroniEdu centralizes tutor discovery across 64 districts, session booking, and attendance tracking into an auditable ecosystem.",
    targetUsers: [
      "Guardians (district-level tutor search, child session tracking, attendance notifications)",
      "Tutors (availability calendars, hourly bookings, lesson notes, payout ledgers)",
      "Students (scheduled sessions, curriculum homework, in-app tutor chat)",
      "Platform Admins (tutor NID verification, dispute moderation, platform analytics)",
    ],
    role: "Architect & Lead Developer: Designed the full-stack monorepo, built Next.js 16 role-protected layouts ((admin), (dashboard), tutor, guardian, student), authored 18 RTK Query services, and enforced isomorphic Zod contracts.",
    technicalApproach: [
      {
        title: "Isomorphic Contracts Package (@ogroniedu/contracts)",
        description:
          "Maintains a shared TypeScript monorepo package containing all DTOs and Zod schemas. Both Next.js client forms and NestJS controller ValidationPipes consume the identical schema, eliminating API drift.",
      },
      {
        title: "18 Modular RTK Query Slices",
        description:
          "Rather than a monolithic store, data fetching is split into 18 domain services (admin-api, bookings-api, learning-api, payments-api, trust-api, etc.) with normalized caching and tag invalidation.",
      },
      {
        title: "Real-Time WebSocket Gateway & Web Audio API",
        description:
          "Authenticated Socket.io gateway delivers instant booking updates. Notification sounds are generated dynamically via the browser's native AudioContext, avoiding external audio file downloads.",
      },
      {
        title: "Bilingual Internationalization (next-intl)",
        description:
          "Comprehensive route-level locale negotiation supporting Bengali (bn) and English (en) with localized Gregorian/Bangla dates and BDT currency formatting.",
      },
    ],
    implementationDetails: [
      {
        title: "Strict Role Gatekeepers & Layout Shells",
        fileRef: "apps/web/src/components/auth/RequireRole.tsx",
        description:
          "Evaluates authenticated user role claims against protected dashboard routes (Guardian, Tutor, Student, Admin).",
      },
      {
        title: "Audio Synthesis Notification Engine",
        fileRef: "apps/web/src/lib/audio/notification-sound.ts",
        description:
          "Uses browser native Web Audio API oscillators to synthesize multi-tone notification alerts without latency or network fetches.",
      },
      {
        title: "Modular Service Layer & TypeORM Entities",
        fileRef: "apps/api/src/ & packages/database/",
        description:
          "Modular NestJS monolith architecture with immutable SQL migrations as source of truth for all database tables.",
      },
    ],
    challenges: [
      {
        challenge: "Real-time notifications freezing UI during rapid booking updates.",
        solution:
          "Debounced Socket.io event listeners in a centralized SocketProvider and moved audio synthesis off the main thread.",
      },
      {
        challenge: "Dynamic bilingual interface switching across nested dashboard routes.",
        solution:
          "Configured next-intl with route-level locale negotiation ([locale]/(dashboard)/...) preserving URL-based state.",
      },
    ],
    statusBreakdown: {
      statusBadge: "Verified Implemented",
      implemented: [
        "Turborepo monorepo orchestration with pnpm workspaces",
        "Next.js 16 App Router layouts with role protection and next-intl",
        "18 RTK Query services with tag-based cache invalidation",
        "Shared isomorphic contracts (@ogroniedu/contracts)",
        "NestJS 12 modular API with TypeORM PostgreSQL entities",
        "Socket.io real-time notifications with Web Audio chimes",
      ],
      inProgress: [
        "Automated escrow payout settlement integration with banking gateways (SSLCommerz/bKash)",
      ],
      planned: [
        "Dedicated cross-platform mobile apps for Tutors and Guardians",
      ],
      liveDemoStatus: "Local development and staging configurations verified. Public production deployment is internal/staging.",
    },
    inspectableAreas: [
      "Monorepo task graph in turbo.json & pnpm-workspace.yaml",
      "Shared DTO validation in packages/contracts/src/",
      "Frontend RTK Query services in apps/web/src/store/services/",
      "Auth gatekeepers in apps/web/src/components/auth/",
      "NestJS modular controllers & entities in apps/api/src/",
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
    problem:
      "Courier logistics in Bangladesh face severe operational friction: high Return-to-Origin (RTO) rates, cash-on-delivery (COD) reconciliation delays, and uncoordinated hub transfers. Dhruto provides an auditable operating system connecting merchants, hubs, riders, and customers.",
    targetUsers: [
      "E-Commerce Merchants (shipment creation, bulk import, barcode labels, tracking, COD ledgers)",
      "Hub Operators (barcode scanning, bagging, manifest dispatching, rider cash collection)",
      "Delivery Riders (mobile delivery interface, OTP confirmation, failed-attempt logging)",
      "Super Admins (pricing tier configuration, financial audits, platform operations)",
    ],
    role: "Lead Full-Stack Architect & Engineer: Modeled the formal 21-state parcel lifecycle state machine, architected Redis/BullMQ queue workers, built the Next.js merchant portal, and modeled relational PostgreSQL ledgers.",
    technicalApproach: [
      {
        title: "21-State Parcel Lifecycle State Machine",
        description:
          "Enforces strict transition guards across parcel statuses: CREATED → PICKUP_REQUESTED → PICKED_UP → ORIGIN_HUB_RECEIVED → BAGGED → IN_TRANSIT → DESTINATION_HUB_RECEIVED → ASSIGNED_TO_RIDER → OUT_FOR_DELIVERY → DELIVERED → CASH_VERIFIED (with alternate branches for RESCHEDULED, RTO_INITIATED, RETURNED_TO_MERCHANT).",
      },
      {
        title: "Asynchronous Background Queue Processing (BullMQ & Redis)",
        description:
          "Decouples heavy transactional tasks (generating tracking logs, dispatching webhooks, updating ledger balances) from synchronous HTTP API requests to ensure high-concurrency throughput.",
      },
      {
        title: "Auditable Double-Entry COD Settlement Ledger",
        description:
          "Distinguishes between collected cash in rider custody (CASH_PENDING) and deposited cash verified at the hub (CASH_VERIFIED), preventing financial discrepancies before merchant wallet crediting.",
      },
      {
        title: "Normalized Geographic Addressing Engine",
        description:
          "Structures non-standardized Bangladeshi addresses into hierarchical relational entities: Division → District → Thana/Upazila → Hub coverage zone.",
      },
    ],
    implementationDetails: [
      {
        title: "BullMQ Queue Processor Configuration",
        fileRef: "apps/api/src/modules/queue/ & docker-compose.yml",
        description:
          "Configures Redis-backed BullMQ workers for parcel state transitions and asynchronous task retries.",
      },
      {
        title: "Merchant Portal Dashboard & State Slices",
        fileRef: "apps/web-merchant/app/[locale]/(merchant)/",
        description:
          "Next.js 16 merchant interface with granular shipment filtering, status analytics, and label generation.",
      },
      {
        title: "Database Relational Models & Migrations",
        fileRef: "apps/api/src/database/entities/ & Dhruto-Architecture-Docs-v1/",
        description:
          "Relational PostgreSQL tables for parcels, tracking events, hubs, riders, merchants, and wallets.",
      },
    ],
    challenges: [
      {
        challenge: "Preventing race conditions when multiple hub operators scan packages in the same manifest simultaneously.",
        solution:
          "Implemented database-level pessimistic locking in TypeORM and queue-level concurrency limits in BullMQ.",
      },
      {
        challenge: "Handling large bulk parcel uploads without HTTP timeouts.",
        solution:
          "Uploaded shipments are immediately validated via Zod and enqueued into BullMQ for asynchronous batch ingestion.",
      },
    ],
    statusBreakdown: {
      statusBadge: "Active Monorepo",
      implemented: [
        "Master architectural specifications (BRD, PRD, System Design, State Machine)",
        "NestJS API with TypeORM entities, migrations, and BullMQ queue integration",
        "Next.js 16 merchant web portal with role layouts and Zod validation",
        "Double-entry COD settlement data model",
      ],
      inProgress: [
        "Dedicated Rider Progressive Web App (PWA) barcode scanning workflow",
      ],
      planned: [
        "Public customer tracking portal with SMS OTP delivery verification",
      ],
      liveDemoStatus: "Local development and staging configurations verified. Public production deployment is internal/staging.",
    },
    inspectableAreas: [
      "Master architecture specifications in Dhruto-Architecture-Docs-v1/",
      "BullMQ queue configuration in apps/api/src/",
      "Merchant dashboard routes in apps/web-merchant/app/[locale]/",
      "TypeORM database entities in apps/api/src/database/",
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
    problem:
      "Agricultural producers and small cottage artisans in rural upazilas of Bangladesh (starting from Khansama Upazila, Dinajpur) lack digital access to showcase their products and fulfill neighborhood orders without paying steep middleman fees.",
    targetUsers: [
      "Rural Consumers (browsing local village shops, faceted product search, COD checkout, order tracking)",
      "Local Shopkeepers & Sellers (managing product catalog, variants, inventory, and order dispatch)",
      "Delivery Riders (accepting neighborhood delivery routes and updating fulfillment status)",
      "Marketplace Admins (category management, seller approvals, dispute arbitration)",
    ],
    role: "Full-Stack Developer & Frontend Lead: Built the customer and merchant web frontend in Next.js 16, engineered faceted multi-parameter catalog filtering, integrated Socket.io chat, and authored Autocannon load-test benchmarks.",
    technicalApproach: [
      {
        title: "Faceted Multi-Attribute Catalog Filtering",
        description:
          "Engineered a filter sidebar supporting category trees, price sliders, brand facets, ratings, and stock status. All parameters serialize to URL query parameters for shareable search states and server-side rendering.",
      },
      {
        title: "Real-Time WebSocket Chat & In-App Support",
        description:
          "Integrated authenticated Socket.io gateways connecting shoppers and shop owners for pre-purchase inquiries and order dispute arbitration with image evidence upload.",
      },
      {
        title: "Redis Caching Layer for Fast Catalog Reads",
        description:
          "Integrated cache-manager-redis-yet on high-frequency catalog endpoints, significantly accelerating responses for rural users browsing on 3G/4G connections.",
      },
      {
        title: "Automated Benchmarking & Load Testing Suite",
        description:
          "Built Autocannon benchmark scripts to stress-test high-concurrency bursts and evaluate database query performance between offset-based and cursor-based pagination.",
      },
    ],
    implementationDetails: [
      {
        title: "Faceted Filter Sidebar & Catalog Components",
        fileRef: "apps/web/src/components/catalog/ProductFilterSidebar.tsx",
        description:
          "Complex filtering UI synchronizing facet counts, active pills, and URL query parameters with zero page reloads.",
      },
      {
        title: "Real-Time Socket.io Chat Interface",
        fileRef: "apps/web/src/components/chat/ChatInterface.tsx",
        description:
          "Bidirectional messaging widget with message status indicators and dispute resolution evidence attachment.",
      },
      {
        title: "Autocannon Load Testing & Benchmark Suite",
        fileRef: "apps/api/src/seeder/load-test.js & benchmark.js",
        description:
          "Simulates concurrent traffic spikes to measure endpoint latency and database query throughput under load.",
      },
    ],
    challenges: [
      {
        challenge: "Slow catalog response times when querying nested categories and variants.",
        solution:
          "Implemented Redis caching layer on NestJS category queries and added composite database indexes on (shopId, categoryId, status).",
      },
      {
        challenge: "Handling image uploads on low-bandwidth mobile connections.",
        solution:
          "Implemented client-side image compression (image-compression.ts) to shrink image payloads before multipart upload.",
      },
    ],
    statusBreakdown: {
      statusBadge: "Verified Implemented",
      implemented: [
        "Next.js 16 web application with catalog, cart drawer, and checkout components",
        "Faceted multi-attribute filtering with URL query synchronization",
        "Real-time Socket.io chat interface and notification handlers",
        "NestJS backend modules with TypeORM, PostgreSQL, and Redis caching",
        "Autocannon load-test and query benchmark scripts",
      ],
      inProgress: [
        "Offline PWA service worker caching with Serwist for intermittent connectivity",
      ],
      planned: [
        "Automated SMS order dispatching for non-smartphone village users",
      ],
      liveDemoStatus: "Local development and staging configurations verified. Public production deployment is internal/staging.",
    },
    inspectableAreas: [
      "Master system design documents in root markdown files",
      "Catalog components in apps/web/src/components/catalog/",
      "Socket chat interface in apps/web/src/components/chat/",
      "Load testing scripts in apps/api/src/seeder/load-test.js",
    ],
  },
];

export const earlyProjectsData: EarlyProject[] = [
  {
    title: "Globira E-Commerce",
    category: "Full-Stack MERN Project",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Firebase Auth", "Tailwind CSS"],
    repoUrl: "https://github.com/CodesWithRakib/globira-client-side",
    description:
      "An earlier full-stack e-commerce store exploring MERN stack fundamentals, user authentication via Firebase, product catalogs, and cart management.",
  },
  {
    title: "Plant Tracker",
    category: "Frontend Application",
    techStack: ["React", "JavaScript", "Tailwind CSS", "Local Storage"],
    repoUrl: "https://github.com/CodesWithRakib/plant-care-client-side",
    description:
      "A responsive plant-care and schedule monitoring application demonstrating client-side state management, search filtering, and responsive interface design.",
  },
];
