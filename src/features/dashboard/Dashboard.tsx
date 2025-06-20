import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound, TrendingUp, Activity, BookOpen, Users, Target, Plus, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/AuthContext";
import { motion } from "framer-motion";
import { MetricCardSkeleton } from "@/components/ui/dashboard-skeleton";
import { DynamicRecentActivity } from "@/features/dashboard/components/DynamicRecentActivity";
import { RecentCasesCarousel } from "@/components/ui/recent-cases-carousel";
import { 
  getComponentStyles, 
  card, 
  button, 
  useTheme 
} from "@/lib/design-system";
import { typo, responsiveType } from "@/lib/typography";
import { cn } from "@/lib/utils";

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
  const { data, isLoading, error } = useDashboardData();

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
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Header - no individual animation, relies on page transition */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className={cn(typo.h1, responsiveType.h1, "text-white mb-2")}>
            Welcome back, {user?.user_metadata?.full_name || 'Doctor'}!
          </h1>
          <p className={cn(typo.body, "text-white/70")}>
            Here's what's happening with your clinical cases today.
          </p>
        </div>
        
        <div className="flex gap-3">
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

      {/* Metrics Grid with subtle staggered animation */}
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
                        {data?.totalCases || 0}
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
                        {data?.activeCases || 0}
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
                        {data?.monthlyCases || 0}
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
                        {data?.totalPatients || 0}
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

      {/* Main Content Grid - simplified animations */}
      <motion.div
        variants={staggeredContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Recent Cases */}
        <motion.div variants={staggeredItem} className="lg:col-span-2">
          <Card className={getComponentStyles('card', 'elevated', 'lg')}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Recent Cases</CardTitle>
                <Badge variant="secondary" className="bg-white/10 text-white/80">
                  {data?.recentCases?.length || 0} cases
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <RecentCasesCarousel cases={data?.recentCases || []} isLoading={isLoading} />
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

      {/* Quick Actions */}
      <motion.div
        variants={staggeredItem}
        initial="hidden"
        animate="visible"
      >
        <Card className={getComponentStyles('card', 'interactive', 'lg')}>
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => navigate('/cases/new')}
                className={getComponentStyles('button', 'primary', 'md')}
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Case
              </Button>
              <Button
                onClick={() => navigate('/cases')}
                className={getComponentStyles('button', 'secondary', 'md')}
                variant="outline"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Cases
              </Button>
              <Button
                onClick={() => navigate('/account')}
                className={getComponentStyles('button', 'ghost', 'md')}
                variant="outline"
              >
                <UserRound className="h-4 w-4 mr-2" />
                Profile Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
