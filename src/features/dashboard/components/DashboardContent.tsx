import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, BookOpen, Eye, Calendar, User, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/button";
import { Badge } from "@/shared/components/badge";
import { cn } from "@/shared/utils/utils";
import type { MedicalCase } from "@/shared/types/case";

interface DashboardContentProps {
  data: {
    recentCases: MedicalCase[];
    totalCases: number;
  } | null;
  isLoading: boolean;
}

const RecentCaseItem: React.FC<{
  caseItem: MedicalCase;
  index: number;
  onClick: () => void;
}> = ({ caseItem, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)"
      }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10"></div>
        <motion.div 
          className="relative backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20 overflow-hidden"
          whileHover={{ 
            scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1.01,
            y: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : -2
          }}
        >
          {/* Animated background overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <motion.div 
                className="backdrop-blur-sm bg-white/10 border border-white/20 p-3 rounded-full transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110"
                whileHover={{ rotate: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 10 }}
              >
                <Sparkles className="h-5 w-5 text-white" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-lg truncate transition-all duration-300 group-hover:brightness-110">
                  {caseItem.title || "Untitled Case"}
                </div>
                <div className="text-base text-white/90 truncate">
                  {caseItem.patient ? 
                    `${caseItem.patient.name}, ${caseItem.patient.age} y/o ${caseItem.patient.gender}` : 
                    "Patient N/A"
                  }
                  {caseItem.chiefComplaint && 
                    ` • ${caseItem.chiefComplaint.substring(0, 40)}${caseItem.chiefComplaint.length > 40 ? "..." : ""}`
                  }
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-3 h-3 rounded-full bg-green-400 shadow-md"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Eye className="h-5 w-5 text-white/80 group-hover:text-white transition-colors duration-300" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ActivityItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  time: string;
  index: number;
}> = ({ icon, title, subtitle, time, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)"
      }}
      className="group"
    >
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10"></div>
        <motion.div 
          className="relative backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
          whileHover={{ scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1.01 }}
        >
          <div className="flex items-start space-x-4 relative z-10">
            <motion.div 
              className="backdrop-blur-sm bg-white/10 border border-white/20 p-3 rounded-full transition-all duration-300 group-hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
            >
              {icon}
            </motion.div>
            <div className="flex-1">
              <p className="text-white text-base font-medium transition-all duration-300 group-hover:brightness-110">{title}</p>
              <p className="text-white/90 text-sm">{subtitle}</p>
              <p className="text-white/70 text-sm mt-1">{time}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const DashboardContent: React.FC<DashboardContentProps> = ({
  data,
  isLoading
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative">
            <div className="absolute inset-0 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20"></div>
            <div className="relative backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="animate-pulse space-y-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-20 bg-white/20 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20"></div>
          <div className="relative backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-8">
            <div className="animate-pulse space-y-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-white/20 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const activities = [
    {
      icon: <User className="h-4 w-4 text-blue-300" />,
      title: "Case updated",
      subtitle: "Hypertension case reviewed",
      time: "2 hours ago"
    },
    {
      icon: <Plus className="h-4 w-4 text-green-300" />,
      title: "New case created",
      subtitle: "Diabetes management case",
      time: "5 hours ago"
    },
    {
      icon: <Calendar className="h-4 w-4 text-purple-300" />,
      title: "Appointment scheduled",
      subtitle: "Follow-up consultation",
      time: "1 day ago"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Recent Cases */}
      <div className="lg:col-span-2">
        <div className="relative">
          <div className="absolute inset-0 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-xl"></div>
          <motion.div 
            className="relative backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-8 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            {/* Light refraction effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-50"></div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <motion.h3 
                className="text-2xl font-semibold text-white transition-all duration-300 hover:brightness-110"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                Recent Cases
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <Badge variant="secondary" className="backdrop-blur-sm bg-white/10 border border-white/20 text-white text-lg px-4 py-2">
                  {data?.recentCases?.length || 0} cases
                </Badge>
              </motion.div>
            </div>
            
            <div className="space-y-4 relative z-10">
              <AnimatePresence>
                {data?.recentCases?.slice(0, 5).map((caseItem, index) => (
                  <RecentCaseItem
                    key={caseItem.id}
                    caseItem={caseItem}
                    index={index}
                    onClick={() => navigate(`/cases/${caseItem.id}`)}
                  />
                ))}
              </AnimatePresence>
            </div>
            
            {(!data?.recentCases || data.recentCases.length === 0) && (
              <motion.div 
                className="text-center py-16 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.div 
                  className="backdrop-blur-sm bg-white/10 border border-white/20 w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <BookOpen className="h-10 w-10 text-white/80" />
                </motion.div>
                <p className="text-white text-xl mb-3 font-medium">No recent cases found</p>
                <p className="text-white/80 mb-8 text-lg">Get started by creating your first case</p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => navigate('/cases/new')}
                    className="backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 text-white text-lg px-6 py-3 transition-all duration-300"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Create Your First Case
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-xl"></div>
        <motion.div 
          className="relative backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <motion.h3 
            className="text-2xl font-semibold text-white mb-8 transition-all duration-300 hover:brightness-110"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Recent Activity
          </motion.h3>
          
          <div className="space-y-5 relative z-10">
            {activities.map((activity, index) => (
              <ActivityItem
                key={index}
                icon={activity.icon}
                title={activity.title}
                subtitle={activity.subtitle}
                time={activity.time}
                index={index}
              />
            ))}
          </div>

          {/* Mini Chart */}
          <motion.div 
            className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl mt-8 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h4 className="text-white font-medium mb-4 text-lg">Weekly Progress</h4>
            <div className="h-24 flex items-end justify-between space-x-2">
              {[65, 45, 80, 55, 70, 90, 75].map((height, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.6 + index * 0.1,
                    ease: "cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                  className="bg-white/40 rounded-sm flex-1 hover:bg-white/60 transition-colors duration-300"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
