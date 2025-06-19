import React from "react";
import { useSupabaseCases } from "@/hooks/use-supabase-cases";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { RecentCasesCarousel } from "@/components/ui/recent-cases-carousel";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound, TrendingUp, Activity, BookOpen, Users, Target, Plus, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useDashboardData as useDashboardDataFeature } from "@/features/dashboard/hooks/use-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/AuthContext";
import { MetricCardSkeleton } from "@/components/ui/dashboard-skeleton";
import { DynamicRecentActivity } from "@/features/dashboard/components/DynamicRecentActivity";
import { useUnifiedTheme } from "@/lib/unified-theme-system";
import { typo, responsiveType } from "@/lib/typography";

// Optimized animations with reduced motion support
const staggeredContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03, // Reduced stagger for smoother performance
      delayChildren: 0.05, // Minimal delay
    },
  },
};

const staggeredItem = {
  hidden: {
    opacity: 0,
    y: 8, // Minimal movement for better performance
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15, // Fast transitions
      ease: "easeOut",
    },
  },
};

// Optimized metric card component
const MetricCard: React.FC<{
  title: string;
  value: number | string;
  icon: React.ReactNode;
  iconBg: string;
}> = ({ title, value, icon, iconBg }) => (
  <motion.div variants={staggeredItem}>
    <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-200">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/70">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
          <div className={cn("p-3 rounded-lg", iconBg)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentTheme } = useUnifiedTheme();
  const { isLoading, error, getStatistics } = useDashboardDataFeature();
  const { cases, isLoading: casesLoading } = useSupabaseCases();
  const stats = getStatistics();

  // Get recent cases (last 10 cases)
  const recentCases = cases?.slice(0, 10) || [];

  if (error) {
    return (
      <div className="p-8 text-center">
        <Card className="bg-red-500/10 backdrop-blur-md border border-red-400/30">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-white mb-2">Dashboard Error</h2>
            <p className="text-white/70">There was an error loading the dashboard data.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="w-full"
      style={{ 
        padding: `${currentTheme.spacing.xl} ${currentTheme.spacing.md}`,
        maxWidth: '1280px',
        margin: '0 auto'
      }}
    >
      <div className="space-y-8">
        
        {/* Welcome Header - Using 8pt grid spacing */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div style={{ marginBottom: currentTheme.spacing.sm }}>
            <h1 className={cn(typo.h1, responsiveType.h1, "text-white")}>
              Welcome back, {user?.user_metadata?.full_name || 'Doctor'}!
            </h1>
            <p 
              className={cn(typo.body, "text-white/70")}
              style={{ marginTop: currentTheme.spacing.xs }}
            >
              Here's what's happening with your clinical cases today.
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button
              onClick={() => navigate('/cases/new')}
              className="bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white/25 transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Case
            </Button>
            <Button
              onClick={() => navigate('/cases')}
              variant="outline"
              className="bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white/15 transition-all duration-200"
            >
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
        </div>

        {/* Metrics Grid with 8pt-aligned spacing */}
        <motion.div
          variants={staggeredContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ gap: currentTheme.spacing.lg }}
        >
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <MetricCardSkeleton key={index} />
            ))
          ) : (
            // Actual metrics with optimized components
            <>
              <MetricCard
                title="Total Cases"
                value={stats.totalCases || 0}
                icon={<BookOpen className="h-6 w-6 text-blue-400" />}
                iconBg="bg-blue-500/20"
              />
              <MetricCard
                title="Active Cases"
                value={stats.activeCases || 0}
                icon={<Activity className="h-6 w-6 text-green-400" />}
                iconBg="bg-green-500/20"
              />
              <MetricCard
                title="This Month"
                value={stats.monthlyCases || 0}
                icon={<TrendingUp className="h-6 w-6 text-purple-400" />}
                iconBg="bg-purple-500/20"
              />
              <MetricCard
                title="Patients"
                value={stats.totalPatients || 0}
                icon={<Users className="h-6 w-6 text-orange-400" />}
                iconBg="bg-orange-500/20"
              />
            </>
          )}
        </motion.div>

        {/* Main Content Grid - Responsive layout with 8pt spacing */}
        <motion.div
          variants={staggeredContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3"
          style={{ gap: currentTheme.spacing.xl }}
        >
          {/* Recent Cases */}
          <motion.div variants={staggeredItem} className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 h-full">
              <CardHeader style={{ padding: currentTheme.spacing.lg }}>
                <CardTitle className="text-white">Recent Cases</CardTitle>
              </CardHeader>
              <CardContent style={{ padding: `0 ${currentTheme.spacing.lg} ${currentTheme.spacing.lg}` }}>
                <RecentCasesCarousel cases={recentCases} isLoading={casesLoading} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={staggeredItem}>
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 h-full">
              <CardHeader style={{ padding: currentTheme.spacing.lg }}>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent style={{ padding: `0 ${currentTheme.spacing.lg} ${currentTheme.spacing.lg}` }}>
                <DynamicRecentActivity />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
