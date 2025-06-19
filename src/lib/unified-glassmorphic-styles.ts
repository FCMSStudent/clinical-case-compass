/**
 * Unified Glassmorphic Styles
 * Provides consistent glass effects across the entire application
 */

export type GlassVariant = 'subtle' | 'medium' | 'elevated' | 'strong';
export type GlassSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Base glassmorphic styles
 */
export const glassmorphicBase = {
  backdrop: 'backdrop-blur-md',
  border: 'border border-white/20',
  transition: 'transition-all duration-200',
} as const;

/**
 * Glass variants with different opacity levels
 */
export const glassVariants: Record<GlassVariant, string> = {
  subtle: 'bg-white/5',
  medium: 'bg-white/10',
  elevated: 'bg-white/15',
  strong: 'bg-white/20',
} as const;

/**
 * Hover states for glass variants
 */
export const glassHoverStates: Record<GlassVariant, string> = {
  subtle: 'hover:bg-white/10',
  medium: 'hover:bg-white/15',
  elevated: 'hover:bg-white/20',
  strong: 'hover:bg-white/25',
} as const;

/**
 * Glass sizes for consistent spacing
 */
export const glassSizes: Record<GlassSize, string> = {
  sm: 'p-3 rounded-lg',
  md: 'p-4 rounded-xl',
  lg: 'p-6 rounded-xl',
  xl: 'p-8 rounded-2xl',
} as const;

/**
 * Get complete glassmorphic class string
 */
export const getGlassClass = (
  variant: GlassVariant = 'medium',
  size: GlassSize = 'md',
  interactive: boolean = false
): string => {
  const baseClasses = [
    glassVariants[variant],
    glassmorphicBase.backdrop,
    glassmorphicBase.border,
    glassmorphicBase.transition,
    glassSizes[size],
  ];

  if (interactive) {
    baseClasses.push(glassHoverStates[variant]);
  }

  return baseClasses.join(' ');
};

/**
 * Specialized glass classes for common components
 */
export const glassComponents = {
  card: {
    default: getGlassClass('medium', 'lg'),
    interactive: getGlassClass('medium', 'lg', true),
    elevated: getGlassClass('elevated', 'lg'),
    subtle: getGlassClass('subtle', 'lg'),
  },
  button: {
    primary: getGlassClass('elevated', 'sm', true),
    secondary: getGlassClass('medium', 'sm', true),
    ghost: getGlassClass('subtle', 'sm', true),
  },
  modal: {
    backdrop: 'bg-black/50 backdrop-blur-sm',
    content: getGlassClass('strong', 'xl'),
  },
  navbar: {
    default: getGlassClass('medium', 'md'),
    floating: getGlassClass('elevated', 'md'),
  },
  input: {
    default: getGlassClass('subtle', 'sm', true),
    focused: 'focus:bg-white/15 focus:border-white/30',
  },
  tooltip: {
    default: getGlassClass('strong', 'sm'),
  },
} as const;

/**
 * Status-specific glass styles
 */
export const glassStatus = {
  success: 'bg-green-500/10 border-green-400/30',
  warning: 'bg-yellow-500/10 border-yellow-400/30',
  error: 'bg-red-500/10 border-red-400/30',
  info: 'bg-blue-500/10 border-blue-400/30',
} as const;

/**
 * Animation classes for glass effects
 */
export const glassAnimations = {
  fadeIn: 'animate-in fade-in duration-200',
  slideIn: 'animate-in slide-in-from-bottom-4 duration-300',
  scaleIn: 'animate-in zoom-in-95 duration-200',
  slideOut: 'animate-out slide-out-to-bottom-4 duration-200',
  fadeOut: 'animate-out fade-out duration-150',
} as const;

/**
 * Utility function to combine glass styles with custom classes
 */
export const combineGlassStyles = (
  glassStyle: string,
  customClasses?: string
): string => {
  return customClasses ? `${glassStyle} ${customClasses}` : glassStyle;
};

/**
 * Theme-aware glass styles that adjust based on theme colors
 */
export const getThemeAwareGlass = (
  variant: GlassVariant,
  themeColor: string,
  size: GlassSize = 'md'
): string => {
  const baseGlass = getGlassClass(variant, size);
  
  // Extract color values for theme-aware borders
  const themeAwareBorder = `border-[${themeColor}]/20`;
  
  return baseGlass.replace('border-white/20', themeAwareBorder);
};

/**
 * Responsive glass styles for mobile optimization
 */
export const responsiveGlass = {
  mobile: {
    card: getGlassClass('medium', 'md'),
    button: getGlassClass('medium', 'sm', true),
  },
  desktop: {
    card: getGlassClass('medium', 'lg'),
    button: getGlassClass('elevated', 'md', true),
  },
} as const;

/**
 * Performance-optimized glass styles (reduced blur for better performance)
 */
export const performanceGlass = {
  low: {
    backdrop: 'backdrop-blur-sm',
    base: 'bg-white/10 border border-white/20',
  },
  medium: {
    backdrop: 'backdrop-blur-md',
    base: 'bg-white/10 border border-white/20',
  },
  high: {
    backdrop: 'backdrop-blur-xl',
    base: 'bg-white/15 border border-white/30',
  },
} as const;