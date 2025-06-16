import React, { memo, useMemo } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface VitalRange {
  min: number;
  max: number;
}

interface VitalSign {
  name: string;
  value: number;
  unit: string;
  range: VitalRange;
  min: number;
  max: number;
  step: number;
  icon?: React.ReactNode;
  info?: string;
}

interface VitalSliderProps {
  vital: VitalSign;
  index: number;
  handleVitalChange: (index: number, values: number[]) => void;
  className?: string;
}

export const VitalSlider = memo(({
  vital,
  index,
  handleVitalChange,
  className
}: VitalSliderProps) => {
  // Status color and classes for the value display
  const getStatusColor = (value: number, range: VitalRange): string => {
    if (value < range.min) return "text-blue-400";
    if (value > range.max) return "text-red-400";
    return "text-green-400";
  };

  const getStatusIcon = (value: number, range: VitalRange) => {
    if (value < range.min) return <ArrowDown className="h-3 w-3" />;
    if (value > range.max) return <ArrowUp className="h-3 w-3" />;
    return null;
  };

  // Calculate range indicator positions for the colored zones
  const rangeIndicatorStyle = useMemo(() => {
    // Calculate width as percentage of the slider range
    const lowRange = {
      width: `${((vital.range.min - vital.min) / (vital.max - vital.min)) * 100}%`,
      left: 0,
    };

    const normalRange = {
      width: `${((vital.range.max - vital.range.min) / (vital.max - vital.min)) * 100}%`,
      left: `${((vital.range.min - vital.min) / (vital.max - vital.min)) * 100}%`,
    };

    const highRange = {
      width: `${((vital.max - vital.range.max) / (vital.max - vital.min)) * 100}%`,
      left: `${((vital.range.max - vital.min) / (vital.max - vital.min)) * 100}%`,
    };

    return { lowRange, normalRange, highRange };
  }, [vital.range.max, vital.range.min, vital.min, vital.max]);

  // Animation class for heart rate
  const pulseAnimation = vital.name === "heartRate" ? "animate-pulse" : "";

  return (
    <div className={cn(
      "bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-600/50 p-4 transition-all hover:bg-slate-700/60 hover:border-slate-500/70",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {vital.icon && (
            <div className={cn("text-blue-400 h-5 w-5", pulseAnimation)}>
              {vital.icon}
            </div>
          )}
          <Label htmlFor={`slider-${vital.name}`} className="font-medium text-slate-200 text-sm">
            {vital.name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </Label>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={cn(
                  "font-semibold text-lg flex items-center gap-1 transition-colors",
                  getStatusColor(vital.value, vital.range)
                )}
              >
                {getStatusIcon(vital.value, vital.range)}
                {vital.value} {vital.unit}
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-800/90 backdrop-blur-xl border-slate-600/50 text-slate-100 p-3 max-w-xs">
              <div className="space-y-1">
                <p className="font-medium">Normal range: {vital.range.min}-{vital.range.max} {vital.unit}</p>
                {vital.value < vital.range.min && (
                  <p className="text-blue-400">Below normal range</p>
                )}
                {vital.value > vital.range.max && (
                  <p className="text-red-400">Above normal range</p>
                )}
                {vital.value >= vital.range.min && vital.value <= vital.range.max && (
                  <p className="text-green-400">Within normal range</p>
                )}
                {vital.info && <p className="text-xs text-slate-300">{vital.info}</p>}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative pt-1">
        <div className="overflow-hidden h-2 mb-2 text-xs flex bg-slate-700/50 rounded">
          <div className="h-2 rounded absolute bg-blue-500/40" style={rangeIndicatorStyle.lowRange}></div>
          <div className="h-2 rounded absolute bg-green-500/40" style={rangeIndicatorStyle.normalRange}></div>
          <div className="h-2 rounded absolute bg-red-500/40" style={rangeIndicatorStyle.highRange}></div>
        </div>
        <Slider
          id={`slider-${vital.name}`}
          min={vital.min}
          max={vital.max}
          step={vital.step}
          value={[vital.value]}
          onValueChange={(values) => handleVitalChange(index, values)}
          className={cn(
            "[&_.relative.h-2]:bg-transparent",
            "[&_[role=slider]]:h-5 [&_[role=slider]]:w-5",
            "[&_[role=slider]]:transition-all [&_[role=slider]]:duration-200",
            vital.value < vital.range.min && "[&_[role=slider]]:bg-blue-500 [&_[role=slider]]:border-blue-400",
            vital.value > vital.range.max && "[&_[role=slider]]:bg-red-500 [&_[role=slider]]:border-red-400",
            vital.value >= vital.range.min && vital.value <= vital.range.max && "[&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-green-400"
          )}
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>{vital.min}</span>
          <div className="text-center text-xs font-medium text-slate-300">{vital.range.min} - {vital.range.max}</div>
          <span>{vital.max}</span>
        </div>
      </div>
    </div>
  );
});

VitalSlider.displayName = "VitalSlider"; 