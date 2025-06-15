
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonBase, glassmorphicBg, glassmorphicBgElevated, errorState, successState } from "@/lib/ui-styles"

const buttonVariants = cva(
  buttonBase,
  {
    variants: {
      variant: {
        primary: `${glassmorphicBgElevated} text-white hover:bg-white/30`,
        default: `${glassmorphicBgElevated} text-white hover:bg-white/30`,
        destructive: `${errorState} border border-red-400/30 hover:bg-red-500/20`,
        outline: `${glassmorphicBg} text-white border border-white/20 hover:bg-white/20`,
        secondary: `${glassmorphicBg} text-white/90 hover:bg-white/20`,
        ghost: "text-white/90 hover:bg-white/10",
        success: `${successState} border border-green-400/30 hover:bg-green-500/20`,
        link: "text-white underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-xl px-8",
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
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // When using asChild, we cannot add additional children like the loading spinner
    // because Slot expects exactly one child element
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      )
    }
    
    // For regular buttons, we can add the loading spinner
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
