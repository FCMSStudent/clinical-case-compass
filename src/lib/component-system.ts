/**
 * PHASE 3: UNIFIED COMPONENT SYSTEM
 * Single source of truth for all component variants, interaction states, 
 * glassmorphic effects, layout primitives, and animation standards
 * Clinical Case Compass - Medical Application Design System
 */

import { Variants } from "framer-motion";
import { designTokens } from "./design-tokens";

// ────────────────────────────────────────────────────────────────────────────────
// INTERACTION STATE STANDARDS
// ────────────────────────────────────────────────────────────────────────────────

/** Standardized interaction states for all components */
export const interactionStates = {
  // Base states
  base: "transition-all duration-200 ease-out",
  
  // Hover states with consistent glassmorphic effects
  hover: {
    subtle: "hover:bg-white/10 hover:border-white/20 hover:shadow-sm",
    light: "hover:bg-white/15 hover:border-white/20 hover:shadow-md",
    medium: "hover:bg-white/15 hover:border-white/25 hover:shadow-md hover:shadow-white/5",
    strong: "hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/10",
    elevated: "hover:bg-white/25 hover:border-white/35 hover:shadow-xl hover:shadow-white/15 hover:scale-[1.02]",
  },
  
  // Focus states with accessibility in mind
  focus: {
    default: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
    strong: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:scale-[1.02]",
    subtle: "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent",
  },
  
  // Active states for immediate feedback
  active: {
    subtle: "active:scale-[0.98] active:bg-white/5",
    medium: "active:scale-[0.96] active:bg-white/10",
    strong: "active:scale-[0.94] active:bg-white/15",
  },
  
  // Disabled states
  disabled: "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none",
  
  // Loading states
  loading: "animate-pulse pointer-events-none",
  
  // Selected states
  selected: {
    subtle: "bg-white/10 border-white/25 shadow-md",
    medium: "bg-white/15 border-white/30 shadow-lg",
    strong: "bg-white/20 border-white/35 shadow-xl",
  },
} as const;

// ────────────────────────────────────────────────────────────────────────────────
// GLASSMORPHIC EFFECT STANDARDS
// ────────────────────────────────────────────────────────────────────────────────

const _glassmorphicEffects = {
  // Base glassmorphic properties
  base: "backdrop-blur-md border border-white/20",
  
  // Background variants
  background: {
    subtle: "bg-white/5",
    light: "bg-white/10",
    medium: "bg-white/15",
    strong: "bg-white/20",
    elevated: "bg-white/25",
  },
  
  // Border variants
  border: {
    subtle: "border-white/10",
    light: "border-white/20",
    medium: "border-white/30",
    strong: "border-white/40",
    elevated: "border-white/50",
  },
  
  // Shadow variants
  shadow: {
    none: "",
    subtle: "shadow-sm shadow-black/5",
    light: "shadow-md shadow-black/10",
    medium: "shadow-lg shadow-black/15",
    strong: "shadow-xl shadow-black/20",
    elevated: "shadow-2xl shadow-black/25",
  },
};

/** Standardized glassmorphic effects across all components */
export const glassmorphicEffects = {
  ..._glassmorphicEffects,
  // Complete glassmorphic combinations
  variants: {
    subtle: `${_glassmorphicEffects.base} ${_glassmorphicEffects.background.subtle} ${_glassmorphicEffects.border.subtle} ${_glassmorphicEffects.shadow.subtle}`,
    light: `${_glassmorphicEffects.base} ${_glassmorphicEffects.background.light} ${_glassmorphicEffects.border.light} ${_glassmorphicEffects.shadow.light}`,
    medium: `${_glassmorphicEffects.base} ${_glassmorphicEffects.background.medium} ${_glassmorphicEffects.border.medium} ${_glassmorphicEffects.shadow.medium}`,
    strong: `${_glassmorphicEffects.base} ${_glassmorphicEffects.background.strong} ${_glassmorphicEffects.border.strong} ${_glassmorphicEffects.shadow.strong}`,
    elevated: `${_glassmorphicEffects.base} ${_glassmorphicEffects.background.elevated} ${_glassmorphicEffects.border.elevated} ${_glassmorphicEffects.shadow.elevated}`,
  },
} as const;

