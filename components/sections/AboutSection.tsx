import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { profileData } from "@/data/profile";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-t border-border py-24 sm:py-28 lg:py-36"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="type-label flex items-center gap-4 text-muted-foreground">
                <span className="text-primary">01</span>
                <span aria-hidden="true" className="h-px w-10 bg-border" />
                About
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-6 max-w-[22ch] text-[1rem] leading-relaxed text-muted-foreground">
                Design-minded engineering, from the first component to
                production.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <h2 id="about-heading" className="type-h2 max-w-[17ch]">
                {profileData.statement}
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10">
              {profileData.about.map((paragraph, index) => (
                <Reveal key={paragraph} delay={index * 0.06}>
                  <p className="max-w-[46ch] text-[1.0625rem] leading-[1.7] text-muted-foreground">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <div className="mt-14 border-t border-border">
              {profileData.capabilities.map((capability) => (
                <Reveal key={capability.index}>
                  <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-2 border-b border-border py-6 sm:grid-cols-[3rem_15rem_1fr] sm:gap-x-6">
                    <span className="type-label text-primary">
                      {capability.index}
                    </span>
                    <h3 className="font-display text-[1.35rem] font-semibold leading-tight tracking-[-0.025em] text-foreground">
                      {capability.title}
                    </h3>
                    <p className="col-span-2 text-[0.9875rem] leading-relaxed text-muted-foreground sm:col-span-1">
                      {capability.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
