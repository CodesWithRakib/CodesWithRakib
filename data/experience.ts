export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  isCurrent: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export const experienceData: Experience[] = [
  {
    company: "SOFOF Tech",
    role: "Frontend Developer",
    location: "Dhaka, Bangladesh (Hybrid)",
    period: "Present",
    isCurrent: true,
    description:
      "Responsible for developing responsive, high-performance web applications and SaaS client portals from design handoff to production deployment.",
    responsibilities: [
      "Engineered responsive, accessible frontends using Next.js App Router, React 19, TypeScript, and Tailwind CSS.",
      "Implemented internationalization and bidirectional layout rendering (Arabic RTL, English, Bengali) with next-intl and bidi text shaping for international client platforms (Tamkeen, MyCoifeur).",
      "Integrated real-time multimedia consultation and streaming capabilities using WebRTC SDKs (Agora RTC, LiveKit).",
      "Built rich interactive user interfaces including TipTap WYSIWYG editors, sortable drag-and-drop lists (@dnd-kit), and client-side canvas/PDF document exports.",
      "Developed robust, validated form workflows with React Hook Form and Zod, ensuring zero runtime data validation errors.",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "WebRTC",
      "Socket.io",
      "React Hook Form",
      "Zod",
    ],
  },
];
