// ────────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS - COMPATIBILITY EXPORT
// ────────────────────────────────────────────────────────────────────────────────

// Re-export everything from the individual token files
export * from './colors';
export * from './spacing';
export * from './typography';

// Import specific items for the combined object
import { colors, themeColors } from './colors';
import { spacing, borderRadius, shadows } from './spacing';
import { typography, fontWeight } from './typography';

// Explicit re-exports for compatibility
export { colors, themeColors } from './colors';
export { spacing, borderRadius, shadows } from './spacing';
export { typography, fontWeight } from './typography';

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
