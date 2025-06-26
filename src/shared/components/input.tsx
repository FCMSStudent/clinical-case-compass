// -----------------------------------------------------------------------------
// Input – Apple Liquid Glass Enhanced
// -----------------------------------------------------------------------------
// 1. Unified input system with Apple-inspired liquid glass effects
// 2. Enhanced glassmorphic variants with consistent design tokens
// 3. Improved focus states, hover effects, and accessibility
// 4. Framer Motion integration for smooth glass interactions
// -----------------------------------------------------------------------------

import * as React from "react"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/utils/utils"
import { getGlassHoverVariants } from "@/design-system/components/glass-effects"
import { typography } from "@/design-system/tokens/typography"

// Unified input variants with consistent design system integration
const inputVariants = cva(
  // Base styles with enhanced glass effects and accessibility
  cn(
    "flex w-full transition-all duration-300 ease-out backdrop-blur-sm relative overflow-hidden",
    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/3 before:to-transparent before:pointer-events-none before:rounded-xl",
    "after:absolute after:inset-[1px] after:bg-gradient-to-b after:from-white/5 after:via-transparent after:to-transparent after:pointer-events-none after:rounded-[11px]",
    typography.body.default
  ),
  {
    variants: {
      variant: {
        // Default variant with improved visibility
        default: cn(
          "bg-white/10 backdrop-blur-md border border-white/20 rounded-xl",
          "text-white placeholder:text-white/60",
          "hover:bg-white/15 hover:border-white/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-lg focus-visible:border-2 focus-visible:border-blue-400/60 focus-visible:bg-white/20",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-[0_2px_8px_rgba(0,0,0,0.04)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        // Subtle variant for less prominent inputs
        subtle: cn(
          "bg-white/5 backdrop-blur-sm border border-white/15 rounded-xl",
          "text-white/90 placeholder:text-white/50",
          "hover:bg-white/10 hover:border-white/20",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-md focus-visible:border-2 focus-visible:border-blue-400/50 focus-visible:bg-white/15",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-[0_1px_4px_rgba(0,0,0,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        ),
        
        // Elevated variant for important inputs
        elevated: cn(
          "bg-white/15 backdrop-blur-lg border border-white/25 rounded-xl shadow-sm",
          "text-white placeholder:text-white/70",
          "hover:bg-white/20 hover:border-white/35 hover:shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-xl focus-visible:border-2 focus-visible:border-blue-400/70 focus-visible:bg-white/25",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-[0_4px_16px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        ),
        
        // Medical variant for clinical data
        medical: cn(
          "bg-sky-500/10 backdrop-blur-md border border-sky-400/30 rounded-xl",
          "text-sky-100 placeholder:text-sky-200/60",
          "hover:bg-sky-500/15 hover:border-sky-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-lg focus-visible:border-2 focus-visible:border-sky-400/70 focus-visible:bg-sky-500/20",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-[0_4px_16px_rgba(14,165,233,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        // Status variants
        success: cn(
          "bg-green-500/10 backdrop-blur-md border border-green-400/30 rounded-xl",
          "text-green-100 placeholder:text-green-200/60",
          "hover:bg-green-500/15 hover:border-green-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-lg focus-visible:border-2 focus-visible:border-green-400/70 focus-visible:bg-green-500/20",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-[0_4px_16px_rgba(34,197,94,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        warning: cn(
          "bg-amber-500/10 backdrop-blur-md border border-amber-400/30 rounded-xl",
          "text-amber-100 placeholder:text-amber-200/60",
          "hover:bg-amber-500/15 hover:border-amber-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-lg focus-visible:border-2 focus-visible:border-amber-400/70 focus-visible:bg-amber-500/20",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-[0_4px_16px_rgba(245,158,11,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        error: cn(
          "bg-red-500/10 backdrop-blur-md border border-red-400/30 rounded-xl",
          "text-red-100 placeholder:text-red-200/60",
          "hover:bg-red-500/15 hover:border-red-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-lg focus-visible:border-2 focus-visible:border-red-400/70 focus-visible:bg-red-500/20",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-[0_4px_16px_rgba(239,68,68,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        info: cn(
          "bg-blue-500/10 backdrop-blur-md border border-blue-400/30 rounded-xl",
          "text-blue-100 placeholder:text-blue-200/60",
          "hover:bg-blue-500/15 hover:border-blue-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-lg focus-visible:border-2 focus-visible:border-blue-400/70 focus-visible:bg-blue-500/20",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-[0_4px_16px_rgba(59,130,246,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
      },
      size: {
        xs: 'h-6 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-4 text-base',
        xl: 'h-14 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

// Props interface with enhanced functionality
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  // Enhanced icon support
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  // State props
  error?: boolean;
  success?: boolean;
  warning?: boolean;
  // Glass effects
  glassIntensity?: 'subtle' | 'medium' | 'strong';
  // Container class for styling wrapper
  containerClassName?: string;
}

// Enhanced Input component with unified design system
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    containerClassName,
    variant, 
    size = 'md', 
    type = "text", 
    leftIcon,
    rightIcon,
    error,
    success,
    warning,
    glassIntensity = 'medium',
    ...props 
  }, ref) => {
    const glassVariants = getGlassHoverVariants(glassIntensity);

    // Determine variant based on state props (priority: error > warning > success > variant)
    let finalVariant = variant;
    if (error) finalVariant = "error";
    else if (warning) finalVariant = "warning";
    else if (success) finalVariant = "success";
    else if (!finalVariant) finalVariant = "default";

    const inputClasses = cn(
      inputVariants({ variant: finalVariant, size }),
      leftIcon && "pl-10",
      rightIcon && "pr-10",
      className
    );

    // Enhanced container with group states for icon interactions
    const containerClasses = cn(
      "relative group w-full",
      "transition-all duration-300 ease-out",
      containerClassName
    );

    return (
      <div className={containerClasses}>
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10">
            <div className={cn(
              "transition-all duration-300",
              error ? "text-red-300 group-focus-within:text-red-200" :
              warning ? "text-amber-300 group-focus-within:text-amber-200" :
              success ? "text-green-300 group-focus-within:text-green-200" :
              finalVariant === "medical" ? "text-sky-300 group-focus-within:text-sky-200" :
              "text-white/60 group-focus-within:text-white/80 group-hover:text-white/70"
            )}>
              {leftIcon}
            </div>
          </div>
        )}
        
        <motion.input
          ref={ref}
          type={type}
          className={inputClasses}
          variants={glassVariants}
          initial="initial"
          whileFocus="focus"
          onClick={() => {
            // Haptic feedback for supported devices
            if ('vibrate' in navigator && !props.disabled) {
              navigator.vibrate(5);
            }
          }}
          {...(props as any)}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center z-10">
            <div className={cn(
              "transition-all duration-300",
              error ? "text-red-300 group-focus-within:text-red-200" :
              warning ? "text-amber-300 group-focus-within:text-amber-200" :
              success ? "text-green-300 group-focus-within:text-green-200" :
              finalVariant === "medical" ? "text-sky-300 group-focus-within:text-sky-200" :
              "text-white/60 group-focus-within:text-white/80 group-hover:text-white/70"
            )}>
              {rightIcon}
            </div>
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { inputVariants };
