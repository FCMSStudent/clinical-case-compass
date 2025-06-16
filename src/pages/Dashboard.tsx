import { Card, CardContent } from "@/components/ui/card";
import { UserRound, TrendingUp, Activity, BookOpen, Users, Target, Plus, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { MetricCardSkeleton } from "@/components/ui/dashboard-skeleton";
import { DynamicRecentActivity } from "@/features/dashboard/components/DynamicRecentActivity";
import { RecentCasesCarousel } from "@/components/ui/recent-cases-carousel";
import { animations } from "@/lib/styles/animations";
import { getComponentStyles } from "@/lib/styles/utils";
import { card, button } from "@/lib/styles/components";
import { useTheme } from "@/lib/styles/theme";
import { typo, responsiveType } from "@/lib/typography";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const { isLoading, getStatistics, getRecentCases } = useDashboardData();
  const baseStats = getStatistics();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentTheme } = useTheme();
  const recentCases = getRecentCases(6);

  // Enhanced stats with completion rate calculation
  const stats = {
    ...baseStats,
    activeCases: Math.floor(baseStats.totalCases * 0.6),
    completionRate: baseStats.totalCases > 0 ? Math.floor((baseStats.casesWithLearningPoints / baseStats.totalCases) * 100) : 0
  };

  const getUserDisplayName = () => {
    return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  };

  // Metric card component with animations
  const MetricCard = ({ title, value, icon, description, progress, trend, onClick }: {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    description: string;
    progress?: number;
    trend?: { value: number; isPositive: boolean };
    onClick?: () => void;
  }) => (
    <motion.div
      variants={animations.staggeredItem}
      whileHover={{ scale: 1.02, y: -2 }}
      className="group"
    >
      <Card 
        className={`${card.base} ${card.variant.interactive} ${card.padding.lg} ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className={cn(typo.labelSmall, "text-white/70")}>{title}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className={cn(typo.vital, "text-white")}>{value}</p>
                {trend && (
                  <div className="flex items-center gap-1">
                    <TrendingUp 
                      className={`h-4 w-4 ${trend.isPositive ? 'text-green-400' : 'text-red-400 rotate-180'}`}
                    />
                    <span className={cn(typo.labelSmall, trend.isPositive ? 'text-green-400' : 'text-red-400')}>
                      {trend.value}%
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
              {icon}
            </div>
          </div>
          
          {progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className={cn(typo.caption, "text-white/70")}>Progress</span>
                <span className={cn(typo.caption, "font-medium text-white")}>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <motion.div
                  className="bg-blue-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          )}
          
          <p className={cn(typo.bodySmall, "text-white/70 mt-2")}>{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <main role="main" aria-labelledby="dashboard-title" className="w-full space-y-6">
      {/* Skip Navigation */}
      <nav aria-label="Dashboard navigation" className="sr-only">
        <a 
          href="#metrics" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          Skip to metrics
        </a>
        <a 
          href="#actions" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-32 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          Skip to actions
        </a>
      </nav>

      {/* Loading state */}
      {isLoading && (
        <div role="status" aria-live="polite" className="sr-only">
          Loading dashboard data...
        </div>
      )}

      {/* Personalized Greeting */}
      <motion.div 
        variants={animations.fadeIn}
        initial="hidden"
        animate="visible"
        className="text-left space-y-1"
      >
        <h1 className={cn(responsiveType.h1, "text-white")}>
          Hello, {getUserDisplayName()}
        </h1>
        <p className={cn(typo.bodySmall, "text-white/70")}>
          Welcome back to your medical learning dashboard
        </p>
      </motion.div>

      {/* Medical Metrics - Now 3 cards in responsive grid */}
      <section id="metrics" aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" className="sr-only">Key Metrics</h2>
        <AnimatePresence>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(3)].map((_, i) => (
                <MetricCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
              variants={animations.staggeredContainer}
              initial="hidden"
              animate="visible"
            >
              <MetricCard
                title="Total Cases"
                value={stats.totalCases}
                icon={<BookOpen className="h-6 w-6 text-blue-400" />}
                description="All documented cases"
                progress={Math.min((stats.totalCases / 20) * 100, 100)}
                onClick={() => navigate("/cases")}
              />
              
              <MetricCard
                title="Active Cases"
                value={stats.activeCases}
                icon={<Activity className="h-6 w-6 text-green-400" />}
                description="Cases in progress"
                trend={{ 
                  value: stats.thisWeekCases || 0, 
                  isPositive: (stats.thisWeekCases || 0) > 0 
                }}
                onClick={() => navigate("/cases")}
              />
              
              <MetricCard
                title="Completion Rate"
                value={`${stats.completionRate}%`}
                icon={<Target className="h-6 w-6 text-purple-400" />}
                description="Cases with learning points"
                progress={stats.completionRate}
                trend={{ 
                  value: stats.completionRate, 
                  isPositive: stats.completionRate > 50 
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Recent Cases Carousel */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <RecentCasesCarousel cases={recentCases} isLoading={isLoading} />
      </motion.section>

      {/* Quick Actions and Recent Activity */}
      <section id="actions" aria-labelledby="actions-heading">
        <h2 id="actions-heading" className="sr-only">Quick Actions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={cn(typo.h3, "text-white")}>Quick Actions</h3>
                  <Target className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate("/cases/new")}
                    className={`w-full ${getComponentStyles('button', 'primary', 'md')} group`}
                  >
                    <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
                    Create New Case
                  </Button>
                  
                  <Button 
                    onClick={() => navigate("/cases")}
                    variant="outline"
                    className={`w-full ${getComponentStyles('button', 'outline', 'md')}`}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    View All Cases
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dynamic Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <DynamicRecentActivity />
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
