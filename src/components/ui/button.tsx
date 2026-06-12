import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-clay text-[#FFF8F0] hover:bg-rust shadow-warm hover:-translate-y-0.5",
        secondary: "bg-saffron/20 text-clay border border-saffron/30 hover:bg-saffron/30",
        outline: "border border-clay/50 text-clay hover:bg-clay hover:text-[#FFF8F0] dark:border-saffron/50 dark:text-saffron dark:hover:bg-saffron dark:hover:text-ink",
        ghost: "text-foreground hover:bg-parchment dark:hover:bg-white/10",
        link: "text-clay underline-offset-4 hover:underline p-0 h-auto font-medium",
        destructive: "bg-destructive text-[#FFF8F0] hover:bg-destructive/90",
        glass: "glass text-foreground hover:bg-white/20 dark:hover:bg-white/10",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

import React from "react";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
