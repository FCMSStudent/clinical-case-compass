
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import CaseDetail from "./pages/CaseDetail";
import CaseNew from "./pages/CaseNew";
import Resources from "./pages/Resources";
import Study from "./pages/Study";
import Schedule from "./pages/Schedule";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { UserProfileDisplay } from "./components/auth/UserProfileDisplay";

const queryClient = new QueryClient();

const AppWithAuth = ({ children }: { children: React.ReactNode }) => (
  <AppLayout>
    {children}
    <div className="fixed bottom-0 left-0 w-64 bg-background pb-4">
      <UserProfileDisplay />
    </div>
  </AppLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<PrivateRoute><AppWithAuth><Dashboard /></AppWithAuth></PrivateRoute>} />
            <Route path="/cases" element={<PrivateRoute><AppWithAuth><Cases /></AppWithAuth></PrivateRoute>} />
            <Route path="/cases/new" element={<PrivateRoute><AppWithAuth><CaseNew /></AppWithAuth></PrivateRoute>} />
            <Route path="/cases/:id" element={<PrivateRoute><AppWithAuth><CaseDetail /></AppWithAuth></PrivateRoute>} />
            <Route path="/resources" element={<PrivateRoute><AppWithAuth><Resources /></AppWithAuth></PrivateRoute>} />
            <Route path="/study" element={<PrivateRoute><AppWithAuth><Study /></AppWithAuth></PrivateRoute>} />
            <Route path="/schedule" element={<PrivateRoute><AppWithAuth><Schedule /></AppWithAuth></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
