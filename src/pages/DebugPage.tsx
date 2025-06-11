import React from "react";
import { useAuth } from "@/app/AuthContext";

export default function DebugPage() {
  const { session, user, loading, isOfflineMode } = useAuth();

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '20px', 
      backgroundColor: 'white', 
      color: 'black',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>🔍 Debug Page - Rendering Test</h1>
      
      <div style={{ backgroundColor: '#f0f0f0', padding: '15px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>✅ This page is rendering!</h2>
        <p>If you can see this, React routing and component rendering are working.</p>
      </div>
      
      <div style={{ backgroundColor: '#e8f5e8', padding: '15px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Authentication Status:</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Loading: {loading ? '⏳ TRUE' : '✅ FALSE'}</li>
          <li>Offline Mode: {isOfflineMode ? '❌ TRUE' : '✅ FALSE'}</li>
          <li>Has Session: {session ? '✅ TRUE' : '❌ FALSE'}</li>
          <li>Has User: {user ? '✅ TRUE' : '❌ FALSE'}</li>
          <li>User Email: {user?.email || 'Not available'}</li>
        </ul>
      </div>
      
      <div style={{ backgroundColor: '#fff3cd', padding: '15px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Environment:</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Mode: {import.meta.env.MODE}</li>
          <li>Base URL: {import.meta.env.BASE_URL}</li>
          <li>Supabase URL: {import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Not Set'}</li>
          <li>Supabase Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not Set'}</li>
        </ul>
      </div>
      
      <div style={{ backgroundColor: '#f8d7da', padding: '15px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>🚨 Main Issue:</h3>
        <p>Authentication is working perfectly, but other pages aren't rendering.</p>
        <p>This suggests a problem with:</p>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Component library imports (Radix UI components)</li>
          <li>CSS/styling making content invisible</li>
          <li>AppLayout component</li>
          <li>JavaScript errors in page components</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', border: '2px solid #007bff' }}>
        <h3 style={{ fontSize: '16px', color: '#007bff' }}>🔧 Next Steps:</h3>
        <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Visit <strong>/dashboard</strong> - should work now with auth passing</li>
          <li>Check browser console for JavaScript errors</li>
          <li>Check if content is rendered but invisible (inspect element)</li>
        </ol>
      </div>
    </div>
  );
} 