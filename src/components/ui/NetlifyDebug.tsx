import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

interface DebugInfo {
  envVars: {
    supabaseUrl: boolean;
    supabaseKey: boolean;
  };
  mode: string;
  baseUrl: string;
  isOfflineMode: boolean;
  loading: boolean;
  hasSession: boolean;
}

export const NetlifyDebug = ({ debugInfo }: { debugInfo: DebugInfo }) => {
  if (import.meta.env.MODE === 'production') {
    return null; // Don't show in production
  }

  return (
    <Card className="mb-4 border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
          <Info className="h-5 w-5" />
          Netlify Deployment Debug Info
        </CardTitle>
        <CardDescription className="text-orange-700 dark:text-orange-300">
          This information helps troubleshoot deployment issues
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Environment Variables:</span>
            <div className="mt-1 space-y-1">
              <div className="flex items-center gap-2">
                {debugInfo.envVars.supabaseUrl ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                )}
                <span>SUPABASE_URL: {debugInfo.envVars.supabaseUrl ? 'SET' : 'MISSING'}</span>
              </div>
              <div className="flex items-center gap-2">
                {debugInfo.envVars.supabaseKey ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                )}
                <span>SUPABASE_KEY: {debugInfo.envVars.supabaseKey ? 'SET' : 'MISSING'}</span>
              </div>
            </div>
          </div>
          
          <div>
            <span className="font-medium">App State:</span>
            <div className="mt-1 space-y-1">
              <Badge variant={debugInfo.isOfflineMode ? "destructive" : "default"}>
                {debugInfo.isOfflineMode ? 'OFFLINE MODE' : 'ONLINE MODE'}
              </Badge>
              <Badge variant={debugInfo.loading ? "secondary" : "default"}>
                {debugInfo.loading ? 'LOADING' : 'READY'}
              </Badge>
              <Badge variant={debugInfo.hasSession ? "default" : "outline"}>
                {debugInfo.hasSession ? 'AUTHENTICATED' : 'NOT AUTH'}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          <div>Mode: {debugInfo.mode}</div>
          <div>Base URL: {debugInfo.baseUrl}</div>
        </div>
        
        {!debugInfo.envVars.supabaseUrl || !debugInfo.envVars.supabaseKey ? (
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-800 dark:text-red-200">
              <strong>Issue:</strong> Environment variables are missing. Please set them in your Netlify dashboard under Site Settings &gt; Environment Variables.
            </p>
          </div>
        ) : (
          <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>Good:</strong> Environment variables are properly configured.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 