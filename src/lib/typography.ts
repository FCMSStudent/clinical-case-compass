// -----------------------------------------------------------------------------
// Typography Tokens – Liquid Glass Edition
// -----------------------------------------------------------------------------
// 1. Consolidates heading / body scales into a single object that supports
//    responsive break‑points via Tailwind’s mobile‑first classes.
// 2. All heading tokens include dynamic letter‑spacing + weight to mimic Apple
//    “SF Pro” system typography while preserving your dark‑on‑glass contrast.
// 3. Provides helper fns (`createTypeClass`) that combine preset + custom
//    classes and fluid utility (`fluid()`) for clamp‑based sizing.
// -----------------------------------------------------------------------------

// Helper – build a clamp() string ---------------------------------------------
const fluid = (min: number, vw: number, max: number, unit = "rem") =>
  `clamp(${min}${unit}, ${vw}vw, ${max}${unit})`;

// -----------------------------------------------------------------------------
// Core scale -------------------------------------------------------------------
export const typography = {
  // Headings -----------------------------------------------------------------
  h1: `text-[${fluid(2.25, 2.5, 3.75)}] font-bold leading-tight tracking-tight text-white`, // 36‑60px
  h2: `text-[${fluid(1.875, 2, 3.125)}] font-bold leading-tight tracking-tight text-white`, // 30‑50px
  h3: `text-[${fluid(1.5, 1.6, 2.5)}] font-semibold leading-tight tracking-tight text-white`, // 24‑40px
  h4: `text-[${fluid(1.25, 1.3, 2)}] font-semibold leading-snug text-white`, // 20‑32px
  h5: `text-[${fluid(1.125, 1.2, 1.5)}] font-semibold leading-snug text-white`, // 18‑24px
  h6: `text-base font-semibold leading-normal text-white`,

  // Body ---------------------------------------------------------------------
  body: {
    large: `text-lg leading-relaxed text-white`,
    default: `text-base leading-relaxed text-white`,
    small: `text-sm leading-normal text-white/80`,
    caption: `text-xs leading-tight text-white/60`,
    toString() { return this.default; },
  },

  // Aliases ------------------------------------------------------------------
  bodyLarge: `text-lg leading-relaxed text-white`,
  bodyDefault: `text-base leading-relaxed text-white`,
  bodySmall: `text-sm leading-normal text-white/80`,
  caption: `text-xs leading-tight text-white/60`,

  // Inputs & UI --------------------------------------------------------------
  label: `text-sm font-medium text-white`,
  labelSmall: `text-xs font-medium text-white/80`,
  placeholder: `placeholder:text-white/60`,

  // Monospaced ---------------------------------------------------------------
  vital: `font-mono text-lg tabular-nums text-white`,
  measurement: `font-mono text-base tabular-nums text-white`,

  // Components ---------------------------------------------------------------
  button: `text-sm font-medium`,
  link: `font-medium underline underline-offset-4`,
  code: `font-mono text-sm bg-white/10 px-2 py-1 rounded text-white/90`,

  // Medical semantic ---------------------------------------------------------
  dosage: `font-mono text-sm text-white/90`,
  diagnosis: `text-base font-semibold text-white`,
  note: `text-sm text-white/80`,
} as const;

// Legacy alias ---------------------------------------------------------------
export const typo = typography;

// -----------------------------------------------------------------------------
// Status helpers --------------------------------------------------------------
const statusColor = {
  normal: "text-green-400",
  elevated: "text-yellow-400",
  critical: "text-red-400",
} as const;

type VitalStatus = keyof typeof statusColor;

type Priority = "low" | "medium" | "high" | "urgent";
const priorityMap: Record<Priority, string> = {
  low: "text-green-400",
  medium: "text-yellow-400",
  high: "text-orange-400",
  urgent: "text-red-400",
};

export const vitalSignsText = (s: VitalStatus) => statusColor[s];
export const medicalPriorityText = (p: Priority) => priorityMap[p];
export const clinicalStatusText = (s: "stable" | "monitoring" | "acute" | "chronic") =>
  ({
    stable: "text-green-400",
    monitoring: "text-yellow-400",
    acute: "text-red-400",
    chronic: "text-blue-400",
  }[s]);
export const treatmentStatusText = (
  s: "complete" | "ongoing" | "pending" | "emergency",
) =>
  ({
    complete: "text-green-400",
    ongoing: "text-blue-400",
    pending: "text-yellow-400",
    emergency: "text-red-400",
  }[s]);

export const formatMedicalMeasurement = (
  value: string,
  unit: string,
  status: VitalStatus,
) => ({ value, unit, className: vitalSignsText(status) });

// -----------------------------------------------------------------------------
// Responsive shortcuts --------------------------------------------------------
export const responsiveType = {
  hero: "text-3xl md:text-4xl lg:text-6xl",
  display: "text-2xl md:text-3xl lg:text-4xl",
  h1: "text-2xl md:text-3xl lg:text-4xl",
  h2: "text-xl md:text-2xl lg:text-3xl",
  body: "text-sm md:text-base",
} as const;

// -----------------------------------------------------------------------------
// Utility ---------------------------------------------------------------------
export const createTypographyClass = (
  variant: keyof typeof typography | keyof typeof responsiveType,
  extras = "",
) => {
  if (variant in responsiveType)
    return `${responsiveType[variant as keyof typeof responsiveType]} ${extras}`.trim();
  if (variant in typography)
    return `${(typography as any)[variant]} ${extras}`.trim();
  return extras.trim();
};
