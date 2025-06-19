import React from "react";
import { useSupabaseCases } from "@/hooks/use-supabase-cases";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { StatCards } from "@/features/dashboard/components/StatCards";
import { QuickStartPanel } from "@/features/dashboard/components/QuickStartPanel";
import { RecentActivity } from "@/features/dashboard/components/RecentActivity";
import { RecentCasesCarousel } from "@/features/dashboard/components/RecentCasesCarousel";
import { SearchPanel } from "@/components/SearchPanel";
import { PageHeader } from "@/components/ui/page-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Dashboard: React.FC = () => {
  const { cases, isLoading, error } = useSupabaseCases();
  const dashboardData = useDashboardData(cases);

  if (error) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load dashboard data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome back to your medical case dashboard"
      />

      <SearchPanel
        value=""
        onChange={() => {}}
        placeholder="Search cases, patients, or medical terms..."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StatCards
          stats={[
            {
              title: "Total Cases",
              value: dashboardData.totalCases,
              change: dashboardData.caseChange,
              trend: dashboardData.caseTrend,
              loading: isLoading,
            },
            {
              title: "Completed",
              value: dashboardData.completedCases,
              change: dashboardData.completedChange,
              trend: dashboardData.completedTrend,
              loading: isLoading,
            },
            {
              title: "In Progress",
              value: dashboardData.inProgressCases,
              change: dashboardData.inProgressChange,
              trend: dashboardData.inProgressTrend,
              loading: isLoading,
            },
            {
              title: "Avg. Completion",
              value: dashboardData.avgCompletionTime,
              unit: "min",
              change: dashboardData.avgTimeChange,
              trend: dashboardData.avgTimeTrend,
              loading: isLoading,
            },
          ]}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <RecentActivity
            activities={dashboardData.recentActivities}
            isLoading={isLoading}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <QuickStartPanel />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={cn(
          "rounded-xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5",
          "border border-white/10 p-1"
        )}
      >
        <RecentCasesCarousel 
          cases={cases || []} 
          isLoading={isLoading}
        />
      </motion.div>
    </div>
  );
};
