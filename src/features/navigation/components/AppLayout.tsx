import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import EnhancedNavbar from "../EnhancedNavbar";

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen dashboard-gradient-bg relative">
      {/* Enhanced ambient glassmorphism background elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full filter blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-400/20 rounded-full filter blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-3/4 w-64 h-64 bg-indigo-400/15 rounded-full filter blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Main layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <EnhancedNavbar />
        
        <motion.main 
          className="flex-1 pt-8"
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
