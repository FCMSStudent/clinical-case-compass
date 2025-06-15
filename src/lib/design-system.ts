import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { motion, Variants, Transition, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Stethoscope, Pill } from "lucide-react";
import { typography } from "./typography";
import { typographyTokens, colors, spacing, borderRadius, shadows } from "./design-tokens";
import { backgroundConfig } from "./background-config";

// ────────────────────────────────────────────────────────────────────────────────
// UNIFIED COMPONENT STYLES (from ui-styles.ts)
// ────────────────────────────────────────────────────────────────────────────────

/** Enhanced focus ring for interactive elements */
export const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

/** Disabled state styling */
export const disabledState = "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed";

/** Enhanced glassmorphic effect */
export const glassmorphic = `backdrop-blur-md border-white/20 transition-all duration-200 ease-out`;

/** Enhanced glassmorphic backgrounds with better depth */
export const glass = {
  subtle: `${glassmorphic} bg-white/10 shadow-sm`,
  elevated: `${glassmorphic} bg-white/15 shadow-md border-white/25`,
  overlay: `backdrop-blur-xl border-white/25 bg-white/10 shadow-lg`,
  card: `${glassmorphic} bg-white/10 rounded-xl shadow-sm border`,
  cardElevated: `${glassmorphic} bg-white/15 rounded-xl shadow-md border`
} as const;

/** Base styles for buttons */
export const buttonBase = `
  inline-flex items-center justify-center whitespace-nowrap rounded-xl 
  text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${disabledState}
  h-10 px-4
`.trim();

/** Button variants using the design system */
export const buttonVariants = {
  primary: `${buttonBase} bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 shadow-md`,
  secondary: `${buttonBase} bg-white/10 backdrop-blur-md text-white/70 border border-white/20 hover:bg-white/20`,
  outline: `${buttonBase} bg-transparent text-white border border-white/20 hover:bg-white/10`,
  ghost: `${buttonBase} bg-transparent text-white/70 hover:bg-white/10`,
  destructive: `${buttonBase} bg-red-500/10 text-red-300 border border-red-400/30 hover:bg-red-500/20`,
  success: `${buttonBase} bg-green-500/10 text-green-300 border border-green-400/30 hover:bg-green-500/20`,
  warning: `${buttonBase} bg-yellow-500/20 text-yellow-300 border border-yellow-400/30 hover:bg-yellow-500/20`,
  error: `${buttonBase} bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/20`,
  info: `${buttonBase} bg-blue-500/20 text-blue-300 border border-blue-400/30 hover:bg-blue-500/20`,
  medical: `${buttonBase} bg-sky-500/20 text-sky-300 border border-sky-400/30 hover:bg-sky-500/20`,
  critical: `${buttonBase} bg-red-600 text-white border border-red-500 hover:bg-red-700 font-bold`,
} as const;

// ────────────────────────────────────────────────────────────────────────────────
// THEME SYSTEM
// ────────────────────────────────────────────────────────────────────────────────

/** Theme Configuration Interface */
export interface ThemeConfig {
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    glass: {
      background: string;
      border: string;
      shadow: string;
      backdrop: string;
    };
    gradient: {
      primary: string;
      secondary: string;
      accent: string;
    };
    status: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };
  effects: {
    blur: string;
    shadow: string;
    border: string;
    glow: string;
  };
}

