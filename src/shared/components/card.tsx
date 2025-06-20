
import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"
import { card } from "@/lib/design-system"
import { getGlassHoverVariants, getGlassTransitionVariants } from "@/lib/glass-effects"
import { typography } from "@/lib/typography"

const Card = React.forwardRef<
  HTMLDivElement,
  Omit<HTMLMotionProps<"div">, "onDrag"> & {
    variant?: keyof typeof card.variant
    glassIntensity?: 'subtle' | 'medium'
    interactive?: boolean
  }
>(({ className, variant = "default", glassIntensity = 'medium', interactive = false, ...props }, ref) => {
  const glassVariants = interactive ? getGlassHoverVariants(glassIntensity) : getGlassTransitionVariants(glassIntensity)
  
  return (
    <motion.div
      ref={ref}
      className={cn(
        card.base,
        card.variant[variant],
        interactive && "cursor-pointer",
        className
      )}
      variants={glassVariants}
      initial="initial"
      animate="animate"
      whileHover={interactive ? "hover" : undefined}
      whileTap={interactive ? "tap" : undefined}
      whileFocus={interactive ? "focus" : undefined}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-4", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      typography.h4,
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(typography.body.small, className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0 p-4", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-0 p-4", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
