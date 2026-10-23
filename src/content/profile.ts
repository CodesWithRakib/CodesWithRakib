import type { Profile, SiteConfig } from "@/types";

/**
 * Placeholder identity. Theme branches should replace the values here (or swap
 * this module for their own) without touching layout or metadata code.
 */
export const siteConfig = {
  name: "Jordan Avery",
  url: "https://jordanavery.dev",
  ogImage: "/og.png",
  description:
    "Frontend engineer building fast, accessible web interfaces with React, TypeScript and a bias for shipping.",
} satisfies SiteConfig;

export const profile = {
  name: "Jordan Avery",
  role: "Frontend Engineer",
  tagline:
    "I build interfaces that stay fast, legible and pleasant to use — from the first sketch to production.",
  bio: "Frontend engineer with a product mindset. I work across design systems, performance and accessibility, and I am happiest when a hard interaction problem turns into a small, obvious solution.",
  location: "Berlin, Germany",
  email: "hello@jordanavery.dev",
  avatar: "/avatar.svg",
  socials: [
    { label: "GitHub", url: "https://github.com/jordanavery", icon: "github" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/jordanavery", icon: "linkedin" },
    { label: "X", url: "https://x.com/jordanavery", icon: "x" },
    { label: "Email", url: "mailto:hello@jordanavery.dev", icon: "email" },
  ],
} satisfies Profile;