/** Predefined Theme Configurations */
export const themes: Record<string, ThemeConfig> = {
  medical: {
    name: "Medical Blue",
    description: "Professional medical theme with clinical blue tones",
    colors: {
      primary: "#0ea5e9",
      secondary: "#0284c7",
      accent: "#3b82f6",
      background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)",
      surface: "#f8fafc",
      text: "#ffffff",
      textSecondary: "rgba(255, 255, 255, 0.8)",
      border: "rgba(255, 255, 255, 0.2)",
      glass: {
        background: "rgba(255, 255, 255, 0.1)",
        border: "rgba(255, 255, 255, 0.2)",
        shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        backdrop: "blur(20px)",
      },
      gradient: {
        primary: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)",
        secondary: "linear-gradient(135deg, #0284c7 0%, #0c4a6e 100%)",
        accent: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
      },
      status: {
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",
      },
    },
    effects: {
      blur: "blur(20px)",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      glow: "0 0 20px rgba(59, 130, 246, 0.3)",
    },
  },
  emerald: {
    name: "Emerald Medical",
    description: "Fresh and modern medical theme with emerald accents",
    colors: {
      primary: "#10b981",
      secondary: "#059669",
      accent: "#34d399",
      background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
      surface: "#f0fdf4",
      text: "#ffffff",
      textSecondary: "rgba(255, 255, 255, 0.8)",
      border: "rgba(255, 255, 255, 0.2)",
      glass: {
        background: "rgba(255, 255, 255, 0.1)",
        border: "rgba(255, 255, 255, 0.2)",
        shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        backdrop: "blur(20px)",
      },
      gradient: {
        primary: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
        secondary: "linear-gradient(135deg, #059669 0%, #047857 100%)",
        accent: "linear-gradient(135deg, #34d399 0%, #6ee7b7 100%)",
      },
      status: {
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",
      },
    },
    effects: {
      blur: "blur(20px)",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      glow: "0 0 20px rgba(16, 185, 129, 0.3)",
    },
  },
  purple: {
    name: "Purple Medical",
    description: "Sophisticated medical theme with purple and violet tones",
    colors: {
      primary: "#8b5cf6",
      secondary: "#7c3aed",
      accent: "#a78bfa",
      background: "linear-gradient(135deg, #4c1d95 0%, #5b21b6 50%, #6d28d9 100%)",
      surface: "#faf5ff",
      text: "#ffffff",
      textSecondary: "rgba(255, 255, 255, 0.8)",
      border: "rgba(255, 255, 255, 0.2)",
      glass: {
        background: "rgba(255, 255, 255, 0.1)",
        border: "rgba(255, 255, 255, 0.2)",
        shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        backdrop: "blur(20px)",
      },
      gradient: {
        primary: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
        secondary: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
        accent: "linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)",
      },
      status: {
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",
      },
    },
    effects: {
      blur: "blur(20px)",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      glow: "0 0 20px rgba(139, 92, 246, 0.3)",
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────────
// COMPONENT DESIGN TOKENS
// ────────────────────────────────────────────────────────────────────────────────

/** Button System */
export const button = {
  base: `inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium 
         transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 
         focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent 
         disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed`,
  size: {
    default: 'h-10 px-4 text-sm',
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  },
  variant: {
    primary: 'bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 shadow-md',
    secondary: 'bg-white/10 backdrop-blur-md text-white/70 border border-white/20 hover:bg-white/20',
    outline: 'bg-transparent text-white border border-white/20 hover:bg-white/10',
    ghost: 'bg-transparent text-white/70 hover:bg-white/10',
    destructive: 'bg-red-500/10 text-red-300 border border-red-400/30 hover:bg-red-500/20',
  },
};

/** Input System */
export const input = {
  base: `flex w-full rounded-lg text-sm text-white placeholder:text-white/60 
         bg-white/10 backdrop-blur-md border border-white/20 
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 
         focus-visible:ring-offset-2 focus-visible:ring-offset-transparent 
         disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed 
         hover:bg-white/20 hover:border-white/30 transition-all duration-200 ease-out`,
  size: {
    default: 'h-10 px-4 text-sm',
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-4 text-base',
  },
};

/** Card System */
export const card = {
  base: `backdrop-blur-md border border-white/20 transition-all duration-200 ease-out rounded-xl`,
  variant: {
    default: 'bg-white/10 shadow-sm',
    elevated: 'bg-white/15 shadow-md border-white/25',
    interactive: 'bg-white/15 shadow-md hover:bg-white/25 hover:shadow-xl hover:shadow-white/10 cursor-pointer hover:scale-[1.01]',
    featured: 'bg-white/15 ring-1 ring-white/30 shadow-lg shadow-white/5',
    compact: 'bg-white/10 shadow-sm',
  },
  padding: {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  },
};

/** Bento Grid System */
export const bento = {
  container: {
    base: 'grid auto-rows-min grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    gap: {
      tight: 'gap-3',
      default: 'gap-4',
      loose: 'gap-6',
    },
  },
  card: {
    size: {
      compact: 'min-h-[160px]',
      default: 'min-h-[200px]',
      medium: 'min-h-[240px]',
      large: 'min-h-[280px]',
      hero: 'min-h-[320px]',
      tall: 'min-h-[380px]',
    },
    span: {
      small: 'col-span-1 sm:col-span-2',
      medium: 'col-span-2 lg:col-span-3',
      large: 'col-span-2 md:col-span-3 lg:col-span-4',
      hero: 'col-span-2 md:col-span-3 lg:col-span-4',
      wide: 'col-span-full lg:col-span-6',
      tall: 'col-span-2 lg:col-span-3',
    },
  },
};

// ────────────────────────────────────────────────────────────────────────────────
// ANIMATION SYSTEM
// ────────────────────────────────────────────────────────────────────────────────

/** Core Animation Variants */
export const animations = {
  // Entrance animations
  fadeIn: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3, ease: "easeInOut" } },
  } as Variants,
  
  // Glassmorphic entrance
  glassmorphicEntrance: {
    hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
    exit: { opacity: 0, y: -30, scale: 0.95, filter: "blur(10px)", transition: { duration: 0.3, ease: "easeInOut" } },
  } as Variants,

  // Staggered animations
  staggeredContainer: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  } as Variants,

  staggeredItem: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
  } as Variants,

  // Hover effects
  glassyHover: {
    initial: { scale: 1, rotateX: 0, rotateY: 0, filter: "brightness(1)" },
    hover: { scale: 1.02, rotateX: 2, rotateY: 2, filter: "brightness(1.1)", transition: { duration: 0.3, ease: "easeOut" } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  } as Variants,

  // Floating animation
  floating: {
    initial: { y: 0 },
    animate: { y: [-5, 5, -5], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } },
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
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  } as Variants,
} as const;

