"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { projectsData, Project } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/shared/Icons";
import {
  ExternalLink,
  ArrowRight,
  Code2,
  CheckCircle2,
  Terminal,
  FolderGit2,
} from "lucide-react";

export function FeaturedProjectsSection() {
  const handleSelectCaseStudy = (projectId: string) => {
    // Dispatch custom event for CaseStudiesSection to switch active tab
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-case-study", { detail: projectId })
      );
      // Update hash without jumping violently
      window.history.pushState(null, "", `#case-study-${projectId}`);
      const caseStudiesElement = document.getElementById("case-studies");
      if (caseStudiesElement) {
        caseStudiesElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="projects" className="py-20 sm:py-24 border-t border-border bg-background">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader
            badge="FLAGSHIP MONOREPOS & SAAS ARCHITECTURE"
            title="Engineered for Production, Verified in Code"
            description="Three full-featured application suites built with strict architectural discipline — spanning multi-role tutoring LMS platforms, 21-state logistics workflows, and rural e-commerce catalogs."
            className="mb-0"
          />

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button variant="outline" size="sm" className="gap-2 font-mono text-xs">
                <FolderGit2 className="h-3.5 w-3.5 text-muted-foreground" />
                <span>All Repositories</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </Button>
            </a>
          </div>
        </div>

        {/* 3 Featured Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projectsData.map((project: Project) => {
            return (
              <Card
                key={project.id}
                className="flex flex-col justify-between border-border bg-card/60 backdrop-blur-xs relative overflow-hidden group hover:border-primary/40 transition-all duration-300"
                hoverEffect
              >
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-accent/40 opacity-70 group-hover:opacity-100 transition-opacity" />

                <CardHeader className="pt-6 pb-4 space-y-3">
                  {/* Category & Status Pill */}
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="text-[11px] font-mono tracking-tight font-medium bg-muted/50">
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

                  {/* Summary */}
                  <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.summary}
                  </CardDescription>

                  {/* Role Pill */}
                  <div className="pt-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary-subtle text-primary border border-primary/20 text-xs font-mono font-medium">
                      <Terminal className="h-3 w-3" />
                      <span>{project.role}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="py-2 space-y-4">
                  {/* Verified Implementation Highlights */}
                  <div className="space-y-2 pt-2 border-t border-border/60">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                      <Code2 className="h-3 w-3 text-primary" />
                      Architectural Highlights
                    </span>
                    <ul className="space-y-1.5">
                      {project.implementationDetails.slice(0, 3).map((detail, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-foreground/85 flex items-start gap-2 leading-snug"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          <span>
                            <strong className="font-medium text-foreground">{detail.title}:</strong>{" "}
                            <span className="text-muted-foreground line-clamp-2">
                              {detail.description}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold block mb-2">
                      Core Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-foreground/90 border border-border/80"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 6 && (
                        <span className="text-[11px] font-mono px-1.5 py-0.5 text-muted-foreground">
                          +{project.techStack.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 pb-6 flex flex-col sm:flex-row gap-2.5 border-t border-border/60">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full sm:flex-1 gap-1.5 font-mono text-xs"
                    onClick={() => handleSelectCaseStudy(project.id)}
                  >
                    <span>Inspect Case Study</span>
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
                      className="w-full gap-1.5 font-mono text-xs"
                      aria-label={`View ${project.title} GitHub repository`}
                    >
                      <Icons.gitHub className="h-3.5 w-3.5" />
                      <span>Repo</span>
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
