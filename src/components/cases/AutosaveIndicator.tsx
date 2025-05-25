
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { CheckCheck, Save, AlertCircle } from "lucide-react";

type SaveStatus = "saving" | "saved" | "idle" | "error";

interface AutosaveIndicatorProps {
  status: SaveStatus;
  lastSaved?: Date | null;
  className?: string;
}

export function AutosaveIndicator({ 
  status, 
  lastSaved, 
  className 
}: AutosaveIndicatorProps) {
  const [visible, setVisible] = useState(status !== "idle");

  // Make the "Saved" and "Error" status visible briefly after saving
  useEffect(() => {
    if (status === "saved" || status === "error") {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setVisible(status !== "idle");
    }
  }, [status]);

  if (!visible) return null;

  return (
    <div className={`flex items-center text-xs ${className}`}>
      {status === "saving" ? (
        <>
          <Save className="animate-pulse mr-1 h-3 w-3 text-medical-500" />
          <span className="text-medical-500">Saving...</span>
        </>
      ) : status === "saved" ? (
        <>
          <CheckCheck className="mr-1 h-3 w-3 text-green-600" />
          <span className="text-green-600">
            Saved {lastSaved ? format(lastSaved, "h:mm a") : ""}
          </span>
        </>
      ) : status === "error" ? (
        <>
          <AlertCircle className="mr-1 h-3 w-3 text-red-600" />
          <span className="text-red-600">Save failed</span>
        </>
      ) : null}
    </div>
  );
}
