
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { AuthProvider } from "./contexts/AuthContext";
import Cases from "./pages/Cases";
import CaseDetail from "./pages/CaseDetail";
import CaseNew from "./pages/CaseNew";
import CaseEdit from "./pages/CaseEdit";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { UserProfileDisplay } from "./components/auth/UserProfileDisplay";

const queryClient = new QueryClient();

const App = () => (
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
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
