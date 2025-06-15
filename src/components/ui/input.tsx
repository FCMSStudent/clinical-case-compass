
import * as React from "react"

import { cn } from "@/lib/utils"
import { input } from "@/lib/design-system"

export interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `${input.base} ${input.size.md}`,
          error && "border-red-400/50 focus-visible:ring-red-400/30",
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
