import { Button } from "@/shared/components/button";
import { Plus, Eye } from "lucide-react";
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
import { typography } from "@/design-system/tokens/typography";
import { layout } from "@/design-system/tokens/spacing";

// New modular components
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { DashboardMetrics } from "@/features/dashboard/components/DashboardMetrics";
import { MobileFilterDrawer } from "@/features/dashboard/components/MobileFilterDrawer";
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

  const actions = (
    <div className={cn("flex", layout.flex.align.center, layout.grid.gap.sm)}>
      <motion.div
        {...(shouldAnimate ? {
          variants: getGlassHoverVariants('medium'),
          whileHover: "hover" as const,
          whileTap: "tap" as const
        } : {})}
      >
        <Button
          onClick={() => navigate('/cases/new')}
          className={cn(liquidGlassClasses.button, "text-white")}
          size={isMobile ? "sm" : "default"}
        >
          <Plus className="h-4 w-4 mr-2" />
          {isMobile ? "New" : "New Case"}
        </Button>
      </motion.div>
      <motion.div
        {...(shouldAnimate ? {
          variants: getGlassHoverVariants('subtle'),
          whileHover: "hover" as const,
          whileTap: "tap" as const
        } : {})}
      >
        <Button
          onClick={() => navigate('/cases')}
          variant="outline"
          className={cn(liquidGlassClasses.button, "text-white border-white/30")}
          size={isMobile ? "sm" : "default"}
        >
          <Eye className="h-4 w-4 mr-2" />
          {isMobile ? "All" : "View All"}
        </Button>
      </motion.div>
    </div>
  );

  return (
    <DashboardLayout
      title={`Welcome back, ${userName}!`}
      description="Here's what's happening with your clinical cases today."
      actions={actions}
      error={error}
    >
      {/* Filters Section */}
      <motion.section
        aria-label="Dashboard filters"
        {...(shouldAnimate ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.1 }
        } : {})}
      >
        {isMobile ? (
          <MobileFilterDrawer
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
          />
        ) : (
          <DashboardFilters
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
          />
        )}
      </motion.section>

      {/* Metrics Section */}
      <DashboardMetrics
        metrics={data?.metrics}
        isLoading={isLoading}
      />

      {/* Recent Cases Section */}
      <motion.section
        aria-label="Recent cases"
        {...(shouldAnimate ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.3 }
        } : {})}
      >
        <Card className={cn(liquidGlassClasses.card)}>
          <CardHeader>
            <div className={cn("flex items-center justify-between")}>
              <CardTitle 
                className={cn(typography.h6, "text-white")}
                id="recent-cases-title"
              >
                Recent Cases
              </CardTitle>
              <Badge 
                variant="secondary" 
                className="bg-white/10 text-white/80"
                aria-label={`${data?.recentCases?.length || 0} recent cases`}
              >
                {data?.recentCases?.length || 0} cases
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div aria-labelledby="recent-cases-title">
              <RecentCasesCarousel 
                cases={data?.recentCases || []} 
                isLoading={isLoading} 
              />
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </DashboardLayout>
  );
};

export default Dashboard;
