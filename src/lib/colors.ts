// ────────────────────────────────────────────────────────────────────────────────
// COLOR SYSTEM - APPLE LIQUID GLASS ENHANCED
// ────────────────────────────────────────────────────────────────────────────────

/** Core semantic colors */
export const colors = {
  // Core semantic colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  // Apple-inspired slate-blue grays for better glass compatibility
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  // Status colors
  success: {
    500: '#10b981',
    600: '#059669',
  },
  warning: {
    500: '#f59e0b',
  },
  error: {
    500: '#ef4444',
  },
  info: {
    500: '#3b82f6',
  },
} as const;

/** Enhanced glass system with Apple liquid glass inspirations */
export interface GlassSystem {
  // Base glass effects
  background: string;
  border: string;
  shadow: string;
  
  // Apple-inspired enhancements
  subtle: string; // For layered elements
  vibrant: string; // For active states
  frosted: string; // More pronounced frosting
  innerShadow: string; // Inner highlight
  reflection: string; // Subtle reflection
  
  // Adaptive glass based on content underneath
  adaptiveGlass: {
    onDark: string;
    onLight: string;
    onColor: string; // Over colored backgrounds
  };
  
  // Enhanced backdrop system
  backdrop: {
    light: string;
    medium: string;
    heavy: string;
  };
  
  // Contextual glass variants
  contextual: {
    navigation: string; // Higher opacity for readability
    modal: string; // Stronger blur for focus
    card: string; // Subtle for content clarity
    alert: string; // Vibrant for attention
  };
  
  // Surface elevation colors
  elevation: {
    50: string; // Very subtle
    100: string; // Subtle
    200: string; // Medium
    300: string; // Elevated
    400: string; // High
  };
}

/** Theme color configurations */
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  glass: GlassSystem;
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
}

