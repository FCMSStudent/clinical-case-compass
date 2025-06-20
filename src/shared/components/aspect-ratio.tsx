import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/shared/utils/utils"

interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  /** 
   * Common aspect ratio presets for convenience 
   * Custom ratios can still be passed via the `ratio` prop
   */
  preset?: "square" | "video" | "photo" | "cinema" | "portrait"
  /** 
   * Add a subtle border and background for better visual definition
   */
  variant?: "default" | "bordered" | "elevated"
  /** 
   * Whether to show loading state placeholder
   */
  loading?: boolean
}

const aspectRatioPresets = {
  square: 1,        // 1:1
  video: 16 / 9,    // 16:9
  photo: 4 / 3,     // 4:3
  cinema: 21 / 9,   // 21:9 (ultrawide)
  portrait: 3 / 4,  // 3:4
} as const

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({ className, preset, variant = "default", loading = false, ratio, ...props }, ref) => {
  // Use preset ratio if provided, otherwise fall back to custom ratio or default
  const finalRatio = preset ? aspectRatioPresets[preset] : ratio

  const variantStyles = {
    default: "",
    bordered: "border border-border rounded-md overflow-hidden",
    elevated: "border border-border rounded-md shadow-sm overflow-hidden bg-background",
  }

  return (
    <AspectRatioPrimitive.Root
      ref={ref}
      ratio={finalRatio}
      className={cn(
        "relative",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <div className="text-muted-foreground text-sm">Loading...</div>
        </div>
      ) : (
        props.children
      )}
    </AspectRatioPrimitive.Root>
  )
})

AspectRatio.displayName = "AspectRatio"

// Additional utility components for common use cases
const AspectRatioImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & Pick<AspectRatioProps, "preset" | "variant">
>(({ preset = "photo", variant = "default", className, alt, ...props }, ref) => (
  <AspectRatio preset={preset} variant={variant}>
    <img
      ref={ref}
      className={cn("object-cover w-full h-full", className)}
      alt={alt}
      {...props}
    />
  </AspectRatio>
))

AspectRatioImage.displayName = "AspectRatioImage"

const AspectRatioVideo = React.forwardRef<
  HTMLVideoElement,
  React.VideoHTMLAttributes<HTMLVideoElement> & Pick<AspectRatioProps, "preset" | "variant">
>(({ preset = "video", variant = "default", className, ...props }, ref) => (
  <AspectRatio preset={preset} variant={variant}>
    <video
      ref={ref}
      className={cn("object-cover w-full h-full", className)}
      {...props}
    />
  </AspectRatio>
))

AspectRatioVideo.displayName = "AspectRatioVideo"

export { AspectRatio, AspectRatioImage, AspectRatioVideo }
