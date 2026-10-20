import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-medium rounded-md transition-colors border",
  {
    variants: {
      variant: {
        default:
          "bg-muted text-foreground border-border",
        primary:
          "bg-primary-subtle text-primary-subtle-foreground border-primary/25",
        accent:
          "bg-accent-subtle text-accent-subtle-foreground border-accent/25",
        warning:
          "bg-warning-subtle text-warning border-warning/30",
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
