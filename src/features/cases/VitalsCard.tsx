import { useState, useCallback, memo } from "react";
import { Input } from "@/shared/components/input";
import { Label } from "@/shared/components/label";
import { Thermometer, HeartPulse, Activity, Wind, Gauge } from "lucide-react";
import { cn } from "@/shared/utils/utils";

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

  const getStatusColor = () => {
    if (!normalRange || !value || isNaN(Number(value))) return "";
    const numValue = Number(value);
    if (numValue < normalRange.min) return "border-blue-400 bg-blue-500/20";
    if (numValue > normalRange.max) return "border-red-400 bg-red-500/20";
    return "border-green-400 bg-green-500/20";
  };

  return (
    <div className={cn(
      "bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-3 transition-all hover:bg-white/10",
      className
    )}>
      <div className="flex items-center space-x-3 mb-3">
        <div className="h-8 w-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white flex-shrink-0">
          {icon}
        </div>
        <div className="flex-grow">
          <Label htmlFor={id} className="text-sm text-white/90 font-medium">{label}</Label>
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
              "h-10 px-3 py-2 text-sm bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 transition-all focus:border-blue-400/60 focus:bg-white/10",
              normalRange && value && !isNaN(Number(value)) && getStatusColor()
            )}
            placeholder="--"
            aria-describedby={normalRange ? `${id}-range` : undefined}
          />
          <span className="text-sm text-white/80 ml-3 font-medium min-w-fit">{unit}</span>
        </div>
        
        {normalRange && (
          <div id={`${id}-range`} className="text-xs text-white/70">
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
  );
}
