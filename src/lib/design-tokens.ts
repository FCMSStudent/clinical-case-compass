/**
 * DESIGN TOKENS - PHASE 2
 * Single source of truth for typography, colors, and medical-specific design tokens
 * Clinical Case Compass - Medical Application Design System
 */

// ────────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY SYSTEM
// ────────────────────────────────────────────────────────────────────────────────

/** Unified Font Family System */
export const fontFamily = {
  primary: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  monospace: ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'monospace'],
  medical: ['Inter', 'system-ui', 'sans-serif'], // Same as primary for consistency
} as const;

/** Standardized Font Weights */
export const fontWeight = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  black: '800',
} as const;

/** Typography Scale with Consistent Line Heights */
export const fontSize = {
  '2xs': { size: '0.625rem', lineHeight: '0.875rem' },  // 10px
  'xs': { size: '0.75rem', lineHeight: '1rem' },        // 12px
  'sm': { size: '0.875rem', lineHeight: '1.25rem' },    // 14px
  'base': { size: '1rem', lineHeight: '1.5rem' },       // 16px
  'lg': { size: '1.125rem', lineHeight: '1.75rem' },    // 18px
  'xl': { size: '1.25rem', lineHeight: '1.75rem' },     // 20px
  '2xl': { size: '1.5rem', lineHeight: '2rem' },        // 24px
  '3xl': { size: '1.875rem', lineHeight: '2.25rem' },   // 30px
  '4xl': { size: '2.25rem', lineHeight: '2.5rem' },     // 36px
  '5xl': { size: '3rem', lineHeight: '3.25rem' },       // 48px
  '6xl': { size: '3.75rem', lineHeight: '4rem' },       // 60px
  '7xl': { size: '4.5rem', lineHeight: '4.75rem' },     // 72px
} as const;

/** Semantic Typography Tokens */
export const typography = {
  // Display text (hero sections, main headings)
  display: {
    '2xl': `text-7xl font-bold leading-tight tracking-tight`,
    'xl': `text-6xl font-bold leading-tight tracking-tight`,
    'lg': `text-5xl font-bold leading-tight tracking-tight`,
    'md': `text-4xl font-bold leading-tight tracking-tight`,
    'sm': `text-3xl font-bold leading-tight tracking-tight`,
  },
  
  // Headings (section titles, card headers)
  heading: {
    'h1': `text-4xl font-bold leading-tight tracking-tight`,
    'h2': `text-3xl font-bold leading-tight tracking-tight`,
    'h3': `text-2xl font-semibold leading-tight`,
    'h4': `text-xl font-semibold leading-snug`,
    'h5': `text-lg font-semibold leading-snug`,
    'h6': `text-base font-semibold leading-normal`,
  },
  
  // Body text
  body: {
    'xl': `text-xl font-normal leading-relaxed`,
    'lg': `text-lg font-normal leading-relaxed`,
    'md': `text-base font-normal leading-relaxed`,
    'sm': `text-sm font-normal leading-normal`,
    'xs': `text-xs font-normal leading-tight`,
  },
  
  // Labels and UI elements
  label: {
    'lg': `text-base font-medium leading-normal`,
    'md': `text-sm font-medium leading-normal`,
    'sm': `text-xs font-medium leading-tight`,
  },
  
  // Code and technical text
  code: {
    'lg': `text-base font-normal font-mono leading-relaxed`,
    'md': `text-sm font-normal font-mono leading-normal`,
    'sm': `text-xs font-normal font-mono leading-tight`,
  },
  
  // Medical-specific typography
  medical: {
    vital: `text-2xl font-bold leading-tight font-mono`,
    measurement: `text-lg font-semibold leading-snug font-mono`,
    dosage: `text-base font-medium leading-normal font-mono`,
    diagnosis: `text-lg font-semibold leading-relaxed`,
    symptom: `text-base font-normal leading-relaxed`,
    note: `text-sm font-normal leading-normal`,
  },
} as const;

// ────────────────────────────────────────────────────────────────────────────────
// COLOR SYSTEM
// ────────────────────────────────────────────────────────────────────────────────

