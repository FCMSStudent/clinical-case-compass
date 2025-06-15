import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "./AuthContext";
import { ThemeProvider } from "@/lib/themes";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { EnhancedAppLayout } from "@/features/navigation/components/EnhancedAppLayout";
import { PrivateRoute } from "@/features/auth/PrivateRoute";
import { OfflineBanner } from "@/components/ui/OfflineBanner";
import LoadingScreen from "@/components/ui/loading-screen";

// Pages
import Dashboard from "@/pages/Dashboard";
import Cases from "@/pages/Cases";
import CaseDetail from "@/pages/CaseDetail";
import CaseEdit from "@/pages/CaseEdit";
import CreateCaseFlow from "@/pages/CreateCaseFlow";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import LandingPage from "@/pages/Landing";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const { session, loading, isOfflineMode } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/auth" element={session ? <Navigate to="/dashboard" replace /> : <Auth />} />
        
        {/* Protected routes with single layout wrapper */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <EnhancedAppLayout>
                {isOfflineMode && (
                  <div className="mb-4">
                    <OfflineBanner />
                  </div>
                )}
                <Dashboard />
              </EnhancedAppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/cases"
          element={
            <PrivateRoute>
              <EnhancedAppLayout>
                {isOfflineMode && (
                  <div className="mb-4">
                    <OfflineBanner />
                  </div>
                )}
                <Cases />
              </EnhancedAppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/cases/:id"
          element={
            <PrivateRoute>
              <EnhancedAppLayout>
                {isOfflineMode && (
                  <div className="mb-4">
                    <OfflineBanner />
                  </div>
                )}
                <CaseDetail />
              </EnhancedAppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/cases/edit/:id"
          element={
            <PrivateRoute>
              <EnhancedAppLayout>
                {isOfflineMode && (
                  <div className="mb-4">
                    <OfflineBanner />
                  </div>
                )}
                <CaseEdit />
              </EnhancedAppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/cases/new"
          element={
            <PrivateRoute>
              <EnhancedAppLayout>
                {isOfflineMode && (
                  <div className="mb-4">
                    <OfflineBanner />
                  </div>
                )}
                <CreateCaseFlow />
              </EnhancedAppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <EnhancedAppLayout>
                {isOfflineMode && (
                  <div className="mb-4">
                    <OfflineBanner />
                  </div>
                )}
                <Profile />
              </EnhancedAppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <EnhancedAppLayout>
                {isOfflineMode && (
                  <div className="mb-4">
                    <OfflineBanner />
                  </div>
                )}
                <Settings />
              </EnhancedAppLayout>
            </PrivateRoute>
          }
        />
        <Route path="/" element={session ? <Navigate to="/dashboard" replace /> : <Navigate to="/landing" replace />} />
        <Route
          path="*"
          element={
            session ? (
              <EnhancedAppLayout>
                <NotFound />
              </EnhancedAppLayout>
            ) : (
              <Navigate to="/landing" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <AppContent />
            <Toaster position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
