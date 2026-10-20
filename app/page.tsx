import * as React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { projectsData } from "@/data/projects";
import { Icons } from "@/components/shared/Icons";
import {
  ExternalLink,
  Mail,
  FolderGit2,
  Clock,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section (Phase 03) */}
      <HeroSection />

      {/* 2. About & Professional Profile Section (Phase 03) */}
      <AboutSection />

      {/* 3. Featured Projects Anchor Target & Preview (Queued for Phase 04) */}
      <section id="projects" className="py-16 sm:py-20 border-t border-border bg-background">
        <Container>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="primary" className="text-xs">
                  FLAGSHIP WORK
                </Badge>
                <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Full Case Studies & Tabs Queued for Phase 04
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Featured Engineering Initiatives
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-1 max-w-2xl">
                Real SaaS monorepos architected around strict validation, background queues, and verified business domains.
              </p>
            </div>

            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0"
            >
              <Button variant="outline" size="sm" className="gap-1.5 font-mono text-xs">
                <FolderGit2 className="h-3.5 w-3.5" />
                <span>View All on GitHub</span>
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsData.map((project) => (
              <Card key={project.id} className="flex flex-col justify-between border-border bg-surface" hoverEffect>
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="default" className="text-[11px]">
                      {project.category}
                    </Badge>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <CardTitle className="text-base sm:text-lg mt-2">
                    {project.title}{" "}
                    <span className="text-xs font-normal text-muted-foreground">({project.nativeTitle})</span>
                  </CardTitle>
                  <CardDescription className="text-xs leading-relaxed line-clamp-3">
                    {project.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/70">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-foreground/80 border border-border/80"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 text-muted-foreground">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Experience & Skills Section Targets (Queued for Phase 05) */}
      <section id="experience" className="py-12 border-t border-border bg-surface/30">
        <Container>
          <div className="p-6 rounded-xl border border-border bg-card flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-primary font-medium">
                CURRENT ROLE
              </span>
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                Frontend Developer at SOFOF Tech
              </h3>
              <p className="text-xs text-muted-foreground max-w-xl">
                Building production web applications, WebRTC consultations, and bidirectional Arabic RTL layouts. Full timeline and skills matrix scheduled for Phase 05.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span id="skills" />
              <Badge variant="primary" className="text-xs">
                SOFOF Tech (Present)
              </Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Contact Section Target (Queued for Phase 06) */}
      <section id="contact" className="py-16 sm:py-20 border-t border-border bg-background">
        <Container>
          <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex p-3 rounded-full bg-primary-subtle text-primary border border-primary/20">
              <Mail className="h-6 w-6" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Let&apos;s Connect & Discuss Opportunities
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
                I am actively considering Frontend and full-stack-oriented software engineering roles. Reach out directly via email or connect on LinkedIn.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a href={siteConfig.links.email}>
                <Button variant="primary" size="lg" className="gap-2 font-mono text-xs">
                  <Mail className="h-4 w-4" />
                  <span>{siteConfig.author.email}</span>
                </Button>
              </a>

              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg" className="gap-2 font-mono text-xs">
                  <Icons.linkedIn className="h-4 w-4" />
                  <span>LinkedIn Profile</span>
                </Button>
              </a>

              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="gap-2 font-mono text-xs">
                  <Icons.gitHub className="h-4 w-4" />
                  <span>GitHub Profile</span>
                </Button>
              </a>
            </div>

            <p className="text-[11px] font-mono text-muted-foreground pt-4">
              Direct response guaranteed within 24 hours. Located in Dhaka, Bangladesh (UTC+6).
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
