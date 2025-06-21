
import React from "react";
import { EnhancedAppLayout } from "@/features/navigation/components/EnhancedAppLayout";
import PrivateRoute from "@/features/auth/PrivateRoute";
import { OfflineBanner } from "@/shared/components/OfflineBanner";
import { useAuth } from "@/app/providers/AuthContext";

interface ProtectedRouteLayoutProps {
  children: React.ReactNode;
}

const ProtectedRouteLayout: React.FC<ProtectedRouteLayoutProps> = ({ children }) => {
  const { isOfflineMode } = useAuth();

  return (
    <PrivateRoute>
      <EnhancedAppLayout>
        {isOfflineMode && (
          <div className="mb-4">
            <OfflineBanner />
          </div>
        )}
        {children}
      </EnhancedAppLayout>
    </PrivateRoute>
  );
};

export default ProtectedRouteLayout;
