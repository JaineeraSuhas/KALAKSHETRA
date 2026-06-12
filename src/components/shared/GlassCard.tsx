import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ className, hover = false, glow = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/20 dark:border-white/10",
        "bg-white/60 dark:bg-white/5 backdrop-blur-md",
        "shadow-glass",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-warm cursor-pointer",
        glow && "hover:border-saffron/40 dark:hover:border-saffron/30",
        className
      )}
      {...props}
    />
  );
}
