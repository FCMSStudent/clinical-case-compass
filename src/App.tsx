// Merged code example
import { lazy, Suspense, useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorBoundary } from "./components/error/ErrorBoundary";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const Cases = lazy(() => import("./pages/Cases"));
const CaseDetail = lazy(() => import("./pages/CaseDetail"));
const CaseNew = lazy(() => import("./pages/CaseNew"));
const CaseEdit = lazy(() => import("./pages/CaseEdit"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

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
          <AuthProvider>
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/" element={<Navigate to="/cases" replace />} />
                  <Route path="/cases" element={<PrivateRoute><AppLayout><Cases /></AppLayout></PrivateRoute>} />
                  <Route path="/cases/new" element={<PrivateRoute><AppLayout><CaseNew /></AppLayout></PrivateRoute>} />
                  <Route path="/cases/edit/:id" element={<PrivateRoute><AppLayout><CaseEdit /></AppLayout></PrivateRoute>} />
                  <Route path="/cases/:id" element={<PrivateRoute><AppLayout><CaseDetail /></AppLayout></PrivateRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;