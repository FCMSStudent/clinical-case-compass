
// ────────────────────────────────────────────────────────────────────────────────
// ANIMATIONS SYSTEM - CONSOLIDATED EXPORTS
// ────────────────────────────────────────────────────────────────────────────────

import { Variants } from 'framer-motion';
import {
  glassmorphicEntrance,
  staggeredContainer,
  staggeredItem,
  floatingAnimation,
  pulseGlow,
  morphingBackground,
  glassyHover,
  useAdaptiveTinting,
  useMotionResponsiveHover,
  useParallaxScroll,
  prefersReducedMotion,
  getMotionVariants,
  AccessibleMotion,
  useThemeAwareMotion
} from './motion';

// Add missing fadeIn animation variant
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Add missing floating animation (alias for floatingAnimation)
export const floating = floatingAnimation;

export const animations = {
  glassmorphicEntrance,
  staggeredContainer,
  staggeredItem,
  floatingAnimation,
  floating, // Add alias
  pulseGlow,
  morphingBackground,
  glassyHover,
  fadeIn, // Add missing fadeIn
  useAdaptiveTinting,
  useMotionResponsiveHover,
  useParallaxScroll,
  prefersReducedMotion,
  getMotionVariants,
  AccessibleMotion,
  useThemeAwareMotion
};
