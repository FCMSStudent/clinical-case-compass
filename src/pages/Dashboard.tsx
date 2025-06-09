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
import { UserRound, TrendingUp, Activity, Sparkles, Target, Zap } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const { isLoading, getStatistics, getSpecialtyProgress } = useDashboardData();
  const stats = getStatistics();
  const specialtyProgress = getSpecialtyProgress();

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="w-full max-w-7xl mx-auto space-y-8 p-6">
        {/* Enhanced Welcome Banner */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Card className="border-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                        <Sparkles className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-primary mb-1">
                          Welcome back to Clinical Case Compass!
                        </h3>
                        <p className="text-muted-foreground">
                          Your central hub for managing clinical cases and tracking your medical learning journey.
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowWelcome(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Dismiss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Overview of your clinical case activities and learning progress
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Target className="h-3 w-3 mr-1" />
                Active Learning
              </Badge>
              <Badge variant="outline" className="border-primary/30 text-primary">
                <Zap className="h-3 w-3 mr-1" />
                {stats.totalCases} Cases
              </Badge>
            </div>
          </div>
        </motion.div>
        
        {/* Enhanced Search Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <Card className="border-0 bg-gradient-to-r from-card via-card to-card/80 shadow-xl backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Quick Search</h3>
                </div>
                <SearchPanel 
                  value=""
                  onChange={() => {}}
                  placeholder="Search cases, symptoms, medical conditions, or learning points..."
                />
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/5 hover:border-primary/30">
                    Recent cases
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/5 hover:border-primary/30">
                    Cardiology
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/5 hover:border-primary/30">
                    Learning points
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/5 hover:border-primary/30">
                    Resources
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <StatCards stats={stats} isLoading={isLoading} />
        </motion.div>
        
        {/* Enhanced Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Quick Actions - 5 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <QuickStartPanel />
          </motion.div>

          {/* Progress Chart - 4 columns */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-4"
          >
            <ProgressChart stats={stats} />
          </motion.div>

          {/* Recent Activity - 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <RecentActivityList />
          </motion.div>
        </div>

        {/* Enhanced Specialty Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        >
          <SpecialtyProgress data={specialtyProgress} />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
