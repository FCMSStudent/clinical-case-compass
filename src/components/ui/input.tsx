// -----------------------------------------------------------------------------
// Input – Unified Glass Edition
// -----------------------------------------------------------------------------
// 1. Unified input system that consolidates all styling approaches
// 2. Glassmorphic variants with consistent design tokens
// 3. Proper focus states, hover effects, and accessibility
// 4. Framer Motion integration for smooth interactions
// -----------------------------------------------------------------------------

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  inputVariants as legacyInputVariants,
  componentSizes,
} from "@/lib/component-system";
import {
  getMotionVariants,
  subtleInputInteraction,
  reducedMotionInputInteraction,
} from "@/lib/motion";

// ─── Tailwind variant generator ──────────────────────────────────────────────
const inputVariants = cva(
  // Base styles - unified across all inputs
  "flex w-full rounded-lg text-sm font-medium transition-all duration-200 ease-out",
  {
    variants: {
      variant: {
        // Default glassmorphic variant
        default: cn(
          "bg-white/10 backdrop-blur-md border border-white/20",
          "text-white placeholder:text-white/60",
          "hover:bg-white/20 hover:border-white/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        
        // Subtle variant for less prominent inputs
        subtle: cn(
          "bg-white/5 backdrop-blur-md border border-white/10",
          "text-white/90 placeholder:text-white/40",
          "hover:bg-white/10 hover:border-white/20",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        
        // Elevated variant for important inputs
        elevated: cn(
          "bg-white/15 backdrop-blur-md border border-white/25 shadow-sm",
          "text-white placeholder:text-white/70",
          "hover:bg-white/25 hover:border-white/35 hover:shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        
        // Medical variant for clinical data
        medical: cn(
          "bg-blue-500/10 backdrop-blur-md border border-blue-400/30",
          "text-blue-100 placeholder:text-blue-200/60",
          "hover:bg-blue-500/15 hover:border-blue-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        
        // Error variant for validation errors
        error: cn(
          "bg-red-500/10 backdrop-blur-md border border-red-400/30",
          "text-red-100 placeholder:text-red-200/60",
          "hover:bg-red-500/15 hover:border-red-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        
        // Success variant for validated inputs
        success: cn(
          "bg-green-500/10 backdrop-blur-md border border-green-400/30",
          "text-green-100 placeholder:text-green-200/60",
          "hover:bg-green-500/15 hover:border-green-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        
        // Legacy variants for backward compatibility
        ...legacyInputVariants,
      },
      size: {
        xs: componentSizes.input.xs,
        sm: componentSizes.input.sm,
        md: componentSizes.input.md,
        lg: componentSizes.input.lg,
        xl: componentSizes.input.xl,
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ─── Props --------------------------------------------------------------------
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  // Additional props for enhanced functionality
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
  success?: boolean;
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
    ...props 
  }, ref) => {
    const animationVariants = getMotionVariants(
      subtleInputInteraction,
      reducedMotionInputInteraction,
    );

    // Determine variant based on props
    let finalVariant = variant;
    if (error) finalVariant = "error";
    else if (success) finalVariant = "success";
    else if (!finalVariant) finalVariant = "default";

    const inputClasses = cn(
      inputVariants({ variant: finalVariant, size: size as 'xs' | 'sm' | 'md' | 'lg' | 'xl' }),
      leftIcon && "pl-12",
      rightIcon && "pr-12",
      className
    );

    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 pointer-events-none">
            <div className="text-white/60 group-focus-within:text-white/80 transition-colors">
              {leftIcon}
            </div>
          </div>
        )}
        
        <motion.input
          ref={ref}
          type={type}
          className={inputClasses}
          variants={animationVariants as any}
          initial="initial"
          whileFocus="focus"
          {...(props as any)}
        />
        
        {rightIcon && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 pointer-events-none">
            <div className="text-white/60 group-focus-within:text-white/80 transition-colors">
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
