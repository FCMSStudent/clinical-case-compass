import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeColors, themeColors } from './colors';
import { applyThemeToDocument, removeThemeFromDocument } from './utilities';

/** Unified Theme Configuration */
export interface UnifiedThemeConfig {
  name: string;
  displayName: string;
  description: string;
  colors: ThemeColors;
  effects: {
    blur: string;
    shadow: string;
    border: string;
    glow: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

/** Theme Context Type */
interface UnifiedThemeContextType {
  currentTheme: UnifiedThemeConfig;
  setTheme: (themeName: string) => void;
  availableThemes: string[];
  getThemeNames: () => Array<{ name: string; displayName: string; description: string }>;
  isDarkMode: boolean;
}

/** Consolidated Theme Configurations */
export const unifiedThemes: Record<string, UnifiedThemeConfig> = {
  medical: {
    name: "medical",
    displayName: "Medical Blue",
    description: "Professional medical theme with clinical blue tones",
    colors: themeColors.medical,
    effects: {
      blur: "blur(20px)",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      glow: "0 0 20px rgba(59, 130, 246, 0.3)",
    },
    spacing: {
      xs: "4px",
      sm: "8px", 
      md: "16px",
      lg: "24px",
      xl: "32px",
    }
  },
  emerald: {
    name: "emerald",
    displayName: "Emerald Medical",
    description: "Fresh and modern medical theme with emerald accents",
    colors: themeColors.emerald,
    effects: {
      blur: "blur(20px)",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      glow: "0 0 20px rgba(16, 185, 129, 0.3)",
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px", 
      lg: "24px",
      xl: "32px",
    }
  },
  purple: {
    name: "purple",
    displayName: "Purple Medical",
    description: "Sophisticated medical theme with purple and violet tones",
    colors: themeColors.purple,
    effects: {
      blur: "blur(20px)",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      glow: "0 0 20px rgba(139, 92, 246, 0.3)",
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px", 
      xl: "32px",
    }
  },
};

const UnifiedThemeContext = React.createContext<UnifiedThemeContextType | undefined>(undefined);

/** Unified Theme Provider Component */
export const UnifiedThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentThemeName, setCurrentThemeName] = useState<string>("medical");
  const currentTheme = unifiedThemes[currentThemeName] || unifiedThemes.medical;

  const setTheme = (themeName: string) => {
    if (unifiedThemes[themeName]) {
      setCurrentThemeName(themeName);
      localStorage.setItem("medical-app-theme", themeName);
    }
  };

  const availableThemes = Object.keys(unifiedThemes);
  
  const getThemeNames = () => 
    Object.values(unifiedThemes).map(theme => ({ 
      name: theme.name,
      displayName: theme.displayName, 
      description: theme.description 
    }));

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("medical-app-theme");
    if (savedTheme && unifiedThemes[savedTheme]) {
      setCurrentThemeName(savedTheme);
    }
  }, []);

  // Apply theme to document with consolidated approach
  useEffect(() => {
    const root = document.documentElement;
    
    // Always use dark mode for medical apps
    root.classList.add('dark');
    
    // Apply consolidated CSS custom properties
    const cssVars = {
      // Core theme colors
      "--theme-primary": currentTheme.colors.primary,
      "--theme-secondary": currentTheme.colors.secondary,
      "--theme-accent": currentTheme.colors.accent,
      "--theme-background": currentTheme.colors.background,
      "--theme-surface": currentTheme.colors.surface,
      "--theme-text": currentTheme.colors.text,
      "--theme-text-secondary": currentTheme.colors.textSecondary,
      "--theme-border": currentTheme.colors.border,
      
      // Glass effects
      "--theme-glass-bg": currentTheme.colors.glass.background,
      "--theme-glass-border": currentTheme.colors.glass.border,
      "--theme-glass-shadow": currentTheme.colors.glass.shadow,
      "--theme-glass-backdrop": typeof currentTheme.colors.glass.backdrop === 'string' 
        ? currentTheme.colors.glass.backdrop 
        : currentTheme.colors.glass.backdrop.medium,
      
      // Status colors
      "--theme-success": currentTheme.colors.status.success,
      "--theme-warning": currentTheme.colors.status.warning,
      "--theme-error": currentTheme.colors.status.error,
      "--theme-info": currentTheme.colors.status.info,
      
      // Effects
      "--theme-blur": currentTheme.effects.blur,
      "--theme-shadow": currentTheme.effects.shadow,
      "--theme-border-width": currentTheme.effects.border,
      "--theme-glow": currentTheme.effects.glow,
      
      // 8pt grid spacing system
      "--spacing-xs": currentTheme.spacing.xs,
      "--spacing-sm": currentTheme.spacing.sm,
      "--spacing-md": currentTheme.spacing.md,
      "--spacing-lg": currentTheme.spacing.lg,
      "--spacing-xl": currentTheme.spacing.xl,
    };

    // Apply all CSS variables
    Object.entries(cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    // Set body background
    document.body.style.background = currentTheme.colors.background;

    return () => {
      root.classList.remove('dark');
      // Clean up CSS variables if needed
    };
  }, [currentTheme]);

  return (
    <UnifiedThemeContext.Provider 
      value={{ 
        currentTheme, 
        setTheme, 
        availableThemes, 
        getThemeNames,
        isDarkMode: true // Medical apps always use dark mode
      }}
    >
      {children}
    </UnifiedThemeContext.Provider>
  );
};

/** Unified Theme Hook */
export const useUnifiedTheme = () => {
  const context = useContext(UnifiedThemeContext);
  if (!context) {
    throw new Error("useUnifiedTheme must be used within a UnifiedThemeProvider");
  }
  return context;
};

/** Unified Theme Switcher Component */
export const UnifiedThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme, getThemeNames } = useUnifiedTheme();
  const [isOpen, setIsOpen] = useState(false);
  const themeNames = getThemeNames();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-200"
      >
        <div 
          className="w-4 h-4 rounded-full border border-white/30"
          style={{ backgroundColor: currentTheme.colors.primary }}
        />
        <span className="text-sm font-medium">{currentTheme.displayName}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-64 rounded-xl p-2 z-50 bg-white/10 backdrop-blur-md border border-white/20">
          {themeNames.map((theme) => (
            <button
              key={theme.name}
              onClick={() => {
                setTheme(theme.name);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                currentTheme.name === theme.name 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full border border-white/30"
                  style={{ backgroundColor: unifiedThemes[theme.name]?.colors.primary }}
                />
                <div>
                  <div className="font-medium text-sm">{theme.displayName}</div>
                  <div className="text-xs opacity-70">{theme.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};