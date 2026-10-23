import type { Skill } from "@/types";

const TOTAL_BLOCKS = 10;

export function SkillBar({ skill }: { skill: Skill }) {
  const filled = Math.round((skill.level / 5) * TOTAL_BLOCKS);
  const empty = TOTAL_BLOCKS - filled;

  return (
    <div className="term-skill">
      <span className="term-skill-name">{skill.name}</span>
      <span className="term-skill-bar" aria-hidden>
        <span className="term-skill-bar-fill">{"█".repeat(filled)}</span>
        <span className="term-skill-bar-empty">{"░".repeat(empty)}</span>
      </span>
      <span className="term-skill-level" aria-hidden>
        {skill.level}/5
      </span>
      <span className="sr-only">
        {skill.name}, {skill.level} out of 5
      </span>
    </div>
  );
}
