import * as React from "react";
import { profileData } from "@/data/profile";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Layout,
  Network,
  Database,
  Globe2,
  Code2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function AboutSection() {
  const focusAreas = [
    {
      icon: Layout,
      title: "Frontend Architecture & Modern React",
      description:
        "Building modular component hierarchies with Next.js App Router, React 19, and TypeScript. Strict separation between Server and Client Components ensures minimal JS bundle footprint and instant paint.",
      tags: ["Next.js 16", "React 19", "Server Components", "Tailwind 4"],
    },
    {
      icon: Network,
      title: "API Integration & Isomorphic Contracts",
      description:
        "Eliminating frontend/backend schema drift by sharing DTOs and Zod validation schemas across monorepos. Designing robust RTK Query services with tag-based cache invalidation and error boundaries.",
      tags: ["@contracts", "RTK Query", "Zod", "REST / Swagger"],
    },
    {
      icon: Database,
      title: "Full-Stack SaaS Workflows",
      description:
        "Expanding beyond the DOM into scalable backend architecture. Modeling relational PostgreSQL schemas, writing TypeORM migrations, and configuring BullMQ/Redis queues for asynchronous tasks.",
      tags: ["NestJS 12", "PostgreSQL", "TypeORM", "BullMQ & Redis"],
    },
    {
      icon: Globe2,
      title: "Localization, Accessibility & Media",
      description:
        "Delivering accessible interfaces adhering to WCAG 2.1 AA standards. Proven production experience with next-intl (English/Bangla), complex Arabic RTL bidirectional layouts, and WebRTC consultations.",
      tags: ["WCAG 2.1 AA", "RTL / bidi", "next-intl", "WebRTC"],
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 border-t border-border/80 bg-surface/50">
      <Container>
        {/* Section Header */}
        <SectionHeader
          badge="PROFESSIONAL PROFILE"
          title="Engineering with clarity, type safety, and real-world intent."
          description="A look at how I approach frontend systems, collaborate across full-stack boundaries, and write software designed to last."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left Column: Narrative Copy & Full-Stack Statement */}
          <div className="lg:col-span-7 space-y-6 text-foreground/90 leading-relaxed text-sm sm:text-base">
            <p>
              My engineering approach is grounded in solving tangible problems. At{" "}
              <strong className="text-foreground font-semibold">SOFOF Tech</strong>, I work daily translating
              complex Figma designs into production-ready web applications using{" "}
              <span className="text-primary font-medium">Next.js App Router, React 19, and TypeScript</span>. My
              responsibilities span multi-role role-based dashboards, secure authentication flows, real-time multimedia
              consultations via WebRTC, and internationalization across both left-to-right and right-to-left (Arabic RTL) writing systems.
            </p>

            <p>
              Rather than viewing frontend development as an isolated UI layer, I approach applications as interconnected
              systems. To ensure smooth data flow and resilient state management, I have actively expanded into backend engineering—designing
              relational database entities with <strong className="text-foreground font-semibold">PostgreSQL and TypeORM</strong>,
              authoring modular <strong className="text-foreground font-semibold">NestJS REST APIs</strong>, and handling background
              queues with <strong className="text-foreground font-semibold">Redis and BullMQ</strong> in real monorepo projects.
            </p>

            {/* Honest Full-Stack Statement Box */}
            <div className="rounded-xl border border-primary/20 bg-primary-subtle/50 p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm font-mono">
                <Code2 className="h-4 w-4" />
                <span>My Full-Stack Development Trajectory</span>
              </div>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                {profileData.fullStackStatement}
              </p>
            </div>

            <p className="text-muted-foreground text-xs sm:text-sm italic">
              &ldquo;I believe good software is not just about making things work on the happy path. It is about building
              solutions that handle network latency gracefully, enforce strict type safety across boundaries, and remain understandable
              and maintainable for the entire engineering team.&rdquo;
            </p>
          </div>

          {/* Right Column: 4 Core Engineering Focus Pillars */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-mono font-semibold tracking-wider uppercase text-muted-foreground mb-4">
              Core Engineering Focus Areas
            </h3>

            <div className="space-y-4">
              {focusAreas.map((area) => {
                const IconComponent = area.icon;
                return (
                  <Card key={area.title} className="border-border bg-card shadow-2xs hover:border-border transition-colors">
                    <CardHeader className="p-4 sm:p-5 pb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary-subtle text-primary border border-primary/20">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <CardTitle className="text-sm sm:text-base font-semibold">
                          {area.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-5 pt-1 space-y-3">
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
                );
              })}
            </div>
          </div>
        </div>

        {/* 5 Evidence-Backed Engineering Strengths Grid */}
        <div className="mt-16 pt-12 border-t border-border/80">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {profileData.strengths.map((strength) => (
              <div
                key={strength.title}
                className="p-5 rounded-xl border border-border bg-surface flex flex-col justify-between space-y-3"
              >
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
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
