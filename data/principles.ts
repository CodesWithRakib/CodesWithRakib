export interface EngineeringStrength {
  id: string;
  title: string;
  tagline: string;
  description: string;
  practicalValue: string;
  evidence: string;
  projectLink?: {
    label: string;
    href: string;
  };
}

export const engineeringStrengthsData: EngineeringStrength[] = [
  {
    id: "maintainable-ui",
    title: "Maintainable Component & UI Architecture",
    tagline: "Decoupled UI primitives, strict TypeScript prop contracts, and design token consistency.",
    description:
      "I prioritize clean boundaries between presentational components, business logic, and API fetching. Reusable headless primitives and design tokens eliminate duplicate styles and prevent regressions as applications scale.",
    practicalValue:
      "Enables rapid UI iteration without cascading layout breaks or unintended side effects.",
    evidence:
      "Applied daily at SOFOF Tech across client dashboards (Tamkeen, MyCoifeur) and in OgroniEdu's multi-role layout shells.",
    projectLink: {
      label: "Inspect OgroniEdu Architecture",
      href: "#case-study-ogroniedu",
    },
  },
  {
    id: "type-safety-boundaries",
    title: "Type Safety Across System Boundaries",
    tagline: "Zero 'any'. Shared schemas eliminate API drift and runtime validation surprises.",
    description:
      "When frontend and backend share typed schemas, runtime integration failures are caught during compilation. I enforce strict typing from database entities and NestJS DTOs directly down to React Hook Form and Zod client inputs.",
    practicalValue:
      "Eliminates silent API contract drift and guarantees isomorphic runtime validation.",
    evidence:
      "Authored @ogroniedu/contracts monorepo package consumed by both Next.js and NestJS, and synchronized TypeORM entities in Dhruto.",
    projectLink: {
      label: "Inspect Shared Contracts",
      href: "#case-study-ogroniedu",
    },
  },
  {
    id: "workflow-modeling",
    title: "Complex SaaS Workflow & State Modeling",
    tagline: "Deterministic finite state machines and resilient background queues over fragile ad-hoc logic.",
    description:
      "Real-world business logic—such as courier parcel dispatching, escrow cash-on-delivery, and tutor booking calendars—demands formal state models rather than scattered boolean flags.",
    practicalValue:
      "Prevents invalid state transitions, race conditions, and financial ledger discrepancies.",
    evidence:
      "Engineered Dhruto's formal 21-state parcel lifecycle state machine with BullMQ asynchronous workers and double-entry COD ledgers.",
    projectLink: {
      label: "Inspect Dhruto State Machine",
      href: "#case-study-dhruto",
    },
  },
  {
    id: "resilient-ux-localization",
    title: "Bidirectional (RTL/LTR) & Accessible Interfaces",
    tagline: "Production-grade Arabic RTL layouts, semantic landmarks, and low-bandwidth resilience.",
    description:
      "International SaaS demands thoughtful engineering: bidirectional text reshaping for Arabic script, high-contrast color tokens (WCAG AA), visible keyboard focus states, and client-side image compression for low-connectivity environments.",
    practicalValue:
      "Ensures software is genuinely usable across international locales and diverse device capabilities.",
    evidence:
      "Implemented Arabic bidi text rendering in Tamkeen at SOFOF Tech, and client-side image compression in Gramer Bazar.",
    projectLink: {
      label: "View SOFOF Tech Experience",
      href: "#experience",
    },
  },
];
