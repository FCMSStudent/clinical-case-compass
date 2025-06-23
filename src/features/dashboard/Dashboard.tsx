
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardMetrics } from "./components/DashboardMetrics";
import { DashboardContent } from "./components/DashboardContent";
import { DashboardQuickActions } from "./components/DashboardQuickActions";
import { glass } from "@/design-system/components/components";
import { cn } from "@/shared/utils/utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useDashboardData();
  const [searchQuery, setSearchQuery] = useState("");

  if (error) {
    return (
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className={cn("p-8 rounded-xl text-center max-w-md", glass.card)}>
          <h2 className="text-xl font-semibold text-white mb-4">Dashboard Error</h2>
          <p className="text-white/80">There was an error loading the dashboard data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div className="px-4 pb-8 space-y-8 max-w-7xl mx-auto">
        <DashboardMetrics data={data} isLoading={isLoading} />
        
        <DashboardContent data={data} isLoading={isLoading} />
        
        <DashboardQuickActions />
      </div>

      {/* Enhanced Floating Action Button */}
      <motion.button
        onClick={() => navigate('/cases/new')}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-xl z-50 flex items-center justify-center transition-all duration-200 glass-card-elevated hover:scale-105 focus:ring-2 focus:ring-white/40 focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        aria-label="Create New Case"
      >
        <Plus className="h-7 w-7 text-white" />
      </motion.button>
    </div>
  );
};

export default Dashboard;
