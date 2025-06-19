// ────────────────────────────────────────────────────────────────────────────────
// APPLE-INSPIRED TYPOGRAPHY SYSTEM
// Based on Apple's Human Interface Guidelines (HIG)
// ────────────────────────────────────────────────────────────────────────────────

export const fontWeight = {
  regular: 'font-normal',   // 400 - Body text, captions
  medium: 'font-medium',    // 500 - Labels, emphasis
  semibold: 'font-semibold', // 600 - Headings, important text
  bold: 'font-bold',        // 700 - Large titles, critical info
} as const;

// Apple's typographic hierarchy with proper spacing and weights
export const typography = {
  // Large Title (iOS) - 34pt Semibold
  largeTitle: `text-4xl md:text-5xl lg:text-6xl ${fontWeight.semibold} leading-tight tracking-[-0.02em]`,
  
  // Title (iOS) - 28pt Semibold  
  title: `text-3xl md:text-4xl lg:text-5xl ${fontWeight.semibold} leading-tight tracking-[-0.01em]`,
  
  // Headline (iOS) - 17pt Semibold
  headline: `text-lg md:text-xl ${fontWeight.semibold} leading-snug tracking-[0.01em]`,
  
  // Body (iOS) - 17pt Regular with 22pt line height
  body: `text-base md:text-lg leading-relaxed tracking-[0.01em] ${fontWeight.regular}`,
  
  // Callout (iOS) - 16pt Regular
  callout: `text-sm md:text-base leading-relaxed tracking-[0.01em] ${fontWeight.regular}`,
  
  // Subheadline (iOS) - 15pt Regular
  subheadline: `text-sm md:text-base leading-normal tracking-[0.01em] ${fontWeight.regular}`,
  
  // Footnote (iOS) - 13pt Regular
  footnote: `text-xs md:text-sm leading-normal tracking-[0.025em] ${fontWeight.regular}`,
  
  // Caption 1 (iOS) - 12pt Regular
  caption1: `text-xs leading-normal tracking-[0.025em] ${fontWeight.regular}`,
  
  // Caption 2 (iOS) - 11pt Regular
  caption2: `text-xs leading-tight tracking-[0.025em] ${fontWeight.regular}`,

  // Backward compatibility aliases
  h1: `text-2xl md:text-3xl lg:text-4xl ${fontWeight.semibold} leading-tight tracking-[-0.01em]`,
  h2: `text-xl md:text-2xl lg:text-3xl ${fontWeight.semibold} leading-snug tracking-[0.01em]`,
  h3: `text-lg md:text-xl ${fontWeight.semibold} leading-snug tracking-[0.01em]`,
  h4: `text-base md:text-lg ${fontWeight.semibold} leading-normal tracking-[0.01em]`,
  h5: `text-sm md:text-base ${fontWeight.semibold} leading-normal tracking-[0.01em]`,
  h6: `text-xs md:text-sm ${fontWeight.semibold} leading-normal tracking-[0.025em]`,
  
  bodyDefault: `text-base md:text-lg leading-relaxed tracking-[0.01em] ${fontWeight.regular}`,
  bodySmall: `text-sm md:text-base leading-normal tracking-[0.01em] ${fontWeight.regular}`,
  caption: `text-xs leading-normal tracking-[0.025em] ${fontWeight.regular}`,
  label: `text-sm md:text-base ${fontWeight.medium} leading-none tracking-[0.01em]`,
  labelSmall: `text-xs md:text-sm ${fontWeight.medium} leading-none tracking-[0.025em]`,
  
  // Medical-specific additions
  vital: `text-lg md:text-xl font-mono tabular-nums ${fontWeight.medium} leading-snug`,
  measurement: `text-base md:text-lg font-mono tabular-nums ${fontWeight.regular} leading-relaxed`,
  dosage: `text-xs md:text-sm font-mono tabular-nums ${fontWeight.regular} leading-normal`,
  diagnosis: `text-xl md:text-2xl ${fontWeight.semibold} leading-snug tracking-[0.01em]`,
  note: `text-base md:text-lg ${fontWeight.regular} leading-relaxed tracking-[0.01em]`,
} as const;

