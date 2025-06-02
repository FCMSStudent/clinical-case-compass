
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, FileText, CheckCircle2 } from "lucide-react";

const recentItems = [
  {
    id: 1,
    type: 'case_completed',
    title: 'Acute MI Case',
    subtitle: 'Cardiology',
    time: '2 hours ago',
    icon: CheckCircle2,
    iconColor: 'text-green-600'
  },
  {
    id: 2,
    type: 'draft_saved',
    title: 'Pneumonia Assessment',
    subtitle: 'Internal Medicine',
    time: '4 hours ago',
    icon: FileText,
    iconColor: 'text-blue-600'
  },
  {
    id: 3,
    type: 'case_started',
    title: 'Hypertension Management',
    subtitle: 'Family Medicine',
    time: '1 day ago',
    icon: User,
    iconColor: 'text-purple-600'
  }
];

export const RecentActivity = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <IconComponent className={`h-4 w-4 mt-0.5 ${item.iconColor}`} />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{item.title}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{item.subtitle}</Badge>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
