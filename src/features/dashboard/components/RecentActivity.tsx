
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Clock, User, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";

interface ActivityItem {
  id: string;
  type: 'case_created' | 'case_updated' | 'case_completed' | 'patient_added';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
  isLoading?: boolean;
}

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'case_created':
      return <FileText className="h-4 w-4" />;
    case 'case_updated':
      return <Activity className="h-4 w-4" />;
    case 'case_completed':
      return <Clock className="h-4 w-4" />;
    case 'patient_added':
      return <User className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
};

const getActivityColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'case_created':
      return 'bg-blue-500/20 text-blue-400';
    case 'case_updated':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'case_completed':
      return 'bg-green-500/20 text-green-400';
    case 'patient_added':
      return 'bg-purple-500/20 text-purple-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

export const RecentActivity: React.FC<RecentActivityProps> = ({ 
  activities = [], 
  isLoading = false 
}) => {
  // Default activities if none provided
  const defaultActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'case_created',
      title: 'New case created',
      description: 'Acute myocardial infarction case',
      timestamp: '2 hours ago',
      user: 'Dr. Smith'
    },
    {
      id: '2',
      type: 'case_updated',
      title: 'Case updated',
      description: 'Lab results added to pneumonia case',
      timestamp: '4 hours ago',
      user: 'Dr. Johnson'
    },
    {
      id: '3',
      type: 'case_completed',
      title: 'Case completed',
      description: 'Diabetes management case resolved',
      timestamp: '1 day ago',
      user: 'Dr. Williams'
    }
  ];

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  if (isLoading) {
    return (
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-white/10 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/10 rounded animate-pulse" />
                  <div className="h-3 bg-white/5 rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className={cn(
                "p-2 rounded-lg",
                getActivityColor(activity.type)
              )}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={cn(typography.body, "text-white font-medium")}>
                    {activity.title}
                  </p>
                  <span className="text-xs text-white/60">{activity.timestamp}</span>
                </div>
                <p className="text-sm text-white/70 mt-1">{activity.description}</p>
                {activity.user && (
                  <Badge variant="outline" className="mt-2 text-xs border-white/20 text-white/80">
                    {activity.user}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
