import React from "react";
import { Button } from "@/shared/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/tooltip";

interface VitalsPresetButtonsProps {
  onApplyPreset: (preset: string) => void;
}

export const VitalsPresetButtons: React.FC<VitalsPresetButtonsProps> = ({ onApplyPreset }) => {
  return (
    <div className="flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs text-slate-200 border-slate-500/50 bg-slate-700/50 hover:bg-slate-600/60 hover:text-slate-100"
              onClick={() => onApplyPreset("normal")}
            >
              Normal
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-slate-800/90 backdrop-blur-xl border-slate-600/50 text-slate-100">
            Apply normal vital signs
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs text-slate-200 border-slate-500/50 bg-slate-700/50 hover:bg-slate-600/60 hover:text-slate-100"
              onClick={() => onApplyPreset("fever")}
            >
              Fever
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-slate-800/90 backdrop-blur-xl border-slate-600/50 text-slate-100">
            Apply febrile vital signs
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs text-slate-200 border-slate-500/50 bg-slate-700/50 hover:bg-slate-600/60 hover:text-slate-100"
              onClick={() => onApplyPreset("hypotension")}
            >
              Shock
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-slate-800/90 backdrop-blur-xl border-slate-600/50 text-slate-100">
            Apply shock/hypotension vital signs
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}; 