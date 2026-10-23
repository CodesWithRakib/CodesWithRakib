"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { projects } from "@/content/projects";
import type { Project } from "@/types";

const CARD_MOTION = { y: -8, rotateX: 4, rotateY: -5 };
const CARD_TRANSITION = { type: "spring", stiffness: 260, damping: 22 } as const;

export function ProjectOrbit() {
  const [active, setActive] = useState<Project | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!active) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, close]);

  return (
    <div>
      <div className="space-orbit">
        <div aria-hidden className="space-orbit-ring" />

        {projects.map((project, index) => {
          const angle = (index / projects.length) * Math.PI * 2 - Math.PI / 2;
          const style = {
            "--x": `${50 + Math.cos(angle) * 34}%`,
            "--y": `${50 + Math.sin(angle) * 26}%`,
          } as CSSProperties;

          return (
            <div key={project.slug} className="space-orbit-slot" style={style}>
              <motion.button
                type="button"
                aria-haspopup="dialog"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setActive(project);
                }}
                whileHover={CARD_MOTION}
                whileFocus={CARD_MOTION}
                transition={CARD_TRANSITION}
                className="space-card block h-full w-full text-left"
              >
                <span className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">
                  <span>
                    {project.year} · {project.category.replace("-", " ")}
                  </span>
                  <span aria-hidden>↗</span>
                </span>

                <span className="mt-3 block font-display text-2xl tracking-[0.02em] text-fg">
                  {project.title}
                </span>

                <span className="mt-2 line-clamp-3 text-base leading-relaxed text-fg-muted">
                  {project.description}
                </span>

                <span className="mt-4 flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="space-chip">
                      {tech}
                    </span>
                  ))}
                </span>
              </motion.button>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="space-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="space-panel space-modal-panel w-full max-w-xl p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="space-eyebrow">
                    {active.year} · {active.category.replace("-", " ")}
                  </p>
                  <h3
                    id="project-dialog-title"
                    className="mt-2 font-display text-3xl tracking-[0.02em] text-fg"
                  >
                    {active.title}
                  </h3>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close project details"
                  className="rounded-full border border-border p-2 text-fg-muted transition-colors hover:border-accent hover:text-fg"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                  >
                    <path d="m6 6 12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>

              <p className="mt-5 text-base leading-relaxed text-fg-muted">
                {active.longDescription ?? active.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {active.tech.map((tech) => (
                  <li key={tech} className="space-chip">
                    {tech}
                  </li>
                ))}
              </ul>

              {active.liveUrl || active.repoUrl ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  {active.liveUrl ? (
                    <a
                      href={active.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="space-link"
                    >
                      Live site <span aria-hidden>↗</span>
                    </a>
                  ) : null}
                  {active.repoUrl ? (
                    <a
                      href={active.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="space-link"
                    >
                      Repository <span aria-hidden>↗</span>
                    </a>
                  ) : null}
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
