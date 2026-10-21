import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GsapReveal } from "@/components/motion/GsapReveal";
import { TimelineProgress } from "@/components/motion/TimelineProgress";
import { experienceData } from "@/data/experience";
import { profileData } from "@/data/profile";

export function ExperienceSection() {
  const role = experienceData[0];

  return (
    <section id="experience" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <GsapReveal>
          <div data-reveal>
            <SectionHeader
              index="03"
              badge="Experience"
              title="Shipping interfaces inside a real product team."
              description="Commercial work at SOFOF Tech, plus the systems I build independently to understand the whole stack."
            />
          </div>
        </GsapReveal>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <GsapReveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div data-reveal className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="eyebrow">Profile</span>
              </div>
              <h3
                data-reveal
                className="mt-4 max-w-sm text-balance font-display text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.02] tracking-[-0.02em] text-foreground"
              >
                A frontend engineer who reads the whole system.
              </h3>
              <p
                data-reveal
                className="mt-5 max-w-sm text-pretty text-[13px] leading-relaxed text-muted-foreground"
              >
                {profileData.aboutShort}
              </p>

              <blockquote
                data-reveal
                className="mt-6 max-w-sm border-l border-primary/35 pl-4 text-[12px] leading-relaxed text-foreground/85"
              >
                {profileData.fullStackStatement}
              </blockquote>

              <dl
                data-reveal
                className="mt-8 space-y-3 border-t border-border/80 pt-5 text-[11px]"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                    Based in
                  </dt>
                  <dd className="inline-flex items-center gap-1.5 font-medium text-foreground">
                    <MapPin className="h-3 w-3 text-primary" aria-hidden="true" />
                    Dhaka, Bangladesh
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                    Availability
                  </dt>
                  <dd className="font-medium text-foreground">
                    Frontend &amp; full-stack roles
                  </dd>
                </div>
              </dl>

              <Link
                data-reveal
                href="/resume"
                className="group mt-6 inline-flex items-center gap-1.5 text-[12px] font-medium text-primary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <span className="underline-sweep">Résumé &amp; CV</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </GsapReveal>

          <div className="lg:col-span-8">
            <GsapReveal>
              <div
                data-reveal
                className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-4"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-subtle/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-primary-subtle-foreground">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  Current role
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                  {role.period} · {role.location}
                </span>
              </div>

              <h3
                data-reveal
                className="mt-5 font-display text-[clamp(2.3rem,4.6vw,3.6rem)] leading-[0.95] tracking-[-0.025em] text-foreground"
              >
                {role.role}
              </h3>
              <p data-reveal className="mt-2 text-[15px] font-medium text-primary">
                {role.company}
              </p>
              <p
                data-reveal
                className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground"
              >
                {role.type}
              </p>

              <p
                data-reveal
                className="mt-6 max-w-2xl text-pretty text-[13.5px] leading-relaxed text-muted-foreground"
              >
                {role.overview}
              </p>
            </GsapReveal>

            <div className="mt-10">
              <span className="eyebrow">Selected contributions</span>
              <TimelineProgress>
                <GsapReveal className="mt-4">
                  <ol className="space-y-7">
                    {role.responsibilities.map((item, index) => (
                      <li
                        key={item.title}
                        data-reveal
                        className="group relative sm:pl-8"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-1.5 hidden h-[7px] w-[7px] rounded-full border border-primary/60 bg-background transition-colors duration-300 group-hover:bg-primary sm:block"
                        />
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-[9px] text-primary">
                            0{index + 1}
                          </span>
                          <h4 className="text-[13px] font-semibold leading-snug text-foreground">
                            {item.title}
                          </h4>
                        </div>
                        <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </li>
                    ))}
                  </ol>
                </GsapReveal>
              </TimelineProgress>
            </div>

            {role.projectsMentioned && (
              <GsapReveal className="mt-10">
                <div
                  data-reveal
                  className="border-t border-border/80 pt-5"
                >
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                    Client platforms in production
                  </span>
                  <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-3">
                    {role.projectsMentioned.map((project) => (
                      <li
                        key={project}
                        className="text-[11px] leading-snug text-foreground/80"
                      >
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </GsapReveal>
            )}

            <GsapReveal className="mt-8">
              <div
                data-reveal
                className="flex flex-wrap items-center gap-2 border-t border-border/80 pt-5"
              >
                <span className="mr-1 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                  Daily stack
                </span>
                {role.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border/80 px-2 py-1 font-mono text-[9px] leading-none text-foreground/75"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </GsapReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
