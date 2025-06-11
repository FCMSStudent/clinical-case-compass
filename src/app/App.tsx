import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { AppLayout } from "@/features/navigation/components/AppLayout";
import { SidebarProvider } from "@/features/navigation/components/Sidebar";
import { PrivateRoute } from "@/features/auth/PrivateRoute";
import { OfflineBanner } from "@/components/ui/OfflineBanner";

// Pages
import Dashboard from "@/pages/Dashboard";
import Cases from "@/pages/Cases";
import CaseDetail from "@/pages/CaseDetail";
import CaseEdit from "@/pages/CaseEdit";
import CreateCaseFlow from "@/pages/CreateCaseFlow";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";

// Enhanced utilities
import { useAccessibility } from "@/lib/accessibility";
import { usePerformanceMonitor } from "@/lib/performance";
import { useAdaptiveTinting } from "@/lib/motion";
import { useSpatialAudioCues } from "@/lib/interactions";
import { motion, useScroll } from "framer-motion";
import { AccessibleMotion } from "@/lib/motion";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Enhanced App component with utilities
const AppContent = () => {
  const { session, loading, isOfflineMode } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

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

  // Adaptive tinting based on scroll
  const { tintIntensity, tintHue } = useAdaptiveTinting(scrollYProgress);

  // Spatial audio cues
  const { playNavigationCue, playSuccessCue } = useSpatialAudioCues();

  useEffect(() => {
    // Register global voice commands
    accessibility.registerVoiceCommand({
      command: "go to dashboard",
      action: () => {
        window.location.href = "/dashboard";
        playNavigationCue("up");
      },
      description: "Navigate to dashboard",
      category: "navigation"
    });

    accessibility.registerVoiceCommand({
      command: "go to cases",
      action: () => {
        window.location.href = "/cases";
        playNavigationCue("right");
      },
      description: "Navigate to cases",
      category: "navigation"
    });

    accessibility.registerVoiceCommand({
      command: "go to settings",
      action: () => {
        window.location.href = "/settings";
        playNavigationCue("left");
      },
      description: "Navigate to settings",
      category: "navigation"
    });

    accessibility.registerVoiceCommand({
      command: "new case",
      action: () => {
        window.location.href = "/cases/new";
        playSuccessCue();
      },
      description: "Create new case",
      category: "interaction"
    });

    // Start accessibility features
    accessibility.startVoiceListening();
  }, [accessibility, playNavigationCue, playSuccessCue]);

  if (loading) {
    return (
      <AccessibleMotion
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
      >
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-lg font-medium text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Loading Clinical Case Compass...
          </motion.p>
        </motion.div>
      </AccessibleMotion>
    );
  }

  return (
    <AccessibleMotion
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      }}
      className="min-h-screen"
      ref={containerRef}
      style={{
        background: `linear-gradient(135deg, 
          hsl(${tintHue?.get?.() ?? 220}, 70%, 95%) 0%, 
          hsl(${tintHue?.get?.() ?? 220}, 60%, 90%) 100%)`,
        filter: `brightness(${1 + (tintIntensity?.get?.() ?? 0) * 0.1})`,
      }}
    >
      <Router>
        <SidebarProvider>
          <AppLayout>
            {isOfflineMode && (
              <div className="mb-4">
                <OfflineBanner />
              </div>
            )}
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cases"
                element={
                  <PrivateRoute>
                    <Cases />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cases/:id"
                element={
                  <PrivateRoute>
                    <CaseDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cases/:id/edit"
                element={
                  <PrivateRoute>
                    <CaseEdit />
                  </PrivateRoute>
                }
              />
              <Route
                path="/cases/new"
                element={
                  <PrivateRoute>
                    <CreateCaseFlow />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </SidebarProvider>
      </Router>
    </AccessibleMotion>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <AppContent />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
