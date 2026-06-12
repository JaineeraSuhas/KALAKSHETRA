import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export function RatingStars({ rating, max = 5, size = "sm", showValue = false, className }: RatingStarsProps) {
  const sizeMap = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };
  const stars = Array.from({ length: max }, (_, i) => {
    const filled = i + 1 <= rating;
    const partial = !filled && i < rating;
    return { filled, partial };
  });

  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      {stars.map((s, i) => (
        <Star
          key={i}
          className={cn(
            sizeMap[size],
            s.filled ? "fill-saffron text-saffron" : "fill-transparent text-saffron/30",
            s.partial && "fill-saffron/50 text-saffron/50"
          )}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-xs font-mono font-semibold text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  );
}
