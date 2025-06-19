import React from "react";
import { LucideIcon, LucideProps } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Icon weight variants matching Apple's SF Symbols approach
export type IconWeight = "thin" | "regular" | "medium" | "bold";

// Icon size variants for different contexts
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

// Icon state variants for interactive elements
export type IconState = "default" | "hover" | "active" | "disabled" | "selected";

// Icon color variants following Apple's monochromatic approach
export type IconColor = 
  | "default" 
  | "muted" 
  | "primary" 
  | "secondary" 
  | "success" 
  | "warning" 
  | "error" 
  | "info"
  | "accent";

// Icon animation variants for micro-interactions
export type IconAnimation = "none" | "bounce" | "pulse" | "scale" | "rotate" | "slide";

// Icon configuration interface
export interface IconConfig {
  weight?: IconWeight;
  size?: IconSize;
  color?: IconColor;
  state?: IconState;
  animation?: IconAnimation;
  className?: string;
}

// Size mappings (in pixels)
export const ICON_SIZES: Record<IconSize, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4", 
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
  "2xl": "h-12 w-12"
};

// Weight mappings for stroke width
export const ICON_WEIGHTS: Record<IconWeight, string> = {
  thin: "[&>path]:stroke-[1.5px]",
  regular: "[&>path]:stroke-[2px]",
  medium: "[&>path]:stroke-[2.5px]", 
  bold: "[&>path]:stroke-[3px]"
};

// Color mappings following Apple's monochromatic approach
export const ICON_COLORS: Record<IconColor, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  secondary: "text-secondary-foreground",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
  info: "text-info",
  accent: "text-accent-foreground"
};

// State-based color variations
export const ICON_STATE_COLORS: Record<IconState, string> = {
  default: "",
  hover: "group-hover:text-primary transition-colors duration-200",
  active: "text-primary",
  disabled: "text-muted-foreground/50",
  selected: "text-primary"
};

