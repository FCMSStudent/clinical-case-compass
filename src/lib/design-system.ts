// ────────────────────────────────────────────────────────────────────────────────
// DESIGN SYSTEM – MODULAR ENTRY POINT (Liquid‑Glass Edition)
// Inspired by Apple's glassmorphic "liquid‑glass" aesthetic
// ------------------------------------------------------------------------------
// ①  All core tokens & helpers are still available for backward compatibility.
// ②  New glassmorphism‑specific tokens, utilities, and components have been
//     added under the "liquidGlass" namespace.
// ③  The public surface remains a single strongly‑typed object so downstream
//     consumers can tree‑shake or auto‑import with full IntelliSense support.
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
  applyThemeToDocument,
  removeThemeFromDocument,
  generateThemeCSSProperties,
  validateTheme,
  mergeThemes,
  generateThemeVariations,
  getContrastRatio,
  isThemeAccessible
} from './utilities';
import { ThemeProvider, useTheme, ThemeSwitcher, themes } from './theme-system.tsx';
import { typography } from './typography';
import { typographyTokens } from './design-tokens';
import { backgroundConfig } from './background-config';
import { animations } from './animations';

// ─── Liquid‑Glass Tokens & Utilities ───────────────────────────────────────────

// ─── Consolidated Public API ───────────────────────────────────────────────────
export const designSystem = {
  // ── Core ────────────────────────────────────────────────────────────────────
  // Colors & Tokens
  colors,
  themeColors,
  typography,
  typographyTokens,

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
  focusRing,
  disabledState,
  getComponentStyles,
  getBentoStyles,

  // Utilities
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

  // Background
  backgroundConfig,

  // Animations
  animations,
};

export default designSystem;

export { animations };
