import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthContext";
import LandingPage from "@/features/landing/Landing";
import Auth from "@/features/auth/Auth";
import Dashboard from "@/features/dashboard/Dashboard";
import Cases from "@/features/cases/Cases";
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
      backgroundColor: 'red', 
      color: 'white', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      zIndex: 9999
    }}>
      <h1>Test Component - App is working!</h1>
      <p>If you can see this, React is rendering correctly.</p>
      <p>Environment: {import.meta.env.NODE_ENV}</p>
      <p>Dev mode: {import.meta.env.DEV ? 'Yes' : 'No'}</p>
      <p>Supabase URL: {import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Not set'}</p>
      <p>Current time: {new Date().toLocaleString()}</p>
      <p>React version: {React.version}</p>
    </div>
  );
};

const App = () => {
  console.log('App - Main App component rendering...');
  
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
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/cases" element={<Cases />} />
              {/* Add more protected routes here */}
            </Route>
          </Route>
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

console.log('App.tsx - App component exported...');

export default App;
