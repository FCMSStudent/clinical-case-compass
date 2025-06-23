
import React from "react";
import { motion } from "framer-motion";
import { Plus, BookOpen, Eye, Calendar, User, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/button";
import { Badge } from "@/shared/components/badge";
import { glass } from "@/design-system/components/components";
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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className="glass-panel-list cursor-pointer group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="glass-inner p-3 rounded-full">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-white text-lg truncate">
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
          <div className="w-3 h-3 rounded-full bg-green-400 shadow-md animate-pulse"></div>
          <Eye className="h-5 w-5 text-white/80 group-hover:text-white transition-colors" />
        </div>
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="glass-panel-list"
    >
      <div className="flex items-start space-x-4">
        <div className="glass-inner p-3 rounded-full">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-white text-base font-medium">{title}</p>
          <p className="text-white/90 text-sm">{subtitle}</p>
          <p className="text-white/70 text-sm mt-1">{time}</p>
        </div>
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
          <div className="glass-panel-large">
            <div className="animate-pulse space-y-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-20 bg-white/25 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
        <div className="glass-panel-large">
          <div className="animate-pulse space-y-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-white/25 rounded-lg"></div>
            ))}
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
        <div className="glass-panel-large">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold text-white">Recent Cases</h3>
            <Badge variant="secondary" className="glass-inner text-white text-lg px-4 py-2">
              {data?.recentCases?.length || 0} cases
            </Badge>
          </div>
          
          <div className="space-y-4">
            {data?.recentCases?.slice(0, 5).map((caseItem, index) => (
              <RecentCaseItem
                key={caseItem.id}
                caseItem={caseItem}
                index={index}
                onClick={() => navigate(`/cases/${caseItem.id}`)}
              />
            ))}
          </div>
          
          {(!data?.recentCases || data.recentCases.length === 0) && (
            <div className="text-center py-16">
              <div className="glass-inner w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-white/80" />
              </div>
              <p className="text-white text-xl mb-3 font-medium">No recent cases found</p>
              <p className="text-white/80 mb-8 text-lg">Get started by creating your first case</p>
              <Button
                onClick={() => navigate('/cases/new')}
                className="glass-inner hover:bg-white/25 text-white text-lg px-6 py-3"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Case
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-panel-large">
        <h3 className="text-2xl font-semibold text-white mb-8">Recent Activity</h3>
        
        <div className="space-y-5">
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
        <div className="glass-inner mt-8">
          <h4 className="text-white font-medium mb-4 text-lg">Weekly Progress</h4>
          <div className="h-24 flex items-end justify-between space-x-2">
            {[65, 45, 80, 55, 70, 90, 75].map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/40 rounded-sm flex-1"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
