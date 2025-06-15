/**
 * TYPOGRAPHY UTILITIES
 * Easy-to-use functions and standardized class names for consistent typography
 * Clinical Case Compass - Typography System
 */

import { typography } from './design-tokens';
import { cn } from './utils';

// ────────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY CLASS GENERATORS
// ────────────────────────────────────────────────────────────────────────────────

/**
 * Generate display text classes
 * @param size - Display size variant
 * @param color - Text color (optional)
 */
export const displayText = (
  size: keyof typeof typography.display = 'md',
  color?: string
) => {
  const baseClass = typography.display[size];
  return color ? `${baseClass} ${color}` : baseClass;
};

/**
 * Generate heading classes
 * @param level - Heading level (h1-h6)
 * @param color - Text color (optional)
 */
export const headingText = (
  level: keyof typeof typography.heading = 'h2',
  color?: string
) => {
  const baseClass = typography.heading[level];
  return color ? `${baseClass} ${color}` : baseClass;
};

/**
 * Generate body text classes
 * @param size - Body text size variant
 * @param color - Text color (optional)
 */
export const bodyText = (
  size: keyof typeof typography.body = 'md',
  color?: string
) => {
  const baseClass = typography.body[size];
  return color ? `${baseClass} ${color}` : baseClass;
};

/**
 * Generate label classes
 * @param size - Label size variant
 * @param color - Text color (optional)
 */
export const labelText = (
  size: keyof typeof typography.label = 'md',
  color?: string
) => {
  const baseClass = typography.label[size];
  return color ? `${baseClass} ${color}` : baseClass;
};

/**
 * Generate code text classes
 * @param size - Code text size variant
 * @param color - Text color (optional)
 */
export const codeText = (
  size: keyof typeof typography.code = 'md',
  color?: string
) => {
  const baseClass = typography.code[size];
  return color ? `${baseClass} ${color}` : baseClass;
};

/**
 * Generate medical typography classes
 * @param type - Medical text type
 * @param color - Text color (optional)
 */
export const medicalText = (
  type: keyof typeof typography.medical,
  color?: string
) => {
  const baseClass = typography.medical[type];
  return color ? `${baseClass} ${color}` : baseClass;
};

// ────────────────────────────────────────────────────────────────────────────────
// PREDEFINED TYPOGRAPHY CLASSES
// ────────────────────────────────────────────────────────────────────────────────

/**
 * Commonly used typography class combinations
 */
export const typo = {
  // Display styles
  hero: displayText('2xl', 'text-foreground'),
  pageTitle: displayText('lg', 'text-foreground'),
  sectionTitle: displayText('md', 'text-foreground'),
  
  // Heading styles
  h1: headingText('h1', 'text-foreground'),
  h2: headingText('h2', 'text-foreground'),
  h3: headingText('h3', 'text-foreground'),
  h4: headingText('h4', 'text-foreground'),
  h5: headingText('h5', 'text-foreground'),
  h6: headingText('h6', 'text-foreground'),
  
  // Body text styles
  body: bodyText('md', 'text-foreground'),
  bodyLarge: bodyText('lg', 'text-foreground'),
  bodySmall: bodyText('sm', 'text-muted-foreground'),
  caption: bodyText('xs', 'text-muted-foreground'),
  
  // Label styles
  label: labelText('md', 'text-foreground'),
  labelSmall: labelText('sm', 'text-muted-foreground'),
  
  // Code styles
  code: codeText('md', 'text-foreground'),
  codeSmall: codeText('sm', 'text-muted-foreground'),
  
  // Medical styles
  vital: medicalText('vital', 'text-foreground'),
  vitalNormal: medicalText('vital', 'text-success'),
  vitalElevated: medicalText('vital', 'text-warning'),
  vitalCritical: medicalText('vital', 'text-error'),
  
  measurement: medicalText('measurement', 'text-foreground'),
  dosage: medicalText('dosage', 'text-foreground'),
  diagnosis: medicalText('diagnosis', 'text-foreground'),
  symptom: medicalText('symptom', 'text-foreground'),
  note: medicalText('note', 'text-muted-foreground'),
  
  // Interactive text
  link: 'text-sm font-medium text-primary hover:text-primary/80 underline-offset-4 hover:underline',
  button: 'text-sm font-medium',
  
  // Muted text
  muted: 'text-sm text-muted-foreground',
  mutedSmall: 'text-xs text-muted-foreground',
} as const;

