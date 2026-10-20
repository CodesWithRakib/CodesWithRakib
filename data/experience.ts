export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  isCurrent: boolean;
  type: string;
  overview: string;
  responsibilities: {
    title: string;
    description: string;
  }[];
  technologies: string[];
  projectsMentioned?: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    company: "SOFOF Tech",
    role: "Junior Frontend Developer",
    location: "Dhaka, Bangladesh",
    period: "Present",
    type: "Full-Time (On-site / Hybrid)",
    isCurrent: true,
    overview:
      "Responsible for building responsive production web applications, multimedia consultation features, and bidirectional Arabic RTL layouts using React, Next.js, and TypeScript.",
    responsibilities: [
      {
        title: "Bidirectional Arabic RTL & English UI",
        description:
          "Implemented locale-aware layouts and bidirectional text rendering (bidi-js, arabic-reshaper) for Middle Eastern client SaaS platforms (Tamkeen, MyCoifeur), ensuring typographic fidelity and native reading ergonomics.",
      },
      {
        title: "Real-Time Consultation & Media Workflows",
        description:
          "Integrated WebRTC audio/video communications using Agora RTC SDK alongside interactive whiteboards for virtual consultations and client collaboration.",
      },
      {
        title: "Modular Component Architecture",
        description:
          "Built responsive, accessible UI components in Next.js 16 (App Router) and React 19 with TypeScript and Tailwind CSS 4, translating Figma designs into production-ready interfaces.",
      },
      {
        title: "Schema-Validated Form Systems",
        description:
          "Developed multi-step form workflows with React Hook Form and Zod, establishing centralized error feedback and resilient input validation without unnecessary re-renders.",
      },
      {
        title: "Client State & Persistence",
        description:
          "Managed client state, persistent storage, and optimistic UI transitions using Redux Toolkit, Redux Persist, and Socket.io event listeners.",
      },
      {
        title: "Cross-Functional API Integration",
        description:
          "Collaborated with backend engineers to consume RESTful endpoints, validate incoming payloads, and handle asynchronous loading skeletons and error boundaries.",
      },
    ],
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Redux Toolkit",
      "React Hook Form",
      "Zod",
      "Agora RTC",
      "Socket.io",
      "Radix UI",
    ],
    projectsMentioned: [
      "Tamkeen Client WebApp (Virtual consultation & interactive whiteboard platform)",
      "MyCoifeur Web App (Grooming service provider & admin interface)",
      "Deshbyte Corporate Web Portal",
    ],
  },
];
