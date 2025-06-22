// ────────────────────────────────────────────────────────────────────────────────
// APPLE-INSPIRED LIQUID GLASS EFFECTS
// ────────────────────────────────────────────────────────────────────────────────

import { motionTokens } from '../animations/motion';
import { shadows } from '../tokens/spacing';

/**
 * Apple-inspired liquid glass effect utilities
 */
export const liquidGlassEffects = {
  /**
   * Apply glass reflection effect
   */
  reflection: {
    subtle: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
    medium: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)",
    strong: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 70%)",
  },

  /**
   * Inner shadow effects for depth - enhanced with softer highlights
   */
  innerShadow: {
    subtle: shadows.innerHighlight,
    medium: shadows.innerHighlightMedium,
    strong: shadows.innerHighlightStrong,
  },

  /**
   * Enhanced backdrop filters with Apple-style frosted glass
   */
  backdrop: {
    light: "blur(20px) brightness(1.1)",
    medium: "blur(30px) saturate(150%) brightness(1.05)",
    heavy: "blur(50px) saturate(180%) contrast(1.1)",
    frosted: "blur(40px) saturate(180%)",
    ultra: "blur(60px) saturate(200%) contrast(1.15)",
    subtle: "blur(12px) brightness(1.05)",
    navigation: "blur(24px) saturate(160%) brightness(1.08)",
    modal: "blur(50px) saturate(200%) contrast(1.15)",
    card: "blur(18px) saturate(140%) brightness(1.06)",
    dropdown: "blur(28px) saturate(170%) brightness(1.07)",
    overlay: "blur(20px) brightness(1.05)",
    popover: "blur(40px) saturate(200%) contrast(1.15)",
  },

  /**
   * Enhanced overlay backdrop filters for frosted glass panels
   */
  overlayBackdrop: {
    light: "blur(20px) brightness(1.05)",
    medium: "blur(30px) saturate(150%) brightness(1.08)",
    heavy: "blur(40px) saturate(180%) contrast(1.1)",
    ultra: "blur(50px) saturate(200%) contrast(1.15)",
  },

  /**
   * Glass hover effects with enhanced frosted glass
   */
  hover: {
    subtle: {
      scale: 1.01,
      filter: "brightness(1.05) saturate(1.1)",
      transition: { duration: 0.2, ease: motionTokens.glassHover }
    },
    medium: {
      scale: 1.02,
      filter: "brightness(1.08) saturate(1.15)",
      transition: { duration: 0.3, ease: motionTokens.glassHover }
    },
    strong: {
      scale: 1.03,
      filter: "brightness(1.1) saturate(1.2)",
      transition: { duration: 0.4, ease: motionTokens.glassHover }
    }
  },

  /**
   * Glass focus states - enhanced with softer shadows
   */
  focus: {
    subtle: {
      scale: 1.01,
      filter: "brightness(1.1) saturate(1.05)",
      boxShadow: `0 0 0 3px rgba(255, 255, 255, 0.3), ${shadows.glassWithHighlight}`,
      transition: { duration: 0.2, ease: motionTokens.glassEnter }
    },
    medium: {
      scale: 1.02,
      filter: "brightness(1.15) saturate(1.1)",
      boxShadow: `0 0 0 4px rgba(255, 255, 255, 0.4), ${shadows.glassElevatedWithHighlight}`,
      transition: { duration: 0.2, ease: motionTokens.glassEnter }
    }
  },

  /**
   * Glass entrance animations with enhanced frosted glass effects
   */
  enter: {
    subtle: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.3, 
        ease: motionTokens.glassEnter 
      }
    },
    medium: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.4, 
        ease: motionTokens.glassEnter 
      }
    },
    strong: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.5, 
        ease: motionTokens.glassEnter 
      }
    }
  },

  /**
   * Glass exit animations
   */
  exit: {
    subtle: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)",
      transition: { 
        duration: 0.2, 
        ease: motionTokens.glassExit 
      }
    },
    medium: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)",
      transition: { 
        duration: 0.3, 
        ease: motionTokens.glassExit 
      }
    },
    strong: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(8px)",
      transition: { 
        duration: 0.4, 
        ease: motionTokens.glassExit 
      }
    }
  },

  /**
   * Pulsing effects for alerts and notifications
   */
  pulse: {
    gentle: {
      scale: [1, 1.02, 1],
      filter: ["brightness(1)", "brightness(1.05)", "brightness(1)"],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    critical: {
      scale: [1, 1.05, 1],
      filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    attention: {
      scale: [1, 1.03, 1],
      filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"],
      transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
    }
  },

  /**
   * Parallax effects for depth layers
   */
  parallax: {
    subtle: {
      y: [0, -10],
      transition: { duration: 0.8, ease: "easeOut" }
    },
    medium: {
      y: [0, -20],
      transition: { duration: 1.2, ease: "easeOut" }
    },
    strong: {
      y: [0, -30],
      transition: { duration: 1.6, ease: "easeOut" }
    }
  }
} as const;

/**
 * Apply liquid glass styles to an element
 */
export const applyLiquidGlass = (
  context: 'card' | 'navigation' | 'modal' | 'alert' | 'button' = 'card'
) => {
  const baseStyles = {
    backdropFilter: liquidGlassEffects.backdrop.medium,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    transition: `all ${motionTokens.duration.smooth} ${motionTokens.glassHover}`,
  };

  // Context-specific adjustments with softer shadows and inner highlights
  switch (context) {
    case 'navigation':
      return {
        ...baseStyles,
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
        backdropFilter: liquidGlassEffects.backdrop.navigation,
        boxShadow: shadows.glassWithHighlight,
      };
    case 'modal':
      return {
        ...baseStyles,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: liquidGlassEffects.backdrop.modal,
        boxShadow: shadows.glassModalWithHighlight,
      };
    case 'alert':
      return {
        ...baseStyles,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: liquidGlassEffects.backdrop.medium,
        boxShadow: shadows.glassElevatedWithHighlight,
      };
    case 'button':
      return {
        ...baseStyles,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: liquidGlassEffects.backdrop.light,
        boxShadow: shadows.glassWithHighlight,
      };
    default: // card
      return {
        ...baseStyles,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: liquidGlassEffects.backdrop.card,
        boxShadow: shadows.glassWithHighlight,
      };
  }
};

/**
 * Get glass hover variants for Framer Motion
 */
export const getGlassHoverVariants = (intensity: 'subtle' | 'medium' | 'strong' = 'medium') => {
  return {
    hover: liquidGlassEffects.hover[intensity],
    tap: {
      scale: 0.98,
      filter: "brightness(0.95)",
      transition: { duration: 0.15, ease: motionTokens.glassHover }
    },
    focus: liquidGlassEffects.focus[intensity === 'strong' ? 'medium' : 'subtle'],
    initial: {
      scale: 1,
      filter: "brightness(1)",
    }
  };
};

/**
 * Get glass transition variants for Framer Motion
 */
export const getGlassTransitionVariants = (intensity: 'subtle' | 'medium' = 'medium') => {
  return {
    initial: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)",
    },
    animate: liquidGlassEffects.enter[intensity],
    exit: liquidGlassEffects.exit[intensity]
  };
};

