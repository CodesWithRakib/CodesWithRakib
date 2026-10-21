"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/shared/Icons";
import { TiltCard } from "@/components/shared/TiltCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import {
  ArrowRight,
  Mail,
  FileText,
  Layers,
  Code2,
  Database,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

type HeroTab = "architecture" | "contracts" | "fullstack";

export function HeroSection() {
  const [activeTab, setActiveTab] = React.useState<HeroTab>("architecture");

  return (
    <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 md:pt-20 md:pb-28 overflow-hidden bg-tech-grid">
      {/* Subtle Radial Gradient Overlay to soften the grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial from-transparent via-background/80 to-background"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Direct, Confident Messaging & Primary CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Personal Status Pill */}
            <ScrollReveal direction="up" delayMs={50}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-subtle text-primary-subtle-foreground text-xs font-mono font-medium border border-primary/25 shadow-2xs">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span>Open for Frontend &amp; Full-Stack Opportunities</span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal direction="up" delayMs={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-foreground leading-[1.12]">
                I build thoughtful,{" "}
                <span className="text-primary block sm:inline mt-1 sm:mt-0 underline decoration-primary/30 underline-offset-8">
                  high-performance
                </span>{" "}
                web applications.
              </h1>
            </ScrollReveal>

            {/* Concise Supporting Value Proposition */}
            <ScrollReveal direction="up" delayMs={150}>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Frontend engineer specializing in{" "}
                <strong className="text-foreground font-semibold">React, Next.js, and TypeScript</strong>.
                Designing scalable SaaS architectures, role-based dashboards, and resilient full-stack systems with{" "}
                <strong className="text-foreground font-semibold">NestJS and PostgreSQL</strong>.
              </p>
            </ScrollReveal>

            {/* Primary Action Buttons */}
            <ScrollReveal direction="up" delayMs={200} className="w-full sm:w-auto">
              <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
                <a href="#projects" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2 group shadow-sm">
                    <span>Explore Flagship Work</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>

                <Link href="/resume" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2 font-mono text-xs">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>Resume / CV</span>
                  </Button>
                </Link>

                <a href="#contact" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>Contact</span>
                  </Button>
                </a>
              </div>
            </ScrollReveal>

            {/* Verified Social Profile Links */}
            <ScrollReveal direction="up" delayMs={250} className="w-full">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t border-border/80 w-full text-xs font-mono text-muted-foreground">
                <span className="text-foreground font-semibold">Verified Links:</span>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-1.5 hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded-xs"
                  aria-label="GitHub Profile"
                >
                  <Icons.gitHub className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-1.5 hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded-xs"
                  aria-label="LinkedIn Profile"
                >
                  <Icons.linkedIn className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={siteConfig.links.email}
                  className="inline-flex items-center gap-1.5 py-1.5 hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded-xs"
                  aria-label="Send direct email"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive 3D Engineering Workspace Showcase (5 cols) */}
          <div className="lg:col-span-5 w-full relative">
            <ScrollReveal direction="scale" delayMs={150}>
              <TiltCard
                maxTilt={6}
                scale={1.02}
                glare={true}
                className="w-full shadow-lg rounded-2xl border border-border bg-card/95 backdrop-blur-md overflow-visible relative"
              >
                {/* 3D Floating Badge 1 - Top Left */}
                <div
                  aria-hidden="true"
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-border shadow-md absolute -top-4 -left-4 z-30 animate-float-slow font-mono text-[11px] text-foreground"
                >
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-semibold text-primary">React 19 &amp; Next.js 16</span>
                </div>

                {/* 3D Floating Badge 2 - Bottom Right */}
                <div
                  aria-hidden="true"
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-border shadow-md absolute -bottom-4 -right-4 z-30 animate-float-reverse font-mono text-[11px] text-foreground"
                >
                  <Database className="h-3.5 w-3.5 text-accent" />
                  <span>NestJS &amp; PostgreSQL</span>
                </div>

                {/* Window Chrome / Titlebar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/60 rounded-t-2xl">
                  {/* Traffic light dots */}
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-amber-400/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400/80 inline-block" />
                    <span className="ml-2 font-mono text-xs font-medium text-foreground/80">
                      workspace.config.ts
                    </span>
                  </div>

                  {/* Tab Selectors */}
                  <div className="flex items-center gap-1 bg-background/80 p-0.5 rounded-lg border border-border text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setActiveTab("architecture")}
                      className={`px-2 py-1 rounded-md transition-colors ${
                        activeTab === "architecture"
                          ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Topology
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("contracts")}
                      className={`px-2 py-1 rounded-md transition-colors ${
                        activeTab === "contracts"
                          ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Contracts
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("fullstack")}
                      className={`px-2 py-1 rounded-md transition-colors ${
                        activeTab === "fullstack"
                          ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Metrics
                    </button>
                  </div>
                </div>

                {/* Interactive Viewport Body */}
                <div className="p-5 font-mono text-xs space-y-4 min-h-[290px] flex flex-col justify-between">
                  {activeTab === "architecture" && (
                    <div className="space-y-3 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between text-muted-foreground text-[11px] pb-1 border-b border-border/50">
                        <span>// Monorepo System Architecture</span>
                        <span className="text-primary font-semibold">Strict Contracts</span>
                      </div>

                      {/* Architecture Topology Visual Nodes */}
                      <div className="space-y-2 pt-1">
                        <div className="p-2.5 rounded-lg border border-primary/20 bg-primary-subtle/40 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Layers className="h-4 w-4 text-primary" />
                            <span className="font-semibold text-foreground">Frontend Web App</span>
                          </div>
                          <Badge variant="default" className="text-[10px] px-1.5 py-0 font-normal">
                            Next.js 16 RSC
                          </Badge>
                        </div>

                        <div className="flex justify-center text-muted-foreground text-[10px]">
                          ↕ Isomorphic Types (@ogroniedu/contracts)
                        </div>

                        <div className="p-2.5 rounded-lg border border-accent/20 bg-accent-subtle/40 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Code2 className="h-4 w-4 text-accent" />
                            <span className="font-semibold text-foreground">Modular Backend API</span>
                          </div>
                          <Badge variant="accent" className="text-[10px] px-1.5 py-0 font-normal">
                            NestJS 12
                          </Badge>
                        </div>

                        <div className="flex justify-center text-muted-foreground text-[10px]">
                          ↕ TypeORM Migrations &amp; Queues
                        </div>

                        <div className="p-2.5 rounded-lg border border-border bg-muted/40 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Database className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold text-foreground">Data Layer</span>
                          </div>
                          <span className="text-[11px] text-muted-foreground">PostgreSQL 18 + Redis</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "contracts" && (
                    <div className="space-y-2 text-foreground/90 animate-in fade-in duration-300 leading-relaxed">
                      <div className="text-muted-foreground text-[11px] pb-1 border-b border-border/50 flex justify-between">
                        <span>// packages/contracts/src/booking.ts</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Zod Schema</span>
                      </div>
                      <pre className="p-3 rounded-lg bg-muted/50 border border-border text-[11px] overflow-x-auto leading-relaxed text-foreground">
{`export const LessonBookingSchema = z.object({
  tutorId: z.string().uuid(),
  guardianId: z.string().uuid(),
  subjectCode: z.enum(["MATH", "PHYS", "CHEM"]),
  scheduledAt: z.string().datetime(),
  hourlyRate: z.number().positive(),
  role: z.literal("GUARDIAN"),
});

export type LessonBooking = z.infer<typeof LessonBookingSchema>;`}
                      </pre>
                      <p className="text-[11px] text-muted-foreground italic">
                        Shared between Next.js React Hook Form and NestJS ValidationPipe.
                      </p>
                    </div>
                  )}

                  {activeTab === "fullstack" && (
                    <div className="space-y-3 animate-in fade-in duration-300">
                      <div className="text-muted-foreground text-[11px] pb-1 border-b border-border/50 flex justify-between">
                        <span>// Production Verification Metrics</span>
                        <span className="text-primary font-semibold">100% Real Code</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 pt-1">
                        <div className="p-3 rounded-xl border border-border bg-surface">
                          <span className="text-muted-foreground text-[10px] block">State Management</span>
                          <span className="text-lg font-bold text-foreground font-sans">18 Slices</span>
                          <span className="text-[10px] text-primary block mt-0.5">RTK Query Services</span>
                        </div>

                        <div className="p-3 rounded-xl border border-border bg-surface">
                          <span className="text-muted-foreground text-[10px] block">Logistics Engine</span>
                          <span className="text-lg font-bold text-foreground font-sans">21 States</span>
                          <span className="text-[10px] text-accent block mt-0.5">Parcel State Machine</span>
                        </div>

                        <div className="p-3 rounded-xl border border-border bg-surface">
                          <span className="text-muted-foreground text-[10px] block">Accessibility Standard</span>
                          <span className="text-lg font-bold text-foreground font-sans">WCAG 2.2</span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">Level AA Verified</span>
                        </div>

                        <div className="p-3 rounded-xl border border-border bg-surface">
                          <span className="text-muted-foreground text-[10px] block">Client Localization</span>
                          <span className="text-lg font-bold text-foreground font-sans">Bilingual</span>
                          <span className="text-[10px] text-muted-foreground block mt-0.5">next-intl &amp; RTL</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Bottom Status Ribbon */}
                  <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      <span>Monorepo Verified</span>
                    </div>
                    <span className="font-mono text-primary font-medium">CodesWithRakib</span>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>

        {/* Tasteful Scroll Down Prompt */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <a
            href="#projects"
            className="group inline-flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-2"
            aria-label="Scroll to projects showcase"
          >
            <span className="text-[11px] font-mono tracking-wider uppercase font-medium">
              Explore Featured Work
            </span>
            <ChevronDown className="h-4 w-4 animate-bounce text-primary" />
          </a>
        </div>
      </Container>
    </section>
  );
}
