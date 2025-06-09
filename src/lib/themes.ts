import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

// ────────────────────────────────────────────────────────────────────────────────
// THEME VARIATIONS FOR GLASSY VISIONOS UI
// ────────────────────────────────────────────────────────────────────────────────

/**
 * Theme configuration interface
 */
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

/**
 * Predefined theme configurations
 */
export const themes: Record<string, ThemeConfig> = {
  // Medical Blue Theme (Default)
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

  // Emerald Medical Theme
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

  // Purple Medical Theme
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

  // Sunset Medical Theme
  sunset: {
    name: "Sunset Medical",
    description: "Warm and comforting medical theme with sunset colors",
    colors: {
      primary: "#f97316",
      secondary: "#ea580c",
      accent: "#fb923c",
      background: "linear-gradient(135deg, #7c2d12 0%, #9a3412 50%, #c2410c 100%)",
      surface: "#fff7ed",
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
        primary: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
        secondary: "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
        accent: "linear-gradient(135deg, #fb923c 0%, #fdba74 100%)",
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
      glow: "0 0 20px rgba(249, 115, 22, 0.3)",
    },
  },

  // Ocean Medical Theme
  ocean: {
    name: "Ocean Medical",
    description: "Calming medical theme inspired by ocean depths",
    colors: {
      primary: "#06b6d4",
      secondary: "#0891b2",
      accent: "#22d3ee",
      background: "linear-gradient(135deg, #164e63 0%, #0e7490 50%, #0891b2 100%)",
      surface: "#f0fdfa",
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
        primary: "linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)",
        secondary: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
        accent: "linear-gradient(135deg, #22d3ee 0%, #67e8f9 100%)",
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
      glow: "0 0 20px rgba(6, 182, 212, 0.3)",
    },
  },

  // Rose Medical Theme
  rose: {
    name: "Rose Medical",
    description: "Gentle and caring medical theme with rose tones",
    colors: {
      primary: "#f43f5e",
      secondary: "#e11d48",
      accent: "#fb7185",
      background: "linear-gradient(135deg, #881337 0%, #be123c 50%, #e11d48 100%)",
      surface: "#fff1f2",
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
        primary: "linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)",
        secondary: "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
        accent: "linear-gradient(135deg, #fb7185 0%, #fda4af 100%)",
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
      glow: "0 0 20px rgba(244, 63, 94, 0.3)",
    },
  },

  // Neutral Medical Theme
  neutral: {
    name: "Neutral Medical",
    description: "Clean and minimal medical theme with neutral tones",
    colors: {
      primary: "#6b7280",
      secondary: "#4b5563",
      accent: "#9ca3af",
      background: "linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)",
      surface: "#f9fafb",
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
        primary: "linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)",
        secondary: "linear-gradient(135deg, #4b5563 0%, #6b7280 100%)",
        accent: "linear-gradient(135deg, #9ca3af 0%, #d1d5db 100%)",
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
      glow: "0 0 20px rgba(107, 114, 128, 0.3)",
    },
  },
};

/**
 * Theme context interface
 */
interface ThemeContextType {
  currentTheme: ThemeConfig;
  setTheme: (themeName: string) => void;
  availableThemes: string[];
  getThemeNames: () => Array<{ name: string; description: string }>;
}

/**
 * Theme context
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme provider component
 */
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

  const getThemeNames = () => {
    return Object.values(themes).map(theme => ({
      name: theme.name,
      description: theme.description,
    }));
  };

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
    
    // Apply CSS custom properties
    root.style.setProperty("--theme-primary", currentTheme.colors.primary);
    root.style.setProperty("--theme-secondary", currentTheme.colors.secondary);
    root.style.setProperty("--theme-accent", currentTheme.colors.accent);
    root.style.setProperty("--theme-background", currentTheme.colors.background);
    root.style.setProperty("--theme-surface", currentTheme.colors.surface);
    root.style.setProperty("--theme-text", currentTheme.colors.text);
    root.style.setProperty("--theme-text-secondary", currentTheme.colors.textSecondary);
    root.style.setProperty("--theme-border", currentTheme.colors.border);
    root.style.setProperty("--theme-glass-bg", currentTheme.colors.glass.background);
    root.style.setProperty("--theme-glass-border", currentTheme.colors.glass.border);
    root.style.setProperty("--theme-glass-shadow", currentTheme.colors.glass.shadow);
    root.style.setProperty("--theme-glass-backdrop", currentTheme.colors.glass.backdrop);
    root.style.setProperty("--theme-blur", currentTheme.effects.blur);
    root.style.setProperty("--theme-shadow", currentTheme.effects.shadow);
    root.style.setProperty("--theme-border-width", currentTheme.effects.border);
    root.style.setProperty("--theme-glow", currentTheme.effects.glow);
    
    // Apply background
    document.body.style.background = currentTheme.colors.background;
  }, [currentTheme]);

  return React.createElement(
    ThemeContext.Provider,
    {
      value: {
        currentTheme,
        setTheme,
        availableThemes,
        getThemeNames,
      }
    },
    children
  );
};

/**
 * Hook to use theme context
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

/**
 * Utility function to get glassmorphic styles
 */
export const getGlassmorphicStyles = (theme: ThemeConfig, variant: "default" | "elevated" | "subtle" = "default") => {
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
    default:
      return baseStyles;
  }
};

/**
 * Utility function to get gradient styles
 */
export const getGradientStyles = (theme: ThemeConfig, type: "primary" | "secondary" | "accent" = "primary") => {
  return {
    background: theme.colors.gradient[type],
  };
};

/**
 * Utility function to get status colors
 */
export const getStatusColor = (theme: ThemeConfig, status: "success" | "warning" | "error" | "info") => {
  return theme.colors.status[status];
};

/**
 * Theme switcher component
 */
export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme, getThemeNames } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeNames = getThemeNames();

  return React.createElement(
    'div',
    { className: 'relative' },
    React.createElement(
      'button',
      {
        onClick: () => setIsOpen(!isOpen),
        className: 'flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-200',
        style: getGlassmorphicStyles(currentTheme)
      },
      React.createElement('div', {
        className: 'w-4 h-4 rounded-full',
        style: { backgroundColor: currentTheme.colors.primary }
      }),
      React.createElement('span', null, currentTheme.name)
    ),
    isOpen && React.createElement(
      'div',
      {
        className: 'absolute top-full mt-2 right-0 w-64 rounded-lg p-2 z-50',
        style: getGlassmorphicStyles(currentTheme, 'elevated')
      },
      themeNames.map((theme) =>
        React.createElement(
          'button',
          {
            key: theme.name,
            onClick: () => {
              setTheme(theme.name.toLowerCase().replace(' ', ''));
              setIsOpen(false);
            },
            className: 'w-full text-left px-3 py-2 rounded-md text-white hover:bg-white/10 transition-colors duration-200'
          },
          React.createElement(
            'div',
            { className: 'flex items-center gap-3' },
            React.createElement('div', {
              className: 'w-3 h-3 rounded-full',
              style: { backgroundColor: themes[theme.name.toLowerCase().replace(' ', '')]?.colors.primary }
            }),
            React.createElement(
              'div',
              null,
              React.createElement('div', { className: 'font-medium' }, theme.name),
              React.createElement('div', { className: 'text-xs text-white/60' }, theme.description)
            )
          )
        )
      )
    )
  );
}; 