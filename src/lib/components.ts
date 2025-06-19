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
  // Base glass variants with softer shadows
  subtle: `${glassmorphic} bg-white/5 backdrop-blur-[12px] brightness-105 shadow-[0_2px_8px_rgba(0,0,0,0.04)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]`,
  elevated: `${glassmorphic} bg-white/12 backdrop-blur-[24px] saturate-160 brightness-108 shadow-[0_12px_48px_rgba(0,0,0,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]`,
  overlay: `backdrop-blur-xl border-white/25 bg-white/10 shadow-[0_16px_64px_rgba(0,0,0,0.1)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-[40px] saturate-180 contrast-110`,
  
  // Card variants with enhanced glass effects
  card: `${glassmorphic} bg-white/8 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] border backdrop-blur-[18px] saturate-140 brightness-106`,
  cardElevated: `${glassmorphic} bg-white/12 rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] border backdrop-blur-[24px] saturate-160 brightness-108`,
  
  // Contextual glass variants
  navigation: `${glassmorphic} bg-white/18 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] border backdrop-blur-[24px] saturate-160 brightness-108`,
  modal: `${glassmorphic} bg-white/25 rounded-2xl shadow-[0_16px_64px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] border backdrop-blur-[50px] saturate-200 contrast-115`,
  alert: `${glassmorphic} bg-white/20 rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] border backdrop-blur-[30px] saturate-150 brightness-105`,
  dropdown: `${glassmorphic} bg-white/15 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] border backdrop-blur-[28px] saturate-170 brightness-107`,
  
  // Enhanced frosted glass overlay variants
  frostedOverlay: `${glassmorphic} bg-white/25 rounded-2xl shadow-[0_16px_64px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] border border-white/25 backdrop-blur-[50px] saturate-200 contrast-115`,
  frostedModal: `${glassmorphic} bg-white/25 rounded-2xl shadow-[0_16px_64px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] border border-white/25 backdrop-blur-[50px] saturate-200 contrast-115`,
  frostedPanel: `${glassmorphic} bg-white/20 rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] border border-white/25 backdrop-blur-[40px] saturate-180 contrast-110`,
  frostedPopover: `${glassmorphic} bg-white/25 rounded-xl shadow-[0_16px_64px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] border border-white/25 backdrop-blur-[40px] saturate-200 contrast-115`,
  frostedSheet: `${glassmorphic} bg-white/25 rounded-2xl shadow-[0_16px_64px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] border border-white/25 backdrop-blur-[50px] saturate-200 contrast-115`,
} as const;

/** Base styles for buttons with enhanced glass effects */
export const buttonBase = `
  inline-flex items-center justify-center whitespace-nowrap rounded-xl 
  text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105 ${disabledState}
  h-10 px-4 backdrop-blur-md
`.trim();

/** Button variants using the enhanced design system with Apple-inspired effects */
export const buttonVariants = {
  primary: `${buttonBase} bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:scale-[1.02] hover:brightness-105 hover:saturate-110 shadow-[0_8px_32px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 ease-out`,
  secondary: `${buttonBase} bg-white/10 backdrop-blur-md text-white/70 border border-white/20 hover:bg-white/20 hover:brightness-105 hover:saturate-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 ease-out`,
  outline: `${buttonBase} bg-transparent text-white border border-white/20 hover:bg-white/10 hover:brightness-105 hover:saturate-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 ease-out`,
  ghost: `${buttonBase} bg-transparent text-white/70 hover:bg-white/10 hover:brightness-105 hover:saturate-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 ease-out`,
  destructive: `${buttonBase} bg-red-500/10 text-red-300 border border-red-400/30 hover:bg-red-500/20 hover:brightness-105 hover:saturate-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 ease-out`,
  success: `${buttonBase} bg-green-500/10 text-green-300 border border-green-400/30 hover:bg-green-500/20 hover:brightness-105 hover:saturate-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 ease-out`,
  warning: `${buttonBase} bg-yellow-500/20 text-yellow-300 border border-yellow-400/30 hover:bg-yellow-500/20 hover:brightness-105 hover:saturate-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 ease-out`,
  error: `${buttonBase} bg-red-500/20 text-red-300 border border-red-400/30 hover:bg-red-500/20 hover:brightness-105 hover:saturate-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 ease-out`,
  info: `${buttonBase} bg-blue-500/20 text-blue-300 border border-blue-400/30 hover:bg-blue-500/20 hover:brightness-105 hover:saturate-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 ease-out`,
  medical: `${buttonBase} bg-sky-500/20 text-sky-300 border border-sky-400/30 hover:bg-sky-500/20 hover:brightness-105 hover:saturate-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 ease-out`,
  critical: `${buttonBase} bg-red-600 text-white border border-red-500 hover:bg-red-700 hover:brightness-105 hover:saturate-110 hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] font-bold transition-all duration-300 ease-out`,
} as const;

/** Button System with enhanced glass effects */
export const button = {
  base: `inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium 
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
    primary: 'bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] hover:scale-[1.02] hover:brightness-105 hover:saturate-110 shadow-[0_8px_32px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 ease-out',
    secondary: 'bg-white/10 backdrop-blur-md text-white/70 border border-white/20 hover:bg-white/20 hover:brightness-105 hover:saturate-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 ease-out',
    outline: 'bg-transparent text-white border border-white/20 hover:bg-white/10 hover:brightness-105 hover:saturate-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 ease-out',
    ghost: 'bg-transparent text-white/70 hover:bg-white/10 hover:brightness-105 hover:saturate-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 ease-out',
    destructive: 'bg-red-500/10 text-red-300 border border-red-400/30 hover:bg-red-500/20 hover:brightness-105 hover:saturate-110 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 ease-out',
  },
};

/** Input System with enhanced glass effects */
export const input = {
  base: `flex w-full rounded-xl text-sm text-white placeholder:text-white/60 
         bg-white/10 backdrop-blur-[16px] saturate-130 brightness-105 border border-white/20 
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 
         focus-visible:ring-offset-2 focus-visible:ring-offset-transparent 
         focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105
         disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed 
         hover:bg-white/20 hover:border-white/30 transition-all duration-300 ease-out
         shadow-[0_2px_8px_rgba(0,0,0,0.04)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]`,
  size: {
    default: 'h-10 px-4 text-sm',
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-4 text-base',
  },
};

/** Card System with enhanced Apple-inspired glass effects */
export const card = {
  base: `backdrop-blur-md border border-slate-200/50 transition-all duration-300 ease-out rounded-2xl`,
  variant: {
    default: 'bg-white/60 backdrop-blur-md shadow-glass border-slate-200/50',
    elevated: 'bg-white/70 backdrop-blur-lg shadow-glass-elevated border-slate-200/60',
    interactive: 'bg-white/60 shadow-glass border-slate-200/50 hover:bg-white/80 hover:shadow-glass-elevated hover:border-slate-300/60 hover:scale-[1.02] hover:brightness-105 hover:saturate-110 cursor-pointer transition-all duration-300 ease-out backdrop-blur-md',
    featured: 'bg-white/80 ring-1 ring-slate-300/50 shadow-glass-heavy border-slate-200/70 backdrop-blur-lg',
    compact: 'bg-white/60 backdrop-blur-md shadow-glass border-slate-200/50',
    navigation: 'bg-white/85 backdrop-blur-lg shadow-glass border-slate-200/70',
    modal: 'bg-white/95 backdrop-blur-xl shadow-glass-heavy border-slate-300/80',
    alert: 'bg-white/80 backdrop-blur-lg shadow-glass-elevated border-slate-200/70',
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