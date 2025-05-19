
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Thermometer, HeartPulse, Activity, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

interface VitalSignProps {
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  onChange: (value: string) => void;
}

interface VitalsCardProps {
  onVitalsChange?: (vitals: Record<string, string>) => void;
  initialVitals?: Record<string, string>;
}

const VitalSign: React.FC<VitalSignProps> = ({ label, value, unit, icon, onChange }) => {
  return (
    <div className="flex items-center space-x-2 mb-3">
      <div className="h-8 w-8 rounded-full bg-medical-100 flex items-center justify-center text-medical-600 flex-shrink-0">
        {icon}
      </div>
      <div className="flex-grow">
        <Label className="text-xs text-medical-600">{label}</Label>
        <div className="flex items-center">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 px-2 py-1 text-sm border-medical-200"
            placeholder="--"
          />
          <span className="text-xs text-medical-500 ml-1">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export function VitalsCard({ onVitalsChange, initialVitals = {} }: VitalsCardProps) {
  const [vitals, setVitals] = useState<Record<string, string>>(initialVitals);

  const handleVitalChange = (key: string, value: string) => {
    const updatedVitals = {
      ...vitals,
      [key]: value
    };
    
    setVitals(updatedVitals);
    
    if (onVitalsChange) {
      onVitalsChange(updatedVitals);
    }
  };

  return (
    <Card className="border-medical-200 shadow-sm">
      <CardHeader className="pb-2 pt-4 px-4 bg-medical-50/70">
        <CardTitle className="text-sm font-medium text-medical-800">Vital Signs</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-1">
        <VitalSign
          label="Temperature"
          value={vitals.temperature || ""}
          unit="°C"
          icon={<Thermometer className="h-4 w-4" />}
          onChange={(value) => handleVitalChange("temperature", value)}
        />
        <VitalSign
          label="Heart Rate"
          value={vitals.heartRate || ""}
          unit="bpm"
          icon={<HeartPulse className="h-4 w-4" />}
          onChange={(value) => handleVitalChange("heartRate", value)}
        />
        <VitalSign
          label="Blood Pressure"
          value={vitals.bloodPressure || ""}
          unit="mmHg"
          icon={<Activity className="h-4 w-4" />}
          onChange={(value) => handleVitalChange("bloodPressure", value)}
        />
        <VitalSign
          label="Respiratory Rate"
          value={vitals.respiratoryRate || ""}
          unit="bpm"
          icon={<Wind className="h-4 w-4" />}
          onChange={(value) => handleVitalChange("respiratoryRate", value)}
        />
      </CardContent>
    </Card>
  );
}
