"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { skills } from "@/content/skills";

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

interface ConstellationNode {
  x: number;
  y: number;
}

/** Sunflower distribution keeps ten labels apart without hand-tuning coordinates. */
function buildLayout(total: number): ConstellationNode[] {
  return Array.from({ length: total }, (_, index) => {
    const radius = 0.94 * Math.sqrt((index + 0.5) / total);
    const angle = index * GOLDEN_ANGLE - Math.PI / 2;
    return {
      x: 50 + Math.cos(angle) * radius * 44,
      y: 50 + Math.sin(angle) * radius * 36,
    };
  });
}

function buildEdges(nodes: ConstellationNode[]): Array<[number, number]> {
  const seen = new Set<string>();
  const edges: Array<[number, number]> = [];

  nodes.forEach((node, index) => {
    const nearest = nodes
      .map((other, otherIndex) => ({
        otherIndex,
        distance: Math.hypot(node.x - other.x, node.y - other.y),
      }))
      .filter((entry) => entry.otherIndex !== index)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 2);

    nearest.forEach(({ otherIndex }) => {
      const key = index < otherIndex ? `${index}-${otherIndex}` : `${otherIndex}-${index}`;
      if (seen.has(key)) return;
      seen.add(key);
      edges.push([index, otherIndex]);
    });
  });

  return edges;
}

export function SkillConstellation() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const nodes = useMemo(() => buildLayout(skills.length), []);
  const edges = useMemo(() => buildEdges(nodes), [nodes]);

  return (
    <div className="space-constellation">
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      >
        {edges.map(([from, to]) => {
          const isConnected = from === activeIndex || to === activeIndex;
          const opacity = activeIndex === null ? 0.16 : isConnected ? 0.75 : 0.05;

          return (
            <line
              key={`${from}-${to}`}
              x1={nodes[from].x}
              y1={nodes[from].y}
              x2={nodes[to].x}
              y2={nodes[to].y}
              stroke="var(--accent)"
              strokeWidth={1}
              strokeOpacity={opacity}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="transition-[stroke-opacity] duration-300"
            />
          );
        })}
      </svg>

      {skills.map((skill, index) => {
        const style = {
          "--x": `${nodes[index].x}%`,
          "--y": `${nodes[index].y}%`,
        } as CSSProperties;
        const isActive = activeIndex === index;

        return (
          <button
            key={skill.name}
            type="button"
            style={style}
            aria-pressed={isActive}
            onPointerEnter={() => setActiveIndex(index)}
            onPointerLeave={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(null)}
            onClick={() => setActiveIndex((current) => (current === index ? null : index))}
            className={`space-node space-node-chip ${isActive ? "space-node-active" : ""}`}
          >
            {skill.name}
            <span className="sr-only">
              , {skill.category}, level {skill.level} of 5
            </span>
          </button>
        );
      })}
    </div>
  );
}
