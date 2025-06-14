
import * as React from "react"

import { cn } from "@/lib/utils"
import { inputLikeBase } from "@/lib/ui-styles"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          inputLikeBase,
          "min-h-[80px] px-3 py-2",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
