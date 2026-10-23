import { experience as experienceData } from "@/content/experience";
import type { Command } from "@/types/terminal";

export const experience = {
  name: "experience",
  aliases: ["work-history"],
  description: "Walk the timeline, newest first.",
  usage: "experience",
  run: () => ({
    type: "element",
    component: (
      <div className="term-timeline">
        {experienceData.map((role) => (
          <div key={`${role.company}-${role.start}`} className="term-timeline-item">
            <p className="term-timeline-range">
              {role.start} → {role.end ?? "present"}
            </p>
            <p className="term-timeline-role">
              {role.role} · {role.company}
            </p>
            <p className="term-text term-muted">{role.description}</p>
            <p className="term-text term-muted">{role.tech.join(" · ")}</p>
          </div>
        ))}
      </div>
    ),
  }),
} satisfies Command;
