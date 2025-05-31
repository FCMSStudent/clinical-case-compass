
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";
import { ErrorBoundary } from "./components/error/ErrorBoundary";
import Cases from "./pages/Cases";
import CaseDetail from "./pages/CaseDetail";
import CaseNew from "./pages/CaseNew";
import CaseEdit from "./pages/CaseEdit";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { PrivateRoute } from "@/features/auth/PrivateRoute";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  speed: 200,
  trickleSpeed: 200,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on authentication errors
        if (error?.message?.includes('auth') || error?.message?.includes('unauthorized')) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = () => {
  useEffect(() => {
    // Start loading indicator on route changes
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    // Listen for route changes (simplified approach)
    window.addEventListener('beforeunload', handleStart);
    
    return () => {
      window.removeEventListener('beforeunload', handleStart);
      handleComplete();
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider>
            <AuthProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/" element={<Navigate to="/cases" replace />} />
                  <Route 
                    path="/cases" 
                    element={
                      <PrivateRoute>
                        <AppLayout>
                          <Cases />
                        </AppLayout>
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/cases/new" 
                    element={
                      <PrivateRoute>
                        <AppLayout>
                          <CaseNew />
                        </AppLayout>
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/cases/edit/:id" 
                    element={
                      <PrivateRoute>
                        <AppLayout>
                          <CaseEdit />
                        </AppLayout>
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path="/cases/:id" 
                    element={
                      <PrivateRoute>
                        <AppLayout>
                          <CaseDetail />
                        </AppLayout>
                      </PrivateRoute>
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
