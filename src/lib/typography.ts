// ────────────────────────────────────────────────────────────────────────────────
// APPLE-INSPIRED TYPOGRAPHY SYSTEM
// Based on Apple's Human Interface Guidelines with San Francisco fonts
// ────────────────────────────────────────────────────────────────────────────────

// Core typography styles based on Apple HIG
export const typography = {
  // Display & Title Hierarchy
  largeTitle: "text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-[-0.02em]",
  title: "text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-[-0.01em]",
  subtitle: "text-xl md:text-2xl lg:text-3xl font-medium leading-snug tracking-[0.01em]",
  headline: "text-lg md:text-xl lg:text-2xl font-semibold leading-snug tracking-[0.01em]",
  
  // Body Text Hierarchy
  body: "text-base md:text-lg leading-relaxed tracking-[0.01em] font-normal",
  bodyLarge: "text-lg md:text-xl leading-relaxed tracking-[0.01em] font-normal",
  bodySmall: "text-sm md:text-base leading-normal tracking-[0.01em] font-normal",
  callout: "text-base md:text-lg leading-relaxed tracking-[0.01em] font-medium",
  subheadline: "text-sm md:text-base leading-normal tracking-[0.01em] font-normal",
  
  // Caption & Fine Print
  footnote: "text-xs md:text-sm leading-normal tracking-[0.025em] font-normal",
  caption1: "text-xs leading-normal tracking-[0.025em] font-normal",
  caption2: "text-xs leading-tight tracking-[0.025em] font-normal",
  
  // Headings (backward compatibility)
  h1: "text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-[-0.01em]",
  h2: "text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight tracking-[-0.01em]",
  h3: "text-xl md:text-2xl lg:text-3xl font-semibold leading-snug tracking-[0.01em]",
  h4: "text-lg md:text-xl lg:text-2xl font-semibold leading-snug tracking-[0.01em]",
  h5: "text-base md:text-lg lg:text-xl font-semibold leading-snug tracking-[0.01em]",
  h6: "text-sm md:text-base lg:text-lg font-semibold leading-snug tracking-[0.01em]",
  
  // Specialized Text
  code: "font-mono text-sm bg-slate-100 px-1 py-0.5 rounded tracking-wide",
  link: "text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors",
  large: "text-lg md:text-xl leading-relaxed tracking-[0.01em] font-normal",
  small: "text-xs md:text-sm leading-normal tracking-[0.025em] font-normal",
  
  // Additional properties for compatibility
  bodyDefault: "text-base md:text-lg leading-relaxed tracking-[0.01em] font-normal",
  default: "text-base md:text-lg leading-relaxed tracking-[0.01em] font-normal",
  caption: "text-xs leading-normal tracking-[0.025em] font-normal",
  labelSmall: "text-xs font-medium leading-tight tracking-[0.025em]",
  label: "text-sm md:text-base font-medium leading-none tracking-[0.01em]",
  vital: "text-lg md:text-xl font-mono tabular-nums font-medium leading-snug",
  note: "text-base md:text-lg font-normal leading-relaxed tracking-[0.01em]",
  
  // Add missing properties
  measurement: "text-lg md:text-xl font-mono tabular-nums font-medium leading-snug",
} as const;

// Medical-specific typography
export const medicalTypography = {
  patientName: "text-2xl md:text-3xl font-semibold leading-tight tracking-[-0.01em]",
  diagnosis: "text-xl md:text-2xl font-semibold leading-snug tracking-[0.01em]",
  vitals: "text-lg md:text-xl font-mono tabular-nums font-medium leading-snug",
  labResults: "text-base md:text-lg font-mono tabular-nums font-normal leading-relaxed",
  clinicalNotes: "text-base md:text-lg font-normal leading-relaxed tracking-[0.01em]",
  medication: "text-sm md:text-base font-medium leading-normal",
  dosage: "text-xs md:text-sm font-mono tabular-nums font-normal leading-normal",
  status: "text-xs font-medium leading-tight tracking-[0.025em]",
} as const;

