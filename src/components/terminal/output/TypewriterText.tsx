"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

interface TypewriterTextProps {
  text: string;
  /** Milliseconds per character. */
  speed?: number;
  /** Skip the animation entirely (used by the boot skip control). */
  instant?: boolean;
  onDone?: () => void;
  className?: string;
}

export function TypewriterText({
  text,
  speed = 12,
  instant = false,
  onDone,
  className,
}: TypewriterTextProps) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [count, setCount] = useState(0);
  const onDoneRef = useRef(onDone);
  const skip = instant || reducedMotion;
  const visible = skip ? text : text.slice(0, count);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (skip) {
      onDoneRef.current?.();
      return;
    }
    if (!text) return;

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setCount(index);
      if (index >= text.length) {
        window.clearInterval(timer);
        onDoneRef.current?.();
      }
    }, speed);

    return () => window.clearInterval(timer);
  }, [text, speed, skip]);

  return (
    <pre aria-hidden className={className ? `term-text ${className}` : "term-text"}>
      {visible}
    </pre>
  );
}
