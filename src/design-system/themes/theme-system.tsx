
import React, { useContext, useState, useEffect } from "react";
import { ThemeColors, themeColors } from '../tokens/colors';
import { applyThemeToDocument, removeThemeFromDocument } from '../../shared/utils/utilities';

/** Theme Configuration Interface */
export interface ThemeConfig {
  name: string;
  description: string;
  colors: ThemeColors;
  effects: {
    blur: string;
    shadow: string;
    border: string;
    glow: string;
  };
}

/** Theme Context Type */
interface ThemeContextType {
  currentTheme: ThemeConfig | undefined; // Allow currentTheme to be undefined
  setTheme: (themeName: string) => void;
  availableThemes: string[];
  getThemeNames: () => Array<{ name: string; description: string }>;
}

/** Complete fallback colors that match ThemeColors interface */
const fallbackColors: ThemeColors = {
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
    subtle: "rgba(255, 255, 255, 0.05)",
    vibrant: "rgba(255, 255, 255, 0.15)",
    frosted: "rgba(255, 255, 255, 0.08)",
    innerShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
    reflection: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
    adaptiveGlass: {
      onDark: "rgba(255, 255, 255, 0.12)",
      onLight: "rgba(0, 0, 0, 0.08)",
      onColor: "rgba(255, 255, 255, 0.15)",
    },
    backdrop: {
      light: "blur(20px) brightness(1.1)",
      medium: "blur(30px) saturate(150%) brightness(1.05)",
      heavy: "blur(50px) saturate(180%) contrast(1.1)",
    },
    contextual: {
      navigation: "rgba(255, 255, 255, 0.18)",
      modal: "rgba(255, 255, 255, 0.25)",
      card: "rgba(255, 255, 255, 0.08)",
      alert: "rgba(255, 255, 255, 0.2)",
    },
    elevation: {
      50: "rgba(255, 255, 255, 0.02)",
      100: "rgba(255, 255, 255, 0.05)",
      200: "rgba(255, 255, 255, 0.08)",
      300: "rgba(255, 255, 255, 0.12)",
      400: "rgba(255, 255, 255, 0.18)",
    },
  },
  gradient: {
    primary: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
    secondary: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
    accent: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
  },
  status: {
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6"
  }
};

/** Predefined Theme Configurations */
export const themes: Record<string, ThemeConfig> = {
  medical: {
    name: "Medical Blue",
    description: "Professional medical theme with clinical blue tones",
    colors: themeColors.medical || fallbackColors,
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
    colors: themeColors.emerald || fallbackColors,
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
    colors: themeColors.purple || fallbackColors,
    effects: {
      blur: "blur(20px)",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      glow: "0 0 20px rgba(139, 92, 246, 0.3)",
    },
  },
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

/** Theme Provider Component */
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
    if (currentTheme?.colors) {
      applyThemeToDocument(currentTheme.colors);
    }
    return () => removeThemeFromDocument();
  }, [currentTheme]);

  const contextValue: ThemeContextType = {
    currentTheme,
    setTheme,
    availableThemes,
    getThemeNames,
  };

  return React.createElement(
    ThemeContext.Provider,
    { value: contextValue },
    children
  );
};

/** Theme Hook */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

/** Theme Switcher Component */
export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme, getThemeNames } = useTheme();
  const themeNames = getThemeNames();

  if (!currentTheme) {
    // Optionally, render a loading state or null while the theme is being determined
    return null;
  }

  return (
    <div className="flex flex-col gap-2 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
      <h3 className="text-sm font-medium text-white/80 mb-2">Theme</h3>
      <div className="flex flex-col gap-1">
        {themeNames.map(({ name, description }) => (
          <button
            key={name}
            onClick={() => setTheme(name.toLowerCase().replace(' medical', '').replace(' ', ''))}
            className={`text-left px-3 py-2 rounded-md text-sm transition-all duration-200 ${
              currentTheme.name === name
                ? 'bg-white/20 text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="font-medium">{name}</div>
            <div className="text-xs opacity-70">{description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
