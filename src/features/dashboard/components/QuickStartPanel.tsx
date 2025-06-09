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
    color: "bg-blue-400/20 text-blue-300 border-blue-300/30",
    gradient: "from-blue-400/30 to-blue-500/30",
    badge: "Popular",
    priority: 1
  },
  {
    title: "Browse Case Library",
    description: "Explore existing cases and templates for learning",
    icon: BookOpen,
    action: "/cases",
    variant: "outline" as const,
    color: "bg-green-400/20 text-green-300 border-green-300/30",
    gradient: "from-green-400/30 to-green-500/30",
    badge: "Library",
    priority: 2
  },
  {
    title: "Join Study Group",
    description: "Collaborate with peers and share insights",
    icon: Users,
    action: "/study",
    variant: "outline" as const,
    color: "bg-purple-400/20 text-purple-300 border-purple-300/30",
    gradient: "from-purple-400/30 to-purple-500/30",
    badge: "New",
    priority: 3
  },
  {
    title: "Settings & Preferences",
    description: "Customize your learning experience and preferences",
    icon: Settings,
    action: "/settings",
    variant: "ghost" as const,
    color: "bg-orange-400/20 text-orange-300 border-orange-300/30",
    gradient: "from-orange-400/30 to-orange-500/30",
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
    <div className="relative">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 h-full">
        <div className="pb-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <Zap className="h-6 w-6 text-white/80" />
                Quick Actions
              </h2>
              <p className="text-white/70">
                Get started with your clinical learning journey
              </p>
            </div>
            <div className="p-3 rounded-full bg-white/10 border border-white/20">
              <Sparkles className="h-5 w-5 text-white/80" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
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
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg"></div>
                  <div className={`
                    relative bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 cursor-pointer
                    hover:bg-white/15 hover:border-white/30 transition-all duration-300
                    ${isPopular ? 'ring-2 ring-white/20' : ''}
                  `}>
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
                            <h3 className="font-semibold text-white group-hover:text-white transition-colors">
                              {action.title}
                            </h3>
                            {action.badge && (
                              <Badge 
                                variant={isPopular ? "default" : "secondary"} 
                                className={`
                                  text-xs ${isPopular ? 'bg-white/20 text-white border-white/30' : 'bg-white/10 text-white/80 border-white/20'}
                                `}
                              >
                                {isPopular && <Star className="h-2 w-2 mr-1" />}
                                {action.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-white/70 line-clamp-2">
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
                            transition-all duration-300 group-hover:scale-105 bg-white/10 border-white/20 hover:bg-white/20 text-white
                            ${isPopular ? 'bg-white/20 hover:bg-white/30' : ''}
                          `}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
          
          {/* Learning Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="pt-6 border-t border-white/20"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10">
                    <Target className="h-4 w-4 text-white/80" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">Pro Tip</h4>
                    <p className="text-sm text-white/70">
                      Start with creating a new case to build your personal case library. 
                      The more cases you document, the better your learning insights become.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QuickStartPanel;
export { QuickStartPanel };
