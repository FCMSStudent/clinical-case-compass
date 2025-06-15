
/**
 * Comprehensive UI Design System
 * A centralized collection of design tokens, component styles, and utility classes
 * for building a consistent medical case management interface.
 */

// -----------------------------------------------------------------------------
// CORE DESIGN TOKENS
// -----------------------------------------------------------------------------

/** Color system with semantic tokens for the medical theme */
export const colors = {
  // Primary text colors
  primary: "text-white",
  secondary: "text-white/70", 
  muted: "text-white/60",
  error: "text-red-300",
  success: "text-green-300",
  warning: "text-yellow-300",
  
  // Background colors
  bg: {
    primary: "bg-white/10",
    secondary: "bg-white/5",
    elevated: "bg-white/20",
    overlay: "bg-white/10",
    error: "bg-red-500/10",
    success: "bg-green-500/10",
    warning: "bg-yellow-500/10"
  },
  
  // Border colors
  border: {
    default: "border-white/20",
    elevated: "border-white/30",
    error: "border-red-400/30",
    success: "border-green-400/30",
    warning: "border-yellow-400/30"
  }
} as const;

/** Typography scale with consistent font weights and sizes */
export const typography = {
  // Headings
  h1: `text-4xl font-bold leading-tight tracking-tight ${colors.primary}`,
  h2: `text-3xl font-bold leading-tight tracking-tight ${colors.primary}`,
  h3: `text-2xl font-semibold leading-tight tracking-tight ${colors.primary}`,
  h4: `text-xl font-semibold leading-snug ${colors.primary}`,
  h5: `text-lg font-semibold leading-snug ${colors.primary}`,
  h6: `text-base font-semibold leading-normal ${colors.primary}`,
  
  // Body text
  body: {
    large: `text-lg leading-relaxed ${colors.primary}`,
    default: `text-base leading-normal ${colors.primary}`,
    small: `text-sm leading-normal ${colors.secondary}`,
    caption: `text-xs leading-tight ${colors.muted}`
  },
  
  // Labels and form elements
  label: `text-sm font-medium leading-none ${colors.primary}`,
  description: `text-sm leading-normal ${colors.secondary}`,
  placeholder: `placeholder:${colors.muted}`
} as const;

/** Consistent spacing scale */
export const spacing = {
  // Component padding
  component: {
    xs: "p-2",
    sm: "p-3", 
    md: "p-4",
    lg: "p-6",
    xl: "p-8"
  },
  
  // Section spacing
  section: {
    xs: "space-y-2",
    sm: "space-y-4",
    md: "space-y-6", 
    lg: "space-y-8",
    xl: "space-y-12"
  },
  
  // Grid gaps
  grid: {
    xs: "gap-2",
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8"
  }
} as const;

/** Component sizing standards */
export const sizing = {
  // Input heights
  input: {
    sm: "h-8",
    md: "h-10", 
    lg: "h-12"
  },
  
  // Button heights
  button: {
    sm: "h-8 px-3",
    md: "h-10 px-4", 
    lg: "h-12 px-6"
  },
  
  // Icon sizes
  icon: {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-8 w-8"
  }
} as const;

// -----------------------------------------------------------------------------
// INTERACTIVITY & STATE STYLES
// -----------------------------------------------------------------------------

/** Enhanced focus ring for interactive elements */
export const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2";

/** Disabled state styling */
export const disabledState = "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed";

/** Loading state styling */
export const loadingState = "animate-pulse bg-white/10";

/** Smooth transitions for interactive elements */
export const transitions = {
  fast: "transition-all duration-150",
  default: "transition-all duration-200", 
  slow: "transition-all duration-300",
  colors: "transition-colors duration-200",
  transform: "transition-transform duration-200"
} as const;

/** Interactive states */
export const interactiveStates = {
  hover: "hover:bg-white/20 hover:border-white/30",
  active: "active:scale-[0.98]",
  focus: focusRing,
  disabled: disabledState
} as const;

// -----------------------------------------------------------------------------
// GLASSMORPHISM SYSTEM
// -----------------------------------------------------------------------------

/** Base glassmorphic effect */
export const glassmorphic = `backdrop-blur-md ${colors.border.default} ${transitions.default}`;

/** Standard glassmorphic backgrounds */
export const glass = {
  subtle: `${glassmorphic} ${colors.bg.primary}`,
  elevated: `${glassmorphic} ${colors.bg.elevated}`,
  overlay: `backdrop-blur-xl ${colors.border.default} ${colors.bg.overlay}`,
  card: `${glassmorphic} ${colors.bg.primary} rounded-xl shadow-sm`,
  cardElevated: `${glassmorphic} ${colors.bg.elevated} rounded-xl shadow-md`
} as const;

