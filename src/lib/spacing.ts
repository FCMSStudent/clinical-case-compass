// ────────────────────────────────────────────────────────────────────────────────
// SPACING & LAYOUT SYSTEM - APPLE-INSPIRED 8PT GRID
// ────────────────────────────────────────────────────────────────────────────────

/**
 * 8-Point Grid System
 * 
 * Apple's Human Interface Guidelines align with an 8pt grid system that balances
 * density and openness for optimal readability and visual rhythm.
 * 
 * Base unit: 8px (0.5rem)
 * Half-step: 4px (0.25rem) for finer adjustments
 * 
 * All spacing values should be multiples of 8px to maintain consistent rhythm.
 */

/** Core Spacing Scale (8pt Grid) */
export const spacing = {
  // Base 8pt increments
  0: '0',
  1: '0.25rem',   // 4px - half-step for fine adjustments
  2: '0.5rem',    // 8px - base unit
  3: '0.75rem',   // 12px - 1.5x base
  4: '1rem',      // 16px - 2x base (standard iOS margin)
  5: '1.25rem',   // 20px - 2.5x base
  6: '1.5rem',    // 24px - 3x base
  8: '2rem',      // 32px - 4x base
  10: '2.5rem',   // 40px - 5x base
  12: '3rem',     // 48px - 6x base
  16: '4rem',     // 64px - 8x base
  20: '5rem',     // 80px - 10x base
  24: '6rem',     // 96px - 12x base
  32: '8rem',     // 128px - 16x base
  40: '10rem',    // 160px - 20x base
  48: '12rem',    // 192px - 24x base
  56: '14rem',    // 224px - 28x base
  64: '16rem',    // 256px - 32x base
} as const;

/** Apple-Inspired Layout Spacing */
export const layoutSpacing = {
  // Container margins (Apple standard: 16pt on phone, more on larger screens)
  container: {
    mobile: '1rem',      // 16px - iOS standard
    tablet: '1.5rem',    // 24px - iPad standard
    desktop: '2rem',     // 32px - macOS standard
    wide: '3rem',        // 48px - large displays
  },
  
  // Section spacing (generous vertical rhythm)
  section: {
    compact: '2rem',     // 32px - between related sections
    default: '3rem',     // 48px - between major sections
    spacious: '4rem',    // 64px - between page sections
    hero: '6rem',        // 96px - hero sections
  },
  
  // Component spacing
  component: {
    tight: '0.5rem',     // 8px - within compact components
    default: '1rem',     // 16px - standard component spacing
    comfortable: '1.5rem', // 24px - comfortable component spacing
    spacious: '2rem',    // 32px - spacious component spacing
  },
  
  // Grid gaps (consistent with 8pt system)
  grid: {
    tight: '0.5rem',     // 8px - compact grids
    default: '1rem',     // 16px - standard grid gap
    comfortable: '1.5rem', // 24px - comfortable grid gap
    spacious: '2rem',    // 32px - spacious grid gap
  },
  
  // List spacing (uniform vertical rhythm)
  list: {
    compact: '0.5rem',   // 8px - compact lists
    default: '0.75rem',  // 12px - standard list spacing
    comfortable: '1rem', // 16px - comfortable list spacing
    spacious: '1.5rem',  // 24px - spacious list spacing
  },
} as const;

/** Border Radius System (Apple-inspired) */
export const borderRadius = {
  none: '0',
  sm: 'calc(var(--radius) - 4px)',    // Smaller elements
  md: 'calc(var(--radius) - 2px)',    // Medium elements
  lg: 'var(--radius)',                // Standard radius (16px)
  xl: 'calc(var(--radius) + 4px)',    // Large elements
  '2xl': 'calc(var(--radius) + 8px)', // Extra large elements
  full: '9999px',
} as const;

/** Shadow System (Apple-inspired soft shadows) */
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

/** Layout System (Apple-inspired) */
export const layout = {
  // Container system with Apple-inspired max-widths
  container: {
    sm: 'max-w-screen-sm',    // 640px
    md: 'max-w-screen-md',    // 768px
    lg: 'max-w-screen-lg',    // 1024px
    xl: 'max-w-screen-xl',    // 1280px
    '2xl': 'max-w-screen-2xl', // 1536px
    full: 'max-w-full',
    // Apple-inspired readable widths
    readable: 'max-w-4xl',     // 896px - optimal reading width
    comfortable: 'max-w-5xl',  // 1024px - comfortable content width
    spacious: 'max-w-6xl',     // 1152px - spacious content width
  },
  
  // Grid system with 8pt-aligned gaps
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
      tight: 'gap-2',      // 8px
      default: 'gap-4',    // 16px
      comfortable: 'gap-6', // 24px
      spacious: 'gap-8',   // 32px
    },
  },
  
  // Flexbox system
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
  
  // Add missing size properties
  xs: '6rem',      // 96px
  sm: '8rem',      // 128px  
  md: '10rem',     // 160px
} as const;

