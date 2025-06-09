import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, Plus, Edit, CheckCircle, BookOpen, Eye, MessageSquare, Star } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useDashboardData } from "../hooks/use-dashboard-data";
import { Button } from "@/components/ui/button";

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
    bg: "bg-green-500/10",
    text: "text-green-600",
    border: "border-green-200",
    icon: "bg-green-500/20"
  },
  updated: {
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-200",
    icon: "bg-blue-500/20"
  },
  completed: {
    bg: "bg-purple-500/10",
    text: "text-purple-600",
    border: "border-purple-200",
    icon: "bg-purple-500/20"
  },
  viewed: {
    bg: "bg-orange-500/10",
    text: "text-orange-600",
    border: "border-orange-200",
    icon: "bg-orange-500/20"
  },
  commented: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-600",
    border: "border-indigo-200",
    icon: "bg-indigo-500/20"
  },
  starred: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-600",
    border: "border-yellow-200",
    icon: "bg-yellow-500/20"
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
    <Card className="h-full border-0 bg-gradient-to-br from-card via-card to-card/90 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              Recent Activity
            </CardTitle>
            <p className="text-muted-foreground">
              Your latest case activities and updates
            </p>
          </div>
          <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <Clock className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
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
                relative p-4 rounded-lg border transition-all duration-300 cursor-pointer
                hover:shadow-md hover:scale-[1.02] group-hover:border-primary/30
                ${colors.bg} ${colors.border}
              `}>
                <div className="flex items-start gap-3">
                  <div className={`
                    p-2 rounded-lg ${colors.icon} border border-current/20
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    <IconComponent className="h-4 w-4 text-current" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                          {item.caseTitle}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${colors.bg} ${colors.text} border-current/20`}
                      >
                        {item.type}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {getTimeAgo(item.time)}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-6 px-2"
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
          className="pt-4 border-t border-border/50"
        >
          <Button 
            variant="outline" 
            className="w-full border-primary/30 text-primary hover:bg-primary/5"
          >
            View All Activities
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityList;
