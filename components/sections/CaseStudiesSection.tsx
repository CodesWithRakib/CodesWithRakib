"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { projectsData, earlyProjectsData } from "@/data/projects";
import { Icons } from "@/components/shared/Icons";
import {
  ExternalLink,
  CheckCircle2,
  FileCode,
  ShieldCheck,
  AlertTriangle,
  FolderGit2,
  Users,
  GitBranch,
  Terminal,
  Workflow,
  Sparkles,
  ArrowUpRight,
  Clock,
  Boxes,
} from "lucide-react";

export function CaseStudiesSection() {
  const [activeProjectId, setActiveProjectId] = React.useState<string>("ogroniedu");
  const [copiedFile, setCopiedFile] = React.useState<string | null>(null);

  // Sync tab with external events or hash
  React.useEffect(() => {
    const handleSelectCaseStudy = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && projectsData.some((p) => p.id === customEvent.detail)) {
        setActiveProjectId(customEvent.detail);
      }
    };

    const handleHashChange = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash.replace("#case-study-", "");
        if (projectsData.some((p) => p.id === hash)) {
          setActiveProjectId(hash);
        }
      }
    };

    window.addEventListener("select-case-study", handleSelectCaseStudy);
    window.addEventListener("hashchange", handleHashChange);

    // Initial check
    handleHashChange();

    return () => {
      window.removeEventListener("select-case-study", handleSelectCaseStudy);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const activeProject =
    projectsData.find((p) => p.id === activeProjectId) || projectsData[0];

  const handleCopyPath = (path: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(path);
      setCopiedFile(path);
      setTimeout(() => setCopiedFile(null), 2000);
    }
  };

  return (
    <section id="case-studies" className="py-20 sm:py-24 border-t border-border bg-surface/30">
      <Container>
        {/* Section Header */}
        <ScrollReveal direction="up">
          <SectionHeader
            badge="DEEP-DIVE TECHNICAL CASE STUDIES"
            title="Under the Hood: Architecture, Contracts & Code"
            description="In-depth technical evaluations of domain-specific architectures, type-safe API contracts, and trade-offs. Inspect exact repository file paths and verified status breakdowns."
          />
        </ScrollReveal>

        {/* Project Selector Tabs */}
        <ScrollReveal direction="up" delayMs={100}>
          <div
            role="tablist"
            aria-label="Flagship Project Case Studies"
            className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl border border-border bg-card/80 backdrop-blur-xs mb-10 max-w-3xl"
          >
          {projectsData.map((project, index) => {
            const isActive = project.id === activeProjectId;
            return (
              <button
                key={project.id}
                role="tab"
                id={`tab-${project.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${project.id}`}
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(e) => {
                  let targetIndex = -1;
                  if (e.key === "ArrowRight") {
                    targetIndex = (index + 1) % projectsData.length;
                  } else if (e.key === "ArrowLeft") {
                    targetIndex = (index - 1 + projectsData.length) % projectsData.length;
                  } else if (e.key === "Home") {
                    targetIndex = 0;
                  } else if (e.key === "End") {
                    targetIndex = projectsData.length - 1;
                  }

                  if (targetIndex !== -1) {
                    e.preventDefault();
                    const nextProject = projectsData[targetIndex];
                    setActiveProjectId(nextProject.id);
                    document.getElementById(`tab-${nextProject.id}`)?.focus();
                    if (typeof window !== "undefined") {
                      window.history.replaceState(null, "", `#case-study-${nextProject.id}`);
                    }
                  }
                }}
                onClick={() => {
                  setActiveProjectId(project.id);
                  if (typeof window !== "undefined") {
                    window.history.replaceState(null, "", `#case-study-${project.id}`);
                  }
                }}
                className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-medium transition-all focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <span>{project.title}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {project.category.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

        {/* Selected Project Case Study Panel */}
        <div
          id={`panel-${activeProject.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeProject.id}`}
          className="space-y-12"
        >
          {/* 1. Hero Summary Card */}
          <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border/80 relative">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="primary" className="text-xs font-mono">
                    {activeProject.category}
                  </Badge>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    {activeProject.statusBreakdown.statusBadge}
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                    {activeProject.title}
                  </h3>
                  <span className="text-sm font-normal text-muted-foreground">
                    ({activeProject.nativeTitle})
                  </span>
                </div>

                <p className="text-sm sm:text-base font-medium text-primary">
                  {activeProject.tagline}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <div className="px-3 py-1.5 rounded-lg bg-primary-subtle text-primary border border-primary/20 text-xs font-mono font-medium flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>{activeProject.role}</span>
                </div>

                <a
                  href={activeProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="gap-2 font-mono text-xs">
                    <Icons.gitHub className="h-3.5 w-3.5" />
                    <span>View Repository</span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Target Personas Bar */}
            <div className="pt-6 flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5 shrink-0">
                <Users className="h-3.5 w-3.5 text-primary" />
                Target Stakeholders:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeProject.targetUsers.map((user, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-muted text-foreground/90 border border-border/80 font-medium"
                  >
                    {user}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Core Problem & Engineering Architecture Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* The Problem (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-md bg-red-500/10 text-red-600 dark:text-red-400">
                  <AlertTriangle className="h-4 w-4" />
                </span>
                <h4 className="text-lg font-bold text-foreground">The Operational Problem</h4>
              </div>

              <Card className="border-border bg-card p-6 leading-relaxed text-sm text-foreground/85">
                <p className="mb-4">{activeProject.problem}</p>
                <div className="pt-4 border-t border-border/60 text-xs text-muted-foreground font-mono space-y-1">
                  <div className="text-foreground font-medium">Design Goal:</div>
                  <div>Build reliable software that prevents data corruption and operational chaos without relying on third-party SaaS shortcuts.</div>
                </div>
              </Card>
            </div>

            {/* Technical Approach (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-md bg-primary-subtle text-primary">
                  <Workflow className="h-4 w-4" />
                </span>
                <h4 className="text-lg font-bold text-foreground">Technical Approach & Decisions</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeProject.technicalApproach.map((approach, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold">
                        {idx + 1}
                      </span>
                      <h5 className="text-xs font-bold text-foreground font-mono">
                        {approach.title}
                      </h5>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {approach.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Verified Implementation Highlights & Exact File References */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-md bg-primary-subtle text-primary">
                  <FileCode className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-lg font-bold text-foreground">
                    Verified Implementation Highlights & Real File References
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Inspectable code paths in the repository demonstrating architectural depth.
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">
                Click any path to copy
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeProject.implementationDetails.map((detail, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-all space-y-3 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h5 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>{detail.title}</span>
                    </h5>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {detail.description}
                  </p>

                  {detail.fileRef && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleCopyPath(detail.fileRef!)}
                        aria-label={`Copy repository path: ${detail.fileRef}`}
                        className="w-full text-left flex items-center justify-between gap-2 px-2.5 py-1.5 rounded bg-muted/70 hover:bg-muted text-[11px] font-mono text-foreground/80 border border-border/80 transition-colors group-hover:border-primary/30 focus-visible:ring-2 focus-visible:ring-primary min-h-[36px]"
                        title="Click to copy file reference"
                      >
                        <span className="truncate text-primary font-medium">
                          {detail.fileRef}
                        </span>
                        <span className="text-[10px] text-muted-foreground shrink-0">
                          {copiedFile === detail.fileRef ? "Copied!" : "Copy path"}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4. Technical Challenges & Architectural Trade-offs */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div>
                <h4 className="text-lg font-bold text-foreground">
                  Technical Challenges & Engineering Trade-offs
                </h4>
                <p className="text-xs text-muted-foreground">
                  Deliberate engineering decisions made to solve non-trivial constraints.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeProject.challenges.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-border bg-card space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Challenge {idx + 1}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-foreground">
                    {item.challenge}
                  </p>

                  <div className="p-3.5 rounded-lg bg-surface border border-border text-xs leading-relaxed text-muted-foreground space-y-1">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-primary font-semibold flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" />
                      Architectural Solution & Trade-off:
                    </div>
                    <p className="text-foreground/90">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Status Breakdown (Verified Transparency Matrix) */}
          <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-border/80">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <h4 className="text-base sm:text-lg font-bold text-foreground">
                  Verified Status & Delivery Matrix
                </h4>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                Zero-hallucination engineering audit
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Implemented */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-foreground">
                    Implemented & Verified
                  </span>
                </div>
                <ul className="space-y-2">
                  {activeProject.statusBreakdown.implemented.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* In Progress */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-foreground">
                    Active In-Progress
                  </span>
                </div>
                <ul className="space-y-2">
                  {activeProject.statusBreakdown.inProgress.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed"
                    >
                      <GitBranch className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Planned */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-zinc-400" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-foreground">
                    Roadmap & Next Steps
                  </span>
                </div>
                <ul className="space-y-2">
                  {activeProject.statusBreakdown.planned.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Live Demo Status Callout */}
            <div className="p-3.5 rounded-lg bg-surface border border-border/80 flex items-start gap-3">
              <Boxes className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-mono">Environment & Deployment Status: </strong>
                {activeProject.statusBreakdown.liveDemoStatus}
              </div>
            </div>
          </div>

          {/* 6. Inspectable Code Areas for Reviewers */}
          <div className="p-6 rounded-xl border border-primary/20 bg-primary-subtle/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-1.5">
                <FolderGit2 className="h-3.5 w-3.5" />
                Recommended Repository Inspection Paths
              </span>
              <p className="text-xs text-muted-foreground">
                When reviewing the codebase, open these directories to inspect architectural hygiene:
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {activeProject.inspectableAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-card text-foreground border border-border/80 font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={activeProject.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Button variant="primary" size="sm" className="gap-2 font-mono text-xs">
                <Icons.gitHub className="h-3.5 w-3.5" />
                <span>Open {activeProject.title} on GitHub</span>
                <ExternalLink className="h-3 w-3" />
              </Button>
            </a>
          </div>
        </div>

        {/* 7. Secondary / Foundational Projects Showcase */}
        <ScrollReveal direction="up" delayMs={100}>
          <div className="mt-20 pt-16 border-t border-border">
            <div className="mb-8">
              <span className="inline-block text-xs font-mono font-medium tracking-wider uppercase text-muted-foreground mb-1">
                FOUNDATIONAL MILESTONES
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Early Exploratory & Client-Side Projects
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                Earlier projects developed while building full-stack fundamentals in MERN workflows, authentication, and client-side state persistence prior to engineering enterprise monorepos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {earlyProjectsData.map((project, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-border bg-card/60 backdrop-blur-xs flex flex-col justify-between space-y-4 hover:border-primary/30 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-muted-foreground font-medium px-2 py-0.5 rounded bg-muted border border-border">
                        {project.category}
                      </span>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>

                    <h4 className="text-base font-bold text-foreground">{project.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-border/60">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-foreground/80 border border-border/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex text-xs font-mono text-primary hover:underline items-center gap-1"
                    >
                      <span>View Repository</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
