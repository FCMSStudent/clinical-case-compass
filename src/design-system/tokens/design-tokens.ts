
// ────────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS - COMPATIBILITY EXPORT
// ────────────────────────────────────────────────────────────────────────────────

// Import the tokens first
import { colors, themeColors } from './colors';
import { spacing, borderRadius, shadows } from './spacing';
import { typography, fontWeight } from './typography';

// Re-export everything from the individual token files
export * from './colors';
export * from './spacing';
export * from './typography';

// Combined design tokens object for backward compatibility
export const designTokens = {
  colors,
  themeColors,
  spacing,
  borderRadius,
  shadows,
  typography,
  fontWeight
} as const;
