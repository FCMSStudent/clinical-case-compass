import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '../index.css';

/* eslint-disable react-refresh/only-export-components */

// Enhanced error boundary component with more debugging
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error('Error in App component:', error);
    return (
      <div style={{ padding: '20px', color: 'white', backgroundColor: 'red', minHeight: '100vh' }}>
        <h1>App Error</h1>
        <p>There was an error loading the app:</p>
        <pre>{error instanceof Error ? error.message : String(error)}</pre>
        <details>
          <summary>Stack Trace</summary>
          <pre>{error instanceof Error ? error.stack : 'No stack trace available'}</pre>
        </details>
      </div>
    );
  }
};

// Debug information
console.log('Main.tsx - Starting application...');
console.log('Main.tsx - Environment variables:', {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Not set',
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Not set',
  NODE_ENV: import.meta.env.NODE_ENV,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD
});

try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error('Root element not found - check if index.html has <div id="root"></div>');
  }
  
  console.log('Main.tsx - Root element found, creating React root...');
  const root = createRoot(rootElement);
  
  // Try to render the App component with error boundary
  console.log('Main.tsx - Rendering App component...');
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  
  console.log('Main.tsx - App component rendered successfully');
} catch (error) {
  console.error('Error in main.tsx:', error);
  
  // Show error on page
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: white; background-color: red; min-height: 100vh; font-family: monospace;">
        <h1>Critical Error in main.tsx</h1>
        <p>There was an error initializing the application:</p>
        <pre>${error instanceof Error ? error.message : String(error)}</pre>
        <details>
          <summary>Stack Trace</summary>
          <pre>${error instanceof Error ? error.stack : 'No stack trace available'}</pre>
        </details>
        <h2>Debug Information:</h2>
        <ul>
          <li>Root element: ${document.getElementById("root") ? 'Found' : 'Not found'}</li>
          <li>React version: ${React.version}</li>
          <li>Environment: ${import.meta.env.NODE_ENV}</li>
          <li>Dev mode: ${import.meta.env.DEV}</li>
        </ul>
      </div>
    `;
  }
}
