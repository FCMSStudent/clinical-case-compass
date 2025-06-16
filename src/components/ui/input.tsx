import * as React from "react"
import { motion } from "framer-motion" // Added motion
import { cn } from "@/lib/utils"
import { input as newInputStyles } from "@/lib/styles/components" // Updated import
import {
  getMotionVariants,
  subtleInputInteraction,
  reducedMotionInputInteraction
} from "@/lib/motion" // Added motion imports

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // variant prop is removed as new system uses a single base style for input + sizes
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => { // variant prop removed from destructuring
    // Get the appropriate animation variants based on user's reduced motion preference
    const appliedVariants = getMotionVariants(subtleInputInteraction, reducedMotionInputInteraction);

    return (
      // Using motion.input to enable Framer Motion animations on focus
      <motion.input
        type={type}
        className={cn(
          newInputStyles.base,    // Use base style from new system
          newInputStyles.size.md, // Use size style from new system
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
