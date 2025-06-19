import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { typography, statusTypography, accessibleTypography } from "@/lib/typography"

const badgeVariants = cva(
  cn(
    "inline-flex items-center rounded-full border px-2 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:ring-offset-2",
    typography.caption1
  ),
  {
    variants: {
      variant: {
        default:
          "border-slate-300 bg-slate-100 text-slate-700",
        secondary:
          "border-slate-200 bg-slate-50 text-slate-600",
        destructive:
          "border-error-200 bg-error-100 text-error-700",
        outline: 
          "border-slate-300 text-slate-600 bg-transparent",
        success:
          "border-success-200 bg-success-100 text-success-700",
        warning:
          "border-warning-200 bg-warning-100 text-warning-700",
        info:
          "border-info-200 bg-info-100 text-info-700",
        critical: statusTypography.critical + ' bg-error-100 border-error-200 text-error-700',
        stable: statusTypography.success + ' bg-success-100 border-success-200 text-success-700',
        warningMedical: statusTypography.warning + ' bg-warning-100 border-warning-200 text-warning-700',
        inactive: statusTypography.neutral + ' bg-slate-100 border-slate-200 text-slate-600',
        accessibleCritical: accessibleTypography.critical,
        accessibleVital: accessibleTypography.vital,
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

