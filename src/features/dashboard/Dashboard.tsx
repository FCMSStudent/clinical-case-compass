
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { UserRound, TrendingUp, Activity, BookOpen, Users, Plus, Eye, Filter } from "lucide-react"; // Added Filter
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
    <>
      {/* New Glass Header for Dashboard Title and Filters */}
      <header className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-[16px] p-6 sticky top-0 z-10 flex items-center justify-between mb-6">
        {/* mb-6 added to create space before next element, adjust as needed */}
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
        <button
          aria-label="Open filters"
          className="p-2 text-white/70 hover:text-white transition-colors focus:ring-2 focus:ring-blue-300 rounded-md"
        >
          <Filter className="h-6 w-6" />
        </button>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6"> {/* Increased space-y to 6 to match gap-6 */}
        {/* Original Welcome Header - now potentially redundant or needing adjustment */}
        {/* Consider removing or simplifying this if the new header covers its purpose */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1"> {/* Changed to h2 for semantics if Dashboard is h1 */}
              Welcome back, {user?.user_metadata?.full_name || 'Doctor'}!
            </h2>
            <p className="text-base text-white/70">
              Here's what's happening with your clinical cases today.
            </p>
          </div>

          <div className="flex gap-2">
          {/* Buttons here will be styled later if they are not the primary FAB */}
          <Button
            onClick={() => navigate('/cases/new')}
            className="w-full py-2 rounded-lg glass-button text-white font-medium hover:scale-102 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Case
          </Button>
          <Button
            onClick={() => navigate('/cases')}
            variant="outline"
            className="w-full py-2 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 hover:scale-102 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <Eye className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
      </div>

      {/* Segmented Time Filter Control */}
      <div className="my-6 flex justify-center" role="toolbar" aria-label="Time period filter">
        <div className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-[16px] inline-flex overflow-hidden">
          <button aria-pressed="true" className="flex-1 p-3 text-base text-white bg-white/30 hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300">Day</button>
          <button aria-pressed="false" className="flex-1 p-3 text-base text-white/70 hover:text-white hover:bg-white/25 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300">Week</button>
          <button aria-pressed="false" className="flex-1 p-3 text-base text-white/70 hover:text-white hover:bg-white/25 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300">Month</button>
        </div>
      </div>

      {/* Metrics Grid - Applying glass-panel to each item, and p-6 to container */}
      <motion.div
        variants={staggeredContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6"
        role="list" // Changed from grid to list for semantics with listitem roles below
        aria-label="Summary metrics"
      >
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <MetricCardSkeleton key={index} />
          ))
        ) : (
          <>
            <motion.div variants={staggeredItem} className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-[16px] p-6 text-center hover:shadow-xl transition" role="listitem" aria-label="Total cases metric">
              <div className="text-base font-medium text-white">Total Cases</div>
              <div className="text-2xl font-bold text-white mt-1">
                {data?.totalCases || 0}
              </div>
            </motion.div>

            <motion.div variants={staggeredItem} className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-[16px] p-6 text-center hover:shadow-xl transition" role="listitem" aria-label="Active cases metric">
              <div className="text-base font-medium text-white">Active Cases</div>
              <div className="text-2xl font-bold text-white mt-1">
                {data?.activeCases || 0}
              </div>
            </motion.div>

            <motion.div variants={staggeredItem} className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-[16px] p-6 text-center hover:shadow-xl transition" role="listitem" aria-label="Cases this month metric">
              <div className="text-base font-medium text-white">This Month</div>
              <div className="text-2xl font-bold text-white mt-1">
                {data?.monthlyCases || 0}
              </div>
            </motion.div>

            <motion.div variants={staggeredItem} className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-[16px] p-6 text-center hover:shadow-xl transition" role="listitem" aria-label="Total patients metric">
              <div className="text-base font-medium text-white">Patients</div>
              <div className="text-2xl font-bold text-white mt-1">
                {data?.totalPatients || 0}
              </div>
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Main Content Grid - Applying glass-panel to items */}
      <motion.div
        variants={staggeredContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Recent Cases */}
        <motion.div variants={staggeredItem} className="lg:col-span-2 bg-white/20 backdrop-blur-lg border border-white/20 rounded-[16px] p-6 hover:shadow-xl transition" role="region" aria-labelledby="recentCasesTitle">
          <div className="flex items-center justify-between mb-4">
            <h3 id="recentCasesTitle" className="text-xl font-semibold text-white">Recent Cases</h3>
            <Badge variant="secondary" className="bg-white/10 text-white/80 text-sm">
              {data?.recentCases?.length || 0} cases
            </Badge>
          </div>
          <RecentCasesCarousel cases={data?.recentCases || []} isLoading={isLoading} />
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={staggeredItem} className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-[16px] p-6 hover:shadow-xl transition">
          <h3 id="recentActivityTitle" className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
          <DynamicRecentActivity />
        </motion.div>
      </motion.div>

      {/* Quick Actions - Applying glass-panel */}
      <motion.div
        variants={staggeredItem}
        initial="hidden"
        animate="visible"
        className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-[16px] p-6 hover:shadow-xl transition"
        role="region"
        aria-labelledby="quickActionsTitle"
      >
        <h3 id="quickActionsTitle" className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            onClick={() => navigate('/cases/new')}
            className="w-full py-2 rounded-lg glass-button text-white font-medium hover:scale-102 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
            // Ensure this button gets correct glass styling if it's not the FAB. 'glass-button' is an existing class.
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Case
          </Button>
          <Button
            onClick={() => navigate('/cases')}
            className="w-full py-2 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 hover:scale-102 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Browse Cases
          </Button>
          <Button
            onClick={() => navigate('/account')}
            className="w-full py-2 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 hover:scale-102 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <UserRound className="h-4 w-4 mr-2" />
            Profile Settings
          </Button>
        </div>
      </motion.div>
      <FloatingNewCaseButton onClick={() => navigate('/cases/new')} />
      </div>
    </>
  );
};

export default Dashboard;

// Helper component for the FAB - or could be inline in Dashboard
const FloatingNewCaseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      aria-label="New Case"
      className="fixed bottom-6 right-6 bg-white/20 backdrop-blur-lg border border-white/20 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-105 focus:ring-2 focus:ring-blue-300 focus:outline-none transition"
    >
      <Plus className="h-7 w-7" /> {/* Adjusted size for better fit in 56x56 (w-14, h-14) button */}
    </button>
  );
};
