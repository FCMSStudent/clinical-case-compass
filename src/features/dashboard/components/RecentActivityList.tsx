import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, Plus, Edit, CheckCircle, BookOpen } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useDashboardData } from "../hooks/use-dashboard-data";

const activityIcons = {
  created: Plus,
  updated: Edit,
  completed: CheckCircle,
  viewed: BookOpen
};

const activityColors = {
  created: "bg-green-500/10 text-green-600 border-green-200",
  updated: "bg-blue-500/10 text-blue-600 border-blue-200",
  completed: "bg-purple-500/10 text-purple-600 border-purple-200",
  viewed: "bg-orange-500/10 text-orange-600 border-orange-200"
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
      caseId: caseItem.id
    })) : [
      { id: 1, type: 'created' as const, description: "Case 'Viral Pneumonia' created", time: "2 hours ago" },
      { id: 2, type: 'updated' as const, description: "Case 'Sprained Ankle' updated", time: "1 day ago" },
      { id: 3, type: 'viewed' as const, description: "Case 'Hypertension' reviewed", time: "3 days ago" },
    ];

  return (
    <Card className="h-full bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-6">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activityItems.length > 0 ? (
          <div className="space-y-4">
            {activityItems.map((item, index) => {
              const IconComponent = activityIcons[item.type];
              const colorClass = activityColors[item.type];
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors group"
                >
                  <div className={`p-2 rounded-lg border ${colorClass} group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-4 w-4 text-current" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground truncate">
                        {item.description}
                      </p>
                      <Badge 
                        variant="outline" 
                        className="text-xs px-2 py-0.5 capitalize"
                      >
                        {item.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No recent activity yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start creating cases to see your activity here.
            </p>
          </motion.div>
        )}
        
        {activityItems.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border/50">
            <div className="text-center">
              <Badge variant="outline" className="text-xs">
                {activityItems.length} recent activities
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivityList;
