import * as React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EngineeringStrengthsSection } from "@/components/sections/EngineeringStrengthsSection";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Icons } from "@/components/shared/Icons";
import { Mail } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section (Phase 03) */}
      <HeroSection />

      {/* 2. About & Professional Profile Section (Phase 03) */}
      <AboutSection />

      {/* 3. Featured Projects Showcase (Phase 04) */}
      <FeaturedProjectsSection />

      {/* 4. Deep-Dive Architectural Case Studies (Phase 04) */}
      <CaseStudiesSection />

      {/* 5. Professional Work Experience (Phase 05) */}
      <ExperienceSection />

      {/* 6. Technical Capabilities & Skills Matrix (Phase 05) */}
      <SkillsSection />

      {/* 7. Engineering Strengths & Principles (Phase 05) */}
      <EngineeringStrengthsSection />

      {/* 8. Contact Section Target (Queued for Phase 06) */}
      <section id="contact" className="py-20 sm:py-24 border-t border-border bg-surface/40">
        <Container>
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6 shadow-xs">
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
