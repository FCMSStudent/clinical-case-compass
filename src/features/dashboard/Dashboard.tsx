import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { UserRound, TrendingUp, Activity, BookOpen, Users, Plus, Eye, Filter } from "lucide-react";
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

// Enhanced animation variants for auth-style smoothness
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading, error } = useDashboardData();

  if (error) {
    return (
      <div className="min-h-screen auth-gradient-bg">
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            className="w-full max-w-md mx-auto"
          >
            <div className="auth-glass-container">
              <Card className="border-0 bg-transparent shadow-none">
                <CardContent className="p-6 text-center">
                  <h2 className="auth-title text-white mb-2">Dashboard Error</h2>
                  <p className="auth-subtitle text-white/70">There was an error loading the dashboard data.</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen auth-gradient-bg">
      <div className="relative z-10 min-h-screen p-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-6"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="auth-glass-container max-w-2xl mx-auto">
              <div className="p-8">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  <h1 className="auth-title text-white mb-2">
                    Welcome back, {user?.user_metadata?.full_name || 'Doctor'}!
                  </h1>
                  <p className="auth-subtitle text-white/90">
                    Here's what's happening with your clinical cases today.
                  </p>
                </motion.div>
                
                {/* Quick Action Buttons */}
                <motion.div 
                  className="flex gap-3 justify-center mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Button
                    onClick={() => navigate('/cases/new')}
                    className="glass-button text-white font-medium px-6 py-3"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Case
                  </Button>
                  <Button
                    onClick={() => navigate('/cases')}
                    variant="outline"
                    className="glass-button text-white font-medium px-6 py-3"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <div className="auth-glass-container">
                    <MetricCardSkeleton />
                  </div>
                </motion.div>
              ))
            ) : (
              <>
                <motion.div variants={itemVariants}>
                  <div className="auth-glass-container">
                    <div className="p-6 text-center">
                      <div className="text-sm font-medium text-white/80 mb-2">Total Cases</div>
                      <div className="auth-title text-white">
                        {data?.totalCases || 0}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="auth-glass-container">
                    <div className="p-6 text-center">
                      <div className="text-sm font-medium text-white/80 mb-2">Active Cases</div>
                      <div className="auth-title text-white">
                        {data?.activeCases || 0}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="auth-glass-container">
                    <div className="p-6 text-center">
                      <div className="text-sm font-medium text-white/80 mb-2">This Month</div>
                      <div className="auth-title text-white">
                        {data?.monthlyCases || 0}
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="auth-glass-container">
                    <div className="p-6 text-center">
                      <div className="text-sm font-medium text-white/80 mb-2">Patients</div>
                      <div className="auth-title text-white">
                        {data?.totalPatients || 0}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Recent Cases */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="auth-glass-container">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="auth-title text-white">Recent Cases</h3>
                    <Badge variant="secondary" className="bg-white/10 text-white/80 border-white/20">
                      {data?.recentCases?.length || 0} cases
                    </Badge>
                  </div>
                  <RecentCasesCarousel cases={data?.recentCases || []} isLoading={isLoading} />
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
              <div className="auth-glass-container">
                <div className="p-6">
                  <h3 className="auth-title text-white mb-6">Recent Activity</h3>
                  <DynamicRecentActivity />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Actions Grid */}
          <motion.div variants={itemVariants}>
            <div className="auth-glass-container">
              <div className="p-6">
                <h3 className="auth-title text-white mb-6 text-center">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => navigate('/cases/new')}
                    className="glass-button text-white font-medium py-4 h-auto flex-col space-y-2"
                  >
                    <Plus className="h-6 w-6" />
                    <span>Create New Case</span>
                  </Button>
                  <Button
                    onClick={() => navigate('/cases')}
                    className="glass-button text-white font-medium py-4 h-auto flex-col space-y-2"
                  >
                    <BookOpen className="h-6 w-6" />
                    <span>Browse Cases</span>
                  </Button>
                  <Button
                    onClick={() => navigate('/account')}
                    className="glass-button text-white font-medium py-4 h-auto flex-col space-y-2"
                  >
                    <UserRound className="h-6 w-6" />
                    <span>Profile Settings</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Action Button */}
        <FloatingNewCaseButton onClick={() => navigate('/cases/new')} />
      </div>
    </div>
  );
};

export default Dashboard;

// Enhanced Floating Action Button with auth styling
const FloatingNewCaseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      onClick={onClick}
      aria-label="New Case"
      className="fixed bottom-6 right-6 w-16 h-16 glass-button text-white shadow-2xl flex items-center justify-center z-50"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.5, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <Plus className="h-8 w-8" />
    </motion.button>
  );
};