// ────────────────────────────────────────────────────────────────────────────────
// COMPONENT SIZE STANDARDS
// ────────────────────────────────────────────────────────────────────────────────

/** Standardized component sizes */
export const componentSizes = {
  // Button sizes
  button: {
    xs: "h-6 px-2 text-xs",
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    xl: "h-14 px-8 text-lg",
  },
  
  // Input sizes
  input: {
    xs: "h-6 px-2 text-xs",
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    xl: "h-14 px-8 text-lg",
  },
  
  // Icon sizes
  icon: {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
    "2xl": "h-10 w-10",
  },
  
  // Card padding
  card: {
    xs: "p-3",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  },
  
  // Spacing between elements
  spacing: {
    xs: "space-y-1",
    sm: "space-y-2",
    md: "space-y-3",
    lg: "space-y-4",
    xl: "space-y-6",
  },
} as const;

// ────────────────────────────────────────────────────────────────────────────────
// UNIFIED COMPONENT VARIANTS
// ────────────────────────────────────────────────────────────────────────────────

/** Unified button variants with consistent interaction states */
export const buttonVariants = {
  // Primary variants
  primary: `${glassmorphicEffects.variants.medium} ${interactionStates.base} ${interactionStates.hover.medium} ${interactionStates.focus.default} ${interactionStates.active.medium} ${interactionStates.disabled} text-white font-medium`,
  secondary: `${glassmorphicEffects.variants.light} ${interactionStates.base} ${interactionStates.hover.light} ${interactionStates.focus.default} ${interactionStates.active.subtle} ${interactionStates.disabled} text-white/90 font-medium`,
  outline: `${glassmorphicEffects.variants.subtle} ${interactionStates.base} ${interactionStates.hover.light} ${interactionStates.focus.default} ${interactionStates.active.subtle} ${interactionStates.disabled} text-white font-medium`,
  ghost: `${interactionStates.base} ${interactionStates.hover.subtle} ${interactionStates.focus.default} ${interactionStates.active.subtle} ${interactionStates.disabled} text-white/70 font-medium`,
  
  // Status variants
  success: `${glassmorphicEffects.variants.light} ${interactionStates.base} ${interactionStates.hover.light} ${interactionStates.focus.default} ${interactionStates.active.subtle} ${interactionStates.disabled} text-green-300 border-green-400/30 bg-green-500/10 font-medium`,
  warning: `${glassmorphicEffects.variants.light} ${interactionStates.base} ${interactionStates.hover.light} ${interactionStates.focus.default} ${interactionStates.active.subtle} ${interactionStates.disabled} text-yellow-300 border-yellow-400/30 bg-yellow-500/10 font-medium`,
  error: `${glassmorphicEffects.variants.light} ${interactionStates.base} ${interactionStates.hover.light} ${interactionStates.focus.default} ${interactionStates.active.subtle} ${interactionStates.disabled} text-red-300 border-red-400/30 bg-red-500/10 font-medium`,
  info: `${glassmorphicEffects.variants.light} ${interactionStates.base} ${interactionStates.hover.light} ${interactionStates.focus.default} ${interactionStates.active.subtle} ${interactionStates.disabled} text-blue-300 border-blue-400/30 bg-blue-500/10 font-medium`,
  
  // Medical-specific variants
  medical: `${glassmorphicEffects.variants.medium} ${interactionStates.base} ${interactionStates.hover.medium} ${interactionStates.focus.default} ${interactionStates.active.medium} ${interactionStates.disabled} text-white font-medium border-blue-400/30 bg-blue-500/15`,
  critical: `${glassmorphicEffects.variants.strong} ${interactionStates.base} ${interactionStates.hover.strong} ${interactionStates.focus.strong} ${interactionStates.active.strong} ${interactionStates.disabled} text-red-200 font-semibold border-red-400/40 bg-red-500/20`,
} as const;

