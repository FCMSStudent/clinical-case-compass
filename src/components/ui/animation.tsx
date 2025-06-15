
import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// ────────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ────────────────────────────────────────────────────────────────────────────────

const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: 0.4, 
        ease: [0.23, 1, 0.32, 1] 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95, 
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      } 
    },
  } as Variants,
  
  glassmorphicEntrance: {
    hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: "blur(0px)", 
      transition: { 
        duration: 0.6, 
        ease: [0.23, 1, 0.32, 1] 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -30, 
      scale: 0.95, 
      filter: "blur(10px)", 
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      } 
    },
  } as Variants,
};

// ────────────────────────────────────────────────────────────────────────────────
// ANIMATION WRAPPER COMPONENTS
// ────────────────────────────────────────────────────────────────────────────────

interface AnimatedDivProps {
  className?: string;
  variant?: keyof typeof animationVariants;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

const AnimatedDiv = React.forwardRef<HTMLDivElement, AnimatedDivProps>(
  ({ className, variant = "fadeIn", children, delay = 0, duration }, ref) => {
    const variants = animationVariants[variant];
    
    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
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

interface StaggeredContainerProps {
  className?: string;
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
}

const StaggeredContainer = React.forwardRef<HTMLDivElement, StaggeredContainerProps>(
  ({ className, children, staggerDelay = 0.1, delayChildren = 0.2 }, ref) => {
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

interface StaggeredItemProps {
  className?: string;
  children: React.ReactNode;
  duration?: number;
}

const StaggeredItem = React.forwardRef<HTMLDivElement, StaggeredItemProps>(
  ({ className, children, duration = 0.5 }, ref) => {
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

interface GlassyHoverProps {
  className?: string;
  children: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

const GlassyHover = React.forwardRef<HTMLDivElement, GlassyHoverProps>(
  ({ className, children, intensity = "medium" }, ref) => {
    const hoverAnimation = {
      scale: intensity === "subtle" ? 1.01 : intensity === "strong" ? 1.03 : 1.02,
      filter: intensity === "subtle" ? "brightness(1.05)" : intensity === "strong" ? "brightness(1.15)" : "brightness(1.1)",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        whileHover={hoverAnimation}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
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

interface FloatingProps {
  className?: string;
  children: React.ReactNode;
  duration?: number;
  amplitude?: number;
}

const Floating = React.forwardRef<HTMLDivElement, FloatingProps>(
  ({ className, children, duration = 4, amplitude = 5 }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        animate={{
          y: [-amplitude, amplitude, -amplitude],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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

interface PulseGlowProps {
  className?: string;
  children: React.ReactNode;
  color?: string;
  duration?: number;
}

const PulseGlow = React.forwardRef<HTMLDivElement, PulseGlowProps>(
  ({ className, children, color = "rgba(255, 255, 255, 0.1)", duration = 2 }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        animate={{
          boxShadow: [
            `0 0 0 0 ${color}`,
            `0 0 0 10px ${color.replace('0.1', '0.05')}`,
            `0 0 0 0 ${color}`,
          ],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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

interface MedicalPulseProps {
  className?: string;
  children: React.ReactNode;
  duration?: number;
}

const MedicalPulse = React.forwardRef<HTMLDivElement, MedicalPulseProps>(
  ({ className, children, duration = 2 }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(className)}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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
