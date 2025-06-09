import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle, FileEdit, TrendingUp, Clock, BookOpen, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { ICON_SIZE } from "@/constants/ui";
import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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
      bg: "bg-blue-500/10",
      text: "text-blue-600",
      border: "border-blue-200",
      gradient: "from-blue-500/20 to-blue-600/20",
      progress: "bg-blue-500"
    },
    green: {
      bg: "bg-green-500/10",
      text: "text-green-600",
      border: "border-green-200",
      gradient: "from-green-500/20 to-green-600/20",
      progress: "bg-green-500"
    },
    orange: {
      bg: "bg-orange-500/10",
      text: "text-orange-600",
      border: "border-orange-200",
      gradient: "from-orange-500/20 to-orange-600/20",
      progress: "bg-orange-500"
    },
    purple: {
      bg: "bg-purple-500/10",
      text: "text-purple-600",
      border: "border-purple-200",
      gradient: "from-purple-500/20 to-purple-600/20",
      progress: "bg-purple-500"
    },
    indigo: {
      bg: "bg-indigo-500/10",
      text: "text-indigo-600",
      border: "border-indigo-200",
      gradient: "from-indigo-500/20 to-indigo-600/20",
      progress: "bg-indigo-500"
    }
  };

  const currentColor = colorClasses[color];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Card className={cn(
        "group relative overflow-hidden border-0 bg-gradient-to-br from-card via-card to-card/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:translate-x-[-100%] before:group-hover:translate-x-[100%] before:transition-transform before:duration-700",
        className
      )}>
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
            {subtitle && (
              <p className="text-xs text-muted-foreground/70">{subtitle}</p>
            )}
          </div>
          <div className={cn(
            "relative h-12 w-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110",
            currentColor.bg,
            currentColor.text,
            currentColor.border
          )}>
            <div className={cn(
              "absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              currentColor.gradient
            )} />
            <div className="relative z-10">
              {icon}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <motion.span 
                className="text-3xl font-bold"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {value}
              </motion.span>
              {trend && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-center gap-1"
                >
                  <TrendingUp className={cn(
                    "h-4 w-4",
                    trend.isPositive ? "text-green-600" : "text-red-600 rotate-180"
                  )} />
                  <span className={cn(
                    "text-sm font-medium",
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  )}>
                    {trend.value}%
                  </span>
                </motion.div>
              )}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          
          {progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  className={cn("h-2 rounded-full", currentColor.progress)}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-4">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-10 w-10 bg-muted rounded-xl"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalCases = stats.totalCases;
  const completionRate = totalCases > 0 ? Math.round((stats.casesWithLearningPoints / totalCases) * 100) : 0;
  const weeklyGrowth = totalCases > 0 ? Math.round((stats.thisWeekCases / totalCases) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Key Metrics</h2>
          <p className="text-muted-foreground">Your learning progress at a glance</p>
        </div>
        <Badge variant="outline" className="border-primary/30 text-primary">
          <Target className="h-3 w-3 mr-1" />
          Real-time data
        </Badge>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Cases"
          value={totalCases}
          icon={<BookOpen className={`${ICON_SIZE} text-current`} />}
          description="All documented cases"
          color="blue"
          progress={Math.min((totalCases / 50) * 100, 100)}
          subtitle="Your case library"
        />
        <StatCard
          title="Learning Points"
          value={stats.casesWithLearningPoints}
          icon={<CheckCircle className={`${ICON_SIZE} text-current`} />}
          description="Cases with insights captured"
          color="green"
          trend={{ value: completionRate, isPositive: completionRate > 50 }}
          subtitle="Knowledge captured"
        />
        <StatCard
          title="Resources Added"
          value={stats.totalResources}
          icon={<FileEdit className={`${ICON_SIZE} text-current`} />}
          description="Total learning resources"
          color="orange"
          subtitle="Study materials"
        />
        <StatCard
          title="This Week"
          value={stats.thisWeekCases}
          icon={<Clock className={`${ICON_SIZE} text-current`} />}
          description="New cases this week"
          color="purple"
          trend={{ value: weeklyGrowth, isPositive: weeklyGrowth > 0 }}
          subtitle="Recent activity"
        />
      </div>
    </div>
  );
};

export { StatCard };
