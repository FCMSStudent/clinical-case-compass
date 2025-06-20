import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/utils/utils"
import { typo, medicalText, accessible } from "@/design-system/tokens/typography"

const badgeVariants = cva(
  cn(
    "inline-flex items-center rounded-full border px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2",
    typo.caption
  ),
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-white/20 text-white backdrop-blur-sm",
        secondary:
          "border-white/20 bg-white/10 text-white/90 backdrop-blur-sm",
        destructive:
          "border-error/30 bg-error/20 text-error backdrop-blur-sm",
        outline: 
          "border-white/20 text-white/90 bg-white/5 backdrop-blur-sm",
        success:
          "border-success/30 bg-success/20 text-success backdrop-blur-sm",
        warning:
          "border-warning/30 bg-warning/20 text-warning backdrop-blur-sm",
        info:
          "border-info/30 bg-info/20 text-info backdrop-blur-sm",
        critical: medicalText.critical + ' bg-red-900/20 border-red-400/30',
        stable: medicalText.stable + ' bg-green-900/20 border-green-400/30',
        warningMedical: medicalText.warning + ' bg-amber-900/20 border-amber-400/30',
        inactive: medicalText.inactive + ' bg-white/10 border-white/20',
        accessibleCritical: accessible.critical,
        accessibleVital: accessible.vital,
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

