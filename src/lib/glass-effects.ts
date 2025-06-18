// ────────────────────────────────────────────────────────────────────────────────
// APPLE-INSPIRED LIQUID GLASS EFFECTS
// ────────────────────────────────────────────────────────────────────────────────

import { motionTokens } from './motion';

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
   * Inner shadow effects for depth
   */
  innerShadow: {
    subtle: "inset 0 1px 0 rgba(255, 255, 255, 0.3)",
    medium: "inset 0 2px 4px rgba(255, 255, 255, 0.2)",
    strong: "inset 0 4px 8px rgba(255, 255, 255, 0.15)",
  },

  /**
   * Enhanced backdrop filters
   */
  backdrop: {
    light: "blur(20px) brightness(1.1)",
    medium: "blur(30px) saturate(150%) brightness(1.05)",
    heavy: "blur(50px) saturate(180%) contrast(1.1)",
    frosted: "blur(40px) saturate(180%)",
  },

  /**
   * Glass hover states with micro-interactions
   */
  hover: {
    subtle: {
      scale: 1.02,
      filter: "brightness(1.05) saturate(1.1)",
      transition: { duration: 0.3, ease: motionTokens.glassHover }
    },
    medium: {
      scale: 1.03,
      filter: "brightness(1.1) saturate(1.15)",
      transition: { duration: 0.3, ease: motionTokens.glassHover }
    },
    strong: {
      scale: 1.05,
      filter: "brightness(1.15) saturate(1.2)",
      transition: { duration: 0.3, ease: motionTokens.glassHover }
    }
  },

  /**
   * Glass focus states
   */
  focus: {
    subtle: {
      scale: 1.01,
      filter: "brightness(1.1) saturate(1.05)",
      boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.2, ease: motionTokens.glassEnter }
    },
    medium: {
      scale: 1.02,
      filter: "brightness(1.15) saturate(1.1)",
      boxShadow: "0 0 0 4px rgba(255, 255, 255, 0.4), 0 12px 40px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.2, ease: motionTokens.glassEnter }
    }
  },

  /**
   * Glass entrance animations
   */
  enter: {
    subtle: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: motionTokens.glassEnter }
    },
    medium: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: motionTokens.glassEnter }
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
      transition: { duration: 0.3, ease: motionTokens.glassExit }
    },
    medium: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(8px)",
      transition: { duration: 0.4, ease: motionTokens.glassExit }
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
  variant: 'subtle' | 'medium' | 'strong' = 'medium',
  context: 'card' | 'navigation' | 'modal' | 'alert' | 'button' = 'card'
) => {
  const baseStyles = {
    backdropFilter: liquidGlassEffects.backdrop.medium,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    transition: `all ${motionTokens.duration.smooth} ${motionTokens.glassHover}`,
  };

  // Context-specific adjustments
  switch (context) {
    case 'navigation':
      return {
        ...baseStyles,
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
        backdropFilter: liquidGlassEffects.backdrop.medium,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      };
    case 'modal':
      return {
        ...baseStyles,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: liquidGlassEffects.backdrop.heavy,
        boxShadow: '0 16px 64px rgba(0, 0, 0, 0.2)',
      };
    case 'alert':
      return {
        ...baseStyles,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: liquidGlassEffects.backdrop.medium,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      };
    case 'button':
      return {
        ...baseStyles,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: liquidGlassEffects.backdrop.light,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      };
    default: // card
      return {
        ...baseStyles,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: liquidGlassEffects.backdrop.light,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
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
 * CSS classes for liquid glass effects
 */
export const liquidGlassClasses = {
  // Base glass classes
  base: 'backdrop-blur-md border border-white/20 transition-all duration-300 ease-out',
  
  // Contextual variants
  card: 'bg-white/8 backdrop-blur-[20px] brightness-110 shadow-sm',
  navigation: 'bg-white/18 backdrop-blur-[30px] saturate-150 brightness-105 shadow-md',
  modal: 'bg-white/25 backdrop-blur-[50px] saturate-180 contrast-110 shadow-lg',
  alert: 'bg-white/20 backdrop-blur-[30px] saturate-150 brightness-105 shadow-md',
  button: 'bg-white/15 backdrop-blur-[20px] brightness-110 shadow-md',
  
  // Interactive states
  hover: 'hover:bg-white/25 hover:shadow-xl hover:shadow-white/10 hover:scale-[1.02] hover:brightness-105 hover:saturate-110',
  focus: 'focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105',
  
  // Elevation variants
  elevation50: 'bg-white/2 shadow-sm',
  elevation100: 'bg-white/5 shadow-sm',
  elevation200: 'bg-white/8 shadow-md',
  elevation300: 'bg-white/12 shadow-md',
  elevation400: 'bg-white/18 shadow-lg',
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