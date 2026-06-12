import React from "react";
import { cn } from "@/lib/utils";

interface ThreadDividerProps {
  className?: string;
  color?: string;
}

export function ThreadDivider({ className, color }: ThreadDividerProps) {
  return (
    <div className={cn("flex items-center justify-center my-8", className)}>
      <svg
        viewBox="0 0 240 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-60 h-6 opacity-60"
      >
        <path
          d="M0 12 Q20 4 40 12 Q60 20 80 12 Q100 4 120 12 Q140 20 160 12 Q180 4 200 12 Q220 20 240 12"
          stroke={color ?? "currentColor"}
          strokeWidth="2"
          strokeLinecap="round"
          className="text-clay dark:text-saffron"
        />
        <circle cx="120" cy="12" r="3" fill={color ?? "currentColor"} className="text-clay dark:text-saffron" />
        <circle cx="0" cy="12" r="2" fill={color ?? "currentColor"} opacity="0.5" className="text-clay dark:text-saffron" />
        <circle cx="240" cy="12" r="2" fill={color ?? "currentColor"} opacity="0.5" className="text-clay dark:text-saffron" />
      </svg>
    </div>
  );
}

export function ThreadUnderline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-2", className)}
      preserveAspectRatio="none"
    >
      <path
        d="M0 4 Q12.5 1 25 4 Q37.5 7 50 4 Q62.5 1 75 4 Q87.5 7 100 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
