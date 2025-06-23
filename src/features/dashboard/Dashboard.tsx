
import React, { useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");

  if (error) {
    return (
      <div className="min-h-screen auth-gradient-bg flex items-center justify-center p-4">
        {/* Ambient glassmorphism background elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-400/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        
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
    <div className="min-h-screen auth-gradient-bg relative overflow-hidden">
      {/* Enhanced ambient glassmorphism background elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-400/20 rounded-full filter blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-3/4 w-64 h-64 bg-indigo-400/15 rounded-full filter blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="relative z-10">
        <DashboardHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <div className="px-4 pb-8 space-y-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <DashboardMetrics data={data} isLoading={isLoading} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <DashboardContent data={data} isLoading={isLoading} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <DashboardQuickActions />
          </motion.div>
        </div>

        {/* Enhanced Floating Action Button with glassmorphism */}
        <motion.button
          onClick={() => navigate('/cases/new')}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-2xl shadow-xl z-50 flex items-center justify-center transition-all duration-300 auth-glass-container hover:scale-105 focus:ring-2 focus:ring-white/40 focus:outline-none group"
          whileHover={{ 
            scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1.1,
            brightness: 1.1
          }}
          whileTap={{ 
            scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.9 
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          aria-label="Create New Case"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
          <Plus className="h-7 w-7 text-white relative z-10" />
        </motion.button>
      </div>
    </div>
  );
};

export default Dashboard;
