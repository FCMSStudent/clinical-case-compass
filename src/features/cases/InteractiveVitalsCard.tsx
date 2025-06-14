import React, { useState, useEffect, useCallback, memo, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Thermometer, Heart, ArrowUp, ArrowDown, Wind, Activity, ChevronDown, ChevronRight, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div key={vital.name} className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4 transition-all hover:bg-white/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {vital.icon && (
            <div className={cn("text-white/80 h-5 w-5", pulseAnimation)}>
              {vital.icon}
            </div>
          )}
          <Label htmlFor={`slider-${vital.name}`} className="font-medium text-white text-sm">
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
            <TooltipContent className="bg-white/10 backdrop-blur-xl border-white/20 text-white p-3 max-w-xs">
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
                {vital.info && <p className="text-xs text-white/70">{vital.info}</p>}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative pt-1">
        <div className="overflow-hidden h-2 mb-1 text-xs flex bg-white/10 rounded">
          <div className="h-2 rounded absolute bg-blue-500/30" style={rangeIndicatorStyle.lowRange}></div>
          <div className="h-2 rounded absolute bg-green-500/30" style={rangeIndicatorStyle.normalRange}></div>
          <div className="h-2 rounded absolute bg-red-500/30" style={rangeIndicatorStyle.highRange}></div>
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
        <div className="flex justify-between text-xs text-white/60 mt-1">
          <span>{vital.min}</span>
          <div className="text-center text-xs font-medium text-white/80">{vital.range.min} - {vital.range.max}</div>
          <span>{vital.max}</span>
        </div>
      </div>
    </div>
  );
});
VitalSlider.displayName = "VitalSlider";

const VitalGroup = memo<{ 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
}>(({ title, icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between p-3 h-auto bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/10 transition-all text-white"
        >
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 text-white/80">
              {icon}
            </div>
            <span className="font-medium text-sm">{title}</span>
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-white/60" />
          ) : (
            <ChevronRight className="h-4 w-4 text-white/60" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 pl-9">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
});

VitalGroup.displayName = "VitalGroup";

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
  const applyPreset = useCallback((preset: keyof typeof VITAL_PRESETS) => {
    const presetValues = VITAL_PRESETS[preset];

    setVitalSigns(prev => {
      return prev.map(vital => ({
        ...vital,
        value: presetValues[vital.name as keyof typeof presetValues] || vital.value
      }));
    });
  }, []);

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

  const temperatureVitals = vitalSigns.filter(v => v.name === "temperature");
  const cardiovascularVitals = vitalSigns.filter(v => ["heartRate", "systolicBP", "diastolicBP"].includes(v.name));
  const respiratoryVitals = vitalSigns.filter(v => ["respiratoryRate", "oxygenSaturation"].includes(v.name));

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <HeartPulse className="h-5 w-5 text-white/80" />
            <h3 className="text-lg font-semibold text-white">Interactive Vitals</h3>
          </div>
          <div className="flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs text-white/80 border-white/30 bg-white/10 hover:bg-white/20 hover:text-white"
                    onClick={() => applyPreset("normal")}
                  >
                    Normal
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white/10 backdrop-blur-xl border-white/20 text-white">Apply normal vital signs</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs text-white/80 border-white/30 bg-white/10 hover:bg-white/20 hover:text-white"
                    onClick={() => applyPreset("fever")}
                  >
                    Fever
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white/10 backdrop-blur-xl border-white/20 text-white">Apply febrile vital signs</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs text-white/80 border-white/30 bg-white/10 hover:bg-white/20 hover:text-white"
                    onClick={() => applyPreset("hypotension")}
                  >
                    Shock
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-white/10 backdrop-blur-xl border-white/20 text-white">Apply shock/hypotension vital signs</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <div className="space-y-4">
          <VitalGroup title="Core Temperature" icon={<Thermometer className="h-4 w-4" />}>
            {temperatureVitals.map((vital, index) => {
              const originalIndex = vitalSigns.findIndex(v => v.name === vital.name);
              return (
                <VitalSlider 
                  key={vital.name} 
                  vital={vital} 
                  index={originalIndex} 
                  handleVitalChange={handleVitalChange} 
                />
              );
            })}
          </VitalGroup>

          <VitalGroup title="Cardiovascular System" icon={<HeartPulse className="h-4 w-4" />}>
            {cardiovascularVitals.map((vital, index) => {
              const originalIndex = vitalSigns.findIndex(v => v.name === vital.name);
              return (
                <VitalSlider 
                  key={vital.name} 
                  vital={vital} 
                  index={originalIndex} 
                  handleVitalChange={handleVitalChange} 
                />
              );
            })}
          </VitalGroup>

          <VitalGroup title="Respiratory System" icon={<Wind className="h-4 w-4" />}>
            {respiratoryVitals.map((vital, index) => {
              const originalIndex = vitalSigns.findIndex(v => v.name === vital.name);
              return (
                <VitalSlider 
                  key={vital.name} 
                  vital={vital} 
                  index={originalIndex} 
                  handleVitalChange={handleVitalChange} 
                />
              );
            })}
          </VitalGroup>
        </div>
      </div>
    </div>
  );
}
