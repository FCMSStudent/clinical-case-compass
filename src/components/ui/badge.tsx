
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-white/20 text-white backdrop-blur-sm",
        secondary:
          "border-white/20 bg-white/10 text-white/90 backdrop-blur-sm",
        destructive:
          "border-red-400/30 bg-red-500/20 text-red-300 backdrop-blur-sm",
        outline: "border-white/20 text-white/90 bg-white/5 backdrop-blur-sm",
        success:
          "border-green-400/30 bg-green-500/20 text-green-300 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

