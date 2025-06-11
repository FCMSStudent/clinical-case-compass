import React from "react";
import { useAuth } from "@/app/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DebugPage() {
  const { session, user, loading, isOfflineMode } = useAuth();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Debug Page - Authentication Status</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Authentication Debug Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Loading:</span>
                <Badge variant={loading ? "secondary" : "default"} className="ml-2">
                  {loading ? 'TRUE' : 'FALSE'}
                </Badge>
              </div>
              
              <div>
                <span className="font-medium">Offline Mode:</span>
                <Badge variant={isOfflineMode ? "destructive" : "default"} className="ml-2">
                  {isOfflineMode ? 'TRUE' : 'FALSE'}
                </Badge>
              </div>
              
              <div>
                <span className="font-medium">Has Session:</span>
                <Badge variant={session ? "default" : "outline"} className="ml-2">
                  {session ? 'TRUE' : 'FALSE'}
                </Badge>
              </div>
              
              <div>
                <span className="font-medium">Has User:</span>
                <Badge variant={user ? "default" : "outline"} className="ml-2">
                  {user ? 'TRUE' : 'FALSE'}
                </Badge>
              </div>
            </div>
            
            {session && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-200">Session Details:</h3>
                <pre className="text-sm mt-2 text-green-700 dark:text-green-300">
                  {JSON.stringify({
                    user_id: session.user?.id,
                    email: session.user?.email,
                    created_at: session.user?.created_at,
                    expires_at: session.expires_at,
                  }, null, 2)}
                </pre>
              </div>
            )}
            
            {user && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200">User Details:</h3>
                <pre className="text-sm mt-2 text-blue-700 dark:text-blue-300">
                  {JSON.stringify({
                    id: user.id,
                    email: user.email,
                    created_at: user.created_at,
                    email_confirmed_at: user.email_confirmed_at,
                  }, null, 2)}
                </pre>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
              <h3 className="font-semibold">Environment:</h3>
              <ul className="text-sm mt-2 space-y-1">
                <li>Mode: {import.meta.env.MODE}</li>
                <li>Base URL: {import.meta.env.BASE_URL}</li>
                <li>Supabase URL: {import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Not Set'}</li>
                <li>Supabase Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Not Set'}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 