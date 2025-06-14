
import React from "react";
import EnhancedNavbar from "@/components/navigation/EnhancedNavbar";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import ParallaxBackground from "@/components/ui/parallax-background";

interface EnhancedAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const EnhancedAppLayout: React.FC<EnhancedAppLayoutProps> = ({
  children,
  className = ""
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900">
      <ParallaxBackground />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <EnhancedNavbar />
        
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