/** Base Color Palette */
export const baseColors = {
  // Neutral grays
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  
  // Brand blues (medical/clinical theme)
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  
  // Success (healing, recovery, positive outcomes)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  
  // Warning (caution, monitoring needed)
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  
  // Error/Critical (urgent, dangerous, critical alerts)
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  
  // Medical specialty colors
  cardiology: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  neurology: {
    50: '#f3e8ff',
    100: '#e9d5ff',
    200: '#d6b4fc',
    300: '#c084fc',
    400: '#a855f7',
    500: '#9333ea',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  
  orthopedic: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
} as const;

/** Opacity Scale for Consistent Transparency */
export const opacity = {
  0: '0',
  5: '0.05',
  10: '0.1',
  15: '0.15',
  20: '0.2',
  25: '0.25',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  75: '0.75',
  80: '0.8',
  85: '0.85',
  90: '0.9',
  95: '0.95',
  100: '1',
} as const;

/** Semantic Color Tokens */
export const semanticColors = {
  // Content colors
  text: {
    primary: 'hsl(var(--foreground))',
    secondary: 'hsl(var(--muted-foreground))',
    tertiary: 'hsl(var(--muted-foreground) / 0.7)',
    inverse: 'hsl(var(--background))',
    disabled: 'hsl(var(--muted-foreground) / 0.5)',
  },
  
  // Background colors
  background: {
    primary: 'hsl(var(--background))',
    secondary: 'hsl(var(--muted))',
    tertiary: 'hsl(var(--accent))',
    elevated: 'hsl(var(--card))',
    overlay: 'hsl(var(--popover))',
  },
  
  // Border colors
  border: {
    default: 'hsl(var(--border))',
    muted: 'hsl(var(--border) / 0.5)',
    strong: 'hsl(var(--foreground) / 0.2)',
  },
  
  // Interactive colors
  interactive: {
    primary: 'hsl(var(--primary))',
    'primary-hover': 'hsl(var(--primary) / 0.9)',
    'primary-active': 'hsl(var(--primary) / 0.8)',
    secondary: 'hsl(var(--secondary))',
    'secondary-hover': 'hsl(var(--secondary) / 0.8)',
    'secondary-active': 'hsl(var(--secondary) / 0.7)',
  },
  
  // Status colors
  status: {
    success: 'hsl(142 76% 36%)',
    'success-bg': 'hsl(142 76% 36% / 0.1)',
    'success-border': 'hsl(142 76% 36% / 0.2)',
    
    warning: 'hsl(38 92% 50%)',
    'warning-bg': 'hsl(38 92% 50% / 0.1)',
    'warning-border': 'hsl(38 92% 50% / 0.2)',
    
    error: 'hsl(0 84% 60%)',
    'error-bg': 'hsl(0 84% 60% / 0.1)',
    'error-border': 'hsl(0 84% 60% / 0.2)',
    
    info: 'hsl(217 91% 60%)',
    'info-bg': 'hsl(217 91% 60% / 0.1)',
    'info-border': 'hsl(217 91% 60% / 0.2)',
  },
  
  // Medical-specific semantic colors
  medical: {
    // Vital signs
    'vitals-normal': 'hsl(142 76% 36%)',
    'vitals-elevated': 'hsl(38 92% 50%)',
    'vitals-critical': 'hsl(0 84% 60%)',
    
    // Clinical status
    'stable': 'hsl(142 76% 36%)',
    'monitoring': 'hsl(38 92% 50%)',
    'acute': 'hsl(0 84% 60%)',
    'chronic': 'hsl(217 91% 60%)',
    
    // Treatment status
    'treatment-complete': 'hsl(142 76% 36%)',
    'treatment-ongoing': 'hsl(217 91% 60%)',
    'treatment-pending': 'hsl(38 92% 50%)',
    'treatment-emergency': 'hsl(0 84% 60%)',
    
    // Medication
    'prescription': 'hsl(217 91% 60%)',
    'otc': 'hsl(142 76% 36%)',
    'controlled': 'hsl(38 92% 50%)',
    'contraindicated': 'hsl(0 84% 60%)',
    
    // Priority levels
    'priority-low': 'hsl(142 76% 36%)',
    'priority-medium': 'hsl(38 92% 50%)',
    'priority-high': 'hsl(0 84% 60%)',
    'priority-urgent': 'hsl(0 90% 70%)',
  },
} as const;

/** Medical Color Meanings Documentation */
export const medicalColorMeanings = {
  green: {
    semantic: 'Positive, stable, normal, healthy',
    usage: ['Normal vital signs', 'Completed treatments', 'Stable condition', 'Successful outcomes'],
  },
  yellow: {
    semantic: 'Caution, monitoring required, elevated',
    usage: ['Elevated readings', 'Pending results', 'Monitoring required', 'Moderate priority'],
  },
  red: {
    semantic: 'Critical, urgent, abnormal, dangerous',
    usage: ['Critical vital signs', 'Emergency situations', 'Abnormal results', 'High priority'],
  },
  blue: {
    semantic: 'Information, routine, ongoing, chronic',
    usage: ['General information', 'Ongoing treatments', 'Chronic conditions', 'Standard procedures'],
  },
  purple: {
    semantic: 'Neurological, psychiatric, specialized',
    usage: ['Neurological conditions', 'Mental health', 'Specialized treatments'],
  },
  orange: {
    semantic: 'Orthopedic, musculoskeletal, rehabilitation',
    usage: ['Bone conditions', 'Physical therapy', 'Rehabilitation status'],
  },
} as const;

/** Color Utility Functions */
export const colorUtils = {
  /**
   * Get color with opacity
   * @param color - Base color value
   * @param opacityValue - Opacity from opacity scale
   */
  withOpacity: (color: string, opacityValue: keyof typeof opacity) => 
    `${color} / ${opacity[opacityValue]}`,
  
  /**
   * Get medical color by clinical meaning
   * @param meaning - Clinical semantic meaning
   */
  getMedicalColor: (meaning: keyof typeof semanticColors.medical) => 
    semanticColors.medical[meaning],
  
  /**
   * Get status color with background and border variants
   * @param status - Status type
   */
  getStatusColors: (status: 'success' | 'warning' | 'error' | 'info') => ({
    text: semanticColors.status[status],
    background: semanticColors.status[`${status}-bg` as keyof typeof semanticColors.status],
    border: semanticColors.status[`${status}-border` as keyof typeof semanticColors.status],
  }),
};

// Export all design tokens
export const designTokens = {
  fontFamily,
  fontWeight,
  fontSize,
  typography,
  baseColors,
  opacity,
  semanticColors,
  medicalColorMeanings,
  colorUtils,
} as const; 