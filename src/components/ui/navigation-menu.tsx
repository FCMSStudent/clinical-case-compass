// -----------------------------------------------------------------------------
// Navigation Menu – Liquid Glass Edition
// -----------------------------------------------------------------------------
// 1. All interactive surfaces (`Trigger`, `Viewport`, indicator) now use our
//    glass utility classes (glass-subtle | glass | glass-elevated).
// 2. The trigger is motion-enabled for a gentle scale/brightness hover/tap.
// 3. CVA typed variants expose size + glass presets so consumers can override
//    with <NavigationMenuTrigger variant="glass-elevated" size="lg" />.
// -----------------------------------------------------------------------------

import * as React from "react";
import * as Nav from "@radix-ui/react-navigation-menu";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  getMotionVariants,
  subtleButtonHoverTap,
  subtleReducedMotionButton,
} from "@/lib/motion";

// ─── Trigger Variants ---------------------------------------------------------
const triggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl border backdrop-blur-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus:outline-none",
  {
    variants: {
      variant: {
        "glass-subtle": "glass-subtle border-white/15 text-white/90 hover:bg-white/15 focus:bg-white/20",
        glass: "glass border-white/20 text-white hover:bg-white/20 focus:bg-white/25",
        "glass-elevated": "glass-elevated border-white/25 text-white hover:bg-white/25 focus:bg-white/30",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: { variant: "glass", size: "md" },
  },
);

export interface NavigationMenuTriggerProps
  extends React.ComponentPropsWithoutRef<typeof Nav.Trigger>,
    VariantProps<typeof triggerVariants> {}

// ─── Root ---------------------------------------------------------------------
export const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof Nav.Root>,
  React.ComponentPropsWithoutRef<typeof Nav.Root>
>(({ className, children, ...props }, ref) => (
  <Nav.Root
    ref={ref}
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </Nav.Root>
));
NavigationMenu.displayName = Nav.Root.displayName;

// ─── List ---------------------------------------------------------------------
export const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof Nav.List>,
  React.ComponentPropsWithoutRef<typeof Nav.List>
>(({ className, ...props }, ref) => (
  <Nav.List
    ref={ref}
    className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
    {...props}
  />
));
NavigationMenuList.displayName = Nav.List.displayName;

// ─── Item ---------------------------------------------------------------------
export const NavigationMenuItem = Nav.Item;

// ─── Trigger (motion-enabled) --------------------------------------------------
export const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof Nav.Trigger>,
  NavigationMenuTriggerProps
>(({ className, variant, size, children, ...props }, ref) => {
  const motionVariants = getMotionVariants(subtleButtonHoverTap, subtleReducedMotionButton);

  return (
    <Nav.Trigger asChild ref={ref} {...props}>
      <motion.button
        className={cn(triggerVariants({ variant, size, className }))}
        variants={motionVariants as any}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        whileFocus="focus"
      >
        {children}
        <ChevronDown
          className="relative top-px ml-1 h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180 text-white/70"
          aria-hidden="true"
        />
      </motion.button>
    </Nav.Trigger>
  );
});
NavigationMenuTrigger.displayName = Nav.Trigger.displayName;

// ─── Content ------------------------------------------------------------------
export const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof Nav.Content>,
  React.ComponentPropsWithoutRef<typeof Nav.Content>
>(({ className, ...props }, ref) => (
  <Nav.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = Nav.Content.displayName;

// ─── Link ---------------------------------------------------------------------
export const NavigationMenuLink = Nav.Link;

// ─── Viewport -----------------------------------------------------------------
export const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof Nav.Viewport>,
  React.ComponentPropsWithoutRef<typeof Nav.Viewport>
>(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full flex justify-center">
    <Nav.Viewport
      ref={ref}
      className={cn(
        "origin-top-center relative mt-1 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-xl border border-white/20 glass backdrop-blur-xl text-white shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = Nav.Viewport.displayName;

// ─── Indicator ----------------------------------------------------------------
export const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof Nav.Indicator>,
  React.ComponentPropsWithoutRef<typeof Nav.Indicator>
>(({ className, ...props }, ref) => (
  <Nav.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-white/20 shadow-md" />
  </Nav.Indicator>
));
NavigationMenuIndicator.displayName = Nav.Indicator.displayName;

// -----------------------------------------------------------------------------
// Exports Alias for default style helper ---------------------------------------
export const navigationMenuTriggerStyle = triggerVariants;
