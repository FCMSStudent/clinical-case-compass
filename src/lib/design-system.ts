// ────────────────────────────────────────────────────────────────────────────────
// DESIGN SYSTEM - MODULAR ENTRY POINT - APPLE LIQUID GLASS ENHANCED
// ────────────────────────────────────────────────────────────────────────────────

// Re-export all design system modules for backward compatibility
export * from './colors';
export * from './spacing';
export * from './components';
export * from './theme-system.tsx';
export * from './typography';
export * from './background-config';

// Re-export existing animation system
export * from './motion';

// Re-export new Apple-inspired liquid glass effects
export * from './glass-effects';

// Legacy exports for backward compatibility
import type { ThemeColors } from './colors';
import { colors, themeColors } from './colors';
import { spacing, borderRadius, shadows, layout, sizes, zIndex, breakpoints } from './spacing';
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
} from './components';
import { 
  getGlassmorphicStyles, 
  applyThemeToDocument,
  removeThemeFromDocument,
  generateThemeCSSProperties,
  validateTheme,
  mergeThemes,
  generateThemeVariations,
  getContrastRatio,
  isThemeAccessible
} from './utilities';
import type { ThemeConfig } from './theme-system.tsx';
import { ThemeProvider, useTheme, ThemeSwitcher, themes } from './theme-system.tsx';
import { typography } from './typography';
import { typographyTokens } from './design-tokens';
import { backgroundConfig } from './background-config';
import { animations } from './animations';
import { 
  liquidGlassEffects, 
  applyLiquidGlass, 
  getGlassHoverVariants, 
  getGlassTransitionVariants,
  getPulseAnimation,
  getParallaxEffect,
  liquidGlassClasses,
  getGlassClasses
} from './glass-effects';

// Consolidated exports for easy access
export const designSystem = {
  // Colors
  colors,
  themeColors,
  
  // Spacing & Layout
  spacing,
  borderRadius,
  shadows,
  layout,
  sizes,
  zIndex,
  breakpoints,
  
  // Components
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
  
  // Utilities
  getGlassmorphicStyles,
  applyThemeToDocument,
  removeThemeFromDocument,
  generateThemeCSSProperties,
  validateTheme,
  mergeThemes,
  generateThemeVariations,
  getContrastRatio,
  isThemeAccessible,
  
  // Theme System
  ThemeProvider,
  useTheme,
  ThemeSwitcher,
  themes,
  
  // Typography
  typography,
  typographyTokens,
  
  // Background
  backgroundConfig,
  
  // Animations
  animations,
  
  // Apple-inspired Liquid Glass Effects
  liquidGlassEffects,
  applyLiquidGlass,
  getGlassHoverVariants,
  getGlassTransitionVariants,
  getPulseAnimation,
  getParallaxEffect,
  liquidGlassClasses,
  getGlassClasses,
} as const;

// Default export for backward compatibility
export default designSystem;

export { animations };
