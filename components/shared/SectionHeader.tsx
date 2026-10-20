import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col space-y-2 mb-8 md:mb-12",
        isCenter && "items-center text-center",
        className
      )}
      {...props}
    >
      {badge && (
        <span className="inline-block text-xs font-mono font-medium tracking-wider uppercase text-primary mb-1">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl",
            isCenter && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
