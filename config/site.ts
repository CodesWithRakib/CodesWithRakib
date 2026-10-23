export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: {
    name: string;
    role: string;
    company: string;
    email: string;
    github: string;
    linkedin: string;
  };
  navItems: NavItem[];
  links: {
    github: string;
    linkedin: string;
    email: string;
    portfolio: string;
    resume: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Md. Rakib Islam",
  title: "Rakib Islam — Frontend Developer | React, Next.js, TypeScript",
  description:
    "Rakib Islam is a frontend developer in Dhaka building production web applications with React, Next.js and TypeScript — from typed interfaces to NestJS and PostgreSQL systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://codeswithrakib.github.io",
  author: {
    name: "Md. Rakib Islam",
    role: "Frontend Developer",
    company: "SOFOF Tech",
    email: "codeswithrakib@gmail.com",
    github: "https://github.com/CodesWithRakib",
    linkedin: "https://linkedin.com/in/codeswithrakib",
  },
  navItems: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Experience", href: "/#experience" },
    { label: "Contact", href: "/#contact" },
  ],
  links: {
    github: "https://github.com/CodesWithRakib",
    linkedin: "https://linkedin.com/in/codeswithrakib",
    email: "mailto:codeswithrakib@gmail.com",
    portfolio: "https://codeswithrakib.vercel.app",
    resume: "/resume",
  },
};