/** Transition Presets */
export const transitions = {
  fast: { duration: 0.15, ease: "easeOut" } as Transition,
  default: { duration: 0.2, ease: "easeOut" } as Transition,
  slow: { duration: 0.3, ease: "easeOut" } as Transition,
  spring: { type: "spring", stiffness: 100, damping: 20 } as Transition,
  optimized: { duration: 0.3, ease: [0.23, 1, 0.32, 1], type: "spring", stiffness: 100, damping: 20 } as Transition,
} as const;

// ────────────────────────────────────────────────────────────────────────────────
// THEME PROVIDER & CONTEXT
// ────────────────────────────────────────────────────────────────────────────────

interface ThemeContextType {
  currentTheme: ThemeConfig;
  setTheme: (themeName: string) => void;
  availableThemes: string[];
  getThemeNames: () => Array<{ name: string; description: string }>;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentThemeName, setCurrentThemeName] = useState<string>("medical");
  const currentTheme = themes[currentThemeName] || themes.medical;

  const setTheme = (themeName: string) => {
    if (themes[themeName]) {
      setCurrentThemeName(themeName);
      localStorage.setItem("selected-theme", themeName);
    }
  };

  const availableThemes = Object.keys(themes);
  const getThemeNames = () => Object.values(themes).map(theme => ({ name: theme.name, description: theme.description }));

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("selected-theme");
    if (savedTheme && themes[savedTheme]) {
      setCurrentThemeName(savedTheme);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    
    // Apply CSS custom properties
    Object.entries({
      "--theme-primary": currentTheme.colors.primary,
      "--theme-secondary": currentTheme.colors.secondary,
      "--theme-accent": currentTheme.colors.accent,
      "--theme-background": currentTheme.colors.background,
      "--theme-surface": currentTheme.colors.surface,
      "--theme-text": currentTheme.colors.text,
      "--theme-text-secondary": currentTheme.colors.textSecondary,
      "--theme-border": currentTheme.colors.border,
      "--theme-glass-bg": currentTheme.colors.glass.background,
      "--theme-glass-border": currentTheme.colors.glass.border,
      "--theme-glass-shadow": currentTheme.colors.glass.shadow,
      "--theme-glass-backdrop": currentTheme.colors.glass.backdrop,
      "--theme-blur": currentTheme.effects.blur,
      "--theme-shadow": currentTheme.effects.shadow,
      "--theme-border-width": currentTheme.effects.border,
      "--theme-glow": currentTheme.effects.glow,
    }).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    document.body.style.background = currentTheme.colors.background;
    return () => root.classList.remove('dark');
  }, [currentTheme]);

  return React.createElement(
    ThemeContext.Provider,
    { value: { currentTheme, setTheme, availableThemes, getThemeNames } },
    children
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// ────────────────────────────────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// ────────────────────────────────────────────────────────────────────────────────

/** Get glassmorphic styles */
export const getGlassmorphicStyles = (theme: ThemeConfig, variant: "default" | "elevated" | "subtle" | "light" = "default") => {
  const baseStyles = {
    backgroundColor: theme.colors.glass.background,
    backdropFilter: theme.colors.glass.backdrop,
    border: theme.colors.glass.border,
    boxShadow: theme.colors.glass.shadow,
  };

  switch (variant) {
    case "elevated":
      return {
        ...baseStyles,
        backgroundColor: theme.colors.glass.background.replace("0.1", "0.15"),
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
        border: theme.colors.glass.border.replace("0.2", "0.3"),
      };
    case "subtle":
      return {
        ...baseStyles,
        backgroundColor: theme.colors.glass.background.replace("0.1", "0.05"),
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
        border: theme.colors.glass.border.replace("0.2", "0.1"),
      };
    case "light":
        return {
          ...baseStyles,
          backgroundColor: theme.colors.glass.background.replace("0.1", "0.12"),
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
          border: theme.colors.glass.border.replace("0.2", "0.25"),
        };
    default:
      return baseStyles;
  }
};

/** Get component styles */
export const getComponentStyles = (component: 'button' | 'input' | 'card', variant?: string, size?: string) => {
  const componentMap = { button, input, card };
  const comp = componentMap[component];
  if (!comp) return '';
  
  let styles = comp.base;
  if (variant && 'variant' in comp && comp.variant) {
    const variantStyle = comp.variant[variant as keyof typeof comp.variant];
    if (variantStyle) styles += ` ${variantStyle}`;
  }
  if (size && 'size' in comp && comp.size) {
    const sizeStyle = comp.size[size as keyof typeof comp.size];
    if (sizeStyle) styles += ` ${sizeStyle}`;
  }
  
  return styles.trim();
};

/** Get bento grid styles */
export const getBentoStyles = (type: 'container' | 'card', variant?: string, size?: string) => {
  if (type === 'container') {
    const gap = variant || 'default';
    return `${bento.container.base} ${bento.container.gap[gap as keyof typeof bento.container.gap]}`;
  }
  
  if (type === 'card') {
    const cardSize = size || 'default';
    const cardSpan = variant || 'medium';
    return `${bento.card.size[cardSize as keyof typeof bento.card.size]} ${bento.card.span[cardSpan as keyof typeof bento.card.span]}`;
  }
  
  return '';
};

/** Check for reduced motion preference */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/** Get appropriate animation variants */
export const getAnimationVariants = (animationName: keyof typeof animations) => {
  if (prefersReducedMotion()) {
    return { initial: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
  }
  return animations[animationName];
};

// Only export the imported tokens ONCE, no duplicate exports!

export {
  typographyTokens,
  typography,
  colors,
  spacing,
  borderRadius,
  shadows,
  backgroundConfig,
};

/** Default export of the complete design system */
export default {
  typographyTokens,
  typography,
  colors,
  spacing,
  borderRadius,
  shadows,
  button,
  input,
  card,
  bento,
  animations,
  transitions,
  backgroundConfig,
  themes,
  getGlassmorphicStyles,
  getComponentStyles,
  getBentoStyles,
  getAnimationVariants,
  prefersReducedMotion,
};
