import React from "react";
import { EnhancedAppLayout } from "@/features/navigation/components/EnhancedAppLayout";
import { PrivateRoute } from "@/features/auth/PrivateRoute";
import { OfflineBanner } from "@/components/ui/OfflineBanner";
import { useAuth } from "@/app/AuthContext"; // Import useAuth

interface ProtectedRouteLayoutProps {
  children: React.ReactNode;
}

const ProtectedRouteLayout: React.FC<ProtectedRouteLayoutProps> = ({ children }) => {
  const { isOfflineMode } = useAuth(); // Get isOfflineMode from useAuth

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
