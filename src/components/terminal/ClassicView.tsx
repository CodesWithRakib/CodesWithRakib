"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { fadeUp } from "@/lib/motion";
import type { SkillCategory } from "@/types";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}

function Section({ id, eyebrow, title, children }: SectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-title`}
      className="border-t border-border py-14 sm:py-20"
      variants={fadeUp}
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.15 }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fg-muted">{eyebrow}</p>
      <h2
        id={`${id}-title`}
        className="mt-3 font-display text-3xl tracking-tight text-balance text-fg sm:text-4xl"
      >
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </motion.section>
  );
}

const SKILL_GROUPS: { category: SkillCategory; label: string }[] = [
  { category: "frontend", label: "Frontend" },
  { category: "backend", label: "Backend" },
  { category: "tooling", label: "Tooling & testing" },
  { category: "design", label: "Design" },
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function formatMonth(iso: string): string {
  const [year, month] = iso.split("-");
  const label = MONTHS[Number(month) - 1] ?? iso;
  return `${label} ${year}`;
}

function formatPeriod(start: string, end?: string): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : "Present"}`;
}

interface ClassicViewProps {
  onOpenTerminal: () => void;
}

export function ClassicView({ onOpenTerminal }: ClassicViewProps) {
  const current = experience[0];

  return (
    <div className="classic-view">
      <div className="classic-container">
        <header className="pb-14 pt-2 sm:pb-20">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-fg-muted">
              Portfolio / {new Date().getFullYear()}
            </p>
            <p className="flex items-center gap-2 text-xs text-fg-muted">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              {profile.location}
            </p>
          </div>

          <h1 className="mt-10 font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-balance text-fg">
            {profile.name}
          </h1>
          <p className="mt-4 text-xl text-accent sm:text-2xl">{profile.role}</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted">{profile.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="classic-button classic-button-primary">
              Email me
            </a>
            <a href="#classic-projects" className="classic-button">
              View work
            </a>
            <button type="button" onClick={onOpenTerminal} className="classic-button">
              Open terminal <span aria-hidden>↗</span>
            </button>
          </div>
        </header>

        <Section id="classic-about" eyebrow="01 — About" title="A little context">
          <div className="grid gap-8 sm:grid-cols-[1.6fr_1fr]">
            <p className="max-w-2xl text-base leading-relaxed text-fg-muted">{profile.bio}</p>
            <dl className="space-y-4 font-mono text-xs text-fg-muted">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em]">Based in</dt>
                <dd className="mt-1 text-sm text-fg">{profile.location}</dd>
              </div>
              {current ? (
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.2em]">Currently</dt>
                  <dd className="mt-1 text-sm text-fg">
                    {current.role} · {current.company}
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </Section>

        <Section id="classic-skills" eyebrow="02 — Skills" title="What I work with">
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {SKILL_GROUPS.map((group) => {
              const items = skills.filter((skill) => skill.category === group.category);
              if (items.length === 0) return null;

              return (
                <div key={group.category}>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
                    {group.label}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {items.map((skill) => (
                      <li key={skill.name} className="flex items-center justify-between gap-4">
                        <span className="text-base text-fg">{skill.name}</span>
                        <span className="flex items-center gap-3">
                          <span aria-hidden className="flex gap-1">
                            {Array.from({ length: 5 }, (_, index) => (
                              <span
                                key={index}
                                className={
                                  index < skill.level
                                    ? "h-1.5 w-3 rounded-full bg-accent"
                                    : "h-1.5 w-3 rounded-full bg-border"
                                }
                              />
                            ))}
                          </span>
                          <span className="sr-only">
                            {skill.level} out of 5 — {group.label}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Section>

        <Section id="classic-projects" eyebrow="03 — Projects" title="Selected work">
          <ul className="grid gap-5 sm:grid-cols-2">
            {projects.map((project) => (
              <li key={project.slug} className="classic-card flex flex-col">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl tracking-tight text-fg">{project.title}</h3>
                  <span className="font-mono text-[11px] text-fg-muted">{project.year}</span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <li
                      key={item}
                      className="rounded border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {project.liveUrl || project.repoUrl ? (
                  <ul className="mt-5 flex flex-wrap gap-4 text-sm">
                    {project.liveUrl ? (
                      <li>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent underline-offset-4 hover:underline"
                        >
                          Live site <span aria-hidden>↗</span>
                        </a>
                      </li>
                    ) : null}
                    {project.repoUrl ? (
                      <li>
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent underline-offset-4 hover:underline"
                        >
                          Source <span aria-hidden>↗</span>
                        </a>
                      </li>
                    ) : null}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="classic-experience" eyebrow="04 — Experience" title="Where I have worked">
          <ol className="space-y-8">
            {experience.map((role) => (
              <li key={`${role.company}-${role.start}`} className="border-l border-border pl-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
                  {formatPeriod(role.start, role.end)}
                </p>
                <h3 className="mt-1 text-lg text-fg">
                  {role.role} <span className="text-fg-muted">· {role.company}</span>
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">
                  {role.description}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="classic-contact" eyebrow="05 — Contact" title="Let’s talk">
          <div className="max-w-2xl">
            <p className="text-base leading-relaxed text-fg-muted">
              The fastest way to reach me is email. I read everything and reply within two working
              days.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-6 inline-block font-display text-2xl tracking-tight text-accent underline-offset-4 hover:underline sm:text-3xl"
            >
              {profile.email}
            </a>
            <ul className="mt-8 flex flex-wrap gap-3">
              {profile.socials
                .filter((social) => social.icon !== "email")
                .map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="classic-button"
                    >
                      {social.label} <span aria-hidden>↗</span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </Section>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-8 font-mono text-[11px] text-fg-muted">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
          <button type="button" onClick={onOpenTerminal} className="text-accent hover:underline">
            ← back to terminal
          </button>
        </footer>
      </div>
    </div>
  );
}
