import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="term-card">
      <p className="term-card-path">~/projects/{project.slug}</p>
      <h3 className="term-card-title">{project.title}</h3>
      <p className="term-text term-muted">{project.longDescription ?? project.description}</p>

      <ul className="term-tags" aria-label="Technologies">
        {project.tech.map((tech) => (
          <li key={tech} className="term-tag">
            {tech}
          </li>
        ))}
      </ul>

      {project.liveUrl || project.repoUrl ? (
        <div className="term-links">
          {project.liveUrl ? (
            <a className="term-link" href={project.liveUrl} target="_blank" rel="noreferrer">
              live site ↗
            </a>
          ) : null}
          {project.repoUrl ? (
            <a className="term-link" href={project.repoUrl} target="_blank" rel="noreferrer">
              repository ↗
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
