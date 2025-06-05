
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

interface InteractiveVitalsCardProps {
  onVitalsChange: (vitals: Record<string, string>) => void;
  initialVitals?: Record<string, string>;
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
    if (value > range.max) return "text-red-500"; // Changed from text-destructive
    return "text-green-600"; // Changed from text-primary
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
      // backgroundColor: "rgba(59, 130, 246, 0.2)" // Replaced by Tailwind below
    };
    
    const normalRange = {
      width: `${((vital.range.max - vital.range.min) / (vital.max - vital.min)) * 100}%`,
      left: `${((vital.range.min - vital.min) / (vital.max - vital.min)) * 100}%`,
      // backgroundColor: "rgba(22, 163, 74, 0.2)" // Replaced by Tailwind below
    };
    
    const highRange = {
      width: `${((vital.max - vital.range.max) / (vital.max - vital.min)) * 100}%`,
      left: `${((vital.range.max - vital.min) / (vital.max - vital.min)) * 100}%`,
      // backgroundColor: "rgba(220, 38, 38, 0.2)" // Replaced by Tailwind below
    };
    
    return { lowRange, normalRange, highRange };
  }, [vital.range.max, vital.range.min, vital.min, vital.max]);
  
  // Animation class for heart rate
  const pulseAnimation = vital.name === "heartRate" ? "animate-pulse" : "";

  return (
    <div key={vital.name} className="p-3 bg-medical-50 rounded-lg border border-border transition-all hover:shadow-sm"> {/* Changed bg-muted/50 to bg-medical-50 */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {vital.icon && (
            <span className={cn("text-medical-600", pulseAnimation)}> {/* Changed text-primary to text-medical-600 */}
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
                  <p className="text-blue-500">Below normal range</p> // Kept text-blue-500 (was text-blue-600)
                )}
                {vital.value > vital.range.max && (
                  <p className="text-red-500">Above normal range</p> // Changed from text-destructive
                )}
                {vital.value >= vital.range.min && vital.value <= vital.range.max && (
                  <p className="text-green-600">Within normal range</p> // Changed from text-primary
                )}
                {vital.info && <p className="text-xs text-muted-foreground">{vital.info}</p>}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 mb-1 text-xs flex bg-muted rounded">
          <div className="h-2 rounded absolute bg-blue-500/20" style={rangeIndicatorStyle.lowRange}></div> {/* Added bg-blue-500/20 */}
          <div className="h-2 rounded absolute bg-green-500/20" style={rangeIndicatorStyle.normalRange}></div> {/* Added bg-green-500/20 */}
          <div className="h-2 rounded absolute bg-red-500/20" style={rangeIndicatorStyle.highRange}></div> {/* Added bg-red-500/20 */}
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

// Define preset vital signs for quick selection
export const VITAL_PRESETS = {
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
export const clinicalInfo = {
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
} as const;

// Normal ranges based on patient age
export function getNormalRanges(age: number) {
  if (age < 12) {
    // Child
    return {
      temperature: { min: 36.5, max: 37.5 },
      heartRate: { min: 70, max: 120 },
      systolicBP: { min: 90, max: 110 },
      diastolicBP: { min: 55, max: 75 },
      respiratoryRate: { min: 20, max: 30 },
      oxygenSaturation: { min: 97, max: 100 }
    };
  }
  if (age > 65) {
    // Elderly
    return {
      temperature: { min: 36.0, max: 37.5 },
      heartRate: { min: 60, max: 100 },
      systolicBP: { min: 110, max: 140 },
      diastolicBP: { min: 65, max: 90 },
      respiratoryRate: { min: 12, max: 20 },
      oxygenSaturation: { min: 95, max: 100 }
    };
  }
  // Adult
  return {
    temperature: { min: 36.5, max: 37.5 },
    heartRate: { min: 60, max: 100 },
    systolicBP: { min: 100, max: 130 },
    diastolicBP: { min: 60, max: 85 },
    respiratoryRate: { min: 12, max: 18 },
    oxygenSaturation: { min: 95, max: 100 }
  };
}

export function InteractiveVitalsCard({ 
  onVitalsChange, 
  initialVitals = {},
  patientAge = 30
}: InteractiveVitalsCardProps) {
  // Get normal ranges for the provided age
  const normalRanges = useMemo(() => getNormalRanges(patientAge), [patientAge]);

  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([
    {
      name: "temperature",
      value: parseFloat(initialVitals.temperature || "37"),
      unit: "°C",
      range: normalRanges.temperature,
      min: 35,
      max: 41,
      step: 0.1,
      icon: <Thermometer className="h-5 w-5" />,
      info: clinicalInfo.temperature
    },
    {
      name: "heartRate",
      value: parseFloat(initialVitals.heartRate || "80"),
      unit: "bpm",
      range: normalRanges.heartRate,
      min: 40,
      max: 180,
      step: 1,
      icon: <Heart className="h-5 w-5" />,
      info: clinicalInfo.heartRate
    },
    {
      name: "systolicBP",
      value: parseFloat(initialVitals.systolicBP || "120"),
      unit: "mmHg",
      range: normalRanges.systolicBP,
      min: 80,
      max: 200,
      step: 1,
      icon: <ArrowUp className="h-5 w-5" />,
      info: clinicalInfo.systolicBP
    },
    {
      name: "diastolicBP",
      value: parseFloat(initialVitals.diastolicBP || "80"),
      unit: "mmHg",
      range: normalRanges.diastolicBP,
      min: 40,
      max: 120,
      step: 1,
      icon: <ArrowDown className="h-5 w-5" />,
      info: clinicalInfo.diastolicBP
    },
    {
      name: "respiratoryRate",
      value: parseFloat(initialVitals.respiratoryRate || "16"),
      unit: "bpm",
      range: normalRanges.respiratoryRate,
      min: 8,
      max: 40,
      step: 1,
      icon: <Wind className="h-5 w-5" />,
      info: clinicalInfo.respiratoryRate
    },
    {
      name: "oxygenSaturation",
      value: parseFloat(initialVitals.oxygenSaturation || "98"),
      unit: "%",
      range: normalRanges.oxygenSaturation,
      min: 80,
      max: 100,
      step: 1,
      icon: <Activity className="h-5 w-5" />,
      info: clinicalInfo.oxygenSaturation
    }
  ]);

  // Apply preset vital signs
  const applyPreset = (preset: keyof typeof VITAL_PRESETS) => {
    const presetValues = VITAL_PRESETS[preset];
    
    setVitalSigns(prev => {
      return prev.map(vital => ({
        ...vital,
        value: presetValues[vital.name as keyof typeof presetValues] || vital.value
      }));
    });
  };

  // Memoize the handleVitalChange function to prevent unnecessary re-renders
  const handleVitalChange = useCallback((index: number, values: number[]) => {
    const newValue = values[0];
    setVitalSigns(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], value: newValue };
      return updated;
    });
  }, []);

  // Debounced version of onVitalsChange to reduce state updates
  useEffect(() => {
    const timer = setTimeout(() => {
      // Convert vital signs to the format expected by parent component
      const vitalsObj: Record<string, string> = {};
      vitalSigns.forEach(vital => {
        vitalsObj[vital.name] = vital.value.toString();
      });
      onVitalsChange(vitalsObj);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [vitalSigns, onVitalsChange]);

  // Update initial values when they change
  useEffect(() => {
    if (Object.keys(initialVitals).length > 0) {
      setVitalSigns(prev => 
        prev.map(vital => ({
          ...vital,
          value: initialVitals[vital.name] ? parseFloat(initialVitals[vital.name]) : vital.value,
          range: normalRanges[vital.name as keyof typeof normalRanges]
        }))
      );
    }
  }, [initialVitals, normalRanges]);

  // Update ranges when patientAge changes
  useEffect(() => {
    setVitalSigns(prev => 
      prev.map(vital => ({
        ...vital,
        range: normalRanges[vital.name as keyof typeof normalRanges]
      }))
    );
  }, [normalRanges]);

  return (
    <Card className="shadow-sm border-medical-200"> {/* Changed border-border to border-medical-200 */}
      <CardContent className="pt-4">
        <div className="flex justify-end gap-1 mb-4"> {/* Moved preset buttons here */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-7 text-xs text-medical-600 border-medical-300 hover:bg-medical-50 hover:text-medical-700" // Added classes
                  onClick={() => applyPreset("normal")}
                >
                  Normal
                </Button>
              </TooltipTrigger>
              <TooltipContent>Apply normal vital signs</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-7 text-xs text-medical-600 border-medical-300 hover:bg-medical-50 hover:text-medical-700" // Added classes
                  onClick={() => applyPreset("fever")}
                >
                  Fever
                </Button>
              </TooltipTrigger>
              <TooltipContent>Apply febrile vital signs</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-7 text-xs text-medical-600 border-medical-300 hover:bg-medical-50 hover:text-medical-700" // Added classes
                  onClick={() => applyPreset("hypotension")}
                >
                  Shock
                </Button>
              </TooltipTrigger>
              <TooltipContent>Apply shock/hypotension vital signs</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vitalSigns.map((vital, index) => (
            <VitalSlider 
              key={vital.name} 
              vital={vital} 
              index={index} 
              handleVitalChange={handleVitalChange} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
