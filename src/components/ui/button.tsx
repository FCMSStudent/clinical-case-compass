import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { motion, HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"
import { buttonVariants as unifiedButtonVariants } from "@/lib/design-system"
import { typography } from "@/lib/typography"
import { getGlassHoverVariants } from "@/lib/glass-effects"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        // Primary variants with enhanced glass effects
        primary: unifiedButtonVariants.primary,
        secondary: unifiedButtonVariants.secondary,
        outline: unifiedButtonVariants.outline,
        ghost: unifiedButtonVariants.ghost,
        
        // Status variants with enhanced glass effects
        success: unifiedButtonVariants.success,
        warning: unifiedButtonVariants.warning,
        error: unifiedButtonVariants.error,
        info: unifiedButtonVariants.info,
        
        // Medical-specific variants with enhanced glass effects
        medical: unifiedButtonVariants.medical,
        critical: unifiedButtonVariants.critical,
        
        // Legacy variants for backward compatibility
        default: unifiedButtonVariants.primary,
        destructive: unifiedButtonVariants.error,
        link: cn(typography.link, "text-white underline-offset-4 hover:underline"),
      },
      size: {
        xs: 'h-6 px-2 text-xs font-medium',
        sm: 'h-9 rounded-lg px-3',
        default: 'h-10 px-4 py-2',
        md: 'h-10 px-4 text-sm md:text-base font-medium',
        lg: 'h-11 rounded-xl px-8',
        xl: 'h-14 px-8 text-lg md:text-xl font-bold',
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
    const Comp = asChild ? Slot : motion.button
    const glassVariants = getGlassHoverVariants(glassIntensity)
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        variants={glassVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        whileFocus="focus"
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
