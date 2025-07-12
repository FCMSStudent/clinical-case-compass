// ────────────────────────────────────────────────────────────────────────────────
// UNIFIED DESIGN SYSTEM - SINGLE SOURCE OF TRUTH
// ────────────────────────────────────────────────────────────────────────────────

import { colors, themeColors } from './tokens/colors';
import { spacing, borderRadius, shadows, layout, sizes, zIndex, breakpoints } from './tokens/spacing';
import { typography, typographyTokens } from './tokens/typography';
import { 
  buttonVariants, 
  button, 
  input, 
  card, 
  bento, 
  getComponentStyles, 
  getBentoStyles,
  focusRing,
  disabledState,
  glassmorphic,
  glass
} from './components/components';
import { 
  liquidGlassEffects, 
  applyLiquidGlass, 
  getGlassHoverVariants, 
  getGlassTransitionVariants,
  getPulseAnimation,
  getParallaxEffect,
  liquidGlassClasses,
  getGlassClasses
} from './components/glass-effects';
import { ThemeProvider, useTheme, ThemeSwitcher, themes } from './themes/theme-system';
import { backgroundConfig } from './background-config';
import { animations } from './animations/animations';

/**
 * Unified Design System - Single source of truth for all design elements
 * 
 * This object consolidates all design tokens, components, themes, and utilities
 * into a structured, accessible format for consistent UI development.
 */
export const UnifiedDesignSystem = {
  // Design Tokens
  tokens: {
    colors,
    themeColors,
    spacing,
    borderRadius,
    shadows,
    layout,
    sizes,
    zIndex,
    breakpoints,
    typography,
    typographyTokens,
  },
  
  // Component System
  components: {
    buttonVariants,
    button,
    input,
    card,
    bento,
    getComponentStyles,
    getBentoStyles,
    focusRing,
    disabledState,
    glassmorphic,
    glass,
  },
  
  // Glass Effects
  glass: {
    liquidGlassEffects,
    applyLiquidGlass,
    getGlassHoverVariants,
    getGlassTransitionVariants,
    getPulseAnimation,
    getParallaxEffect,
    liquidGlassClasses,
    getGlassClasses,
  },
  
  // Theme System
  theme: {
    ThemeProvider,
    useTheme,
    ThemeSwitcher,
    themes,
  },
  
  // Utilities
  backgroundConfig,
  animations,
} as const;

// Type for the unified design system
export type UnifiedDesignSystemType = typeof UnifiedDesignSystem;

// Default export
export default UnifiedDesignSystem;