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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      {/* Medical-themed background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/30 dark:bg-blue-800/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-50/40 dark:bg-blue-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen">
        <div className="w-full max-w-7xl mx-auto space-y-6 p-6">
          {/* Medical Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center space-y-3"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 backdrop-blur-sm border border-blue-200/30 dark:border-blue-600/30">
                <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100">
                Clinical Dashboard
              </h1>
            </div>
            <p className="text-blue-700 dark:text-blue-300 text-lg">
              Medical Learning & Case Management
            </p>
          </motion.div>

          {/* Core Medical Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-blue-200/30 dark:border-blue-700/30 shadow-xl"></div>
              <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl border border-blue-300/40 dark:border-blue-600/40 p-8 shadow-2xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-2">
                      {stats.totalCases}
                    </div>
                    <div className="text-blue-700 dark:text-blue-300 text-sm font-medium">Total Cases</div>
                    <div className="text-blue-500 dark:text-blue-400 text-xs mt-1">Medical Records</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-2">
                      {stats.casesWithLearningPoints}
                    </div>
                    <div className="text-blue-700 dark:text-blue-300 text-sm font-medium">With Insights</div>
                    <div className="text-blue-500 dark:text-blue-400 text-xs mt-1">Learning Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-2">
                      {stats.totalResources}
                    </div>
                    <div className="text-blue-700 dark:text-blue-300 text-sm font-medium">Resources</div>
                    <div className="text-blue-500 dark:text-blue-400 text-xs mt-1">Study Materials</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-2">
                      {stats.thisWeekCases}
                    </div>
                    <div className="text-blue-700 dark:text-blue-300 text-sm font-medium">This Week</div>
                    <div className="text-blue-500 dark:text-blue-400 text-xs mt-1">Recent Activity</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Essential Medical Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              {
                title: "Add Case",
                description: "Record new patient case",
                icon: Plus,
                action: "/cases/new",
                color: "from-blue-500/20 to-blue-600/20",
                border: "border-blue-300/50 dark:border-blue-600/50"
              },
              {
                title: "View Cases",
                description: "Browse all cases",
                icon: BookOpen,
                action: "/cases",
                color: "from-blue-500/20 to-indigo-500/20",
                border: "border-blue-300/50 dark:border-blue-600/50"
              },
              {
                title: "Search",
                description: "Find specific cases",
                icon: Activity,
                action: "/search",
                color: "from-indigo-500/20 to-purple-500/20",
                border: "border-indigo-300/50 dark:border-indigo-600/50"
              },
              {
                title: "Settings",
                description: "Configure preferences",
                icon: Settings,
                action: "/settings",
                color: "from-purple-500/20 to-blue-500/20",
                border: "border-purple-300/50 dark:border-purple-600/50"
              }
            ].map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.button
                  key={action.title}
                  onClick={() => navigate(action.action)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-blue-200/30 dark:border-blue-700/30 shadow-lg"></div>
                  <div className={`relative bg-gradient-to-br ${action.color} backdrop-blur-md rounded-2xl border ${action.border} p-6 transition-all duration-300 group-hover:shadow-xl`}>
                    <div className="text-center space-y-4">
                      <div className="mx-auto w-14 h-14 rounded-2xl bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border border-white/50 dark:border-slate-600/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-7 w-7 text-blue-700 dark:text-blue-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-base">
                          {action.title}
                        </h3>
                        <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Medical Search Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-blue-200/30 dark:border-blue-700/30 shadow-xl"></div>
              <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl border border-blue-300/40 dark:border-blue-600/40 p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-blue-500/10 backdrop-blur-sm border border-blue-200/30 dark:border-blue-600/30">
                      <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100">Clinical Search</h3>
                  </div>
                  <SearchPanel 
                    value=""
                    onChange={() => {}}
                    placeholder="Search cases, symptoms, diagnoses, or learning points..."
                  />
                  <div className="flex flex-wrap gap-3">
                    {["Recent cases", "Cardiology", "Neurology", "Emergency", "Learning points", "Resources"].map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-600/50 text-blue-700 dark:text-blue-200 text-sm font-medium cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Medical Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Medical Activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="lg:col-span-2"
            >
              <div className="relative h-full">
                <div className="absolute inset-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-blue-200/30 dark:border-blue-700/30 shadow-xl"></div>
                <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl border border-blue-300/40 dark:border-blue-600/40 p-8 h-full shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-blue-500/10 backdrop-blur-sm border border-blue-200/30 dark:border-blue-600/30">
                      <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100">Recent Clinical Activity</h3>
                  </div>
                  <RecentActivityList />
                </div>
              </div>
            </motion.div>

            {/* Medical Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            >
              <div className="relative h-full">
                <div className="absolute inset-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-blue-200/30 dark:border-blue-700/30 shadow-xl"></div>
                <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl border border-blue-300/40 dark:border-blue-600/40 p-8 h-full shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-blue-500/10 backdrop-blur-sm border border-blue-200/30 dark:border-blue-600/30">
                      <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100">Learning Progress</h3>
                  </div>
                  <ProgressChart stats={stats} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Medical Specialty Focus */}
          {specialtyProgress.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-blue-200/30 dark:border-blue-700/30 shadow-xl"></div>
                <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl border border-blue-300/40 dark:border-blue-600/40 p-8 shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-2xl bg-blue-500/10 backdrop-blur-sm border border-blue-200/30 dark:border-blue-600/30">
                      <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100">Specialty Focus Areas</h3>
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
