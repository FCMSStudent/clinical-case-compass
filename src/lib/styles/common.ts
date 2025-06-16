import React from "react"; // Though not directly used by these variables, it's good practice if other common utils are added.
// It's also possible some of these string constants could evolve into components.

/** Enhanced focus ring for interactive elements */
export const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

/** Disabled state styling */
export const disabledState = "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed";

/** Enhanced glassmorphic effect */
export const glassmorphic = `backdrop-blur-md border-white/20 transition-all duration-200 ease-out`;

/** Enhanced glassmorphic backgrounds with better depth */
export const glass = {
  subtle: `${glassmorphic} bg-white/10 shadow-sm`,
  elevated: `${glassmorphic} bg-white/15 shadow-md border-white/25`,
  overlay: `backdrop-blur-xl border-white/25 bg-white/10 shadow-lg`,
  card: `${glassmorphic} bg-white/10 rounded-xl shadow-sm border`,
  cardElevated: `${glassmorphic} bg-white/15 rounded-xl shadow-md border`
} as const;

/** Base styles for buttons */
export const buttonBase = `
  inline-flex items-center justify-center whitespace-nowrap rounded-xl
  text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${disabledState}
  h-10 px-4
`.trim();

/** Button variants using the design system */
export const buttonVariants = {
  primary: `${buttonBase} bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 shadow-md`,
  secondary: `${buttonBase} bg-white/10 backdrop-blur-md text-white/70 border border-white/20 hover:bg-white/20`,
  outline: `${buttonBase} bg-transparent text-white border border-white/20 hover:bg-white/10`,
  ghost: `${buttonBase} bg-transparent text-white/70 hover:bg-white/10`,
  destructive: `${buttonBase} bg-red-500/10 text-red-300 border border-red-400/30 hover:bg-red-500/20`,
  success: `${buttonBase} bg-green-500/10 text-green-300 border border-green-400/30 hover:bg-green-500/20`,
  warning: `${buttonBase} bg-yellow-500/20 text-yellow-300 border border-yellow-400/30 hover:bg-yellow-500/20`,
  error: `${buttonBase} bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/20`,
  info: `${buttonBase} bg-blue-500/20 text-blue-300 border border-blue-400/30 hover:bg-blue-500/20`,
  medical: `${buttonBase} bg-sky-500/20 text-sky-300 border border-sky-400/30 hover:bg-sky-500/20`,
  critical: `${buttonBase} bg-red-600 text-white border border-red-500 hover:bg-red-700 font-bold`,
} as const;
