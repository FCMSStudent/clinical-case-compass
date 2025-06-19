// ────────────────────────────────────────────────────────────────────────────────
// COLOR SYSTEM
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
}

/** Predefined theme color palettes */
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
};

/** Color utility functions */
export const getStatusColor = (themeColors: ThemeColors, status: "success" | "warning" | "error" | "info") => {
  return themeColors.status[status];
};

export const getGradientStyles = (themeColors: ThemeColors, type: "primary" | "secondary" | "accent" = "primary") => {
  return themeColors.gradient[type];
};

export const getGlassmorphicColorStyles = (themeColors: ThemeColors, variant: "default" | "elevated" | "subtle" | "light" = "default") => {
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
        backgroundColor: themeColors.glass.background.replace("0.1", "0.15"),
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
        border: themeColors.glass.border.replace("0.2", "0.3"),
      };
    case "subtle":
      return {
        ...baseStyles,
        backgroundColor: themeColors.glass.background.replace("0.1", "0.05"),
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
        border: themeColors.glass.border.replace("0.2", "0.1"),
      };
    case "light":
      return {
        ...baseStyles,
        backgroundColor: themeColors.glass.background.replace("0.1", "0.12"),
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
        border: themeColors.glass.border.replace("0.2", "0.25"),
      };
    default:
      return baseStyles;
  }
}; 