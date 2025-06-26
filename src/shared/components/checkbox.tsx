import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/shared/utils/utils"
import { getGlassHoverVariants } from "@/design-system/components/glass-effects"

// Unified checkbox variants
const checkboxVariants = cva(
  // Base styles with enhanced glass effects and accessibility
  cn(
    "peer shrink-0 rounded-lg transition-all duration-300 ease-out relative overflow-hidden",
    "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none before:rounded-lg",
    "after:absolute after:inset-[1px] after:bg-gradient-to-b after:from-white/3 after:via-transparent after:to-transparent after:pointer-events-none after:rounded-[7px]",
    "ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border border-white/20 backdrop-blur-sm",
          "data-[state=checked]:bg-white/15 data-[state=checked]:text-white data-[state=checked]:border-white/30",
          "hover:border-white/30 hover:bg-white/5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-md",
          "shadow-[0_2px_8px_rgba(0,0,0,0.04)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        subtle: cn(
          "border border-white/15 backdrop-blur-sm",
          "data-[state=checked]:bg-white/10 data-[state=checked]:text-white/90 data-[state=checked]:border-white/25",
          "hover:border-white/20 hover:bg-white/3",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-md",
          "shadow-[0_1px_4px_rgba(0,0,0,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        ),
        
        elevated: cn(
          "border border-white/25 backdrop-blur-md shadow-sm",
          "data-[state=checked]:bg-white/20 data-[state=checked]:text-white data-[state=checked]:border-white/35",
          "hover:border-white/35 hover:bg-white/8 hover:shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-lg",
          "shadow-[0_4px_16px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        ),
        
        medical: cn(
          "border border-sky-400/30 backdrop-blur-sm",
          "data-[state=checked]:bg-sky-500/15 data-[state=checked]:text-sky-100 data-[state=checked]:border-sky-400/40",
          "hover:border-sky-400/40 hover:bg-sky-500/5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-md",
          "shadow-[0_4px_16px_rgba(14,165,233,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        success: cn(
          "border border-green-400/30 backdrop-blur-sm",
          "data-[state=checked]:bg-green-500/15 data-[state=checked]:text-green-100 data-[state=checked]:border-green-400/40",
          "hover:border-green-400/40 hover:bg-green-500/5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-md",
          "shadow-[0_4px_16px_rgba(34,197,94,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        warning: cn(
          "border border-amber-400/30 backdrop-blur-sm",
          "data-[state=checked]:bg-amber-500/15 data-[state=checked]:text-amber-100 data-[state=checked]:border-amber-400/40",
          "hover:border-amber-400/40 hover:bg-amber-500/5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-md",
          "shadow-[0_4px_16px_rgba(245,158,11,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        error: cn(
          "border border-red-400/30 backdrop-blur-sm",
          "data-[state=checked]:bg-red-500/15 data-[state=checked]:text-red-100 data-[state=checked]:border-red-400/40",
          "hover:border-red-400/40 hover:bg-red-500/5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-md",
          "shadow-[0_4px_16px_rgba(239,68,68,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        info: cn(
          "border border-blue-400/30 backdrop-blur-sm",
          "data-[state=checked]:bg-blue-500/15 data-[state=checked]:text-blue-100 data-[state=checked]:border-blue-400/40",
          "hover:border-blue-400/40 hover:bg-blue-500/5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-md",
          "shadow-[0_4px_16px_rgba(59,130,246,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
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

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  glassIntensity?: 'subtle' | 'medium' | 'strong';
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, size, glassIntensity = 'medium', ...props }, ref) => {
  const glassVariants = getGlassHoverVariants(glassIntensity);
  
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(checkboxVariants({ variant, size }), className)}
      onClick={() => {
        // Haptic feedback for supported devices
        if ('vibrate' in navigator && !props.disabled) {
          navigator.vibrate(3);
        }
      }}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          "flex items-center justify-center text-current transition-all duration-300",
          "data-[state=checked]:scale-100 data-[state=unchecked]:scale-0",
          "data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0"
        )}
      >
        <Check className={cn(
          "transition-all duration-300",
          size === "xs" && "h-2 w-2",
          size === "sm" && "h-3 w-3",
          size === "md" && "h-4 w-4",
          size === "lg" && "h-5 w-5",
          size === "xl" && "h-6 w-6"
        )} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, checkboxVariants }
