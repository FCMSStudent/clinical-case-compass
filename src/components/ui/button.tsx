import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { motion, Variants } from "framer-motion" // Added motion

import { cn } from "@/lib/utils"
import { buttonVariants as unifiedButtonVariants } from "@/lib/styles/common"
import { typography } from "@/lib/typography"
import {
  getMotionVariants,
  subtleButtonHoverTap,
  subtleReducedMotionButton
} from "@/lib/motion" // Added motion imports

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg",
    typography.button
  ),
  {
    variants: {
      variant: {
        // Primary variants
        primary: unifiedButtonVariants.primary,
        secondary: unifiedButtonVariants.secondary,
        outline: unifiedButtonVariants.outline,
        ghost: unifiedButtonVariants.ghost,
        
        // Status variants
        success: unifiedButtonVariants.success,
        warning: unifiedButtonVariants.warning,
        error: unifiedButtonVariants.error,
        info: unifiedButtonVariants.info,
        
        // Medical-specific variants
        medical: unifiedButtonVariants.medical,
        critical: unifiedButtonVariants.critical,
        
        // Legacy variants for backward compatibility
        default: unifiedButtonVariants.primary,
        destructive: unifiedButtonVariants.error,
        link: cn(typography.link, "text-white underline-offset-4 hover:underline"),
      },
      size: {
        xs: 'h-6 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        default: 'h-10 px-4 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
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
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    // Determine the component type: Slot for composition, motion.button for animation
    const Comp = asChild ? Slot : motion.button;
    // Get the appropriate animation variants based on user's reduced motion preference
    const appliedVariants = getMotionVariants(subtleButtonHoverTap, subtleReducedMotionButton);

    // If 'asChild' is true, Framer Motion props cannot be directly applied here.
    // The parent component would be responsible for wrapping this component's child with `motion`
    // if animations are desired on the child.
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={disabled || loading}
          {...props}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        variants={appliedVariants}
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
