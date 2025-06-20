
import { typography } from "./typography";
import { buttonVariants as dsButtonVariants } from "./design-system";
import { colors, spacing as dsSpacing } from "./design-tokens";

const medicalSection = {
  container: "p-4 sm:p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl",
  header: "pb-4",
  title: "text-lg font-semibold text-white",
  content: "pt-4 border-t border-white/20",
};

const formField = {
  container: "flex flex-col gap-2",
  label: "text-sm font-medium text-white/80",
  input: "flex h-10 w-full rounded-lg text-sm text-white placeholder:text-white/60 bg-white/10 backdrop-blur-md border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white/20 transition-colors px-3 py-2",
};

const layouts = {
  grid: {
    responsive: "grid grid-cols-1 md:grid-cols-2 gap-4",
    threeCol: "grid grid-cols-1 md:grid-cols-3 gap-4",
  },
  flex: {
    between: "flex items-center justify-between",
    center: "flex items-center justify-center",
    col: "flex flex-col",
  },
  flexCol: "flex flex-col gap-4" // for backward compatibility
};

const spacing = {
  ...dsSpacing,
  section: {
    lg: "space-y-8"
  }
};

const commonStyles = {
  pageContainer: "container mx-auto px-4 py-8",
  sectionSpacing: "space-y-8",
  cardPadding: "p-6",
  glassmorphic: "bg-white/10 backdrop-blur-md border border-white/20",
};

const iconWithText = "flex items-center gap-2";
const inputBase = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

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

export const buttonVariants = {
  ...dsButtonVariants,
  primary: dsButtonVariants.primary,
  default: dsButtonVariants.primary,
};

// Re-exporting for compatibility
export {
  typography,
  spacing,
  medicalSection,
  formField,
  layouts,
  iconWithText,
  inputBase,
  colors,
  commonStyles
};
