import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/utils/utils"
import { getGlassHoverVariants } from "@/design-system/components/glass-effects"

// Unified switch variants
const switchVariants = cva(
  // Base styles with enhanced glass effects and accessibility
  cn(
    "peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-all duration-300 ease-out relative overflow-hidden",
    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none before:rounded-full",
    "after:absolute after:inset-[1px] after:bg-gradient-to-b after:from-white/3 after:via-transparent after:to-transparent after:pointer-events-none after:rounded-full",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border-2 border-white/20 backdrop-blur-sm",
          "data-[state=checked]:bg-white/15 data-[state=checked]:border-white/30",
          "data-[state=unchecked]:bg-white/5 data-[state=unchecked]:border-white/15",
          "hover:border-white/30 hover:bg-white/8",
          "focus-visible:ring-white/40",
          "shadow-[0_2px_8px_rgba(0,0,0,0.04)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        subtle: cn(
          "border-2 border-white/15 backdrop-blur-sm",
          "data-[state=checked]:bg-white/10 data-[state=checked]:border-white/25",
          "data-[state=unchecked]:bg-white/3 data-[state=unchecked]:border-white/10",
          "hover:border-white/20 hover:bg-white/5",
          "focus-visible:ring-white/30",
          "shadow-[0_1px_4px_rgba(0,0,0,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        ),
        
        elevated: cn(
          "border-2 border-white/25 backdrop-blur-md shadow-sm",
          "data-[state=checked]:bg-white/20 data-[state=checked]:border-white/35",
          "data-[state=unchecked]:bg-white/8 data-[state=unchecked]:border-white/20",
          "hover:border-white/35 hover:bg-white/12 hover:shadow-md",
          "focus-visible:ring-white/50",
          "shadow-[0_4px_16px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        ),
        
        medical: cn(
          "border-2 border-sky-400/30 backdrop-blur-sm",
          "data-[state=checked]:bg-sky-500/15 data-[state=checked]:border-sky-400/40",
          "data-[state=unchecked]:bg-sky-500/5 data-[state=unchecked]:border-sky-400/20",
          "hover:border-sky-400/40 hover:bg-sky-500/8",
          "focus-visible:ring-sky-400/60",
          "shadow-[0_4px_16px_rgba(14,165,233,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        success: cn(
          "border-2 border-green-400/30 backdrop-blur-sm",
          "data-[state=checked]:bg-green-500/15 data-[state=checked]:border-green-400/40",
          "data-[state=unchecked]:bg-green-500/5 data-[state=unchecked]:border-green-400/20",
          "hover:border-green-400/40 hover:bg-green-500/8",
          "focus-visible:ring-green-400/60",
          "shadow-[0_4px_16px_rgba(34,197,94,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        warning: cn(
          "border-2 border-amber-400/30 backdrop-blur-sm",
          "data-[state=checked]:bg-amber-500/15 data-[state=checked]:border-amber-400/40",
          "data-[state=unchecked]:bg-amber-500/5 data-[state=unchecked]:border-amber-400/20",
          "hover:border-amber-400/40 hover:bg-amber-500/8",
          "focus-visible:ring-amber-400/60",
          "shadow-[0_4px_16px_rgba(245,158,11,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        error: cn(
          "border-2 border-red-400/30 backdrop-blur-sm",
          "data-[state=checked]:bg-red-500/15 data-[state=checked]:border-red-400/40",
          "data-[state=unchecked]:bg-red-500/5 data-[state=unchecked]:border-red-400/20",
          "hover:border-red-400/40 hover:bg-red-500/8",
          "focus-visible:ring-red-400/60",
          "shadow-[0_4px_16px_rgba(239,68,68,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        info: cn(
          "border-2 border-blue-400/30 backdrop-blur-sm",
          "data-[state=checked]:bg-blue-500/15 data-[state=checked]:border-blue-400/40",
          "data-[state=unchecked]:bg-blue-500/5 data-[state=unchecked]:border-blue-400/20",
          "hover:border-blue-400/40 hover:bg-blue-500/8",
          "focus-visible:ring-blue-400/60",
          "shadow-[0_4px_16px_rgba(59,130,246,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
      },
      size: {
        xs: 'h-4 w-7',
        sm: 'h-5 w-9',
        md: 'h-6 w-11',
        lg: 'h-7 w-14',
        xl: 'h-8 w-16',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

// Switch thumb variants
const switchThumbVariants = cva(
  // Base thumb styles with enhanced glass effects
  cn(
    "pointer-events-none block rounded-full bg-white ring-0 transition-all duration-300 ease-out relative overflow-hidden",
    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:pointer-events-none before:rounded-full",
    "shadow-lg backdrop-blur-sm"
  ),
  {
    variants: {
      size: {
        xs: 'h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0',
        sm: 'h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        md: 'h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0',
        xl: 'h-7 w-7 data-[state=checked]:translate-x-8 data-[state=unchecked]:translate-x-0',
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  glassIntensity?: 'subtle' | 'medium' | 'strong';
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant, size, glassIntensity = 'medium', ...props }, ref) => {
  const glassVariants = getGlassHoverVariants(glassIntensity);
  
  return (
    <SwitchPrimitives.Root
      className={cn(switchVariants({ variant, size }), className)}
      onClick={() => {
        // Haptic feedback for supported devices
        if ('vibrate' in navigator && !props.disabled) {
          navigator.vibrate(5);
        }
      }}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(switchThumbVariants({ size }))}
      />
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch, switchVariants, switchThumbVariants }
