import * as React from "react";
import { cn } from "@/lib/utils";
import { bento as newBentoStyles, card as newCardStyles } from "@/lib/styles/components"; // Updated imports

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: keyof typeof newBentoStyles.card.span; // Or map from old layout values if needed
  size?: keyof typeof newBentoStyles.card.size; // Explicit size prop
  variant?: keyof typeof newCardStyles.variant; // Use new card variants
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ 
    className, 
    layout = "medium", // Corresponds to a span key
    size = "medium",   // Corresponds to a size key
    variant = "default", 
    icon, 
    title, 
    subtitle, 
    children, 
    ...props 
  }, ref) => {
    // Assuming layout prop maps to a span key and size prop maps to a size key
    const spanClass = newBentoStyles.card.span[layout as keyof typeof newBentoStyles.card.span] || newBentoStyles.card.span.medium;
    const sizeClass = newBentoStyles.card.size[size as keyof typeof newBentoStyles.card.size] || newBentoStyles.card.size.medium;
    const cardStyleClasses = newCardStyles.variant[variant] || newCardStyles.variant.default;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col", // Base flex layout for card content
          newCardStyles.base, // Base styles from new card system (includes rounding, base glassmorphism)
          cardStyleClasses,   // Variant styles from new card system
          spanClass,          // Bento span class
          sizeClass,          // Bento size class
          newCardStyles.padding.lg, // Use padding from new card system (p-6)
          className
        )}
        {...props}
      >
        {/* Header */}
        {(icon || title || subtitle) && (
          <div className="flex items-start gap-3 mb-4">
            {icon && (
              <div className={cn("flex-shrink-0", "h-6 w-6")}> {/* Replaced componentSizes.icon.lg */}
                {icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="text-lg font-semibold text-white mb-1">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-white/70">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    );
  }
);

BentoCard.displayName = "BentoCard";

export { BentoCard };
