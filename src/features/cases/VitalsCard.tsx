
import React, { useState, useCallback, memo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Thermometer, HeartPulse, Activity, Wind, Gauge, ChevronDown, ChevronRight } from "lucide-react";
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
    if (numValue < normalRange.min) return "border-blue-400/50 bg-blue-500/10";
    if (numValue > normalRange.max) return "border-red-400/50 bg-red-500/10";
    return "border-green-400/50 bg-green-500/10";
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-3 transition-all hover:bg-white/10">
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/80 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-grow">
          <Label htmlFor={id} className="text-xs text-white/80 font-medium">{label}</Label>
          <div className="flex items-center mt-1">
            <Input
              id={id}
              type={type}
              min={min}
              max={max}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={cn(
                "h-8 px-2 py-1 text-sm bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 transition-all focus:border-white/40 focus:bg-white/15",
                normalRange && value && !isNaN(Number(value)) && getStatusColor()
              )}
              placeholder="--"
              aria-describedby={normalRange ? `${id}-range` : undefined}
            />
            <span className="text-xs text-white/60 ml-2 font-medium">{unit}</span>
          </div>
          {normalRange && (
            <div id={`${id}-range`} className="text-xs text-white/50 mt-1">
              Normal: {normalRange.min}-{normalRange.max} {unit}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

VitalSign.displayName = "VitalSign";

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
      <CollapsibleContent className="space-y-2 pl-9">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
});

VitalGroup.displayName = "VitalGroup";

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
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <HeartPulse className="h-5 w-5 text-white/80" />
          <h3 className="text-lg font-semibold text-white">Vital Signs Assessment</h3>
        </div>
        
        <div className="space-y-4">
          <VitalGroup title="Core Temperature" icon={<Thermometer className="h-4 w-4" />}>
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
            />
          </VitalGroup>

          <VitalGroup title="Cardiovascular" icon={<HeartPulse className="h-4 w-4" />}>
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
              label="Blood Pressure (Systolic/Diastolic)"
              value={vitals.bloodPressure || ""}
              unit="mmHg"
              icon={<Activity className="h-4 w-4" />}
              onChange={(value) => handleVitalChange("bloodPressure", value)}
            />
          </VitalGroup>

          <VitalGroup title="Respiratory" icon={<Wind className="h-4 w-4" />}>
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
          </VitalGroup>
        </div>
      </div>
    </div>
  );
}