// Component-specific typography
export const componentTypography = {
  // Navigation
  navTitle: "text-lg md:text-xl font-semibold leading-snug tracking-[0.01em]",
  navItem: "text-base font-medium leading-normal tracking-[0.01em]",
  
  // Buttons
  buttonLarge: "text-base md:text-lg font-medium leading-none tracking-[0.01em]",
  buttonDefault: "text-sm md:text-base font-medium leading-none tracking-[0.01em]", 
  buttonSmall: "text-xs md:text-sm font-medium leading-none tracking-[0.025em]",
  
  // Forms
  label: "text-sm md:text-base font-medium leading-none tracking-[0.01em]",
  input: "text-base md:text-lg font-normal leading-relaxed tracking-[0.01em]",
  
  // Cards
  cardTitle: "text-lg md:text-xl font-semibold leading-snug tracking-[0.01em]",
  cardBody: "text-base md:text-lg font-normal leading-relaxed tracking-[0.01em]",
  cardCaption: "text-xs md:text-sm font-normal leading-normal tracking-[0.025em]",
  
  // Tables
  tableHeader: "text-sm md:text-base font-semibold leading-none tracking-[0.01em]",
  tableCell: "text-sm md:text-base font-normal leading-normal tracking-[0.01em]",
  
  // Alerts
  alertTitle: "text-base md:text-lg font-semibold leading-snug tracking-[0.01em]",
  alertBody: "text-sm md:text-base font-normal leading-relaxed tracking-[0.01em]",
} as const;

// Status typography with semantic colors
export const statusTypography = {
  critical: "font-semibold text-red-500",
  warning: "font-medium text-amber-500", 
  success: "font-medium text-green-500",
  info: "font-medium text-blue-500",
  neutral: "font-normal text-gray-500",
} as const;

// Helper functions for dynamic styling
export const vitalSignsText = (status: 'normal' | 'elevated' | 'critical') => {
  const base = "font-medium font-mono tabular-nums";
  switch (status) {
    case 'normal': return `${base} text-green-500`;
    case 'elevated': return `${base} text-amber-500`;
    case 'critical': return `${base} text-red-500`;
    default: return `${base} text-gray-500`;
  }
};

export const medicalPriorityText = (priority: 'low' | 'medium' | 'high' | 'urgent') => {
  const base = "font-semibold";
  switch (priority) {
    case 'low': return `${base} text-green-500`;
    case 'medium': return `${base} text-amber-500`;
    case 'high': return `${base} text-orange-500`;
    case 'urgent': return `${base} text-red-500`;
    default: return `${base} text-gray-500`;
  }
};

export const clinicalStatusText = (status: 'stable' | 'monitoring' | 'acute' | 'chronic') => {
  const base = "font-medium";
  switch (status) {
    case 'stable': return `${base} text-green-500`;
    case 'monitoring': return `${base} text-amber-500`;
    case 'acute': return `${base} text-red-500`;
    case 'chronic': return `${base} text-blue-500`;
    default: return `${base} text-gray-500`;
  }
};

export const treatmentStatusText = (status: 'complete' | 'ongoing' | 'pending' | 'emergency') => {
  const base = "font-semibold";
  switch (status) {
    case 'complete': return `${base} text-green-500`;
    case 'ongoing': return `${base} text-blue-500`;
    case 'pending': return `${base} text-amber-500`;
    case 'emergency': return `${base} text-red-500`;
    default: return `${base} text-gray-500`;
  }
};

// Additional utility functions that components expect
export const createTypographyClass = (variant: keyof typeof typography, additionalClasses?: string) => {
  return `${typography[variant]} ${additionalClasses || ''}`.trim();
};

export const responsiveType = (baseClass: string, responsive?: { sm?: string; md?: string; lg?: string }) => {
  let classes = baseClass;
  if (responsive?.sm) classes += ` sm:${responsive.sm}`;
  if (responsive?.md) classes += ` md:${responsive.md}`;
  if (responsive?.lg) classes += ` lg:${responsive.lg}`;
  return classes;
};

export const formatMedicalMeasurement = (value: number, unit: string) => {
  return `${value} ${unit}`;
};

export const fontWeight = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const;

// Typography tokens for design system integration
export const typographyTokens = {
  fontFamily: {
    sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
    mono: ['SF Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px  
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  fontWeight: {
    normal: '400',
    medium: '500', 
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
  },
  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em', 
    normal: '0',
    wide: '0.01em',
    wider: '0.025em',
  },
} as const;

// Export default for backward compatibility
export default typography;
