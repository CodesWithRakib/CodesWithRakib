import * as React from "react";
import { cn } from "@/lib/utils";

const plates = [
  { width: 66, offsetX: -10, rotate: -7, tone: "var(--stack-3)" },
  { width: 72, offsetX: -4, rotate: -7, tone: "var(--stack-2)" },
  { width: 69, offsetX: 2, rotate: -7, tone: "var(--stack-1)" },
  { width: 75, offsetX: -7, rotate: -7, tone: "var(--stack-2)" },
  { width: 80, offsetX: 3, rotate: -7, tone: "var(--stack-accent)" },
  { width: 73, offsetX: -3, rotate: -7, tone: "var(--stack-1)" },
  { width: 68, offsetX: 5, rotate: -7, tone: "var(--stack-3)" },
  { width: 63, offsetX: -2, rotate: -7, tone: "var(--stack-2)" },
  { width: 58, offsetX: 4, rotate: -7, tone: "var(--stack-1)" },
];

/**
 * Static composition shown before the WebGL chunk is ready (and whenever WebGL
 * is missing or motion is reduced). Same silhouette as the real sculpture, so
 * swapping in the canvas causes no layout shift.
 */
export function StaticStack({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden",
        className
      )}
    >
      <div className="absolute h-[72%] w-[72%] rounded-full border border-border/70" />
      <div className="absolute h-[46%] w-[46%] rounded-full border border-border/50" />

      <div className="relative h-[70%] w-[82%]">
        {plates.map((plate, index) => (
          <div
            key={index}
            className="absolute left-1/2 rounded-[3px] border"
            style={{
              width: `${plate.width}%`,
              height: "11%",
              top: `${12 + index * 8.4}%`,
              background: plate.tone,
              borderColor: "var(--stack-line)",
              boxShadow: "0 18px 30px -24px rgba(0,0,0,0.65)",
              transform: `translateX(calc(-50% + ${plate.offsetX}px)) rotate(${plate.rotate}deg)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
