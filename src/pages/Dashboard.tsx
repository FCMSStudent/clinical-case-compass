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
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Enhanced utilities
import { useParallaxScroll } from "@/lib/motion";
import { useGestureDetection } from "@/lib/interactions";
import { useDeepMemo } from "@/lib/performance";
import { useAccessibility } from "@/lib/accessibility";
import { usePerformanceMonitor } from "@/lib/performance";
import { AccessibleMotion } from "@/lib/motion";
import { useTheme } from "@/app/ThemeContext";
import { useLazyLoad } from "@/lib/performance";
import { useMotionResponsiveHover } from "@/lib/motion";
import { useSpatialAudioCues } from "@/lib/interactions";
import { useEyeTracking } from "@/lib/accessibility";

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
    enableEyeTracking: true,
  });

  // Theme management
  const { currentTheme } = useTheme();

  // Parallax scroll effect
  const { scrollYProgress } = useParallaxScroll(0.3);

  // Spatial audio cues
  const { playNavigationCue, playSuccessCue } = useSpatialAudioCues();

  // Eye tracking for focus detection
  const { focusedElement, isFocused } = useEyeTracking({
    dwellTime: 800,
    enableFocusIndicators: true,
  });

  // Lazy loading for performance
  const { elementRef: lazyLoadRef, isVisible } = useLazyLoad({
    threshold: 0.1,
    rootMargin: "50px"
  });

  // Gesture detection for interactive elements
  const handleGesture = useCallback((event: any) => {
    if (event.type === "swipe") {
      if (event.direction === "left") {
        playNavigationCue("right");
        navigate("/cases");
      } else if (event.direction === "right") {
        playNavigationCue("left");
        navigate("/settings");
      }
    } else if (event.type === "doubleTap") {
      playSuccessCue();
      // Quick action on double tap
      navigate("/cases/new");
    }
  }, [navigate, playNavigationCue, playSuccessCue]);

  useGestureDetection(handleGesture, {
    threshold: 50,
    direction: "any"
  });

  // Memoized data for performance
  const memoizedStats = useDeepMemo(() => stats, [stats]);
  const memoizedSpecialtyProgress = useDeepMemo(() => specialtyProgress, [specialtyProgress]);

  // Motion responsive hover effects
  const { scale, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useMotionResponsiveHover();

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  // Register voice commands
  useEffect(() => {
    accessibility.registerVoiceCommand({
      command: "create new case",
      action: () => {
        playSuccessCue();
        navigate("/cases/new");
      },
      description: "Create a new clinical case",
      category: "interaction"
    });

    accessibility.registerVoiceCommand({
      command: "view all cases",
      action: () => {
        playNavigationCue("right");
        navigate("/cases");
      },
      description: "Navigate to cases page",
      category: "navigation"
    });

    accessibility.registerVoiceCommand({
      command: "open settings",
      action: () => {
        playNavigationCue("left");
        navigate("/settings");
      },
      description: "Navigate to settings",
      category: "navigation"
    });
  }, [accessibility, navigate, playSuccessCue, playNavigationCue]);

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
            style={{ scale, rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
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

      {/* Welcome Alert with Motion */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Alert className="border-blue-200 bg-blue-50/50 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <AlertDescription>
                Welcome back! Your clinical cases are ready for review.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glassy Medical Metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.02, y: -2 }}
          ref={lazyLoadRef}
        >
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/70">Total Cases</p>
                  <p className="text-2xl font-bold text-white">
                    {memoizedStats.totalCases}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-500/20">
                  <BookOpen className="h-6 w-6 text-blue-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.02, y: -2 }}
          ref={lazyLoadRef}
        >
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/70">This Week</p>
                  <p className="text-2xl font-bold text-white">
                    {memoizedStats.thisWeekCases}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-500/20">
                  <TrendingUp className="h-6 w-6 text-green-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.02, y: -2 }}
          ref={lazyLoadRef}
        >
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/70">Resources</p>
                  <p className="text-2xl font-bold text-white">
                    {memoizedStats.totalResources}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-500/20">
                  <Target className="h-6 w-6 text-purple-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.02, y: -2 }}
          ref={lazyLoadRef}
        >
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/70">Learning Points</p>
                  <p className="text-2xl font-bold text-white">
                    {memoizedStats.casesWithLearningPoints}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-orange-500/20">
                  <Zap className="h-6 w-6 text-orange-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Interactive Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Start Panel */}
        <motion.div
          className="lg:col-span-1"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          ref={lazyLoadRef}
        >
          <QuickStartPanel />
        </motion.div>

        {/* Progress Chart */}
        <motion.div
          className="lg:col-span-2"
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          ref={lazyLoadRef}
        >
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Progress Overview</h3>
              <ProgressChart stats={memoizedStats} />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Specialty Progress */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
        ref={lazyLoadRef}
      >
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Specialty Progress</h3>
            <SpecialtyProgress data={memoizedSpecialtyProgress} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
        ref={lazyLoadRef}
      >
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
            <RecentActivityList />
          </CardContent>
        </Card>
      </motion.div>
    </AccessibleMotion>
  );
};

export default Dashboard;
