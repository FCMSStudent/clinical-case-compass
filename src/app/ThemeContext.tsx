import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";
import { themes, type ThemeConfig } from "@/lib/themes";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
  themeMode: 'light' | 'dark' | 'auto';
  currentTheme: ThemeConfig;
  availableThemes: string[];
  getThemeNames: () => Array<{ name: string; description: string }>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeStorage] = useLocalStorage<string>("vite-ui-theme", "medical");
  const [themeMode, setThemeMode] = React.useState<'light' | 'dark' | 'auto'>('auto');

  const currentTheme = themes[theme] || themes.medical;

  const setTheme = (themeName: string) => {
    if (themes[themeName]) {
      setThemeStorage(themeName);
    }
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const availableThemes = Object.keys(themes);

  const getThemeNames = () => {
    return Object.values(themes).map(theme => ({
      name: theme.name,
      description: theme.description,
    }));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === "dark" || theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme, themeMode]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      toggleTheme,
      themeMode,
      currentTheme, 
      availableThemes, 
      getThemeNames 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
