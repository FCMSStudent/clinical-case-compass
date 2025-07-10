import { Button } from "@/shared/components/button";
import { Plus, Eye, Activity, Clock, TrendingUp, Users, FileText, BarChart3, Calendar, Bell } from "lucide-react";
import { useEnhancedDashboardData } from "@/features/dashboard/hooks/use-enhanced-dashboard-data";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthContext";
import { motion } from "framer-motion";
import { RecentCasesCarousel } from "@/shared/components/recent-cases-carousel";
import { DashboardFilters } from "@/features/dashboard/components/DashboardFilters";
import { cn } from "@/shared/utils/utils";
import { liquidGlassClasses, getGlassHoverVariants } from "@/design-system/components/glass-effects";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { Badge } from "@/shared/components/badge";
import { Progress } from "@/shared/components/progress";
import { Separator } from "@/shared/components/separator";

import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import { useAccessibleAnimation } from "@/features/dashboard/hooks/use-accessibility";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const { shouldAnimate } = useAccessibleAnimation();
  
  const { 
    data, 
    isLoading, 
    error, 
    searchQuery, 
    setSearchQuery, 
    activeFilters, 
    setActiveFilters 
  } = useEnhancedDashboardData();

  const userName = user?.user_metadata?.full_name || 'Doctor';
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

  const quickStats = [
    { label: "Total Cases", value: data?.metrics?.totalCases || 0, icon: FileText, change: "+12%" },
    { label: "This Week", value: data?.metrics?.thisWeek || 0, icon: Calendar, change: "+8%" },
    { label: "Completed", value: data?.metrics?.completed || 0, icon: Activity, change: "+15%" },
    { label: "In Progress", value: data?.metrics?.inProgress || 0, icon: Clock, change: "+5%" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className={cn(liquidGlassClasses.card, "p-8 text-center")}>
          <CardContent>
            <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
            <p className="text-white/70">{error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen p-4 md:p-6 lg:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.header 
        className="mb-8"
        variants={itemVariants}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {greeting}, {userName}! 👋
            </h1>
            <p className="text-white/70 text-lg">
              Here's your medical cases overview for today
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => navigate('/cases/new')}
              className={cn(liquidGlassClasses.button, "text-white group")}
              size={isMobile ? "default" : "lg"}
            >
              <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-200" />
              Create New Case
            </Button>
            <Button
              onClick={() => navigate('/cases')}
              variant="outline"
              className={cn(liquidGlassClasses.button, "text-white border-white/30")}
              size={isMobile ? "default" : "lg"}
            >
              <Eye className="h-5 w-5 mr-2" />
              View All Cases
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Quick Stats Grid */}
      <motion.section 
        className="mb-8"
        variants={itemVariants}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={cn(liquidGlassClasses.card, "p-6 hover:bg-white/15 transition-all duration-300")}>
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="h-8 w-8 text-white/80" />
                    <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                      {stat.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </p>
                    <p className="text-white/60 text-sm">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Recent Cases */}
        <motion.section 
          className="lg:col-span-2"
          variants={itemVariants}
        >
          <Card className={cn(liquidGlassClasses.card)}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Cases
                </CardTitle>
                <Badge variant="secondary" className="bg-white/10 text-white/80">
                  {data?.recentCases?.length || 0} active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <RecentCasesCarousel 
                cases={data?.recentCases || []} 
                isLoading={isLoading} 
              />
            </CardContent>
          </Card>
        </motion.section>

        {/* Right Column - Quick Actions & Stats */}
        <motion.section 
          className="space-y-6"
          variants={itemVariants}
        >
          {/* Quick Actions */}
          <Card className={cn(liquidGlassClasses.card)}>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => navigate('/cases/new')}
              >
                <Plus className="h-4 w-4 mr-3" />
                New Case
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => navigate('/cases')}
              >
                <FileText className="h-4 w-4 mr-3" />
                Browse Cases
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
              >
                <BarChart3 className="h-4 w-4 mr-3" />
                Analytics
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
              >
                <Users className="h-4 w-4 mr-3" />
                Patients
              </Button>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card className={cn(liquidGlassClasses.card)}>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                This Month's Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80 text-sm">Cases Completed</span>
                  <span className="text-white text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <Separator className="bg-white/10" />
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80 text-sm">Goals Achieved</span>
                  <span className="text-white text-sm font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              
              <Separator className="bg-white/10" />
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80 text-sm">Learning Progress</span>
                  <span className="text-white text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className={cn(liquidGlassClasses.card)}>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 text-sm">
                    Case "Acute Pneumonia" completed
                  </p>
                  <p className="text-white/60 text-xs">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 text-sm">
                    New patient added to system
                  </p>
                  <p className="text-white/60 text-xs">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 text-sm">
                    Lab results updated
                  </p>
                  <p className="text-white/60 text-xs">1 day ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>

      {/* Search and Filters */}
      <motion.section 
        className="mt-8"
        variants={itemVariants}
      >
        <Card className={cn(liquidGlassClasses.card)}>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-white">
              Search & Filter Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DashboardFilters
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
            />
          </CardContent>
        </Card>
      </motion.section>
    </motion.div>
  );
};

export default Dashboard;