import { projects as projectData } from "@/content/projects";
import type { Command } from "@/types/terminal";
import { ProjectCard } from "../output/ProjectCard";

function ProjectIndex() {
  return (
    <div className="term-projects">
      {projectData.map((project) => (
        <div key={project.slug} className="term-project-row">
          <span className="term-project-slug">~/projects/{project.slug}</span>
          <span>{project.title}</span>
          <span className="term-project-meta">
            {project.year} · {project.category.replace("-", " ")} ·{" "}
            {project.tech.slice(0, 3).join(", ")}
          </span>
        </div>
      ))}
      <p className="term-text term-muted">
        Run `projects &lt;slug&gt;` for the full log, e.g. `projects {projectData[0]?.slug}`.
      </p>
    </div>
  );
}

export const projects = {
  name: "projects",
  aliases: ["work"],
  description: "Browse selected work; add a slug for detail.",
  usage: "projects [slug]",
  run: (args) => {
    if (args.length === 0) {
      return { type: "element", component: <ProjectIndex /> };
    }

    const query = args.join(" ").toLowerCase();
    const project = projectData.find(
      (entry) => entry.slug.toLowerCase() === query || entry.title.toLowerCase() === query,
    );

    if (!project) {
      return {
        type: "error",
        message: `No project matches “${args.join(" ")}”. Run \`projects\` to list them.`,
      };
    }

    return { type: "element", component: <ProjectCard project={project} /> };
  },
} satisfies Command;
