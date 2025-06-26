import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/utils/utils"
import { getGlassHoverVariants, getGlassTransitionVariants } from "@/design-system/components/glass-effects"
import { typography } from "@/design-system/tokens/typography"

// Unified card variants with consistent design system integration
const cardVariants = cva(
  // Base styles with enhanced glass effects and accessibility
  cn(
    "rounded-2xl transition-all duration-300 ease-out relative overflow-hidden",
    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none before:rounded-2xl",
    "after:absolute after:inset-[1px] after:bg-gradient-to-b after:from-white/3 after:via-transparent after:to-transparent after:pointer-events-none after:rounded-[15px]"
  ),
  {
    variants: {
      variant: {
        // Standard variants
        default: cn(
          "bg-black/15 backdrop-blur-[24px] saturate-120 brightness-105 border border-white/10",
          "shadow-[0_8px_32px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        ),
        
        subtle: cn(
          "bg-white/5 backdrop-blur-[16px] saturate-110 brightness-102 border border-white/8",
          "shadow-[0_4px_16px_rgba(0,0,0,0.1)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        ),
        
        elevated: cn(
          "bg-black/20 backdrop-blur-[28px] saturate-130 brightness-108 border border-white/15",
          "shadow-[0_12px_48px_rgba(0,0,0,0.25)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        // Interactive variants
        interactive: cn(
          "bg-black/15 backdrop-blur-[24px] saturate-120 brightness-105 border border-white/10 cursor-pointer",
          "hover:bg-black/20 hover:border-white/15 hover:scale-[1.02] hover:brightness-110 hover:shadow-[0_16px_64px_rgba(0,0,0,0.3)]",
          "shadow-[0_8px_32px_rgba(0,0,0,0.2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        ),
        
        featured: cn(
          "bg-black/25 backdrop-blur-[32px] saturate-140 brightness-110 border border-white/20 ring-1 ring-white/30",
          "shadow-[0_16px_64px_rgba(0,0,0,0.3)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        ),
        
        // Medical context
        medical: cn(
          "bg-sky-500/10 backdrop-blur-[24px] saturate-130 brightness-108 border border-sky-400/20",
          "shadow-[0_8px_32px_rgba(14,165,233,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        ),
        
        // Status variants
        success: cn(
          "bg-green-500/10 backdrop-blur-[24px] saturate-130 brightness-108 border border-green-400/20",
          "shadow-[0_8px_32px_rgba(34,197,94,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        ),
        
        warning: cn(
          "bg-amber-500/10 backdrop-blur-[24px] saturate-130 brightness-108 border border-amber-400/20",
          "shadow-[0_8px_32px_rgba(245,158,11,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        ),
        
        error: cn(
          "bg-red-500/10 backdrop-blur-[24px] saturate-130 brightness-108 border border-red-400/20",
          "shadow-[0_8px_32px_rgba(239,68,68,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        ),
        
        info: cn(
          "bg-blue-500/10 backdrop-blur-[24px] saturate-130 brightness-108 border border-blue-400/20",
          "shadow-[0_8px_32px_rgba(59,130,246,0.15)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        ),
      },
      size: {
        xs: 'p-3',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8', 
        xl: 'p-10',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

interface CardProps
  extends Omit<HTMLMotionProps<"div">, "onDrag">,
    VariantProps<typeof cardVariants> {
  glassIntensity?: 'subtle' | 'medium' | 'strong'
  interactive?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, glassIntensity = 'medium', interactive = false, ...props }, ref) => {
    const transitionIntensity = glassIntensity === 'strong' ? 'medium' : glassIntensity;
    const glassVariants = interactive ? getGlassHoverVariants(glassIntensity) : getGlassTransitionVariants(transitionIntensity)
    
    const motionProps = {
      variants: glassVariants,
      initial: "initial",
      animate: "animate",
      ...(interactive && {
        whileHover: "hover",
        whileTap: "tap", 
        whileFocus: "focus"
      })
    };
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          cardVariants({ variant, size }),
          interactive && "cursor-pointer",
          className
        )}
        {...motionProps}
        onClick={() => {
          // Haptic feedback for supported devices
          if ('vibrate' in navigator && interactive) {
            navigator.vibrate(5);
          }
        }}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      typography.h4,
      "text-white leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      typography.body.small, 
      "text-white/70 leading-relaxed",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("relative z-10", className)} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4 relative z-10", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
