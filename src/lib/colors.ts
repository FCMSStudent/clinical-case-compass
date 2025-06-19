// ────────────────────────────────────────────────────────────────────────────────
// COLOR SYSTEM - APPLE LIQUID GLASS ENHANCED
// ────────────────────────────────────────────────────────────────────────────────

/** Core semantic colors with Apple-inspired refinements */
export const colors = {
  // Apple Blue - refined to match iOS 15+ system blue
  primary: {
    50: '#f0f8ff',   // Very light blue tint
    100: '#e0f2fe',  // Light blue tint
    200: '#bae6fd',  // Soft blue
    300: '#7dd3fc',  // Medium blue
    400: '#38bdf8',  // Bright blue
    500: '#0A84FF',  // Apple Blue (iOS 15+) - deeper, less teal
    600: '#007AFF',  // Classic Apple Blue
    700: '#0056CC',  // Darker blue
    800: '#003D99',  // Deep blue
    900: '#002266',  // Very deep blue
  },
  
  // Apple-inspired neutral grays with blue undertones
  gray: {
    50: '#fafbfc',   // Almost white with subtle blue tint
    100: '#f5f7fa',  // Very light blue-gray
    200: '#eef2f7',  // Light blue-gray
    300: '#e2e8f0',  // Medium blue-gray
    400: '#cbd5e1',  // Neutral gray
    500: '#94a3b8',  // Medium gray
    600: '#64748b',  // Dark gray
    700: '#475569',  // Darker gray
    800: '#334155',  // Very dark gray
    900: '#1e293b',  // Near black with blue undertone
  },
  
  // Apple-inspired slate grays for sophisticated backgrounds
  slate: {
    50: '#f8fafc',   // Pure white with minimal tint
    100: '#f1f5f9',  // Very light slate (Apple's preferred background)
    200: '#e2e8f0',  // Light slate
    300: '#cbd5e1',  // Medium slate
    400: '#94a3b8',  // Neutral slate
    500: '#64748b',  // Medium slate
    600: '#475569',  // Dark slate
    700: '#334155',  // Darker slate
    800: '#1e293b',  // Very dark slate
    900: '#0f172a',  // Deep blue-black (Apple's dark mode)
  },
  
  // Apple-inspired status colors (desaturated for sophistication)
  success: {
    50: '#f0fdf4',   // Very light green
    100: '#dcfce7',  // Light green
    200: '#bbf7d0',  // Soft green
    300: '#86efac',  // Medium green
    400: '#4ade80',  // Bright green
    500: '#22c55e',  // Apple Green (desaturated)
    600: '#16a34a',  // Dark green
    700: '#15803d',  // Darker green
    800: '#166534',  // Very dark green
    900: '#14532d',  // Deep green
  },
  
  warning: {
    50: '#fffbeb',   // Very light amber
    100: '#fef3c7',  // Light amber
    200: '#fde68a',  // Soft amber
    300: '#fcd34d',  // Medium amber
    400: '#fbbf24',  // Bright amber
    500: '#f59e0b',  // Apple Amber (desaturated)
    600: '#d97706',  // Dark amber
    700: '#b45309',  // Darker amber
    800: '#92400e',  // Very dark amber
    900: '#78350f',  // Deep amber
  },
  
  error: {
    50: '#fef2f2',   // Very light red
    100: '#fee2e2',  // Light red
    200: '#fecaca',  // Soft red
    300: '#fca5a5',  // Medium red
    400: '#f87171',  // Bright red
    500: '#ef4444',  // Apple Red (desaturated)
    600: '#dc2626',  // Dark red
    700: '#b91c1c',  // Darker red
    800: '#991b1b',  // Very dark red
    900: '#7f1d1d',  // Deep red
  },
  
  info: {
    50: '#eff6ff',   // Very light blue
    100: '#dbeafe',  // Light blue
    200: '#bfdbfe',  // Soft blue
    300: '#93c5fd',  // Medium blue
    400: '#60a5fa',  // Bright blue
    500: '#3b82f6',  // Apple Info Blue
    600: '#2563eb',  // Dark blue
    700: '#1d4ed8',  // Darker blue
    800: '#1e40af',  // Very dark blue
    900: '#1e3a8a',  // Deep blue
  },
} as const;

