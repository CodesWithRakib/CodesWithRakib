import * as React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EngineeringStrengthsSection } from "@/components/sections/EngineeringStrengthsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <HeroSection />
      <FeaturedProjectsSection />
      <CaseStudiesSection />
      <ExperienceSection />
      <SkillsSection />
      <EngineeringStrengthsSection />
      <ContactSection />
    </div>
  );
}
