import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { experienceData } from "@/data/experience";
import {
  MapPin,
  Calendar,
  CheckCircle2,
  Terminal,
  Globe,
  Layers,
} from "lucide-react";

export function ExperienceSection() {
  const currentJob = experienceData[0];

  return (
    <section id="experience" className="py-20 sm:py-24 border-t border-border bg-background">
      <Container>
        {/* Section Header */}
        <SectionHeader
          badge="PROFESSIONAL WORK EXPERIENCE"
          title="Production Frontend Engineering at SOFOF Tech"
          description="Real-world client deliverables, interactive SaaS portals, and bidirectional internationalization built with strict adherence to maintainable architecture."
        />

        {/* Experience Presentation Card */}
        <div className="relative border border-border bg-card rounded-2xl p-6 sm:p-8 md:p-10 shadow-xs overflow-hidden">
          {/* Subtle top indicator bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-accent/40 opacity-80" />

          {/* Header Row: Company, Role, Meta Badges */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border/70">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Current Employment
                </span>
                <Badge variant="outline" className="text-xs font-mono">
                  {currentJob.type}
                </Badge>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {currentJob.role}
                </h3>
                <div className="text-base sm:text-lg font-semibold text-primary mt-0.5">
                  {currentJob.company}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                <span>{currentJob.period}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface border border-border">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>{currentJob.location}</span>
              </div>
            </div>
          </div>

          {/* Role Overview */}
          <div className="py-6 border-b border-border/70">
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed max-w-4xl">
              {currentJob.overview}
            </p>
          </div>

          {/* Responsibilities & Contributions (Action + Technical Context + Purpose/Outcome) */}
          <div className="pt-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-md bg-primary-subtle text-primary">
                <Terminal className="h-4 w-4" />
              </span>
              <h4 className="text-base sm:text-lg font-bold text-foreground">
                Verified Contributions & Practical Responsibilities
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentJob.responsibilities.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl border border-border bg-surface/50 hover:border-primary/30 transition-all space-y-2 group"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div className="space-y-1">
                      <h5 className="text-xs sm:text-sm font-semibold text-foreground">
                        {item.title}
                      </h5>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Projects / Practical Work Environments */}
          {currentJob.projectsMentioned && (
            <div className="mt-8 p-4 rounded-xl border border-primary/20 bg-primary-subtle/30 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-primary">
                <Globe className="h-3.5 w-3.5" />
                Production Client Platforms Built & Maintained
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {currentJob.projectsMentioned.map((proj, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-foreground/85 px-3 py-2 rounded-lg bg-card border border-border/80 flex items-start gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    <span className="leading-snug">{proj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Core Technologies Used In Production */}
          <div className="mt-8 pt-6 border-t border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5 shrink-0">
              <Layers className="h-3.5 w-3.5 text-primary" />
              Technologies Applied in Daily Production:
            </span>

            <div className="flex flex-wrap gap-1.5">
              {currentJob.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-foreground/90 border border-border/80 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
