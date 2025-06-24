import { AlertTriangle } from "lucide-react";
import { Button } from "@/shared/components/button";
import { memo } from "react";
import { cn } from "@/shared/utils/utils";

interface CaseCardErrorProps {
  medicalCase: any;
  className?: string;
}

export const CaseCardError = memo(({ medicalCase, className }: CaseCardErrorProps) => (
  <div className={cn(
    "relative bg-red-900/30 backdrop-blur-md rounded-2xl border border-red-700/50 p-6 h-full flex flex-col items-center justify-center text-center",
    "hover:bg-red-900/40",
    className
  )}>
    <AlertTriangle className="h-10 w-10 text-red-400 mb-3" />
    <h3 className="text-lg font-semibold text-red-200 mb-1">Case Rendering Error</h3>
    <p className="text-sm text-red-300">There was an issue displaying this case card.</p>
    <p className="text-xs text-red-400 mt-2">Case ID: {medicalCase?.id || "Unknown"}</p>
  </div>
));

CaseCardError.displayName = "CaseCardError"; 