// ────────────────────────────────────────────────────────────────────────────────
// COMPONENT STYLES SYSTEM - APPLE LIQUID GLASS ENHANCED
// ────────────────────────────────────────────────────────────────────────────────

/** Enhanced focus ring for interactive elements with glass enhancement */
export const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105";

/** Disabled state styling */
export const disabledState = "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed";

/** Enhanced glassmorphic effect with Apple-inspired enhancements */
export const glassmorphic = `backdrop-blur-md border-white/20 transition-all duration-300 ease-out`;

/** Enhanced glassmorphic backgrounds with Apple liquid glass effects */
export const glass = {
  // Base glass variants
  subtle: `${glassmorphic} bg-white/5 shadow-sm backdrop-blur-[20px] brightness-110`,
  elevated: `${glassmorphic} bg-white/15 shadow-md border-white/25 backdrop-blur-[30px] saturate-150 brightness-105`,
  overlay: `backdrop-blur-xl border-white/25 bg-white/10 shadow-lg backdrop-blur-[40px] saturate-180 contrast-110`,
  
  // Card variants with enhanced glass effects
  card: `${glassmorphic} bg-white/8 rounded-xl shadow-sm border backdrop-blur-[20px] brightness-110`,
  cardElevated: `${glassmorphic} bg-white/12 rounded-xl shadow-md border backdrop-blur-[30px] saturate-150 brightness-105`,
  
  // Contextual glass variants
  navigation: `${glassmorphic} bg-white/18 rounded-xl shadow-md border backdrop-blur-[30px] saturate-150 brightness-105`,
  modal: `${glassmorphic} bg-white/25 rounded-xl shadow-lg border backdrop-blur-[50px] saturate-180 contrast-110`,
  alert: `${glassmorphic} bg-white/20 rounded-xl shadow-md border backdrop-blur-[30px] saturate-150 brightness-105`,
  
  // Interactive glass variants with enhanced hover states
  interactive: `${glassmorphic} bg-white/10 rounded-xl shadow-sm border hover:bg-white/25 hover:shadow-xl hover:shadow-white/10 hover:scale-[1.02] hover:brightness-105 hover:saturate-110 cursor-pointer transition-all duration-300 ease-out`,
  featured: `${glassmorphic} bg-white/15 ring-1 ring-white/30 shadow-lg shadow-white/5 backdrop-blur-[30px] saturate-150 brightness-105`,
  
  // Surface elevation variants
  elevation50: `${glassmorphic} bg-white/2 shadow-sm`,
  elevation100: `${glassmorphic} bg-white/5 shadow-sm`,
  elevation200: `${glassmorphic} bg-white/8 shadow-md`,
  elevation300: `${glassmorphic} bg-white/12 shadow-md`,
  elevation400: `${glassmorphic} bg-white/18 shadow-lg`,
} as const;

/** Base styles for buttons with enhanced glass effects */
export const buttonBase = `
  inline-flex items-center justify-center whitespace-nowrap rounded-xl 
  text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105 ${disabledState}
  h-10 px-4 backdrop-blur-md
`.trim();

/** Button variants using the enhanced design system with Apple-inspired effects */
export const buttonVariants = {
  primary: `${buttonBase} bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 hover:shadow-xl hover:shadow-white/10 hover:scale-[1.02] hover:brightness-105 hover:saturate-110 shadow-md transition-all duration-300 ease-out`,
  secondary: `${buttonBase} bg-white/10 backdrop-blur-md text-white/70 border border-white/20 hover:bg-white/20 hover:brightness-105 hover:saturate-110 transition-all duration-300 ease-out`,
  outline: `${buttonBase} bg-transparent text-white border border-white/20 hover:bg-white/10 hover:brightness-105 hover:saturate-110 transition-all duration-300 ease-out`,
  ghost: `${buttonBase} bg-transparent text-white/70 hover:bg-white/10 hover:brightness-105 hover:saturate-110 transition-all duration-300 ease-out`,
  destructive: `${buttonBase} bg-red-500/10 text-red-300 border border-red-400/30 hover:bg-red-500/20 hover:brightness-105 hover:saturate-110 transition-all duration-300 ease-out`,
  success: `${buttonBase} bg-green-500/10 text-green-300 border border-green-400/30 hover:bg-green-500/20 hover:brightness-105 hover:saturate-110 transition-all duration-300 ease-out`,
  warning: `${buttonBase} bg-yellow-500/20 text-yellow-300 border border-yellow-400/30 hover:bg-yellow-500/20 hover:brightness-105 hover:saturate-110 transition-all duration-300 ease-out`,
  error: `${buttonBase} bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/20 hover:brightness-105 hover:saturate-110 transition-all duration-300 ease-out`,
  info: `${buttonBase} bg-blue-500/20 text-blue-300 border border-blue-400/30 hover:bg-blue-500/20 hover:brightness-105 hover:saturate-110 transition-all duration-300 ease-out`,
  medical: `${buttonBase} bg-sky-500/20 text-sky-300 border border-sky-400/30 hover:bg-sky-500/20 hover:brightness-105 hover:saturate-110 transition-all duration-300 ease-out`,
  critical: `${buttonBase} bg-red-600 text-white border border-red-500 hover:bg-red-700 hover:brightness-105 hover:saturate-110 font-bold transition-all duration-300 ease-out`,
} as const;

