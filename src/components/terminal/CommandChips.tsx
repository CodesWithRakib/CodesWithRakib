"use client";

import { AnimatePresence, motion } from "framer-motion";

const CHIPS = ["help", "about", "skills", "projects", "experience", "contact"];

interface CommandChipsProps {
  runCount: number;
  disabled?: boolean;
  onRun: (command: string) => void;
}

export function CommandChips({ runCount, disabled = false, onRun }: CommandChipsProps) {
  const visible = runCount < 2 ? CHIPS : ["help"];

  return (
    <div className="term-chips" aria-label="Suggested commands">
      <AnimatePresence initial={false}>
        {visible.map((command) => (
          <motion.button
            key={command}
            type="button"
            layout
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="term-chip"
            disabled={disabled}
            onClick={() => onRun(command)}
          >
            {command}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
