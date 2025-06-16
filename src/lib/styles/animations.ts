import { Variants, Transition } from "framer-motion";
// Import the source of truth for glassmorphicEntrance
import { glassmorphicEntrance as libGlassmorphicEntrance } from "../motion"; // Adjusted path

// ────────────────────────────────────────────────────────────────────────────────
// ANIMATION SYSTEM
// ────────────────────────────────────────────────────────────────────────────────

/** Core Animation Variants */
export const animations = {
  // Entrance animations
  fadeIn: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3, ease: "easeInOut" } },
  } as Variants,

  // Glassmorphic entrance (now using the single source of truth)
  glassmorphicEntrance: libGlassmorphicEntrance,

  // Staggered animations
  staggeredContainer: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  } as Variants,

  staggeredItem: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
  } as Variants,

  // Hover effects
  glassyHover: {
    initial: { scale: 1, rotateX: 0, rotateY: 0, filter: "brightness(1)" },
    hover: { scale: 1.02, rotateX: 2, rotateY: 2, filter: "brightness(1.1)", transition: { duration: 0.3, ease: "easeOut" } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  } as Variants,

  // Floating animation
  floating: {
    initial: { y: 0 },
    animate: { y: [-5, 5, -5], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } },
  } as Variants,

  // Pulse glow
  pulseGlow: {
    initial: { boxShadow: "0 0 0 0 rgba(255, 255, 255, 0.1)" },
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(255, 255, 255, 0.1)",
        "0 0 0 10px rgba(255, 255, 255, 0.05)",
        "0 0 0 0 rgba(255, 255, 255, 0.1)",
      ],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  } as Variants,
} as const;

/** Transition Presets */
export const transitions = {
  fast: { duration: 0.15, ease: "easeOut" } as Transition,
  default: { duration: 0.2, ease: "easeOut" } as Transition,
  slow: { duration: 0.3, ease: "easeOut" } as Transition,
  spring: { type: "spring", stiffness: 100, damping: 20 } as Transition,
  optimized: { duration: 0.3, ease: [0.23, 1, 0.32, 1], type: "spring", stiffness: 100, damping: 20 } as Transition,
} as const;
