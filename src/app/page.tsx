"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ClassicView } from "@/components/terminal/ClassicView";
import { TerminalShell } from "@/components/terminal/TerminalShell";
import { ViewToggle } from "@/components/terminal/ViewToggle";
import { profile } from "@/content/profile";
import { useViewMode } from "@/hooks/useViewMode";

export default function HomePage() {
  const { view, setView } = useViewMode();
  const reducedMotion = useReducedMotion();
  const fade = reducedMotion ? 0 : 0.22;

  return (
    <>
      <ViewToggle view={view} onChange={setView} />

      <noscript>
        <div className="term-noscript">
          <h1 className="font-display text-4xl tracking-tight">{profile.name}</h1>
          <p className="mt-2 text-lg text-fg-muted">{profile.role}</p>
          <p className="mt-5 text-base leading-relaxed text-fg-muted">{profile.tagline}</p>
          <p className="mt-5 text-base leading-relaxed text-fg-muted">{profile.bio}</p>
          <p className="mt-5">
            <a href={`mailto:${profile.email}`} className="text-accent underline">
              {profile.email}
            </a>
          </p>
          <ul className="mt-3 flex flex-wrap gap-4 text-sm">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a href={social.url} className="text-accent underline">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-fg-muted">
            This site uses JavaScript for its terminal interface. Everything above works without
            it.
          </p>
        </div>
      </noscript>

      <AnimatePresence mode="wait" initial={false}>
        {view === "terminal" ? (
          <motion.div
            key="terminal"
            className="terminal-page terminal-live"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fade, ease: [0.16, 1, 0.3, 1] }}
          >
            <TerminalShell onOpenClassic={() => setView("classic")} />
          </motion.div>
        ) : (
          <motion.div
            key="classic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fade, ease: [0.16, 1, 0.3, 1] }}
          >
            <ClassicView onOpenTerminal={() => setView("terminal")} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
