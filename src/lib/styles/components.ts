// ────────────────────────────────────────────────────────────────────────────────
// COMPONENT DESIGN TOKENS
// ────────────────────────────────────────────────────────────────────────────────

/** Button System */
export const button = {
  base: `inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium
         transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2
         focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
         disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed`,
  size: {
    default: 'h-10 px-4 text-sm',
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  },
  variant: {
    primary: 'bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 shadow-md',
    secondary: 'bg-white/10 backdrop-blur-md text-white/70 border border-white/20 hover:bg-white/20',
    outline: 'bg-transparent text-white border border-white/20 hover:bg-white/10',
    ghost: 'bg-transparent text-white/70 hover:bg-white/10',
    destructive: 'bg-red-500/10 text-red-300 border border-red-400/30 hover:bg-red-500/20',
  },
};

/** Input System */
export const input = {
  base: `flex w-full rounded-lg text-sm text-white placeholder:text-white/60
         bg-white/10 backdrop-blur-md border border-white/20
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50
         focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
         disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed
         hover:bg-white/20 hover:border-white/30 transition-all duration-200 ease-out`,
  size: {
    default: 'h-10 px-4 text-sm',
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-4 text-base',
  },
};

/** Card System */
export const card = {
  base: `backdrop-blur-md border border-white/20 transition-all duration-200 ease-out rounded-xl`,
  variant: {
    default: 'bg-white/10 shadow-sm',
    elevated: 'bg-white/15 shadow-md border-white/25',
    interactive: 'bg-white/15 shadow-md hover:bg-white/25 hover:shadow-xl hover:shadow-white/10 cursor-pointer hover:scale-[1.01]',
    featured: 'bg-white/15 ring-1 ring-white/30 shadow-lg shadow-white/5',
    compact: 'bg-white/10 shadow-sm',
  },
  padding: {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  },
};

/** Bento Grid System */
export const bento = {
  container: {
    base: 'grid auto-rows-min grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    gap: {
      tight: 'gap-3',
      default: 'gap-4',
      loose: 'gap-6',
    },
  },
  card: {
    size: {
      compact: 'min-h-[160px]',
      default: 'min-h-[200px]',
      medium: 'min-h-[240px]',
      large: 'min-h-[280px]',
      hero: 'min-h-[320px]',
      tall: 'min-h-[380px]',
    },
    span: {
      small: 'col-span-1 sm:col-span-2',
      medium: 'col-span-2 lg:col-span-3',
      large: 'col-span-2 md:col-span-3 lg:col-span-4',
      hero: 'col-span-2 md:col-span-3 lg:col-span-4',
      wide: 'col-span-full lg:col-span-6',
      tall: 'col-span-2 lg:col-span-3',
    },
  },
};
