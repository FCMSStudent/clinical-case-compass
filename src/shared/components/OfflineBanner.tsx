import React from "react";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/shared/components/alert";

export const OfflineBanner = () => {
  return (
    <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
      <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      <AlertDescription className="text-yellow-800 dark:text-yellow-200">
        <strong>Offline Mode:</strong> The application is running with limited functionality. 
        Database features are unavailable. Please configure Supabase credentials for full functionality.
      </AlertDescription>
    </Alert>
  );
}; 