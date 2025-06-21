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
  currentTheme: ThemeConfig;
  setTheme: (themeName: string) => void;
  availableThemes: string[];
  getThemeNames: () => Array<{ name: string; description: string }>;
}

/** Predefined Theme Configurations */
export const themes: Record<string, ThemeConfig> = {
  medical: {
    name: "Medical Blue",
    description: "Professional medical theme with clinical blue tones",
    colors: themeColors.medical!,
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
    colors: themeColors.emerald!,
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
    colors: themeColors.purple!,
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

  return React.createElement(
    ThemeContext.Provider,
    { value: { currentTheme, setTheme, availableThemes, getThemeNames } },
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

  return (
    <div className="flex flex-col gap-2 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
      <h3 className="text-sm font-medium text-white/80 mb-2">Theme</h3>
      <div className="flex flex-col gap-1">
        {themeNames.map(({ name, description }) => (
          <button
            key={name}
            onClick={() => setTheme(name)}
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
