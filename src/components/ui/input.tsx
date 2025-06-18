
import * as React from "react"
import { cn } from "@/lib/utils"
import { inputVariants as unifiedInputVariants, componentSizes } from "@/lib/component-system"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: keyof typeof unifiedInputVariants
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-lg",
          unifiedInputVariants[variant],
          componentSizes.input.md,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
