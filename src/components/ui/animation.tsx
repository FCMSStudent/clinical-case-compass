import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { animationVariants } from "@/lib/component-system";

// ────────────────────────────────────────────────────────────────────────────────
// ANIMATION WRAPPER COMPONENTS
// ────────────────────────────────────────────────────────────────────────────────

interface AnimatedDivProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof animationVariants;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

const AnimatedDiv = React.forwardRef<HTMLDivElement, AnimatedDivProps>(
  ({ className, variant = "fadeIn", children, delay = 0, duration, ...props }, ref) => {
    const variants = animationVariants[variant];
    
    // Override duration if provided
    const customVariants = duration ? {
      ...variants,
      visible: {
        ...variants.visible,
        transition: {
          ...variants.visible?.transition,
          duration,
          delay,
        },
      },
    } : {
      ...variants,
      visible: {
        ...variants.visible,
        transition: {
          ...variants.visible?.transition,
          delay,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={customVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
AnimatedDiv.displayName = "AnimatedDiv";

// ────────────────────────────────────────────────────────────────────────────────
// STAGGERED CONTAINER COMPONENT
// ────────────────────────────────────────────────────────────────────────────────

interface StaggeredContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
}

const StaggeredContainer = React.forwardRef<HTMLDivElement, StaggeredContainerProps>(
  ({ className, children, staggerDelay = 0.1, delayChildren = 0.2, ...props }, ref) => {
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
      >
        {children}
      </motion.div>
    );
  }
);
StaggeredContainer.displayName = "StaggeredContainer";

// ────────────────────────────────────────────────────────────────────────────────
// STAGGERED ITEM COMPONENT
// ────────────────────────────────────────────────────────────────────────────────

interface StaggeredItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  duration?: number;
}

const StaggeredItem = React.forwardRef<HTMLDivElement, StaggeredItemProps>(
  ({ className, children, duration = 0.5, ...props }, ref) => {
    const variants: Variants = {
      hidden: { opacity: 0, y: 20, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration,
          ease: [0.23, 1, 0.32, 1],
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={variants}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
StaggeredItem.displayName = "StaggeredItem";

// ────────────────────────────────────────────────────────────────────────────────
// GLASSY HOVER COMPONENT
// ────────────────────────────────────────────────────────────────────────────────

interface GlassyHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

const GlassyHover = React.forwardRef<HTMLDivElement, GlassyHoverProps>(
  ({ className, children, intensity = "medium", ...props }, ref) => {
    const variants: Variants = {
      initial: { scale: 1, rotateX: 0, rotateY: 0, filter: "brightness(1)" },
      hover: {
        scale: intensity === "subtle" ? 1.01 : intensity === "strong" ? 1.03 : 1.02,
        rotateX: intensity === "subtle" ? 1 : intensity === "strong" ? 3 : 2,
        rotateY: intensity === "subtle" ? 1 : intensity === "strong" ? 3 : 2,
        filter: intensity === "subtle" ? "brightness(1.05)" : intensity === "strong" ? "brightness(1.15)" : "brightness(1.1)",
        transition: { duration: 0.3, ease: "easeOut" },
      },
      tap: {
        scale: 0.98,
        transition: { duration: 0.1 },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={variants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
GlassyHover.displayName = "GlassyHover";

// ────────────────────────────────────────────────────────────────────────────────
// FLOATING COMPONENT
// ────────────────────────────────────────────────────────────────────────────────

interface FloatingProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  duration?: number;
  amplitude?: number;
}

const Floating = React.forwardRef<HTMLDivElement, FloatingProps>(
  ({ className, children, duration = 4, amplitude = 5, ...props }, ref) => {
    const variants: Variants = {
      initial: { y: 0 },
      animate: {
        y: [-amplitude, amplitude, -amplitude],
        transition: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={variants}
        initial="initial"
        animate="animate"
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Floating.displayName = "Floating";

// ────────────────────────────────────────────────────────────────────────────────
// PULSE GLOW COMPONENT
// ────────────────────────────────────────────────────────────────────────────────

interface PulseGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  color?: string;
  duration?: number;
}

const PulseGlow = React.forwardRef<HTMLDivElement, PulseGlowProps>(
  ({ className, children, color = "rgba(255, 255, 255, 0.1)", duration = 2, ...props }, ref) => {
    const variants: Variants = {
      initial: { boxShadow: `0 0 0 0 ${color}` },
      animate: {
        boxShadow: [
          `0 0 0 0 ${color}`,
          `0 0 0 10px ${color.replace('0.1', '0.05')}`,
          `0 0 0 0 ${color}`,
        ],
        transition: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={variants}
        initial="initial"
        animate="animate"
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
PulseGlow.displayName = "PulseGlow";

// ────────────────────────────────────────────────────────────────────────────────
// MEDICAL PULSE COMPONENT
// ────────────────────────────────────────────────────────────────────────────────

interface MedicalPulseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  duration?: number;
}

const MedicalPulse = React.forwardRef<HTMLDivElement, MedicalPulseProps>(
  ({ className, children, duration = 2, ...props }, ref) => {
    const variants: Variants = {
      initial: { scale: 1, opacity: 0.8 },
      animate: {
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
        transition: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={variants}
        initial="initial"
        animate="animate"
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
MedicalPulse.displayName = "MedicalPulse";

// ────────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ────────────────────────────────────────────────────────────────────────────────

export {
  AnimatedDiv,
  StaggeredContainer,
  StaggeredItem,
  GlassyHover,
  Floating,
  PulseGlow,
  MedicalPulse,
};

export type {
  AnimatedDivProps,
  StaggeredContainerProps,
  StaggeredItemProps,
  GlassyHoverProps,
  FloatingProps,
  PulseGlowProps,
  MedicalPulseProps,
}; 