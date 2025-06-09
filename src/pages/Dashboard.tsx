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
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useParallaxScroll } from "@/lib/motion";
import { useGestureDetection } from "@/lib/interactions";
import { useDeepMemo } from "@/lib/performance";
import { useAccessibility } from "@/lib/accessibility";
import { usePerformanceMonitor } from "@/lib/performance";
import { AccessibleMotion } from "@/lib/motion";
import { useTheme } from "@/lib/themes";

const Dashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const { isLoading, getStatistics, getSpecialtyProgress } = useDashboardData();
  const stats = getStatistics();
  const specialtyProgress = getSpecialtyProgress();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Performance monitoring
  usePerformanceMonitor("Dashboard");

  // Accessibility features
  const accessibility = useAccessibility({
    enableVoiceControl: true,
    enableKeyboardNavigation: true,
    enableFocusIndicators: true,
  });

  // Theme management
  const { currentTheme } = useTheme();

  // Parallax scroll effect
  const { scrollYProgress } = useParallaxScroll(0.3);

  // Gesture detection for interactive elements
  const handleGesture = (event: any) => {
    if (event.type === "swipe") {
      if (event.direction === "left") {
        navigate("/cases");
      } else if (event.direction === "right") {
        navigate("/settings");
      }
    }
  };

  useGestureDetection(handleGesture, {
    threshold: 50,
    direction: "any"
  });

  // Memoized data for performance
  const memoizedStats = useDeepMemo(() => stats, [stats]);
  const memoizedSpecialtyProgress = useDeepMemo(() => specialtyProgress, [specialtyProgress]);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Register dashboard-specific voice commands
  useEffect(() => {
    accessibility.registerVoiceCommand({
      command: "show statistics",
      action: () => {
        const statsElement = document.querySelector('[data-testid="dashboard-stats"]');
        statsElement?.scrollIntoView({ behavior: 'smooth' });
      },
      description: "Scroll to statistics section",
      category: "navigation"
    });

    accessibility.registerVoiceCommand({
      command: "show recent activity",
      action: () => {
        const activityElement = document.querySelector('[data-testid="recent-activity"]');
        activityElement?.scrollIntoView({ behavior: 'smooth' });
      },
      description: "Scroll to recent activity section",
      category: "navigation"
    });
  }, [accessibility]);

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
    <AccessibleMotion
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full space-y-6"
      ref={containerRef}
    >
      {/* Glassy Medical Header with Parallax */}
      <motion.div
        style={{ y: scrollYProgress.get() * -50 }}
        className="text-center space-y-3"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div 
            className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Activity className="h-8 w-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white">
            Clinical Dashboard
          </h1>
        </div>
        <p className="text-white/80 text-lg">
          Medical Learning & Case Management
        </p>
      </motion.div>

      {/* Glassy Medical Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        data-testid="dashboard-stats"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10"></div>
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: memoizedStats.totalCases, label: "Total Cases", subtitle: "Medical Records" },
                { value: memoizedStats.casesWithLearningPoints, label: "With Insights", subtitle: "Learning Points" },
                { value: memoizedStats.totalResources, label: "Resources", subtitle: "Study Materials" },
                { value: memoizedStats.thisWeekCases, label: "This Week", subtitle: "Recent Activity" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                  <div className="text-white/60 text-xs mt-1">{stat.subtitle}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Glassy Medical Actions */}
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
            action: "/cases/new"
          },
          {
            title: "View Cases",
            description: "Browse all cases",
            icon: BookOpen,
            action: "/cases"
          },
          {
            title: "Search",
            description: "Find specific cases",
            icon: Activity,
            action: "/search"
          },
          {
            title: "Settings",
            description: "Configure preferences",
            icon: Settings,
            action: "/settings"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 transition-all duration-300 group-hover:bg-white/15 group-hover:shadow-xl">
                <div className="text-center space-y-4">
                  <motion.div 
                    className="mx-auto w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <IconComponent className="h-7 w-7 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-white text-base">
                      {action.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Glassy Medical Search Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10"></div>
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                  whileHover={{ scale: 1.1 }}
                >
                  <Activity className="h-6 w-6 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white">Clinical Search</h3>
              </div>
              <SearchPanel 
                value=""
                onChange={() => {}}
                placeholder="Search cases, symptoms, diagnoses, or learning points..."
              />
              <div className="flex flex-wrap gap-3">
                {["Recent cases", "Cardiology", "Neurology", "Emergency", "Learning points", "Resources"].map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium cursor-pointer hover:bg-white/20 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Glassy Medical Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Glassy Recent Medical Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="lg:col-span-2"
          data-testid="recent-activity"
        >
          <div className="relative h-full">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10"></div>
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                  whileHover={{ scale: 1.1 }}
                >
                  <Activity className="h-6 w-6 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white">Recent Clinical Activity</h3>
              </div>
              <RecentActivityList />
            </div>
          </div>
        </motion.div>

        {/* Glassy Medical Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        >
          <div className="relative h-full">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10"></div>
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 h-full">
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                  whileHover={{ scale: 1.1 }}
                >
                  <TrendingUp className="h-6 w-6 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white">Learning Progress</h3>
              </div>
              <ProgressChart stats={memoizedStats} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Glassy Medical Specialty Focus */}
      {memoizedSpecialtyProgress.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10"></div>
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                  whileHover={{ scale: 1.1 }}
                >
                  <Target className="h-6 w-6 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white">Specialty Focus Areas</h3>
              </div>
              <SpecialtyProgress data={memoizedSpecialtyProgress} />
            </div>
          </div>
        </motion.div>
      )}
    </AccessibleMotion>
  );
};

export default Dashboard;
