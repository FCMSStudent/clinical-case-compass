import { useState, useEffect } from "react";
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
    return undefined;
  }, [status]);

  if (!visible) return null;

  return (
    <div className={`flex items-center text-xs px-3 py-1 rounded-full shadow-md border border-white/20 bg-white/10 backdrop-blur-md ${className}`} style={{ minWidth: 100 }}>
      {status === "saving" ? (
        <>
          <Save className="animate-pulse mr-1 h-3 w-3 text-blue-300" />
          <span className="text-blue-100">Saving...</span>
        </>
      ) : status === "saved" ? (
        <>
          <CheckCheck className="mr-1 h-3 w-3 text-green-300" />
          <span className="text-green-100">
            Saved {lastSaved ? format(lastSaved, "h:mm a") : ""}
          </span>
        </>
      ) : status === "error" ? (
        <>
          <AlertCircle className="mr-1 h-3 w-3 text-red-300" />
          <span className="text-red-100">Save failed</span>
        </>
      ) : (
        <span className="text-white/60">Idle</span>
      )}
    </div>
  );
}