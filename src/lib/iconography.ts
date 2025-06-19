
// ────────────────────────────────────────────────────────────────────────────────
// APPLE-INSPIRED ICONOGRAPHY SYSTEM
// Based on Apple's SF Symbols approach with monochromatic treatment
// ────────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Icon configuration types
export type IconWeight = 'thin' | 'regular' | 'medium' | 'bold';
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type IconColor = 'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'accent';
export type IconState = 'default' | 'hover' | 'active' | 'selected' | 'disabled';
export type IconAnimation = 'none' | 'bounce' | 'pulse' | 'scale' | 'rotate' | 'slide';
export type IconContext = 'navigation' | 'button' | 'card' | 'status' | 'action';
export type BadgeColor = 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

// Icon weight mapping
const iconWeights: Record<IconWeight, string> = {
  thin: 'stroke-1',
  regular: 'stroke-[1.5]',
  medium: 'stroke-2',
  bold: 'stroke-[2.5]',
};

// Icon size mapping
const iconSizes: Record<IconSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  '2xl': 'h-10 w-10',
};

// Icon color mapping
const iconColors: Record<IconColor, string> = {
  default: 'text-white',
  muted: 'text-white/60',
  primary: 'text-blue-400',
  success: 'text-green-400',
  warning: 'text-amber-400',
  error: 'text-red-400',
  info: 'text-cyan-400',
  accent: 'text-purple-400',
};

// Enhanced Icon Props
export interface EnhancedIconProps {
  icon: LucideIcon;
  size?: IconSize;
  weight?: IconWeight;
  color?: IconColor;
  state?: IconState;
  animation?: IconAnimation;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}

// Simple utility functions for styling
export const getIconClasses = (
  size: IconSize = 'md',
  weight: IconWeight = 'regular',
  color: IconColor = 'default',
  state: IconState = 'default',
  interactive: boolean = false,
  className?: string
): string => {
  return cn(
    iconSizes[size],
    iconWeights[weight],
    iconColors[color],
    state === 'disabled' && 'opacity-50 cursor-not-allowed',
    state === 'selected' && 'text-primary-400',
    interactive && 'cursor-pointer transition-all duration-200',
    className
  );
};

// State Icon Props
export interface StateIconProps extends Omit<EnhancedIconProps, 'state'> {
  state: IconState;
  isSelected?: boolean;
  isDisabled?: boolean;
}

// Toggle Icon Props
export interface ToggleIconProps {
  outlineIcon: LucideIcon;
  filledIcon: LucideIcon;
  isFilled: boolean;
  size?: IconSize;
  weight?: IconWeight;
  color?: IconColor;
  interactive?: boolean;
  onClick?: () => void;
}

// Loading Icon Props
export interface LoadingIconProps extends Omit<EnhancedIconProps, 'animation'> {
  isLoading: boolean;
  loadingIcon: LucideIcon;
}

// Badge Icon Props
export interface BadgeIconProps extends EnhancedIconProps {
  badge: string | number;
  badgeColor?: BadgeColor;
  badgeSize?: BadgeSize;
}

// Icon state hook
export const useIconState = () => {
  const [state, setState] = useState<IconState>('default');

  return {
    state,
    setDefault: () => setState('default'),
    setHover: () => setState('hover'),
    setActive: () => setState('active'),
    setSelected: () => setState('selected'),
    setDisabled: () => setState('disabled'),
  };
};

// Context-based icon configurations
const iconConfigs: Record<IconContext, Partial<EnhancedIconProps>> = {
  navigation: { size: 'md', weight: 'regular', color: 'default' },
  button: { size: 'sm', weight: 'medium', color: 'default' },
  card: { size: 'lg', weight: 'regular', color: 'muted' },
  status: { size: 'sm', weight: 'medium', color: 'success' },
  action: { size: 'md', weight: 'medium', color: 'primary' },
};

// Get icon configuration for context
export const getIconConfig = (context: IconContext): Partial<EnhancedIconProps> => {
  return iconConfigs[context];
};
