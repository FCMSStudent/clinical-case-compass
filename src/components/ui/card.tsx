import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { card } from "@/lib/design-system"
import { getGlassHoverVariants, getGlassTransitionVariants } from "@/lib/glass-effects"
import { componentTypography } from "@/lib/typography"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: keyof typeof card.variant
    glassIntensity?: 'subtle' | 'medium' | 'strong'
    interactive?: boolean
  }
>(({ className, variant = "default", glassIntensity = 'medium', interactive = false, ...props }, ref) => {
  const glassVariants = interactive ? getGlassHoverVariants(glassIntensity) : getGlassTransitionVariants(glassIntensity)
  const Comp = interactive ? motion.div : motion.div
  
  return (
    <Comp
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
    className={cn("flex flex-col space-y-2 p-4", className)}
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
      componentTypography.cardTitle,
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
    className={cn(componentTypography.cardCaption, className)}
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
