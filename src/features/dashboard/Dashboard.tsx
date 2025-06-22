import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { UserRound, TrendingUp, Activity, BookOpen, Users, Plus, Eye, Filter, Search, User, Calendar, Sparkles } from "lucide-react";
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
    <div className="min-h-screen p-4 space-y-6">
      {/* Header with Welcome Message and Search/Filter Controls */}
      <header className="glass-panel sticky top-0 z-10 flex items-center justify-between w-full max-w-4xl mx-auto">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white mb-1">
            Welcome back, {user?.user_metadata?.full_name || 'Doctor'}!
          </h1>
          <p className="text-base text-white/70">
            Here's what's happening with your clinical cases today.
          </p>
        </div>
        
        <div className="flex items-center space-x-3 ml-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
            <input
              type="text"
              placeholder="Search cases..."
              className="glass-inner flex-1 ml-0 pl-12 pr-4 py-2 text-base placeholder:text-white/70 text-white border-0 focus:ring-2 focus:ring-white/30"
            />
          </div>
          <button
            aria-label="Open filters"
            className="glass-inner p-2 text-white/70 hover:text-white transition-colors focus:ring-2 focus:ring-white/30"
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 max-w-4xl mx-auto">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="glass-panel">
              <MetricCardSkeleton />
            </div>
          ))
        ) : (
          <>
            <motion.div variants={staggeredItem} className="glass-panel text-center">
              <div className="text-base font-medium text-white">Total Cases</div>
              <div className="text-2xl font-bold text-white mt-1">
                {data?.totalCases || 0}
              </div>
            </motion.div>

            <motion.div variants={staggeredItem} className="glass-panel text-center">
              <div className="text-base font-medium text-white">Active Cases</div>
              <div className="text-2xl font-bold text-white mt-1">
                {data?.activeCases || 0}
              </div>
            </motion.div>

            <motion.div variants={staggeredItem} className="glass-panel text-center">
              <div className="text-base font-medium text-white">This Month</div>
              <div className="text-2xl font-bold text-white mt-1">
                {data?.monthlyCases || 0}
              </div>
            </motion.div>

            <motion.div variants={staggeredItem} className="glass-panel text-center">
              <div className="text-base font-medium text-white">Patients</div>
              <div className="text-2xl font-bold text-white mt-1">
                {data?.totalPatients || 0}
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Main Content Grid */}
      <motion.div
        variants={staggeredContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {/* Recent Cases List */}
        <motion.div variants={staggeredItem} className="lg:col-span-2 glass-panel">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Recent Cases</h3>
            <Badge variant="secondary" className="bg-white/10 text-white/80 border-white/20">
              {data?.recentCases?.length || 0} cases
            </Badge>
          </div>
          
          <ul className="space-y-4">
            {data?.recentCases?.slice(0, 5).map((caseItem, index) => (
              <li 
                key={caseItem.id} 
                className="flex items-center justify-between glass-panel hover:shadow-xl transition p-4 rounded-[16px] cursor-pointer"
                onClick={() => navigate(`/cases/${caseItem.id}`)}
              >
                <div className="flex items-center space-x-3">
                  <div className="glass-inner rounded-full p-2 mr-3">
                    <Sparkles className="h-5 w-5 text-white/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-base truncate">
                      {caseItem.title || "Untitled Case"}
                    </div>
                    <div className="text-sm text-white/70 truncate">
                      {caseItem.patient ? 
                        `${caseItem.patient.name}, ${caseItem.patient.age} y/o ${caseItem.patient.gender}` : 
                        "Patient N/A"
                      }
                      {caseItem.chiefComplaint && 
                        ` • ${caseItem.chiefComplaint.substring(0, 30)}${caseItem.chiefComplaint.length > 30 ? "..." : ""}`
                      }
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-400/80"></span>
                  <Eye className="h-4 w-4 text-white/50" />
                </div>
              </li>
            ))}
          </ul>
          
          {(!data?.recentCases || data.recentCases.length === 0) && (
            <div className="text-center py-8">
              <p className="text-white/70">No recent cases found.</p>
              <Button
                onClick={() => navigate('/cases/new')}
                className="glass-button text-white font-medium mt-4"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Case
              </Button>
            </div>
          )}
        </motion.div>

        {/* Recent Activity Timeline */}
        <motion.div variants={staggeredItem} className="glass-panel">
          <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
          
          <div className="space-y-4">
            {/* Timeline Entry 1 */}
            <div className="glass-panel mb-4 p-4 rounded-[16px]">
              <div className="flex items-start space-x-3">
                <div className="glass-inner rounded-full p-2">
                  <User className="h-4 w-4 text-white/70" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">Case updated</p>
                  <p className="text-white/70 text-xs">Hypertension case reviewed</p>
                  <p className="text-white/50 text-xs mt-1">2 hours ago</p>
                </div>
              </div>
            </div>

            {/* Timeline Entry 2 */}
            <div className="glass-panel mb-4 p-4 rounded-[16px]">
              <div className="flex items-start space-x-3">
                <div className="glass-inner rounded-full p-2">
                  <Plus className="h-4 w-4 text-white/70" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">New case created</p>
                  <p className="text-white/70 text-xs">Diabetes management case</p>
                  <p className="text-white/50 text-xs mt-1">5 hours ago</p>
                </div>
              </div>
            </div>

            {/* Timeline Entry 3 */}
            <div className="glass-panel mb-4 p-4 rounded-[16px]">
              <div className="flex items-start space-x-3">
                <div className="glass-inner rounded-full p-2">
                  <Calendar className="h-4 w-4 text-white/70" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">Appointment scheduled</p>
                  <p className="text-white/70 text-xs">Follow-up consultation</p>
                  <p className="text-white/50 text-xs mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Chart Widget */}
          <div className="glass-panel mt-6">
            <h4 className="text-white font-medium mb-3">Weekly Progress</h4>
            <div className="glass-inner">
              <div className="h-20 flex items-end justify-between space-x-1">
                {[65, 45, 80, 55, 70, 90, 75].map((height, index) => (
                  <div
                    key={index}
                    className="bg-white/30 rounded-sm flex-1"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={staggeredItem}
        initial="hidden"
        animate="visible"
        className="glass-panel max-w-4xl mx-auto"
      >
        <h3 className="text-xl font-semibold text-white mb-6 text-center">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => navigate('/cases/new')}
            className="glass-button text-white font-medium py-4 flex items-center justify-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Case</span>
          </Button>
          <Button
            onClick={() => navigate('/cases')}
            className="glass-button text-white font-medium py-4 flex items-center justify-center space-x-2"
          >
            <BookOpen className="h-5 w-5" />
            <span>Browse Cases</span>
          </Button>
          <Button
            onClick={() => navigate('/account')}
            className="glass-button text-white font-medium py-4 flex items-center justify-center space-x-2"
          >
            <UserRound className="h-5 w-5" />
            <span>Profile Settings</span>
          </Button>
        </div>
      </motion.div>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => navigate('/cases/new')}
        className="fixed bottom-6 right-6 glass-panel w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        aria-label="Create New Case"
      >
        <Plus className="h-6 w-6 text-white" />
      </motion.button>
    </div>
  );
};

export default Dashboard;
