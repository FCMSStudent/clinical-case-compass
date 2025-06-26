import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { UserRound, TrendingUp, Activity, BookOpen, Users, Target, Plus, Eye, BarChart3, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useEnhancedDashboardData } from "@/features/dashboard/hooks/use-enhanced-dashboard-data";
import { Button } from "@/shared/components/button";
import { Badge } from "@/shared/components/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { MetricCardSkeleton } from "@/shared/components/dashboard-skeleton";
import { DynamicRecentActivity } from "@/features/dashboard/components/DynamicRecentActivity";
import { RecentCasesCarousel } from "@/shared/components/recent-cases-carousel";
import { EnhancedMetricCard } from "@/features/dashboard/components/EnhancedMetricCard";
import { DashboardFilters } from "@/features/dashboard/components/DashboardFilters";
import { AnalyticsChart } from "@/features/dashboard/components/AnalyticsChart";
import { PageHeader } from "@/shared/components/page-header";
import { Alert, AlertDescription } from "@/shared/components/alert";
import { typography, responsiveType } from "@/design-system/tokens/typography";
import { layout, spacing } from "@/design-system/tokens/spacing";
import { cn } from "@/shared/utils/utils";
import { liquidGlassClasses, getGlassTransitionVariants, getGlassHoverVariants } from "@/design-system/components/glass-effects";

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
  const { 
    data, 
    isLoading, 
    error, 
    searchQuery, 
    setSearchQuery, 
    activeFilters, 
    setActiveFilters 
  } = useEnhancedDashboardData();

  // Convert TrendData to ChartData format
  const mapTrendToChart = (trends: any[]) => 
    trends.map(item => ({
      name: item.period || item.name,
      value: item.value,
      trend: item.trend
    }));

  if (error) {
    return (
      <motion.div 
        className={cn("space-y-6")}
        variants={getGlassTransitionVariants('medium')}
        initial="initial"
        animate="animate"
      >
        <PageHeader
          title="Dashboard"
          description="Your clinical cases overview"
        />
        <Alert variant="destructive" className={cn(liquidGlassClasses.alert, "bg-red-900/30 border-red-700/50")}>
          <AlertDescription className={typography.bodySmall}>
            There was an error loading the dashboard data: {error.message || 'Unknown error occurred'}
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={cn("space-y-6")}
      variants={getGlassTransitionVariants('medium')}
      initial="initial"
      animate="animate"
    >
      {/* Page Header - using design system typography */}
      <PageHeader
        title={`Welcome back, ${user?.user_metadata?.full_name || 'Doctor'}!`}
        description="Here's what's happening with your clinical cases today."
        actions={
          <div className={cn("flex", layout.flex.align.center, layout.grid.gap.sm)}>
            <motion.div
              variants={getGlassHoverVariants('medium')}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                onClick={() => navigate('/cases/new')}
                className={cn(liquidGlassClasses.button, "text-white")}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Case
              </Button>
            </motion.div>
            <motion.div
              variants={getGlassHoverVariants('subtle')}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                onClick={() => navigate('/cases')}
                variant="outline"
                className={cn(liquidGlassClasses.button, "text-white border-white/30")}
              >
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </motion.div>
          </div>
        }
      />

      {/* Enhanced Filters - using spacing tokens */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <DashboardFilters
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
        />
      </motion.div>

      {/* Enhanced Metrics Grid - using layout tokens */}
      <motion.div
        variants={staggeredContainer}
        initial="hidden"
        animate="visible"
        className={cn(
          layout.grid.cols[1],
          "md:grid-cols-2 lg:grid-cols-4",
          layout.grid.gap.lg
        )}
        style={{ display: 'grid' }}
      >
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <MetricCardSkeleton key={index} />
          ))
        ) : (
          <>
            <motion.div variants={staggeredItem}>
              <EnhancedMetricCard
                title="Total Cases"
                value={data?.metrics.totalCases.value || 0}
                icon={<BookOpen className="h-6 w-6" />}
                description="All documented cases"
                trend={data?.metrics.totalCases.trend}
                sparklineData={data?.metrics.totalCases.sparklineData}
                color="blue"
                priority="medium"
              />
            </motion.div>

            <motion.div variants={staggeredItem}>
              <EnhancedMetricCard
                title="Active Cases"
                value={data?.metrics.activeCases.value || 0}
                icon={<Activity className="h-6 w-6" />}
                description="Currently active cases"
                trend={data?.metrics.activeCases.trend}
                sparklineData={data?.metrics.activeCases.sparklineData}
                color="green"
                priority="high"
              />
            </motion.div>

            <motion.div variants={staggeredItem}>
              <EnhancedMetricCard
                title="This Month"
                value={data?.metrics.monthlyCases.value || 0}
                icon={<TrendingUp className="h-6 w-6" />}
                description="Cases this month"
                trend={data?.metrics.monthlyCases.trend}
                sparklineData={data?.metrics.monthlyCases.sparklineData}
                color="purple"
                priority="medium"
              />
            </motion.div>

            <motion.div variants={staggeredItem}>
              <EnhancedMetricCard
                title="Patients"
                value={data?.metrics.totalPatients.value || 0}
                icon={<Users className="h-6 w-6" />}
                description="Unique patients"
                trend={data?.metrics.totalPatients.trend}
                sparklineData={data?.metrics.totalPatients.sparklineData}
                color="orange"
                priority="low"
              />
            </motion.div>
          </>
        )}
      </motion.div>

      {/* Analytics Section - using layout tokens */}
      <motion.div
        variants={staggeredContainer}
        initial="hidden"
        animate="visible"
        className={cn(
          layout.grid.cols[1],
          "lg:grid-cols-2",
          layout.grid.gap.lg
        )}
        style={{ display: 'grid' }}
      >
        <motion.div variants={staggeredItem}>
          <AnalyticsChart
            title="Case Trends"
            data={mapTrendToChart(data?.caseTrends || [])}
            type="line"
            showTrend={true}
            height={250}
          />
        </motion.div>

        <motion.div variants={staggeredItem}>
          <AnalyticsChart
            title="Specialty Distribution"
            data={data?.specialtyDistribution || []}
            type="pie"
            showTrend={false}
            height={250}
          />
        </motion.div>
      </motion.div>

      {/* Main Content Grid - using layout tokens */}
      <motion.div
        variants={staggeredContainer}
        initial="hidden"
        animate="visible"
        className={cn(
          layout.grid.cols[1],
          "lg:grid-cols-3",
          layout.grid.gap.lg
        )}
        style={{ display: 'grid' }}
      >
        {/* Recent Cases */}
        <motion.div variants={staggeredItem} className="lg:col-span-2">
          <Card className={cn(liquidGlassClasses.card)}>
            <CardHeader>
              <div className={cn("flex items-center justify-between")}>
                <CardTitle className={cn(typography.h6, "text-white")}>Recent Cases</CardTitle>
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
          <Card className={cn(liquidGlassClasses.card)}>
            <CardHeader>
              <CardTitle className={cn(typography.h6, "text-white")}>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <DynamicRecentActivity />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Activity Analytics */}
      <motion.div
        variants={staggeredItem}
        initial="hidden"
        animate="visible"
      >
        <AnalyticsChart
          title="Weekly Activity"
          data={mapTrendToChart(data?.activityData || [])}
          type="area"
          showTrend={true}
          height={200}
        />
      </motion.div>

      {/* Quick Actions - using typography and spacing tokens */}
      <motion.div
        variants={staggeredItem}
        initial="hidden"
        animate="visible"
      >
        <Card className={cn(liquidGlassClasses.card)}>
          <CardHeader>
            <CardTitle className={cn(typography.h6, "text-white")}>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn(
              layout.grid.cols[1],
              "md:grid-cols-3",
              layout.grid.gap.md
            )} style={{ display: 'grid' }}>
              <motion.div variants={getGlassHoverVariants('medium')} whileHover="hover" whileTap="tap">
                <Button
                  onClick={() => navigate('/cases/new')}
                  className={cn(liquidGlassClasses.button, "w-full text-white")}
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Case
                </Button>
              </motion.div>
              <motion.div variants={getGlassHoverVariants('subtle')} whileHover="hover" whileTap="tap">
                <Button
                  onClick={() => navigate('/cases')}
                  className={cn(liquidGlassClasses.button, "w-full text-white")}
                  variant="outline"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Cases
                </Button>
              </motion.div>
              <motion.div variants={getGlassHoverVariants('subtle')} whileHover="hover" whileTap="tap">
                <Button
                  onClick={() => navigate('/account')}
                  className={cn(liquidGlassClasses.button, "w-full text-white")}
                  variant="outline"
                >
                  <UserRound className="h-4 w-4 mr-2" />
                  Profile Settings
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
