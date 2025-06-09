import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Users, Settings, Sparkles, Target, Zap } from "lucide-react";
import { ICON_SIZE } from "@/constants/ui";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const quickActions = [
  {
    title: "Create New Case",
    description: "Start documenting a new clinical case",
    icon: Plus,
    action: "/cases/new",
    variant: "default" as const,
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    title: "Browse Case Library",
    description: "Explore existing cases and templates",
    icon: BookOpen,
    action: "/cases",
    variant: "outline" as const,
    color: "bg-green-500/10 text-green-600 border-green-200",
    gradient: "from-green-500 to-green-600"
  },
  {
    title: "Join Study Group",
    description: "Collaborate with peers on cases",
    icon: Users,
    action: "/study",
    variant: "outline" as const,
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    title: "Settings & Preferences",
    description: "Customize your learning experience",
    icon: Settings,
    action: "/settings",
    variant: "ghost" as const,
    color: "bg-orange-500/10 text-orange-600 border-orange-200",
    gradient: "from-orange-500 to-orange-600"
  }
];

export const QuickStartPanel = () => {
  const navigate = useNavigate();

  return (
    <Card className="h-full bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            <span>Most Used</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={action.variant}
                  className={`
                    h-auto p-4 justify-start w-full transition-all duration-300
                    ${action.variant === 'default' ? 
                      `bg-gradient-to-r ${action.gradient} hover:shadow-lg hover:shadow-blue-500/25` : 
                      'hover:shadow-md hover:border-primary/50'
                    }
                  `}
                  onClick={() => navigate(action.action)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg border ${action.color}`}>
                      <IconComponent className={`${ICON_SIZE} text-current`} />
                    </div>
                    <div className="text-left flex-wrap whitespace-normal">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-sm font-medium text-muted-foreground mt-1">
                        {action.description}
                      </div>
                    </div>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Target className="h-4 w-4" />
            <span>Pro tip: Use the search bar above to quickly find specific cases or symptoms</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