// -----------------------------------------------------------------------------
// COMPONENT BASE STYLES
// -----------------------------------------------------------------------------

/** Base styles for form inputs */
export const inputBase = `
  flex w-full rounded-xl text-sm 
  ${colors.primary} ${typography.placeholder}
  ${glass.subtle} ${focusRing} ${disabledState} 
  ${interactiveStates.hover} ${sizing.input.md}
`.trim();

/** Base styles for buttons */
export const buttonBase = `
  inline-flex items-center justify-center whitespace-nowrap rounded-xl 
  text-sm font-medium ${transitions.default} ${focusRing} ${disabledState}
  ${sizing.button.md}
`.trim();

/** Base styles for cards */
export const cardBase = glass.card;
export const cardElevated = glass.cardElevated;

// -----------------------------------------------------------------------------
// SEMANTIC COMPONENT STYLES
// -----------------------------------------------------------------------------

/** Medical form section styling */
export const medicalSection = {
  container: `${cardBase} ${spacing.section.md}`,
  header: `${spacing.component.lg}`,
  content: `${spacing.component.lg} pt-0`,
  title: `${typography.h5} flex items-center ${spacing.grid.sm}`
} as const;

/** Form field styling */
export const formField = {
  container: spacing.section.sm,
  label: typography.label,
  input: inputBase,
  description: typography.description,
  error: `${typography.body.small} ${colors.error}`
} as const;

/** Button variants using the design system */
export const buttonVariants = {
  primary: `${buttonBase} ${glass.elevated} ${colors.primary} hover:bg-white/30`,
  secondary: `${buttonBase} ${glass.subtle} ${colors.secondary} hover:bg-white/20`,
  outline: `${buttonBase} ${glass.subtle} ${colors.primary} ${colors.border.default} hover:bg-white/20`,
  ghost: `${buttonBase} ${colors.secondary} hover:bg-white/10`,
  destructive: `${buttonBase} ${colors.bg.error} ${colors.error} ${colors.border.error} hover:bg-red-500/20`,
  success: `${buttonBase} ${colors.bg.success} ${colors.success} ${colors.border.success} hover:bg-green-500/20`
} as const;

// -----------------------------------------------------------------------------
// LAYOUT UTILITIES
// -----------------------------------------------------------------------------

/** Common layout patterns */
export const layouts = {
  container: "w-full max-w-6xl mx-auto",
  grid: {
    responsive: "grid grid-cols-1 md:grid-cols-2",
    twoCol: `grid grid-cols-2 ${spacing.grid.md}`,
    threeCol: `grid grid-cols-3 ${spacing.grid.sm}`
  },
  flex: {
    between: "flex items-center justify-between",
    center: "flex items-center justify-center", 
    start: "flex items-center",
    col: "flex flex-col"
  }
} as const;

/** Responsive design utilities */
export const responsive = {
  hide: {
    mobile: "hidden md:block",
    desktop: "block md:hidden"
  },
  show: {
    mobile: "block md:hidden", 
    desktop: "hidden md:block"
  }
} as const;

// -----------------------------------------------------------------------------
// ANIMATION PRESETS
// -----------------------------------------------------------------------------

/** Animation utilities */
export const animations = {
  fadeIn: "animate-fade-in",
  spin: "animate-spin",
  pulse: "animate-pulse",
  bounce: "animate-bounce"
} as const;

// -----------------------------------------------------------------------------
// ICON STANDARDS
// -----------------------------------------------------------------------------

/** Standard icon sizing */
export const iconSizes = sizing.icon;

/** Icon with text alignment */
export const iconWithText = `${iconSizes.sm} flex-shrink-0`;

// -----------------------------------------------------------------------------
// ACCESSIBILITY UTILITIES
// -----------------------------------------------------------------------------

/** Screen reader only content */
export const srOnly = "sr-only";

/** High contrast focus indicators */
export const highContrastFocus = "focus:ring-white focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent";

// -----------------------------------------------------------------------------
// FORM SPECIFIC STYLES
// -----------------------------------------------------------------------------

/** Medical case form styling */
export const medicalForm = {
  section: medicalSection,
  field: formField,
  grid: `${layouts.grid.responsive} ${spacing.grid.md}`,
  actions: `${layouts.flex.between} ${spacing.component.md}`
} as const;

/** Export commonly used combinations */
export const commonStyles = {
  pageContainer: `${layouts.container} ${spacing.section.md}`,
  sectionCard: medicalSection.container,
  formGrid: medicalForm.grid,
  buttonPrimary: buttonVariants.primary,
  inputField: formField.input,
  iconButton: `${buttonBase} ${sizing.button.sm} ${glass.subtle}`
} as const;
