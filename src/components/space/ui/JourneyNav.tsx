"use client";

import { scrollTo } from "@/lib/useLenis";
import { SECTION_IDS, type SectionId } from "../hooks/useCameraPath";

const LABELS: Record<SectionId, string> = {
  hero: "Intro",
  about: "About",
  skills: "Skills",
  projects: "Projects",
  contact: "Contact",
};

export function JourneyNav({ active }: { active: SectionId }) {
  return (
    <nav
      aria-label="Journey sections"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex lg:right-8"
    >
      {SECTION_IDS.map((id) => {
        const isActive = active === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(`#${id}`)}
            aria-label={`Go to ${LABELS[id]}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-2 py-1"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-fg-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              {LABELS[id]}
            </span>
            <span
              aria-hidden
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-2.5 bg-accent shadow-[0_0_12px_var(--accent)]"
                  : "h-1.5 w-1.5 bg-fg-muted/50 group-hover:bg-fg-muted"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
