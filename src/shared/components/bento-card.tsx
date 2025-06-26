import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/utils/utils";
import { getGlassHoverVariants, getGlassTransitionVariants } from "@/design-system/components/glass-effects"
import { typography } from "@/design-system/tokens/typography"

// Unified bento card variants with layout support
const bentoCardVariants = cva(
  // Base styles with enhanced glass effects
  cn(
    "flex flex-col rounded-2xl transition-all duration-300 ease-out relative overflow-hidden",
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
      grid: {
        // Grid span layouts
        small: "col-span-1 sm:col-span-2 min-h-[160px]",
        medium: "col-span-2 lg:col-span-3 min-h-[240px]",
        large: "col-span-2 md:col-span-3 lg:col-span-4 min-h-[280px]",
        hero: "col-span-2 md:col-span-3 lg:col-span-4 min-h-[320px]",
        wide: "col-span-full min-h-[200px]",
        tall: "col-span-2 lg:col-span-3 min-h-[380px]",
        
        // Custom sizes
        compact: "col-span-1 sm:col-span-2 min-h-[140px]",
        square: "col-span-2 lg:col-span-2 min-h-[240px] aspect-square",
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
      grid: "medium",
      size: "md",
    },
  }
)

interface BentoCardProps
  extends Omit<HTMLMotionProps<"div">, "onDrag">,
    VariantProps<typeof bentoCardVariants> {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  glassIntensity?: 'subtle' | 'medium' | 'strong';
  interactive?: boolean;
}

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ 
    className, 
    variant,
    grid,
    size, 
    icon, 
    title, 
    subtitle, 
    children,
    glassIntensity = 'medium',
    interactive = false,
    ...props 
  }, ref) => {
    const transitionIntensity = glassIntensity === 'strong' ? 'medium' : glassIntensity;
    const glassVariants = interactive ? getGlassHoverVariants(glassIntensity) : getGlassTransitionVariants(transitionIntensity)
    
    const motionProps = {
      variants: glassVariants,
      initial: "initial" as const,
      animate: "animate" as const,
      ...(interactive && {
        whileHover: "hover" as const,
        whileTap: "tap" as const, 
        whileFocus: "focus" as const
      })
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          bentoCardVariants({ variant, grid, size }),
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
      >
        {/* Header */}
        {(icon || title || subtitle) && (
          <div className="flex items-start gap-3 mb-4 relative z-10">
            {icon && (
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center text-white/80">
                {icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className={cn(
                  typography.h5,
                  "text-white mb-1 leading-tight tracking-tight"
                )}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className={cn(
                  typography.body.small,
                  "text-white/70 leading-relaxed"
                )}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
);

BentoCard.displayName = "BentoCard";

export { BentoCard, bentoCardVariants };
