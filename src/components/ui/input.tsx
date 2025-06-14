
import * as React from "react"

import { cn } from "@/lib/utils"
import { inputLikeBase } from "@/lib/ui-styles"

export interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputLikeBase,
          "h-10 px-3 py-2",
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
