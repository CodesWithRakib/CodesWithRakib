import * as React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
}
