// -----------------------------------------------------------------------------
// Textarea – Unified Glass Edition
// -----------------------------------------------------------------------------
// 1. Unified textarea system that matches the Input component styling
// 2. Glassmorphic variants with consistent design tokens
// 3. Proper focus states, hover effects, and accessibility
// 4. Framer Motion integration for smooth interactions
// -----------------------------------------------------------------------------

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { componentSizes } from "@/lib/component-system";
import {
  getMotionVariants,
  subtleInputInteraction,
  reducedMotionInputInteraction,
} from "@/lib/motion";
import { typography } from "@/lib/typography";

// ─── Tailwind variant generator ──────────────────────────────────────────────
const textareaVariants = cva(
  // Base styles - unified with Input component
  "flex w-full rounded-xl text-sm font-medium transition-all duration-200 ease-out resize-none",
  {
    variants: {
      variant: {
        // Default glassmorphic variant
        default: cn(
          "bg-white/10 backdrop-blur-[16px] saturate-130 brightness-105 border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 hover:border-white/30 transition-all duration-300 ease-out shadow-[0_2px_8px_rgba(0,0,0,0.04)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]",
          typography.body.default
        ),
        
        // Subtle variant for less prominent textareas
        subtle: cn(
          "bg-white/5 backdrop-blur-md border border-white/10",
          "text-white/90 placeholder:text-white/40",
          "hover:bg-white/10 hover:border-white/20",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
        ),
        
        // Elevated variant for important textareas
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
        
        // Success variant for validated textareas
        success: cn(
          "bg-green-500/10 backdrop-blur-md border border-green-400/30",
          "text-green-100 placeholder:text-green-200/60",
          "hover:bg-green-500/15 hover:border-green-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed"
        ),
      },
      size: {
        xs: cn(componentSizes.input.xs, "min-h-[60px]"),
        sm: cn(componentSizes.input.sm, "min-h-[80px]"),
        md: cn(componentSizes.input.md, "min-h-[100px]"),
        lg: cn(componentSizes.input.lg, "min-h-[120px]"),
        xl: cn(componentSizes.input.xl, "min-h-[140px]"),
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ─── Props --------------------------------------------------------------------
export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  // Additional props for enhanced functionality
  error?: boolean;
  success?: boolean;
}

// ─── Component ----------------------------------------------------------------
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    variant, 
    size = 'md', 
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

    return (
      <motion.textarea
        ref={ref}
        className={cn(
          textareaVariants({ 
            variant: finalVariant, 
            size: size as 'xs' | 'sm' | 'md' | 'lg' | 'xl' 
          }),
          className
        )}
        variants={animationVariants as any}
        initial="initial"
        whileFocus="focus"
        {...(props as any)}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
