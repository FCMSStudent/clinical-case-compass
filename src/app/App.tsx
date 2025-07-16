import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/shared/components/sonner";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./providers/AuthContext";
import { ThemeProvider } from "@/design-system/unified-system";
import { ErrorBoundary } from "./error-boundaries/ErrorBoundary";
import { ProtectedRouteLayout } from "@/features/navigation";
import LoadingScreen from "@/shared/components/loading-screen";

// Import pages from the new pages directory
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import CasesPage from '@/pages/CasesPage';
import CaseDetailPage from '@/pages/CaseDetailPage';
import CaseEditPage from '@/pages/CaseEditPage';
import CreateCasePage from '@/pages/CreateCasePage';
import AccountPage from '@/pages/AccountPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Loading component for Suspense fallback
const PageLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
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
                <AuthPage />
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
                <DashboardPage />
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
                  <CasesPage />
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
                <CaseDetailPage />
              </Suspense>
            </ProtectedRouteLayout>
          }
        />
        <Route
          path="/cases/edit/:id"
          element={
            <ProtectedRouteLayout>
              <Suspense fallback={<PageLoadingFallback />}>
                <CaseEditPage />
              </Suspense>
            </ProtectedRouteLayout>
          }
        />
        <Route
          path="/cases/new"
          element={
            <ProtectedRouteLayout>
              <Suspense fallback={<PageLoadingFallback />}>
                <CreateCasePage />
              </Suspense>
            </ProtectedRouteLayout>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRouteLayout>
              <Suspense fallback={<PageLoadingFallback />}>
                <AccountPage />
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
                  <NotFoundPage />
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
