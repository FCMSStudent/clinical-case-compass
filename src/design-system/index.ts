// ────────────────────────────────────────────────────────────────────────────────
// UNIFIED DESIGN SYSTEM - SINGLE SOURCE OF TRUTH
// ────────────────────────────────────────────────────────────────────────────────

// Core Design Tokens
export * from './tokens/colors';
export * from './tokens/spacing';
export * from './tokens/typography';
export * from './tokens/design-tokens';

// Theme System
export * from './themes/theme-system';

// Component System
export * from './components/components';
export * from './components/glass-effects';

// Animation System
export * from './animations/motion';
export * from './animations/animations';

// Utilities
export * from './background-config';
export * from './accessibility';
export * from './interactions';
export * from './performance';
export * from './ui-styles';

// Unified Design System Object
import { colors, themeColors } from './tokens/colors';
import { spacing, borderRadius, shadows, layout, sizes, zIndex, breakpoints } from './tokens/spacing';
import { typography, typographyTokens } from './tokens/typography';
import { 
  buttonVariants, 
  button, 
  input, 
  card, 
  bento, 
  getComponentStyles, 
  getBentoStyles,
  focusRing,
  disabledState,
  glassmorphic,
  glass
} from './components/components';
import { 
  liquidGlassEffects, 
  applyLiquidGlass, 
  getGlassHoverVariants, 
  getGlassTransitionVariants,
  getPulseAnimation,
  getParallaxEffect,
  liquidGlassClasses,
  getGlassClasses
} from './components/glass-effects';
import { ThemeProvider, useTheme, ThemeSwitcher, themes } from './themes/theme-system';
import { backgroundConfig } from './background-config';
import { animations } from './animations/animations';

export const DesignSystem = {
  // Design Tokens
  tokens: {
    colors,
    themeColors,
    spacing,
    borderRadius,
    shadows,
    layout,
    sizes,
    zIndex,
    breakpoints,
    typography,
    typographyTokens,
  },
  
  // Component System
  components: {
    buttonVariants,
    button,
    input,
    card,
    bento,
    getComponentStyles,
    getBentoStyles,
    focusRing,
    disabledState,
    glassmorphic,
    glass,
  },
  
  // Glass Effects
  glass: {
    liquidGlassEffects,
    applyLiquidGlass,
    getGlassHoverVariants,
    getGlassTransitionVariants,
    getPulseAnimation,
    getParallaxEffect,
    liquidGlassClasses,
    getGlassClasses,
  },
  
  // Theme System
  theme: {
    ThemeProvider,
    useTheme,
    ThemeSwitcher,
    themes,
  },
  
  // Utilities
  backgroundConfig,
  animations,
} as const;

// Default export
export default DesignSystem;