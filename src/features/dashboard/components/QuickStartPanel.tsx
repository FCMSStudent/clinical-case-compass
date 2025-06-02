
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Plus, BookOpen, Users, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quickActions = [
  {
    title: "Create New Case",
    description: "Start documenting a new clinical case",
    icon: Plus,
    action: "/cases/new",
    variant: "default" as const
  },
  {
    title: "Browse Case Library",
    description: "Explore existing cases and templates",
    icon: BookOpen,
    action: "/cases",
    variant: "outline" as const
  },
  {
    title: "Join Study Group",
    description: "Collaborate with peers on cases",
    icon: Users,
    action: "/study",
    variant: "outline" as const
  },
  {
    title: "Settings & Preferences",
    description: "Customize your learning experience",
    icon: Settings,
    action: "/settings",
    variant: "ghost" as const
  }
];

export const QuickStartPanel = () => {
  const navigate = useNavigate();

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={action.title}
                variant={action.variant}
                className="h-auto p-4 justify-start"
                onClick={() => navigate(action.action)}
              >
                <div className="flex items-start space-x-3">
                  <IconComponent className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {action.description}
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
