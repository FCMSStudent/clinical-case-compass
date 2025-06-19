import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { componentTypography, accessibleTypography } from "@/lib/typography"

const alertVariants = cva(
  "relative w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-white",
  {
    variants: {
      variant: {
        default: "text-white",
        destructive:
          "border-error/30 bg-error/20 text-error [&>svg]:text-error",
        success:
          "border-success/30 bg-success/20 text-success [&>svg]:text-success",
        warning:
          "border-warning/30 bg-warning/20 text-warning [&>svg]:text-warning",
        info:
          "border-info/30 bg-info/20 text-info [&>svg]:text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, variant, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      componentTypography.alertTitle,
      variant === 'destructive' && accessibleTypography.critical,
      "mb-1 text-white",
      className
    )}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(componentTypography.alertBody, "text-white/70 [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