/**
 * Get pulsing animation for alerts
 */
export const getPulseAnimation = (type: 'gentle' | 'critical' | 'attention' = 'gentle') => {
  return liquidGlassEffects.pulse[type];
};

/**
 * Get parallax effect for depth
 */
export const getParallaxEffect = (intensity: 'subtle' | 'medium' | 'strong' = 'subtle') => {
  return liquidGlassEffects.parallax[intensity];
};

/**
 * Enhanced CSS classes for liquid glass effects with pseudo-element shine and depth
 */
export const liquidGlassClasses = {
  // Base glass classes with softer shadows
  base: 'backdrop-blur-md border border-white/20 transition-all duration-300 ease-out',
  
  // Enhanced auth container with frosted glass
  authContainer: 'bg-white/15 backdrop-blur-sm rounded-2xl border-white/20 shadow-lg shadow-[0_8px_32px_rgba(31,38,135,0.15)] relative before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none before:z-[1] after:absolute after:inset-[1px] after:rounded-[15px] after:bg-gradient-to-b after:from-white/10 after:via-transparent after:to-transparent after:pointer-events-none after:z-[2]',
  
  // Enhanced frosted glass input with icon integration
  authInput: 'bg-white/8 backdrop-blur-sm rounded-2xl border border-white/20 pl-12 pr-4 py-3 text-white placeholder:text-white/70 focus:ring-2 focus:ring-blue-300 focus:backdrop-blur-md focus:border-2 focus:border-blue-400/50 hover:bg-white/15 transition-all duration-300 relative before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/3 before:to-transparent before:pointer-events-none',
  
  // Enhanced toggle with spring animation support
  authToggle: 'grid w-full grid-cols-2 rounded-2xl p-1 mb-8 relative overflow-hidden bg-white/12 backdrop-blur-sm border border-white/20 shadow-[0_4px_20px_rgba(255,255,255,0.2)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)]',
  
  // Enhanced button with depth and specular highlights
  authButton: 'w-full bg-white/12 backdrop-blur-sm rounded-2xl border border-white/20 py-3 px-4 text-white font-medium hover:bg-white/20 hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] hover:scale-[1.02] hover:brightness-105 focus:ring-2 focus:ring-blue-300 focus:backdrop-blur-md focus:border-2 focus:border-blue-400/50 transition-all duration-300 relative before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none',
  
  // Contextual variants with enhanced translucent backgrounds and softer shadows
  card: 'bg-white/8 backdrop-blur-[18px] saturate-140 brightness-106 shadow-[0_8px_32px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl',
  navigation: 'bg-white/18 backdrop-blur-[24px] saturate-160 brightness-108 shadow-[0_8px_32px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl',
  modal: 'bg-white/25 backdrop-blur-[50px] saturate-200 contrast-115 shadow-[0_16px_64px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl',
  alert: 'bg-white/20 backdrop-blur-[30px] saturate-150 brightness-105 shadow-[0_12px_48px_rgba(0,0,0,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl',
  button: 'bg-white/15 backdrop-blur-[20px] brightness-110 shadow-[0_8px_32px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl',
  dropdown: 'bg-white/15 backdrop-blur-[28px] saturate-170 brightness-107 shadow-[0_8px_32px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl',
  overlay: 'bg-white/10 backdrop-blur-[40px] saturate-180 contrast-110 shadow-[0_16px_64px_rgba(0,0,0,0.1)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl',
  input: 'bg-white/10 backdrop-blur-[16px] saturate-130 brightness-105 shadow-[0_2px_8px_rgba(0,0,0,0.04)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl',
  
  // Enhanced frosted glass overlay variants
  frostedOverlay: 'bg-white/25 backdrop-blur-[50px] saturate-200 contrast-115 shadow-[0_16px_64px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl border border-white/25',
  frostedModal: 'bg-white/25 backdrop-blur-[50px] saturate-200 contrast-115 shadow-[0_16px_64px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl border border-white/25',
  frostedPanel: 'bg-white/20 backdrop-blur-[40px] saturate-180 contrast-110 shadow-[0_12px_48px_rgba(0,0,0,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-2xl border border-white/25',
  frostedPopover: 'bg-white/25 backdrop-blur-[40px] saturate-200 contrast-115 shadow-[0_16px_64px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl border border-white/25',
  
  // Interactive states with enhanced shadows
  hover: 'hover:bg-white/25 hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:scale-[1.02] hover:brightness-105 hover:saturate-110',
  focus: 'focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105',
  
  // Elevation variants with softer shadows
  elevation50: 'bg-white/2 backdrop-blur-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl',
  elevation100: 'bg-white/5 backdrop-blur-[12px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl',
  elevation200: 'bg-white/8 backdrop-blur-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl',
  elevation300: 'bg-white/12 backdrop-blur-[20px] shadow-[0_12px_48px_rgba(0,0,0,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl',
  elevation400: 'bg-white/18 backdrop-blur-[24px] shadow-[0_16px_64px_rgba(0,0,0,0.1)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] rounded-xl',
} as const;

