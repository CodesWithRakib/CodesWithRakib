import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { engineeringStrengthsData, EngineeringStrength } from "@/data/principles";
import {
  ShieldCheck,
  Cpu,
  Layers,
  Workflow,
  Sparkles,
  ArrowRight,
  FileCode2,
} from "lucide-react";

export function EngineeringStrengthsSection() {
  const getStrengthIcon = (id: string) => {
    switch (id) {
      case "maintainable-ui":
        return <Layers className="h-5 w-5 text-primary" />;
      case "type-safety-boundaries":
        return <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case "workflow-modeling":
        return <Workflow className="h-5 w-5 text-teal-600 dark:text-teal-400" />;
      case "resilient-ux-localization":
        return <Cpu className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <Sparkles className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <section id="principles" className="py-20 sm:py-24 border-t border-border bg-background">
      <Container>
        {/* Section Header */}
        <SectionHeader
          badge="ENGINEERING STRENGTHS & PRINCIPLES"
          title="How I Approach Solving Engineering Problems"
          description="Four practical engineering pillars grounded in production deliverables at SOFOF Tech and verified across local monorepo architectures."
        />

        {/* 4 Engineering Strengths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {engineeringStrengthsData.map((strength: EngineeringStrength) => (
            <Card
              key={strength.id}
              className="border-border bg-card flex flex-col justify-between p-6 sm:p-8 hover:border-primary/40 transition-all duration-300 relative group overflow-hidden shadow-xs"
              hoverEffect
            >
              <div className="space-y-4">
                {/* Header Icon & Tagline */}
                <div className="flex items-start justify-between gap-4">
                  <div className="p-2.5 rounded-xl bg-surface border border-border group-hover:border-primary/30 transition-colors">
                    {getStrengthIcon(strength.id)}
                  </div>
                  <Badge variant="outline" className="text-[11px] font-mono text-muted-foreground bg-muted/40">
                    Verified Craft
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {strength.title}
                  </h3>
                  <p className="text-xs font-mono text-primary font-medium mt-1">
                    {strength.tagline}
                  </p>
                </div>

                {/* Practical Value Box */}
                <div className="p-3.5 rounded-lg bg-surface border border-border/80 text-xs leading-relaxed space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
                    Practical Impact
                  </span>
                  <p className="text-foreground/90 font-medium">{strength.practicalValue}</p>
                </div>

                {/* Description Narrative */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {strength.description}
                </p>
              </div>

              {/* Evidence & Action Link Footer */}
              <div className="mt-6 pt-4 border-t border-border/70 space-y-3">
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <FileCode2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-snug">
                    <strong className="text-foreground font-mono">Evidence: </strong>
                    {strength.evidence}
                  </span>
                </div>

                {strength.projectLink && (
                  <div className="pt-1">
                    <a
                      href={strength.projectLink.href}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-primary hover:underline"
                    >
                      <span>{strength.projectLink.label}</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
