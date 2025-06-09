import React, { useState, useCallback, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  id
}) => {
  const isOutOfRange = normalRange && value && !isNaN(Number(value)) 
    ? Number(value) < normalRange.min || Number(value) > normalRange.max
    : false;

  const getStatusColor = () => {
    if (!normalRange || !value || isNaN(Number(value))) return "";
    const numValue = Number(value);
    if (numValue < normalRange.min) return "border-blue-500 bg-blue-50";
    if (numValue > normalRange.max) return "border-red-500 bg-red-50";
    return "border-green-500 bg-green-50";
  };

  return (
    <div className="flex items-center space-x-2 mb-3">
      <div className="h-8 w-8 rounded-full bg-medical-100 flex items-center justify-center text-medical-600 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-grow">
        <Label htmlFor={id} className="text-xs text-medical-600">{label}</Label>
        <div className="flex items-center">
          <Input
            id={id}
            type={type}
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              "h-8 px-2 py-1 text-sm border-medical-200 transition-colors",
              normalRange && value && !isNaN(Number(value)) && getStatusColor()
            )}
            placeholder="--"
            aria-describedby={normalRange ? `${id}-range` : undefined}
          />
          <span className="text-xs text-medical-500 ml-1">{unit}</span>
        </div>
        {normalRange && (
          <div id={`${id}-range`} className="text-xs text-muted-foreground mt-1">
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
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
        <div className="pb-2 pt-4 px-6 flex items-center gap-2">
          <HeartPulse className="h-5 w-5 text-white/80" />
          <h3 className="text-sm font-medium text-white">Vital Signs</h3>
        </div>
        <div className="p-6 space-y-1">
          <VitalSign
            id="temperature"
            label="Temperature"
            value={vitals.temperature || ""}
            unit="°C"
            type="number"
            min={30}
            max={45}
            normalRange={{ min: 36.5, max: 37.5 }}
            icon={<Thermometer className="h-4 w-4" />}
            onChange={(value) => handleVitalChange("temperature", value)}
          />
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
          <VitalSign
            id="bloodPressure"
            label="Blood Pressure"
            value={vitals.bloodPressure || ""}
            unit="mmHg"
            icon={<Activity className="h-4 w-4" />}
            onChange={(value) => handleVitalChange("bloodPressure", value)}
          />
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
          />
        </div>
      </div>
    </div>
  );
}
