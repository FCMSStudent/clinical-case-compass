
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorBoundary } from "./components/error/ErrorBoundary";
import Cases from "./pages/Cases";
import CaseDetail from "./pages/CaseDetail";
import CaseNew from "./pages/CaseNew";
import CaseEdit from "./pages/CaseEdit";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { UserProfileDisplay } from "./components/auth/UserProfileDisplay";

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

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
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
                      <ErrorBoundary>
                        <Cases />
                        <UserProfileDisplay />
                      </ErrorBoundary>
                    </AppLayout>
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/cases/new" 
                element={
                  <PrivateRoute>
                    <AppLayout>
                      <ErrorBoundary>
                        <CaseNew />
                        <UserProfileDisplay />
                      </ErrorBoundary>
                    </AppLayout>
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/cases/edit/:id" 
                element={
                  <PrivateRoute>
                    <AppLayout>
                      <ErrorBoundary>
                        <CaseEdit />
                        <UserProfileDisplay />
                      </ErrorBoundary>
                    </AppLayout>
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/cases/:id" 
                element={
                  <PrivateRoute>
                    <AppLayout>
                      <ErrorBoundary>
                        <CaseDetail />
                        <UserProfileDisplay />
                      </ErrorBoundary>
                    </AppLayout>
                  </PrivateRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
