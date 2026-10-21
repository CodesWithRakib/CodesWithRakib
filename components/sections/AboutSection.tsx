import * as React from "react";
import { profileData } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import {
  Code2,
  Layers,
  Database,
  Globe2,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from "lucide-react";

export function AboutSection() {
  const focusAreas = [
    {
      icon: Layers,
      title: "Frontend Architecture & Modern React",
      description:
        "Building production Next.js 16 App Router applications with Server and Client component boundaries, React 19 hooks, and strict TypeScript data contracts.",
      tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4"],
    },
    {
      icon: Code2,
      title: "API Integration & Isomorphic Contracts",
      description:
        "Standardizing client-server data flow using 18 modular RTK Query services, Zod schemas, and shared contracts packages that eliminate API drift.",
      tags: ["RTK Query", "Zod", "REST APIs", "Shared Contracts"],
    },
    {
      icon: Database,
      title: "Full-Stack SaaS Workflows",
      description:
        "Designing relational PostgreSQL entities, TypeORM migrations, modular NestJS controllers, and asynchronous BullMQ background workers.",
      tags: ["NestJS 12", "PostgreSQL 18", "TypeORM", "Redis / BullMQ"],
    },
    {
      icon: Globe2,
      title: "Localization, Accessibility & Media",
      description:
        "Delivering WCAG 2.2 AA accessible interfaces with next-intl (English/Bangla), Arabic bidirectional (RTL) layouts, and WebRTC consultation rooms.",
      tags: ["WCAG 2.2 AA", "RTL / Bidi", "next-intl", "WebRTC"],
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-24 border-t border-border/80 bg-surface/40 relative">
      <Container>
        {/* Section Header */}
        <ScrollReveal direction="up" delayMs={50}>
          <SectionHeader
            badge="ENGINEERING APPROACH &amp; FOCUS"
            title="Type-Safe, Resilient Systems Built for Production"
            description="Bridging disciplined frontend engineering with pragmatic backend architecture to deliver predictable, maintainable software."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column: Focused Narrative & Full-Stack Statement (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-foreground/90 leading-relaxed text-sm sm:text-base">
            <ScrollReveal direction="up" delayMs={100}>
              <p>
                My engineering approach is grounded in solving concrete problems. In commercial work at{" "}
                <strong className="text-foreground font-semibold">SOFOF Tech</strong>, I translate complex Figma
                systems into production web applications with{" "}
                <span className="text-primary font-medium">Next.js App Router, React 19, and TypeScript</span>—managing
                multi-role dashboards, authentication lifecycles, and bidirectional Arabic RTL layouts.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delayMs={150}>
              <p>
                Rather than treating the frontend as an isolated UI layer, I approach applications as end-to-end
                data pipelines. To prevent schema drift and unhandled edge cases, I actively author{" "}
                <strong className="text-foreground font-semibold">NestJS REST APIs</strong>, model relational entities with{" "}
                <strong className="text-foreground font-semibold">PostgreSQL and TypeORM</strong>, and manage asynchronous task
                queues with <strong className="text-foreground font-semibold">Redis and BullMQ</strong>.
              </p>
            </ScrollReveal>

            {/* Honest Full-Stack Growth Trajectory Box */}
            <ScrollReveal direction="up" delayMs={200}>
              <div className="rounded-xl border border-primary/25 bg-primary-subtle/50 p-5 sm:p-6 space-y-3 shadow-2xs">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm font-mono">
                  <Zap className="h-4 w-4" />
                  <span>Full-Stack Development Trajectory</span>
                </div>
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  {profileData.fullStackStatement}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delayMs={250}>
              <p className="text-muted-foreground text-xs sm:text-sm italic border-l-2 border-primary/40 pl-4 py-1">
                &ldquo;Good software is not just about making things work on the happy path. It is about building
                solutions that handle network latency gracefully, enforce strict type safety across boundaries, and remain
                predictable for the entire engineering team.&rdquo;
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column: 4 Core Engineering Focus Pillars (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <ScrollReveal direction="up" delayMs={100}>
              <h3 className="text-xs font-mono font-semibold tracking-wider uppercase text-muted-foreground mb-4">
                Core Engineering Pillars
              </h3>
            </ScrollReveal>

            <div className="space-y-3.5">
              {focusAreas.map((area, idx) => {
                const IconComponent = area.icon;
                return (
                  <ScrollReveal key={area.title} direction="up" delayMs={100 + idx * 80}>
                    <Card className="border-border bg-card/90 shadow-2xs hover:border-primary/40 transition-colors">
                      <CardHeader className="p-4 sm:p-5 pb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary-subtle text-primary border border-primary/20">
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <CardTitle className="text-sm sm:text-base font-semibold text-foreground">
                            {area.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-5 pt-1 space-y-2.5">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {area.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {area.tags.map((tag) => (
                            <Badge key={tag} variant="default" className="text-[11px] px-2 py-0.5">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5 Evidence-Backed Engineering Strengths Grid */}
        <div className="mt-16 pt-12 border-t border-border/80">
          <ScrollReveal direction="up" delayMs={50}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono font-medium tracking-wider uppercase text-primary">
                  VERIFIED CAPABILITIES
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
                  Evidence-Backed Engineering Strengths
                </h3>
              </div>
              <Badge variant="primary" className="hidden sm:inline-flex gap-1 text-xs">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Grounded in Real Code</span>
              </Badge>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {profileData.strengths.map((strength, idx) => (
              <ScrollReveal key={strength.title} direction="up" delayMs={idx * 80}>
                <div className="p-5 rounded-xl border border-border bg-card/80 shadow-2xs hover:border-primary/30 transition-colors flex flex-col justify-between space-y-3 h-full">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>{strength.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-6">
                      {strength.description}
                    </p>
                  </div>
                  <div className="pl-6 pt-2 border-t border-border/60">
                    <span className="text-[11px] font-mono text-primary font-medium block">
                      {strength.evidence}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
