import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { skillsData, SkillGroup } from "@/data/skills";
import {
  Code2,
  Database,
  Layers,
  Workflow,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function SkillsSection() {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "frontend-core":
        return <Code2 className="h-4 w-4 text-primary" />;
      case "state-forms":
        return <Layers className="h-4 w-4 text-primary" />;
      case "backend-databases":
        return <Database className="h-4 w-4 text-teal-600 dark:text-teal-400" />;
      case "engineering-workflows":
        return <Workflow className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      default:
        return <Code2 className="h-4 w-4 text-primary" />;
    }
  };

  const getHierarchyBadge = (hierarchy: SkillGroup["hierarchy"]) => {
    switch (hierarchy) {
      case "primary":
        return (
          <Badge variant="primary" className="text-[11px] font-mono">
            Core Production
          </Badge>
        );
      case "additional":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
            Monorepo Verified
          </span>
        );
      case "developing":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Active Practice
          </span>
        );
    }
  };

  return (
    <section id="skills" className="py-20 sm:py-24 border-t border-border bg-surface/30">
      <Container>
        {/* Section Header */}
        <SectionHeader
          badge="TECHNICAL CAPABILITIES & PROFICIENCY"
          title="Technologies Grounded in Practical Engineering"
          description="Distinguishing daily production frontend tools from verified full-stack monorepo implementations and active areas of architectural practice. Zero arbitrary percentage meters."
        />

        {/* Classification Policy Note */}
        <div className="mb-10 p-4 rounded-xl border border-border bg-card flex items-start gap-3 text-xs leading-relaxed text-muted-foreground max-w-4xl">
          <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <strong className="text-foreground font-mono">Classification Policy: </strong>
            Core frontend tooling reflects daily professional production at SOFOF Tech; backend, database, and queue tools reflect verified implementation in flagship monorepos (OgroniEdu, Dhruto, Gramer Bazar). No arbitrary proficiency scores.
          </div>
        </div>

        {/* 4 Skill Category Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillsData.map((category) => (
            <Card
              key={category.id}
              className="border-border bg-card flex flex-col justify-between shadow-xs hover:border-primary/30 transition-colors"
            >
              <CardHeader className="pb-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-md bg-surface border border-border">
                      {getCategoryIcon(category.id)}
                    </span>
                    <CardTitle className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                      {category.title}
                    </CardTitle>
                  </div>
                  {getHierarchyBadge(category.hierarchy)}
                </div>

                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  {category.summary}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-2 pb-6">
                <div className="space-y-3 pt-3 border-t border-border/70">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-surface/60 border border-border/80 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 hover:border-primary/20 transition-colors"
                    >
                      <div className="flex items-center gap-2 shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span className="text-xs font-mono font-bold text-foreground">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground leading-snug sm:text-right">
                        {skill.context}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
