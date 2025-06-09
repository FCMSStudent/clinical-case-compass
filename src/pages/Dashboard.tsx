import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import {
  StatCards,
  RecentActivityList,
  SearchPanel,
  QuickStartPanel,
  ProgressChart,
  SpecialtyProgress
} from "@/features/dashboard";
import { UserRound, TrendingUp, Activity, Sparkles, Target, Zap, Plus, BookOpen, Users, Settings } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const { isLoading, getStatistics, getSpecialtyProgress } = useDashboardData();
  const stats = getStatistics();
  const specialtyProgress = getSpecialtyProgress();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const quickActions = [
    {
      title: "New Case",
      description: "Create a clinical case",
      icon: Plus,
      action: "/cases/new",
      color: "from-blue-500/20 to-blue-600/20",
      border: "border-blue-500/30"
    },
    {
      title: "Browse Cases",
      description: "View your case library",
      icon: BookOpen,
      action: "/cases",
      color: "from-green-500/20 to-green-600/20",
      border: "border-green-500/30"
    },
    {
      title: "Study Group",
      description: "Collaborate with peers",
      icon: Users,
      action: "/study",
      color: "from-purple-500/20 to-purple-600/20",
      border: "border-purple-500/30"
    },
    {
      title: "Settings",
      description: "Customize your experience",
      icon: Settings,
      action: "/settings",
      color: "from-orange-500/20 to-orange-600/20",
      border: "border-orange-500/30"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen">
        <div className="w-full max-w-6xl mx-auto space-y-6 p-6">
          {/* Simplified Welcome Banner */}
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 shadow-lg"></div>
                  <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/30 dark:border-slate-700/30 p-6 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-sm border border-blue-200/30 dark:border-blue-600/30">
                          <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
                            Welcome to Clinical Case Compass
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 text-sm">
                            Your medical learning journey starts here
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowWelcome(false)}
                        className="text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Simplified Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center space-y-2"
          >
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
              Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Your clinical learning overview
            </p>
          </motion.div>

          {/* Simplified Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.button
                  key={action.title}
                  onClick={() => navigate(action.action)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 shadow-lg"></div>
                  <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/30 dark:border-slate-700/30 p-6 transition-all duration-300 group-hover:shadow-xl">
                    <div className="text-center space-y-3">
                      <div className="mx-auto w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-600/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 dark:text-white text-sm">
                          {action.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Simplified Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 shadow-lg"></div>
              <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/30 dark:border-slate-700/30 p-6 shadow-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">
                      {stats.totalCases}
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 text-sm">Total Cases</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">
                      {stats.casesWithLearningPoints}
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 text-sm">With Insights</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">
                      {stats.totalResources}
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 text-sm">Resources</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">
                      {stats.thisWeekCases}
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 text-sm">This Week</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Simplified Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 shadow-lg"></div>
              <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/30 dark:border-slate-700/30 p-6 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-600/30">
                      <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Quick Search</h3>
                  </div>
                  <SearchPanel 
                    value=""
                    onChange={() => {}}
                    placeholder="Search cases, symptoms, or learning points..."
                  />
                  <div className="flex flex-wrap gap-2">
                    {["Recent cases", "Cardiology", "Learning points", "Resources"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-600/30 text-slate-700 dark:text-slate-200 text-sm cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Simplified Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="lg:col-span-2"
            >
              <div className="relative h-full">
                <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 shadow-lg"></div>
                <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/30 dark:border-slate-700/30 p-6 h-full shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-600/30">
                      <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Activity</h3>
                  </div>
                  <RecentActivityList />
                </div>
              </div>
            </motion.div>

            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            >
              <div className="relative h-full">
                <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 shadow-lg"></div>
                <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/30 dark:border-slate-700/30 p-6 h-full shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-600/30">
                      <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Progress</h3>
                  </div>
                  <ProgressChart stats={stats} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Specialty Progress (simplified) */}
          {specialtyProgress.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 shadow-lg"></div>
                <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/30 dark:border-slate-700/30 p-6 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-600/30">
                      <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Specialty Focus</h3>
                  </div>
                  <SpecialtyProgress data={specialtyProgress} />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
