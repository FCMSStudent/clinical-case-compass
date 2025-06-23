import React from "react";
import { BookOpen, CheckCircle, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
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
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)"
      }}
      className="group cursor-pointer"
    >
      {/* Glass container with layered depth */}
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-xl"></div>
        <motion.div 
          className="relative backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl overflow-hidden"
          whileHover={{ 
            scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1.02,
            y: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : -4
          }}
          transition={{ duration: 0.3, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {/* Animated background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <motion.div 
              className="backdrop-blur-sm bg-white/10 border border-white/20 p-4 rounded-xl transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110"
              whileHover={{ rotate: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 5 }}
            >
              {icon}
            </motion.div>
            {trend && (
              <motion.div 
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium backdrop-blur-sm border",
                  trend.isPositive 
                    ? "bg-green-500/20 text-green-200 border-green-400/30" 
                    : "bg-red-500/20 text-red-200 border-red-400/30"
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.2, duration: 0.4 }}
              >
                <TrendingUp className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  !trend.isPositive && "rotate-180"
                )} />
                <span>{Math.abs(trend.value)}%</span>
              </motion.div>
            )}
          </div>
          
          <div className="space-y-2 relative z-10">
            <motion.div 
              className="text-3xl font-bold text-white transition-all duration-300 group-hover:brightness-110"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.1, duration: 0.5 }}
            >
              {value.toLocaleString()}
            </motion.div>
            <motion.div 
              className="text-lg text-white/90 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.15, duration: 0.5 }}
            >
              {title}
            </motion.div>
          </div>

          {/* Light refraction effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const MetricSkeleton: React.FC = () => (
  <div className="relative">
    <div className="absolute inset-0 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20"></div>
    <div className="relative backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="w-16 h-16 bg-white/20 rounded-xl"></div>
        <div className="w-20 h-8 bg-white/20 rounded-full"></div>
      </div>
      <div className="space-y-3">
        <div className="w-24 h-9 bg-white/25 rounded"></div>
        <div className="w-32 h-6 bg-white/20 rounded"></div>
      </div>
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
