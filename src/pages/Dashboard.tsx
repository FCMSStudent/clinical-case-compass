import React from "react";
import { useSupabaseCases } from "@/hooks/use-supabase-cases";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { StatCards } from "@/features/dashboard/components/StatCards";
import { QuickStartPanel } from "@/features/dashboard/components/QuickStartPanel";
import { RecentActivity } from "@/features/dashboard/components/RecentActivity";
import { RecentCasesCarousel } from "@/components/ui/recent-cases-carousel";
import { SearchPanel } from "@/components/SearchPanel";
import { PageHeader } from "@/components/ui/page-header";
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
import { 
  getComponentStyles, 
  card, 
  button, 
  useTheme 
} from "@/lib/design-system";
import { typo, responsiveType } from "@/lib/typography";

// Simplified staggered animations that work well with page transitions
const staggeredContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // Reduced stagger for smoother feel
      delayChildren: 0.1, // Shorter delay
    },
  },
};

const staggeredItem = {
  hidden: {
    opacity: 0,
    y: 10, // Reduced movement
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2, // Faster individual animations
      ease: "easeOut",
    },
  },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentTheme } = useTheme();
  const { isLoading, error, getStatistics } = useDashboardDataFeature();
  const { cases, isLoading: casesLoading } = useSupabaseCases();
  const stats = getStatistics();

  // Get recent cases (last 10 cases)
  const recentCases = cases?.slice(0, 10) || [];

  if (error) {
    return (
      <div className="p-8 text-center">
        <Card className={getComponentStyles('card', 'error', 'lg')}>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-white mb-2">Dashboard Error</h2>
            <p className="text-white/70">There was an error loading the dashboard data.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto space-y-8 lg:space-y-12">
        
        {/* Welcome Header - Apple-inspired generous spacing */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h1 className={cn(typo.h1, responsiveType.h1, "text-white")}>
              Welcome back, {user?.user_metadata?.full_name || 'Doctor'}!
            </h1>
            <p className={cn(typo.body, "text-white/70")}>
              Here's what's happening with your clinical cases today.
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button
              onClick={() => navigate('/cases/new')}
              className={getComponentStyles('button', 'primary', 'md')}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Case
            </Button>
            <Button
              onClick={() => navigate('/cases')}
              variant="outline"
              className={getComponentStyles('button', 'outline', 'md')}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <MetricCardSkeleton key={index} />
            ))
          ) : (
            // Actual metrics
            <>
              <motion.div variants={staggeredItem}>
                <Card className={getComponentStyles('card', 'default', 'md')}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white/70">Total Cases</p>
                        <p className="text-2xl font-bold text-white">
                          {stats.totalCases || 0}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-500/20">
                        <BookOpen className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={staggeredItem}>
                <Card className={getComponentStyles('card', 'default', 'md')}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white/70">Active Cases</p>
                        <p className="text-2xl font-bold text-white">
                          {stats.activeCases || 0}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-green-500/20">
                        <Activity className="h-6 w-6 text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={staggeredItem}>
                <Card className={getComponentStyles('card', 'default', 'md')}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white/70">This Month</p>
                        <p className="text-2xl font-bold text-white">
                          {stats.monthlyCases || 0}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-purple-500/20">
                        <TrendingUp className="h-6 w-6 text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={staggeredItem}>
                <Card className={getComponentStyles('card', 'default', 'md')}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white/70">Patients</p>
                        <p className="text-2xl font-bold text-white">
                          {stats.totalPatients || 0}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-orange-500/20">
                        <Users className="h-6 w-6 text-orange-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Main Content Grid - Apple-inspired spacious layout */}
        <motion.div
          variants={staggeredContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {/* Recent Cases */}
          <motion.div variants={staggeredItem} className="lg:col-span-2">
            <Card className={getComponentStyles('card', 'elevated', 'lg')}>
              <CardHeader>
                <CardTitle className="text-white">Recent Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentCasesCarousel cases={recentCases} isLoading={casesLoading} />
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={staggeredItem}>
            <Card className={getComponentStyles('card', 'elevated', 'lg')}>
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
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