/** Unified input variants */
export const inputVariants = {
  default: `${glassmorphicEffects.variants.light} ${interactionStates.base} ${interactionStates.hover.subtle} ${interactionStates.focus.default} ${interactionStates.disabled} text-white placeholder-white/50 font-medium`,
  elevated: `${glassmorphicEffects.variants.medium} ${interactionStates.base} ${interactionStates.hover.light} ${interactionStates.focus.default} ${interactionStates.disabled} text-white placeholder-white/50 font-medium`,
  subtle: `${glassmorphicEffects.variants.subtle} ${interactionStates.base} ${interactionStates.hover.subtle} ${interactionStates.focus.subtle} ${interactionStates.disabled} text-white/90 placeholder-white/40 font-medium`,
} as const;

/** Unified card variants */
export const cardVariants = {
  default: `${glassmorphicEffects.variants.light} ${interactionStates.base} ${interactionStates.hover.subtle} ${interactionStates.focus.subtle} text-white`,
  elevated: `${glassmorphicEffects.variants.medium} ${interactionStates.base} ${interactionStates.hover.light} ${interactionStates.focus.subtle} text-white`,
  interactive: `${glassmorphicEffects.variants.medium} ${interactionStates.base} ${interactionStates.hover.medium} ${interactionStates.focus.default} ${interactionStates.active.subtle} cursor-pointer text-white`,
  featured: `${glassmorphicEffects.variants.strong} ${interactionStates.base} ${interactionStates.hover.strong} ${interactionStates.focus.default} ${interactionStates.active.subtle} text-white ring-1 ring-white/30`,
  compact: `${glassmorphicEffects.variants.subtle} ${interactionStates.base} ${interactionStates.hover.subtle} ${interactionStates.focus.subtle} text-white`,
  
  // Status cards
  success: `${glassmorphicEffects.variants.light} ${interactionStates.base} text-green-200 border-green-400/30 bg-green-500/10`,
  warning: `${glassmorphicEffects.variants.light} ${interactionStates.base} text-yellow-200 border-yellow-400/30 bg-yellow-500/10`,
  error: `${glassmorphicEffects.variants.light} ${interactionStates.base} text-red-200 border-red-400/30 bg-red-500/10`,
  info: `${glassmorphicEffects.variants.light} ${interactionStates.base} text-blue-200 border-blue-400/30 bg-blue-500/10`,
} as const;

// ────────────────────────────────────────────────────────────────────────────────
// LAYOUT PRIMITIVES & GRID SYSTEMS
// ────────────────────────────────────────────────────────────────────────────────

/** Standardized layout primitives */
export const layoutPrimitives = {
  // Container layouts
  container: {
    default: "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    narrow: "w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
    wide: "w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8",
    fluid: "w-full px-4 sm:px-6 lg:px-8",
  },
  
  // Flex layouts
  flex: {
    center: "flex items-center justify-center",
    between: "flex items-center justify-between",
    start: "flex items-center justify-start",
    end: "flex items-center justify-end",
    col: "flex flex-col",
    colCenter: "flex flex-col items-center",
    colBetween: "flex flex-col justify-between",
  },
  
  // Grid layouts
  grid: {
    responsive: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
    twoCol: "grid grid-cols-1 lg:grid-cols-2",
    threeCol: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    fourCol: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    autoFit: "grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
    autoFill: "grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))]",
  },
  
  // Spacing utilities
  spacing: {
    xs: "space-y-2",
    sm: "space-y-3",
    md: "space-y-4",
    lg: "space-y-6",
    xl: "space-y-8",
    "2xl": "space-y-12",
  },
  
  // Gap utilities
  gap: {
    xs: "gap-2",
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
    "2xl": "gap-12",
  },
} as const;