/** Component Size System (Apple-inspired) */
export const sizes = {
  // Button sizes with Apple's 44px minimum touch target
  button: {
    sm: 'h-9 px-3 text-xs',      // 36px height + 12px padding = 48px touch target
    md: 'h-11 px-4 text-sm',     // 44px height + 16px padding = 60px touch target
    lg: 'h-12 px-6 text-base',   // 48px height + 24px padding = 72px touch target
  },
  
  // Input sizes with comfortable padding
  input: {
    sm: 'h-9 px-3 text-xs',      // 36px height
    md: 'h-11 px-4 text-sm',     // 44px height
    lg: 'h-12 px-4 text-base',   // 48px height
  },
  
  // Card padding with 8pt grid alignment
  card: {
    compact: 'p-3',      // 12px - compact cards
    default: 'p-4',      // 16px - standard cards
    comfortable: 'p-6',  // 24px - comfortable cards
    spacious: 'p-8',     // 32px - spacious cards
  },
  
  // Bento grid sizes with 8pt alignment
  bento: {
    compact: 'min-h-[160px]',    // 160px (20 * 8px)
    default: 'min-h-[200px]',    // 200px (25 * 8px)
    medium: 'min-h-[240px]',     // 240px (30 * 8px)
    large: 'min-h-[280px]',      // 280px (35 * 8px)
    hero: 'min-h-[320px]',       // 320px (40 * 8px)
    tall: 'min-h-[380px]',       // 380px (47.5 * 8px)
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

/** Breakpoint System (Apple-inspired) */
export const breakpoints = {
  xs: '0px',
  sm: '640px',   // Small phones
  md: '768px',   // Large phones / Small tablets
  lg: '1024px',  // Tablets
  xl: '1280px',  // Small laptops
  '2xl': '1536px', // Large displays
} as const;

/** Apple-Inspired Spacing Utilities */
export const spacingUtilities = {
  // Container padding utilities
  containerPadding: {
    mobile: 'px-4',      // 16px horizontal padding
    tablet: 'px-6',      // 24px horizontal padding
    desktop: 'px-8',     // 32px horizontal padding
    wide: 'px-12',       // 48px horizontal padding
  },
  
  // Section spacing utilities
  sectionSpacing: {
    compact: 'py-8',     // 32px vertical spacing
    default: 'py-12',    // 48px vertical spacing
    spacious: 'py-16',   // 64px vertical spacing
    hero: 'py-24',       // 96px vertical spacing
  },
  
  // Component spacing utilities
  componentSpacing: {
    tight: 'space-y-2',      // 8px between items
    default: 'space-y-4',    // 16px between items
    comfortable: 'space-y-6', // 24px between items
    spacious: 'space-y-8',   // 32px between items
  },
  
  // Grid gap utilities
  gridGap: {
    tight: 'gap-2',      // 8px gap
    default: 'gap-4',    // 16px gap
    comfortable: 'gap-6', // 24px gap
    spacious: 'gap-8',   // 32px gap
  },
  
  // Margin utilities for Apple-style breathing room
  margins: {
    // Horizontal margins
    h: {
      tight: 'mx-2',     // 8px horizontal margin
      default: 'mx-4',   // 16px horizontal margin
      comfortable: 'mx-6', // 24px horizontal margin
      spacious: 'mx-8',  // 32px horizontal margin
    },
    // Vertical margins
    v: {
      tight: 'my-2',     // 8px vertical margin
      default: 'my-4',   // 16px vertical margin
      comfortable: 'my-6', // 24px vertical margin
      spacious: 'my-8',  // 32px vertical margin
    },
  },
} as const;

/** Responsive Spacing Patterns */
export const responsiveSpacing = {
  // Responsive container padding
  container: {
    mobile: 'px-4',      // 16px on mobile
    tablet: 'px-6',      // 24px on tablet
    desktop: 'px-8',     // 32px on desktop
    wide: 'px-12',       // 48px on wide screens
  },
  
  // Responsive section spacing
  section: {
    mobile: 'py-8',      // 32px on mobile
    tablet: 'py-12',     // 48px on tablet
    desktop: 'py-16',    // 64px on desktop
    wide: 'py-24',       // 96px on wide screens
  },
  
  // Responsive grid gaps
  grid: {
    mobile: 'gap-4',     // 16px on mobile
    tablet: 'gap-6',     // 24px on tablet
    desktop: 'gap-8',    // 32px on desktop
    wide: 'gap-12',      // 48px on wide screens
  },
} as const;
