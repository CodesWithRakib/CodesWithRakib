export interface Capability {
  index: string;
  title: string;
  description: string;
}

export interface Profile {
  name: string;
  fullName: string;
  role: string;
  company: string;
  location: string;
  timezone: string;
  availability: string;
  heroValue: string;
  about: string[];
  statement: string;
  capabilities: Capability[];
}

export const profileData: Profile = {
  name: "Rakib Islam",
  fullName: "Md. Rakib Islam",
  role: "Frontend developer",
  company: "SOFOF Tech",
  location: "Dhaka, Bangladesh",
  timezone: "UTC+6",
  availability: "Open to frontend & full-stack roles",
  heroValue:
    "I turn complex product requirements into fast, accessible interfaces — and follow the work down the stack when a feature needs it.",
  statement: "I build interfaces that hold up after launch.",
  about: [
    "I’m a frontend developer at SOFOF Tech in Dhaka, shipping production platforms for international clients — including full Arabic RTL interfaces and real-time consultation tools.",
    "My work sits between design and engineering: precise layout, accessible components, predictable state, and the backend work needed to make a feature genuinely complete.",
  ],
  capabilities: [
    {
      index: "01",
      title: "Interface engineering",
      description:
        "Production Next.js App Router applications built from real design systems, not one-off screens.",
    },
    {
      index: "02",
      title: "Type-safe by default",
      description:
        "Shared schemas and strict TypeScript from the database boundary to the form field.",
    },
    {
      index: "03",
      title: "Systems thinking",
      description:
        "State machines, queues and data models that keep complex workflows predictable.",
    },
    {
      index: "04",
      title: "Full-stack range",
      description:
        "Comfortable across NestJS, PostgreSQL and Redis when the interface needs more than a mock.",
    },
  ],
};
