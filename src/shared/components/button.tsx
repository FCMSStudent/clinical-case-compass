import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { motion, HTMLMotionProps } from "framer-motion"

import { cn } from "@/shared/utils/utils"
import { getGlassHoverVariants } from "@/design-system/components/glass-effects"
import { typography } from "@/design-system/tokens/typography"

// Unified button variants with consistent design system integration
const buttonVariants = cva(
  // Base styles with enhanced glass effects and accessibility
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-md focus-visible:border-2 focus-visible:border-blue-400/60 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none before:rounded-xl after:absolute after:inset-[1px] after:bg-gradient-to-b after:from-white/3 after:to-transparent after:pointer-events-none after:rounded-[11px]",
  {
    variants: {
      variant: {
        // Primary variants with enhanced glass effects
        primary: "bg-white/15 backdrop-blur-md text-white border border-white/30 hover:bg-white/25 hover:border-white/40 hover:scale-[1.02] hover:brightness-105 hover:saturate-110 shadow-[0_8px_32px_rgba(0,0,0,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
        
        secondary: "bg-white/10 backdrop-blur-sm text-white/90 border border-white/20 hover:bg-white/20 hover:border-white/30 hover:scale-[1.01] hover:brightness-105 shadow-[0_4px_16px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",
        
        outline: "bg-transparent text-white border border-white/30 hover:bg-white/10 hover:border-white/40 hover:scale-[1.01] shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        
        ghost: "bg-transparent text-white/80 hover:bg-white/10 hover:text-white hover:scale-[1.01] shadow-none",
        
        // Status variants with enhanced glass effects
        success: "bg-green-500/15 backdrop-blur-md text-green-100 border border-green-400/40 hover:bg-green-500/20 hover:border-green-400/50 hover:scale-[1.02] hover:brightness-110 shadow-[0_8px_32px_rgba(34,197,94,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
        
        warning: "bg-amber-500/15 backdrop-blur-md text-amber-100 border border-amber-400/40 hover:bg-amber-500/20 hover:border-amber-400/50 hover:scale-[1.02] hover:brightness-110 shadow-[0_8px_32px_rgba(245,158,11,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
        
        error: "bg-red-500/15 backdrop-blur-md text-red-100 border border-red-400/40 hover:bg-red-500/20 hover:border-red-400/50 hover:scale-[1.02] hover:brightness-110 shadow-[0_8px_32px_rgba(239,68,68,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
        
        info: "bg-blue-500/15 backdrop-blur-md text-blue-100 border border-blue-400/40 hover:bg-blue-500/20 hover:border-blue-400/50 hover:scale-[1.02] hover:brightness-110 shadow-[0_8px_32px_rgba(59,130,246,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
        
        // Medical-specific variants
        medical: "bg-sky-500/15 backdrop-blur-md text-sky-100 border border-sky-400/40 hover:bg-sky-500/20 hover:border-sky-400/50 hover:scale-[1.02] hover:brightness-110 shadow-[0_8px_32px_rgba(14,165,233,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
        
        critical: "bg-red-600/80 backdrop-blur-md text-white border border-red-500/60 hover:bg-red-600/90 hover:border-red-500/70 hover:scale-[1.02] hover:brightness-110 font-bold shadow-[0_12px_48px_rgba(220,38,38,0.25)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
        
        // Legacy compatibility
        default: "bg-white/15 backdrop-blur-md text-white border border-white/30 hover:bg-white/25 hover:border-white/40 hover:scale-[1.02] hover:brightness-105 hover:saturate-110 shadow-[0_8px_32px_rgba(0,0,0,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
        destructive: "bg-red-500/15 backdrop-blur-md text-red-100 border border-red-400/40 hover:bg-red-500/20 hover:border-red-400/50 hover:scale-[1.02] hover:brightness-110 shadow-[0_8px_32px_rgba(239,68,68,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
        link: cn(typography.link, "text-white underline-offset-4 hover:underline bg-transparent shadow-none"),
      },
      size: {
        xs: 'h-6 px-2 text-xs gap-1',
        sm: 'h-8 px-3 text-sm gap-1.5',
        md: 'h-10 px-4 text-sm gap-2',
        lg: 'h-12 px-6 text-base gap-2',
        xl: 'h-14 px-8 text-lg gap-2.5',
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "onDrag">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  glassIntensity?: 'subtle' | 'medium' | 'strong'
  children?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, glassIntensity = 'medium', ...props }, ref) => {
    const glassVariants = getGlassHoverVariants(glassIntensity)
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // Haptic feedback for supported devices
      if ('vibrate' in navigator && !disabled && !loading) {
        navigator.vibrate(10);
      }
      
      // Call original onClick if provided
      if (props.onClick) {
        props.onClick(event);
      }
    };
    
    const buttonClasses = cn(buttonVariants({ variant, size }), className);
    
    if (asChild) {
      return (
        <Slot
          className={buttonClasses}
          ref={ref}
          onClick={handleClick}
          {...(props as any)}
        >
          {children}
        </Slot>
      )
    }
    
    return (
      <motion.button
        className={buttonClasses}
        ref={ref}
        disabled={disabled || loading}
        variants={glassVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        whileFocus="focus"
        onClick={handleClick}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        <span className="relative z-10">{children}</span>
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
/* eslint-disable-next-line react-refresh/only-export-components */
