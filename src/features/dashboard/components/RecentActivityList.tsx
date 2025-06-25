import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { Activity, Clock, Plus, Edit, CheckCircle, BookOpen, Eye, MessageSquare, Star } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/shared/components/badge";
import { useDashboardData } from "../hooks/use-dashboard-data";
import { Button } from "@/shared/components/button";

const activityIcons = {
  created: Plus,
  updated: Edit,
  completed: CheckCircle,
  viewed: BookOpen,
  commented: MessageSquare,
  starred: Star
};

const activityColors = {
  created: {
    bg: "bg-green-500/20",
    text: "text-green-300",
    border: "border-green-400/30",
    icon: "bg-green-500/30"
  },
  updated: {
    bg: "bg-blue-500/20",
    text: "text-blue-300",
    border: "border-blue-400/30",
    icon: "bg-blue-500/30"
  },
  completed: {
    bg: "bg-purple-500/20",
    text: "text-purple-300",
    border: "border-purple-400/30",
    icon: "bg-purple-500/30"
  },
  viewed: {
    bg: "bg-orange-500/20",
    text: "text-orange-300",
    border: "border-orange-400/30",
    icon: "bg-orange-500/30"
  },
  commented: {
    bg: "bg-indigo-500/20",
    text: "text-indigo-300",
    border: "border-indigo-400/30",
    icon: "bg-indigo-500/30"
  },
  starred: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-300",
    border: "border-yellow-400/30",
    icon: "bg-yellow-500/30"
  }
};

const RecentActivityList: React.FC = () => {
  const { getRecentCases } = useDashboardData();
  const recentCases = getRecentCases(5);

  // Generate activity items from recent cases
  const activityItems = recentCases.length > 0 ? 
    recentCases.map((caseItem, index) => ({
      id: caseItem.id,
      type: index === 0 ? 'updated' : index === 1 ? 'created' : 'viewed',
      description: `Case '${caseItem.title}' ${index === 0 ? 'updated' : index === 1 ? 'created' : 'viewed'}`,
      time: new Date(caseItem.updatedAt).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      caseId: caseItem.id,
      caseTitle: caseItem.title
    })) : [
      { id: 1, type: 'created' as const, description: "Case 'Viral Pneumonia' created", time: "2 hours ago", caseTitle: "Viral Pneumonia" },
      { id: 2, type: 'updated' as const, description: "Case 'Sprained Ankle' updated", time: "1 day ago", caseTitle: "Sprained Ankle" },
      { id: 3, type: 'viewed' as const, description: "Case 'Hypertension' reviewed", time: "3 days ago", caseTitle: "Hypertension" },
      { id: 4, type: 'completed' as const, description: "Case 'Diabetes Management' completed", time: "1 week ago", caseTitle: "Diabetes Management" },
      { id: 5, type: 'commented' as const, description: "Added notes to 'Cardiac Arrest'", time: "2 weeks ago", caseTitle: "Cardiac Arrest" }
    ];

  const getTimeAgo = (time: string) => {
    // Simple time ago calculation for demo
    if (time.includes('hours')) return time;
    if (time.includes('day')) return time;
    if (time.includes('week')) return time;
    return time;
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
        <div className="pb-6 pt-6 px-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                <Activity className="h-6 w-6 text-white/80" />
                Recent Activity
              </h3>
              <p className="text-white/70">
                Your latest case activities and updates
              </p>
            </div>
            <div className="p-3 rounded-full bg-white/20 border border-white/30">
              <Clock className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        <div className="px-6 pb-6 space-y-4">
          {activityItems.map((item, index) => {
            const IconComponent = activityIcons[item.type];
            const colors = activityColors[item.type];
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                className="group"
              >
                <div className={`
                  relative p-4 rounded-xl border transition-all duration-300 cursor-pointer
                  hover:shadow-md hover:scale-[1.02] group-hover:border-white/40
                  ${colors.bg} ${colors.border}
                `}>
                  <div className="flex items-start gap-3">
                    <div className={`
                      p-2 rounded-xl ${colors.icon} border border-white/30
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm line-clamp-1 group-hover:text-white transition-colors text-white/90">
                            {item.caseTitle}
                          </h4>
                          <p className="text-xs text-white/70 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${colors.bg} ${colors.text} border-white/30`}
                        >
                          {item.type}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-white/60">
                          <Clock className="h-3 w-3" />
                          {getTimeAgo(item.time)}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-6 px-2 text-white hover:bg-white/20"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {/* View All Activities Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            className="pt-4 border-t border-white/20"
          >
            <Button 
              variant="outline" 
              className="w-full border-white/30 text-white hover:bg-white/20"
            >
              View All Activities
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityList;
