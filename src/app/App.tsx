import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/shared/components/sonner";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./providers/AuthContext";
import { ThemeProvider } from "@/design-system/design-system";
import { ErrorBoundary } from "./error-boundaries/ErrorBoundary";
import { ProtectedRouteLayout } from "@/features/navigation";
import LoadingScreen from "@/shared/components/loading-screen";

// Lazy load major components for code splitting
const Dashboard = React.lazy(() => import("@/features/dashboard/Dashboard"));
const Cases = React.lazy(() => import("@/features/cases/Cases"));
const CaseDetail = React.lazy(() => import("@/features/cases/CaseDetail"));
const CaseEdit = React.lazy(() => import("@/features/cases/CaseEdit"));
const CreateCaseFlow = React.lazy(() => import("@/features/cases/CreateCaseFlow"));
const Account = React.lazy(() => import("@/features/auth/Account"));
const Auth = React.lazy(() => import("@/features/auth/Auth"));
const NotFound = React.lazy(() => import("@/shared/components/NotFound"));
const LandingPage = React.lazy(() => import("@/features/landing/Landing"));

// Loading component for Suspense fallback
const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    <LoadingScreen />
  </div>
);

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
        <Route 
          path="/landing" 
          element={
            <Suspense fallback={<PageLoadingFallback />}>
              <LandingPage />
            </Suspense>
          } 
        />
        <Route 
          path="/auth" 
          element={
            session ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Suspense fallback={<PageLoadingFallback />}>
                <Auth />
              </Suspense>
            )
          } 
        />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRouteLayout>
              <Suspense fallback={<PageLoadingFallback />}>
                <Dashboard />
              </Suspense>
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
                <Suspense fallback={<PageLoadingFallback />}>
                  <Cases />
                </Suspense>
              </ErrorBoundary>
            </ProtectedRouteLayout>
          }
        />
        <Route
          path="/cases/:id"
          element={
            <ProtectedRouteLayout>
              <Suspense fallback={<PageLoadingFallback />}>
                <CaseDetail />
              </Suspense>
            </ProtectedRouteLayout>
          }
        />
        <Route
          path="/cases/edit/:id"
          element={
            <ProtectedRouteLayout>
              <Suspense fallback={<PageLoadingFallback />}>
                <CaseEdit />
              </Suspense>
            </ProtectedRouteLayout>
          }
        />
        <Route
          path="/cases/new"
          element={
            <ProtectedRouteLayout>
              <Suspense fallback={<PageLoadingFallback />}>
                <CreateCaseFlow />
              </Suspense>
            </ProtectedRouteLayout>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRouteLayout>
              <Suspense fallback={<PageLoadingFallback />}>
                <Account />
              </Suspense>
            </ProtectedRouteLayout>
          }
        />
        <Route path="/" element={session ? <Navigate to="/dashboard" replace /> : <Navigate to="/landing" replace />} />
        <Route
          path="*"
          element={
            session ? (
              <ProtectedRouteLayout>
                <Suspense fallback={<PageLoadingFallback />}>
                  <NotFound />
                </Suspense>
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
