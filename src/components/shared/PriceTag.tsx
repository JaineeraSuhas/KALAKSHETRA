import { formatINR } from "@/lib/utils";
import { cn } from "@/lib/utils";
import React from "react";

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function PriceTag({ price, originalPrice, size = "md", className }: PriceTagProps) {
  const sizeMap = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-3xl",
  };
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className={cn("flex items-baseline gap-2 flex-wrap", className)}>
      <span className={cn("font-mono font-bold text-clay dark:text-saffron", sizeMap[size])}>
        {formatINR(price)}
      </span>
      {originalPrice && (
        <>
          <span className="font-mono text-sm text-muted-foreground line-through">
            {formatINR(originalPrice)}
          </span>
          <span className="text-xs font-semibold text-sage bg-sage/10 px-1.5 py-0.5 rounded-md">
            -{discount}%
          </span>
        </>
      )}
    </div>
  );
}
