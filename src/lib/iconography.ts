
// ────────────────────────────────────────────────────────────────────────────────
// APPLE-INSPIRED ICONOGRAPHY SYSTEM
// Based on Apple's SF Symbols approach with monochromatic treatment
// ────────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
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

// Animation variants
const animationVariants = {
  bounce: {
    y: [0, -4, 0],
    transition: { duration: 0.6, repeat: Infinity }
  },
  pulse: {
    scale: [1, 1.1, 1],
    transition: { duration: 1, repeat: Infinity }
  },
  scale: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.3 }
  },
  rotate: {
    rotate: 360,
    transition: { duration: 2, repeat: Infinity, ease: "linear" }
  },
  slide: {
    x: [0, 4, 0],
    transition: { duration: 0.5, repeat: Infinity }
  }
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
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}

// Enhanced Icon Component
export const EnhancedIcon: React.FC<EnhancedIconProps> = ({
  icon: Icon,
  size = 'md',
  weight = 'regular',
  color = 'default',
  state = 'default',
  animation = 'none',
  interactive = false,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
}) => {
  const baseClasses = cn(
    iconSizes[size],
    iconWeights[weight],
    iconColors[color],
    state === 'disabled' && 'opacity-50 cursor-not-allowed',
    state === 'selected' && 'text-primary-400',
    interactive && 'cursor-pointer transition-all duration-200',
    className
  );

  const MotionIcon = motion(Icon);
  
  return (
    <MotionIcon
      className={baseClasses}
      animate={animation !== 'none' ? animationVariants[animation] : undefined}
      whileHover={interactive ? { scale: 1.1 } : undefined}
      whileTap={interactive ? { scale: 0.95 } : undefined}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
  );
};

// State Icon Props
export interface StateIconProps extends Omit<EnhancedIconProps, 'state'> {
  state: IconState;
  isSelected?: boolean;
  isDisabled?: boolean;
}

// State Icon Component
export const StateIcon: React.FC<StateIconProps> = ({
  state,
  isSelected,
  isDisabled,
  ...props
}) => {
  return (
    <EnhancedIcon
      {...props}
      state={isDisabled ? 'disabled' : isSelected ? 'selected' : state}
    />
  );
};

// Toggle Icon Props
export interface ToggleIconProps {
  icon?: LucideIcon;
  outlineIcon: LucideIcon;
  filledIcon: LucideIcon;
  isFilled: boolean;
  size?: IconSize;
  weight?: IconWeight;
  color?: IconColor;
  interactive?: boolean;
  onClick?: () => void;
}

// Toggle Icon Component
export const ToggleIcon: React.FC<ToggleIconProps> = ({
  outlineIcon,
  filledIcon,
  isFilled,
  ...props
}) => {
  const Icon = isFilled ? filledIcon : outlineIcon;
  
  return (
    <EnhancedIcon
      icon={Icon}
      {...props}
    />
  );
};

// Loading Icon Props
export interface LoadingIconProps extends Omit<EnhancedIconProps, 'animation'> {
  isLoading: boolean;
  loadingIcon: LucideIcon;
}

// Loading Icon Component
export const LoadingIcon: React.FC<LoadingIconProps> = ({
  isLoading,
  loadingIcon,
  ...props
}) => {
  const Icon = isLoading ? loadingIcon : props.icon;
  
  return (
    <EnhancedIcon
      {...props}
      icon={Icon}
      animation={isLoading ? 'rotate' : 'none'}
    />
  );
};

// Badge Icon Props
export interface BadgeIconProps extends EnhancedIconProps {
  badge: string | number;
  badgeColor?: BadgeColor;
  badgeSize?: BadgeSize;
}

// Badge Icon Component
export const BadgeIcon: React.FC<BadgeIconProps> = ({
  badge,
  badgeColor = 'error',
  badgeSize = 'sm',
  ...iconProps
}) => {
  const badgeClasses = cn(
    'absolute -top-1 -right-1 rounded-full text-xs font-medium flex items-center justify-center min-w-[1rem] h-4 px-1',
    badgeColor === 'error' && 'bg-red-500 text-white',
    badgeColor === 'success' && 'bg-green-500 text-white',
    badgeColor === 'warning' && 'bg-amber-500 text-white',
    badgeColor === 'info' && 'bg-blue-500 text-white',
    badgeColor === 'primary' && 'bg-purple-500 text-white',
    badgeSize === 'lg' && 'h-5 text-sm',
    badgeSize === 'md' && 'h-4 text-xs'
  );

  return (
    <div className="relative inline-block">
      <EnhancedIcon {...iconProps} />
      <div className={badgeClasses}>
        {badge}
      </div>
    </div>
  );
};

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
