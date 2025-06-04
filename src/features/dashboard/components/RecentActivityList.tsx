import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const activityItems = [
  { id: 1, description: "Case 'Viral Pneumonia' updated", time: "2 hours ago" },
  { id: 2, description: "New case 'Sprained Ankle' created", time: "1 day ago" },
  { id: 3, description: "Settings updated: Notifications enabled", time: "3 days ago" },
];

export const RecentActivityList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activityItems.length > 0 ? (
          <ul className="space-y-4">
            {activityItems.map((item) => (
              <li key={item.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <span className="text-sm text-muted-foreground">●</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {item.description}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No recent activity yet.</p>
        )}
      </CardContent>
    </Card>
  );
};
