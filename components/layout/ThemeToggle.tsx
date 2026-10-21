"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { springSoft } from "@/lib/motion";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={cn(
        "relative inline-flex h-9 w-[68px] items-center rounded-full border border-border bg-surface/70 p-0.5",
        className
      )}
    >
      {mounted && (
        <motion.span
          aria-hidden="true"
          className="absolute left-0.5 top-0.5 h-8 w-8 rounded-full border border-border/70 bg-background shadow-sm"
          animate={{ x: isDark ? 32 : 0 }}
          transition={springSoft}
        />
      )}

      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Use light theme"
        aria-pressed={mounted ? !isDark : undefined}
        title="Light theme"
        className={cn(
          "relative z-10 grid h-8 w-8 place-items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          mounted && !isDark
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Sun className="h-[15px] w-[15px]" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Use dark theme"
        aria-pressed={mounted ? isDark : undefined}
        title="Dark theme"
        className={cn(
          "relative z-10 grid h-8 w-8 place-items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isDark
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Moon className="h-[15px] w-[15px]" aria-hidden="true" />
      </button>
    </div>
  );
}
