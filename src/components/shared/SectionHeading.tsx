import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeading({ tag, title, subtitle, center = false, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("mb-10", center && "text-center", className)}
    >
      {tag && (
        <p className="text-xs font-semibold tracking-widest uppercase text-clay dark:text-saffron mb-2">
          {tag}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground max-w-2xl text-balance leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
