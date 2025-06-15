
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
