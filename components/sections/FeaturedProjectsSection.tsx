"use client";

import * as React from "react";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { TiltCard } from "@/components/shared/TiltCard";
import { InterfaceStudy } from "@/components/projects/InterfaceStudy";
import { GsapMediaReveal, GsapReveal } from "@/components/motion/GsapReveal";
import { projectsData, earlyProjectsData } from "@/data/projects";
import { Icons } from "@/components/shared/Icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function StackList({
  items,
  limit,
  className,
}: {
  items: string[];
  limit?: number;
  className?: string;
}) {
  const visible = limit ? items.slice(0, limit) : items;
  return (
    <ul className={cn("flex flex-wrap gap-x-2 gap-y-1.5", className)}>
      {visible.map((item) => (
        <li
          key={item}
          className="rounded-full border border-border/80 px-2.5 py-1 font-mono text-[9px] leading-none tracking-[0.02em] text-muted-foreground"
        >
          {item}
        </li>
      ))}
      {limit && items.length > limit && (
        <li className="px-1 py-1 font-mono text-[9px] text-muted-foreground">
          +{items.length - limit}
        </li>
      )}
    </ul>
  );
}

export function FeaturedProjectsSection() {
  const [featured, ...secondary] = projectsData;

  const openCaseStudy = (projectId: string) => {
    window.dispatchEvent(
      new CustomEvent<string>("select-case-study", { detail: projectId })
    );
    window.history.pushState(null, "", `#case-study-${projectId}`);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    document.getElementById("case-studies")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section id="projects" className="relative scroll-mt-24 py-20 sm:py-28">
      <Container>
        <GsapReveal>
          <div data-reveal>
            <SectionHeader
              index="01"
              badge="Selected work"
              title="Work that holds up under inspection."
              description="Three product systems built end to end — interfaces, contracts, data models and the operational logic behind them. Each project links back to its repository for inspection."
            />
          </div>
        </GsapReveal>

        <div className="mt-16">
          {/* Flagship project — asymmetric editorial feature */}
          <article className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <GsapReveal className="lg:col-span-5">
              <div data-reveal className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-primary">01</span>
                <span aria-hidden="true" className="h-px w-8 bg-border" />
                <span className="eyebrow">{featured.category}</span>
              </div>

              <h3
                data-reveal
                className="mt-5 font-display text-[clamp(2.6rem,5vw,4.1rem)] leading-[0.95] tracking-[-0.025em] text-foreground"
              >
                {featured.title}{" "}
                <span className="align-middle font-sans text-sm tracking-normal text-muted-foreground">
                  {featured.nativeTitle}
                </span>
              </h3>

              <p
                data-reveal
                className="mt-3 max-w-md text-[15px] font-medium leading-snug text-primary"
              >
                {featured.tagline}
              </p>

              <p
                data-reveal
                className="mt-4 max-w-md text-pretty text-[13.5px] leading-relaxed text-muted-foreground"
              >
                {featured.summary}
              </p>

              <div data-reveal className="mt-6">
                <StackList items={featured.techStack} limit={7} />
              </div>

              <div
                data-reveal
                className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"
              >
                <button
                  type="button"
                  onClick={() => openCaseStudy(featured.id)}
                  className="group inline-flex items-center gap-2 border-b border-foreground/25 pb-1 text-[13px] font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <span>Read the case study</span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </button>

                <a
                  href={featured.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <Icons.gitHub className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Repository</span>
                </a>
              </div>

              <dl
                data-reveal
                className="mt-8 grid grid-cols-2 gap-4 border-t border-border/70 pt-5"
              >
                <div>
                  <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                    Role
                  </dt>
                  <dd className="mt-1 text-[11px] font-medium leading-snug text-foreground">
                    Architect &amp; lead developer
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                    Architecture
                  </dt>
                  <dd className="mt-1 text-[11px] font-medium leading-snug text-foreground">
                    Monorepo · shared contracts
                  </dd>
                </div>
              </dl>
            </GsapReveal>

            <GsapMediaReveal className="lg:col-span-7" delay={0.1}>
              <TiltCard
                maxTilt={4}
                scale={1.008}
                className="group rounded-2xl"
              >
                <InterfaceStudy projectId={featured.id} />
              </TiltCard>
            </GsapMediaReveal>
          </article>

          {/* Two supporting projects with distinct compositions */}
          <div className="mt-24 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
            <article className="lg:col-span-7">
              <GsapMediaReveal>
                <TiltCard
                  maxTilt={3.5}
                  scale={1.006}
                  className="group rounded-2xl"
                >
                  <InterfaceStudy projectId={secondary[0].id} />
                </TiltCard>
              </GsapMediaReveal>

              <GsapReveal className="mt-7">
                <div
                  data-reveal
                  className="flex flex-wrap items-baseline justify-between gap-3"
                >
                  <h3 className="font-display text-[clamp(2rem,3.6vw,2.9rem)] leading-none tracking-[-0.02em] text-foreground">
                    {secondary[0].title}
                  </h3>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                    02 / {secondary[0].category}
                  </span>
                </div>
                <p
                  data-reveal
                  className="mt-2 text-[13px] font-medium text-primary"
                >
                  {secondary[0].tagline}
                </p>
                <p
                  data-reveal
                  className="mt-3 max-w-xl text-pretty text-[13px] leading-relaxed text-muted-foreground"
                >
                  {secondary[0].summary}
                </p>
                <div
                  data-reveal
                  className="mt-4 flex flex-wrap items-center justify-between gap-4"
                >
                  <StackList items={secondary[0].techStack} limit={5} />
                  <ProjectLinks
                    projectId={secondary[0].id}
                    repoUrl={secondary[0].repoUrl}
                    onOpen={openCaseStudy}
                  />
                </div>
              </GsapReveal>
            </article>

            <article className="lg:col-span-5 lg:mt-24">
              <GsapReveal>
                <div data-reveal>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-primary">03</span>
                    <span aria-hidden="true" className="h-px w-8 bg-border" />
                    <span className="eyebrow">{secondary[1].category}</span>
                  </div>
                  <h3 className="mt-4 font-display text-[clamp(2rem,3.6vw,2.9rem)] leading-none tracking-[-0.02em] text-foreground">
                    {secondary[1].title}
                  </h3>
                  <p className="mt-2 text-[13px] font-medium text-primary">
                    {secondary[1].tagline}
                  </p>
                  <p className="mt-3 text-pretty text-[13px] leading-relaxed text-muted-foreground">
                    {secondary[1].summary}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <StackList items={secondary[1].techStack} limit={4} />
                    <ProjectLinks
                      projectId={secondary[1].id}
                      repoUrl={secondary[1].repoUrl}
                      onOpen={openCaseStudy}
                    />
                  </div>
                </div>
              </GsapReveal>

              <GsapMediaReveal className="mt-7" delay={0.08}>
                <TiltCard
                  maxTilt={3.5}
                  scale={1.006}
                  className="group rounded-2xl"
                >
                  <InterfaceStudy projectId={secondary[1].id} />
                </TiltCard>
              </GsapMediaReveal>
            </article>
          </div>
        </div>

        <GsapReveal className="mt-20 border-t border-border/80 pt-6">
          <div
            data-reveal
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em]">
                Earlier work
              </span>
              {earlyProjectsData.map((project, index) => (
                <React.Fragment key={project.title}>
                  {index > 0 && (
                    <span aria-hidden="true" className="text-border">
                      /
                    </span>
                  )}
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-sweep font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {project.title}
                  </a>
                </React.Fragment>
              ))}
            </p>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[12px] font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
              <span>All repositories</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </GsapReveal>
      </Container>
    </section>
  );
}

function ProjectLinks({
  projectId,
  repoUrl,
  onOpen,
}: {
  projectId: string;
  repoUrl: string;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => onOpen(projectId)}
        className="group inline-flex items-center gap-1.5 text-[11px] font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <span className="underline-sweep">Case study</span>
        <ArrowUpRight
          className="h-3 w-3 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </button>
      <a
        href={repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        <Icons.gitHub className="h-3 w-3" aria-hidden="true" />
        Code
      </a>
    </div>
  );
}
