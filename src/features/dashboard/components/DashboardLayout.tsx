import { motion } from "framer-motion";
import { cn } from "@/shared/utils/utils";
import { layout } from "@/design-system/tokens/spacing";
import { getGlassTransitionVariants } from "@/design-system/components/glass-effects";
import { useAccessibleAnimation, useKeyboardNavigation } from "@/features/dashboard/hooks/use-accessibility";
import { PageHeader } from "@/shared/components/page-header";
import { Alert, AlertDescription } from "@/shared/components/alert";
import { typography } from "@/design-system/tokens/typography";
import { liquidGlassClasses } from "@/design-system/components/glass-effects";
import { useRef } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  error?: Error | null;
  className?: string;
}

export const DashboardLayout = ({
  children,
  title = "Dashboard",
  description = "Your clinical cases overview",
  actions,
  error,
  className
}: DashboardLayoutProps) => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const { getAnimationVariants, shouldAnimate } = useAccessibleAnimation();

  // Enable keyboard navigation for the dashboard
  useKeyboardNavigation(dashboardRef, {
    enabled: true,
    gridCols: 4, // For metric cards grid
  });

  const containerVariants = getAnimationVariants(
    getGlassTransitionVariants('medium'),
    { // Reduced motion fallback
      initial: { opacity: 1 },
      animate: { opacity: 1 }
    }
  );

  if (error) {
    return (
      <motion.div 
        className={cn("space-y-6", className)}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        role="main"
        aria-labelledby="dashboard-title"
      >
        <PageHeader
          title={title}
          description={description}
          actions={actions}
        />
        <Alert 
          variant="destructive" 
          className={cn(liquidGlassClasses.alert, "bg-red-900/30 border-red-700/50")}
          role="alert"
          aria-live="assertive"
        >
          <AlertDescription className={typography.bodySmall}>
            There was an error loading the dashboard data: {error.message || 'Unknown error occurred'}
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  const motionProps = shouldAnimate ? {
    variants: containerVariants,
    initial: "initial" as const,
    animate: "animate" as const
  } : {};

  return (
    <motion.div 
      ref={dashboardRef}
      className={cn("space-y-6", className)}
      role="main"
      aria-labelledby="dashboard-title"
      aria-describedby="dashboard-description"
      {...motionProps}
    >
      <div className="sr-only" id="dashboard-instructions">
        Use arrow keys to navigate between dashboard elements. Press Enter or Space to interact with focused elements.
      </div>
      
      <PageHeader
        title={title}
        description={description}
        actions={actions}
      />
      
      <div 
        className={cn("space-y-6")}
        aria-describedby="dashboard-instructions"
      >
        {children}
      </div>
    </motion.div>
  );
};