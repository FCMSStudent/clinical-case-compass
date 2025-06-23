import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import EnhancedNavbar from "../EnhancedNavbar";
import UnifiedBackground from "@/shared/components/UnifiedBackground";

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Unified Background with all effects */}
      <div className="absolute inset-0 dashboard-gradient-bg">
        <UnifiedBackground />
      </div>
      
      {/* Main layout - integrated with background */}
      <div className="relative flex flex-col min-h-screen">
        <EnhancedNavbar />
        
        <motion.main 
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default AppLayout;
