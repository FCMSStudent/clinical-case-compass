
import { lazy, Suspense } from "react";
// import { Toaster } from "@/components/ui/toaster"; // Removed import for old Toaster
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { UserProfileDisplay } from "./components/auth/UserProfileDisplay";

// Lazy load page components
const Cases = lazy(() => import("./pages/Cases"));
const CaseDetail = lazy(() => import("./pages/CaseDetail"));
const CaseNew = lazy(() => import("./pages/CaseNew"));
const CaseEdit = lazy(() => import("./pages/CaseEdit"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
// Note: Dashboard, Resources, Schedule, Study, Index pages were mentioned in subtask description
// but are not currently in the App.tsx routing. If they were, they'd be lazy loaded similarly.
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const IndexPage = lazy(() => import("./pages/Index"));


const queryClient = new QueryClient();

// Simple loader component for Suspense fallback
const PageLoader = () => (
  <div className="flex justify-center items-center h-screen w-full">
    <p className="text-lg font-medium text-gray-700">Loading page...</p>
    {/* For a better UX, consider using a Skeleton component or a spinner from your UI library */}
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        {/* <Toaster /> */} {/* Removed old Toaster component */}
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Navigate to="/cases" replace />} />
              <Route 
                path="/cases" 
                element={
                  <PrivateRoute>
                    <AppLayout>
                      <Cases />
                      <UserProfileDisplay />
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
                      <UserProfileDisplay />
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
                      <UserProfileDisplay />
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
                      <UserProfileDisplay />
                    </AppLayout>
                  </PrivateRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
