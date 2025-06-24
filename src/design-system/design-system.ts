// ────────────────────────────────────────────────────────────────────────────────
// DESIGN SYSTEM - MODULAR ENTRY POINT - APPLE LIQUID GLASS ENHANCED
// ────────────────────────────────────────────────────────────────────────────────

// Re-export all design system modules for backward compatibility
export * from './tokens/colors';
export * from './tokens/spacing';
export * from './components/components';
export * from './themes/theme-system';
export * from './tokens/typography';
export * from './tokens/design-tokens';
export * from './background-config';

// Re-export existing animation system
export * from './animations/motion';

// Re-export new Apple-inspired liquid glass effects
export * from './components/glass-effects';

// Legacy exports for backward compatibility
import type { ThemeColors } from './tokens/colors';
import { colors, themeColors } from './tokens/colors';
import { spacing, borderRadius, shadows, layout, sizes, zIndex, breakpoints } from './tokens/spacing';
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
  getGlassmorphicStyles, 
  applyThemeToDocument,
  removeThemeFromDocument,
  generateThemeCSSProperties,
  validateTheme,
  mergeThemes,
  generateThemeVariations,
  getContrastRatio,
  isThemeAccessible
} from '../shared/utils/utilities';
import type { ThemeConfig } from './themes/theme-system';
import { ThemeProvider, useTheme, ThemeSwitcher, themes } from './themes/theme-system';
import { typography } from './tokens/typography';
import { typographyTokens } from './tokens/design-tokens';
import { backgroundConfig } from './background-config';
import { animations } from './animations/animations';
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