// Animation configurations for micro-interactions
export const ICON_ANIMATIONS = {
  none: {},
  bounce: {
    whileHover: { 
      scale: 1.1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    whileTap: { 
      scale: 0.95,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  },
  pulse: {
    animate: { 
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1]
    },
    transition: { 
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  scale: {
    whileHover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    whileTap: { 
      scale: 0.9,
      transition: { duration: 0.1 }
    }
  },
  rotate: {
    whileHover: { 
      rotate: 180,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  },
  slide: {
    whileHover: { 
      x: 2,
      transition: { duration: 0.2 }
    }
  }
};

// Enhanced Icon component with Apple-inspired design
export interface EnhancedIconProps extends LucideProps, IconConfig {
  icon: LucideIcon;
  children?: React.ReactNode;
  showStateTransition?: boolean;
  interactive?: boolean;
}

export const EnhancedIcon = React.forwardRef<SVGSVGElement, EnhancedIconProps>(
  ({ 
    icon: Icon, 
    weight = "regular",
    size = "md",
    color = "default",
    state = "default",
    animation = "none",
    className,
    children,
    showStateTransition = true,
    interactive = false,
    ...props 
  }, ref) => {
    // Only pass valid SVG props to Icon
    const { animation: _animation, showStateTransition: _showStateTransition, interactive: _interactive, ...svgProps } = props;
    const IconComponent = (
      <Icon
        className={cn(
          ICON_SIZES[size],
          ICON_WEIGHTS[weight],
          ICON_COLORS[color],
          showStateTransition && ICON_STATE_COLORS[state],
          interactive && "cursor-pointer",
          className
        )}
        {...svgProps}
      />
    );

    if (animation === "none") {
      return IconComponent;
    }

    return (
      <motion.div
        className="inline-flex items-center justify-center"
        {...ICON_ANIMATIONS[animation]}
      >
        {IconComponent}
      </motion.div>
    );
  }
);

EnhancedIcon.displayName = "EnhancedIcon";

// State-aware icon component for interactive elements
export interface StateIconProps extends EnhancedIconProps {
  isSelected?: boolean;
  isDisabled?: boolean;
  onStateChange?: (state: IconState) => void;
}

export const StateIcon = React.forwardRef<SVGSVGElement, StateIconProps>(
  ({ 
    isSelected = false,
    isDisabled = false,
    onStateChange,
    state,
    ...props 
  }, ref) => {
    const currentState: IconState = isDisabled 
      ? "disabled" 
      : isSelected 
        ? "selected" 
        : state || "default";

    return (
      <EnhancedIcon
        ref={ref}
        state={currentState}
        interactive={!isDisabled}
        {...props}
      />
    );
  }
);

StateIcon.displayName = "StateIcon";

// Icon with outline/filled state transition (like Apple's SF Symbols)
export interface ToggleIconProps extends EnhancedIconProps {
  isFilled?: boolean;
  outlineIcon: LucideIcon;
  filledIcon: LucideIcon;
  transitionDuration?: number;
}

export const ToggleIcon = React.forwardRef<SVGSVGElement, ToggleIconProps>(
  ({ 
    isFilled = false,
    outlineIcon: OutlineIcon,
    filledIcon: FilledIcon,
    transitionDuration = 0.2,
    ...props 
  }, ref) => {
    return (
      <div className="relative inline-flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isFilled ? (
            <motion.div
              key="filled"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: transitionDuration }}
            >
              <EnhancedIcon
                ref={ref}
                icon={FilledIcon}
                {...props}
              />
            </motion.div>
          ) : (
            <motion.div
              key="outline"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: transitionDuration }}
            >
              <EnhancedIcon
                ref={ref}
                icon={OutlineIcon}
                {...props}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ToggleIcon.displayName = "ToggleIcon";

// Icon with loading state
export interface LoadingIconProps extends EnhancedIconProps {
  isLoading?: boolean;
  loadingIcon?: LucideIcon;
}

export const LoadingIcon = React.forwardRef<SVGSVGElement, LoadingIconProps>(
  ({ 
    isLoading = false,
    loadingIcon: LoadingIcon,
    icon,
    animation = "none",
    ...props 
  }, ref) => {
    if (isLoading) {
      return (
        <EnhancedIcon
          ref={ref}
          icon={LoadingIcon || icon}
          animation="rotate"
          {...props}
        />
      );
    }

    return (
      <EnhancedIcon
        ref={ref}
        icon={icon}
        animation={animation}
        {...props}
      />
    );
  }
);

LoadingIcon.displayName = "LoadingIcon";

// Icon with badge/notification
export interface BadgeIconProps extends EnhancedIconProps {
  badge?: string | number;
  badgeColor?: IconColor;
  badgeSize?: "sm" | "md" | "lg";
}

export const BadgeIcon = React.forwardRef<SVGSVGElement, BadgeIconProps>(
  ({ 
    badge,
    badgeColor = "error",
    badgeSize = "sm",
    children,
    ...props 
  }, ref) => {
    const badgeSizes = {
      sm: "h-2 w-2 text-xs",
      md: "h-3 w-3 text-xs", 
      lg: "h-4 w-4 text-sm"
    };

    return (
      <div className="relative inline-flex items-center justify-center">
        <EnhancedIcon ref={ref} {...props}>
          {children}
        </EnhancedIcon>
        {badge && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={cn(
              "absolute -top-1 -right-1 flex items-center justify-center rounded-full",
              badgeSizes[badgeSize],
              ICON_COLORS[badgeColor],
              "bg-current text-white font-medium"
            )}
          >
            {typeof badge === "number" && badge > 99 ? "99+" : badge}
          </motion.div>
        )}
      </div>
    );
  }
);

BadgeIcon.displayName = "BadgeIcon";

// Utility functions for icon management
export const getIconConfig = (context: string): IconConfig => {
  const configs: Record<string, IconConfig> = {
    navigation: {
      weight: "regular",
      size: "md",
      color: "muted",
      state: "default"
    },
    button: {
      weight: "medium", 
      size: "md",
      color: "default",
      animation: "scale"
    },
    card: {
      weight: "regular",
      size: "lg", 
      color: "primary",
      animation: "none"
    },
    status: {
      weight: "medium",
      size: "sm",
      color: "default",
      animation: "none"
    },
    action: {
      weight: "medium",
      size: "md", 
      color: "primary",
      animation: "bounce"
    }
  };

  return configs[context] || configs.navigation;
};

// Hook for icon state management
export const useIconState = (initialState: IconState = "default") => {
  const [state, setState] = React.useState<IconState>(initialState);

  const setHover = () => setState("hover");
  const setActive = () => setState("active");
  const setDefault = () => setState("default");
  const setDisabled = () => setState("disabled");
  const setSelected = () => setState("selected");

  return {
    state,
    setState,
    setHover,
    setActive,
    setDefault,
    setDisabled,
    setSelected
  };
}; 