import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/utils/utils"
import { getGlassHoverVariants } from "@/design-system/components/glass-effects"

// Unified slider track variants
const sliderTrackVariants = cva(
  // Base track styles with enhanced glass effects
  cn(
    "relative w-full grow overflow-visible rounded-full transition-all duration-300 ease-out relative overflow-hidden",
    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none before:rounded-full",
    "after:absolute after:inset-[1px] after:bg-gradient-to-b after:from-white/3 after:via-transparent after:to-transparent after:pointer-events-none after:rounded-full"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-white/10 backdrop-blur-sm border border-white/20",
          "shadow-[0_2px_8px_rgba(0,0,0,0.04)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        subtle: cn(
          "bg-white/5 backdrop-blur-sm border border-white/15",
          "shadow-[0_1px_4px_rgba(0,0,0,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        ),
        
        elevated: cn(
          "bg-white/15 backdrop-blur-md border border-white/25 shadow-sm",
          "shadow-[0_4px_16px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        ),
        
        medical: cn(
          "bg-sky-500/10 backdrop-blur-sm border border-sky-400/30",
          "shadow-[0_4px_16px_rgba(14,165,233,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        success: cn(
          "bg-green-500/10 backdrop-blur-sm border border-green-400/30",
          "shadow-[0_4px_16px_rgba(34,197,94,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        warning: cn(
          "bg-amber-500/10 backdrop-blur-sm border border-amber-400/30",
          "shadow-[0_4px_16px_rgba(245,158,11,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        error: cn(
          "bg-red-500/10 backdrop-blur-sm border border-red-400/30",
          "shadow-[0_4px_16px_rgba(239,68,68,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        info: cn(
          "bg-blue-500/10 backdrop-blur-sm border border-blue-400/30",
          "shadow-[0_4px_16px_rgba(59,130,246,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
      },
      size: {
        xs: 'h-1',
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3',
        xl: 'h-4',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

// Unified slider range variants
const sliderRangeVariants = cva(
  "absolute h-full rounded-full transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "bg-white/30",
        subtle: "bg-white/25",
        elevated: "bg-white/35",
        medical: "bg-sky-400/40",
        success: "bg-green-400/40",
        warning: "bg-amber-400/40",
        error: "bg-red-400/40",
        info: "bg-blue-400/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Unified slider thumb variants
const sliderThumbVariants = cva(
  // Base thumb styles with enhanced glass effects
  cn(
    "relative block rounded-full bg-white ring-offset-background transition-all duration-300 ease-out relative overflow-hidden",
    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none before:rounded-full",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-lg backdrop-blur-sm"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border-2 border-white/20",
          "focus-visible:ring-white/40",
          "shadow-[0_4px_16px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        ),
        
        subtle: cn(
          "border-2 border-white/15",
          "focus-visible:ring-white/30",
          "shadow-[0_2px_8px_rgba(0,0,0,0.04)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        elevated: cn(
          "border-2 border-white/25",
          "focus-visible:ring-white/50",
          "shadow-[0_6px_24px_rgba(0,0,0,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
        ),
        
        medical: cn(
          "border-2 border-sky-400/30",
          "focus-visible:ring-sky-400/60",
          "shadow-[0_4px_16px_rgba(14,165,233,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        ),
        
        success: cn(
          "border-2 border-green-400/30",
          "focus-visible:ring-green-400/60",
          "shadow-[0_4px_16px_rgba(34,197,94,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        ),
        
        warning: cn(
          "border-2 border-amber-400/30",
          "focus-visible:ring-amber-400/60",
          "shadow-[0_4px_16px_rgba(245,158,11,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        ),
        
        error: cn(
          "border-2 border-red-400/30",
          "focus-visible:ring-red-400/60",
          "shadow-[0_4px_16px_rgba(239,68,68,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        ),
        
        info: cn(
          "border-2 border-blue-400/30",
          "focus-visible:ring-blue-400/60",
          "shadow-[0_4px_16px_rgba(59,130,246,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        ),
      },
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
        xl: 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderTrackVariants> {
  showTooltip?: boolean;
  tooltipValue?: string | number;
  glassIntensity?: 'subtle' | 'medium' | 'strong';
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, variant, size, showTooltip, tooltipValue, glassIntensity = 'medium', ...props }, ref) => {
  const glassVariants = getGlassHoverVariants(glassIntensity);
  
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center transition-all duration-300 ease-out",
        className
      )}
      onClick={() => {
        // Haptic feedback for supported devices
        if ('vibrate' in navigator && !props.disabled) {
          navigator.vibrate(3);
        }
      }}
      {...props}
    >
      <SliderPrimitive.Track className={cn(sliderTrackVariants({ variant, size }))}>
        <SliderPrimitive.Range className={cn(sliderRangeVariants({ variant }))} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={cn(sliderThumbVariants({ variant, size }))}>
        {showTooltip && (
          <div className={cn(
            "absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2",
            "bg-white/10 backdrop-blur-xl text-white text-xs py-1 px-2 rounded-lg border border-white/20 shadow-lg whitespace-nowrap",
            "transition-all duration-300 ease-out",
            "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none before:rounded-lg"
          )}>
            {tooltipValue ?? props.value}
          </div>
        )}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider, sliderTrackVariants, sliderRangeVariants, sliderThumbVariants }