/** Predefined theme color palettes with enhanced glass effects */
export const themeColors: Record<string, ThemeColors> = {
  medical: {
    primary: "#0ea5e9",
    secondary: "#0284c7",
    accent: "#3b82f6",
    background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)",
    surface: "#f8fafc",
    text: "#ffffff",
    textSecondary: "rgba(255, 255, 255, 0.8)",
    border: "rgba(255, 255, 255, 0.2)",
    glass: {
      // Base glass effects
      background: "rgba(255, 255, 255, 0.1)",
      border: "rgba(255, 255, 255, 0.2)",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      
      // Apple-inspired enhancements
      subtle: "rgba(255, 255, 255, 0.05)",
      vibrant: "rgba(255, 255, 255, 0.15)",
      frosted: "blur(40px) saturate(180%)",
      innerShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.3)",
      reflection: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
      
      // Adaptive glass
      adaptiveGlass: {
        onDark: "rgba(255, 255, 255, 0.12)",
        onLight: "rgba(0, 0, 0, 0.08)",
        onColor: "rgba(255, 255, 255, 0.15)",
      },
      
      // Enhanced backdrop system
      backdrop: {
        light: "blur(20px) brightness(1.1)",
        medium: "blur(30px) saturate(150%) brightness(1.05)",
        heavy: "blur(50px) saturate(180%) contrast(1.1)",
      },
      
      // Contextual glass variants
      contextual: {
        navigation: "rgba(255, 255, 255, 0.18)",
        modal: "rgba(255, 255, 255, 0.25)",
        card: "rgba(255, 255, 255, 0.08)",
        alert: "rgba(255, 255, 255, 0.2)",
      },
      
      // Surface elevation colors
      elevation: {
        50: "rgba(255, 255, 255, 0.02)",
        100: "rgba(255, 255, 255, 0.05)",
        200: "rgba(255, 255, 255, 0.08)",
        300: "rgba(255, 255, 255, 0.12)",
        400: "rgba(255, 255, 255, 0.18)",
      },
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
  emerald: {
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
    background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
    surface: "#f0fdf4",
    text: "#ffffff",
    textSecondary: "rgba(255, 255, 255, 0.8)",
    border: "rgba(255, 255, 255, 0.2)",
    glass: {
      // Base glass effects
      background: "rgba(255, 255, 255, 0.1)",
      border: "rgba(255, 255, 255, 0.2)",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      
      // Apple-inspired enhancements
      subtle: "rgba(255, 255, 255, 0.05)",
      vibrant: "rgba(255, 255, 255, 0.15)",
      frosted: "blur(40px) saturate(180%)",
      innerShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.3)",
      reflection: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
      
      // Adaptive glass
      adaptiveGlass: {
        onDark: "rgba(255, 255, 255, 0.12)",
        onLight: "rgba(0, 0, 0, 0.08)",
        onColor: "rgba(255, 255, 255, 0.15)",
      },
      
      // Enhanced backdrop system
      backdrop: {
        light: "blur(20px) brightness(1.1)",
        medium: "blur(30px) saturate(150%) brightness(1.05)",
        heavy: "blur(50px) saturate(180%) contrast(1.1)",
      },
      
      // Contextual glass variants
      contextual: {
        navigation: "rgba(255, 255, 255, 0.18)",
        modal: "rgba(255, 255, 255, 0.25)",
        card: "rgba(255, 255, 255, 0.08)",
        alert: "rgba(255, 255, 255, 0.2)",
      },
      
      // Surface elevation colors
      elevation: {
        50: "rgba(255, 255, 255, 0.02)",
        100: "rgba(255, 255, 255, 0.05)",
        200: "rgba(255, 255, 255, 0.08)",
        300: "rgba(255, 255, 255, 0.12)",
        400: "rgba(255, 255, 255, 0.18)",
      },
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
  purple: {
    primary: "#8b5cf6",
    secondary: "#7c3aed",
    accent: "#a78bfa",
    background: "linear-gradient(135deg, #4c1d95 0%, #5b21b6 50%, #6d28d9 100%)",
    surface: "#faf5ff",
    text: "#ffffff",
    textSecondary: "rgba(255, 255, 255, 0.8)",
    border: "rgba(255, 255, 255, 0.2)",
    glass: {
      // Base glass effects
      background: "rgba(255, 255, 255, 0.1)",
      border: "rgba(255, 255, 255, 0.2)",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      
      // Apple-inspired enhancements
      subtle: "rgba(255, 255, 255, 0.05)",
      vibrant: "rgba(255, 255, 255, 0.15)",
      frosted: "blur(40px) saturate(180%)",
      innerShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.3)",
      reflection: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
      
      // Adaptive glass
      adaptiveGlass: {
        onDark: "rgba(255, 255, 255, 0.12)",
        onLight: "rgba(0, 0, 0, 0.08)",
        onColor: "rgba(255, 255, 255, 0.15)",
      },
      
      // Enhanced backdrop system
      backdrop: {
        light: "blur(20px) brightness(1.1)",
        medium: "blur(30px) saturate(150%) brightness(1.05)",
        heavy: "blur(50px) saturate(180%) contrast(1.1)",
      },
      
      // Contextual glass variants
      contextual: {
        navigation: "rgba(255, 255, 255, 0.18)",
        modal: "rgba(255, 255, 255, 0.25)",
        card: "rgba(255, 255, 255, 0.08)",
        alert: "rgba(255, 255, 255, 0.2)",
      },
      
      // Surface elevation colors
      elevation: {
        50: "rgba(255, 255, 255, 0.02)",
        100: "rgba(255, 255, 255, 0.05)",
        200: "rgba(255, 255, 255, 0.08)",
        300: "rgba(255, 255, 255, 0.12)",
        400: "rgba(255, 255, 255, 0.18)",
      },
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
};

/** Color utility functions */
export const getStatusColor = (themeColors: ThemeColors, status: "success" | "warning" | "error" | "info") => {
  return themeColors.status[status];
};

export const getGradientStyles = (themeColors: ThemeColors, type: "primary" | "secondary" | "accent" = "primary") => {
  return themeColors.gradient[type];
};

export const getGlassmorphicColorStyles = (themeColors: ThemeColors, variant: "default" | "elevated" | "subtle" | "light" | "navigation" | "modal" | "card" | "alert" = "default") => {
  const baseStyles = {
    backgroundColor: themeColors.glass.background,
    backdropFilter: themeColors.glass.backdrop,
    border: themeColors.glass.border,
    boxShadow: themeColors.glass.shadow,
  };

  switch (variant) {
    case "elevated":
      return {
        ...baseStyles,
        backgroundColor: themeColors.glass.vibrant,
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
        border: themeColors.glass.border.replace("0.2", "0.3"),
      };
    case "subtle":
      return {
        ...baseStyles,
        backgroundColor: themeColors.glass.subtle,
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
        border: themeColors.glass.border.replace("0.2", "0.1"),
      };
    case "light":
      return {
        ...baseStyles,
        backgroundColor: themeColors.glass.adaptiveGlass.onDark,
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
        border: themeColors.glass.border.replace("0.2", "0.25"),
      };
    case "navigation":
      return {
        ...baseStyles,
        backgroundColor: themeColors.glass.contextual.navigation,
        backdropFilter: themeColors.glass.backdrop.medium,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
      };
    case "modal":
      return {
        ...baseStyles,
        backgroundColor: themeColors.glass.contextual.modal,
        backdropFilter: themeColors.glass.backdrop.heavy,
        boxShadow: "0 16px 64px rgba(0, 0, 0, 0.2)",
      };
    case "card":
      return {
        ...baseStyles,
        backgroundColor: themeColors.glass.contextual.card,
        backdropFilter: themeColors.glass.backdrop.light,
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
      };
    case "alert":
      return {
        ...baseStyles,
        backgroundColor: themeColors.glass.contextual.alert,
        backdropFilter: themeColors.glass.backdrop.medium,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
      };
    default:
      return baseStyles;
  }
}; 