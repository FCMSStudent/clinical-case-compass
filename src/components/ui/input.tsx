import * as React from "react"
import { motion } from "framer-motion" // Added motion
import { cn } from "@/lib/utils"
import { inputVariants as unifiedInputVariants, componentSizes } from "@/lib/component-system"
import {
  getMotionVariants,
  subtleInputInteraction,
  reducedMotionInputInteraction
} from "@/lib/motion" // Added motion imports

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: keyof typeof unifiedInputVariants
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    // Get the appropriate animation variants based on user's reduced motion preference
    const appliedVariants = getMotionVariants(subtleInputInteraction, reducedMotionInputInteraction);

    return (
      // Using motion.input to enable Framer Motion animations on focus
      <motion.input
        type={type}
        className={cn(
          "flex w-full rounded-lg", // Base styles
          // Note: We are removing unifiedInputVariants[variant] if it heavily styles border/shadow that motion will handle
          // Or ensure motion variants override. For now, let's assume motion variants will take precedence for border/shadow.
          // If not, we might need to adjust the className to remove conflicting styles on focus.
          unifiedInputVariants[variant],
          componentSizes.input.md,
          className
        )}
        ref={ref}
        variants={appliedVariants}
        initial="initial"
        whileFocus="focus"
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
