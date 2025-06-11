import { Navigate } from "react-router-dom";
import { useAuth } from "@/app/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading, session } = useAuth();
  
  // Debug logging for PrivateRoute
  console.log('PrivateRoute Debug:', {
    loading,
    hasUser: !!user,
    hasSession: !!session,
    userEmail: user?.email,
    sessionUserEmail: session?.user?.email
  });
  
  if (loading) {
    console.log('PrivateRoute: Still loading...');
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    console.log('PrivateRoute: No user found, redirecting to /auth');
    return <Navigate to="/auth" replace />;
  }
  
  console.log('PrivateRoute: User authenticated, rendering children');
  return <>{children}</>;
}