// Medical-specific typography with Apple-inspired hierarchy
export const medicalTypography = {
  // Patient name - Large Title weight
  patientName: `text-2xl md:text-3xl ${fontWeight.semibold} leading-tight tracking-[-0.01em]`,
  
  // Diagnosis - Title weight
  diagnosis: `text-xl md:text-2xl ${fontWeight.semibold} leading-snug tracking-[0.01em]`,
  
  // Vital signs - Headline weight with monospace for numbers
  vitals: `text-lg md:text-xl font-mono tabular-nums ${fontWeight.medium} leading-snug`,
  
  // Lab results - Body weight with monospace
  labResults: `text-base md:text-lg font-mono tabular-nums ${fontWeight.regular} leading-relaxed`,
  
  // Clinical notes - Body weight
  clinicalNotes: `text-base md:text-lg ${fontWeight.regular} leading-relaxed tracking-[0.01em]`,
  
  // Medication - Subheadline weight
  medication: `text-sm md:text-base ${fontWeight.medium} leading-normal`,
  
  // Dosage - Caption weight with monospace
  dosage: `text-xs md:text-sm font-mono tabular-nums ${fontWeight.regular} leading-normal`,
  
  // Status indicators - Caption weight
  status: `text-xs ${fontWeight.medium} leading-tight tracking-[0.025em]`,
} as const;

// Component-specific typography
export const componentTypography = {
  // Navigation
  navTitle: `text-lg md:text-xl ${fontWeight.semibold} leading-snug tracking-[0.01em]`,
  navItem: `text-base ${fontWeight.medium} leading-normal tracking-[0.01em]`,
  
  // Buttons
  buttonLarge: `text-base md:text-lg ${fontWeight.medium} leading-none tracking-[0.01em]`,
  buttonDefault: `text-sm md:text-base ${fontWeight.medium} leading-none tracking-[0.01em]`,
  buttonSmall: `text-xs md:text-sm ${fontWeight.medium} leading-none tracking-[0.025em]`,
  
  // Forms
  label: `text-sm md:text-base ${fontWeight.medium} leading-none tracking-[0.01em]`,
  input: `text-base md:text-lg ${fontWeight.regular} leading-relaxed tracking-[0.01em]`,
  placeholder: `placeholder:text-base placeholder:leading-relaxed placeholder:tracking-[0.01em]`,
  
  // Cards
  cardTitle: `text-lg md:text-xl ${fontWeight.semibold} leading-snug tracking-[0.01em]`,
  cardBody: `text-base md:text-lg ${fontWeight.regular} leading-relaxed tracking-[0.01em]`,
  cardCaption: `text-xs md:text-sm ${fontWeight.regular} leading-normal tracking-[0.025em]`,
  
  // Tables
  tableHeader: `text-sm md:text-base ${fontWeight.semibold} leading-none tracking-[0.01em]`,
  tableCell: `text-sm md:text-base ${fontWeight.regular} leading-normal tracking-[0.01em]`,
  
  // Alerts and notifications
  alertTitle: `text-base md:text-lg ${fontWeight.semibold} leading-snug tracking-[0.01em]`,
  alertBody: `text-sm md:text-base ${fontWeight.regular} leading-relaxed tracking-[0.01em]`,
} as const;

// Status-based typography with Apple-inspired colors
export const statusTypography = {
  critical: `${fontWeight.semibold} text-red-500`,
  warning: `${fontWeight.medium} text-amber-500`,
  success: `${fontWeight.medium} text-green-500`,
  info: `${fontWeight.medium} text-blue-500`,
  neutral: `${fontWeight.regular} text-gray-500`,
} as const;

