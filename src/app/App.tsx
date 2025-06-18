
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence } from "framer-motion";
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
  const { session, loading, isOfflineMode } = useAuth();

  console.log("[AppContent] Auth state:", { 
    hasSession: !!session, 
    loading, 
    isOfflineMode,
    sessionUser: session?.user?.email 
  });

  if (loading) {
    console.log("[AppContent] Showing loading screen");
    return <LoadingScreen />;
  }

  console.log("[AppContent] Rendering router with session:", !!session);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

// New component to handle location and AnimatePresence for page transitions.
const AppRoutes = () => {
  const location = useLocation();
  const { session } = useAuth();

  console.log("[AppRoutes] Current location:", location.pathname, "Has session:", !!session);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/landing" element={<LandingPage />} />
        <Route 
          path="/auth" 
          element={session ? (
            <>
              {console.log("[AppRoutes] Redirecting authenticated user from /auth to /dashboard")}
              <Navigate to="/dashboard" replace />
            </>
          ) : (
            <>
              {console.log("[AppRoutes] Showing auth page to unauthenticated user")}
              <Auth />
            </>
          )} 
        />
        
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
        <Route 
          path="/" 
          element={session ? (
            <>
              {console.log("[AppRoutes] Redirecting authenticated user from / to /dashboard")}
              <Navigate to="/dashboard" replace />
            </>
          ) : (
            <>
              {console.log("[AppRoutes] Redirecting unauthenticated user from / to /landing")}
              <Navigate to="/landing" replace />
            </>
          )} 
        />
        <Route
          path="*"
          element={
            session ? (
              <ProtectedRouteLayout>
                <NotFound />
              </ProtectedRouteLayout>
            ) : (
              <>
                {console.log("[AppRoutes] Redirecting unauthenticated user from unknown route to /landing")}
                <Navigate to="/landing" replace />
              </>
            )
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  console.log("[App] App component mounting");
  
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
