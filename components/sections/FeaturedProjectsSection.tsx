"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { projectsData, Project } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/shared/Icons";
import { TiltCard } from "@/components/shared/TiltCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import {
  ExternalLink,
  ArrowRight,
  FolderGit2,
  Lock,
  Radio,
} from "lucide-react";

export function FeaturedProjectsSection() {
  const handleSelectCaseStudy = (projectId: string) => {
    // Dispatch custom event for CaseStudiesSection to switch active tab
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-case-study", { detail: projectId })
      );
      window.history.pushState(null, "", `#case-study-${projectId}`);
      const caseStudiesElement = document.getElementById("case-studies");
      if (caseStudiesElement) {
        caseStudiesElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Render authentic representative UI previews for each flagship project
  const renderProjectVisualPreview = (id: string) => {
    switch (id) {
      case "ogroniedu":
        return (
          <div className="rounded-xl border border-border bg-muted/40 p-3.5 space-y-2.5 font-mono text-[11px] overflow-hidden">
            {/* Mini Browser Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-border/60 text-muted-foreground text-[10px]">
              <div className="flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                <span className="text-foreground/80 font-medium truncate max-w-[140px] sm:max-w-none">
                  ogroniedu.com/guardian/dashboard
                </span>
              </div>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[9px] uppercase">
                <Radio className="h-2.5 w-2.5 animate-pulse" /> Live
              </span>
            </div>

            {/* Dashboard Mockup Grid */}
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-surface border border-border/80 flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground text-[10px] block">Next Session</span>
                  <span className="font-semibold text-foreground text-xs font-sans">
                    HSC Higher Math (English Medium)
                  </span>
                </div>
                <Badge variant="primary" className="text-[10px] px-1.5 py-0 font-normal">
                  WebRTC Ready
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 rounded-lg bg-surface border border-border/80">
                  <span className="text-muted-foreground block">Contracts Layer</span>
                  <span className="font-semibold text-primary">@ogroniedu/contracts</span>
                </div>
                <div className="p-2 rounded-lg bg-surface border border-border/80">
                  <span className="text-muted-foreground block">Data Layer</span>
                  <span className="font-semibold text-foreground">18 RTK Query Slices</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "dhruto":
        return (
          <div className="rounded-xl border border-border bg-muted/40 p-3.5 space-y-2.5 font-mono text-[11px] overflow-hidden">
            {/* Mini Browser Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-border/60 text-muted-foreground text-[10px]">
              <div className="flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-accent" />
                <span className="text-foreground/80 font-medium truncate max-w-[140px] sm:max-w-none">
                  dhruto.express/track/DH-88412
                </span>
              </div>
              <span className="text-accent font-semibold text-[9px] uppercase">
                Worker #02
              </span>
            </div>

            {/* Parcel FSM State Progression Flow */}
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-surface border border-border/80">
                <span className="text-muted-foreground text-[10px] block">State Machine Node</span>
                <div className="flex items-center gap-1.5 mt-1 text-[10px]">
                  <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">PICKED_UP</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="px-1.5 py-0.5 rounded bg-accent-subtle text-accent font-semibold border border-accent/30">
                    IN_TRANSIT
                  </span>
                  <span className="text-muted-foreground">→</span>
                  <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">OUT_FOR_DELIVERY</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 rounded-lg bg-surface border border-border/80">
                  <span className="text-muted-foreground block">Async Queue</span>
                  <span className="font-semibold text-foreground">Redis &amp; BullMQ</span>
                </div>
                <div className="p-2 rounded-lg bg-surface border border-border/80">
                  <span className="text-muted-foreground block">COD Settlement</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">৳3,450 Verified</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "gramer-bazar":
      default:
        return (
          <div className="rounded-xl border border-border bg-muted/40 p-3.5 space-y-2.5 font-mono text-[11px] overflow-hidden">
            {/* Mini Browser Bar */}
            <div className="flex items-center justify-between pb-2 border-b border-border/60 text-muted-foreground text-[10px]">
              <div className="flex items-center gap-1.5">
                <Lock className="h-3 w-3 text-primary" />
                <span className="text-foreground/80 font-medium truncate max-w-[140px] sm:max-w-none">
                  gramerbazar.market/catalog
                </span>
              </div>
              <span className="text-primary font-semibold text-[9px] uppercase">
                Faceted Index
              </span>
            </div>

            {/* Faceted Filter & Catalog Mockup */}
            <div className="space-y-2">
              <div className="p-2 rounded-lg bg-surface border border-border/80 flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground text-[10px] block">Active Filters</span>
                  <span className="font-semibold text-foreground text-xs font-sans">
                    Organic Rice &amp; Grains (Rangpur)
                  </span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-foreground">
                  34 Items
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 rounded-lg bg-surface border border-border/80">
                  <span className="text-muted-foreground block">Real-Time Chat</span>
                  <span className="font-semibold text-primary">Socket.io Gateway</span>
                </div>
                <div className="p-2 rounded-lg bg-surface border border-border/80">
                  <span className="text-muted-foreground block">Database Model</span>
                  <span className="font-semibold text-foreground">PostgreSQL 18</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="projects" className="py-20 sm:py-24 border-t border-border bg-background relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <ScrollReveal direction="up" delayMs={50}>
            <SectionHeader
              badge="FLAGSHIP MONOREPOS &amp; SAAS ARCHITECTURE"
              title="Engineered for Production, Verified in Code"
              description="Three full-featured application suites built with strict architectural discipline — spanning multi-role tutoring LMS platforms, 21-state logistics workflows, and rural e-commerce catalogs."
              className="mb-0"
            />
          </ScrollReveal>

          <ScrollReveal direction="left" delayMs={100} className="shrink-0">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button variant="outline" size="sm" className="gap-2 font-mono text-xs shadow-2xs">
                <FolderGit2 className="h-3.5 w-3.5 text-muted-foreground" />
                <span>All Repositories</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </Button>
            </a>
          </ScrollReveal>
        </div>

        {/* 3 Featured Project Cards with 3D Tilt and Visual Interface Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projectsData.map((project: Project, idx: number) => {
            return (
              <ScrollReveal
                key={project.id}
                direction="up"
                delayMs={idx * 120}
                className="h-full"
              >
                <TiltCard
                  maxTilt={5}
                  scale={1.012}
                  glare={true}
                  className="h-full rounded-2xl border border-border bg-card/75 backdrop-blur-xs flex flex-col justify-between overflow-hidden group hover:border-primary/50 transition-colors shadow-xs"
                >
                  {/* Subtle top indicator bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-accent/40 opacity-70 group-hover:opacity-100 transition-opacity" />

                  <div>
                    <CardHeader className="pt-6 pb-3 space-y-3">
                      {/* Category & Status Pill */}
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="outline" className="text-[11px] font-mono tracking-tight font-medium bg-muted/60">
                          {project.category}
                        </Badge>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {project.statusBreakdown.statusBadge}
                        </span>
                      </div>

                      {/* Title & Native Title */}
                      <div>
                        <div className="flex items-baseline gap-2">
                          <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </CardTitle>
                          <span className="text-xs font-normal text-muted-foreground font-sans">
                            ({project.nativeTitle})
                          </span>
                        </div>
                        <p className="text-xs font-medium text-primary mt-1">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Visual Representative Interface Preview Frame */}
                      <div className="pt-1">
                        {renderProjectVisualPreview(project.id)}
                      </div>

                      {/* Concise Summary */}
                      <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 pt-1">
                        {project.summary}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="py-2 space-y-3">
                      {/* Core Tech Stack Pills */}
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold block mb-1.5">
                          Verified Stack
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted/80 text-foreground/90 border border-border/80"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 5 && (
                            <span className="text-[11px] font-mono px-1.5 py-0.5 text-muted-foreground">
                              +{project.techStack.length - 5}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </div>

                  <CardFooter className="pt-3 pb-5 flex flex-col sm:flex-row gap-2.5 border-t border-border/60 mt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full sm:flex-1 gap-1.5 font-mono text-xs min-h-[40px]"
                      onClick={() => handleSelectCaseStudy(project.id)}
                      aria-label={`Inspect ${project.title} architectural case study`}
                    >
                      <span>Deep Dive</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>

                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-1.5 font-mono text-xs min-h-[40px]"
                        aria-label={`View ${project.title} GitHub repository`}
                      >
                        <Icons.gitHub className="h-3.5 w-3.5" />
                        <span>Code</span>
                      </Button>
                    </a>
                  </CardFooter>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
