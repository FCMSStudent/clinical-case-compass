
/**
 * A collection of centralized Tailwind CSS class strings for building a consistent UI.
 * Using these constants ensures that components share the same styling and can be
 * updated from a single source of truth.
 */

// -----------------------------------------------------------------------------
// INTERACTIVITY & STATE STYLES
// -----------------------------------------------------------------------------

/** Consistent focus ring styles for interactive elements. */
export const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50";

/** Styles for disabled elements to make them non-interactive and visually distinct. */
export const disabledState = "disabled:pointer-events-none disabled:opacity-50";

/** A general-purpose transition for properties like color, background, and shadow. */
export const transitionAll = "transition-all duration-200";

// -----------------------------------------------------------------------------
// GLASSMORPHISM & BACKGROUND STYLES
// -----------------------------------------------------------------------------

/** Base classes for a glass-like effect on components. */
export const glassmorphic = `backdrop-blur-md border border-white/20 ${transitionAll}`;

/** A standard glass component background with a subtle tint. */
export const glassmorphicBg = `${glassmorphic} bg-white/10`;

/** An elevated or highlighted glass component background with a brighter tint. */
export const glassmorphicBgElevated = `${glassmorphic} bg-white/20`;

/** A more intense glass effect for overlays like Dialogs, Popovers, and Toasts. */
export const glassmorphicOverlay = `backdrop-blur-xl border border-white/20 bg-white/10`;

// -----------------------------------------------------------------------------
// SHARED COMPONENT STYLES
// -----------------------------------------------------------------------------

/** Base styles for all input-like components (Input, Textarea, etc.). */
export const inputLikeBase = `flex w-full rounded-xl text-sm text-white placeholder:text-white/60 ${glassmorphicBg} ${focusRing} ${disabledState}`;

/** Base styles for all button variants. */
export const buttonBase = `inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ${transitionAll} ${focusRing} ${disabledState}`;

