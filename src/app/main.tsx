import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import '../index.css';

console.log('main.tsx executing');

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
  console.log('Root element:', rootElement);
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  const root = createRoot(rootElement);
  console.log('React root created');
  
  // Try to render the App component with error boundary
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  console.log('App rendered');
} catch (error) {
  console.error('Error in main.tsx:', error);
}
