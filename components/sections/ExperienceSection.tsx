import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { experienceData, toolkitData } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-24 border-t border-border py-24 sm:py-28 lg:py-36"
    >
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="type-label flex items-center gap-4 text-muted-foreground">
                <span className="text-primary">03</span>
                <span aria-hidden="true" className="h-px w-10 bg-border" />
                Experience
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <h2 id="experience-heading" className="type-h2 max-w-[16ch]">
                One team. Real production work.
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-14 border-t border-border pt-12 lg:mt-20 lg:grid-cols-12 lg:gap-16 lg:pt-14">
          <div className="lg:col-span-7">
            {experienceData.map((entry) => (
              <div key={entry.company}>
                <Reveal>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="type-h3 text-foreground">{entry.role}</h3>
                    <span className="type-label text-muted-foreground">
                      {entry.period}
                    </span>
                  </div>
                  <p className="mt-3 text-[1.1rem] text-foreground">
                    {entry.company}
                    <span aria-hidden="true" className="mx-2 text-border-strong">
                      /
                    </span>
                    <span className="text-muted-foreground">
                      {entry.location}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mx-2 text-border-strong"
                    >
                      /
                    </span>
                    <span className="text-muted-foreground">{entry.type}</span>
                  </p>
                  <p className="mt-5 max-w-[54ch] text-[1.0625rem] leading-[1.7] text-muted-foreground">
                    {entry.summary}
                  </p>
                </Reveal>

                <ul className="mt-9 space-y-6">
                  {entry.highlights.map((highlight, index) => (
                    <li
                      key={highlight}
                      className="border-t border-border pt-4"
                    >
                      <Reveal delay={index * 0.04}>
                        <div className="grid grid-cols-[2.25rem_1fr] gap-4">
                          <span className="type-label pt-1 text-primary">
                            0{index + 1}
                          </span>
                          <p className="max-w-[54ch] text-[1rem] leading-[1.7] text-foreground/85">
                            {highlight}
                          </p>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>

                <Reveal className="mt-10">
                  <div className="grid grid-cols-1 gap-6 border-t border-border pt-5 sm:grid-cols-2">
                    <div>
                      <p className="type-label text-muted-foreground">
                        Platforms
                      </p>
                      <p className="mt-2 text-[1rem] text-foreground">
                        {entry.platforms.join(" · ")}
                      </p>
                    </div>
                    <div>
                      <p className="type-label text-muted-foreground">
                        Stack in use
                      </p>
                      <p className="mt-2 text-[1rem] leading-relaxed text-foreground">
                        {entry.stack.join(" · ")}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                <h3 className="font-display text-[1.75rem] font-semibold tracking-[-0.03em] text-foreground">
                  Toolkit
                </h3>
                <span className="type-label text-muted-foreground">
                  Daily use
                </span>
              </div>
            </Reveal>

            <div>
              {toolkitData.map((group) => (
                <Reveal key={group.title}>
                  <div className="border-b border-border py-5">
                    <h4 className="type-label text-primary">{group.title}</h4>
                    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="text-[0.9875rem] leading-relaxed text-foreground/85"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-6">
              <p className="max-w-[34ch] text-[0.95rem] leading-relaxed text-muted-foreground">
                Depth first in the frontend, with enough backend range to own a
                feature from schema to screen.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
