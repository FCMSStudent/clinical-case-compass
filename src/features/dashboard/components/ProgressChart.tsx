import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Award, CheckCircle, Clock, BookOpen, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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
  const weeklyProgress = Math.min((stats.thisWeekCases / 5) * 100, 100); // Assuming 5 cases per week is the target
  const resourceEfficiency = stats.totalCases > 0 ? Math.round((stats.totalResources / stats.totalCases) * 100) : 0;
  const overallProgress = Math.round((completionRate + weeklyProgress + Math.min(resourceEfficiency, 100)) / 3);

  const goals = [
    {
      title: "Case Completion",
      current: stats.casesWithLearningPoints,
      target: stats.totalCases,
      icon: CheckCircle,
      color: "bg-green-500",
      description: "Cases with learning insights"
    },
    {
      title: "Weekly Activity",
      current: stats.thisWeekCases,
      target: 5,
      icon: Clock,
      color: "bg-blue-500",
      description: "New cases this week"
    },
    {
      title: "Resource Utilization",
      current: stats.totalResources,
      target: stats.totalCases * 2,
      icon: BookOpen,
      color: "bg-purple-500",
      description: "Resources per case"
    }
  ];

  const getProgressStatus = (progress: number) => {
    if (progress >= 80) return { status: "Excellent", color: "text-green-300", bg: "bg-green-500/20" };
    if (progress >= 60) return { status: "Good", color: "text-blue-300", bg: "bg-blue-500/20" };
    if (progress >= 40) return { status: "Fair", color: "text-orange-300", bg: "bg-orange-500/20" };
    return { status: "Needs Improvement", color: "text-red-300", bg: "bg-red-500/20" };
  };

  const overallStatus = getProgressStatus(overallProgress);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
        <div className="pb-6 pt-6 px-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                <TrendingUp className="h-6 w-6 text-white/80" />
                Progress Overview
              </h3>
              <p className="text-white/70">
                Track your learning milestones and achievements
              </p>
            </div>
            <div className="p-3 rounded-full bg-white/20 border border-white/30">
              <Award className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="px-6 pb-6 space-y-6">
          {goals.map((goal, index) => {
            const IconComponent = goal.icon;
            const progress = Math.min((goal.current / goal.target) * 100, 100);
            const isOnTrack = goal.current >= goal.target * 0.8;
            const status = getProgressStatus(progress);

            return (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${status.bg} border border-white/30`}>
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">{goal.title}</h4>
                      <p className="text-xs text-white/70">{goal.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">
                      {goal.current}/{goal.target}
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${status.bg} ${status.color} border-white/30`}
                    >
                      {status.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/70">Progress</span>
                    <span className={`font-medium ${status.color}`}>
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      className={`h-2.5 rounded-full ${goal.color} relative`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {/* Overall Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            className="pt-6 border-t border-white/20"
          >
            <div className={`rounded-lg p-4 ${overallStatus.bg} border border-white/30`}>
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <Zap className="h-5 w-5 text-white" />
                  <h3 className="font-bold text-lg text-white">Overall Progress</h3>
                </div>
                <div className="text-3xl font-bold text-white">
                  {overallProgress}%
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className={`${overallStatus.bg} ${overallStatus.color} border-white/30`}
                  >
                    {overallStatus.status}
                  </Badge>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-3 rounded-full ${overallStatus.color.replace('text-', 'bg-')} relative`}
                    initial={{ width: 0 }}
                    animate={{ width: `${overallProgress}%` }}
                    transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}; 