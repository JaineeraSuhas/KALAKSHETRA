import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-clay/15 text-clay dark:bg-clay/25 dark:text-saffron",
        secondary: "bg-saffron/20 text-ink dark:bg-saffron/30 dark:text-saffron",
        outline: "border border-clay/40 text-clay",
        sage: "bg-sage/15 text-sage",
        destructive: "bg-destructive/15 text-destructive",
        trending: "bg-gradient-to-r from-clay to-rust text-white",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
