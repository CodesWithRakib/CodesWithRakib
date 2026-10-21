import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GsapReveal } from "@/components/motion/GsapReveal";
import { engineeringStrengthsData } from "@/data/principles";

export function EngineeringStrengthsSection() {
  return (
    <section id="principles" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <GsapReveal>
          <div data-reveal>
            <SectionHeader
              index="05"
              badge="Approach"
              title="How I make engineering decisions."
              description="Four habits that show up in the code: boundaries before cleverness, contracts before integration, and a clear state model before a feature ships."
            />
          </div>
        </GsapReveal>

        <div className="mt-14">
          {engineeringStrengthsData.map((principle, index) => (
            <GsapReveal key={principle.id}>
              <article
                data-reveal
                className="group grid grid-cols-1 gap-4 border-t border-border/80 py-7 sm:grid-cols-12 sm:gap-6"
              >
                <div className="sm:col-span-1">
                  <span className="font-mono text-[10px] text-primary">
                    0{index + 1}
                  </span>
                </div>

                <div className="sm:col-span-5">
                  <h3 className="max-w-xs text-balance font-display text-[clamp(1.4rem,2.2vw,1.8rem)] leading-[1.05] tracking-[-0.015em] text-foreground">
                    {principle.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-[11px] font-medium leading-snug text-primary">
                    {principle.tagline}
                  </p>
                </div>

                <div className="sm:col-span-6">
                  <p className="max-w-xl text-pretty text-[12px] leading-relaxed text-muted-foreground">
                    {principle.description}
                  </p>
                  <p className="mt-3 max-w-xl font-mono text-[9px] leading-relaxed text-muted-foreground">
                    <span className="uppercase tracking-[0.14em] text-foreground/70">
                      Evidence ·{" "}
                    </span>
                    {principle.evidence}
                  </p>
                  {principle.projectLink && (
                    <a
                      href={principle.projectLink.href}
                      className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-medium text-primary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <span className="underline-sweep">
                        {principle.projectLink.label}
                      </span>
                      <ArrowUpRight
                        className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              </article>
            </GsapReveal>
          ))}
          <div className="border-t border-border/80" />
        </div>
      </Container>
    </section>
  );
}
