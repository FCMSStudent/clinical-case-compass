import React, { useState, useEffect } from "react";
import { BookOpen, CheckCircle, Users, TrendingUp, ArrowRight, Activity } from "lucide-react";
import { motion, useSpring, useTransform } from "framer-motion";
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

// Animated Counter Component
const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({ 
  value, 
  duration = 2 
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const springValue = useSpring(value, { 
    stiffness: 100, 
    damping: 30,
    mass: 1.2
  });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    return rounded.onChange(setDisplayValue);
  }, [rounded]);

  return <span>{displayValue.toLocaleString()}</span>;
};

// Mini Sparkline Chart Component
const MiniSparkline: React.FC<{ 
  data: number[]; 
  color: string;
  animate?: boolean;
}> = ({ data, color, animate = true }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  const width = 80;
  const height = 24;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = range === 0 ? height / 2 : height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="relative">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={`var(--${color}-300)`} stopOpacity="0.8" />
            <stop offset="100%" stopColor={`var(--${color}-500)`} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <motion.polyline
          points={points}
          fill="none"
          stroke={`var(--${color}-400)`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
        />
        {/* Fill area under the line */}
        <motion.polygon
          points={`0,${height} ${points} ${width},${height}`}
          fill={`url(#gradient-${color})`}
          initial={{ opacity: 0 }}
          animate={animate ? { opacity: 0.3 } : { opacity: 0.3 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
        />
        {/* Animated dots on data points */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * width;
          const y = range === 0 ? height / 2 : height - ((value - min) / range) * height;
          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill={`var(--${color}-400)`}
              initial={{ scale: 0, opacity: 0 }}
              animate={animate ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: 0.8 + (index * 0.1),
                ease: "backOut"
              }}
            />
          );
        })}
      </svg>
    </div>
  );
};

// Progress Ring Component
const ProgressRing: React.FC<{ 
  progress: number; 
  size?: number; 
  strokeWidth?: number;
  color?: string;
}> = ({ 
  progress, 
  size = 48, 
  strokeWidth = 4,
  color = "blue"
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative">
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`var(--${color}-400)`}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium text-white">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  delay: number;
  sparklineData?: number[];
  progress?: number;
  color: string;
  onClick?: () => void;
}> = ({ title, value, icon, trend, delay, sparklineData, progress, color, onClick }) => {
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
      onClick={onClick}
    >
      {/* Enhanced Glass container with layered depth */}
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-xl"></div>
        <motion.div 
          className="relative backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl overflow-hidden min-h-[160px]"
          whileHover={{ 
            scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1.02,
            y: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : -4
          }}
          transition={{ duration: 0.3, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {/* Animated background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Header with icon and trend */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <motion.div 
              className="backdrop-blur-sm bg-white/10 border border-white/20 p-3 rounded-xl transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110"
              whileHover={{ rotate: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 5 }}
            >
              {icon}
            </motion.div>
            
            <div className="flex items-center space-x-3">
              {progress !== undefined && (
                <ProgressRing progress={progress} color={color} size={40} />
              )}
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
          </div>
          
          {/* Value and title */}
          <div className="space-y-3 relative z-10">
            <motion.div 
              className="text-3xl font-bold text-white transition-all duration-300 group-hover:brightness-110"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.1, duration: 0.5 }}
            >
              <AnimatedCounter value={value} />
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

          {/* Mini sparkline chart */}
          {sparklineData && (
            <motion.div
              className="mt-4 flex items-center justify-between relative z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.3, duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-white/60" />
                <span className="text-sm text-white/60">7-day trend</span>
              </div>
              <MiniSparkline data={sparklineData} color={color} />
            </motion.div>
          )}

          {/* Click indicator */}
          <motion.div
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ x: 10 }}
            whileHover={{ x: 0 }}
          >
            <ArrowRight className="h-5 w-5 text-white/60" />
          </motion.div>

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
    <div className="relative backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6 animate-pulse min-h-[160px]">
      <div className="flex items-center justify-between mb-6">
        <div className="w-14 h-14 bg-white/20 rounded-xl"></div>
        <div className="w-16 h-10 bg-white/20 rounded-full"></div>
      </div>
      <div className="space-y-3">
        <div className="w-20 h-8 bg-white/25 rounded"></div>
        <div className="w-32 h-6 bg-white/20 rounded"></div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="w-20 h-4 bg-white/15 rounded"></div>
        <div className="w-16 h-6 bg-white/15 rounded"></div>
      </div>
    </div>
  </div>
);

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  data,
  isLoading
}) => {
  const navigate = useNavigate();

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

  // Sample sparkline data - in real app, this would come from your API
  const sparklineData = {
    totalCases: [15, 23, 18, 34, 28, 45, 38],
    activeCases: [8, 12, 9, 18, 15, 24, 20],
    monthlyCases: [3, 5, 4, 8, 6, 12, 9],
    totalPatients: [12, 18, 15, 28, 22, 35, 30]
  };

  const metrics = [
    {
      title: "Total Cases",
      value: data.totalCases,
      icon: <BookOpen className="h-6 w-6 text-blue-300" />,
      trend: { value: 12, isPositive: true },
      sparklineData: sparklineData.totalCases,
      progress: 75,
      color: "blue",
      onClick: () => navigate('/cases?filter=all')
    },
    {
      title: "Active Cases",
      value: data.activeCases,
      icon: <CheckCircle className="h-6 w-6 text-green-300" />,
      trend: { value: 8, isPositive: true },
      sparklineData: sparklineData.activeCases,
      progress: 85,
      color: "green",
      onClick: () => navigate('/cases?filter=active')
    },
    {
      title: "This Month",
      value: data.monthlyCases,
      icon: <TrendingUp className="h-6 w-6 text-purple-300" />,
      trend: { value: 15, isPositive: true },
      sparklineData: sparklineData.monthlyCases,
      progress: 60,
      color: "purple",
      onClick: () => navigate('/cases?filter=monthly')
    },
    {
      title: "Total Patients",
      value: data.totalPatients,
      icon: <Users className="h-6 w-6 text-orange-300" />,
      trend: { value: 5, isPositive: true },
      sparklineData: sparklineData.totalPatients,
      progress: 70,
      color: "orange",
      onClick: () => navigate('/patients')
    }
  ];

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
          sparklineData={metric.sparklineData}
          progress={metric.progress}
          color={metric.color}
          onClick={metric.onClick}
        />
      ))}
    </div>
  );
};
