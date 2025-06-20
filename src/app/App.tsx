import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/shared/components/sonner";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./providers/AuthContext";
import { ThemeProvider } from "@/design-system/design-system";
import { ErrorBoundary } from "./error-boundaries/ErrorBoundary";
import { ProtectedRouteLayout } from "@/features/navigation";
import LoadingScreen from "@/shared/components/loading-screen";

// Pages
import Dashboard from "@/features/dashboard/Dashboard";
import Cases from "@/features/cases/Cases";
import CaseDetail from "@/features/cases/CaseDetail";
import CaseEdit from "@/features/cases/CaseEdit";
import CreateCaseFlow from "@/features/cases/CreateCaseFlow";
import Account from "@/features/auth/Account";
import Auth from "@/features/auth/Auth";
import NotFound from "@/shared/components/NotFound";
import LandingPage from "@/features/landing/Landing";

// Create a client with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on authentication errors
        if (error?.message?.includes('not authenticated')) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    }
  },
});

// Component to handle location and AnimatePresence for page transitions
const AppRoutes = () => {
  const location = useLocation();
  const { session } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/auth" element={session ? <Navigate to="/dashboard" replace /> : <Auth />} />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRouteLayout>
              <Dashboard />
            </ProtectedRouteLayout>
          }
        />
        <Route
          path="/cases"
          element={
            <ProtectedRouteLayout>
              <ErrorBoundary fallback={
                <div className="p-8 text-center">
                  <h2 className="text-xl font-semibold text-white mb-2">Cases Page Error</h2>
                  <p className="text-white/70">There was an error loading the cases page.</p>
                </div>
              }>
                <Cases />
              </ErrorBoundary>
            </ProtectedRouteLayout>
          }
        />
        <Route
          path="/cases/:id"
          element={
            <ProtectedRouteLayout>
              <CaseDetail />
            </ProtectedRouteLayout>
          }
        />
        <Route
          path="/cases/edit/:id"
          element={
            <ProtectedRouteLayout>
              <CaseEdit />
            </ProtectedRouteLayout>
          }
        />
        <Route
          path="/cases/new"
          element={
            <ProtectedRouteLayout>
              <CreateCaseFlow />
            </ProtectedRouteLayout>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRouteLayout>
              <Account />
            </ProtectedRouteLayout>
          }
        />
        <Route path="/" element={session ? <Navigate to="/dashboard" replace /> : <Navigate to="/landing" replace />} />
        <Route
          path="*"
          element={
            session ? (
              <ProtectedRouteLayout>
                <NotFound />
              </ProtectedRouteLayout>
            ) : (
              <Navigate to="/landing" replace />
            )
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <Router>
              <AppRoutes />
            </Router>
            <Toaster position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