// ────────────────────────────────────────────────────────────────────────────────
// MEDICAL TYPOGRAPHY UTILITIES
// ────────────────────────────────────────────────────────────────────────────────

/**
 * Get typography class for medical priority levels
 * @param priority - Priority level
 */
export const medicalPriorityText = (priority: 'low' | 'medium' | 'high' | 'urgent') => {
  const baseClass = labelText('md');
  const colorMap = {
    low: 'text-success',
    medium: 'text-warning',
    high: 'text-error',
    urgent: 'text-error font-bold'
  };
  return `${baseClass} ${colorMap[priority]}`;
};

/**
 * Get typography class for vital signs status
 * @param status - Vital sign status
 */
export const vitalSignsText = (status: 'normal' | 'elevated' | 'critical') => {
  const baseClass = medicalText('vital');
  const colorMap = {
    normal: 'text-success',
    elevated: 'text-warning',
    critical: 'text-error'
  };
  return `${baseClass} ${colorMap[status]}`;
};

/**
 * Get typography class for clinical status
 * @param status - Clinical status
 */
export const clinicalStatusText = (status: 'stable' | 'monitoring' | 'acute' | 'chronic') => {
  const baseClass = labelText('md');
  const colorMap = {
    stable: 'text-success',
    monitoring: 'text-warning',
    acute: 'text-error',
    chronic: 'text-info'
  };
  return `${baseClass} ${colorMap[status]}`;
};

/**
 * Get typography class for treatment status
 * @param status - Treatment status
 */
export const treatmentStatusText = (status: 'complete' | 'ongoing' | 'pending' | 'emergency') => {
  const baseClass = labelText('md');
  const colorMap = {
    complete: 'text-success',
    ongoing: 'text-info',
    pending: 'text-warning',
    emergency: 'text-error'
  };
  return `${baseClass} ${colorMap[status]}`;
};

// ────────────────────────────────────────────────────────────────────────────────
// TYPOGRAPHY COMPONENT UTILITIES
// ────────────────────────────────────────────────────────────────────────────────

/**
 * Typography component props interface
 */
export interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

/**
 * Create typography component classes
 * @param variant - Typography variant
 * @param className - Additional classes
 */
export const createTypographyClass = (variant: keyof typeof typo, className?: string) => {
  return cn(typo[variant], className);
};

/**
 * Medical measurement formatter
 * @param value - Measurement value
 * @param unit - Unit of measurement
 * @param status - Status for color coding
 */
export const formatMedicalMeasurement = (
  value: number | string,
  unit: string,
  status?: 'normal' | 'elevated' | 'critical'
) => {
  const statusClass = status ? vitalSignsText(status) : medicalText('measurement');
  return {
    value: value.toString(),
    unit,
    className: statusClass
  };
};

/**
 * Typography responsive classes
 */
export const responsiveType = {
  // Responsive headings
  h1: 'text-2xl md:text-3xl lg:text-4xl font-bold',
  h2: 'text-xl md:text-2xl lg:text-3xl font-bold',
  h3: 'text-lg md:text-xl lg:text-2xl font-semibold',
  h4: 'text-base md:text-lg lg:text-xl font-semibold',
  
  // Responsive body text
  body: 'text-sm md:text-base',
  bodyLarge: 'text-base md:text-lg',
  caption: 'text-xs md:text-sm',
  
  // Responsive display text
  hero: 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold',
  display: 'text-2xl md:text-3xl lg:text-4xl font-bold',
} as const;

/**
 * Export all typography utilities
 */
export {
  typography,
  typo as typographyClasses,
  responsiveType as responsive,
};

// ────────────────────────────────────────────────────────────────────────────────
// USAGE EXAMPLES
// ────────────────────────────────────────────────────────────────────────────────

/**
 * Usage examples:
 * 
 * // Basic usage
 * <h1 className={typo.h1}>Page Title</h1>
 * <p className={typo.body}>Body text content</p>
 * 
 * // Medical typography
 * <div className={typo.vital}>120/80</div>
 * <span className={vitalSignsText('elevated')}>Elevated</span>
 * 
 * // Custom combinations
 * <h2 className={createTypographyClass('h2', 'text-primary')}>
 *   Custom Heading
 * </h2>
 * 
 * // Responsive typography
 * <h1 className={responsiveType.hero}>Hero Title</h1>
 * 
 * // Medical measurements
 * const measurement = formatMedicalMeasurement(120, 'mmHg', 'normal');
 * <span className={measurement.className}>
 *   {measurement.value} {measurement.unit}
 * </span>
 */ 