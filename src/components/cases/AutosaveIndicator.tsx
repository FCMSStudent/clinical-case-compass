
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { CheckCheck, Save } from "lucide-react";

type SaveStatus = "saving" | "saved" | "idle";

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

  // Make the "Saved" status visible briefly after saving
  useEffect(() => {
    if (status === "saved") {
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
      ) : null}
    </div>
  );
}
