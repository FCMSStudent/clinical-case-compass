
import React from "react";
import { motion } from "framer-motion";
import { Plus, BookOpen, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/button";
import { cn } from "@/shared/utils/utils";

export const DashboardQuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: <Plus className="h-5 w-5" />,
      label: "Create New Case",
      onClick: () => navigate('/cases/new'),
      variant: "primary" as const
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Browse Cases",
      onClick: () => navigate('/cases'),
      variant: "secondary" as const
    },
    {
      icon: <UserRound className="h-5 w-5" />,
      label: "Profile Settings",
      onClick: () => navigate('/account'),
      variant: "outline" as const
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="auth-glass-container max-w-5xl mx-auto p-8 rounded-2xl"
    >
      <h3 className="text-2xl font-semibold text-white mb-8 text-center">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={action.onClick}
              variant={action.variant}
              className="auth-glass-container w-full py-6 flex items-center justify-center space-x-3 text-white font-medium text-lg hover:scale-105 transition-all duration-200 border-0"
            >
              <span className="p-1 rounded-full auth-glass-container">
                {action.icon}
              </span>
              <span>{action.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
