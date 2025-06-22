
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { UserRound, TrendingUp, Activity, BookOpen, Users, Plus, Eye } from "lucide-react";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { Button } from "@/shared/components/button";
import { Badge } from "@/shared/components/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthContext";
import { motion } from "framer-motion";
import { MetricCardSkeleton } from "@/shared/components/dashboard-skeleton";
import { DynamicRecentActivity } from "@/features/dashboard/components/DynamicRecentActivity";
import { RecentCasesCarousel } from "@/shared/components/recent-cases-carousel";
import { cn } from "@/shared/utils/utils";

// Simplified staggered animations
const staggeredContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const staggeredItem = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading, error } = useDashboardData();

  if (error) {
    return (
      <div className="p-8 text-center">
        <Card className="auth-glass-container">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold text-white mb-2">Dashboard Error</h2>
            <p className="text-white/70">There was an error loading the dashboard data.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-4">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Welcome back, {user?.user_metadata?.full_name || 'Doctor'}!
          </h1>
          <p className="text-base text-white/70">
            Here's what's happening with your clinical cases today.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => navigate('/cases/new')}
            className="w-full py-2 rounded-lg glass-button text-white font-medium hover:scale-102 transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Case
          </Button>
          <Button
            onClick={() => navigate('/cases')}
            variant="outline"
            className="w-full py-2 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 hover:scale-102 transition-all duration-300"
          >
            <Eye className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <motion.div
        variants={staggeredContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <MetricCardSkeleton key={index} />
          ))
        ) : (
          <>
            <motion.div variants={staggeredItem}>
              <Card className="auth-glass-container">
                <CardContent className="pt-4 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">Total Cases</p>
                      <p className="text-2xl font-bold text-white">
                        {data?.totalCases || 0}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <BookOpen className="h-5 w-5 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={staggeredItem}>
              <Card className="auth-glass-container">
                <CardContent className="pt-4 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">Active Cases</p>
                      <p className="text-2xl font-bold text-white">
                        {data?.activeCases || 0}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <Activity className="h-5 w-5 text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={staggeredItem}>
              <Card className="auth-glass-container">
                <CardContent className="pt-4 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">This Month</p>
                      <p className="text-2xl font-bold text-white">
                        {data?.monthlyCases || 0}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <TrendingUp className="h-5 w-5 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={staggeredItem}>
              <Card className="auth-glass-container">
                <CardContent className="pt-4 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/70">Patients</p>
                      <p className="text-2xl font-bold text-white">
                        {data?.totalPatients || 0}
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-orange-500/20">
                      <Users className="h-5 w-5 text-orange-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Main Content Grid */}
      <motion.div
        variants={staggeredContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        {/* Recent Cases */}
        <motion.div variants={staggeredItem} className="lg:col-span-2">
          <Card className="auth-glass-container">
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg font-semibold">Recent Cases</CardTitle>
                <Badge variant="secondary" className="bg-white/10 text-white/80 text-sm">
                  {data?.recentCases?.length || 0} cases
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <RecentCasesCarousel cases={data?.recentCases || []} isLoading={isLoading} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={staggeredItem}>
          <Card className="auth-glass-container">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-white text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2">
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
        <Card className="auth-glass-container">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-white text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                onClick={() => navigate('/cases/new')}
                className="w-full py-2 rounded-lg glass-button text-white font-medium hover:scale-102 transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Case
              </Button>
              <Button
                onClick={() => navigate('/cases')}
                className="w-full py-2 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 hover:scale-102 transition-all duration-300"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Cases
              </Button>
              <Button
                onClick={() => navigate('/account')}
                className="w-full py-2 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 hover:scale-102 transition-all duration-300"
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