/** Enhanced glass system with Apple liquid glass inspirations */
export interface GlassSystem {
  // Base glass effects
  background: string;
  border: string;
  shadow: string;
  backdropFilter: string;
  
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
    primary: "#0A84FF", // Apple Blue
    secondary: "#007AFF", // Classic Apple Blue
    accent: "#3b82f6",
    // Subtle gradient with neutral base and gentle blue overlay
    background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #cbd5e1 100%)",
    surface: "#f8fafc", // Apple's preferred light background
    text: "#1e293b", // Dark slate for excellent readability
    textSecondary: "rgba(30, 41, 59, 0.7)", // Desaturated for hierarchy
    border: "rgba(203, 213, 225, 0.3)", // Subtle slate border
    glass: {
      // Base glass effects - more neutral, less saturated
      background: "rgba(248, 250, 252, 0.8)", // Very light slate with transparency
      border: "rgba(203, 213, 225, 0.2)", // Subtle slate border
      shadow: "0 8px 32px rgba(15, 23, 42, 0.08)", // Soft shadow
      backdropFilter: "blur(20px)",
      
      // Apple-inspired enhancements
      subtle: "rgba(248, 250, 252, 0.4)", // Very subtle for layering
      vibrant: "rgba(248, 250, 252, 0.9)", // More opaque for active states
      frosted: "blur(40px) saturate(120%)", // Reduced saturation
      innerShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.4)", // Subtle highlight
      reflection: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
      
      // Adaptive glass - more neutral tones
      adaptiveGlass: {
        onDark: "rgba(248, 250, 252, 0.12)", // Light slate on dark
        onLight: "rgba(15, 23, 42, 0.06)", // Dark slate on light
        onColor: "rgba(248, 250, 252, 0.15)", // Light slate on color
      },
      
      // Enhanced backdrop system - more subtle
      backdrop: {
        light: "blur(20px) brightness(1.05)",
        medium: "blur(30px) saturate(120%) brightness(1.02)",
        heavy: "blur(50px) saturate(140%) contrast(1.05)",
      },
      
      // Contextual glass variants - refined opacity levels
      contextual: {
        navigation: "rgba(248, 250, 252, 0.85)", // Higher opacity for readability
        modal: "rgba(248, 250, 252, 0.95)", // Nearly opaque for focus
        card: "rgba(248, 250, 252, 0.6)", // Subtle for content clarity
        alert: "rgba(248, 250, 252, 0.8)", // Medium for attention
      },
      
