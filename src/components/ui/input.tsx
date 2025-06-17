// -----------------------------------------------------------------------------
// Input – Liquid Glass Edition
// -----------------------------------------------------------------------------
// 1. Adds `glass` variants (`glass-subtle`, `glass`, `glass-elevated`) that
//    automatically adopt design-system blur, border & shadow tokens.
// 2. Uses Framer Motion for a smooth focus ring scale/opacity transition that
//    respects reduced-motion preferences.
// -----------------------------------------------------------------------------

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  inputVariants as legacyInputVariants,
  componentSizes,
} from "@/lib/component-system";
import {
  getMotionVariants,
  subtleInputInteraction,
  reducedMotionInputInteraction,
} from "@/lib/motion";

// ─── Tailwind variant generator ──────────────────────────────────────────────
const inputVariants = cva("rounded-lg flex w-full bg-transparent", {
  variants: {
    variant: {
      // Brand / status (legacy)
      ...legacyInputVariants,

      // Glass presets
      "glass-subtle": cn("glass-subtle text-white/90 placeholder:text-white/50"),
      glass: cn("glass text-white placeholder:text-white/70"),
      "glass-elevated": cn("glass-elevated text-white placeholder:text-white/80"),
    },
    size: {
      xs: componentSizes.input.xs,
      sm: componentSizes.input.sm,
      md: componentSizes.input.md,
      lg: componentSizes.input.lg,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

// ─── Props --------------------------------------------------------------------
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

// ─── Component ----------------------------------------------------------------
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type = "text", ...props }, ref) => {
    const animationVariants = getMotionVariants(
      subtleInputInteraction,
      reducedMotionInputInteraction,
    );

    return (
      <motion.input
        ref={ref}
        type={type}
        className={cn(inputVariants({ variant, size, className }))}
        variants={animationVariants as any}
        initial="initial"
        whileFocus="focus"
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { inputVariants };
