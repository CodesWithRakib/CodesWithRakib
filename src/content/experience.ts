import type { Experience } from "@/types";

export const experience = [
  {
    company: "Northwind Labs",
    role: "Senior Frontend Engineer",
    start: "2023-02",
    description:
      "Lead the frontend for an analytics workspace used by 4,000 teams. Cut time-to-first-chart from 8s to 1.4s and grew the design-system contribution model to four squads.",
    tech: ["Next.js", "TypeScript", "Postgres", "Playwright"],
  },
  {
    company: "Kite Studio",
    role: "Frontend Engineer",
    start: "2021-05",
    end: "2023-01",
    description:
      "Shipped marketing sites and product interfaces for early-stage clients. Introduced a shared component library and a visual-regression pipeline that removed most of the pre-release QA churn.",
    tech: ["React", "Gatsby", "Tailwind CSS", "Storybook"],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    start: "2019-09",
    end: "2021-04",
    description:
      "Built bespoke sites for studios and independent makers, handling design handoff, implementation and deployment. Learned to scope tightly and ship on a calendar.",
    tech: ["JavaScript", "SCSS", "WordPress", "Netlify"],
  },
] satisfies readonly Experience[];