/** Enhanced bento grid system */
export const bentoGrid = {
  // Container variants
  container: {
    default: `${layoutPrimitives.grid.responsive} ${layoutPrimitives.gap.md}`,
    dense: `${layoutPrimitives.grid.responsive} ${layoutPrimitives.gap.sm}`,
    spacious: `${layoutPrimitives.grid.responsive} ${layoutPrimitives.gap.lg}`,
    autoFit: `${layoutPrimitives.grid.autoFit} ${layoutPrimitives.gap.md}`,
  },
  
  // Card span configurations
  span: {
    // Column spans
    col: {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
      5: "col-span-5",
      6: "col-span-6",
      // Responsive spans
      "1-sm-2": "col-span-1 sm:col-span-2",
      "1-md-2": "col-span-1 md:col-span-2",
      "1-md-3": "col-span-1 md:col-span-3",
      "2-lg-3": "col-span-2 lg:col-span-3",
      "2-md-3-lg-4": "col-span-2 md:col-span-3 lg:col-span-4",
      "3-lg-4": "col-span-3 lg:col-span-4",
      full: "col-span-full",
    },
    
    // Row spans
    row: {
      1: "row-span-1",
      2: "row-span-2",
      3: "row-span-3",
      4: "row-span-4",
    },
  },
  
  // Card size variants
  size: {
    compact: "min-h-[160px]",
    default: "min-h-[200px]",
    medium: "min-h-[240px]",
    large: "min-h-[280px]",
    hero: "min-h-[320px]",
    tall: "min-h-[380px]",
  },
  
  // Predefined card layouts
  layouts: {
    small: `${bentoGrid.span.col["1-sm-2"]} ${bentoGrid.size.compact}`,
    medium: `${bentoGrid.span.col["2-lg-3"]} ${bentoGrid.size.medium}`,
    large: `${bentoGrid.span.col["2-md-3-lg-4"]} ${bentoGrid.size.large}`,
    hero: `${bentoGrid.span.col["2-md-3-lg-4"]} ${bentoGrid.size.hero}`,
    wide: `${bentoGrid.span.col.full} ${bentoGrid.size.default}`,
    tall: `${bentoGrid.span.col["2-lg-3"]} ${bentoGrid.size.tall}`,
  },
} as const;

// ────────────────────────────────────────────────────────────────────────────────
// ANIMATION & TRANSITION STANDARDS
// ────────────────────────────────────────────────────────────────────────────────

/** Standardized animation variants */
export const animationVariants = {
  // Entrance animations
  fadeIn: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: 0.4, 
        ease: [0.23, 1, 0.32, 1] 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95, 
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      } 
    },
  } as Variants,
  
  // Glassmorphic entrance
  glassmorphicEntrance: {
    hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: "blur(0px)", 
      transition: { 
        duration: 0.6, 
        ease: [0.23, 1, 0.32, 1] 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -30, 
      scale: 0.95, 
      filter: "blur(10px)", 
      transition: { 
        duration: 0.3, 
        ease: "easeInOut" 
      } 
    },
  } as Variants,
  
  // Staggered animations
  staggeredContainer: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.2 
      } 
    },
  } as Variants,
  
  staggeredItem: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: 0.5, 
        ease: [0.23, 1, 0.32, 1] 
      } 
    },
  } as Variants,
  
  // Hover effects
  glassyHover: {
    initial: { scale: 1, rotateX: 0, rotateY: 0, filter: "brightness(1)" },
    hover: { 
      scale: 1.02, 
      rotateX: 2, 
      rotateY: 2, 
      filter: "brightness(1.1)", 
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      } 
    },
    tap: { 
      scale: 0.98, 
      transition: { 
        duration: 0.1 
      } 
    },
  } as Variants,
  
  // Floating animation
  floating: {
    initial: { y: 0 },
    animate: { 
      y: [-5, 5, -5], 
      transition: { 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      } 
    },
  } as Variants,
  
  // Pulse glow
  pulseGlow: {
    initial: { boxShadow: "0 0 0 0 rgba(255, 255, 255, 0.1)" },
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(255, 255, 255, 0.1)",
        "0 0 0 10px rgba(255, 255, 255, 0.05)",
        "0 0 0 0 rgba(255, 255, 255, 0.1)",
      ],
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      },
    },
  } as Variants,
  
  // Medical-specific animations
  medicalPulse: {
    initial: { scale: 1, opacity: 0.8 },
    animate: { 
      scale: [1, 1.05, 1], 
      opacity: [0.8, 1, 0.8], 
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      } 
    },
  } as Variants,
  
  // Accessibility-focused animations
  accessibility: {
    initial: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      } 
    },
    focus: { 
      scale: 1.05, 
      boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.3)", 
      transition: { 
        duration: 0.2 
      } 
    },
  } as Variants,
} as const;

