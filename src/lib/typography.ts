
export const typography = {
  // Headings
  h1: `text-4xl font-bold leading-tight tracking-tight text-white`,
  h2: `text-3xl font-bold leading-tight tracking-tight text-white`,
  h3: `text-2xl font-semibold leading-tight tracking-tight text-white`,
  h4: `text-xl font-semibold leading-snug text-white`,
  h5: `text-lg font-semibold leading-snug text-white`,
  h6: `text-base font-semibold leading-normal text-white`,
  
  // Body text
  body: {
    large: `text-lg leading-relaxed text-white`,
    default: `text-base leading-relaxed text-white`,
    small: `text-sm leading-normal text-white/70`,
    caption: `text-xs leading-tight text-white/60`
  },
  
  // Additional body text shortcuts
  bodyLarge: `text-lg leading-relaxed text-white`,
  bodyDefault: `text-base leading-relaxed text-white`,
  bodySmall: `text-sm leading-normal text-white/70`,
  caption: `text-xs leading-tight text-white/60`,
  
  // Labels and form elements
  label: `text-sm font-medium leading-none text-white`,
  labelSmall: `text-xs font-medium leading-none text-white/80`,
  description: `text-sm leading-normal text-white/70`,
  placeholder: `placeholder:text-white/60`,
  
  // Medical specific
  vital: `text-lg font-mono tabular-nums text-white`,
  measurement: `text-base font-mono tabular-nums text-white`
} as const;

// Compatibility alias
export const typo = typography;

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

export const responsiveType = {
  hero: 'text-3xl md:text-4xl lg:text-6xl',
  display: 'text-2xl md:text-3xl lg:text-4xl',
  h1: 'text-2xl md:text-3xl lg:text-4xl',
  body: 'text-sm md:text-base'
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
