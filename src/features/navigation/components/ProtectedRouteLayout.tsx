import React from "react";
import { UnifiedAppLayout } from "@/features/navigation/components/UnifiedAppLayout";
import { PrivateRoute } from "@/features/auth/PrivateRoute";

interface ProtectedRouteLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  showNavbar?: boolean;
  className?: string;
}

/**
 * Protected Route Layout - Simplified wrapper using UnifiedAppLayout
 */
const ProtectedRouteLayout: React.FC<ProtectedRouteLayoutProps> = ({ 
  children,
  showBreadcrumbs = true,
  showNavbar = true,
  className
}) => {
  return (
    <PrivateRoute>
      <UnifiedAppLayout 
        showBreadcrumbs={showBreadcrumbs}
        showNavbar={showNavbar}
        className={className}
      >
        {children}
      </UnifiedAppLayout>
    </PrivateRoute>
  );
};

export default ProtectedRouteLayout;
