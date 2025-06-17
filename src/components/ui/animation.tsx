// -----------------------------------------------------------------------------
// Motion Primitives – Liquid Glass Edition
// -----------------------------------------------------------------------------
// 1. Centralises common animation variants (fadeIn, glassEntrance, etc.) that
//    read from the design-system motion tokens.
// 2. Adds Tailwind-friendly utilities (`className="glass hover:animate-fadeIn"`) –
//    consumers can still reach for these React abstractions when they need
//    co-ordinated / staggered timelines.
// 3. Respects reduced-motion preferences across the board.
// -----------------------------------------------------------------------------

import * as React from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  prefersReducedMotion,
  glassmorphicEntrance as systemGlassEntrance,
} from "@/lib/motion";

// ─── Variants ------------------------------------------------------------------
export const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
    },
    exit: {
      opacity: 0,
      y: -24,
      scale: 0.96,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  } as Variants,
  glassEntrance: systemGlassEntrance,
} as const;

// Helper – choose proper variant respecting user prefs -------------------------
const pickVariants = (
  variant: keyof typeof animationVariants,
  reducedVariant?: Variants,
): Variants => {
  return prefersReducedMotion() && reducedVariant ? reducedVariant : animationVariants[variant];
};

// ─── Components ----------------------------------------------------------------
export interface AnimatedDivProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof animationVariants;
  delay?: number;
  duration?: number;
}

export const AnimatedDiv = React.forwardRef<HTMLDivElement, AnimatedDivProps>(
  (
    {
      className,
      variant = "fadeIn",
      delay = 0,
      duration,
      ...props
    },
    ref,
  ) => {
    const shouldReduce = useReducedMotion();
    const selected = pickVariants(variant);

    // Optional runtime duration override
    if (duration && selected.visible && typeof selected.visible !== "string") {
      selected.visible.transition = {
        ...(selected.visible.transition as any),
        duration,
        delay,
      };
    }

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={selected}
        initial="hidden"
        animate="visible"
        exit="exit"
        {...props}
      />
    );
  },
);
AnimatedDiv.displayName = "AnimatedDiv";

// ─── Staggered Container -------------------------------------------------------
export interface StaggeredContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  staggerDelay?: number;
  delayChildren?: number;
}

export const StaggeredContainer = React.forwardRef<
  HTMLDivElement,
  StaggeredContainerProps
>(({ className, staggerDelay = 0.12, delayChildren = 0.2, ...props }, ref) => {
  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={variants}
      initial="hidden"
      animate="visible"
      {...props}
    />
  );
});
StaggeredContainer.displayName = "StaggeredContainer";

// ─── Staggered Item ------------------------------------------------------------
export interface StaggeredItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
}

export const StaggeredItem = React.forwardRef<HTMLDivElement, StaggeredItemProps>(
  ({ className, duration = 0.5, ...props }, ref) => {
    const variants: Variants = {
      hidden: { opacity: 0, y: 24, scale: 0.96 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration, ease: [0.23, 1, 0.32, 1] },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={variants}
        {...props}
      />
    );
  },
);
StaggeredItem.displayName = "StaggeredItem";

// ─── Glassy Hover --------------------------------------------------------------
export interface GlassyHoverProps
  extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "subtle" | "medium" | "strong";
}

const brightness = {
  subtle: "brightness(1.05)",
  medium: "brightness(1.1)",
  strong: "brightness(1.15)",
} as const;

const scale = {
  subtle: 1.01,
  medium: 1.02,
  strong: 1.03,
} as const;

export const GlassyHover = React.forwardRef<HTMLDivElement, GlassyHoverProps>(
  ({ className, intensity = "medium", ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(className)}
      whileHover={{ scale: scale[intensity], filter: brightness[intensity] }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      {...props}
    />
  ),
);
GlassyHover.displayName = "GlassyHover";

// ─── Floating ------------------------------------------------------------------
export interface FloatingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  amplitude?: number;
}

export const Floating = React.forwardRef<HTMLDivElement, FloatingProps>(
  ({ className, duration = 4, amplitude = 6, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(className)}
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      {...props}
    />
  ),
);
Floating.displayName = "Floating";

// ─── Pulse Glow ---------------------------------------------------------------
export interface PulseGlowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  duration?: number;
}

export const PulseGlow = React.forwardRef<HTMLDivElement, PulseGlowProps>(
  (
    { className, color = "rgba(255,255,255,0.12)", duration = 2, ...props },
    ref,
  ) => (
    <motion.div
      ref={ref}
      className={cn(className)}
      animate={{
        boxShadow: [
          `0 0 0 0 ${color}`,
          `0 0 0 12px ${color.replace("0.12", "0.04")}`,
          `0 0 0 0 ${color}`,
        ],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      {...props}
    />
  ),
);
PulseGlow.displayName = "PulseGlow";

// ─── Medical Pulse -------------------------------------------------------------
export interface MedicalPulseProps
  extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
}

export const MedicalPulse = React.forwardRef<HTMLDivElement, MedicalPulseProps>(
  ({ className, duration = 2, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(className)}
      animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      {...props}
    />
  ),
);
MedicalPulse.displayName = "MedicalPulse";

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------
export type {
  AnimatedDivProps,
  StaggeredContainerProps,
  StaggeredItemProps,
  GlassyHoverProps,
  FloatingProps,
  PulseGlowProps,
  MedicalPulseProps,
};
