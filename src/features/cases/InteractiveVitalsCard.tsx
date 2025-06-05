import React, { useState, useEffect, useCallback, memo, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Thermometer, Heart, ArrowUp, ArrowDown, Wind, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type VitalName =
  | "temperature"
  | "heartRate"
  | "systolicBP"
  | "diastolicBP"
  | "respiratoryRate"
  | "oxygenSaturation";

interface VitalRange {
  min: number;
  max: number;
}

interface VitalSign {
  name: VitalName;
  value: number;
  unit: string;
  range: VitalRange;
  min: number;
  max: number;
  step: number;
  icon?: React.ReactNode;
  info?: string;
}

interface InteractiveVitalsCardProps {
  onVitalsChange: (vitals: Record<VitalName, string>) => void;
  initialVitals?: Partial<Record<VitalName, string>>;
  patientAge?: number;
}

// Memoized slider component with improved visual feedback
const VitalSlider = memo(({
  vital,
  index,
  handleVitalChange
}: {
  vital: VitalSign;
  index: number;
  handleVitalChange: (index: number, values: number[]) => void;
}) => {
  // Status color and classes for the value display
  const getStatusColor = (value: number, range: VitalRange): string => {
    if (value < range.min) return "text-blue-500";
    if (value > range.max) return "text-red-500";
    return "text-green-600";
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
    <div key={vital.name} className="p-3 bg-medical-50 rounded-lg border border-border transition-all hover:shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
            {vital.icon && (
              <span className={cn("text-medical-600", pulseAnimation)}>
                {vital.icon}
              </span>
            )}
          <Label htmlFor={`slider-${vital.name}`} className="font-medium">
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
            <TooltipContent className="p-3 max-w-xs">
              <div className="space-y-1">
                <p className="font-medium">Normal range: {vital.range.min}-{vital.range.max} {vital.unit}</p>
                {vital.value < vital.range.min && (
                  <p className="text-blue-500">Below normal range</p>
                )}
                {vital.value > vital.range.max && (
                  <p className="text-red-500">Above normal range</p>
                )}
                {vital.value >= vital.range.min && vital.value <= vital.range.max && (
                  <p className="text-green-600">Within normal range</p>
                )}
                {vital.info && <p className="text-xs text-muted-foreground">{vital.info}</p>}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative pt-1">
        <div className="overflow-hidden h-2 mb-1 text-xs flex bg-muted rounded">
          <div className="h-2 rounded absolute bg-blue-500/20" style={rangeIndicatorStyle.lowRange}></div>
          <div className="h-2 rounded absolute bg-green-500/20" style={rangeIndicatorStyle.normalRange}></div>
          <div className="h-2 rounded absolute bg-red-500/20" style={rangeIndicatorStyle.highRange}></div>
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
            vital.value < vital.range.min && "[&_[role=slider]]:bg-blue-500 [&_[role=slider]]:border-blue-600",
            vital.value > vital.range.max && "[&_[role=slider]]:bg-red-500 [&_[role=slider]]:border-red-600",
            vital.value >= vital.range.min && vital.value <= vital.range.max && "[&_[role=slider]]:bg-green-600 [&_[role=slider]]:border-green-700"
          )}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{vital.min}</span>
          <div className="text-center text-xs font-medium text-muted-foreground">{vital.range.min} - {vital.range.max}</div>
          <span>{vital.max}</span>
        </div>
      </div>
    </div>
  );
});
VitalSlider.displayName = "VitalSlider";

---

### `VITAL_PRESETS` and `clinicalInfo`

These constants provide predefined vital sign values and clinical information, respectively. They are now consistently exported for use across your application.

```typescript
// Define preset vital signs for quick selection
export const VITAL_PRESETS: Record<string, Record<VitalName, number>> = {
  normal: {
    temperature: 37,
    heartRate: 70,
    systolicBP: 120,
    diastolicBP: 80,
    respiratoryRate: 14,
    oxygenSaturation: 98
  },
  fever: {
    temperature: 39.5,
    heartRate: 110,
    systolicBP: 110,
    diastolicBP: 70,
    respiratoryRate: 22,
    oxygenSaturation: 96
  },
  hypotension: {
    temperature: 36.5,
    heartRate: 120,
    systolicBP: 85,
    diastolicBP: 50,
    respiratoryRate: 24,
    oxygenSaturation: 94
  },
  hypertension: {
    temperature: 37,
    heartRate: 85,
    systolicBP: 170,
    diastolicBP: 100,
    respiratoryRate: 16,
    oxygenSaturation: 97
  },
  respiratory: {
    temperature: 37.8,
    heartRate: 105,
    systolicBP: 125,
    diastolicBP: 85,
    respiratoryRate: 28,
    oxygenSaturation: 91
  }
};

// Clinical information for tooltips
export const clinicalInfo: Record<VitalName, string> = {
  temperature:
    "Body temperature is regulated by the hypothalamus. Fever may indicate infection, inflammation, or other conditions requiring investigation.",
  heartRate:
    "Heart rate varies with activity level, emotions, medications, and underlying conditions. Sustained tachycardia or bradycardia may require investigation.",
  systolicBP:
    "Systolic blood pressure reflects the pressure when the heart contracts. Elevated readings may indicate hypertension and cardiovascular risk.",
  diastolicBP:
    "Diastolic blood pressure represents the pressure when the heart relaxes. Elevated readings may indicate vascular resistance issues.",
  respiratoryRate:
    "Rate of breathing is controlled by the respiratory center in the medulla oblongata. Changes can indicate respiratory, metabolic, or neurological issues.",
  oxygenSaturation:
    "Oxygen saturation measures the percentage of hemoglobin binding sites occupied by oxygen. Low levels may indicate respiratory compromise."
};