"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import type { SectionId } from "@/components/space/hooks/useCameraPath";
import { HeroOverlay } from "@/components/space/ui/HeroOverlay";
import { JourneyNav } from "@/components/space/ui/JourneyNav";
import { ProjectOrbit } from "@/components/space/ui/ProjectOrbit";
import { SectionReveal } from "@/components/space/ui/SectionReveal";
import { SkillConstellation } from "@/components/space/ui/SkillConstellation";
import "../styles/space.css";

// The scene is client-only: it must never delay first paint, and it has no
// meaningful server-rendered output.
const SpaceScene = dynamic(
  () => import("@/components/space/SpaceScene").then((module) => module.SpaceScene),
  { ssr: false, loading: () => null },
);

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const handleSectionChange = useCallback((section: SectionId) => {
    setActiveSection(section);
  }, []);

  const currentRole = experience[0];

  return (
    <div className="space-page">
      <SpaceScene onSectionChange={handleSectionChange} />
      <div aria-hidden className="space-scrim" />
      <JourneyNav active={activeSection} />

      <div id="journey" className="space-content">
        <section id="hero" className="space-hero" aria-label="Introduction">
          <HeroOverlay />
        </section>

        <section id="about" className="space-section" aria-labelledby="about-title">
          <SectionReveal className="space-shell">
            <div className="space-panel max-w-2xl p-7 sm:p-10">
              <p className="space-eyebrow">01 — Mission log</p>
              <h2 id="about-title" className="space-heading mt-4">
                A frontend engineer in orbit
              </h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">{profile.bio}</p>

              <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="space-eyebrow">Based in</dt>
                  <dd className="mt-1 text-base text-fg">{profile.location}</dd>
                </div>
                <div>
                  <dt className="space-eyebrow">Currently</dt>
                  <dd className="mt-1 text-base text-fg">
                    {currentRole ? `${currentRole.role} · ${currentRole.company}` : "Independent"}
                  </dd>
                </div>
                <div>
                  <dt className="space-eyebrow">Focus</dt>
                  <dd className="mt-1 text-base text-fg">
                    Design systems · Performance · Accessibility
                  </dd>
                </div>
                <div>
                  <dt className="space-eyebrow">Status</dt>
                  <dd className="mt-1 flex items-center gap-2 text-base text-fg">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]"
                    />
                    Open to new work
                  </dd>
                </div>
              </dl>
            </div>
          </SectionReveal>
        </section>

        <section id="skills" className="space-section" aria-labelledby="skills-title">
          <SectionReveal className="space-shell">
            <div className="space-panel p-7 sm:p-10">
              <p className="space-eyebrow">02 — Capabilities</p>
              <h2 id="skills-title" className="space-heading mt-4">
                The constellation
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
                Ten instruments I know well. Hover or focus one to see the connections it shares
                with the rest of the stack.
              </p>
              <div className="mt-10">
                <SkillConstellation />
              </div>
            </div>
          </SectionReveal>
        </section>

        <section id="projects" className="space-section" aria-labelledby="projects-title">
          <SectionReveal className="space-shell">
            <p className="space-eyebrow">03 — Missions</p>
            <h2 id="projects-title" className="space-heading mt-4">
              Selected work, in orbit
            </h2>
            <p className="mb-10 mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
              A few builds I am happy to put my name on. Open a card for the full log.
            </p>
            <ProjectOrbit />
          </SectionReveal>
        </section>

        <section id="contact" className="space-section" aria-labelledby="contact-title">
          <SectionReveal className="space-shell">
            <div className="space-panel max-w-2xl p-7 sm:p-10">
              <p className="space-eyebrow">04 — Open channel</p>
              <h2 id="contact-title" className="space-heading mt-4">
                Let’s build something that outlasts the launch.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                The fastest way to reach me is email. I read everything and reply within two working
                days.
              </p>

              <a
                href={`mailto:${profile.email}`}
                data-cursor="hover"
                className="mt-8 inline-block font-display text-2xl tracking-[0.01em] text-accent transition-colors hover:text-fg sm:text-3xl"
              >
                {profile.email}
              </a>

              <ul className="mt-8 flex flex-wrap gap-3">
                {profile.socials
                  .filter((social) => social.icon !== "email")
                  .map((social) => (
                    <li key={social.label}>
                      <a href={social.url} target="_blank" rel="noreferrer" className="space-link">
                        {social.label} <span aria-hidden>↗</span>
                      </a>
                    </li>
                  ))}
              </ul>

              <p className="mt-10 border-t border-border pt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
                © {new Date().getFullYear()} {profile.name} · {profile.location}
              </p>
            </div>
          </SectionReveal>
        </section>
      </div>
    </div>
  );
}
