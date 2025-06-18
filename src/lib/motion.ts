/**
 * @file Centralized Framer Motion animation variants and utilities.
 */
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
 * Defines subtle hover, tap, and focus animations for button components.
 * - `hover`: Slight scale up and brightness increase.
 * - `tap`: Slight scale down and brightness decrease.
 * - `focus`: Adds a visible focus ring and subtle scale.
 * - `initial`: Sets base values for animated properties.
 */
export const subtleButtonHoverTap: Variants = {
  hover: {
    scale: 1.03,
    filter: "brightness(1.05)", // Slightly less intense than example
    transition: { duration: 0.2, ease: "easeOut" }
  },
  tap: {
    scale: 0.97,
    filter: "brightness(0.95)", // Slightly less intense than example
    transition: { duration: 0.1, ease: "easeIn" }
  },
  focus: {
    scale: 1.01, // Subtle scale on focus
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.4)", // Focus ring
    transition: { duration: 0.2, ease: "easeOut" }
  },
  initial: { // Ensure initial state is defined for all animated properties
    scale: 1,
    filter: "brightness(1)",
    boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)", // Initial transparent boxShadow
  }
};

/**
 * Improved page transition variants with vertical movement and better easing
 */
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20, // Subtle upward movement instead of horizontal sliding
    scale: 0.98, // Very subtle scale for smoother feel
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.3, 
      ease: [0.23, 1, 0.32, 1] // Smooth cubic-bezier easing
    }
  },
  exit: {
    opacity: 0,
    y: -10, // Subtle upward exit movement
    scale: 0.98,
    transition: { 
      duration: 0.3, 
      ease: [0.23, 1, 0.32, 1] // Consistent easing
    }
  }
};

/**
 * Reduced motion version for `pageTransitionVariants`.
 * Provides a quick fade-in/out effect with no movement.
 */
export const reducedMotionPageTransitionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.15 } }
};

/**
 * Reduced motion version for `subtleButtonHoverTap`.
 * Disables hover animation, provides minimal tap feedback, and a focus ring.
 */
export const subtleReducedMotionButton: Variants = {
  hover: {}, // No hover animation
  tap: { scale: 0.98 }, // Minimal tap feedback
  focus: { // Only focus ring for accessibility
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.4)",
    transition: { duration: 0.1 }
  },
  initial: {
    scale: 1,
    boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)",
  }
};

/**
 * Defines subtle hover animations for checkbox components.
 * Focus state is typically handled by CSS (`focusRing` utility).
 * - `hover`: Slightly increases border opacity and scales up the checkbox.
 * - `initial`: Sets base values for border color and scale.
 */
export const subtleCheckboxHover: Variants = {
  hover: {
    // Using a slightly more opaque border color on hover for the checkbox itself
    // Initial is 'border-white/20' (hsla(0, 0%, 100%, 0.2))
    borderColor: "hsla(0, 0%, 100%, 0.35)", // border-white/35
    scale: 1.08, // Make the checkbox square scale up a bit
    transition: { duration: 0.15, ease: "easeOut" }
  },
  initial: {
    borderColor: "hsla(0, 0%, 100%, 0.2)", // Match initial border-white/20 from Checkbox component
    scale: 1,
  }
};

/**
 * Reduced motion version for `subtleCheckboxHover`.
 * Disables hover animations, maintaining initial state.
 */
export const reducedMotionCheckboxHover: Variants = {
  hover: {}, // No hover animation for reduced motion
  initial: {
    borderColor: "hsla(0, 0%, 100%, 0.2)",
    scale: 1,
  }
};

/**
 * Defines subtle hover and focus animations for navigation link elements.
 * - `hover`: Increases brightness and applies a slight scale.
 * - `focus`: Applies a focus ring, increases brightness, and slight scale.
 * - `initial`: Sets base values for filter, scale, and boxShadow.
 */
