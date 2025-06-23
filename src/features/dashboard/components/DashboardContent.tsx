import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, BookOpen, Eye, Calendar, User, Sparkles, Clock, AlertCircle, CheckCircle2, Filter, Stethoscope, Activity, Users } from "lucide-react";
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

// Tab definitions
const tabs = [
  { id: 'recent', label: 'Recent Cases', icon: BookOpen },
  { id: 'today', label: "Today's Activities", icon: Calendar },
  { id: 'upcoming', label: 'Upcoming', icon: Clock }
];

// Filter chip definitions
const filterChips = [
  { id: 'all', label: 'All', color: 'blue' },
  { id: 'active', label: 'Active', color: 'green' },
  { id: 'completed', label: 'Completed', color: 'purple' },
  { id: 'urgent', label: 'Urgent', color: 'red' }
];

// Priority color mapping
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'red';
    case 'medium': return 'orange';
    case 'low': return 'green';
    default: return 'blue';
  }
};

// Status color mapping
const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'green';
    case 'completed': return 'purple';
    case 'draft': return 'orange';
    case 'archived': return 'gray';
    default: return 'blue';
  }
};

const EnhancedCaseCard: React.FC<{
  caseItem: MedicalCase;
  index: number;
  onClick: () => void;
}> = ({ caseItem, index, onClick }) => {
  const priorityColor = getPriorityColor(caseItem.priority);
  const statusColor = getStatusColor(caseItem.status);
  
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
          className="relative backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:bg-white/10 hover:border-white/20 overflow-hidden"
          whileHover={{ 
            scale: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1.01,
            y: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : -2
          }}
        >
          {/* Animated background overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Header with priority and status */}
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <motion.div 
                className={cn(
                  "backdrop-blur-sm border p-3 rounded-full transition-all duration-300 group-hover:scale-110",
                  `bg-${priorityColor}-500/20 border-${priorityColor}-400/30`
                )}
                whileHover={{ rotate: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 10 }}
              >
                <Stethoscope className={`h-5 w-5 text-${priorityColor}-300`} />
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-lg truncate transition-all duration-300 group-hover:brightness-110">
                  {caseItem.title || "Untitled Case"}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-xs px-2 py-1 backdrop-blur-sm border",
                      `bg-${statusColor}-500/20 text-${statusColor}-200 border-${statusColor}-400/30`
                    )}
                  >
                    {caseItem.status}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-xs px-2 py-1 backdrop-blur-sm border",
                      `bg-${priorityColor}-500/20 text-${priorityColor}-200 border-${priorityColor}-400/30`
                    )}
                  >
                    {caseItem.priority} priority
                  </Badge>
                  {caseItem.specialty && (
                    <Badge variant="outline" className="text-xs px-2 py-1 backdrop-blur-sm bg-white/10 text-white/80 border-white/20">
                      {caseItem.specialty}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <motion.div 
                className={cn(
                  "w-3 h-3 rounded-full shadow-md",
                  caseItem.status === 'active' ? 'bg-green-400' : 
                  caseItem.status === 'completed' ? 'bg-purple-400' : 'bg-orange-400'
                )}
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

          {/* Patient information */}
          <div className="space-y-3 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-white/60" />
                <span className="text-white/90 text-sm">
                  {caseItem.patient ? 
                    `${caseItem.patient.name}, ${caseItem.patient.age} y/o ${caseItem.patient.gender}` : 
                    "Patient N/A"
                  }
                </span>
              </div>
            </div>
            
            {caseItem.chiefComplaint && (
              <div className="text-white/80 text-sm line-clamp-2">
                <span className="font-medium text-white/90">Chief Complaint:</span> {caseItem.chiefComplaint}
              </div>
            )}

            {/* Timestamps and metadata */}
            <div className="flex items-center justify-between text-xs text-white/60 pt-2 border-t border-white/10">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Updated {new Date(caseItem.updatedAt).toLocaleDateString()}</span>
                </div>
                {caseItem.tags && caseItem.tags.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <span>{caseItem.tags.length} tags</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {caseItem.priority === 'high' && (
                  <AlertCircle className="h-3 w-3 text-red-400" />
                )}
                {caseItem.status === 'completed' && (
                  <CheckCircle2 className="h-3 w-3 text-green-400" />
                )}
              </div>
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
  type: 'case' | 'patient' | 'appointment' | 'system';
  index: number;
}> = ({ icon, title, subtitle, time, type, index }) => {
  const getActivityColor = () => {
    switch (type) {
      case 'case': return 'blue';
      case 'patient': return 'green';
      case 'appointment': return 'purple';
      case 'system': return 'orange';
      default: return 'blue';
    }
  };

  const color = getActivityColor();

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
              className={cn(
                "backdrop-blur-sm border p-3 rounded-full transition-all duration-300 group-hover:scale-110",
                `bg-${color}-500/20 border-${color}-400/30`
              )}
              whileHover={{ scale: 1.1 }}
            >
              {icon}
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-white text-base font-medium transition-all duration-300 group-hover:brightness-110">{title}</p>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs px-2 py-1 backdrop-blur-sm border",
                    `bg-${color}-500/20 text-${color}-200 border-${color}-400/30`
                  )}
                >
                  {type}
                </Badge>
              </div>
              <p className="text-white/90 text-sm mt-1">{subtitle}</p>
              <p className="text-white/70 text-sm mt-2 flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{time}</span>
              </p>
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
  const [activeTab, setActiveTab] = useState('recent');
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter cases based on active filter
  const getFilteredCases = () => {
    if (!data?.recentCases) return [];
    
    switch (activeFilter) {
      case 'active':
        return data.recentCases.filter(c => c.status === 'active');
      case 'completed':
        return data.recentCases.filter(c => c.status === 'completed');
      case 'urgent':
        return data.recentCases.filter(c => c.priority === 'high');
      default:
        return data.recentCases;
    }
  };

  const filteredCases = getFilteredCases();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative">
            <div className="absolute inset-0 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20"></div>
            <div className="relative backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-8">
              <div className="animate-pulse space-y-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-24 bg-white/20 rounded-lg"></div>
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
                <div key={i} className="h-20 bg-white/20 rounded-lg"></div>
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
      subtitle: "Hypertension case reviewed and updated with new lab results",
      time: "2 hours ago",
      type: 'case' as const
    },
    {
      icon: <Plus className="h-4 w-4 text-green-300" />,
      title: "New patient added",
      subtitle: "Sarah Johnson, 45 y/o female - Diabetes management",
      time: "5 hours ago",
      type: 'patient' as const
    },
    {
      icon: <Calendar className="h-4 w-4 text-purple-300" />,
      title: "Appointment scheduled",
      subtitle: "Follow-up consultation for cardiac case review",
      time: "1 day ago",
      type: 'appointment' as const
    },
    {
      icon: <Activity className="h-4 w-4 text-orange-300" />,
      title: "System backup completed",
      subtitle: "Daily backup completed successfully",
      time: "2 days ago",
      type: 'system' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content Area */}
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
            
            {/* Enhanced Header with Tabs */}
            <div className="space-y-6 mb-8 relative z-10">
              <div className="flex items-center justify-between">
                <motion.h3 
                  className="text-2xl font-semibold text-white transition-all duration-300 hover:brightness-110"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  Dashboard Overview
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <Badge variant="secondary" className="backdrop-blur-sm bg-white/10 border border-white/20 text-white text-lg px-4 py-2">
                    {filteredCases?.length || 0} items
                  </Badge>
                </motion.div>
              </div>

              {/* Tab Navigation */}
              <motion.div
                className="flex space-x-2 p-1 backdrop-blur-sm bg-white/10 rounded-2xl border border-white/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 relative",
                      activeTab === tab.id 
                        ? "bg-white/20 text-white shadow-lg" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="font-medium">{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        className="absolute inset-0 bg-white/10 rounded-xl"
                        layoutId="activeTab"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                  </button>
                ))}
              </motion.div>

              {/* Filter Chips */}
              {activeTab === 'recent' && (
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Filter className="h-4 w-4 text-white/60" />
                  <div className="flex space-x-2">
                    {filterChips.map((chip) => (
                      <button
                        key={chip.id}
                        onClick={() => setActiveFilter(chip.id)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border backdrop-blur-sm",
                          activeFilter === chip.id 
                            ? `bg-${chip.color}-500/20 text-${chip.color}-200 border-${chip.color}-400/30` 
                            : "bg-white/10 text-white/70 border-white/20 hover:bg-white/15 hover:text-white"
                        )}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Tab Content */}
            <div className="space-y-4 relative z-10">
              <AnimatePresence mode="wait">
                {activeTab === 'recent' && (
                  <motion.div
                    key="recent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    {filteredCases?.slice(0, 5).map((caseItem, index) => (
                      <EnhancedCaseCard
                        key={caseItem.id}
                        caseItem={caseItem}
                        index={index}
                        onClick={() => navigate(`/cases/${caseItem.id}`)}
                      />
                    ))}
                  </motion.div>
                )}

                {activeTab === 'today' && (
                  <motion.div
                    key="today"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4"
                  >
                    {activities.slice(0, 3).map((activity, index) => (
                      <ActivityItem
                        key={index}
                        icon={activity.icon}
                        title={activity.title}
                        subtitle={activity.subtitle}
                        time={activity.time}
                        type={activity.type}
                        index={index}
                      />
                    ))}
                  </motion.div>
                )}

                {activeTab === 'upcoming' && (
                  <motion.div
                    key="upcoming"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-16"
                  >
                    <motion.div 
                      className="backdrop-blur-sm bg-white/10 border border-white/20 w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Calendar className="h-10 w-10 text-white/80" />
                    </motion.div>
                    <p className="text-white text-xl mb-3 font-medium">No upcoming items</p>
                    <p className="text-white/80 mb-8 text-lg">Your schedule is clear for now</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {(!filteredCases || filteredCases.length === 0) && activeTab === 'recent' && (
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
                <p className="text-white text-xl mb-3 font-medium">No cases found</p>
                <p className="text-white/80 mb-8 text-lg">
                  {activeFilter === 'all' ? 'Get started by creating your first case' : `No ${activeFilter} cases found`}
                </p>
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

      {/* Enhanced Activity Sidebar */}
      <div className="relative">
        <div className="absolute inset-0 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-xl"></div>
        <motion.div 
          className="relative backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <motion.h3 
            className="text-2xl font-semibold text-white mb-8 transition-all duration-300 hover:brightness-110 flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Activity className="h-6 w-6" />
            <span>Recent Activity</span>
          </motion.h3>
          
          <div className="space-y-5 relative z-10">
            {activities.map((activity, index) => (
              <ActivityItem
                key={index}
                icon={activity.icon}
                title={activity.title}
                subtitle={activity.subtitle}
                time={activity.time}
                type={activity.type}
                index={index}
              />
            ))}
          </div>

          {/* Enhanced Mini Chart */}
          <motion.div 
            className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl mt-8 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium text-lg flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Weekly Progress</span>
              </h4>
              <Badge variant="outline" className="backdrop-blur-sm bg-green-500/20 text-green-200 border-green-400/30 text-xs">
                +12%
              </Badge>
            </div>
            <div className="h-32 flex items-end justify-between space-x-2">
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
                  className="bg-gradient-to-t from-blue-500/40 to-blue-300/40 rounded-sm flex-1 hover:from-blue-500/60 hover:to-blue-300/60 transition-colors duration-300 min-h-[8px]"
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-white/60 mt-3">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
