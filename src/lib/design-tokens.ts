// ────────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS - CORE TOKENS FOR TAILWIND CONFIGURATION
// ────────────────────────────────────────────────────────────────────────────────

/** Typography System (Tokens for Tailwind) - Apple HIG Inspired */
export const typographyTokens = {
  fontFamily: {
    // Apple's system font stack - automatically uses SF Pro on Apple devices
    sans: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"SF Pro Display"',
      '"SF Pro Text"',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ],
    // SF Mono for code and monospaced content
    mono: [
      '"SF Mono"',
      'ui-monospace',
      'SFMono-Regular',
      'Menlo',
      'Monaco',
      'Consolas',
      '"Liberation Mono"',
      '"Courier New"',
      'monospace'
    ],
  },
  fontSize: {
    // Apple's typographic scale with proper line heights
    // Large Title (iOS) - 34pt Semibold
    '2xs': ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.025em' }],
    'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
    'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
    // Body (iOS) - 17pt Regular with 22pt line height (1.29 ratio)
    'base': ['1.0625rem', { lineHeight: '1.375rem', letterSpacing: '0.01em' }],
    'lg': ['1.125rem', { lineHeight: '1.5rem', letterSpacing: '0.01em' }],
    'xl': ['1.25rem', { lineHeight: '1.625rem', letterSpacing: '0.01em' }],
    // Headline (iOS) - 17pt Semibold
    '2xl': ['1.5rem', { lineHeight: '1.875rem', letterSpacing: '0.01em' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '0.01em' }],
    // Title (iOS) - 28pt Semibold
    '4xl': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '0.01em' }],
    // Large Title (iOS) - 34pt Semibold
    '5xl': ['3rem', { lineHeight: '3.5rem', letterSpacing: '0.01em' }],
    '6xl': ['3.75rem', { lineHeight: '4rem', letterSpacing: '0.01em' }],
    '7xl': ['4.5rem', { lineHeight: '4.5rem', letterSpacing: '0.01em' }],
  },
  fontWeight: {
    // Apple's weight hierarchy - avoiding extreme weights
    normal: '400',    // Regular - for body text
    medium: '500',    // Medium - for labels and emphasis
    semibold: '600',  // Semibold - for headings and important text
    bold: '700',      // Bold - for large titles and critical info
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
