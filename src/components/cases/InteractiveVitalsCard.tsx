
import React, { useState, useEffect, useCallback, memo, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Thermometer, Heart, ArrowUp, ArrowDown } from "lucide-react";
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
}

interface InteractiveVitalsCardProps {
  onVitalsChange: (vitals: Record<string, string>) => void;
  initialVitals?: Record<string, string>;
  patientAge?: number;
}

// Memoized VitalSlider component to prevent unnecessary re-renders
const VitalSlider = memo(({ 
  vital, 
  index, 
  handleVitalChange 
}: { 
  vital: VitalSign; 
  index: number;
  handleVitalChange: (index: number, values: number[]) => void;
}) => {
  const getStatusColor = (value: number, range: VitalRange): string => {
    if (value < range.min) return "text-blue-500";
    if (value > range.max) return "text-red-500";
    return "text-green-500";
  };
  
  // Calculate the range indicator position and width
  const rangeIndicatorStyle = useMemo(() => ({
    width: `${((vital.range.max - vital.min) / (vital.max - vital.min)) * 100}%`,
    marginLeft: `${((vital.range.min - vital.min) / (vital.max - vital.min)) * 100}%`,
    backgroundColor: "rgba(0, 128, 0, 0.2)"
  }), [vital.range.max, vital.range.min, vital.min, vital.max]);

  return (
    <div key={vital.name} className="p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {vital.icon && <span>{vital.icon}</span>}
          <Label htmlFor={`slider-${vital.name}`} className="font-medium">
            {vital.name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </Label>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span 
                className={cn(
                  "font-semibold text-lg flex items-center gap-1",
                  getStatusColor(vital.value, vital.range)
                )}
              >
                {vital.value} {vital.unit}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Normal range: {vital.range.min}-{vital.range.max} {vital.unit}</p>
              {vital.value < vital.range.min && <p>Below normal</p>}
              {vital.value > vital.range.max && <p>Above normal</p>}
              {vital.value >= vital.range.min && vital.value <= vital.range.max && <p>Normal</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 mb-1 text-xs flex bg-gray-200 rounded">
          <div 
            className="h-2 rounded" 
            style={rangeIndicatorStyle}
          ></div>
        </div>
        <Slider
          id={`slider-${vital.name}`}
          min={vital.min}
          max={vital.max}
          step={vital.step}
          value={[vital.value]}
          onValueChange={(values) => handleVitalChange(index, values)}
          showTooltip={true}
          tooltipValue={`${vital.value} ${vital.unit}`}
          className={cn(
            "[&_.relative.h-2]:bg-transparent",
            "[&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
          )}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{vital.min}</span>
          <div className="text-center">{vital.range.min} - {vital.range.max}</div>
          <span>{vital.max}</span>
        </div>
      </div>
    </div>
  );
});
VitalSlider.displayName = "VitalSlider";

export function InteractiveVitalsCard({ 
  onVitalsChange, 
  initialVitals = {},
  patientAge = 30
}: InteractiveVitalsCardProps) {
  // Define normal ranges based on age
  const getNormalRanges = useCallback((age: number) => {
    if (age < 12) { // Child
      return {
        temperature: { min: 36.5, max: 37.5 },
        heartRate: { min: 70, max: 120 },
        systolicBP: { min: 90, max: 110 },
        diastolicBP: { min: 55, max: 75 },
        respiratoryRate: { min: 20, max: 30 },
        oxygenSaturation: { min: 97, max: 100 }
      };
    } else if (age > 65) { // Elderly
      return {
        temperature: { min: 36.0, max: 37.5 },
        heartRate: { min: 60, max: 100 },
        systolicBP: { min: 110, max: 140 },
        diastolicBP: { min: 65, max: 90 },
        respiratoryRate: { min: 12, max: 20 },
        oxygenSaturation: { min: 95, max: 100 }
      };
    } else { // Adult
      return {
        temperature: { min: 36.5, max: 37.5 },
        heartRate: { min: 60, max: 100 },
        systolicBP: { min: 100, max: 130 },
        diastolicBP: { min: 60, max: 85 },
        respiratoryRate: { min: 12, max: 18 },
        oxygenSaturation: { min: 95, max: 100 }
      };
    }
  }, []);

  const normalRanges = useMemo(() => getNormalRanges(patientAge), [patientAge, getNormalRanges]);

  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([
    {
      name: "temperature",
      value: parseFloat(initialVitals.temperature || "37"),
      unit: "°C",
      range: normalRanges.temperature,
      min: 35,
      max: 41,
      step: 0.1,
      icon: <Thermometer className="h-5 w-5" />
    },
    {
      name: "heartRate",
      value: parseFloat(initialVitals.heartRate || "80"),
      unit: "bpm",
      range: normalRanges.heartRate,
      min: 40,
      max: 180,
      step: 1,
      icon: <Heart className="h-5 w-5" />
    },
    {
      name: "systolicBP",
      value: parseFloat(initialVitals.systolicBP || "120"),
      unit: "mmHg",
      range: normalRanges.systolicBP,
      min: 80,
      max: 200,
      step: 1,
      icon: <ArrowUp className="h-5 w-5" />
    },
    {
      name: "diastolicBP",
      value: parseFloat(initialVitals.diastolicBP || "80"),
      unit: "mmHg",
      range: normalRanges.diastolicBP,
      min: 40,
      max: 120,
      step: 1,
      icon: <ArrowDown className="h-5 w-5" />
    },
    {
      name: "respiratoryRate",
      value: parseFloat(initialVitals.respiratoryRate || "16"),
      unit: "bpm",
      range: normalRanges.respiratoryRate,
      min: 8,
      max: 40,
      step: 1
    },
    {
      name: "oxygenSaturation",
      value: parseFloat(initialVitals.oxygenSaturation || "98"),
      unit: "%",
      range: normalRanges.oxygenSaturation,
      min: 80,
      max: 100,
      step: 1
    }
  ]);

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
    <Card className="shadow-sm">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-lg">Vital Signs</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
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
