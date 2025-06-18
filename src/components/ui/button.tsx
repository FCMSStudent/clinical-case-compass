// -----------------------------------------------------------------------------
// Button – Liquid Glass Edition
// -----------------------------------------------------------------------------
// 1. Tailwind class names now leverage `glass-{level}` utilities for frosted
//    backgrounds that adapt to both light & dark modes.
// 2. Supports `variant="glass" | "glass-subtle" | "glass-elevated"` out-of-the-box.
// 3. Ensures motion-respectful animations via `getMotionVariants()` helper.
// -----------------------------------------------------------------------------

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { buttonVariants as legacyVariants } from "@/lib/design-system";
import { typography } from "@/lib/typography";
import {
  getMotionVariants,
  subtleButtonHoverTap,
  subtleReducedMotionButton,
} from "@/lib/motion";

// ─── Tailwind-powered variant factory ─────────────────────────────────────────
const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50",
    typography.button
  ),
  {
    variants: {
      variant: {
        // ------------------------------------------------------------------
        // Brand / Status (inherit from legacy design-system for compatibility)
        // ------------------------------------------------------------------
        primary: legacyVariants.primary,
        secondary: legacyVariants.secondary,
        outline: legacyVariants.outline,
        ghost: legacyVariants.ghost,
        success: legacyVariants.success,
        warning: legacyVariants.warning,
        error: legacyVariants.error,
        info: legacyVariants.info,
        medical: legacyVariants.medical,
        critical: legacyVariants.critical,

        // ------------------------------------------------------------------
        // Glassmorphism presets (use new Tailwind utilities)
        // ------------------------------------------------------------------
        "glass-subtle": cn("glass-subtle text-white/80"),
        glass: cn("glass text-white"),
        "glass-elevated": cn("glass-elevated text-white"),

        // Legacy aliases ----------------------------------------------------
        default: legacyVariants.primary,
        destructive: legacyVariants.error,
        link: cn(typography.link, "text-white underline-offset-4 hover:underline"),
      },
      size: {
        xs: "h-6 px-2 text-xs",
        sm: "h-8 px-3 text-sm",
        default: "h-10 px-4 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// ─── Component Props ──────────────────────────────────────────────────────────
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

// ─── Component ----------------------------------------------------------------
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...rest
    },
    ref,
  ) => {
    // Respect user reduced-motion preference.
    const animationVariants = getMotionVariants(
      subtleButtonHoverTap,
      subtleReducedMotionButton,
    );

    if (asChild) {
      // Slot does not support motion props or the 'disabled' prop
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as any}
          {...rest}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {children}
        </Slot>
      );
    }

    // Use motion.button for animation
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        variants={animationVariants as any}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        whileFocus="focus"
        {...rest}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
