import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthContext";
import LandingPage from "@/features/landing/Landing";
import Auth from "@/features/auth/Auth";
import NotFound from "@/shared/components/NotFound";
import AppLayout from "@/features/navigation/components/AppLayout";
import ProtectedRouteLayout from "@/features/navigation/components/ProtectedRouteLayout";

// Debug logging
console.log('App.tsx - Loading App component...');

// Simple test component to verify basic rendering
const TestComponent = () => {
  console.log('TestComponent - Rendering...');
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'blue', 
      color: 'white', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Test Component - App is working!</h1>
      <p>If you can see this, React is rendering correctly.</p>
      <p>Current time: {new Date().toLocaleString()}</p>
      <p>React version: {React.version}</p>
    </div>
  );
};

const App = () => {
  console.log('App component - Starting to render...');
  
  // Method 2: Start with simple test component
  const useSimpleTest = true; // Set to false to use full app
  
  if (useSimpleTest) {
    return <TestComponent />;
  }
  
  try {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />
            {/* Auth Page */}
            <Route path="/auth" element={<Auth />} />
            {/* Protected Routes */}
            <Route element={<ProtectedRouteLayout />}>
              <Route element={<AppLayout />}>
                {/* Add more protected routes here */}
              </Route>
            </Route>
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    );
  } catch (error) {
    console.error('App component - Error rendering:', error);
    return (
      <div style={{ padding: '20px', color: 'white', backgroundColor: 'red', minHeight: '100vh' }}>
        <h1>App Error</h1>
        <p>There was an error rendering the app:</p>
        <pre>{error instanceof Error ? error.message : String(error)}</pre>
        <details>
          <summary>Stack Trace</summary>
          <pre>{error instanceof Error ? error.stack : 'No stack trace available'}</pre>
        </details>
      </div>
    );
  }
};

console.log('App.tsx - App component exported...');

export default App;
