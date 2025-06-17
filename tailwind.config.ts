/**
 * Tailwind Config – Liquid Glass Edition
 * ----------------------------------------------------------------------------
 * 1. Pulls tokens from the new design-system modules (typography + colors).
 * 2. Registers blur/shadow tokens so you can use utilities like
 *    `backdrop-blur-lg` and `shadow-glass`
 * 3. Adds `glass-{level}` utility classes (subtle | default | elevated) that
 *    map 1-to-1 to our design-system glass presets.
 * 4. Remains 100 % type-safe via `satisfies Config`.
 */

import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

// Design-system tokens
import { typographyTokens } from "./src/lib/design-tokens";
import {
  colors,
  glassShadow,
  glassBackdrop,
  glassPalette,
} from "./src/lib/colors";

const config = {
  darkMode: ["class"],

  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      // Typography -----------------------------------------------------------
      fontFamily: {
        sans: typographyTokens.fontFamily.sans,
        mono: typographyTokens.fontFamily.mono,
      },
      fontWeight: {
        normal: typographyTokens.fontWeight.normal,
        medium: typographyTokens.fontWeight.medium,
        semibold: typographyTokens.fontWeight.semibold,
        bold: typographyTokens.fontWeight.bold,
      },
      fontSize: {
        "2xs": typographyTokens.fontSize["2xs"],
        xs: typographyTokens.fontSize.xs,
        sm: typographyTokens.fontSize.sm,
        base: typographyTokens.fontSize.base,
        lg: typographyTokens.fontSize.lg,
        xl: typographyTokens.fontSize.xl,
        "2xl": typographyTokens.fontSize["2xl"],
        "3xl": typographyTokens.fontSize["3xl"],
        "4xl": typographyTokens.fontSize["4xl"],
        "5xl": typographyTokens.fontSize["5xl"],
        "6xl": typographyTokens.fontSize["6xl"],
        "7xl": typographyTokens.fontSize["7xl"],
      },

      // Colors ---------------------------------------------------------------
      colors: {
        primary: colors.primary,
        gray: colors.gray,
        ...colors.status, // success | warning | error | info
      },

      // Radii ----------------------------------------------------------------
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // Liquid Glass Tokens --------------------------------------------------
      backdropBlur: {
        sm: "8px", // maps to glassBackdrop.sm
        md: "12px", // maps to glassBackdrop.md
        lg: "20px", // maps to glassBackdrop.lg
      },
      boxShadow: {
        "glass-subtle": glassShadow.subtle,
        "glass": glassShadow.default,
        "glass-elevated": glassShadow.elevated,
      },
      borderColor: {
        glass: "rgba(255,255,255,0.24)",
      },
    },
  },

  // Plugins -------------------------------------------------------------------
  plugins: [
    tailwindcssAnimate,

    /**
     * Glass Utilities – `.glass-{level}`
     * Adds ready-to-use classnames that match design-system presets.
     */
    function ({ addUtilities, theme }) {
      const buildGlass = (
        level: keyof ReturnType<typeof glassPalette> | "background",
      ) => ({
        ".glass-" + level: {
          backgroundColor:
            level === "background"
              ? "rgba(255,255,255,0.12)"
              : glassPalette("#ffffff")[level],
          backdropFilter: glassBackdrop.lg,
          border: `1px solid ${theme("borderColor.glass")}`,
          boxShadow:
            level === "subtle"
              ? theme("boxShadow.glass-subtle")
              : level === "elevated"
              ? theme("boxShadow.glass-elevated")
              : theme("boxShadow.glass"),
        },
      });

      addUtilities(
        Object.assign({},
          buildGlass("subtle"),
          buildGlass("default"),
          buildGlass("elevated"),
          buildGlass("background"),
        ),
        { variants: ["responsive", "hover"] },
      );
    },
  ],
} satisfies Config;

export default config;