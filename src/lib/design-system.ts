// ────────────────────────────────────────────────────────────────────────────────
// DESIGN SYSTEM – MODULAR ENTRY POINT (Liquid‑Glass Edition)
// Inspired by Apple’s glassmorphic “liquid‑glass” aesthetic
// ------------------------------------------------------------------------------
// ①  All core tokens & helpers are still available for backward compatibility.
// ②  New glassmorphism‑specific tokens, utilities, and components have been
//     added under the "liquidGlass" namespace.
// ③  The public surface remains a single strongly‑typed object so downstream
//     consumers can tree‑shake or auto‑import with full IntelliSense support.
// ────────────────────────────────────────────────────────────────────────────────

// ─── Core Token & Utility Re‑exports ───────────────────────────────────────────
export * from "./colors";
export * from "./spacing";
export * from "./components";
export * from "./utilities";
export * from "./theme-system.tsx";
export * from "./typography";
export * from "./design-tokens";
export * from "./background-config";
export * from "./motion";

// ─── Liquid‑Glass Add‑ons ──────────────────────────────────────────────────────
// ▸ Blur radii, overlay gradients, backdrop‑filter helpers, etc.
export * from "./liquid-glass/blur";            // e.g. glassBlur.md, glassDepth.md
export * from "./liquid-glass/palette";         // translucent tints & vibrancies
export * from "./liquid-glass/effects";         // getLiquidGlassStyles(), etc.
export * from "./liquid-glass/components";      // <GlassSurface/>, <FrostedCard/>

// ─── Legacy Named Exports (kept for drop‑in upgradeability) ────────────────────
import type { ThemeColors } from "./colors";
import { colors, themeColors } from "./colors";
import {
  spacing,
  borderRadius,
  shadows,
  layout,
  sizes,
  zIndex,
  breakpoints,
} from "./spacing";
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
  glassmorphic, // <‑‑‑ Deprecated: replaced by liquidGlass.surface
  glass,        // <‑‑‑ Deprecated: replaced by liquidGlass.surface
} from "./components";
import {
  getGlassmorphicStyles, // <‑‑‑ Deprecated: use liquidGlass.getStyles
  prefersReducedMotion,
  applyThemeToDocument,
  removeThemeFromDocument,
  generateThemeCSSProperties,
  validateTheme,
  mergeThemes,
  generateThemeVariations,
  getContrastRatio,
  isThemeAccessible,
} from "./utilities";
import type { ThemeConfig } from "./theme-system.tsx";
import {
  ThemeProvider,
  useTheme,
  ThemeSwitcher,
  themes,
} from "./theme-system.tsx";
import { typography } from "./typography";
import { typographyTokens } from "./design-tokens";
import { backgroundConfig } from "./background-config";
import { animations } from "./animations";

// ─── Liquid‑Glass Tokens & Utilities ───────────────────────────────────────────
import {
  glassBlur,
  glassDepth,
  glassPalette,
  getLiquidGlassStyles,
  LiquidGlassSurface,
} from "./liquid-glass";

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

  // Background & Motion
  backgroundConfig,
  animations,

  // ── Liquid‑Glass Namespace ──────────────────────────────────────────────────
  liquidGlass: {
    glassBlur,            // { xs: '4px', sm: '8px', md: '12px', ... }
    glassDepth,           // z‑translation & elevation helpers
    glassPalette,         // translucent RGBA tints à la iOS
    getStyles: getLiquidGlassStyles, // (opts) => CSSObject
    Surface: LiquidGlassSurface,     // <Surface as="section" elevation="lg" />
  },
} as const;

// ─── Default Export (kept for compatibility) ──────────────────────────────────
export default designSystem;

// Re‑exporting animations as named export for convenience
export { animations };
