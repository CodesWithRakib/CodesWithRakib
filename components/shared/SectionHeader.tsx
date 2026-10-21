import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  index?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "left",
  index,
  className,
  ...props
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        isCenter && "items-center text-center",
        className
      )}
      {...props}
    >
      {(badge || index) && (
        <div
          className={cn(
            "flex items-center gap-3",
            isCenter && "justify-center"
          )}
        >
          {index && (
            <span className="font-mono text-[11px] font-medium text-primary">
              {index}
            </span>
          )}
          <span aria-hidden="true" className="h-px w-8 bg-primary/45" />
          {badge && <span className="eyebrow">{badge}</span>}
        </div>
      )}
      <h2 className="max-w-3xl text-balance font-display text-[clamp(2.15rem,4.4vw,3.65rem)] leading-[0.98] tracking-[-0.02em] text-foreground">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]",
            isCenter && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
