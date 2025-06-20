import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { Briefcase, CheckCircle, FileEdit, TrendingUp, Clock, BookOpen, Target, Zap } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { ICON_SIZE } from "@/constants/ui";
import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/shared/components/progress";
import { Badge } from "@/shared/components/badge";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  className?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  progress?: number;
  color?: "blue" | "green" | "orange" | "purple" | "indigo";
  subtitle?: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  className, 
  trend,
  progress,
  color = "blue",
  subtitle
}: StatCardProps) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-400/20",
      text: "text-blue-300",
      border: "border-blue-300/30",
      gradient: "from-blue-400/30 to-blue-500/30",
      progress: "bg-blue-300"
    },
    green: {
      bg: "bg-green-400/20",
      text: "text-green-300",
      border: "border-green-300/30",
      gradient: "from-green-400/30 to-green-500/30",
      progress: "bg-green-300"
    },
    orange: {
      bg: "bg-orange-400/20",
      text: "text-orange-300",
      border: "border-orange-300/30",
      gradient: "from-orange-400/30 to-orange-500/30",
      progress: "bg-orange-300"
    },
    purple: {
      bg: "bg-purple-400/20",
      text: "text-purple-300",
      border: "border-purple-300/30",
      gradient: "from-purple-400/30 to-purple-500/30",
      progress: "bg-purple-300"
    },
    indigo: {
      bg: "bg-indigo-400/20",
      text: "text-indigo-300",
      border: "border-indigo-300/30",
      gradient: "from-indigo-400/30 to-indigo-500/30",
      progress: "bg-indigo-300"
    }
  };

  const currentColor = colorClasses[color];
  const cardId = `stat-card-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
        <div 
          className={cn(
            "relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 group overflow-hidden transition-all duration-300",
            "hover:bg-white/15 hover:border-white/30",
            "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-100%] before:group-hover:translate-x-[100%] before:transition-transform before:duration-700",
            className
          )}
          role="article"
          aria-labelledby={`${cardId}-title`}
          aria-describedby={description ? `${cardId}-description` : undefined}
        >
          <div className="flex flex-row items-center justify-between pb-4">
            <div className="space-y-1">
              <h3 id={`${cardId}-title`} className="text-sm font-medium text-white/80">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-white/60">{subtitle}</p>
              )}
            </div>
            <div 
              className={cn(
                "relative h-12 w-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110",
                currentColor.bg,
                currentColor.text,
                currentColor.border
              )}
              aria-hidden="true"
            >
              <div className={cn(
                "absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                currentColor.gradient
              )} />
              <div className="relative z-10">
                {icon}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <motion.span 
                  className="text-3xl font-bold text-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  aria-label={`${value} ${title.toLowerCase()}`}
                >
                  {value}
                </motion.span>
                {trend && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex items-center gap-1"
                    aria-label={`${trend.isPositive ? 'Increase' : 'Decrease'} of ${trend.value}%`}
                  >
                    <TrendingUp 
                      className={cn(
                        "h-4 w-4",
                        trend.isPositive ? "text-green-300" : "text-red-300 rotate-180"
                      )} 
                      aria-hidden="true"
                    />
                    <span className={cn(
                      "text-sm font-medium",
                      trend.isPositive ? "text-green-300" : "text-red-300"
                    )}>
                      {trend.value}%
                    </span>
                  </motion.div>
                )}
              </div>
              {description && (
                <p id={`${cardId}-description`} className="text-sm text-white/70">{description}</p>
              )}
            </div>
            
            {progress !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/70">Progress</span>
                  <span className="font-medium text-white" aria-label={`${Math.round(progress)}% progress`}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div 
                  role="progressbar"
                  aria-label={`${title} progress`}
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="w-full bg-white/10 rounded-full h-2 overflow-hidden"
                >
                  <motion.div
                    className={cn("h-2 rounded-full", currentColor.progress)}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface StatsData {
  totalCases: number;
  totalResources: number;
  casesWithLearningPoints: number;
  thisWeekCases: number;
}

interface StatCardsProps {
  stats: StatsData;
  isLoading: boolean;
}

export const StatCards = ({ stats, isLoading }: StatCardsProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" role="status" aria-live="polite">
        <div className="sr-only">Loading statistics...</div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 animate-pulse">
              <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
              <div className="h-10 w-10 bg-white/20 rounded-xl"></div>
              <div className="h-8 bg-white/20 rounded w-1/2 mb-2 mt-4"></div>
              <div className="h-4 bg-white/20 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const totalCases = stats.totalCases;
  const completionRate = Math.round((stats.casesWithLearningPoints / Math.max(totalCases, 1)) * 100);
  const weeklyGrowth = Math.round((stats.thisWeekCases / Math.max(totalCases - stats.thisWeekCases, 1)) * 100);

  return (
    <section aria-labelledby="key-metrics-heading">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="key-metrics-heading" className="text-2xl font-bold text-white">Key Metrics</h2>
            <p className="text-white/70">Your learning progress at a glance</p>
          </div>
          <Badge variant="outline" className="border-white/30 text-white bg-white/10">
            <Target className="h-3 w-3 mr-1" aria-hidden="true" />
            Real-time data
          </Badge>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" role="list" aria-label="Key metrics">
          <div role="listitem">
            <StatCard
              title="Total Cases"
              value={totalCases}
              icon={<BookOpen className={`${ICON_SIZE} text-current`} aria-hidden="true" />}
              description="All documented cases"
              color="blue"
              progress={Math.min((totalCases / 50) * 100, 100)}
              subtitle="Your case library"
            />
          </div>
          <div role="listitem">
            <StatCard
              title="Learning Points"
              value={stats.casesWithLearningPoints}
              icon={<CheckCircle className={`${ICON_SIZE} text-current`} aria-hidden="true" />}
              description="Cases with insights captured"
              color="green"
              trend={{ value: completionRate, isPositive: completionRate > 50 }}
              subtitle="Knowledge captured"
            />
          </div>
          <div role="listitem">
            <StatCard
              title="Resources Added"
              value={stats.totalResources}
              icon={<FileEdit className={`${ICON_SIZE} text-current`} aria-hidden="true" />}
              description="Total learning resources"
              color="orange"
              subtitle="Study materials"
            />
          </div>
          <div role="listitem">
            <StatCard
              title="This Week"
              value={stats.thisWeekCases}
              icon={<Clock className={`${ICON_SIZE} text-current`} aria-hidden="true" />}
              description="New cases this week"
              color="purple"
              trend={{ value: weeklyGrowth, isPositive: weeklyGrowth > 0 }}
              subtitle="Recent activity"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { StatCard };
