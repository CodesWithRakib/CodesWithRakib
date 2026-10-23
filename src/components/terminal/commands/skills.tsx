import { skills as skillData } from "@/content/skills";
import type { SkillCategory } from "@/types";
import type { Command } from "@/types/terminal";
import { SkillBar } from "../output/SkillBar";

const GROUPS: Array<{ id: SkillCategory; label: string }> = [
  { id: "frontend", label: "frontend" },
  { id: "backend", label: "backend" },
  { id: "tooling", label: "tooling" },
  { id: "design", label: "design" },
];

export const skills = {
  name: "skills",
  aliases: ["stack"],
  description: "Inspect the stack with proficiency meters.",
  usage: "skills",
  run: () => ({
    type: "element",
    component: (
      <div className="term-skills">
        {GROUPS.map((group) => {
          const entries = skillData.filter((skill) => skill.category === group.id);
          if (entries.length === 0) return null;

          return (
            <section key={group.id} aria-label={`${group.label} skills`}>
              <h3 className="term-skill-group-title">## {group.label}</h3>
              {entries.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </section>
          );
        })}
        <p className="term-muted">Ratings are self-assessed, 1–5.</p>
      </div>
    ),
  }),
} satisfies Command;
