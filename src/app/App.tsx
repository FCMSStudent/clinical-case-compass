import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"; // Added useLocation
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { AuthProvider, useAuth } from "./AuthContext";
import { ThemeProvider } from "@/lib/design-system";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { ProtectedRouteLayout } from "@/features/navigation";
import LoadingScreen from "@/components/ui/loading-screen";

// Pages
import Dashboard from "@/pages/Dashboard";
import Cases from "@/pages/Cases";
import CaseDetail from "@/pages/CaseDetail";
import CaseEdit from "@/pages/CaseEdit";
import CreateCaseFlow from "@/pages/CreateCaseFlow";
import Account from "@/pages/Account";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import LandingPage from "@/pages/Landing";

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

const AppContent = () => {
  console.log('AppContent rendering');
  
  // Temporary simplified version
  return (
    <div className="p-8 text-white bg-black min-h-screen">
      <h1>App Test</h1>
      <p>If you can see this, the app is rendering.</p>
    </div>
  );
};

// New component to handle location and AnimatePresence for page transitions.
// This component uses `useLocation` to get the current route and provides it to `AnimatePresence`
// and `Routes`. The `key` on `Routes` ensures `AnimatePresence` detects route changes.
const AppRoutes = () => {
  const location = useLocation();
  const { session } = useAuth(); // Used to determine route elements.

  return (
    // AnimatePresence enables the animation of components that are mounted or unmounted.
    // `mode="wait"` ensures that the outgoing component finishes its exit animation
    // before the new component enters.
    <AnimatePresence mode="wait">
      {/* The `location` prop is passed to `Routes` so it works correctly with `AnimatePresence`. */}
      {/* `key={location.pathname}` is crucial for `AnimatePresence` to differentiate between routes. */}
      <Routes location={location} key={location.pathname}>
        {/* Public Routes - Page components (LandingPage, Auth) are motion-enhanced for transitions. */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/auth" element={session ? <Navigate to="/dashboard" replace /> : <Auth />} />
        
        {/* Protected routes - EnhancedAppLayout will be modified to be a motion component */}
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
            <AppContent />
            <Toaster position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
