
import React from "react";
import { BookOpen, CheckCircle, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { glass } from "@/design-system/components/components";
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

const MetricCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  delay: number;
}> = ({ title, value, icon, trend, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        "p-6 rounded-xl border border-white/20 transition-all duration-300",
        glass.card,
        "hover:scale-[1.02] hover:shadow-lg"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "p-3 rounded-xl",
          glass.subtle
        )}>
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium",
            trend.isPositive ? "text-green-300 bg-green-500/20" : "text-red-300 bg-red-500/20"
          )}>
            <TrendingUp className={cn(
              "h-3 w-3",
              !trend.isPositive && "rotate-180"
            )} />
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="text-2xl font-bold text-white">
          {value.toLocaleString()}
        </div>
        <div className="text-sm text-white/80">
          {title}
        </div>
      </div>
    </motion.div>
  );
};

const MetricSkeleton: React.FC = () => (
  <div className={cn(
    "p-6 rounded-xl border border-white/20 animate-pulse",
    glass.card
  )}>
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-white/20 rounded-xl"></div>
      <div className="w-16 h-6 bg-white/20 rounded-full"></div>
    </div>
    <div className="space-y-2">
      <div className="w-20 h-8 bg-white/20 rounded"></div>
      <div className="w-24 h-4 bg-white/20 rounded"></div>
    </div>
  </div>
);

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  data,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <MetricSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!data) return null;

  const metrics = [
    {
      title: "Total Cases",
      value: data.totalCases,
      icon: <BookOpen className="h-6 w-6 text-blue-300" />,
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Active Cases",
      value: data.activeCases,
      icon: <CheckCircle className="h-6 w-6 text-green-300" />,
      trend: { value: 8, isPositive: true }
    },
    {
      title: "This Month",
      value: data.monthlyCases,
      icon: <TrendingUp className="h-6 w-6 text-purple-300" />,
      trend: { value: 15, isPositive: true }
    },
    {
      title: "Total Patients",
      value: data.totalPatients,
      icon: <Users className="h-6 w-6 text-orange-300" />,
      trend: { value: 5, isPositive: true }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          trend={metric.trend}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};
