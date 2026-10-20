export interface Profile {
  name: string;
  role: string;
  company: string;
  location: string;
  headline: string;
  valueProp: string;
  statusBadge: string;
  aboutShort: string;
  aboutLong: string[];
  fullStackStatement: string;
  strengths: {
    title: string;
    description: string;
    evidence: string;
  }[];
}

export const profileData: Profile = {
  name: "Md. Rakib Islam",
  role: "Frontend Developer",
  company: "SOFOF Tech",
  location: "Dhaka, Bangladesh",
  statusBadge: "Available for select Frontend & Full-Stack opportunities",
  headline: "Frontend Developer building production-grade web applications & scalable SaaS architectures.",
  valueProp:
    "I specialize in React, Next.js, and TypeScript at SOFOF Tech, building reliable user interfaces with clean component architectures, robust API integrations, and accessible user experiences. Beyond the frontend, I actively engineer full-stack systems with NestJS, PostgreSQL, TypeORM, and background processing queues.",
  aboutShort:
    "I am a Frontend Developer based in Bangladesh, currently building client-facing web applications at SOFOF Tech. My daily focus is crafting fast, type-safe, and responsive frontends that solve real business problems. I believe great engineering lies in maintainable code, predictable state, and tight contracts between the client and server.",
  aboutLong: [
    "My engineering journey is driven by practical problem-solving. At SOFOF Tech, I implement production web applications from high-fidelity Figma designs, working with modern Next.js App Router patterns, TypeScript, and Tailwind CSS. My day-to-day responsibilities include integrating complex REST APIs, managing multi-role authentication flows, supporting bidirectional localization (including Arabic RTL and Bengali), and integrating real-time communication tools such as WebRTC and WebSockets.",
    "Rather than remaining strictly on the visual surface, I treat frontend engineering as part of a larger distributed system. To build better client experiences, I have invested deeply in backend architecture—designing relational database schemas with PostgreSQL and TypeORM, building modular NestJS REST APIs, and implementing queue-based background workflows with Redis and BullMQ.",
    "I do not claim to be an expert in every technology I touch. Instead, I bring a disciplined engineering mindset: writing clean, strictly typed code, respecting component boundaries, ensuring resilience under network failures, and building software that team members can understand and extend.",
  ],
  fullStackStatement:
    "I approach full-stack engineering from the perspective of a frontend developer who wants to eliminate friction across the entire application lifecycle. I am proficient in designing REST APIs, modeling PostgreSQL entities, and managing migrations with TypeORM. While I am actively learning advanced distributed system design and container orchestration, I can already build, test, and maintain robust end-to-end features independently.",
  strengths: [
    {
      title: "Strict Type Safety & Shared Contracts",
      description: "Enforcing shared TypeScript DTOs and Zod validation schemas across monorepo boundaries to eliminate API drift.",
      evidence: "Verified in OgroniEdu (@ogroniedu/contracts).",
    },
    {
      title: "Production-Grade Frontend Architecture",
      description: "Pixel-accurate Figma execution, internationalization with next-intl, Arabic RTL bidi layouts, and WebRTC consultations.",
      evidence: "Verified in SOFOF Tech client platforms (Tamkeen, MyCoifeur).",
    },
    {
      title: "Resilient Data Fetching & Normalized State",
      description: "18 modular RTK Query services with tag-based cache invalidation, optimistic updates, and comprehensive error states.",
      evidence: "Verified in OgroniEdu store architecture.",
    },
    {
      title: "Asynchronous Background Processing",
      description: "Decoupling heavy parcel status transitions, tracking history, and COD reconciliation with Redis and BullMQ queues.",
      evidence: "Verified in Dhruto logistics engine.",
    },
    {
      title: "Component Modularity & Design Tokens",
      description: "Crafting reusable, accessible design systems with Tailwind CSS, customized shadcn/ui primitives, and zero layout shift.",
      evidence: "Verified across all personal and professional codebases.",
    },
  ],
};
