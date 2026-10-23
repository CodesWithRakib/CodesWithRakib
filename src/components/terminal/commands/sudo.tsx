import { profile } from "@/content/profile";
import type { Command } from "@/types/terminal";
import { type CSSProperties } from "react";

const CONFETTI = Array.from({ length: 18 }, (_, index) => ({
  x: `${(index * 37) % 100}%`,
  delay: `${(index % 6) * 0.07}s`,
  color: index % 3 === 0 ? "var(--accent)" : index % 3 === 1 ? "var(--accent-2)" : "var(--fg-muted)",
}));

function HireMe({ openClassic }: { openClassic: () => void }) {
  return (
    <div className="term-hire">
      <div aria-hidden className="term-confetti">
        {CONFETTI.map((piece, index) => (
          <span
            key={index}
            className="term-confetti-piece"
            style={
              {
                "--x": piece.x,
                "--delay": piece.delay,
                "--color": piece.color,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <p className="term-text">
        Permission granted. I’m Rakib — open to frontend and full-stack roles, and I ship.
      </p>
      <p className="term-text term-muted">
        The contract is a conversation. Email is the fastest way to start it.
      </p>
      <p className="term-text">
        <a
          className="term-link"
          href={`mailto:${profile.email}?subject=${encodeURIComponent("Let's talk")}`}
        >
          {profile.email}
        </a>
      </p>
      <button type="button" onClick={openClassic} className="term-chip term-hire-button">
        open classic view
      </button>
    </div>
  );
}

export const sudo = {
  name: "sudo",
  description: "Elevated privileges. Try `sudo hire-me`.",
  usage: "sudo hire-me",
  hidden: true,
  run: (args, context) => {
    if (args.join(" ") !== "hire-me") {
      return {
        type: "error",
        message: "sudo: permission denied. Try `sudo hire-me`.",
      };
    }

    return {
      type: "element",
      component: <HireMe openClassic={context.openClassic} />,
    };
  },
} satisfies Command;
