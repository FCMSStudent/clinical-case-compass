import React, { createContext, useContext, useState, useEffect } from "react";

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