/** Standardized transition classes */
export const transitions = {
  // Duration variants
  duration: {
    fast: "duration-150",
    default: "duration-200",
    slow: "duration-300",
    slower: "duration-500",
  },
  
  // Easing variants
  easing: {
    default: "ease-out",
    smooth: "ease-in-out",
    bounce: "ease-bounce",
    spring: "ease-spring",
  },
  
  // Property variants
  property: {
    all: "transition-all",
    colors: "transition-colors",
    transform: "transition-transform",
    opacity: "transition-opacity",
    shadow: "transition-shadow",
  },
  
  // Predefined combinations
  combinations: {
    default: "transition-all duration-200 ease-out",
    smooth: "transition-all duration-300 ease-in-out",
    fast: "transition-all duration-150 ease-out",
    slow: "transition-all duration-500 ease-out",
  },
} as const;

// ────────────────────────────────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// ────────────────────────────────────────────────────────────────────────────────

/** Get component styles with variants and sizes */
export const getComponentStyles = (
  component: 'button' | 'input' | 'card',
  variant?: string,
  size?: string
): string => {
  const variants = {
    button: buttonVariants,
    input: inputVariants,
    card: cardVariants,
  };
  
  const sizes = {
    button: componentSizes.button,
    input: componentSizes.input,
    card: componentSizes.card,
  };
  
  const componentVariants = variants[component];
  const componentSizes = sizes[component];
  
  const variantClass = variant && componentVariants[variant as keyof typeof componentVariants] 
    ? componentVariants[variant as keyof typeof componentVariants] 
    : componentVariants.default || componentVariants.primary;
  
  const sizeClass = size && componentSizes[size as keyof typeof componentSizes] 
    ? componentSizes[size as keyof typeof componentSizes] 
    : componentSizes.md || componentSizes.default;
  
  return `${variantClass} ${sizeClass}`.trim();
};

/** Get bento grid styles */
export const getBentoStyles = (
  type: 'container' | 'card',
  variant?: string,
  size?: string
): string => {
  if (type === 'container') {
    const containerVariant = variant || 'default';
    return bentoGrid.container[containerVariant as keyof typeof bentoGrid.container] || bentoGrid.container.default;
  }
  
  if (type === 'card') {
    const layoutVariant = variant || 'medium';
    const sizeVariant = size || 'default';
    
    const layoutClass = bentoGrid.layouts[layoutVariant as keyof typeof bentoGrid.layouts] || bentoGrid.layouts.medium;
    const sizeClass = bentoGrid.size[sizeVariant as keyof typeof bentoGrid.size] || bentoGrid.size.default;
    
    return `${layoutClass} ${sizeClass}`.trim();
  }
  
  return '';
};

/** Get glassmorphic styles */
export const getGlassmorphicStyles = (variant: keyof typeof glassmorphicEffects.variants = 'medium'): string => {
  return glassmorphicEffects.variants[variant];
};

/** Get interaction states */
export const getInteractionStates = (
  hover: keyof typeof interactionStates.hover = 'medium',
  focus: keyof typeof interactionStates.focus = 'default',
  active: keyof typeof interactionStates.active = 'subtle'
): string => {
  return `${interactionStates.base} ${interactionStates.hover[hover]} ${interactionStates.focus[focus]} ${interactionStates.active[active]} ${interactionStates.disabled}`.trim();
};

// ────────────────────────────────────────────────────────────────────────────────
// EXPORT UNIFIED COMPONENT SYSTEM
// ────────────────────────────────────────────────────────────────────────────────

export const componentSystem = {
  // Core systems
  interactionStates,
  glassmorphicEffects,
  componentSizes,
  
  // Component variants
  buttonVariants,
  inputVariants,
  cardVariants,
  
  // Layout systems
  layoutPrimitives,
  bentoGrid,
  
  // Animation systems
  animationVariants,
  transitions,
  
  // Utility functions
  getComponentStyles,
  getBentoStyles,
  getGlassmorphicStyles,
  getInteractionStates,
} as const;

export default componentSystem;
