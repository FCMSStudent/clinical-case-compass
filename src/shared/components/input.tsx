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
import { input } from "@/design-system/design-system"
import { getGlassHoverVariants } from "@/design-system/components/glass-effects"
import { typography } from "@/design-system/tokens/typography"

// ─── Tailwind variant generator ──────────────────────────────────────────────
const inputVariants = cva(
  // Base styles - unified across all inputs with enhanced glass effects
  cn("flex w-full rounded-lg transition-all duration-300 ease-out backdrop-blur-sm", typography.body.default),
  {
    variants: {
      variant: {
        // Default glassmorphic variant with improved visibility
        default: cn(
          "bg-white/15 backdrop-blur-sm border border-white/30",
          "text-white placeholder:text-white/70",
          "hover:bg-white/20 hover:border-white/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-md focus-visible:border-2 focus-visible:border-blue-400/60 focus-visible:bg-white/25",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "rounded-lg"
        ),
        
        // Subtle variant for less prominent inputs
        subtle: cn(
          "bg-white/10 backdrop-blur-sm border border-white/20",
          "text-white/90 placeholder:text-white/60",
          "hover:bg-white/15 hover:border-white/25",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-md focus-visible:border-2 focus-visible:border-blue-400/50 focus-visible:bg-white/20",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "rounded-lg"
        ),
        
        // Elevated variant for important inputs - improved visibility
        elevated: cn(
          "bg-white/20 backdrop-blur-sm border border-white/30 shadow-sm",
          "text-white placeholder:text-white/70",
          "hover:bg-white/25 hover:border-white/40 hover:shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-md focus-visible:border-2 focus-visible:border-blue-400/70 focus-visible:bg-white/30",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "rounded-lg"
        ),
        
        // Medical variant for clinical data
        medical: cn(
          "bg-blue-500/15 backdrop-blur-md border border-blue-400/40",
          "text-blue-100 placeholder:text-blue-200/70",
          "hover:bg-blue-500/20 hover:border-blue-400/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        
        // Error variant for validation errors
        error: cn(
          "bg-red-500/15 backdrop-blur-md border border-red-400/40",
          "text-red-100 placeholder:text-red-200/70",
          "hover:bg-red-500/20 hover:border-red-400/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        
        // Success variant for validated inputs
        success: cn(
          "bg-green-500/15 backdrop-blur-md border border-green-400/40",
          "text-green-100 placeholder:text-green-200/70",
          "hover:bg-green-500/20 hover:border-green-400/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
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

// ─── Props --------------------------------------------------------------------
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  // Additional props for enhanced functionality
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
  success?: boolean;
  glassIntensity?: 'subtle' | 'medium' | 'strong';
}

// ─── Component ----------------------------------------------------------------
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    size = 'md', 
    type = "text", 
    leftIcon,
    rightIcon,
    error,
    success,
    glassIntensity = 'medium',
    ...props 
  }, ref) => {
    const glassVariants = getGlassHoverVariants(glassIntensity);

    // Determine variant based on props
    let finalVariant = variant;
    if (error) finalVariant = "error";
    else if (success) finalVariant = "success";
    else if (!finalVariant) finalVariant = "default";

    const inputClasses = cn(
      inputVariants({ variant: finalVariant, size: size as 'xs' | 'sm' | 'md' | 'lg' | 'xl' }),
      leftIcon && "pl-10",
      rightIcon && "pr-10",
      className
    );

    // Enhanced focus and hover effects
    const containerClasses = cn(
      "relative group",
      "transition-all duration-300 ease-out"
    );

    return (
      <div className={containerClasses}>
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10">
            <div className="text-white/70 group-focus-within:text-white/90 group-hover:text-white/80 transition-colors duration-300">
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
            if ('vibrate' in navigator) {
              navigator.vibrate(10);
            }
          }}
          {...(props as any)}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center z-10">
            <div className="text-white/70 group-focus-within:text-white/90 group-hover:text-white/80 transition-colors duration-300">
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
