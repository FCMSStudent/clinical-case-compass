import React from "react";
import { Search, Filter, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/app/providers/AuthContext";
import { cn } from "@/shared/utils/utils";

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  searchQuery,
  onSearchChange
}) => {
  const { user } = useAuth();

  // Get user display name with fallback
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Doctor';

  return (
    <motion.header 
      className="sticky top-0 z-40 mb-8 backdrop-blur-md bg-white/5 border-b border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <div className="flex items-center space-x-4 mb-3">
              <motion.div 
                className="backdrop-blur-sm bg-white/10 border border-white/20 p-3 rounded-xl transition-all duration-300 hover:bg-white/20 hover:scale-105"
                whileHover={{ 
                  rotate: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 5,
                  brightness: 1.2
                }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="h-7 w-7 text-white" />
              </motion.div>
              <div>
                <motion.h1 
                  className="text-4xl font-bold text-white mb-1 transition-all duration-300 hover:brightness-110"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Welcome back, {displayName}!
                </motion.h1>
                <motion.p 
                  className="text-xl text-white/90 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Here's what's happening with your clinical cases today.
                </motion.p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-4 ml-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <div className="relative min-w-[350px]">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search cases, patients, diagnoses..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={cn(
                  "w-full pl-12 pr-4 py-4 text-lg rounded-xl transition-all duration-300",
                  "backdrop-blur-md bg-white/10 border border-white/20",
                  "placeholder:text-white/60 text-white",
                  "focus:bg-white/20 focus:border-white/30 focus:ring-2 focus:ring-white/20 focus:outline-none",
                  "hover:bg-white/15 hover:border-white/25"
                )}
                aria-label="Search cases, patients, or diagnoses"
              />
              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl pointer-events-none"></div>
            </div>
            
            <motion.button
              aria-label="Open filters"
              className={cn(
                "backdrop-blur-md bg-white/10 border border-white/20 p-4 rounded-xl",
                "text-white/90 hover:text-white hover:bg-white/20 hover:border-white/30",
                "transition-all duration-300 hover:scale-105",
                "focus:ring-2 focus:ring-white/20 focus:outline-none group"
              )}
              whileHover={{ 
                scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1.05,
                brightness: 1.1
              }}
              whileTap={{ 
                scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.95 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              <Filter className="h-6 w-6 relative z-10" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
