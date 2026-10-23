import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectArtwork } from "@/components/projects/ProjectArtwork";
import { additionalProjects, featuredProjects } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function WorkSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-24 border-t border-border py-24 sm:py-28 lg:py-36"
    >
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="type-label flex items-center gap-4 text-muted-foreground">
                <span className="text-primary">02</span>
                <span aria-hidden="true" className="h-px w-10 bg-border" />
                Selected work
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="work-heading" className="type-h2 mt-6 max-w-[15ch]">
                Systems built end to end.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="max-w-[36ch]">
            <p className="text-[1rem] leading-relaxed text-muted-foreground">
              Three production projects, from the interface down to the data
              model. Every claim links to the repository it came from.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-28">
          {featuredProjects.map((project, index) => {
            const flipped = index % 2 === 1;
            return (
              <article
                key={project.id}
                aria-labelledby={`project-${project.id}`}
                className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12"
              >
                <Reveal
                  className={cn(
                    "lg:col-span-7",
                    flipped ? "lg:order-2" : "lg:order-1"
                  )}
                >
                  <ProjectArtwork project={project} />
                </Reveal>

                <div
                  className={cn(
                    "lg:col-span-5",
                    flipped
                      ? "lg:order-1 lg:pr-4"
                      : "lg:order-2 lg:pl-4"
                  )}
                >
                  <Reveal delay={0.05}>
                    <div className="flex items-center gap-4">
                      <span className="type-label text-primary">
                        {project.index}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-px flex-1 bg-border"
                      />
                      <span className="type-label text-muted-foreground">
                        {project.domain}
                      </span>
                    </div>

                    <h3
                      id={`project-${project.id}`}
                      className="type-h3 mt-5 text-foreground"
                    >
                      {project.title}
                    </h3>

                    <p className="mt-3 max-w-[42ch] text-[1.0625rem] leading-[1.65] text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="mt-6 border-t border-border pt-4">
                      <p className="type-label text-muted-foreground">
                        My contribution
                      </p>
                      <p className="mt-2.5 max-w-[44ch] text-[1rem] leading-relaxed text-foreground/90">
                        {project.contribution}
                      </p>
                    </div>

                    <ul
                      className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2"
                      aria-label={`${project.title} technologies`}
                    >
                      {project.stack.map((technology, stackIndex) => (
                        <li
                          key={technology}
                          className="flex items-center gap-3 font-mono text-[0.8125rem] text-muted-foreground"
                        >
                          {stackIndex > 0 && (
                            <span
                              aria-hidden="true"
                              className="h-1 w-1 rounded-full bg-border-strong"
                            />
                          )}
                          {technology}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-7 inline-flex items-center gap-2.5 border-b border-border-strong pb-1.5 text-[1rem] font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    >
                      View repository
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-20 border-t border-border lg:mt-28">
          <div className="flex flex-wrap items-baseline justify-between gap-3 py-5">
            <p className="type-label text-muted-foreground">Additional work</p>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[0.9375rem] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <span className="underline-grow">All repositories</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <ul>
            {additionalProjects.map((project) => (
              <li key={project.title} className="border-t border-border">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-1 gap-3 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:grid-cols-12 sm:items-baseline sm:gap-6"
                >
                  <span className="type-label text-muted-foreground sm:col-span-2">
                    {project.category}
                  </span>
                  <span className="font-display text-[1.5rem] font-medium leading-tight tracking-[-0.03em] text-foreground transition-colors group-hover:text-primary sm:col-span-4">
                    {project.title}
                  </span>
                  <span className="text-[0.95rem] leading-relaxed text-muted-foreground sm:col-span-4">
                    {project.description}
                  </span>
                  <span className="flex items-center justify-between gap-3 sm:col-span-2 sm:justify-end">
                    <span className="font-mono text-[0.75rem] text-muted-foreground">
                      {project.stack.join(" · ")}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="mt-14">
          <Link
            href="/resume"
            prefetch={false}
            className="group inline-flex items-center gap-2.5 text-[1rem] font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <span className="underline-grow">Full experience and résumé</span>
            <ArrowUpRight
              className="h-4 w-4 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
