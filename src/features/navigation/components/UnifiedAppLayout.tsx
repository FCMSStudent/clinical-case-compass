import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/app/AuthContext";
import EnhancedNavbar from "@/components/navigation/EnhancedNavbar";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { OfflineBanner } from "@/components/ui/OfflineBanner";
import OptimizedBackground from "@/components/backgrounds/OptimizedBackground";
import { cn } from "@/lib/utils";
import { 
  pageTransitionVariants,
  reducedMotionPageTransitionVariants,
  getMotionVariants
} from "@/lib/motion";

interface UnifiedAppLayoutProps {
  children: React.ReactNode;
  className?: string;
  showBreadcrumbs?: boolean;
  showNavbar?: boolean;
}

/**
 * Unified App Layout - Single source of truth for application layout
 * Consolidates all layout concerns into one optimized component
 */
export const UnifiedAppLayout: React.FC<UnifiedAppLayoutProps> = ({
  children,
  className = "",
  showBreadcrumbs = true,
  showNavbar = true,
}) => {
  const { isOfflineMode } = useAuth();
  
  // Get optimized page transition variants
  const variants = getMotionVariants(
    pageTransitionVariants, 
    reducedMotionPageTransitionVariants
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Optimized Background System */}
      <OptimizedBackground />
      
      {/* Main Layout Container */}
      <motion.div
        className="relative z-10 flex flex-col min-h-screen"
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Offline Banner */}
        {isOfflineMode && (
          <div className="relative z-50 mb-4">
            <OfflineBanner />
          </div>
        )}

        {/* Navigation */}
        {showNavbar && (
          <div className="w-full flex justify-center pt-6 px-4 relative z-40">
            <div className="w-full max-w-7xl">
              <EnhancedNavbar />
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <main 
          className={cn(
            "flex-1 flex flex-col relative z-30",
            className
          )} 
          role="main"
        >
          {/* Content Container with Proper Spacing */}
          <div className="container mx-auto px-4 py-6 flex-1">
            {/* Breadcrumbs */}
            {showBreadcrumbs && <Breadcrumbs />}
            
            {/* Page Content */}
            <div className="mt-6">
              {children}
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
};

export default UnifiedAppLayout;