export const subtleNavLinkInteraction: Variants = {
  hover: {
    // Using filter brightness as background is often transparent or complex
    filter: "brightness(1.15)",
    scale: 1.02,
    transition: { duration: 0.15, ease: "easeOut" }
  },
  focus: {
    scale: 1.01,
    // Using a distinct boxShadow for focus that works on various backgrounds
    boxShadow: "0 0 0 2px hsl(var(--ring) / 0.6), 0 1px 2px rgba(0,0,0,0.1)",
    filter: "brightness(1.1)",
    transition: { duration: 0.15, ease: "easeOut" }
  },
  initial: {
    filter: "brightness(1)",
    scale: 1,
    boxShadow: "0 0 0 0px hsl(var(--ring) / 0)",
  }
};

/**
 * Reduced motion version for `subtleNavLinkInteraction`.
 * Disables hover animation and provides a minimal focus style (ring and slight brightness).
 */
export const reducedMotionNavLinkInteraction: Variants = {
  hover: {}, // No hover animation
  focus: { // Only focus ring for accessibility
    boxShadow: "0 0 0 2px hsl(var(--ring) / 0.6)",
    filter: "brightness(1.05)", // Minimal brightness change
  },
  initial: {
    filter: "brightness(1)",
    boxShadow: "0 0 0 0px hsl(var(--ring) / 0)",
  }
};

/**
 * Defines subtle hover and focus animations for card components.
 * Intended for cards that are interactive.
 * - `hover`: Applies a slight scale and enhances boxShadow.
 * - `focus`: Applies a focus ring, slight scale, and base boxShadow.
 * - `initial`: Sets base values for scale and boxShadow.
 */
export const subtleCardInteraction: Variants = {
  hover: {
    scale: 1.015, // Very subtle scale
    boxShadow: "0px 6px 18px rgba(0,0,0,0.07)", // Slightly enhance existing shadow if any
    transition: { duration: 0.2, ease: "easeOut" }
  },
  focus: {
    scale: 1.01,
    boxShadow: "0 0 0 2px hsl(var(--ring) / 0.5), 0px 5px 15px rgba(0,0,0,0.06)", // Focus ring + base shadow
    transition: { duration: 0.2, ease: "easeOut" }
  },
  initial: {
    scale: 1,
    // Assuming base shadow is applied by Card's own styles (unifiedCardVariants)
    // If not, we'd need a base boxShadow here: e.g., "0px 5px 15px rgba(0,0,0,0.06)"
    // For now, let framer-motion only add/change shadow on hover/focus if not defined initially.
    // To be safe, define an initial state for boxShadow that motion can animate from.
    boxShadow: "0px 4px 12px rgba(0,0,0,0.05)", // A plausible default initial shadow
  }
};

/**
 * Reduced motion version for `subtleCardInteraction`.
 * Disables hover animation and provides a focus ring.
 */
export const reducedMotionCardInteraction: Variants = {
  hover: {}, // No hover animation
  focus: { // Only focus ring for accessibility
    boxShadow: "0 0 0 2px hsl(var(--ring) / 0.5)",
    transition: { duration: 0.1 }
  },
  initial: {
    boxShadow: "0px 4px 12px rgba(0,0,0,0.05)", // Match initial state
  }
};

/**
 * Defines subtle focus animations for input components.
 * - `focus`: Changes borderColor and adds a boxShadow to indicate focus.
 * - `initial`: Sets base borderColor and transparent boxShadow.
 */
export const subtleInputInteraction: Variants = {
  focus: {
    borderColor: "hsl(var(--ring))", // Use existing ring color for focus border
    boxShadow: "0 0 0 2px hsl(var(--ring) / 0.4)", // Subtle shadow with ring color
    transition: { duration: 0.2, ease: "easeOut" }
  },
  initial: {
    borderColor: "hsl(var(--input))", // Default input border color
    boxShadow: "0 0 0 0px hsl(var(--ring) / 0)", // Transparent initial boxShadow
  }
};

/**
 * Reduced motion version for `subtleInputInteraction`.
 * Only changes borderColor on focus.
 */
export const reducedMotionInputInteraction: Variants = {
  focus: {
    borderColor: "hsl(var(--ring))", // Simple border change for focus
  },
  initial: {
    borderColor: "hsl(var(--input))",
  }
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
    filter: "blur(5px)", // Reduced blur
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
    filter: "blur(5px)", // Reduced blur
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

</edits_to_apply>
