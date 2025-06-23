import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardMetrics } from "./components/DashboardMetrics";
import { DashboardContent } from "./components/DashboardContent";
import { DashboardQuickActions } from "./components/DashboardQuickActions";
import { cn } from "@/shared/utils/utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useDashboardData();

  if (error) {
    return (
      <div className="min-h-screen dashboard-gradient-bg flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          className="auth-glass-container max-w-md p-8 text-center relative z-10"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Dashboard Error</h2>
          <p className="text-white/80">There was an error loading the dashboard data.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dashboard-gradient-bg relative">
      <div className="relative z-10">
        <DashboardHeader />
        
        {/* Simplified container structure */}
        <div className="px-4 pb-8 max-w-7xl mx-auto space-y-8">
          {/* Metrics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <DashboardMetrics data={data} isLoading={isLoading} />
          </motion.div>
          
          {/* Simple Section Divider */}
          <div className="border-b border-white/10 my-8" />
          
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <DashboardContent data={data} isLoading={isLoading} />
          </motion.div>
          
          {/* Simple Section Divider */}
          <div className="border-b border-white/10 my-8" />
          
          {/* Quick Actions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <DashboardQuickActions />
          </motion.div>
        </div>

        {/* Simplified Floating Action Button */}
        <motion.button
          onClick={() => navigate('/cases/new')}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-2xl shadow-xl z-50 flex items-center justify-center transition-all duration-300 auth-glass-container hover:scale-105 focus:ring-2 focus:ring-white/40 focus:outline-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          aria-label="Create New Case"
        >
          <Plus className="h-7 w-7 text-white" />
        </motion.button>
      </div>
    </div>
  );
};

export default Dashboard;
