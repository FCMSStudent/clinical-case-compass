// Framer motion elements that might still be used directly or for other components not refactored.
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
// Lucide icons - keep if they are used by other components not part of this refactor
import { Stethoscope, Pill } from "lucide-react";

// Import design tokens and configurations that are globally used or re-exported
import { typography } from "./typography";
import { typographyTokens, colors, spacing, borderRadius, shadows } from "./design-tokens";
import { backgroundConfig } from "./background-config";

// Re-export elements from the new style modules
export * from "./styles/common";
export * from "./styles/theme";
export * from "./styles/components";
export * from "./styles/animations";
export * from "./styles/utils";

// Re-export core design tokens and configurations
export {
  typographyTokens,
  typography,
  colors,
  spacing,
  borderRadius,
  shadows,
  backgroundConfig,
  // Potentially re-export framer-motion and lucide-react if they were part of the original public API
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  Stethoscope,
  Pill
};

// The default export should now compose from the new modules and existing tokens/configs.
// This provides a single point of access to the design system, maintaining the original API.
import * as commonStyles from "./styles/common";
import * as themeSystem from "./styles/theme";
import * as componentStyles from "./styles/components";
import * as animationSystem from "./styles/animations";
import * as utils from "./styles/utils";

export default {
  // Tokens and configs
  typographyTokens,
  typography,
  colors,
  spacing,
  borderRadius,
  shadows,
  backgroundConfig,

  // Styles from common.ts
  ...commonStyles,

  // Theme system from theme.ts (excluding ThemeProvider and useTheme if they are meant to be used via named exports)
  // Typically themes object is what you'd include in a default export.
  themes: themeSystem.themes,

  // Component styles from components.ts
  ...componentStyles,

  // Animations and transitions from animations.ts
  ...animationSystem,

  // Utilities from utils.ts
  ...utils,

  // It's debatable whether ThemeProvider and useTheme should be part of the default export.
  // Named exports are generally preferred for them.
  // ThemeProvider: themeSystem.ThemeProvider, // Example if you choose to include
  // useTheme: themeSystem.useTheme, // Example if you choose to include

  // Framer motion and lucide icons can also be part of the default export if desired
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  Stethoscope,
  Pill
};
