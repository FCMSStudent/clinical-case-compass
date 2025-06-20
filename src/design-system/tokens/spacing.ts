// ────────────────────────────────────────────────────────────────────────────────
// SPACING & LAYOUT SYSTEM
// ────────────────────────────────────────────────────────────────────────────────

/** Spacing System */
export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
} as const;

/** Border Radius System */
export const borderRadius = {
  none: '0',
  sm: 'calc(var(--radius) - 4px)',
  md: 'calc(var(--radius) - 2px)',
  lg: 'var(--radius)',
  xl: 'calc(var(--radius) + 4px)',
  '2xl': 'calc(var(--radius) + 8px)',
  full: '9999px',
} as const;

/** Shadow System */
export const shadows = {
  // Base shadows - softer and more diffuse
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
  md: '0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -4px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 25px -3px rgba(0, 0, 0, 0.08), 0 4px 10px -6px rgba(0, 0, 0, 0.06)',
  xl: '0 20px 40px -5px rgba(0, 0, 0, 0.08), 0 8px 16px -8px rgba(0, 0, 0, 0.06)',
  
  // Glass-specific shadows - very soft and diffuse
  glass: '0 8px 32px rgba(0, 0, 0, 0.08)',
  glassElevated: '0 12px 48px rgba(0, 0, 0, 0.12)',
  glassFloating: '0 16px 64px rgba(0, 0, 0, 0.1)',
  glassModal: '0 24px 80px rgba(0, 0, 0, 0.15)',
  
  // Ultra-soft shadows for subtle elevation
  soft: '0 2px 8px rgba(0, 0, 0, 0.04)',
  softer: '0 4px 16px rgba(0, 0, 0, 0.06)',
  softest: '0 8px 24px rgba(0, 0, 0, 0.08)',
  
  // Inner highlights for glass panels (like macOS windows)
  innerHighlight: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)',
  innerHighlightMedium: 'inset 0 2px 4px rgba(255, 255, 255, 0.2)',
  innerHighlightStrong: 'inset 0 4px 8px rgba(255, 255, 255, 0.15)',
  
  // Combined glass effects
  glassWithHighlight: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
  glassElevatedWithHighlight: '0 12px 48px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
  glassFloatingWithHighlight: '0 16px 64px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
  glassModalWithHighlight: '0 24px 80px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
} as const;

/** Layout System */
export const layout = {
  container: {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  },
  grid: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    },
    rows: {
      auto: 'grid-rows-auto',
      min: 'auto-rows-min',
      max: 'auto-rows-max',
    },
    gap: {
      none: 'gap-0',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
  },
  flex: {
    direction: {
      row: 'flex-row',
      col: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'col-reverse': 'flex-col-reverse',
    },
    wrap: {
      wrap: 'flex-wrap',
      nowrap: 'flex-nowrap',
      'wrap-reverse': 'flex-wrap-reverse',
    },
    justify: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    align: {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
  },
} as const;

/** Component Size System */
export const sizes = {
  button: {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  },
  input: {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-4 text-base',
  },
  card: {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  },
  bento: {
    compact: 'min-h-[160px]',
    default: 'min-h-[200px]',
    medium: 'min-h-[240px]',
    large: 'min-h-[280px]',
    hero: 'min-h-[320px]',
    tall: 'min-h-[380px]',
  },
} as const;

/** Z-Index System */
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

/** Breakpoint System */
export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const; 