/** Button System with enhanced glass effects */
export const button = {
  base: `inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium 
         transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 
         focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent 
         focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105
         disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md`,
  size: {
    default: 'h-10 px-4 text-sm',
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  },
  variant: {
    primary: 'bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 hover:shadow-xl hover:shadow-white/10 hover:scale-[1.02] hover:brightness-105 hover:saturate-110 shadow-md transition-all duration-300 ease-out',
    secondary: 'bg-white/10 backdrop-blur-md text-white/70 border border-white/20 hover:bg-white/20 hover:brightness-105 hover:saturate-110 transition-all duration-300 ease-out',
    outline: 'bg-transparent text-white border border-white/20 hover:bg-white/10 hover:brightness-105 hover:saturate-110 transition-all duration-300 ease-out',
    ghost: 'bg-transparent text-white/70 hover:bg-white/10 hover:brightness-105 hover:saturate-110 transition-all duration-300 ease-out',
    destructive: 'bg-red-500/10 text-red-300 border border-red-400/30 hover:bg-red-500/20 hover:brightness-105 hover:saturate-110 transition-all duration-300 ease-out',
  },
};

/** Input System with enhanced glass effects */
export const input = {
  base: `flex w-full rounded-lg text-sm text-white placeholder:text-white/60 
         bg-white/10 backdrop-blur-md border border-white/20 
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 
         focus-visible:ring-offset-2 focus-visible:ring-offset-transparent 
         focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105
         disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed 
         hover:bg-white/20 hover:border-white/30 transition-all duration-300 ease-out`,
  size: {
    default: 'h-10 px-4 text-sm',
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-4 text-base',
  },
};

/** Card System with enhanced Apple-inspired glass effects */
export const card = {
  base: `backdrop-blur-md border border-white/20 transition-all duration-300 ease-out rounded-xl`,
  variant: {
    default: 'bg-white/8 shadow-sm backdrop-blur-[20px] brightness-110',
    elevated: 'bg-white/12 shadow-md border-white/25 backdrop-blur-[30px] saturate-150 brightness-105',
    interactive: 'bg-white/10 shadow-md hover:bg-white/25 hover:shadow-xl hover:shadow-white/10 hover:scale-[1.02] hover:brightness-105 hover:saturate-110 cursor-pointer transition-all duration-300 ease-out backdrop-blur-[20px] brightness-110',
    featured: 'bg-white/15 ring-1 ring-white/30 shadow-lg shadow-white/5 backdrop-blur-[30px] saturate-150 brightness-105',
    compact: 'bg-white/8 shadow-sm backdrop-blur-[20px] brightness-110',
    navigation: 'bg-white/18 shadow-md backdrop-blur-[30px] saturate-150 brightness-105',
    modal: 'bg-white/25 shadow-lg backdrop-blur-[50px] saturate-180 contrast-110',
    alert: 'bg-white/20 shadow-md backdrop-blur-[30px] saturate-150 brightness-105',
  },
  padding: {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  },
};

// Debug logging
console.log('Card object loaded:', card);
console.log('Card variant:', card.variant);

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

/** Component utility functions */
export const getComponentStyles = (component: 'button' | 'input' | 'card', variant?: string, size?: string) => {
  const componentMap = { button, input, card };
  const comp = componentMap[component];
  if (!comp) return '';
  
  let styles = comp.base;
  if (variant && 'variant' in comp && comp.variant) {
    const variantStyle = comp.variant[variant as keyof typeof comp.variant];
    if (variantStyle) styles += ` ${variantStyle}`;
  }
  if (size && 'size' in comp && comp.size) {
    const sizeStyle = comp.size[size as keyof typeof comp.size];
    if (sizeStyle) styles += ` ${sizeStyle}`;
  }
  
  return styles.trim();
};

/** Get bento grid styles */
export const getBentoStyles = (type: 'container' | 'card', variant?: string, size?: string) => {
  if (type === 'container') {
    const gap = variant || 'default';
    return `${bento.container.base} ${bento.container.gap[gap as keyof typeof bento.container.gap]}`;
  }
  
  if (type === 'card') {
    const cardSize = size || 'default';
    const cardSpan = variant || 'medium';
    return `${bento.card.size[cardSize as keyof typeof bento.card.size]} ${bento.card.span[cardSpan as keyof typeof bento.card.span]}`;
  }
  
  return '';
}; 