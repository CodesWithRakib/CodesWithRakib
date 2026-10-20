import * as React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EngineeringStrengthsSection } from "@/components/sections/EngineeringStrengthsSection";
import { ContactSection } from "@/components/sections/ContactSection";

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

      {/* 8. Contact & Recruiter Conversion (Phase 06) */}
      <ContactSection />
    </div>
  );
}
