// ────────────────────────────────────────────────────────────────────────────────
// DESIGN SYSTEM UTILITIES
// ────────────────────────────────────────────────────────────────────────────────

import { themeColors, type ThemeColors, type GlassSystem } from './colors';

/** Check for reduced motion preference */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/** Get glassmorphic styles */
export const getGlassmorphicStyles = (
  themeColors: ThemeColors, 
  variant: "default" | "elevated" | "subtle" | "light" | "navigation" | "modal" | "card" | "alert" = "default"
) => {
  const baseStyles = {
    backgroundColor: themeColors.glass.background,
    backdropFilter: typeof themeColors.glass.backdrop === 'string' 
      ? themeColors.glass.backdrop 
      : themeColors.glass.backdrop.medium,
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

/** Apply theme to document */
export const applyThemeToDocument = (themeColors: ThemeColors) => {
  const root = document.documentElement;
  root.classList.add('dark');
  
  // Apply CSS custom properties
  Object.entries({
    "--theme-primary": themeColors.primary,
    "--theme-secondary": themeColors.secondary,
    "--theme-accent": themeColors.accent,
    "--theme-background": themeColors.background,
    "--theme-surface": themeColors.surface,
    "--theme-text": themeColors.text,
    "--theme-text-secondary": themeColors.textSecondary,
    "--theme-border": themeColors.border,
    "--theme-glass-bg": themeColors.glass.background,
    "--theme-glass-border": themeColors.glass.border,
    "--theme-glass-shadow": themeColors.glass.shadow,
    "--theme-glass-backdrop": themeColors.glass.backdrop,
    "--theme-blur": "blur(20px)",
    "--theme-shadow": "0 8px 32px rgba(0, 0, 0, 0.1)",
    "--theme-border-width": "1px solid rgba(255, 255, 255, 0.2)",
    "--theme-glow": "0 0 20px rgba(59, 130, 246, 0.3)",
  }).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  document.body.style.background = themeColors.background;
};

/** Remove theme from document */
export const removeThemeFromDocument = () => {
  const root = document.documentElement;
  root.classList.remove('dark');
};

/** Generate CSS custom properties for a theme */
export const generateThemeCSSProperties = (themeColors: ThemeColors) => {
  return {
    "--theme-primary": themeColors.primary,
    "--theme-secondary": themeColors.secondary,
    "--theme-accent": themeColors.accent,
    "--theme-background": themeColors.background,
    "--theme-surface": themeColors.surface,
    "--theme-text": themeColors.text,
    "--theme-text-secondary": themeColors.textSecondary,
    "--theme-border": themeColors.border,
    "--theme-glass-bg": themeColors.glass.background,
    "--theme-glass-border": themeColors.glass.border,
    "--theme-glass-shadow": themeColors.glass.shadow,
    "--theme-glass-backdrop": themeColors.glass.backdrop,
    "--theme-blur": "blur(20px)",
    "--theme-shadow": "0 8px 32px rgba(0, 0, 0, 0.1)",
    "--theme-border-width": "1px solid rgba(255, 255, 255, 0.2)",
    "--theme-glow": "0 0 20px rgba(59, 130, 246, 0.3)",
  };
};

/** Validate theme configuration */
export const validateTheme = (theme: any): theme is ThemeColors => {
  const requiredKeys = [
    'primary', 'secondary', 'accent', 'background', 'surface', 
    'text', 'textSecondary', 'border', 'glass', 'gradient', 'status'
  ];
  
  const requiredGlassKeys = ['background', 'border', 'shadow', 'backdrop'];
  const requiredGradientKeys = ['primary', 'secondary', 'accent'];
  const requiredStatusKeys = ['success', 'warning', 'error', 'info'];
  
  return (
    requiredKeys.every(key => key in theme) &&
    requiredGlassKeys.every(key => key in theme.glass) &&
    requiredGradientKeys.every(key => key in theme.gradient) &&
    requiredStatusKeys.every(key => key in theme.status)
  );
};

/** Merge theme configurations */
export const mergeThemes = (baseTheme: ThemeColors, overrideTheme: Partial<ThemeColors>): ThemeColors => {
  return {
    ...baseTheme,
    ...overrideTheme,
    glass: {
      ...baseTheme.glass,
      ...overrideTheme.glass,
    },
    gradient: {
      ...baseTheme.gradient,
      ...overrideTheme.gradient,
    },
    status: {
      ...baseTheme.status,
      ...overrideTheme.status,
    },
  };
};

/** Generate theme variations */
export const generateThemeVariations = (baseTheme: ThemeColors) => {
  return {
    light: mergeThemes(baseTheme, {
      glass: {
        ...baseTheme.glass,
        background: baseTheme.glass.background.replace("0.1", "0.05"),
        border: baseTheme.glass.border.replace("0.2", "0.1"),
      }
    }),
    dark: mergeThemes(baseTheme, {
      glass: {
        ...baseTheme.glass,
        background: baseTheme.glass.background.replace("0.1", "0.15"),
        border: baseTheme.glass.border.replace("0.2", "0.3"),
      }
    }),
    elevated: mergeThemes(baseTheme, {
      glass: {
        ...baseTheme.glass,
        background: baseTheme.glass.background.replace("0.1", "0.2"),
        border: baseTheme.glass.border.replace("0.2", "0.4"),
        shadow: "0 16px 48px rgba(0, 0, 0, 0.2)",
      }
    }),
  };
};

/** Get theme contrast ratio */
export const getContrastRatio = (color1: string, color2: string): number => {
  // Simple contrast calculation (for basic validation)
  // In a real implementation, you'd want to use a proper color contrast library
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 1;
  
  const luminance1 = (0.299 * rgb1.r + 0.587 * rgb1.g + 0.114 * rgb1.b) / 255;
  const luminance2 = (0.299 * rgb2.r + 0.587 * rgb2.g + 0.114 * rgb2.b) / 255;
  
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

/** Check if theme meets accessibility standards */
export const isThemeAccessible = (theme: ThemeColors): boolean => {
  const textContrast = getContrastRatio(theme.text, theme.background);
  const secondaryTextContrast = getContrastRatio(theme.textSecondary, theme.background);
  
  // WCAG AA standard requires 4.5:1 for normal text and 3:1 for large text
  return textContrast >= 4.5 && secondaryTextContrast >= 3;
};
