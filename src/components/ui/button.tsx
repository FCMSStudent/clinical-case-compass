import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { buttonVariants as unifiedButtonVariants } from "@/lib/design-system"
import { componentTypography } from "@/lib/typography"
import { getGlassHoverVariants } from "@/lib/glass-effects"
import { EnhancedIcon } from "@/lib/iconography"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:filter focus-visible:brightness-110 focus-visible:saturate-105 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        // Apple-inspired primary variants
        primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-md transition-all duration-200",
        secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 hover:border-slate-400",
        outline: "border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400",
        ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-700",
        
        // Apple-inspired status variants (desaturated)
        success: "bg-success-500 hover:bg-success-600 text-white shadow-sm hover:shadow-md",
        warning: "bg-warning-500 hover:bg-warning-600 text-white shadow-sm hover:shadow-md",
        error: "bg-error-500 hover:bg-error-600 text-white shadow-sm hover:shadow-md",
        info: "bg-info-500 hover:bg-info-600 text-white shadow-sm hover:shadow-md",
        
        // Medical-specific variants
        medical: "bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-md",
        critical: "bg-error-500 hover:bg-error-600 text-white shadow-sm hover:shadow-md",
        
        // Legacy variants for backward compatibility
        default: "bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-md",
        destructive: "bg-error-500 hover:bg-error-600 text-white shadow-sm hover:shadow-md",
        link: cn(componentTypography.buttonDefault, "text-primary-600 underline-offset-4 hover:underline hover:text-primary-700"),
      },
      size: {
        // Apple-inspired sizes with 8pt grid alignment and 44px minimum touch targets
        xs: cn('h-8 px-2', componentTypography.buttonSmall),           // 32px height + 8px padding = 40px touch target
        sm: cn('h-9 px-3', componentTypography.buttonDefault),          // 36px height + 12px padding = 48px touch target
        default: cn('h-11 px-4', componentTypography.buttonDefault),    // 44px height + 16px padding = 60px touch target (Apple standard)
        md: cn('h-11 px-4', componentTypography.buttonDefault),         // 44px height + 16px padding = 60px touch target
        lg: cn('h-12 px-6', componentTypography.buttonLarge),           // 48px height + 24px padding = 72px touch target
        xl: cn('h-14 px-8', componentTypography.buttonLarge),           // 56px height + 32px padding = 88px touch target
        icon: "h-11 w-11",                                              // 44px x 44px - Apple's minimum touch target
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  glassIntensity?: 'subtle' | 'medium' | 'strong'
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
        {loading && (
          <EnhancedIcon
            icon={Loader2}
            size="sm"
            weight="regular"
            color="default"
            animation="rotate"
            className="mr-2"
          />
        )}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