      // Surface elevation colors - neutral progression
      elevation: {
        50: "rgba(248, 250, 252, 0.3)", // Very subtle
        100: "rgba(248, 250, 252, 0.5)", // Subtle
        200: "rgba(248, 250, 252, 0.7)", // Medium
        300: "rgba(248, 250, 252, 0.85)", // Elevated
        400: "rgba(248, 250, 252, 0.95)", // High
      },
    },
    gradient: {
      // Subtle gradients with neutral bases
      primary: "linear-gradient(135deg, #0A84FF 0%, #3b82f6 100%)",
      secondary: "linear-gradient(135deg, #007AFF 0%, #1e40af 100%)",
      accent: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
    },
    status: {
      success: "#22c55e", // Apple Green
      warning: "#f59e0b", // Apple Amber
      error: "#ef4444", // Apple Red
      info: "#3b82f6", // Apple Info Blue
    },
  },
  
  // Apple-inspired light theme
  apple: {
    primary: "#0A84FF", // Apple Blue
    secondary: "#007AFF", // Classic Apple Blue
    accent: "#6366f1", // Indigo accent
    background: "#f1f5f9", // Apple's preferred light background
    surface: "#ffffff", // Pure white for content
    text: "#1e293b", // Dark slate for text
    textSecondary: "rgba(30, 41, 59, 0.7)", // Secondary text
    border: "rgba(203, 213, 225, 0.3)", // Subtle border
    glass: {
      background: "rgba(255, 255, 255, 0.8)",
      border: "rgba(203, 213, 225, 0.2)",
      shadow: "0 8px 32px rgba(15, 23, 42, 0.08)",
      backdropFilter: "blur(20px)",
      subtle: "rgba(255, 255, 255, 0.4)",
      vibrant: "rgba(255, 255, 255, 0.9)",
      frosted: "blur(40px) saturate(120%)",
      innerShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.4)",
      reflection: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
      adaptiveGlass: {
        onDark: "rgba(255, 255, 255, 0.12)",
        onLight: "rgba(15, 23, 42, 0.06)",
        onColor: "rgba(255, 255, 255, 0.15)",
      },
      backdrop: {
        light: "blur(20px) brightness(1.05)",
        medium: "blur(30px) saturate(120%) brightness(1.02)",
        heavy: "blur(50px) saturate(140%) contrast(1.05)",
      },
      contextual: {
        navigation: "rgba(255, 255, 255, 0.85)",
        modal: "rgba(255, 255, 255, 0.95)",
        card: "rgba(255, 255, 255, 0.6)",
        alert: "rgba(255, 255, 255, 0.8)",
      },
      elevation: {
        50: "rgba(255, 255, 255, 0.3)",
        100: "rgba(255, 255, 255, 0.5)",
        200: "rgba(255, 255, 255, 0.7)",
        300: "rgba(255, 255, 255, 0.85)",
        400: "rgba(255, 255, 255, 0.95)",
      },
    },
    gradient: {
      primary: "linear-gradient(135deg, #0A84FF 0%, #3b82f6 100%)",
      secondary: "linear-gradient(135deg, #007AFF 0%, #1e40af 100%)",
      accent: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    },
    status: {
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
  },
  
  // Apple-inspired dark theme
  appleDark: {
    primary: "#0A84FF", // Apple Blue
    secondary: "#007AFF", // Classic Apple Blue
    accent: "#6366f1", // Indigo accent
    background: "#0f172a", // Apple's dark mode background
    surface: "#1e293b", // Dark slate surface
    text: "#f8fafc", // Light slate text
    textSecondary: "rgba(248, 250, 252, 0.7)", // Secondary text
    border: "rgba(203, 213, 225, 0.2)", // Subtle border
    glass: {
      background: "rgba(30, 41, 59, 0.8)", // Dark slate with transparency
      border: "rgba(203, 213, 225, 0.15)",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(20px)",
      subtle: "rgba(30, 41, 59, 0.4)",
      vibrant: "rgba(30, 41, 59, 0.9)",
      frosted: "blur(40px) saturate(120%)",
      innerShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      reflection: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
      adaptiveGlass: {
        onDark: "rgba(30, 41, 59, 0.12)",
        onLight: "rgba(15, 23, 42, 0.08)",
        onColor: "rgba(30, 41, 59, 0.15)",
      },
      backdrop: {
        light: "blur(20px) brightness(0.95)",
        medium: "blur(30px) saturate(120%) brightness(0.98)",
        heavy: "blur(50px) saturate(140%) contrast(0.95)",
      },
      contextual: {
        navigation: "rgba(30, 41, 59, 0.85)",
        modal: "rgba(30, 41, 59, 0.95)",
        card: "rgba(30, 41, 59, 0.6)",
        alert: "rgba(30, 41, 59, 0.8)",
      },
      elevation: {
        50: "rgba(30, 41, 59, 0.3)",
        100: "rgba(30, 41, 59, 0.5)",
        200: "rgba(30, 41, 59, 0.7)",
        300: "rgba(30, 41, 59, 0.85)",
        400: "rgba(30, 41, 59, 0.95)",
      },
    },
    gradient: {
      primary: "linear-gradient(135deg, #0A84FF 0%, #3b82f6 100%)",
      secondary: "linear-gradient(135deg, #007AFF 0%, #1e40af 100%)",
      accent: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    },
    status: {
      success: "#22c55e",
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
      background: "rgba(240, 253, 244, 0.1)",
      border: "rgba(240, 253, 244, 0.2)",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(20px)",
      subtle: "rgba(240, 253, 244, 0.05)",
      vibrant: "rgba(240, 253, 244, 0.15)",
      frosted: "blur(40px) saturate(180%)",
      innerShadow: "inset 0 1px 0 rgba(240, 253, 244, 0.3)",
      reflection: "linear-gradient(135deg, rgba(240,253,244,0.1) 0%, transparent 50%)",
      adaptiveGlass: {
        onDark: "rgba(240, 253, 244, 0.12)",
        onLight: "rgba(6, 78, 59, 0.08)",
        onColor: "rgba(240, 253, 244, 0.15)",
      },
      backdrop: {
        light: "blur(20px) brightness(1.1)",
        medium: "blur(30px) saturate(150%) brightness(1.05)",
        heavy: "blur(50px) saturate(180%) contrast(1.1)",
      },
      contextual: {
        navigation: "rgba(240, 253, 244, 0.18)",
        modal: "rgba(240, 253, 244, 0.25)",
        card: "rgba(240, 253, 244, 0.08)",
        alert: "rgba(240, 253, 244, 0.2)",
      },
      elevation: {
        50: "rgba(240, 253, 244, 0.02)",
        100: "rgba(240, 253, 244, 0.05)",
        200: "rgba(240, 253, 244, 0.08)",
        300: "rgba(240, 253, 244, 0.12)",
        400: "rgba(240, 253, 244, 0.18)",
      },
    },
    gradient: {
      primary: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
      secondary: "linear-gradient(135deg, #059669 0%, #064e3b 100%)",
      accent: "linear-gradient(135deg, #34d399 0%, #6ee7b7 100%)",
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
    backdropFilter: themeColors.glass.backdropFilter,
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