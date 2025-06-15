import * as React from "react"
import { motion } from "framer-motion" // Added motion
import { cn } from "@/lib/utils"
import { cardVariants as unifiedCardVariants, componentSizes } from "@/lib/component-system"
import {
  getMotionVariants,
  subtleCardInteraction,
  reducedMotionCardInteraction
} from "@/lib/motion" // Added motion imports

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: keyof typeof unifiedCardVariants
    // Consumers can pass standard motion props like 'whileHover', 'variants' etc. to override defaults if needed.
  }
>(({ className, variant = "default", ...props }, ref) => {
  // Get the appropriate animation variants based on user's reduced motion preference
  const appliedVariants = getMotionVariants(subtleCardInteraction, reducedMotionCardInteraction);

  // The Card component is now a motion.div, applying subtle hover/focus animations
  // if it's made interactive (e.g., by an onClick handler or by being focusable).
  // These animations provide default feedback without requiring consumers to wrap Card in motion.div.
  return (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-xl", // Base styles from card.tsx
        unifiedCardVariants[variant], // Theme styles from component-system (includes base shadow, bg, etc.)
        className
      )}
      // Apply the subtle interaction variants for hover and focus states.
      // Initial state is also defined in these variants.
      variants={appliedVariants}
      initial="initial"
      whileHover="hover"
      whileFocus="focus" // Card needs to be focusable (e.g. tabIndex="0") for whileFocus to trigger
      {...props}
    />
  );
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", componentSizes.card.md, className)}
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
      "text-lg font-semibold text-white",
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
    className={cn("text-sm text-white/70", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", componentSizes.card.md, className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-0", componentSizes.card.md, className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
