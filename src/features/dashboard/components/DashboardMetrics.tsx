import { motion } from "framer-motion";
import { BookOpen, Activity, TrendingUp, Users } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { layout } from "@/design-system/tokens/spacing";
import { ResponsiveMetricCard } from "./ResponsiveMetricCard";
import { MetricCardSkeleton } from "@/shared/components/dashboard-skeleton";
import { useAccessibleAnimation, useScreenReaderAnnouncements, useLiveRegion } from "@/features/dashboard/hooks/use-accessibility";
import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import { useEffect, useRef } from "react";

interface MetricData {
  value: number;
  trend: { value: number; isPositive: boolean; percentage: number };
  sparklineData: Array<{ period: string; value: number }>;
}

interface DashboardMetricsProps {
  metrics?: {
    totalCases: MetricData;
    activeCases: MetricData;
    monthlyCases: MetricData;
    totalPatients: MetricData;
  };
  isLoading: boolean;
  className?: string;
}

export const DashboardMetrics = ({ 
  metrics, 
  isLoading, 
  className 
}: DashboardMetricsProps) => {
  const isMobile = useIsMobile();
  const { getAnimationVariants, shouldAnimate } = useAccessibleAnimation();
  const announce = useScreenReaderAnnouncements();
  const updateLiveRegion = useLiveRegion();
  const previousMetricsRef = useRef<typeof metrics>();

  // Announce metric changes
  useEffect(() => {
    if (metrics && previousMetricsRef.current && !isLoading) {
      const changes: string[] = [];
      
      if (metrics.totalCases.value !== previousMetricsRef.current.totalCases.value) {
        changes.push(`Total cases updated to ${metrics.totalCases.value}`);
      }
      if (metrics.activeCases.value !== previousMetricsRef.current.activeCases.value) {
        changes.push(`Active cases updated to ${metrics.activeCases.value}`);
      }
      
      if (changes.length > 0) {
        updateLiveRegion(changes.join('. '));
      }
    }
    
    previousMetricsRef.current = metrics;
  }, [metrics, isLoading, updateLiveRegion]);

  const staggeredContainer = getAnimationVariants(
    {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    },
    {
      hidden: { opacity: 1 },
      visible: { opacity: 1 }
    }
  );

  const staggeredItem = getAnimationVariants(
    {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: "easeOut",
        },
      },
    },
    {
      hidden: { opacity: 1 },
      visible: { opacity: 1 }
    }
  );

  const gridClassName = isMobile
    ? "grid grid-cols-2 gap-4"
    : cn(
        layout.grid.cols[1],
        "md:grid-cols-2 lg:grid-cols-4",
        layout.grid.gap.lg
      );

  return (
    <section 
      className={className}
      aria-label="Dashboard Metrics"
      role="region"
    >
      <h2 className="sr-only">Key Performance Metrics</h2>
      
      <motion.div
        className={cn(gridClassName)}
        style={{ display: 'grid' }}
        role="group"
        aria-label="Metrics grid"
        {...(shouldAnimate ? {
          variants: staggeredContainer,
          initial: "hidden" as const,
          animate: "visible" as const
        } : {})}
      >
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <MetricCardSkeleton key={index} />
          ))
        ) : (
          <>
            <motion.div 
              role="group"
              aria-label="Total cases metric"
              {...(shouldAnimate ? { variants: staggeredItem } : {})}
            >
              <ResponsiveMetricCard
                title="Total Cases"
                value={metrics?.totalCases.value || 0}
                icon={<BookOpen className="h-6 w-6" />}
                description="All documented cases"
                trend={metrics?.totalCases.trend}
                sparklineData={metrics?.totalCases.sparklineData}
                color="blue"
                priority="medium"
              />
            </motion.div>

            <motion.div 
              role="group"
              aria-label="Active cases metric"
              {...(shouldAnimate ? { variants: staggeredItem } : {})}
            >
              <ResponsiveMetricCard
                title="Active Cases"
                value={metrics?.activeCases.value || 0}
                icon={<Activity className="h-6 w-6" />}
                description="Currently active cases"
                trend={metrics?.activeCases.trend}
                sparklineData={metrics?.activeCases.sparklineData}
                color="green"
                priority="high"
              />
            </motion.div>

            <motion.div 
              role="group"
              aria-label="Monthly cases metric"
              {...(shouldAnimate ? { variants: staggeredItem } : {})}
            >
              <ResponsiveMetricCard
                title="This Month"
                value={metrics?.monthlyCases.value || 0}
                icon={<TrendingUp className="h-6 w-6" />}
                description="Cases this month"
                trend={metrics?.monthlyCases.trend}
                sparklineData={metrics?.monthlyCases.sparklineData}
                color="purple"
                priority="medium"
              />
            </motion.div>

            <motion.div 
              role="group"
              aria-label="Total patients metric"
              {...(shouldAnimate ? { variants: staggeredItem } : {})}
            >
              <ResponsiveMetricCard
                title="Patients"
                value={metrics?.totalPatients.value || 0}
                icon={<Users className="h-6 w-6" />}
                description="Unique patients tracked"
                trend={metrics?.totalPatients.trend}
                sparklineData={metrics?.totalPatients.sparklineData}
                color="orange"
                priority="low"
              />
            </motion.div>
          </>
        )}
      </motion.div>
    </section>
  );
};