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

  // The parent component (Dashboard.tsx) now provides the main glass-panel container for "Recent Activity".
  // This component will render the list directly.
  // The header part (title like "Recent Activity", icon) that was previously inside this component
  // is now handled by Dashboard.tsx's structure for the panel that wraps <DynamicRecentActivity />.
  return (
    // This div is equivalent to the <ul>, space-y-4 applied as per spec
    <div className="space-y-4">
      {activityItems.map((item, index) => {
        const IconComponent = activityIcons[item.type];
        // const colors = activityColors[item.type]; // Colors are removed for the new simpler design

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            // Applying glass-panel p-4 to each list item. Added flex, items-center, justify-between from spec.
            className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-[16px] p-4 hover:shadow-lg transition group cursor-pointer flex items-center justify-between"
          >
            {/* Left part of the item: icon + text */}
            <span className="flex items-center flex-grow min-w-0 mr-3"> {/* Added mr-3 for spacing */}
              {/* Icon section - applying glass-inner */}
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full mr-3 flex-shrink-0">
                <IconComponent className="h-5 w-5 text-white/70" /> {/* Standardized icon style */}
              </div>

              {/* Text content div */}
              <div className="flex-grow min-w-0">
                <div className="font-semibold text-white text-base truncate" title={item.caseTitle || item.description}>
                  {/* Displaying a concise title: either caseTitle or first few words of description */}
                  {item.caseTitle || `${item.description.split(" ").slice(0, 4).join(" ")}${item.description.split(" ").length > 4 ? "..." : ""}`}
                </div>
                <div className="text-sm text-white/70 truncate">
                  {/* Subtitle: type of action and time */}
                  <span className="capitalize">{item.type}</span> • {getTimeAgo(item.time)}
                </div>
              </div>
            </span>

            {/* Right Section: Using a simple status dot as per spec example for li */}
            <span className="inline-block w-3 h-3 rounded-full bg-green-400/80 flex-shrink-0"></span>
            {/* Original Badge for item.type and Eye button are omitted to match simplified spec list item.
                If specific actions per item are needed, they would be added here or contextually.
            */}
          </motion.div>
        );
      })}

      {/* "View All Activities" Button - styling will be reviewed in button step. Placeholder for structure. */}
      {activityItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: activityItems.length * 0.1 + 0.1, ease: "easeOut" }}
          className="pt-4 border-t border-white/20"
        >
          <Button
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/20 rounded-[16px] py-3 text-base"
          >
            View All Activities
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default RecentActivityList;
