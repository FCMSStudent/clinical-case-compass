
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

/** Enhanced hover states for interactive elements. */
export const hoverState = "hover:bg-white/20 hover:border-white/30";

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
// TYPOGRAPHY STYLES
// -----------------------------------------------------------------------------

/** Primary text color for headings and important content. */
export const textPrimary = "text-white";

/** Secondary text color for descriptions and less important content. */
export const textSecondary = "text-white/70";

/** Muted text color for labels and subtle information. */
export const textMuted = "text-white/60";

/** Error text color for validation messages. */
export const textError = "text-red-300";

/** Success text color for confirmation messages. */
export const textSuccess = "text-green-300";

// -----------------------------------------------------------------------------
// SHARED COMPONENT STYLES
// -----------------------------------------------------------------------------

/** Base styles for all input-like components (Input, Textarea, etc.). */
export const inputLikeBase = `flex w-full rounded-xl text-sm ${textPrimary} placeholder:${textMuted} ${glassmorphicBg} ${focusRing} ${disabledState} ${hoverState}`;

/** Base styles for all button variants. */
export const buttonBase = `inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ${transitionAll} ${focusRing} ${disabledState}`;

/** Standard card styles with glassmorphic effect. */
export const cardBase = `${glassmorphicBg} rounded-xl shadow-sm`;

/** Elevated card styles for important content. */
export const cardElevated = `${glassmorphicBgElevated} rounded-xl shadow-md`;

// -----------------------------------------------------------------------------
// LAYOUT & SPACING
// -----------------------------------------------------------------------------

/** Standard container padding for page content. */
export const containerPadding = "px-4 sm:px-6 lg:px-8";

/** Standard spacing between sections. */
export const sectionSpacing = "space-y-6";

/** Standard grid gaps for responsive layouts. */
export const gridGap = "gap-4 sm:gap-6";

/** Standard form field spacing. */
export const formSpacing = "space-y-4";

// -----------------------------------------------------------------------------
// RESPONSIVE DESIGN
// -----------------------------------------------------------------------------

/** Standard responsive grid for cards/items. */
export const responsiveGrid = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

/** Standard responsive flex layout. */
export const responsiveFlex = "flex flex-col md:flex-row md:items-center md:justify-between";

// -----------------------------------------------------------------------------
// STATE INDICATORS
// -----------------------------------------------------------------------------

/** Loading state styles. */
export const loadingState = "animate-pulse bg-white/10";

/** Error state styles for components. */
export const errorState = "border-red-400/50 bg-red-500/10 text-red-300";

/** Success state styles for components. */
export const successState = "border-green-400/50 bg-green-500/10 text-green-300";
