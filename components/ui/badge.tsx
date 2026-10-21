import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase leading-none tracking-[0.14em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-border bg-transparent text-muted-foreground",
        primary:
          "border-primary/25 bg-primary-subtle text-primary-subtle-foreground",
        accent:
          "border-accent/25 bg-accent-subtle text-accent-subtle-foreground",
        warning:
          "border-warning/30 bg-warning-subtle text-warning",
        outline:
          "border-border text-muted-foreground bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
