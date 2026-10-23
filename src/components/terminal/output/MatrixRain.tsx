"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

const GLYPHS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ";
const COLUMNS = 16;
const ROWS = 9;

function glyphFor(column: number, row: number, tick: number): string {
  const index = (column * 7 + row * 13 + tick * 5) % GLYPHS.length;
  return GLYPHS[index] ?? "0";
}

export function MatrixRain() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (reducedMotion) return;

    const interval = window.setInterval(() => {
      setTick((value) => value + 1);
    }, 90);
    const timeout = window.setTimeout(() => {
      setRunning(false);
      window.clearInterval(interval);
    }, 3000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [reducedMotion]);

  return (
    <div className="term-block">
      <div aria-hidden className="term-matrix">
        {Array.from({ length: COLUMNS }, (_, column) => (
          <div
            key={column}
            className="term-matrix-column"
            style={{ "--fade": 0.25 + ((column * 7) % 6) / 10 } as CSSProperties}
          >
            {Array.from({ length: ROWS }, (_, row) => (
              <span
                key={row}
                style={{ "--fade": 0.2 + ((column + row) % 7) / 9 } as CSSProperties}
              >
                {glyphFor(column, row, tick)}
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="term-muted">
        {reducedMotion
          ? "matrix paused — reduced motion is enabled."
          : running
            ? "streaming…"
            : "connection closed after 3.0s."}
      </p>
    </div>
  );
}
