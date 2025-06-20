export const fontWeight = {
  light: 'font-light',    // 300
  regular: 'font-normal', // 400
  medium: 'font-medium',  // 500
  semibold: 'font-semibold', // 600
  bold: 'font-bold',      // 700
  heavy: 'font-extrabold' // 800
} as const;

export const typography = {
  // Headings with optical adjustments
  h1: `text-4xl md:text-5xl lg:text-6xl ${fontWeight.bold} leading-tight tracking-[-0.02em] text-white`,
  h2: `text-3xl md:text-4xl lg:text-5xl ${fontWeight.bold} leading-tight tracking-[-0.01em] text-white`,
  h3: `text-2xl md:text-3xl lg:text-4xl ${fontWeight.semibold} leading-tight tracking-tight text-white`,
  h4: `text-xl md:text-2xl ${fontWeight.semibold} leading-snug text-white`,
  h5: `text-lg md:text-xl ${fontWeight.semibold} leading-snug text-white`,
  h6: `text-base md:text-lg ${fontWeight.semibold} leading-normal text-white`,
  
  // Body text with fluid scaling and optical adjustments
  body: {
    large: `text-lg md:text-xl lg:text-2xl leading-relaxed tracking-[0.01em] text-white ${fontWeight.regular}`,
    default: `text-base md:text-lg lg:text-xl leading-relaxed tracking-[0.01em] text-white ${fontWeight.regular}`,
    small: `text-sm md:text-base lg:text-lg leading-normal tracking-[0.01em] text-white/70 ${fontWeight.regular}`,
    caption: `text-xs md:text-sm leading-tight text-white/60 ${fontWeight.regular}`,
    toString: function() { return this.default; }
  },
  
  // Additional body text shortcuts
  bodyLarge: `text-lg md:text-xl lg:text-2xl leading-relaxed tracking-[0.01em] text-white ${fontWeight.regular}`,
  bodyDefault: `text-base md:text-lg lg:text-xl leading-relaxed tracking-[0.01em] text-white ${fontWeight.regular}`,
  bodySmall: `text-sm md:text-base lg:text-lg leading-normal tracking-[0.01em] text-white/70 ${fontWeight.regular}`,
  caption: `text-xs md:text-sm leading-tight text-white/60 ${fontWeight.regular}`,
  
  // Labels and form elements
  label: `text-sm md:text-base ${fontWeight.medium} leading-none text-white`,
  labelSmall: `text-xs md:text-sm ${fontWeight.medium} leading-none text-white/80`,
  description: `text-sm md:text-base leading-normal text-white/70`,
  placeholder: `placeholder:text-white/60`,
  
  // Medical specific
  vital: `text-lg md:text-xl font-mono tabular-nums text-white ${fontWeight.medium}`,
  measurement: `text-base md:text-lg font-mono tabular-nums text-white ${fontWeight.regular}`,
  
  // Component specific
  button: `text-sm md:text-base ${fontWeight.medium}`,
  link: `${fontWeight.medium} underline underline-offset-4`,
  code: `font-mono text-sm bg-white/10 px-2 py-1 rounded text-white/90`,
  
  // Medical text styles
  dosage: `font-mono text-sm text-white/90`,
  diagnosis: `${fontWeight.semibold} text-base md:text-lg text-white`,
  note: `text-sm md:text-base text-white/80`
} as const;

// Compatibility alias
export const typo = typography;

// Medical context colors and weights
export const medicalText = {
  critical: 'text-red-400 font-semibold',
  warning: 'text-amber-400 font-medium',
  stable: 'text-green-400 font-normal',
  inactive: 'text-white/40 font-normal'
} as const;

// Accessibility/high-contrast variants
export const accessible = {
  critical: 'text-red-300 font-bold bg-red-900/20 px-1 rounded',
  vital: 'text-white font-mono text-xl bg-slate-800/50 px-2 rounded'
} as const;

// Glass text container for liquid glass effect
export const glassTextContainer = 'backdrop-blur-md bg-white/10 rounded-lg px-2 py-1';

// Medical typography functions
export const vitalSignsText = (status: 'normal' | 'elevated' | 'critical') => {
  const statusMap = {
    normal: 'text-green-400',
    elevated: 'text-yellow-400', 
    critical: 'text-red-400'
  };
  return statusMap[status];
};

export const medicalPriorityText = (priority: 'low' | 'medium' | 'high' | 'urgent') => {
  const priorityMap = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-orange-400',
    urgent: 'text-red-400'
  };
  return priorityMap[priority];
};

export const clinicalStatusText = (status: 'stable' | 'monitoring' | 'acute' | 'chronic') => {
  const statusMap = {
    stable: 'text-green-400',
    monitoring: 'text-yellow-400',
    acute: 'text-red-400',
    chronic: 'text-blue-400'
  };
  return statusMap[status];
};

export const treatmentStatusText = (status: 'complete' | 'ongoing' | 'pending' | 'emergency') => {
  const statusMap = {
    complete: 'text-green-400',
    ongoing: 'text-blue-400',
    pending: 'text-yellow-400',
    emergency: 'text-red-400'
  };
  return statusMap[status];
};

export const formatMedicalMeasurement = (value: string, unit: string, status: 'normal' | 'elevated' | 'critical') => {
  return {
    value,
    unit,
    className: vitalSignsText(status)
  };
};

// Expanded responsive type scale
export const responsiveType = {
  hero: 'text-3xl md:text-4xl lg:text-6xl',
  display: 'text-2xl md:text-3xl lg:text-4xl',
  h1: 'text-2xl md:text-3xl lg:text-4xl',
  h2: 'text-xl md:text-2xl lg:text-3xl',
  body: 'text-sm md:text-base lg:text-lg',
  metric: 'text-lg md:text-xl lg:text-2xl',
  caption: 'text-xs md:text-sm',
};

export const createTypographyClass = (variant: keyof typeof typography | keyof typeof responsiveType, additionalClasses = '') => {
  if (variant in responsiveType) {
    return `${responsiveType[variant as keyof typeof responsiveType]} ${additionalClasses}`.trim();
  }
  if (variant in typography) {
    return `${typography[variant as keyof typeof typography]} ${additionalClasses}`.trim();
  }
  return additionalClasses;
};
