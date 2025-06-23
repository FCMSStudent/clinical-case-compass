import React from "react";
import { motion } from "framer-motion";
import { Plus, BookOpen, UserRound, ArrowRight, Sparkles, BarChart3, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/button";
import { cn } from "@/shared/utils/utils";

export const DashboardQuickActions: React.FC = () => {
  const navigate = useNavigate();

  const primaryActions = [
    {
      icon: <Plus className="h-6 w-6" />,
      label: "Create New Case",
      description: "Start documenting a new patient case",
      onClick: () => navigate('/cases/new'),
      variant: "primary" as const,
      color: "blue"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      label: "Browse Cases",
      description: "View and manage existing cases",
      onClick: () => navigate('/cases'),
      variant: "secondary" as const,
      color: "green"
    },
    {
      icon: <UserRound className="h-6 w-6" />,
      label: "Profile Settings",
      description: "Update your account preferences",
      onClick: () => navigate('/account'),
      variant: "tertiary" as const,
      color: "purple"
    }
  ];

  const secondaryActions = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      label: "Analytics",
      description: "View performance insights",
      onClick: () => navigate('/analytics'),
      color: "orange"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      label: "System Settings",
      description: "Configure application settings",
      onClick: () => navigate('/settings'),
      color: "gray"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="space-y-8"
    >
      {/* Primary Actions */}
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-xl"></div>
        <motion.div 
          className="relative backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-8 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {/* Light refraction effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-50"></div>
          
          <div className="relative z-10">
            <motion.div 
              className="flex items-center space-x-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div 
                className="backdrop-blur-sm bg-white/10 border border-white/20 p-3 rounded-xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Sparkles className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-semibold text-white">Quick Actions</h3>
                <p className="text-white/80">Get started with these common tasks</p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {primaryActions.map((action, index) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.6 + (index * 0.1),
                    ease: "cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                  className="group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20"></div>
                    <motion.button
                      onClick={action.onClick}
                      className="relative w-full backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-6 text-left transition-all duration-300 hover:bg-white/10 hover:border-white/20 overflow-hidden group-hover:scale-[1.02] focus:ring-2 focus:ring-white/30 focus:outline-none"
                      whileHover={{ 
                        y: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : -4
                      }}
                      whileTap={{ 
                        scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.98 
                      }}
                    >
                      {/* Animated background overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <motion.div 
                            className={cn(
                              "backdrop-blur-sm border p-4 rounded-xl transition-all duration-300 group-hover:scale-110",
                              `bg-${action.color}-500/20 border-${action.color}-400/30`
                            )}
                            whileHover={{ rotate: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 10 }}
                          >
                            <div className={`text-${action.color}-300`}>
                              {action.icon}
                            </div>
                          </motion.div>
                          
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ x: 10 }}
                            whileHover={{ x: 0 }}
                          >
                            <ArrowRight className="h-5 w-5 text-white/60" />
                          </motion.div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold text-white group-hover:brightness-110 transition-all duration-300">
                            {action.label}
                          </h4>
                          <p className="text-white/80 text-sm leading-relaxed">
                            {action.description}
                          </p>
                        </div>
                      </div>

                      {/* Light refraction effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Secondary Actions */}
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/15 shadow-lg"></div>
        <motion.div 
          className="relative backdrop-blur-md bg-white/3 rounded-2xl border border-white/10 p-6 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {/* Light refraction effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/3 via-transparent to-white/3 opacity-50"></div>
          
          <div className="relative z-10">
            <motion.h4 
              className="text-lg font-medium text-white/90 mb-6 flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className="w-2 h-2 bg-white/40 rounded-full"></div>
              <span>Additional Tools</span>
            </motion.h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {secondaryActions.map((action, index) => (
                <motion.button
                  key={action.label}
                  onClick={action.onClick}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 1.0 + (index * 0.1),
                    ease: "cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                  className="relative group"
                >
                  <div className="absolute inset-0 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10"></div>
                  <motion.div
                    className="relative backdrop-blur-md bg-white/3 rounded-xl border border-white/10 p-4 transition-all duration-300 hover:bg-white/8 hover:border-white/20 text-left overflow-hidden"
                    whileHover={{ 
                      scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1.01,
                      y: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : -2
                    }}
                    whileTap={{ 
                      scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.99 
                    }}
                  >
                    {/* Animated background overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-transparent to-white/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 flex items-center space-x-4">
                      <motion.div 
                        className={cn(
                          "backdrop-blur-sm border p-3 rounded-lg transition-all duration-300 group-hover:scale-110",
                          `bg-${action.color}-500/15 border-${action.color}-400/25`
                        )}
                        whileHover={{ rotate: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 5 }}
                      >
                        <div className={`text-${action.color}-300`}>
                          {action.icon}
                        </div>
                      </motion.div>
                      <div className="flex-1">
                        <h5 className="text-white font-medium group-hover:brightness-110 transition-all duration-300">
                          {action.label}
                        </h5>
                        <p className="text-white/70 text-sm">
                          {action.description}
                        </p>
                      </div>
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ x: 10 }}
                        whileHover={{ x: 0 }}
                      >
                        <ArrowRight className="h-4 w-4 text-white/50" />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
