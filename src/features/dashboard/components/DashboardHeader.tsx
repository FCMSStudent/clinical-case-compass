import React from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/app/providers/AuthContext";

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = () => {
  const { user } = useAuth();

  // Get user display name with fallback
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Doctor';

  return (
    <motion.header 
      className="mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
          <motion.div 
          className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
              <motion.div 
                className="auth-glass-container p-3 rounded-2xl transition-all duration-300 hover:scale-105"
                whileHover={{ 
                  rotate: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 5,
                  brightness: 1.2
                }}
                transition={{ duration: 0.2 }}
              >
            <Sparkles className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <motion.h1 
              className="text-3xl font-bold text-white mb-1 transition-all duration-300 hover:brightness-110"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{duration: 0.6, delay: 0.2 }}
                >
                  Welcome back, {displayName}!
                </motion.h1>
                <motion.p 
              className="text-lg text-white/90 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Here's what's happening with your clinical cases today.
                </motion.p>
              </div>
          </motion.div>
      </div>
    </motion.header>
  );
};
