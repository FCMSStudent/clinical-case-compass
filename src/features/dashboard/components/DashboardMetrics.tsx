import React, { useState, useEffect, memo, useMemo } from "react";
import { BookOpen, CheckCircle, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cn } from "@/shared/utils/utils";

interface DashboardMetricsProps {
  data: {
    totalCases: number;
    activeCases: number;
    monthlyCases: number;
    totalPatients: number;
  } | null;
  isLoading: boolean;
}

// Simplified Animated Counter Component
const AnimatedCounter: React.FC<{ value: number }> = memo(({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000; // 1 second
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
});

AnimatedCounter.displayName = 'AnimatedCounter';

// Simplified Metric Card Component
const MetricCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  delay: number;
  color: string;
  onClick?: () => void;
}> = memo(({ title, value, icon, trend, delay, color, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)"
      }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      {/* Simplified Glass container */}
      <div className="relative">
        <motion.div 
          className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 min-h-[140px]"
          whileHover={{ 
            scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1.02
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Header with icon and trend */}
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/10 border border-white/20 p-3 rounded-xl">
              {icon}
            </div>
            
            {trend && (
              <div className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium",
                trend.isPositive 
                  ? "bg-green-500/20 text-green-200 border border-green-400/30" 
                  : "bg-red-500/20 text-red-200 border border-red-400/30"
              )}>
                <TrendingUp className={cn(
                  "h-4 w-4",
                  !trend.isPositive && "rotate-180"
                )} />
                <span>{Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          
          {/* Value and title */}
          <div className="space-y-2">
            <div className="text-3xl font-bold text-white">
              <AnimatedCounter value={value} />
            </div>
            <div className="text-lg text-white/90 font-medium">
              {title}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
});

MetricCard.displayName = 'MetricCard';

// Simplified Skeleton Component
const MetricSkeleton: React.FC = memo(() => (
  <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6 animate-pulse min-h-[140px]">
    <div className="flex items-center justify-between mb-6">
      <div className="w-14 h-14 bg-white/20 rounded-xl"></div>
      <div className="w-16 h-8 bg-white/20 rounded-full"></div>
    </div>
    <div className="space-y-3">
      <div className="w-20 h-8 bg-white/25 rounded"></div>
      <div className="w-32 h-6 bg-white/20 rounded"></div>
    </div>
  </div>
));

MetricSkeleton.displayName = 'MetricSkeleton';

export const DashboardMetrics: React.FC<DashboardMetricsProps> = memo(({
  data,
  isLoading
}) => {
  const navigate = useNavigate();

  // Memoize metrics configuration to prevent recreation on every render
  const metrics = useMemo(() => {
    if (!data) return [];
    
    return [
      {
        title: "Total Cases",
        value: data.totalCases,
        icon: <BookOpen className="h-6 w-6 text-blue-300" />,
        trend: { value: 12, isPositive: true },
        color: "blue",
        onClick: () => navigate('/cases?filter=all')
      },
      {
        title: "Active Cases",
        value: data.activeCases,
        icon: <CheckCircle className="h-6 w-6 text-green-300" />,
        trend: { value: 8, isPositive: true },
        color: "green",
        onClick: () => navigate('/cases?filter=active')
      },
      {
        title: "This Month",
        value: data.monthlyCases,
        icon: <TrendingUp className="h-6 w-6 text-purple-300" />,
        trend: { value: 15, isPositive: true },
        color: "purple",
        onClick: () => navigate('/cases?filter=monthly')
      },
      {
        title: "Total Patients",
        value: data.totalPatients,
        icon: <Users className="h-6 w-6 text-orange-300" />,
        trend: { value: 5, isPositive: true },
        color: "orange",
        onClick: () => navigate('/patients')
      }
    ];
  }, [data, navigate]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <MetricSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          trend={metric.trend}
          delay={index * 0.1}
          color={metric.color}
          onClick={metric.onClick}
        />
      ))}
    </div>
  );
});

DashboardMetrics.displayName = 'DashboardMetrics';
