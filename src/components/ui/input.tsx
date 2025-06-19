// -----------------------------------------------------------------------------
// Input – Apple Liquid Glass Enhanced
// -----------------------------------------------------------------------------
// 1. Unified input system with Apple-inspired liquid glass effects
// 2. Enhanced glassmorphic variants with consistent design tokens
// 3. Improved focus states, hover effects, and accessibility
// 4. Framer Motion integration for smooth glass interactions
// 5. 8pt grid spacing system with Apple-inspired touch targets
// -----------------------------------------------------------------------------

import * as React from "react"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { input } from "@/lib/design-system"
import { getGlassHoverVariants } from "@/lib/glass-effects"
import { componentTypography } from "@/lib/typography"

// ─── Tailwind variant generator ──────────────────────────────────────────────
const inputVariants = cva(
  // Base styles - unified across all inputs with enhanced glass effects
  cn("flex w-full rounded-lg transition-all duration-300 ease-out backdrop-blur-md", componentTypography.input),
  {
    variants: {
      variant: {
        // Default glassmorphic variant with Apple-inspired effects
        default: cn(
          "bg-white/10 backdrop-blur-md border border-white/20",
          "text-white placeholder:text-white/60",
          "hover:bg-white/20 hover:border-white/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        
        // Subtle variant for less prominent inputs
        subtle: cn(
          "bg-white/5 backdrop-blur-md border border-white/10",
          "text-white/90 placeholder:text-white/40",
          "hover:bg-white/10 hover:border-white/20",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        
        // Elevated variant for important inputs
        elevated: cn(
          "bg-white/15 backdrop-blur-md border border-white/25 shadow-sm",
          "text-white placeholder:text-white/70",
          "hover:bg-white/25 hover:border-white/35 hover:shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        
        // Medical variant for clinical data
        medical: cn(
          "bg-blue-500/10 backdrop-blur-md border border-blue-400/30",
          "text-blue-100 placeholder:text-blue-200/60",
          "hover:bg-blue-500/15 hover:border-blue-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        
        // Error variant for validation errors
        error: cn(
          "bg-red-500/10 backdrop-blur-md border border-red-400/30",
          "text-red-100 placeholder:text-red-200/60",
          "hover:bg-red-500/15 hover:border-red-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        
        // Success variant for validated inputs
        success: cn(
          "bg-green-500/10 backdrop-blur-md border border-green-400/30",
          "text-green-100 placeholder:text-green-200/60",
          "hover:bg-green-500/15 hover:border-green-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
        ),
      },
      size: {
        // Apple-inspired sizes with 8pt grid alignment and comfortable touch targets
        xs: cn('h-8 px-2', componentTypography.input),           // 32px height + 8px padding = 40px touch target
        sm: cn('h-9 px-3', componentTypography.input),           // 36px height + 12px padding = 48px touch target
        md: cn('h-11 px-4', componentTypography.input),          // 44px height + 16px padding = 60px touch target (Apple standard)
        lg: cn('h-12 px-4', componentTypography.input),          // 48px height + 16px padding = 64px touch target
        xl: cn('h-14 px-6', componentTypography.input),          // 56px height + 24px padding = 80px touch target
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
      leftIcon && "pl-12",
      rightIcon && "pr-12",
      className
    );

    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 pointer-events-none">
            <div className="text-white/60 group-focus-within:text-white/80 transition-colors duration-300">
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
          {...(props as any)}
        />
        
        {rightIcon && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 pointer-events-none">
            <div className="text-white/60 group-focus-within:text-white/80 transition-colors duration-300">
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
