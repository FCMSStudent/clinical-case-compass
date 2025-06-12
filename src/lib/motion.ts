import React from "react";
import { motion, Variants, Transition, useMotionValue, useTransform, useSpring } from "framer-motion";

// ────────────────────────────────────────────────────────────────────────────────
// ENHANCED MOTION UTILITIES FOR GLASSY VISIONOS UI
// ────────────────────────────────────────────────────────────────────────────────

/**
 * Adaptive tinting based on scroll position
 */
export const useAdaptiveTinting = (scrollY: number | undefined) => {
  // Always call hooks in the same order
  const scrollMotionValue = useMotionValue(scrollY ?? 0);
  const tintIntensity = useTransform(scrollMotionValue, [0, 1000], [0, 0.3]);
  const tintHue = useTransform(scrollMotionValue, [0, 1000], [200, 250]);
  const springTintIntensity = useSpring(tintIntensity, { stiffness: 100, damping: 30 });
  const springTintHue = useSpring(tintHue, { stiffness: 50, damping: 20 });

  if (scrollY === undefined) {
    return {
      tintIntensity: { get: () => 0 },
      tintHue: { get: () => 220 }
    };
  }
  
  return {
    tintIntensity: springTintIntensity,
    tintHue: springTintHue
  };
};

/**
 * Motion-responsive hover effects with adaptive scaling
 */
export const useMotionResponsiveHover = () => {
  const scale = useMotionValue(1);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateXValue = (event.clientY - centerY) / 10;
    const rotateYValue = (event.clientX - centerX) / 10;
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };
  
  const handleMouseLeave = () => {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  };
  
  return {
    scale,
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseLeave
  };
};

/**
 * Enhanced glassmorphic entrance animations
 */
export const glassmorphicEntrance: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.95,
    filter: "blur(10px)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

/**
 * Staggered children animation for lists and grids
 */
export const staggeredContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggeredItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

/**
 * Floating animation for glassy elements
 */
export const floatingAnimation: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Pulse glow effect for interactive elements
 */
export const pulseGlow: Variants = {
  initial: {
    boxShadow: "0 0 0 0 rgba(255, 255, 255, 0.1)",
  },
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(255, 255, 255, 0.1)",
      "0 0 0 10px rgba(255, 255, 255, 0.05)",
      "0 0 0 0 rgba(255, 255, 255, 0.1)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Morphing background animation
 */
export const morphingBackground: Variants = {
  initial: {
    background: "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
  },
  animate: {
    background: [
      "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
      "linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))",
      "linear-gradient(225deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
      "linear-gradient(315deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))",
      "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

/**
 * Enhanced hover effects for glassy cards
 */
export const glassyHover: Variants = {
  initial: {
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    filter: "brightness(1)",
  },
  hover: {
    scale: 1.02,
    rotateX: 2,
    rotateY: 2,
    filter: "brightness(1.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

/**
 * Loading shimmer animation
 */
export const shimmerAnimation: Variants = {
  initial: {
    x: "-100%",
  },
  animate: {
    x: "100%",
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

/**
 * Parallax scroll effect
 */
export const useParallaxScroll = (speed: number = 0.5) => {
  const y = useMotionValue(0);
  const parallaxY = useTransform(y, [0, 1000], [0, 1000 * speed]);
  
  return {
    y,
    parallaxY: useSpring(parallaxY, { stiffness: 100, damping: 30 }),
  };
};

/**
 * Gesture-based animations
 */
export const gestureVariants: Variants = {
  initial: {
    scale: 1,
    rotate: 0,
  },
  drag: {
    scale: 1.05,
    rotate: 5,
    transition: {
      duration: 0.2,
    },
  },
  dragEnd: {
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

/**
 * Accessibility-focused animations
 */
export const accessibilityVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  focus: {
    scale: 1.05,
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Performance-optimized transitions
 */
export const optimizedTransition: Transition = {
  duration: 0.3,
  ease: [0.23, 1, 0.32, 1],
  type: "spring",
  stiffness: 100,
  damping: 20,
};

/**
 * Reduced motion support
 */
export const reducedMotionVariants: Variants = {
  initial: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Get appropriate variants based on user preferences
 */
export const getMotionVariants = (variants: Variants, reducedVariants?: Variants) => {
  if (prefersReducedMotion()) {
    return reducedVariants || reducedMotionVariants;
  }
  return variants;
};

/**
 * Enhanced motion component with accessibility support
 */
export const AccessibleMotion = ({ 
  children, 
  variants, 
  reducedVariants,
  ...props 
}: {
  children: React.ReactNode;
  variants: Variants;
  reducedVariants?: Variants;
} & React.ComponentProps<typeof motion.div>) => {
  const motionVariants = getMotionVariants(variants, reducedVariants);
  
  return React.createElement(
    motion.div,
    {
      variants: motionVariants,
      initial: "initial",
      animate: "visible",
      exit: "exit",
      ...props
    },
    children
  );
};

/**
 * Spatial audio cue simulation (visual feedback)
 */
export const spatialAudioCue: Variants = {
  initial: {
    scale: 1,
    filter: "brightness(1)",
  },
  trigger: {
    scale: [1, 1.1, 1],
    filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

/**
 * Eye tracking simulation (focus-based animations)
 */
export const eyeTrackingFocus: Variants = {
  initial: {
    scale: 1,
    filter: "blur(0px)",
  },
  focused: {
    scale: 1.02,
    filter: "blur(0px)",
    transition: {
      duration: 0.2,
    },
  },
  unfocused: {
    scale: 0.98,
    filter: "blur(1px)",
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Voice control feedback animation
 */
export const voiceControlFeedback: Variants = {
  initial: {
    scale: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  listening: {
    scale: 1.05,
    borderColor: "rgba(59, 130, 246, 0.5)",
    transition: {
      duration: 0.2,
    },
  },
  processing: {
    scale: [1.05, 1.1, 1.05],
    borderColor: ["rgba(59, 130, 246, 0.5)", "rgba(147, 51, 234, 0.5)", "rgba(59, 130, 246, 0.5)"],
    transition: {
      duration: 0.5,
      repeat: Infinity,
    },
  },
  success: {
    scale: 1.02,
    borderColor: "rgba(34, 197, 94, 0.5)",
    transition: {
      duration: 0.3,
    },
  },
};

/**
 * Theme-aware motion values
 */
export const useThemeAwareMotion = (isDark: boolean = true) => {
  const baseColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
  const accentColor = isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)";
  
  return {
    baseColor,
    accentColor,
    glassmorphicStyle: {
      backgroundColor: baseColor,
      backdropFilter: "blur(20px)",
      border: `1px solid ${baseColor.replace('0.1', '0.2')}`,
    },
  };
};
