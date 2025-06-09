import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle, FileEdit, TrendingUp, Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { ICON_SIZE } from "@/constants/ui";
import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

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
  color?: "blue" | "green" | "orange" | "purple";
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  className, 
  trend,
  progress,
  color = "blue"
}: StatCardProps) => {
  const colorClasses = {
    blue: "bg-blue-500/10 text-blue-600 border-blue-200",
    green: "bg-green-500/10 text-green-600 border-green-200",
    orange: "bg-orange-500/10 text-orange-600 border-orange-200",
    purple: "bg-purple-500/10 text-purple-600 border-purple-200"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm",
        className
      )}>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={cn(
            "h-10 w-10 rounded-xl flex items-center justify-center border",
            colorClasses[color]
          )}>
            {icon}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-baseline space-x-2">
            <div className="text-3xl font-bold text-foreground">{value}</div>
            {trend && (
              <div className={cn(
                "flex items-center text-sm font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                <TrendingUp className={cn(
                  "h-4 w-4 mr-1",
                  !trend.isPositive && "rotate-180"
                )} />
                {trend.value}%
              </div>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
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
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-8 w-8 bg-muted rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16 mb-2"></div>
              <div className="h-4 bg-muted rounded w-32"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalCases = stats.totalCases;
  const completionRate = totalCases > 0 ? Math.round((stats.casesWithLearningPoints / totalCases) * 100) : 0;
  const weeklyGrowth = stats.thisWeekCases > 0 ? Math.round((stats.thisWeekCases / totalCases) * 100) : 0;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Cases"
        value={totalCases}
        icon={<BookOpen className={`${ICON_SIZE} text-current`} />}
        description="All documented cases"
        color="blue"
        progress={completionRate}
      />
      <StatCard
        title="Learning Points"
        value={stats.casesWithLearningPoints}
        icon={<CheckCircle className={`${ICON_SIZE} text-current`} />}
        description="Cases with insights captured"
        color="green"
        trend={{ value: completionRate, isPositive: completionRate > 50 }}
      />
      <StatCard
        title="Resources Added"
        value={stats.totalResources}
        icon={<FileEdit className={`${ICON_SIZE} text-current`} />}
        description="Total learning resources"
        color="orange"
      />
      <StatCard
        title="This Week"
        value={stats.thisWeekCases}
        icon={<Clock className={`${ICON_SIZE} text-current`} />}
        description="New cases this week"
        color="purple"
        trend={{ value: weeklyGrowth, isPositive: weeklyGrowth > 0 }}
      />
    </div>
  );
};

export { StatCard };
