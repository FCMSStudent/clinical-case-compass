
import { Navigate } from "react-router-dom";
import { useAuth } from "@/app/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading, session } = useAuth();
  
  console.log("[PrivateRoute] Auth state:", { 
    hasUser: !!user, 
    hasSession: !!session,
    loading,
    userEmail: user?.email 
  });
  
  if (loading) {
    console.log("[PrivateRoute] Still loading, showing spinner");
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user || !session) {
    console.log("[PrivateRoute] No user/session, redirecting to /auth");
    return <Navigate to="/auth" replace />;
  }
  
  console.log("[PrivateRoute] User authenticated, rendering children");
  return <>{children}</>;
}
