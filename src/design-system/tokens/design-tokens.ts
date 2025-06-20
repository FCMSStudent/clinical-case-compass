// ────────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS - CORE TOKENS FOR TAILWIND CONFIGURATION
// ────────────────────────────────────────────────────────────────────────────────

/** Typography System (Tokens for Tailwind) */
export const typographyTokens = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
  },
  fontSize: {
    '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
    'xs': ['0.75rem', { lineHeight: '1rem' }],
    'sm': ['0.875rem', { lineHeight: '1.25rem' }],
    'base': ['1rem', { lineHeight: '1.5rem' }],
    'lg': ['1.125rem', { lineHeight: '1.75rem' }],
    'xl': ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

// Import from modular system
import { colors } from './colors';
import { spacing, borderRadius, shadows } from './spacing';

// Compatibility export for components expecting designTokens
export const designTokens = {
  typography: typographyTokens,
  colors,
  spacing,
  borderRadius,
  shadows,
} as const;

// Re-export for backward compatibility
export { colors, spacing, borderRadius, shadows };
