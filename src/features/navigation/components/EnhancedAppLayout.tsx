
import React from "react";
import EnhancedNavbar from "@/components/navigation/EnhancedNavbar";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import UnifiedBackground from "@/components/backgrounds/UnifiedBackground";
import { motion } from "framer-motion";
import {
  pageTransitionVariants,
  reducedMotionPageTransitionVariants,
  getMotionVariants
} from "@/lib/motion";

interface EnhancedAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const EnhancedAppLayout: React.FC<EnhancedAppLayoutProps> = ({
  children,
  className = ""
}) => {
  // Get page transition variants, respecting reduced motion settings.
  const variants = getMotionVariants(pageTransitionVariants, reducedMotionPageTransitionVariants);

  return (
    <div className="min-h-screen">
      <UnifiedBackground />
      
      {/* Simplified motion wrapper with improved transitions */}
      <motion.div
        className="relative z-10 flex flex-col min-h-screen"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Floating Navbar */}
        <div className="w-full flex justify-center pt-6 px-4">
          <div className="w-full max-w-7xl">
            <EnhancedNavbar />
          </div>
        </div>
        
        <main className={`flex-1 flex flex-col ${className}`} role="main">
          <div className="container mx-auto px-4 py-6 flex-1">
            <Breadcrumbs />
            {/* Remove individual page animations to prevent conflicts */}
            {children}
          </div>
        </main>
      </motion.div>
    </div>
  );
};

export default EnhancedAppLayout;
