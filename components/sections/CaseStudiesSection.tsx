"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDashed,
  Copy,
  GitBranch,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GsapReveal } from "@/components/motion/GsapReveal";
import { projectsData, earlyProjectsData } from "@/data/projects";
import { Icons } from "@/components/shared/Icons";
import { panelTransition, springSoft } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function CaseStudiesSection() {
  const [activeProjectId, setActiveProjectId] = React.useState("ogroniedu");
  const [copiedPath, setCopiedPath] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleSelectCaseStudy = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (projectsData.some((project) => project.id === customEvent.detail)) {
        setActiveProjectId(customEvent.detail);
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#case-study-", "");
      if (projectsData.some((project) => project.id === hash)) {
        setActiveProjectId(hash);
      }
    };

    window.addEventListener("select-case-study", handleSelectCaseStudy);
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("select-case-study", handleSelectCaseStudy);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  React.useEffect(() => {
    if (!copiedPath) return;
    const timer = window.setTimeout(() => setCopiedPath(null), 1800);
    return () => window.clearTimeout(timer);
  }, [copiedPath]);

  const activeProject =
    projectsData.find((project) => project.id === activeProjectId) ??
    projectsData[0];

  const copyPath = (path: string) => {
    navigator.clipboard?.writeText(path);
    setCopiedPath(path);
  };

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let target = -1;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      target = (index + 1) % projectsData.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      target = (index - 1 + projectsData.length) % projectsData.length;
    } else if (event.key === "Home") {
      target = 0;
    } else if (event.key === "End") {
      target = projectsData.length - 1;
    }

    if (target === -1) return;
    event.preventDefault();
    const next = projectsData[target];
    setActiveProjectId(next.id);
    document.getElementById(`case-tab-${next.id}`)?.focus();
    window.history.replaceState(null, "", `#case-study-${next.id}`);
  };

  return (
    <section
      id="case-studies"
      className="scroll-mt-20 border-y border-border/70 bg-surface/45 py-20 sm:py-28"
    >
      <Container>
        <GsapReveal>
          <div data-reveal>
            <SectionHeader
              index="02"
              badge="Case studies"
              title="The engineering behind the interface."
              description="Problem, decisions and trade-offs — written from the repositories rather than from a pitch deck. Pick a project to inspect the build."
            />
          </div>
        </GsapReveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center justify-between gap-2">
                <span className="eyebrow">Contents</span>
                <span className="font-mono text-[9px] text-muted-foreground">
                  03 projects
                </span>
              </div>

              <div
                role="tablist"
                aria-label="Project case studies"
                aria-orientation="vertical"
                className="mt-3 border-t border-border/80"
              >
                {projectsData.map((project, index) => {
                  const isActive = project.id === activeProject.id;
                  return (
                    <button
                      key={project.id}
                      id={`case-tab-${project.id}`}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      aria-controls={`case-panel-${project.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => {
                        setActiveProjectId(project.id);
                        window.history.replaceState(
                          null,
                          "",
                          `#case-study-${project.id}`
                        );
                      }}
                      onKeyDown={(event) => handleTabKeyDown(event, index)}
                      className={cn(
                        "group relative flex w-full items-start gap-4 border-b border-border/80 py-5 pr-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-surface",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="case-study-active-rail"
                          aria-hidden="true"
                          className="absolute -left-3 top-4 bottom-4 w-px bg-primary sm:-left-4"
                          transition={springSoft}
                        />
                      )}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-1 font-mono text-[10px]",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        0{index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block font-display text-[1.55rem] leading-none transition-colors",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground group-hover:text-foreground"
                          )}
                        >
                          {project.title}
                        </span>
                        {" "}
                        <span className="mt-1.5 block truncate font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                          {project.nativeTitle} · {project.category}
                        </span>
                      </span>
                      <ArrowUpRight
                        className={cn(
                          "mt-1 h-3.5 w-3.5 shrink-0 transition-all duration-300",
                          isActive
                            ? "text-primary"
                            : "text-border group-hover:text-muted-foreground"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>

              <p className="mt-6 max-w-xs text-[11px] leading-relaxed text-muted-foreground">
                Every technical claim below maps to a repository path or a
                documented architecture note. No private client source is
                reproduced.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeProject.id}
                id={`case-panel-${activeProject.id}`}
                role="tabpanel"
                aria-labelledby={`case-tab-${activeProject.id}`}
                tabIndex={0}
                initial={panelTransition.initial}
                animate={panelTransition.animate}
                exit={panelTransition.exit}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
                    {activeProject.category}
                  </span>
                  <span aria-hidden="true" className="h-px w-6 bg-border" />
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {activeProject.statusBreakdown.statusBadge}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-[clamp(2.5rem,5vw,3.9rem)] leading-[0.92] tracking-[-0.025em] text-foreground">
                  {activeProject.title}{" "}
                  <span className="align-middle font-sans text-sm tracking-normal text-muted-foreground">
                    {activeProject.nativeTitle}
                  </span>
                </h3>
                <p className="mt-3 max-w-xl text-[14px] font-medium leading-snug text-primary">
                  {activeProject.tagline}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border/80 px-2.5 py-1 font-mono text-[9px] leading-none text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-4 border-y border-border/70 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-lg text-[11px] leading-relaxed text-muted-foreground">
                    <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-foreground">
                      Role ·{" "}
                    </span>
                    {activeProject.role}
                  </p>
                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex shrink-0 items-center gap-1.5 self-start text-[11px] font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
                  >
                    <Icons.gitHub className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="underline-sweep">Repository</span>
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>

                {/* Problem */}
                <div className="mt-10">
                  <h4 className="eyebrow">01 — The problem</h4>
                  <p className="mt-3 max-w-2xl text-pretty text-[13px] leading-relaxed text-muted-foreground">
                    {activeProject.problem}
                  </p>
                  <div className="mt-5">
                    <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                      Designed for
                    </span>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {activeProject.targetUsers.map((user) => (
                        <li
                          key={user}
                          className="rounded-full bg-background/70 px-2.5 py-1 font-mono text-[9px] text-foreground/80"
                        >
                          {user.split(" (")[0]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Decisions */}
                <div className="mt-10">
                  <h4 className="eyebrow">02 — Engineering decisions</h4>
                  <ol className="mt-4 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    {activeProject.technicalApproach.map((approach, index) => (
                      <li
                        key={approach.title}
                        className="border-t border-border/80 pt-3"
                      >
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-[9px] text-primary">
                            0{index + 1}
                          </span>
                          <h5 className="text-[12px] font-semibold leading-snug text-foreground">
                            {approach.title}
                          </h5>
                        </div>
                        <p className="mt-2 text-[11.5px] leading-relaxed text-muted-foreground">
                          {approach.description}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Trade-offs */}
                <div className="mt-10">
                  <h4 className="eyebrow">03 — Trade-offs</h4>
                  <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {activeProject.challenges.map((item, index) => (
                      <div
                        key={item.challenge}
                        className="border-l border-primary/35 pl-4"
                      >
                        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-primary">
                          Challenge 0{index + 1}
                        </span>
                        <p className="mt-2 text-[12px] font-medium leading-snug text-foreground">
                          {item.challenge}
                        </p>
                        <p className="mt-2 text-[11.5px] leading-relaxed text-muted-foreground">
                          <span className="font-medium text-accent">
                            Response ·{" "}
                          </span>
                          {item.solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evidence */}
                <div className="mt-10">
                  <div className="flex flex-wrap items-end justify-between gap-2">
                    <h4 className="eyebrow">04 — Verified in code</h4>
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
                      Select a path to copy
                    </span>
                  </div>
                  <ul className="mt-3 border-t border-border/80">
                    {activeProject.implementationDetails.map((detail) => (
                      <li
                        key={detail.title}
                        className="flex flex-col gap-2 border-b border-border/80 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                      >
                        <div className="min-w-0">
                          <h5 className="flex items-start gap-1.5 text-[12px] font-semibold text-foreground">
                            <CheckCircle2
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary"
                              aria-hidden="true"
                            />
                            <span>{detail.title}</span>
                          </h5>
                          <p className="mt-1.5 pl-5 text-[11.5px] leading-relaxed text-muted-foreground">
                            {detail.description}
                          </p>
                        </div>
                        {detail.fileRef && (
                          <button
                            type="button"
                            onClick={() => copyPath(detail.fileRef!)}
                            aria-label={`Copy repository path ${detail.fileRef}`}
                            className="inline-flex max-w-full shrink-0 items-center gap-2 self-start rounded-full border border-border/80 px-2.5 py-1 font-mono text-[8.5px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                          >
                            <span className="max-w-[220px] truncate text-primary">
                              {detail.fileRef}
                            </span>
                            {copiedPath === detail.fileRef ? (
                              <Check
                                className="h-3 w-3 shrink-0 text-accent"
                                aria-hidden="true"
                              />
                            ) : (
                              <Copy
                                className="h-3 w-3 shrink-0"
                                aria-hidden="true"
                              />
                            )}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                  <span aria-live="polite" className="sr-only">
                    {copiedPath ? "Repository path copied to clipboard" : ""}
                  </span>
                </div>

                {/* Delivery status */}
                <details className="group mt-8 border-t border-border/80 pt-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[12px] font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-surface">
                    <span className="inline-flex items-center gap-2">
                      <CircleDashed
                        className="h-3.5 w-3.5 text-primary"
                        aria-hidden="true"
                      />
                      Delivery status — implemented, active &amp; planned
                    </span>
                    <ChevronDown
                      className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>

                  <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                      <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Implemented
                      </span>
                      <ul className="mt-2 space-y-2">
                        {activeProject.statusBreakdown.implemented.map(
                          (item) => (
                            <li
                              key={item}
                              className="flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground"
                            >
                              <CheckCircle2
                                className="mt-0.5 h-3 w-3 shrink-0 text-primary"
                                aria-hidden="true"
                              />
                              <span>{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div>
                      <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                        In progress
                      </span>
                      <ul className="mt-2 space-y-2">
                        {activeProject.statusBreakdown.inProgress.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground"
                          >
                            <GitBranch
                              className="mt-0.5 h-3 w-3 shrink-0 text-warning"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-border" />
                        Planned
                      </span>
                      <ul className="mt-2 space-y-2">
                        {activeProject.statusBreakdown.planned.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground"
                          >
                            <ArrowUpRight
                              className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground">
                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-foreground">
                      Environment ·{" "}
                    </span>
                    {activeProject.statusBreakdown.liveDemoStatus}
                  </p>
                </details>

                {/* Reviewer path */}
                <div className="mt-8 border-t border-border/80 pt-5">
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground">
                    Reviewer path
                  </span>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                    {activeProject.inspectableAreas.map((area) => (
                      <li
                        key={area}
                        className="font-mono text-[9px] leading-relaxed text-foreground/75"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <GsapReveal className="mt-20 border-t border-border/80 pt-8">
          <div
            data-reveal
            className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between"
          >
            <div>
              <span className="eyebrow">Foundational milestones</span>
              <h3 className="mt-3 font-display text-2xl text-foreground sm:text-3xl">
                Earlier builds that shaped the craft.
              </h3>
            </div>
            <ul className="grid flex-1 gap-5 sm:max-w-xl sm:grid-cols-2">
              {earlyProjectsData.map((project) => (
                <li key={project.title} className="border-t border-border/80 pt-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-[13px] font-semibold text-foreground">
                      {project.title}
                    </h4>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                      className="text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                  <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
                    {project.category}
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </GsapReveal>
      </Container>
    </section>
  );
}
