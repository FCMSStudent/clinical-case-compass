import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/utils/utils"
import { typography } from "@/design-system/tokens/typography"

// Unified select trigger variants
const selectTriggerVariants = cva(
  // Base styles with enhanced glass effects and accessibility
  cn(
    "flex w-full items-center justify-between transition-all duration-300 ease-out backdrop-blur-sm relative overflow-hidden",
    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/3 before:to-transparent before:pointer-events-none before:rounded-xl",
    "after:absolute after:inset-[1px] after:bg-gradient-to-b after:from-white/5 after:via-transparent after:to-transparent after:pointer-events-none after:rounded-[11px]",
    "ring-offset-background placeholder:text-white/60 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    typography.body.default
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white",
          "hover:bg-white/15 hover:border-white/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-lg focus-visible:border-2 focus-visible:border-blue-400/60 focus-visible:bg-white/20",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-[0_2px_8px_rgba(0,0,0,0.04)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        subtle: cn(
          "bg-white/5 backdrop-blur-sm border border-white/15 rounded-xl text-white/90",
          "hover:bg-white/10 hover:border-white/20",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-md focus-visible:border-2 focus-visible:border-blue-400/50 focus-visible:bg-white/15",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-[0_1px_4px_rgba(0,0,0,0.02)] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
        ),
        
        elevated: cn(
          "bg-white/15 backdrop-blur-lg border border-white/25 rounded-xl text-white shadow-sm",
          "hover:bg-white/20 hover:border-white/35 hover:shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-xl focus-visible:border-2 focus-visible:border-blue-400/70 focus-visible:bg-white/25",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-[0_4px_16px_rgba(0,0,0,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        ),
        
        medical: cn(
          "bg-sky-500/10 backdrop-blur-md border border-sky-400/30 rounded-xl text-sky-100",
          "hover:bg-sky-500/15 hover:border-sky-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-lg focus-visible:border-2 focus-visible:border-sky-400/70 focus-visible:bg-sky-500/20",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-[0_4px_16px_rgba(14,165,233,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        success: cn(
          "bg-green-500/10 backdrop-blur-md border border-green-400/30 rounded-xl text-green-100",
          "hover:bg-green-500/15 hover:border-green-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-lg focus-visible:border-2 focus-visible:border-green-400/70 focus-visible:bg-green-500/20",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-[0_4px_16px_rgba(34,197,94,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        warning: cn(
          "bg-amber-500/10 backdrop-blur-md border border-amber-400/30 rounded-xl text-amber-100",
          "hover:bg-amber-500/15 hover:border-amber-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-lg focus-visible:border-2 focus-visible:border-amber-400/70 focus-visible:bg-amber-500/20",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-[0_4px_16px_rgba(245,158,11,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        error: cn(
          "bg-red-500/10 backdrop-blur-md border border-red-400/30 rounded-xl text-red-100",
          "hover:bg-red-500/15 hover:border-red-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-lg focus-visible:border-2 focus-visible:border-red-400/70 focus-visible:bg-red-500/20",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-[0_4px_16px_rgba(239,68,68,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
        
        info: cn(
          "bg-blue-500/10 backdrop-blur-md border border-blue-400/30 rounded-xl text-blue-100",
          "hover:bg-blue-500/15 hover:border-blue-400/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:backdrop-blur-lg focus-visible:border-2 focus-visible:border-blue-400/70 focus-visible:bg-blue-500/20",
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-[0_4px_16px_rgba(59,130,246,0.08)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        ),
      },
      size: {
        xs: 'h-6 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-3 text-sm',
        lg: 'h-12 px-4 text-base',
        xl: 'h-14 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, variant, size, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ variant, size }), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-60" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 text-white/60 hover:text-white/80 transition-colors duration-200",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 text-white/60 hover:text-white/80 transition-colors duration-200",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-xl text-white shadow-2xl",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        // Enhanced glass dropdown with consistent styling
        "bg-white/15 backdrop-blur-[28px] saturate-170 brightness-107 border border-white/25",
        "shadow-[0_8px_32px_rgba(0,0,0,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
        "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none before:rounded-xl",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "py-1.5 pl-8 pr-2 text-sm font-semibold text-white/70",
      className
    )}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-lg py-2 pl-8 pr-2 text-sm outline-none",
      "text-white/90 transition-all duration-200",
      "focus:bg-white/15 focus:text-white focus:backdrop-blur-md",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "hover:bg-white/10 hover:text-white",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-white" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-white/15", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  selectTriggerVariants,
}
