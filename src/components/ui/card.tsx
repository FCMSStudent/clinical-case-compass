import * as React from "react"
import { motion } from "framer-motion" // Added motion
import { cn } from "@/lib/utils"
import { card as newCardStyles } from "@/lib/styles/components" // Updated import
import {
  getMotionVariants,
  subtleCardInteraction,
  reducedMotionCardInteraction
} from "@/lib/motion" // Added motion imports

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: keyof typeof newCardStyles.variant // Updated to use newCardStyles
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
        newCardStyles.base, // Use base style from new system
        newCardStyles.variant[variant], // Use variant style from new system
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
    className={cn("flex flex-col space-y-1.5", newCardStyles.padding.lg, className)} // Use new padding
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
  <div ref={ref} className={cn("pt-0", newCardStyles.padding.lg, className)} {...props} /> // Use new padding
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-0", newCardStyles.padding.lg, className)} // Use new padding
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
