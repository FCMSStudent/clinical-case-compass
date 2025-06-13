import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { AppLayout } from "@/features/navigation/components/AppLayout";
import { SidebarProvider } from "@/features/navigation/components/Sidebar";
import { PrivateRoute } from "@/features/auth/PrivateRoute";
import { OfflineBanner } from "@/components/ui/OfflineBanner";

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

// Simplified App component without advanced features
const AppContent = () => {
  const { session, loading, isOfflineMode } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Loading</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Router>
        <Routes>
          {/* Auth page without layout/sidebar */}
          <Route path="/auth" element={<Auth />} />
          {/* All other routes with layout/sidebar */}
          <Route
            path="*"
            element={
              <SidebarProvider>
                <AppLayout>
                  {isOfflineMode && (
                    <div className="mb-4">
                      <OfflineBanner />
                    </div>
                  )}
                  <Routes>
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/cases" element={<PrivateRoute><Cases /></PrivateRoute>} />
                    <Route path="/cases/:id" element={<PrivateRoute><CaseDetail /></PrivateRoute>} />
                    <Route path="/cases/:id/edit" element={<PrivateRoute><CaseEdit /></PrivateRoute>} />
                    <Route path="/cases/new" element={<PrivateRoute><CreateCaseFlow /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AppLayout>
              </SidebarProvider>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <AppContent />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
