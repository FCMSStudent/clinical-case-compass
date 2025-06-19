// Legacy icon size (deprecated - use iconography system instead)
export const ICON_SIZE = "h-5 w-5" as const;

// New iconography system constants
export const ICON_SIZES = {
  xs: "h-3 w-3",
  sm: "h-4 w-4", 
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
  "2xl": "h-12 w-12"
} as const;

export const ICON_WEIGHTS = {
  thin: "[&>path]:stroke-[1.5px]",
  regular: "[&>path]:stroke-[2px]",
  medium: "[&>path]:stroke-[2.5px]", 
  bold: "[&>path]:stroke-[3px]"
} as const;

// Common icon configurations for different contexts
export const ICON_CONFIGS = {
  navigation: {
    weight: "regular" as const,
    size: "md" as const,
    color: "muted" as const
  },
  button: {
    weight: "medium" as const,
    size: "md" as const,
    color: "default" as const
  },
  card: {
    weight: "regular" as const,
    size: "lg" as const,
    color: "primary" as const
  },
  status: {
    weight: "medium" as const,
    size: "sm" as const,
    color: "default" as const
  },
  action: {
    weight: "medium" as const,
    size: "md" as const,
    color: "primary" as const
  }
} as const;

