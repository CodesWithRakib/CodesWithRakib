import * as React from "react";
import { profileData } from "@/data/profile";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Icons } from "@/components/shared/Icons";
import { ArrowRight, Mail, FileText, CheckCircle2, GitBranch, Terminal } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-28 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Role Headline, Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-subtle text-primary-subtle-foreground text-xs font-mono font-medium border border-primary/20 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>{profileData.statusBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-extrabold tracking-tight text-foreground leading-[1.15]">
              Frontend Developer building{" "}
              <span className="text-primary underline decoration-primary/30 underline-offset-8">
                production-grade
              </span>{" "}
              web applications & scalable SaaS.
            </h1>

            {/* Supporting Introduction */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              I specialize in <strong className="text-foreground font-semibold">React, Next.js, and TypeScript</strong> at{" "}
              <span className="text-foreground font-semibold">SOFOF Tech</span>, crafting type-safe, resilient interfaces
              with clean component architectures and verified API contracts. Beyond the frontend, I actively engineer
              full-stack systems with <span className="text-foreground font-semibold">NestJS, PostgreSQL, TypeORM</span>, and background queues.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <a href="#projects" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2 group">
                  <span>Explore My Work</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </a>

              <a href="#contact" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>Get In Touch</span>
                </Button>
              </a>

              <a
                href={siteConfig.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 font-mono text-xs">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>Resume PDF</span>
                </Button>
              </a>
            </div>

            {/* Verified Social Links */}
            <div className="flex items-center gap-6 pt-4 border-t border-border/80 w-full text-xs font-mono text-muted-foreground">
              <span className="text-foreground font-semibold">Verify Profile:</span>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                aria-label="GitHub Profile"
              >
                <Icons.gitHub className="h-4 w-4" />
                <span>GitHub</span>
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Icons.linkedIn className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={siteConfig.links.email}
                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                aria-label="Send direct email"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Engineering Snapshot Card */}
          <div className="lg:col-span-5 w-full">
            <Card className="border-border bg-surface shadow-xs relative overflow-hidden">
              {/* Terminal / Code Card Topbar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-primary" />
                  <span className="text-foreground font-semibold">Rakib.profile.ts</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <GitBranch className="h-3 w-3 text-muted-foreground" />
                  <span>main</span>
                </div>
              </div>

              {/* Code Snippet / Technical Identity */}
              <CardContent className="p-5 font-mono text-xs space-y-3 leading-relaxed">
                <div>
                  <span className="text-muted-foreground">// Current Professional Focus</span>
                  <p className="text-foreground font-semibold">
                    <span className="text-primary">const</span> engineer = &#123;
                  </p>
                </div>

                <div className="pl-4 space-y-1.5 text-foreground/90">
                  <p>
                    <span className="text-muted-foreground">role:</span>{" "}
                    <span className="text-primary font-medium">&quot;Frontend Developer&quot;</span>,
                  </p>
                  <p>
                    <span className="text-muted-foreground">company:</span>{" "}
                    <span className="text-foreground font-medium">&quot;SOFOF Tech&quot;</span>,
                  </p>
                  <p>
                    <span className="text-muted-foreground">coreStack:</span> [
                    <span className="text-primary">&quot;React 19&quot;</span>,{" "}
                    <span className="text-primary">&quot;Next.js 16&quot;</span>,{" "}
                    <span className="text-primary">&quot;TypeScript&quot;</span>
                    ],
                  </p>
                  <p>
                    <span className="text-muted-foreground">fullStackGrowth:</span> [
                    <span className="text-accent">&quot;NestJS&quot;</span>,{" "}
                    <span className="text-accent">&quot;PostgreSQL&quot;</span>,{" "}
                    <span className="text-accent">&quot;TypeORM&quot;</span>
                    ],
                  </p>
                  <p>
                    <span className="text-muted-foreground">architecture:</span>{" "}
                    <span className="text-foreground/80">&quot;Modular Monorepo & Shared Contracts&quot;</span>,
                  </p>
                  <p>
                    <span className="text-muted-foreground">location:</span>{" "}
                    <span>&quot;Dhaka, Bangladesh&quot;</span>,
                  </p>
                </div>

                <p className="text-foreground font-semibold">&#125;;</p>

                {/* Verified Artifact Checklist */}
                <div className="pt-3 border-t border-border space-y-2 text-[11px]">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    <span>3 Flagship Monorepo Projects on GitHub</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    <span>Production Client WebRTC & RTL Experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    <span>Strict TypeScript & Zero Mocked Data Claims</span>
                  </div>
                </div>
              </CardContent>

              {/* Card Footer Status */}
              <CardFooter className="px-5 py-3 border-t border-border bg-muted/30 flex items-center justify-between text-[11px] font-mono">
                <span className="text-muted-foreground">Status: Ready for Interviews</span>
                <Badge variant="primary" className="text-[10px] px-2 py-0">
                  Open to Hire
                </Badge>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
