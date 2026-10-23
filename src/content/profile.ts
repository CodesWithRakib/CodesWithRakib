import type { Profile, SiteConfig } from "@/types";

/**
 * Identity is real; projects, skills and experience in this branch are still
 * placeholder content and should be replaced before launch.
 */
export const siteConfig = {
  name: "Md. Rakib Islam",
  url: "https://codeswithrakib.github.io",
  ogImage: "/og.png",
  description:
    "Rakib Islam is a frontend developer in Dhaka building production web applications with React, Next.js and TypeScript — from typed interfaces to NestJS and PostgreSQL systems.",
} satisfies SiteConfig;

export const profile = {
  name: "Md. Rakib Islam",
  role: "Frontend Developer",
  tagline:
    "I turn complex product requirements into fast, accessible interfaces — and follow the work down the stack when a feature needs it.",
  bio: "I’m a frontend developer at SOFOF Tech in Dhaka, shipping production platforms for international clients — including full Arabic RTL interfaces and real-time consultation tools. My work sits between design and engineering: precise layout, accessible components, predictable state, and the backend work needed to make a feature genuinely complete.",
  location: "Dhaka, Bangladesh",
  email: "codeswithrakib@gmail.com",
  avatar: "/avatar.svg",
  socials: [
    { label: "GitHub", url: "https://github.com/CodesWithRakib", icon: "github" },
    { label: "LinkedIn", url: "https://linkedin.com/in/codeswithrakib", icon: "linkedin" },
    { label: "Email", url: "mailto:codeswithrakib@gmail.com", icon: "email" },
  ],
} satisfies Profile;
