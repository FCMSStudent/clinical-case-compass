
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
      className="glass-metrics hover:scale-[1.02] cursor-pointer"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="glass-inner p-4 rounded-xl">
          {icon}
        </div>
        {trend && (
          <div className={cn(
            "flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium glass-inner",
            trend.isPositive ? "text-green-200" : "text-red-200"
          )}>
            <TrendingUp className={cn(
              "h-4 w-4",
              !trend.isPositive && "rotate-180"
            )} />
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="text-3xl font-bold text-white">
          {value.toLocaleString()}
        </div>
        <div className="text-lg text-white/90 font-medium">
          {title}
        </div>
      </div>
    </motion.div>
  );
};

const MetricSkeleton: React.FC = () => (
  <div className="glass-metrics animate-pulse">
    <div className="flex items-center justify-between mb-6">
      <div className="w-16 h-16 bg-white/20 rounded-xl"></div>
      <div className="w-20 h-8 bg-white/20 rounded-full"></div>
    </div>
    <div className="space-y-3">
      <div className="w-24 h-9 bg-white/25 rounded"></div>
      <div className="w-32 h-6 bg-white/20 rounded"></div>
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
