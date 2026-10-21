import * as React from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GsapReveal } from "@/components/motion/GsapReveal";
import { skillsData } from "@/data/skills";

const hierarchyLabel: Record<string, string> = {
  primary: "Daily production",
  additional: "Verified in monorepos",
  developing: "Active practice",
};

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 border-y border-border/70 bg-surface/40 py-20 sm:py-28"
    >
      <Container>
        <GsapReveal>
          <div data-reveal>
            <SectionHeader
              index="04"
              badge="Capabilities"
              title="Tools chosen for the work, not the résumé."
              description="Grouped by where each tool actually appears: daily production, verified monorepo builds, or active practice. No proficiency percentages."
            />
          </div>
        </GsapReveal>

        <div className="mt-14 grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-2">
          {skillsData.map((category, index) => (
            <GsapReveal key={category.id}>
              <div data-reveal>
                <div className="flex items-baseline gap-3 border-t border-border/80 pt-4">
                  <span className="font-mono text-[9px] text-primary">
                    0{index + 1}
                  </span>
                  <h3 className="flex-1 font-display text-[1.65rem] leading-none tracking-[-0.015em] text-foreground">
                    {category.title}
                  </h3>
                  <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                    {hierarchyLabel[category.hierarchy]}
                  </span>
                </div>

                <p className="mt-3 max-w-md text-[11.5px] leading-relaxed text-muted-foreground">
                  {category.summary}
                </p>

                <ul className="mt-4">
                  {category.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex flex-col gap-1 border-b border-border/60 py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <span className="shrink-0 text-[12px] font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-right text-[10.5px] leading-snug text-muted-foreground">
                        {skill.context}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </GsapReveal>
          ))}
        </div>

        <GsapReveal className="mt-12">
          <div
            data-reveal
            className="flex flex-col gap-2 border-t border-border/80 pt-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="max-w-xl text-[10.5px] leading-relaxed text-muted-foreground">
              Classification is about evidence and frequency, not a score. Tools
              listed under monorepos are implemented and inspectable in the
              linked repositories.
            </p>
            <a
              href="#case-studies"
              className="underline-sweep shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-primary transition-colors hover:text-foreground"
            >
              Inspect the evidence
            </a>
          </div>
        </GsapReveal>
      </Container>
    </section>
  );
}
