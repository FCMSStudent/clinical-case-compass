import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/features/navigation";
import { AppLayout } from "@/features/navigation";
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { useAccessibility } from "@/lib/accessibility";
import { usePerformanceMonitor } from "@/lib/performance";
import { AccessibleMotion } from "@/lib/motion";
import Dashboard from "@/pages/Dashboard";
import Cases from "@/pages/Cases";
import CaseDetail from "@/pages/CaseDetail";
import CaseEdit from "@/pages/CaseEdit";
import CreateCaseFlow from "../pages/CreateCaseFlow";
import Settings from "@/pages/Settings";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import { PrivateRoute } from "@/features/auth/PrivateRoute";
import { useEffect } from "react";

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

// Enhanced App component with utilities
const AppContent = () => {
  // Initialize accessibility features
  const accessibility = useAccessibility({
    enableVoiceControl: true,
    enableKeyboardNavigation: true,
    enableScreenReader: true,
    enableHighContrast: false,
    enableLargeText: false,
    enableReducedMotion: false,
    enableFocusIndicators: true,
    enableAudioCues: true,
    enableHapticFeedback: true,
  });

  // Performance monitoring
  usePerformanceMonitor("App");

  useEffect(() => {
    // Register global voice commands
    accessibility.registerVoiceCommand({
      command: "go to dashboard",
      action: () => window.location.href = "/dashboard",
      description: "Navigate to dashboard",
      category: "navigation"
    });

    accessibility.registerVoiceCommand({
      command: "go to cases",
      action: () => window.location.href = "/cases",
      description: "Navigate to cases",
      category: "navigation"
    });

    accessibility.registerVoiceCommand({
      command: "go to settings",
      action: () => window.location.href = "/settings",
      description: "Navigate to settings",
      category: "navigation"
    });

    accessibility.registerVoiceCommand({
      command: "new case",
      action: () => window.location.href = "/cases/new",
      description: "Create new case",
      category: "interaction"
    });

    // Start accessibility features
    accessibility.startVoiceListening();
  }, [accessibility]);

  return (
    <AccessibleMotion
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      <BrowserRouter>
        <SidebarProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </PrivateRoute>
              } 
            />
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
                    <CreateCaseFlow />
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
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <AppLayout>
                    <Settings />
                  </AppLayout>
                </PrivateRoute>
              }
            />
            <Route path="/setting" element={<Navigate to="/settings" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </AccessibleMotion>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider>
            <AuthProvider>
              <Toaster />
              <Sonner position="top-right" />
              <AppContent />
            </AuthProvider>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
