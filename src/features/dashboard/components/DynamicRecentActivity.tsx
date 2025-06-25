
import { Card, CardContent } from "@/shared/components/card";
import { Activity, Clock, Plus, Edit, Eye, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/shared/components/badge";
import { Button } from "@/shared/components/button";
import { useDashboardData } from "../hooks/use-dashboard-data";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const activityIcons = {
  created: Plus,
  updated: Edit,
  viewed: Eye
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
  viewed: {
    bg: "bg-orange-500/20",
    text: "text-orange-300",
    border: "border-orange-400/30",
    icon: "bg-orange-500/30"
  }
};

export function DynamicRecentActivity() {
  const { getRecentCases, isLoading } = useDashboardData();
  const navigate = useNavigate();
  const recentCases = getRecentCases(5);

  // Generate activity items from actual case data
  const activityItems = recentCases.map((caseItem, index) => {
    const timeDiff = Date.now() - new Date(caseItem.updatedAt).getTime();
    const isRecent = timeDiff < 24 * 60 * 60 * 1000; // Less than 24 hours
    
    return {
      id: caseItem.id,
      type: isRecent ? 'updated' : index === 0 ? 'created' : 'viewed',
      description: `Case "${caseItem.title}" ${isRecent ? 'updated' : index === 0 ? 'created' : 'reviewed'}`,
      time: formatDistanceToNow(new Date(caseItem.updatedAt), { addSuffix: true }),
      caseId: caseItem.id,
      caseTitle: caseItem.title,
      patientName: caseItem.patient.name
    };
  });

  if (isLoading) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-2">
              <div className="h-6 w-32 bg-white/20 rounded animate-pulse" />
              <div className="h-4 w-48 bg-white/20 rounded animate-pulse" />
            </div>
            <div className="h-10 w-10 bg-white/20 rounded-full animate-pulse" />
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-white/20 rounded-xl" />
                  <div className="space-y-1">
                    <div className="h-4 w-32 bg-white/20 rounded" />
                    <div className="h-3 w-24 bg-white/20 rounded" />
                  </div>
                </div>
                <div className="h-6 w-16 bg-white/20 rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (activityItems.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="h-6 w-6 text-white/80" />
                Recent Activity
              </h3>
              <p className="text-white/70">Your latest case activities</p>
            </div>
          </div>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-white/40 mx-auto mb-4" />
            <p className="text-white/70 mb-4">No recent activity</p>
            <Button 
              onClick={() => navigate('/cases/new')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Your First Case
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Activity className="h-6 w-6 text-white/80" />
              Recent Activity
            </h3>
            <p className="text-white/70">Your latest case activities</p>
          </div>
          <div className="p-3 rounded-full bg-white/20 border border-white/30">
            <Clock className="h-5 w-5 text-white" />
          </div>
        </div>
        
        <div className="space-y-3">
          <AnimatePresence>
            {activityItems.map((item, index) => {
              const IconComponent = activityIcons[item.type as keyof typeof activityIcons];
              const colors = activityColors[item.type as keyof typeof activityColors];
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group"
                >
                  <div 
                    className={`
                      relative p-3 rounded-xl border transition-all duration-300 cursor-pointer
                      hover:shadow-md hover:scale-[1.02] group-hover:border-white/40
                      ${colors.bg} ${colors.border}
                    `}
                    onClick={() => navigate(`/cases/${item.caseId}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        p-2 rounded-xl ${colors.icon} border border-white/30
                        group-hover:scale-110 transition-transform duration-300
                      `}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-white/90 group-hover:text-white transition-colors">
                              {item.caseTitle}
                            </h4>
                            <p className="text-xs text-white/70">
                              Patient: {item.patientName} • {item.type}
                            </p>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${colors.bg} ${colors.text} border-white/30`}
                          >
                            {item.type}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 text-xs text-white/60">
                            <Clock className="h-3 w-3" />
                            {item.time}
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
          </AnimatePresence>
        </div>
        
        <div className="pt-4 border-t border-white/20 mt-4">
          <Button 
            variant="outline" 
            className="w-full border-white/30 text-white hover:bg-white/20"
            onClick={() => navigate('/cases')}
          >
            View All Cases
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
