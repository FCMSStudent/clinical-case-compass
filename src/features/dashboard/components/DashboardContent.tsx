
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
      className={cn(
        "p-4 rounded-lg border border-white/10 cursor-pointer transition-all duration-200 group",
        glass.subtle,
        "hover:bg-white/15 hover:scale-[1.01] hover:shadow-md"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className={cn(
            "p-2 rounded-full transition-all duration-200",
            glass.subtle,
            "group-hover:bg-white/20"
          )}>
            <Sparkles className="h-4 w-4 text-white/90" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-white text-base truncate">
              {caseItem.title || "Untitled Case"}
            </div>
            <div className="text-sm text-white/80 truncate">
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
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <Eye className="h-4 w-4 text-white/60 group-hover:text-white/80 transition-colors" />
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
      className={cn(
        "p-4 rounded-lg border border-white/10 transition-all duration-200",
        glass.subtle,
        "hover:bg-white/15 hover:shadow-sm"
      )}
    >
      <div className="flex items-start space-x-3">
        <div className={cn(
          "p-2 rounded-full",
          glass.subtle
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-medium">{title}</p>
          <p className="text-white/80 text-xs">{subtitle}</p>
          <p className="text-white/60 text-xs mt-1">{time}</p>
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
          <div className={cn("p-6 rounded-xl", glass.card)}>
            <div className="animate-pulse space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 bg-white/20 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
        <div className={cn("p-6 rounded-xl", glass.card)}>
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 bg-white/20 rounded-lg"></div>
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
        <div className={cn("p-6 rounded-xl", glass.card)}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Recent Cases</h3>
            <Badge variant="secondary" className="bg-white/15 text-white border-white/20">
              {data?.recentCases?.length || 0} cases
            </Badge>
          </div>
          
          <div className="space-y-3">
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
            <div className="text-center py-12">
              <div className={cn(
                "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center",
                glass.subtle
              )}>
                <BookOpen className="h-8 w-8 text-white/60" />
              </div>
              <p className="text-white/90 text-lg mb-2">No recent cases found</p>
              <p className="text-white/60 mb-6">Get started by creating your first case</p>
              <Button
                onClick={() => navigate('/cases/new')}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Case
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className={cn("p-6 rounded-xl", glass.card)}>
        <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
        
        <div className="space-y-4">
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
        <div className={cn(
          "mt-6 p-4 rounded-lg",
          glass.subtle
        )}>
          <h4 className="text-white font-medium mb-3">Weekly Progress</h4>
          <div className="h-20 flex items-end justify-between space-x-1">
            {[65, 45, 80, 55, 70, 90, 75].map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/30 rounded-sm flex-1"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