/**
 * Combine glass classes for different contexts
 */
export const getGlassClasses = (
  context: keyof typeof liquidGlassClasses = 'card',
  includeHover: boolean = true,
  includeFocus: boolean = true
) => {
  let classes = `${liquidGlassClasses.base} ${liquidGlassClasses[context]}`;
  
  if (includeHover) {
    classes += ` ${liquidGlassClasses.hover}`;
  }
  
  if (includeFocus) {
    classes += ` ${liquidGlassClasses.focus}`;
  }
  
  return classes;
};

/**
 * Enhanced translucent background variants with Apple-style frosted glass
 */
export const translucentBackgrounds = {
  // Ultra-light translucent backgrounds
  ultraLight: {
    white: "bg-white/5 backdrop-blur-[12px] brightness-105",
    gray: "bg-gray-500/5 backdrop-blur-[12px] brightness-105",
    tinted: "bg-white/3 backdrop-blur-[12px] brightness-105",
  },
  
  // Light translucent backgrounds
  light: {
    white: "bg-white/8 backdrop-blur-[18px] saturate-140 brightness-106",
    gray: "bg-gray-500/8 backdrop-blur-[18px] saturate-140 brightness-106",
    tinted: "bg-white/6 backdrop-blur-[18px] saturate-140 brightness-106",
  },
  
  // Medium translucent backgrounds
  medium: {
    white: "bg-white/12 backdrop-blur-[24px] saturate-160 brightness-108",
    gray: "bg-gray-500/12 backdrop-blur-[24px] saturate-160 brightness-108",
    tinted: "bg-white/10 backdrop-blur-[24px] saturate-160 brightness-108",
  },
  
  // Heavy translucent backgrounds
  heavy: {
    white: "bg-white/18 backdrop-blur-[30px] saturate-150 brightness-105",
    gray: "bg-gray-500/18 backdrop-blur-[30px] saturate-150 brightness-105",
    tinted: "bg-white/15 backdrop-blur-[30px] saturate-150 brightness-105",
  },
  
  // Ultra-heavy translucent backgrounds
  ultraHeavy: {
    white: "bg-white/25 backdrop-blur-[45px] saturate-190 contrast-112",
    gray: "bg-gray-500/25 backdrop-blur-[45px] saturate-190 contrast-112",
    tinted: "bg-white/20 backdrop-blur-[45px] saturate-190 contrast-112",
  },
  
  // Context-specific translucent backgrounds
  navigation: "bg-white/18 backdrop-blur-[24px] saturate-160 brightness-108",
  modal: "bg-white/25 backdrop-blur-[50px] saturate-200 contrast-115",
  card: "bg-white/8 backdrop-blur-[18px] saturate-140 brightness-106",
  dropdown: "bg-white/15 backdrop-blur-[28px] saturate-170 brightness-107",
  overlay: "bg-white/10 backdrop-blur-[40px] saturate-180 contrast-110",
  input: "bg-white/10 backdrop-blur-[16px] saturate-130 brightness-105",
  
  // Enhanced frosted glass overlay variants
  frostedOverlay: "bg-white/25 backdrop-blur-[50px] saturate-200 contrast-115",
  frostedModal: "bg-white/25 backdrop-blur-[50px] saturate-200 contrast-115",
  frostedPanel: "bg-white/20 backdrop-blur-[40px] saturate-180 contrast-110",
  frostedPopover: "bg-white/25 backdrop-blur-[40px] saturate-200 contrast-115",
  frostedSheet: "bg-white/25 backdrop-blur-[50px] saturate-200 contrast-115",
} as const;
