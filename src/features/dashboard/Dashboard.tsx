import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Plus, AlertCircle, Database, Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { useAuth } from "@/app/providers/AuthContext";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardMetrics } from "./components/DashboardMetrics";
import { DashboardContent } from "./components/DashboardContent";
import { DashboardQuickActions } from "./components/DashboardQuickActions";
import { cn } from "@/shared/utils/utils";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isOfflineMode, loading: authLoading } = useAuth();
  const { data, isLoading, error } = useDashboardData();

  // Debug logging
  console.log("Dashboard Debug:", { data, isLoading, error, user: !!user, isOfflineMode, authLoading });

  // Show setup instructions if in offline mode
  if (isOfflineMode) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          className="auth-glass-container max-w-2xl p-8"
        >
          <div className="text-center mb-6">
            <Database className="h-16 w-16 text-white/60 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-4">Database Setup Required</h2>
            <p className="text-white/80 mb-6">
              To use the dashboard, you need to configure Supabase environment variables.
            </p>
          </div>
          
          <div className="space-y-4 text-left">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2 flex items-center">
                <Key className="h-4 w-4 mr-2" />
                Missing Environment Variables
              </h3>
              <div className="text-white/70 text-sm space-y-2">
                <div>• VITE_SUPABASE_URL</div>
                <div>• VITE_SUPABASE_ANON_KEY</div>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">Quick Setup:</h3>
              <div className="text-white/70 text-sm space-y-2">
                <div>1. Create a <code className="bg-white/20 px-1 rounded">.env</code> file in the project root</div>
                <div>2. Add your Supabase credentials</div>
                <div>3. Restart the development server</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/auth')}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-all duration-200 mr-4"
            >
              Try Demo Mode
            </button>
            <button
              onClick={() => window.open('https://supabase.com/docs/guides/getting-started', '_blank')}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-all duration-200"
            >
              Supabase Setup Guide
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show auth loading state
  if (authLoading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="auth-glass-container p-8 text-center"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Checking authentication...</p>
        </motion.div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          className="auth-glass-container max-w-md p-8 text-center"
        >
          <AlertCircle className="h-16 w-16 text-white/60 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-4">Authentication Required</h2>
          <p className="text-white/80 mb-6">
            Please sign in to access your medical cases dashboard.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-all duration-200 w-full"
          >
            Sign In
          </button>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          className="auth-glass-container max-w-md p-8 text-center"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Dashboard Error</h2>
          <p className="text-white/80">There was an error loading the dashboard data.</p>
          <p className="text-white/60 text-sm mt-2">Error: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 mt-4"
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-20 right-4 z-50 bg-black/80 text-white p-2 rounded text-xs">
          Loading: {isLoading ? 'true' : 'false'} | 
          Data: {data ? 'exists' : 'null'} |
          Cases: {data?.totalCases || 0} |
          User: {user ? 'authenticated' : 'none'}
        </div>
      )}
      
      <DashboardHeader />
      
      {/* Dashboard content with better visibility */}
      <div className="px-4 pb-8 max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Show loading state */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-20"
          >
            <div className="auth-glass-container p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white">Loading dashboard...</p>
            </div>
          </motion.div>
        )}

        {/* Show empty state if no data */}
        {!isLoading && data && data.totalCases === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center py-20"
          >
            <div className="auth-glass-container p-8 text-center max-w-md">
              <h3 className="text-xl font-semibold text-white mb-4">Welcome to Medica!</h3>
              <p className="text-white/80 mb-6">
                You don't have any cases yet. Create your first case to get started.
              </p>
              <button
                onClick={() => navigate('/cases/new')}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-all duration-200"
              >
                Create First Case
              </button>
            </div>
          </motion.div>
        )}

        {/* Metrics Section */}
        {!isLoading && data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <DashboardMetrics data={data} isLoading={isLoading} />
          </motion.div>
        )}
        
        {/* Section Divider */}
        {!isLoading && data && data.totalCases > 0 && (
          <div className="border-b border-white/10 my-8" />
        )}
        
        {/* Content Section */}
        {!isLoading && data && data.totalCases > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <DashboardContent data={data} isLoading={isLoading} />
          </motion.div>
        )}
        
        {/* Section Divider */}
        {!isLoading && data && data.totalCases > 0 && (
          <div className="border-b border-white/10 my-8" />
        )}
        
        {/* Quick Actions Section */}
        {!isLoading && data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <DashboardQuickActions />
          </motion.div>
        )}
      </div>

      {/* Floating Action Button */}
      {user && (
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
      )}
    </div>
  );
};

export default Dashboard;
