import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Award } from "lucide-react";
import { motion } from "framer-motion";

interface ProgressChartProps {
  stats: {
    totalCases: number;
    totalResources: number;
    casesWithLearningPoints: number;
    thisWeekCases: number;
  };
}

export const ProgressChart = ({ stats }: ProgressChartProps) => {
  const completionRate = stats.totalCases > 0 ? Math.round((stats.casesWithLearningPoints / stats.totalCases) * 100) : 0;
  const weeklyProgress = Math.min(stats.thisWeekCases * 20, 100); // 5 cases = 100%
  const resourceEfficiency = stats.totalCases > 0 ? Math.round((stats.totalResources / stats.totalCases) * 100) : 0;

  const goals = [
    {
      title: "Case Completion",
      current: completionRate,
      target: 80,
      icon: Target,
      color: "bg-blue-500"
    },
    {
      title: "Weekly Activity",
      current: weeklyProgress,
      target: 100,
      icon: TrendingUp,
      color: "bg-green-500"
    },
    {
      title: "Resource Quality",
      current: Math.min(resourceEfficiency, 100),
      target: 60,
      icon: Award,
      color: "bg-purple-500"
    }
  ];

  return (
    <Card className="h-full bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Progress Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal, index) => {
          const IconComponent = goal.icon;
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          const isOnTrack = goal.current >= goal.target * 0.8;

          return (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${goal.color} bg-opacity-10`}>
                    <IconComponent className="h-4 w-4 text-current" />
                  </div>
                  <span className="text-sm font-medium">{goal.title}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {goal.current}/{goal.target}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className={isOnTrack ? "text-green-600" : "text-orange-600"}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${goal.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
        
        <div className="pt-4 border-t border-border/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.round((completionRate + weeklyProgress + Math.min(resourceEfficiency, 100)) / 3)}%
            </div>
            <div className="text-sm text-muted-foreground">Overall Progress</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 