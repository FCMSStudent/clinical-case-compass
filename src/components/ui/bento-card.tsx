
import * as React from "react";
import { cn } from "@/lib/utils";
import { bentoCard, bentoCardVariants, spacing, typography, iconWithText } from "@/lib/ui-styles";

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive" | "featured" | "compact";
  size?: "compact" | "default" | "medium" | "large" | "hero" | "tall";
  layout?: "small" | "medium" | "large" | "hero" | "featured" | "wide" | "tall";
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  compact?: boolean;
}

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ className, variant = "default", size, layout, icon, title, subtitle, children, compact = false, ...props }, ref) => {
    // Determine the layout classes
    const layoutClasses = layout ? bentoCard.layouts[layout] : '';
    const sizeClasses = size ? bentoCard.size[size] : '';
    const variantClasses = bentoCardVariants[variant];

    // Consistent padding based on card type
    const headerPadding = compact ? "p-4 pb-3" : "p-5 pb-4";
    const contentPadding = compact ? "px-4 pb-4" : "px-5 pb-5";

    return (
      <div
        ref={ref}
        className={cn(
          variantClasses,
          layoutClasses,
          sizeClasses,
          className
        )}
        {...props}
      >
        {(title || subtitle || icon) && (
          <div className={cn(headerPadding, "border-b border-white/10")}>
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg ring-1 ring-white/10">
                  {React.cloneElement(icon as React.ReactElement, {
                    className: cn(iconWithText, (icon as React.ReactElement).props?.className)
                  })}
                </div>
              )}
              <div className="flex-1 min-w-0">
                {title && (
                  <h3 className={cn(typography.h5, "truncate")}>{title}</h3>
                )}
                {subtitle && (
                  <p className={cn(typography.description, "truncate mt-1")}>{subtitle}</p>
                )}
              </div>
            </div>
          </div>
        )}
        <div className={contentPadding}>
          {children}
        </div>
      </div>
    );
  }
);

BentoCard.displayName = "BentoCard";

export { BentoCard };
