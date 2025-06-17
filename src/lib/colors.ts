// ────────────────────────────────────────────────────────────────────────────────
// COLOR SYSTEM – Liquid Glass Edition
// ------------------------------------------------------------------------------
// 1.  All core semantic palettes stay intact (drop-in upgrade friendly).
// 2.  New helper utilities (`alpha()`, `rgba()`) make translucent tints a breeze.
// 3.  Each theme exposes a richer **glass** object:
//        ▸ background – backdrop-aware fill
//        ▸ border      – subtle inner/outer stroke
//        ▸ shadow      – depth-mapped shadow presets
//        ▸ backdrop    – dynamic `blur()` strength (string)
// 4.  A tiny **glassPalette** generator lets you mint additional translucency
//     variants on-the-fly (e.g. “elevated”, “subtle”, “hover”).
// 5.  Fully typed: take advantage of TS inference in design-token auto-imports.
// ────────────────────────────────────────────────────────────────────────────────

// ─── Helpers ───────────────────────────────────────────────────────────────────
/** Ensure hex is 6-digit long and prefix with # if missing */
const normalizeHex = (hex: string) => {
  const h = hex.replace(/#/g, "");
  return `#${h.length === 3 ? h.split("").map((c) => c + c).join("") : h}`.toLowerCase();
};

/** Convert #rrggbb to rgba(r,g,b,a) */
export const rgba = (hex: string, alpha = 1): string => {
  const n = normalizeHex(hex).substring(1);
  const bigint = parseInt(n, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/** Shorthand to build translucent tints from theme primary */
export const glassPalette = (base: string) => ({
  /** 8 % opacity – default frosted fill */
  subtle: rgba(base, 0.08),
  /** 12 % opacity – default surface */
  default: rgba(base, 0.12),
  /** 18 % opacity – modal/dialog surface */
  elevated: rgba(base, 0.18),
  /** 4 % opacity – outlined component hover */
  ultra: rgba(base, 0.04),
});

// Shadow presets tuned for glass surfaces
export const glassShadow = {
  subtle: "0 4px 16px rgba(0,0,0,0.05)",
  default: "0 8px 32px rgba(0,0,0,0.08)",
  elevated: "0 12px 40px rgba(0,0,0,0.12)",
} as const;

export const glassBackdrop = {
  sm: "blur(8px)",
  md: "blur(12px)",
  lg: "blur(20px)",
} as const;

// ─── Core Semantic Scales ──────────────────────────────────────────────────────
export const colors = {
  primary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
  status: {
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
} as const;

// ─── Theme Typings ─────────────────────────────────────────────────────────────
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  glass: {
    background: string;  // default opacity (≈12 %)
    border: string;
    shadow: string;
    backdrop: string;
  } & ReturnType<typeof glassPalette>; // merge in subtle/elevated/ultra tints
  gradient: {
    primary: string;
    secondary: string;
    accent: string;
  };
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

// ─── Factory to quickly build theme glass block ───────────────────────────────
const buildGlass = (baseTint: string) => ({
  ...glassPalette("#ffffff"), // always derive translucency from pure white
  background: rgba("#ffffff", 0.12),
  border: rgba("#ffffff", 0.24),
  shadow: glassShadow.default,
  backdrop: glassBackdrop.lg,
});

// ─── Predefined Themes ─────────────────────────────────────────────────────────
export const themeColors: Record<string, ThemeColors> = {
  medical: {
    primary: "#0ea5e9",
    secondary: "#0284c7",
    accent: "#3b82f6",
    background:
      "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)",
    surface: "#f8fafc",
    text: "#ffffff",
    textSecondary: "rgba(255,255,255,0.82)",
    border: "rgba(255,255,255,0.24)",
    glass: buildGlass("#ffffff"),
    gradient: {
      primary: "linear-gradient(135deg,#0ea5e9 0%,#3b82f6 100%)",
      secondary: "linear-gradient(135deg,#0284c7 0%,#0c4a6e 100%)",
      accent: "linear-gradient(135deg,#3b82f6 0%,#8b5cf6 100%)",
    },
    status: colors.status,
  },
  emerald: {
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
    background:
      "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
    surface: "#f0fdf4",
    text: "#ffffff",
    textSecondary: "rgba(255,255,255,0.82)",
    border: "rgba(255,255,255,0.24)",
    glass: buildGlass("#ffffff"),
    gradient: {
      primary: "linear-gradient(135deg,#10b981 0%,#34d399 100%)",
      secondary: "linear-gradient(135deg,#059669 0%,#047857 100%)",
      accent: "linear-gradient(135deg,#34d399 0%,#6ee7b7 100%)",
    },
    status: colors.status,
  },
  purple: {
    primary: "#8b5cf6",
    secondary: "#7c3aed",
    accent: "#a78bfa",
    background:
      "linear-gradient(135deg, #4c1d95 0%, #5b21b6 50%, #6d28d9 100%)",
    surface: "#faf5ff",
    text: "#ffffff",
    textSecondary: "rgba(255,255,255,0.82)",
    border: "rgba(255,255,255,0.24)",
    glass: buildGlass("#ffffff"),
    gradient: {
      primary: "linear-gradient(135deg,#8b5cf6 0%,#a78bfa 100%)",
      secondary: "linear-gradient(135deg,#7c3aed 0%,#6d28d9 100%)",
      accent: "linear-gradient(135deg,#a78bfa 0%,#c4b5fd 100%)",
    },
    status: colors.status,
  },
};

// ─── Utility APIs ─────────────────────────────────────────────────────────────
export const getStatusColor = (
  theme: ThemeColors,
  status: keyof ThemeColors["status"],
) => theme.status[status];

export const getGradientStyles = (
  theme: ThemeColors,
  type: keyof ThemeColors["gradient"] = "primary",
) => theme.gradient[type];

export const getGlassColorStyles = (
  theme: ThemeColors,
  level: keyof ReturnType<typeof glassPalette> | "background" = "default",
) => {
  const bg = theme.glass[level] ?? theme.glass.background;
  return {
    backgroundColor: bg,
    backdropFilter: theme.glass.backdrop,
    border: `1px solid ${theme.glass.border}`,
    boxShadow: theme.glass.shadow,
  } as const;
};
