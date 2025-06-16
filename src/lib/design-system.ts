// ────────────────────────────────────────────────────────────────────────────────
// DESIGN SYSTEM - MODULAR ENTRY POINT
// ────────────────────────────────────────────────────────────────────────────────

// Re-export all design system modules for backward compatibility
export * from './colors';
export * from './spacing';
export * from './components';
export * from './utilities';
export * from './theme-system.tsx';
export * from './typography';
export * from './design-tokens';
export * from './background-config';

// Re-export existing animation system
export * from './motion';

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
  prefersReducedMotion, 
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

// Animation system (from existing motion.ts)
import { animations } from './animations';

// Consolidated exports for easy access
export const designSystem = {
  // Colors
  colors,
  themeColors,
  ThemeColors,
  
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
  prefersReducedMotion,
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
  ThemeConfig,
  
  // Typography
  typography,
  typographyTokens,
  
  // Background
  backgroundConfig,
  
  // Animations
  animations,
} as const;

// Default export for backward compatibility
export default designSystem;

export { animations }; 