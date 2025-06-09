import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Users, Settings, Sparkles, Target, Zap, ArrowRight, Star } from "lucide-react";
import { ICON_SIZE } from "@/constants/ui";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const quickActions = [
  {
    title: "Create New Case",
    description: "Start documenting a new clinical case with AI assistance",
    icon: Plus,
    action: "/cases/new",
    variant: "default" as const,
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
    gradient: "from-blue-500 to-blue-600",
    badge: "Popular",
    priority: 1
  },
  {
    title: "Browse Case Library",
    description: "Explore existing cases and templates for learning",
    icon: BookOpen,
    action: "/cases",
    variant: "outline" as const,
    color: "bg-green-500/10 text-green-600 border-green-200",
    gradient: "from-green-500 to-green-600",
    badge: "Library",
    priority: 2
  },
  {
    title: "Join Study Group",
    description: "Collaborate with peers and share insights",
    icon: Users,
    action: "/study",
    variant: "outline" as const,
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
    gradient: "from-purple-500 to-purple-600",
    badge: "New",
    priority: 3
  },
  {
    title: "Settings & Preferences",
    description: "Customize your learning experience and preferences",
    icon: Settings,
    action: "/settings",
    variant: "ghost" as const,
    color: "bg-orange-500/10 text-orange-600 border-orange-200",
    gradient: "from-orange-500 to-orange-600",
    badge: "Configure",
    priority: 4
  }
];

const QuickStartPanel: React.FC = () => {
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    navigate(action);
  };

  return (
    <Card className="h-full border-0 bg-gradient-to-br from-card via-card to-card/90 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Quick Actions
            </CardTitle>
            <p className="text-muted-foreground">
              Get started with your clinical learning journey
            </p>
          </div>
          <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          const isPopular = action.badge === "Popular";
          
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="group"
            >
              <Card className={`
                relative overflow-hidden border-0 bg-gradient-to-r from-card/50 to-card/80 
                hover:from-card hover:to-card/90 transition-all duration-300 cursor-pointer
                ${isPopular ? 'ring-2 ring-primary/20 shadow-lg' : 'shadow-md hover:shadow-lg'}
              `}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`
                        relative p-3 rounded-xl border transition-all duration-300 group-hover:scale-110
                        ${action.color}
                      `}>
                        <div className={`
                          absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300
                          ${action.gradient}
                        `} />
                        <IconComponent className={`${ICON_SIZE} text-current relative z-10`} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {action.title}
                          </h3>
                          {action.badge && (
                            <Badge 
                              variant={isPopular ? "default" : "secondary"} 
                              className={`
                                text-xs ${isPopular ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'}
                              `}
                            >
                              {isPopular && <Star className="h-2 w-2 mr-1" />}
                              {action.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={action.variant}
                        size="sm"
                        onClick={() => handleAction(action.action)}
                        className={`
                          transition-all duration-300 group-hover:scale-105
                          ${isPopular ? 'bg-primary hover:bg-primary/90' : ''}
                        `}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
        
        {/* Learning Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="pt-6 border-t border-border/50"
        >
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Pro Tip</h4>
                <p className="text-sm text-muted-foreground">
                  Start with creating a new case to build your personal case library. 
                  The more cases you document, the better your learning insights become.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default QuickStartPanel;
export { QuickStartPanel };
