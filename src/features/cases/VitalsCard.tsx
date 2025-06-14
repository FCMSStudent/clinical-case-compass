
import React, { useState, useCallback, memo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Thermometer, HeartPulse, Activity, Wind, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

interface VitalSignProps {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  onChange: (value: string) => void;
  type?: "text" | "number";
  min?: number;
  max?: number;
  normalRange?: { min: number; max: number };
  id: string;
  className?: string;
}

interface VitalsCardProps {
  onVitalsChange?: (vitals: Record<string, string>) => void;
  initialVitals?: Record<string, string>;
}

const VitalSign = memo<VitalSignProps>(({ 
  label, 
  value, 
  unit, 
  icon, 
  onChange, 
  type = "text",
  min,
  max,
  normalRange,
  id,
  className
}) => {
  const isOutOfRange = normalRange && value && !isNaN(Number(value)) 
    ? Number(value) < normalRange.min || Number(value) > normalRange.max
    : false;

  const getStatusColor = () => {
    if (!normalRange || !value || isNaN(Number(value))) return "";
    const numValue = Number(value);
    if (numValue < normalRange.min) return "border-blue-400 bg-blue-500/20";
    if (numValue > normalRange.max) return "border-red-400 bg-red-500/20";
    return "border-green-400 bg-green-500/20";
  };

  return (
    <div className={cn(
      "bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-600/50 p-4 transition-all hover:bg-slate-700/60 hover:border-slate-500/70",
      className
    )}>
      <div className="flex items-center space-x-3 mb-3">
        <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-grow">
          <Label htmlFor={id} className="text-sm text-slate-200 font-medium">{label}</Label>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center">
          <Input
            id={id}
            type={type}
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              "h-10 px-3 py-2 text-sm bg-slate-700/50 backdrop-blur-sm border-slate-500/50 text-slate-100 placeholder:text-slate-400 transition-all focus:border-blue-400/60 focus:bg-slate-600/50",
              normalRange && value && !isNaN(Number(value)) && getStatusColor()
            )}
            placeholder="--"
            aria-describedby={normalRange ? `${id}-range` : undefined}
          />
          <span className="text-sm text-slate-300 ml-3 font-medium min-w-fit">{unit}</span>
        </div>
        
        {normalRange && (
          <div id={`${id}-range`} className="text-xs text-slate-400">
            Normal: {normalRange.min}-{normalRange.max} {unit}
          </div>
        )}
      </div>
    </div>
  );
});

VitalSign.displayName = "VitalSign";

export function VitalsCard({ onVitalsChange, initialVitals = {} }: VitalsCardProps) {
  const [vitals, setVitals] = useState<Record<string, string>>(initialVitals);

  const handleVitalChange = useCallback((key: string, value: string) => {
    const updatedVitals = {
      ...vitals,
      [key]: value
    };
    
    setVitals(updatedVitals);
    
    if (onVitalsChange) {
      onVitalsChange(updatedVitals);
    }
  }, [vitals, onVitalsChange]);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-600/50 shadow-2xl"></div>
      <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-600/40 p-6">
        <div className="flex items-center gap-3 mb-6">
          <HeartPulse className="h-6 w-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-slate-100">Vital Signs Assessment</h3>
        </div>
        
        {/* Bentogrid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min">
          {/* Temperature - spans 2 columns on larger screens */}
          <VitalSign
            id="temperature"
            label="Body Temperature"
            value={vitals.temperature || ""}
            unit="°C"
            type="number"
            min={30}
            max={45}
            normalRange={{ min: 36.5, max: 37.5 }}
            icon={<Thermometer className="h-4 w-4" />}
            onChange={(value) => handleVitalChange("temperature", value)}
            className="md:col-span-2"
          />

          {/* Heart Rate */}
          <VitalSign
            id="heartRate"
            label="Heart Rate"
            value={vitals.heartRate || ""}
            unit="bpm"
            type="number"
            min={30}
            max={200}
            normalRange={{ min: 60, max: 100 }}
            icon={<HeartPulse className="h-4 w-4" />}
            onChange={(value) => handleVitalChange("heartRate", value)}
          />

          {/* Respiratory Rate */}
          <VitalSign
            id="respiratoryRate"
            label="Respiratory Rate"
            value={vitals.respiratoryRate || ""}
            unit="bpm"
            type="number"
            min={5}
            max={50}
            normalRange={{ min: 12, max: 20 }}
            icon={<Wind className="h-4 w-4" />}
            onChange={(value) => handleVitalChange("respiratoryRate", value)}
          />

          {/* Blood Pressure - spans 2 columns */}
          <VitalSign
            id="bloodPressure"
            label="Blood Pressure (Systolic/Diastolic)"
            value={vitals.bloodPressure || ""}
            unit="mmHg"
            icon={<Activity className="h-4 w-4" />}
            onChange={(value) => handleVitalChange("bloodPressure", value)}
            className="col-span-2"
          />

          {/* Oxygen Saturation - spans 2 columns */}
          <VitalSign
            id="oxygenSaturation"
            label="Oxygen Saturation (SpO2)"
            value={vitals.oxygenSaturation || ""}
            unit="%"
            type="number"
            min={70}
            max={100}
            normalRange={{ min: 95, max: 100 }}
            icon={<Gauge className="h-4 w-4" />}
            onChange={(value) => handleVitalChange("oxygenSaturation", value)}
            className="col-span-2"
          />
        </div>
      </div>
    </div>
  );
}
