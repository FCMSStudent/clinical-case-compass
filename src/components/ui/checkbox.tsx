import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { motion } from "framer-motion" // Added motion

import { cn } from "@/lib/utils"
import { focusRing } from "@/lib/styles/common" // Updated import
import {
  getMotionVariants,
  subtleCheckboxHover,
  reducedMotionCheckboxHover,
} from "@/lib/motion" // Added motion imports

const MotionCheckboxRoot = motion(CheckboxPrimitive.Root) // Create motion component from Radix primitive

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  // Get the appropriate animation variants for hover, respecting reduced motion settings.
  // Focus is primarily handled by the `focusRing` CSS utility.
  const appliedVariants = getMotionVariants(
    subtleCheckboxHover,
    reducedMotionCheckboxHover
  );

  return (
    // MotionCheckboxRoot is `motion(CheckboxPrimitive.Root)` allowing animation props.
    <MotionCheckboxRoot
      ref={ref}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-xl border border-white/20 ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-white/20 data-[state=checked]:text-white backdrop-blur-sm",
        focusRing, // Applies CSS-based focus ring styling.
        className
      )}
      // Apply hover animations (e.g., scale, border change) via variants.
      // Initial state is defined within the variants.
      variants={appliedVariants}
      initial="initial"
      whileHover="hover"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </MotionCheckboxRoot>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
