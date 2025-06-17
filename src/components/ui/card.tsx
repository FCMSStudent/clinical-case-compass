// -----------------------------------------------------------------------------
// Card – Liquid Glass Edition
// -----------------------------------------------------------------------------
// 1. New `glass-*` variants tap into Tailwind utilities created in the updated
//    config (glass-subtle | glass | glass-elevated).
// 2. Framer Motion provides a gentle lift / shadow shift on hover + focus that
//    respects user reduced-motion preferences.
// 3. All legacy theme variants (primary, secondary, etc.) remain available via
//    `unifiedCardVariants` so migrations are painless.
// -----------------------------------------------------------------------------

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  cardVariants as legacyCardVariants,
  componentSizes,
} from "@/lib/component-system";
import {
  getMotionVariants,
  subtleCardInteraction,
  reducedMotionCardInteraction,
} from "@/lib/motion";

// ─── Tailwind CVA --------------------------------------------------------------
const cardVariants = cva("rounded-xl w-full bg-transparent", {
  variants: {
    variant: {
      ...legacyCardVariants,
      // Glass presets ------------------------------------------------------
      "glass-subtle": cn("glass-subtle"),
      glass: cn("glass"),
      "glass-elevated": cn("glass-elevated"),
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// ─── Card Component -----------------------------------------------------------
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  // Consumers may inject their own Framer Motion props (whileHover, etc.)
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => {
    const animationVariants = getMotionVariants(
      subtleCardInteraction,
      reducedMotionCardInteraction,
    );

    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        variants={animationVariants as any}
        initial="initial"
        whileHover="hover"
        whileFocus="focus"
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

// ─── Sub-components -----------------------------------------------------------
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", componentSizes.card.md, className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold text-white", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-white/70", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("pt-0", componentSizes.card.md, className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-0", componentSizes.card.md, className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { cardVariants };
