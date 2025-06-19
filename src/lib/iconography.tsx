
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  EnhancedIconProps, 
  StateIconProps, 
  ToggleIconProps, 
  LoadingIconProps, 
  BadgeIconProps,
  getIconClasses,
  BadgeColor,
  BadgeSize
} from './iconography';

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
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
}) => {
  const iconClasses = getIconClasses(size, weight, color, state, interactive, className);

  const MotionIcon = motion(Icon);
  
  return (
    <MotionIcon
      className={iconClasses}
      style={style}
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
