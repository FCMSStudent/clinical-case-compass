import React, { useState } from "react";
import { Search, Filter, Sparkles, SlidersHorizontal, Bell, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/app/providers/AuthContext";
import { cn } from "@/shared/utils/utils";
import { Badge } from "@/shared/components/badge";

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const FilterDropdown: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const filterCategories = [
    {
      title: "Status",
      options: [
        { id: "active", label: "Active Cases", count: 12 },
        { id: "completed", label: "Completed", count: 8 },
        { id: "draft", label: "Drafts", count: 3 }
      ]
    },
    {
      title: "Priority",
      options: [
        { id: "high", label: "High Priority", count: 5 },
        { id: "medium", label: "Medium Priority", count: 7 },
        { id: "low", label: "Low Priority", count: 10 }
      ]
    },
    {
      title: "Specialty",
      options: [
        { id: "cardiology", label: "Cardiology", count: 4 },
        { id: "internal", label: "Internal Medicine", count: 8 },
        { id: "emergency", label: "Emergency", count: 6 }
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          
          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            className="absolute top-full right-0 mt-2 w-80 z-50"
          >
            <div className="relative">
              <div className="absolute inset-0 backdrop-blur-xl bg-white/15 rounded-2xl border border-white/25 shadow-xl"></div>
              <div className="relative backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-6 overflow-hidden">
                {/* Light refraction effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                      <SlidersHorizontal className="h-5 w-5" />
                      <span>Filters</span>
                    </h3>
                    <button
                      onClick={onClose}
                      className="text-white/60 hover:text-white transition-colors duration-200"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {filterCategories.map((category) => (
                      <div key={category.title}>
                        <h4 className="text-sm font-medium text-white/80 mb-3 uppercase tracking-wider">
                          {category.title}
                        </h4>
                        <div className="space-y-2">
                          {category.options.map((option) => (
                            <motion.label
                              key={option.id}
                              className="flex items-center justify-between p-3 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer group"
                              whileHover={{ scale: 1.01 }}
                            >
                              <div className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 rounded border-white/30 bg-white/10 text-blue-400 focus:ring-white/30"
                                />
                                <span className="text-white group-hover:brightness-110">
                                  {option.label}
                                </span>
                              </div>
                              <Badge 
                                variant="outline" 
                                className="backdrop-blur-sm bg-white/10 text-white/80 border-white/20 text-xs"
                              >
                                {option.count}
                              </Badge>
                            </motion.label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-3 mt-8 pt-6 border-t border-white/20">
                    <motion.button
                      className="flex-1 py-2 px-4 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Apply Filters
                    </motion.button>
                    <motion.button
                      className="py-2 px-4 rounded-xl text-white/70 hover:text-white transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Clear All
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  searchQuery,
  onSearchChange
}) => {
  const { user } = useAuth();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Get user display name with fallback
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Doctor';

  return (
    <motion.header 
      className="mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Left side - Welcome section */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <div className="flex items-center space-x-4 mb-3">
              <motion.div 
                className="auth-glass-container p-3 rounded-2xl transition-all duration-300 hover:scale-105"
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
            
            {/* Quick stats */}
            <motion.div
              className="flex items-center space-x-6 text-white/70"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">12 active cases</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">3 pending reviews</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-sm">2 urgent</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right side - Search and actions */}
          <motion.div 
            className="flex items-center space-x-4 ml-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            {/* Enhanced Search */}
            <div className="relative min-w-[400px]">
              <div className="relative">
                <div className="absolute inset-0 backdrop-blur-xl bg-white/15 rounded-2xl border border-white/25 shadow-xl"></div>
                <div className="relative auth-glass-container rounded-2xl overflow-hidden">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70 transition-colors duration-200" />
                  <input
                    type="text"
                    placeholder="Search cases, patients, diagnoses..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className={cn(
                      "w-full pl-12 pr-4 py-4 text-lg rounded-2xl transition-all duration-300 bg-transparent border-0 outline-0",
                      "placeholder:text-white/60 text-white",
                      "focus:bg-white/5"
                    )}
                    aria-label="Search cases, patients, or diagnoses"
                  />
                  {/* Search suggestions hint */}
                  <AnimatePresence>
                    {searchQuery.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      >
                        <div className="flex items-center space-x-2 text-white/50 text-sm">
                          <span>Try "cardiology" or "diabetes"</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <div className="relative">
                                 <motion.button
                   aria-label="Notifications"
                   className={cn(
                     "auth-glass-container p-4 rounded-2xl relative",
                     "text-white/90 hover:text-white hover:scale-105",
                     "transition-all duration-300",
                     "focus:ring-2 focus:ring-white/20 focus:outline-none group"
                   )}
                   whileHover={{ 
                     scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1.05,
                     filter: "brightness(1.1)"
                   }}
                   whileTap={{ 
                     scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.95 
                   }}
                   onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <Bell className="h-6 w-6 relative z-10" />
                  {/* Notification badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">3</span>
                  </div>
                </motion.button>
              </div>

              {/* Filters */}
              <div className="relative">
                                 <motion.button
                   aria-label="Open filters"
                   className={cn(
                     "auth-glass-container p-4 rounded-2xl",
                     "text-white/90 hover:text-white hover:scale-105",
                     "transition-all duration-300",
                     "focus:ring-2 focus:ring-white/20 focus:outline-none group",
                     isFilterOpen && "bg-white/20 border-white/30"
                   )}
                   whileHover={{ 
                     scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1.05,
                     filter: "brightness(1.1)"
                   }}
                   whileTap={{ 
                     scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.95 
                   }}
                   onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <Filter className="h-6 w-6 relative z-10" />
                </motion.button>
                
                <FilterDropdown 
                  isOpen={isFilterOpen} 
                  onClose={() => setIsFilterOpen(false)} 
                />
              </div>

              {/* Settings */}
                             <motion.button
                 aria-label="Settings"
                 className={cn(
                   "auth-glass-container p-4 rounded-2xl",
                   "text-white/90 hover:text-white hover:scale-105",
                   "transition-all duration-300",
                   "focus:ring-2 focus:ring-white/20 focus:outline-none group"
                 )}
                 whileHover={{ 
                   scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1.05,
                   filter: "brightness(1.1)"
                 }}
                 whileTap={{ 
                   scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.95 
                 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <Settings className="h-6 w-6 relative z-10" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
