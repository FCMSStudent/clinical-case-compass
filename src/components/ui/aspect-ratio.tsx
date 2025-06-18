// -----------------------------------------------------------------------------
// Aspect Ratio – Liquid Glass Edition
// -----------------------------------------------------------------------------
// * Adds glass surfaces so media can float on frosted panels.
// * Provides `preset` shortcuts (square, video, etc.) plus custom ratio.
// * `surface` prop matches the rest of the design-system (`none`, `glass-subtle`,
//   `glass`, `glass-elevated`).
// -----------------------------------------------------------------------------

import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

import { cn } from "@/lib/utils";

// -----------------------------------------------------------------------------
// Presets ----------------------------------------------------------------------

export const aspectRatioPresets = {
  square: 1, // 1:1
  video: 16 / 9,
  photo: 4 / 3,
  cinema: 21 / 9,
  portrait: 3 / 4,
} as const;

// -----------------------------------------------------------------------------
// Variants ---------------------------------------------------------------------

type Surface = "none" | "glass-subtle" | "glass" | "glass-elevated";

const surfaceStyles: Record<Surface, string> = {
  none: "",
  "glass-subtle": "glass-subtle backdrop-blur-md",
  glass: "glass backdrop-blur-lg",
  "glass-elevated": "glass-elevated backdrop-blur-lg",
};

const outlineStyles = {
  default: "",
  bordered: "border border-border rounded-md overflow-hidden",
  elevated: "border border-border rounded-md shadow-md overflow-hidden bg-background",
} as const;

// -----------------------------------------------------------------------------
// Props ------------------------------------------------------------------------

export interface AspectRatioProps
  extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  preset?: keyof typeof aspectRatioPresets;
  surface?: Surface;
  variant?: keyof typeof outlineStyles;
  loading?: boolean;
}

// -----------------------------------------------------------------------------
// Component --------------------------------------------------------------------

export const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(
  (
    {
      className,
      preset,
      surface = "none",
      variant = "default",
      loading = false,
      ratio,
      children,
      ...props
    },
    ref,
  ) => {
    const finalRatio = preset ? aspectRatioPresets[preset] : ratio;

    return (
      <AspectRatioPrimitive.Root
        ref={ref}
        ratio={finalRatio}
        className={cn("relative", surfaceStyles[surface], outlineStyles[variant], className)}
        {...props}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center glass-subtle animate-pulse">
            <span className="text-sm text-white/70">Loading…</span>
          </div>
        ) : (
          children
        )}
      </AspectRatioPrimitive.Root>
    );
  },
);
AspectRatio.displayName = "AspectRatio";

// -----------------------------------------------------------------------------
// Helper Components ------------------------------------------------------------

export const AspectRatioImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & {
    preset?: keyof typeof aspectRatioPresets;
    surface?: Surface;
    variant?: keyof typeof outlineStyles;
  }
>((
  { preset = "photo", surface = "none", variant = "default", className, alt, ...props },
  ref,
) => (
  <AspectRatio preset={preset} surface={surface} variant={variant}>
    <img ref={ref} alt={alt} className={cn("h-full w-full object-cover", className)} {...props} />
  </AspectRatio>
));
AspectRatioImage.displayName = "AspectRatioImage";

export const AspectRatioVideo = React.forwardRef<
  HTMLVideoElement,
  React.VideoHTMLAttributes<HTMLVideoElement> & {
    preset?: keyof typeof aspectRatioPresets;
    surface?: Surface;
    variant?: keyof typeof outlineStyles;
  }
>((
  { preset = "video", surface = "none", variant = "default", className, ...props },
  ref,
) => (
  <AspectRatio preset={preset} surface={surface} variant={variant}>
    <video ref={ref} className={cn("h-full w-full object-cover", className)} {...props} />
  </AspectRatio>
));
AspectRatioVideo.displayName = "AspectRatioVideo";
