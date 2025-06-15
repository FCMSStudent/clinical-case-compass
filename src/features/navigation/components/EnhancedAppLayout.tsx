
import React from "react";
import EnhancedNavbar from "@/components/navigation/EnhancedNavbar";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import UnifiedBackground from "@/components/backgrounds/UnifiedBackground";
import { motion } from "framer-motion"; // Added motion
import {
  pageTransitionVariants,
  reducedMotionPageTransitionVariants,
  getMotionVariants
} from "@/lib/motion"; // Added motion imports

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
    <div className="min-h-screen"> {/* Base container for background, not part of the animation. */}
      <UnifiedBackground />
      
      {/* This motion.div wraps the main page content and applies page transition animations. */}
      {/* It's keyed by the route in App.tsx's AnimatePresence setup. */}
      <motion.div
        className="relative z-10 flex flex-col min-h-screen"
        variants={variants}
        initial="initial" // Start state for the animation (e.g., opacity 0, off-screen)
        animate="animate" // End state for the animation (e.g., opacity 1, on-screen)
        exit="exit"       // State for when the component is unmounting (e.g., opacity 0, off-screen)
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
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EnhancedAppLayout;