// Accessibility and high-contrast variants
export const accessibleTypography = {
  critical: `${fontWeight.bold} text-red-400 bg-red-900/20 px-2 py-1 rounded`,
  warning: `${fontWeight.semibold} text-amber-400 bg-amber-900/20 px-2 py-1 rounded`,
  success: `${fontWeight.semibold} text-green-400 bg-green-900/20 px-2 py-1 rounded`,
  vital: `${fontWeight.medium} font-mono text-lg bg-slate-800/50 px-2 py-1 rounded`,
} as const;

// Responsive type scale for fluid typography
export const responsiveType = {
  // Hero text with fluid scaling
  hero: 'text-3xl md:text-4xl lg:text-6xl xl:text-7xl',
  
  // Display text
  display: 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
  
  // Section headings
  h1: 'text-2xl md:text-3xl lg:text-4xl',
  h2: 'text-xl md:text-2xl lg:text-3xl',
  h3: 'text-lg md:text-xl lg:text-2xl',
  h4: 'text-base md:text-lg lg:text-xl',
  
  // Body text with fluid scaling
  body: 'text-sm md:text-base lg:text-lg',
  bodyLarge: 'text-base md:text-lg lg:text-xl',
  
  // Caption and small text
  caption: 'text-xs md:text-sm',
  small: 'text-xs',
} as const;

// Medical context functions with Apple-inspired styling
export const vitalSignsText = (status: 'normal' | 'elevated' | 'critical') => {
  const statusMap = {
    normal: 'text-green-500',
    elevated: 'text-amber-500', 
    critical: 'text-red-500'
  };
  return `${statusMap[status]} ${fontWeight.medium}`;
};

export const medicalPriorityText = (priority: 'low' | 'medium' | 'high' | 'urgent') => {
  const priorityMap = {
    low: 'text-green-500',
    medium: 'text-amber-500',
    high: 'text-orange-500',
    urgent: 'text-red-500'
  };
  return `${priorityMap[priority]} ${fontWeight.semibold}`;
};

export const clinicalStatusText = (status: 'stable' | 'monitoring' | 'acute' | 'chronic') => {
  const statusMap = {
    stable: 'text-green-500',
    monitoring: 'text-amber-500',
    acute: 'text-red-500',
    chronic: 'text-blue-500'
  };
  return `${statusMap[status]} ${fontWeight.medium}`;
};

export const treatmentStatusText = (status: 'complete' | 'ongoing' | 'pending' | 'emergency') => {
  const statusMap = {
    complete: 'text-green-500',
    ongoing: 'text-blue-500',
    pending: 'text-amber-500',
    emergency: 'text-red-500'
  };
  return `${statusMap[status]} ${fontWeight.semibold}`;
};

// Utility function to create typography classes
export const createTypographyClass = (
  variant: keyof typeof typography | keyof typeof medicalTypography | keyof typeof componentTypography | keyof typeof responsiveType,
  additionalClasses = ''
) => {
  if (variant in responsiveType) {
    return `${responsiveType[variant as keyof typeof responsiveType]} ${additionalClasses}`.trim();
  }
  if (variant in typography) {
    return `${typography[variant as keyof typeof typography]} ${additionalClasses}`.trim();
  }
  if (variant in medicalTypography) {
    return `${medicalTypography[variant as keyof typeof medicalTypography]} ${additionalClasses}`.trim();
  }
  if (variant in componentTypography) {
    return `${componentTypography[variant as keyof typeof componentTypography]} ${additionalClasses}`.trim();
  }
  return additionalClasses;
};

// Glass text container for liquid glass effect
export const glassTextContainer = 'backdrop-blur-md bg-white/10 rounded-lg px-3 py-2';

// Medical measurement formatting
export const formatMedicalMeasurement = (value: string, unit: string, status: 'normal' | 'elevated' | 'critical') => {
  return {
    value,
    unit,
    className: `${vitalSignsText(status)} font-mono tabular-nums`
  };
};

// Compatibility exports for backward compatibility
export const typo = typography;
export const medicalText = medicalTypography;
export const accessible = accessibleTypography;
