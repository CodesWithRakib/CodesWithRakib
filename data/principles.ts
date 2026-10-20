export interface Principle {
  title: string;
  tagline: string;
  description: string;
}

export const principlesData: Principle[] = [
  {
    title: "Type Safety Across Boundaries",
    tagline: "Zero 'any'. Strict contracts prevent runtime failures.",
    description:
      "When frontend and backend share typed schemas, API drift disappears. I enforce strict types from database models down to UI form inputs.",
  },
  {
    title: "Predictable State & Resilience",
    tagline: "Always design for network latency and empty states.",
    description:
      "Every asynchronous interaction must cleanly handle loading skeletons, network timeouts, partial failures, and actionable error messages.",
  },
  {
    title: "Accessibility & Responsive Craft",
    tagline: "Accessible by default, not as an afterthought.",
    description:
      "High-contrast color ratios (WCAG 2.1 AA), visible keyboard focus rings, semantic landmark elements, and mobile-first touch ergonomics are non-negotiable.",
  },
  {
    title: "Maintainable Monorepo Hygiene",
    tagline: "Decouple code; colocate shared logic.",
    description:
      "Structuring projects into modular packages (@contracts, @ui, @config) keeps codebases clean and easy for multi-developer teams to extend.",
  },
];
