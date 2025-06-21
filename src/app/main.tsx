import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '../index.css';

/* eslint-disable react-refresh/only-export-components */

// Error boundary component
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
      </div>
    );
  }
};

try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  const root = createRoot(rootElement);
  
  // Try to render the App component with error boundary
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
} catch (error) {
  console.error('Error in main.tsx:', error);
}
