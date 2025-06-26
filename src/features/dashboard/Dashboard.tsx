import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { TrendingUp, Activity, BookOpen, Users, Plus, Eye, Filter } from "lucide-react";
import { useEnhancedDashboardData } from "@/features/dashboard/hooks/use-enhanced-dashboard-data";
import { Button } from "@/shared/components/button";
import { Badge } from "@/shared/components/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthContext";
import { motion } from "framer-motion";
import { MetricCardSkeleton } from "@/shared/components/dashboard-skeleton";
import { RecentCasesCarousel } from "@/shared/components/recent-cases-carousel";
import { EnhancedMetricCard } from "@/features/dashboard/components/EnhancedMetricCard";
import { DashboardFilters } from "@/features/dashboard/components/DashboardFilters";
import { PageHeader } from "@/shared/components/page-header";
import { Alert, AlertDescription } from "@/shared/components/alert";
import { typography } from "@/design-system/tokens/typography";
import { layout } from "@/design-system/tokens/spacing";
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
      {/* Page Header with Action Buttons - using design system typography */}
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
            <motion.div
              variants={getGlassHoverVariants('subtle')}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                variant="outline"
                className={cn(liquidGlassClasses.button, "text-white border-white/30")}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
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
                trend={data?.metrics.totalPatients.trend}
                sparklineData={data?.metrics.totalPatients.sparklineData}
                color="orange"
                priority="low"
              />
            </motion.div>
          </>
        )}
      </motion.div>



      {/* Recent Cases Section */}
      <motion.div
        variants={staggeredItem}
        initial="hidden"
        animate="visible"
      >
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




    </motion.div>
  );
};

export default Dashboard;
