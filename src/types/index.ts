/** Shared content model. Everything the theme branches render is typed here. */

export type SocialIcon = "github" | "linkedin" | "x" | "email" | "dribbble";

export type ProjectCategory = "web-app" | "design-system" | "experiment" | "open-source";

export type SkillCategory = "frontend" | "backend" | "tooling" | "design";

/** Deliberately a closed 1–5 scale so a typo cannot silently render an empty meter. */
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface Social {
  label: string;
  url: string;
  icon: SocialIcon;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  /** Path or absolute URL to a square portrait. */
  avatar: string;
  socials: Social[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  /** Path or absolute URL to the project's cover image. */
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  year: number;
  category: ProjectCategory;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  /** Optional key the theme branches can map to an icon set. */
  icon?: string;
}

export interface Experience {
  company: string;
  role: string;
  /** ISO year-month, e.g. "2023-04". */
  start: string;
  /** Omit for the current role. */
  end?: string;
  description: string;
  tech: string[];
}

export interface SiteConfig {
  name: string;
  url: string;
  ogImage: string;
  description: string;
}
