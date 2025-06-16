import { ThemeConfig } from "./theme";
import { animations } from "./animations";
import { button, input, card, bento } from "./components";

// ────────────────────────────────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// ────────────────────────────────────────────────────────────────────────────────

/** Get glassmorphic styles */
export const getGlassmorphicStyles = (theme: ThemeConfig, variant: "default" | "elevated" | "subtle" | "light" = "default") => {
  const baseStyles = {
    backgroundColor: theme.colors.glass.background,
    backdropFilter: theme.colors.glass.backdrop,
    border: theme.colors.glass.border,
    boxShadow: theme.colors.glass.shadow,
  };

  switch (variant) {
    case "elevated":
      return {
        ...baseStyles,
        backgroundColor: theme.colors.glass.background.replace("0.1", "0.15"),
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
        border: theme.colors.glass.border.replace("0.2", "0.3"),
      };
    case "subtle":
      return {
        ...baseStyles,
        backgroundColor: theme.colors.glass.background.replace("0.1", "0.05"),
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
        border: theme.colors.glass.border.replace("0.2", "0.1"),
      };
    case "light":
        return {
          ...baseStyles,
          backgroundColor: theme.colors.glass.background.replace("0.1", "0.12"),
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
          border: theme.colors.glass.border.replace("0.2", "0.25"),
        };
    default:
      return baseStyles;
  }
};

/** Get component styles */
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

/** Check for reduced motion preference */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/** Get appropriate animation variants */
export const getAnimationVariants = (animationName: keyof typeof animations) => {
  if (prefersReducedMotion()) {
    return { initial: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
  }
  return animations[animationName];
};
