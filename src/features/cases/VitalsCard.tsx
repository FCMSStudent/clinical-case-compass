// -----------------------------------------------------------------------------
// Vitals Card – Liquid Glass Edition
// -----------------------------------------------------------------------------
// * Displays a set of vital-sign inputs inside a frosted Card container.
// * Each `VitalSign` shows out-of-range feedback via coloured borders
//   (green = normal, blue = low, red = high).
// * Uses `memo` + `useCallback` for perf; props remain type-safe.
// -----------------------------------------------------------------------------

import * as React from "react";
import { useState, useCallback, memo } from "react";
import { cva } from "class-variance-authority";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Thermometer,
  HeartPulse,
  Activity,
  Wind,
  Gauge,
} from "lucide-react";

// -----------------------------------------------------------------------------
// Types ------------------------------------------------------------------------
export interface VitalsCardProps {
  onVitalsChange?: (v: Record<string, string>) => void;
  initialVitals?: Record<string, string>;
  surface?: "none" | "glass-subtle" | "glass" | "glass-elevated";
}

interface VitalSignProps {
  id: string;
  label: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  onChange: (v: string) => void;
  type?: "text" | "number";
  min?: number;
  max?: number;
  normalRange?: { min: number; max: number };
  className?: string;
}

// -----------------------------------------------------------------------------
// Variant Styles ---------------------------------------------------------------
const statusBorder = cva("border bg-white/5", {
  variants: {
    state: {
      normal: "border-green-400 bg-green-500/20",
      low: "border-blue-400 bg-blue-500/20",
      high: "border-red-400 bg-red-500/20",
      none: "border-white/20",
    },
  },
  defaultVariants: { state: "none" },
});

// -----------------------------------------------------------------------------
// VitalSign component ----------------------------------------------------------
const VitalSign = memo<VitalSignProps>(
  ({
    id,
    label,
    value,
    unit,
    icon,
    onChange,
    type = "text",
    min,
    max,
    normalRange,
    className,
  }) => {
    // Determine status -------------------------------------------------------
    const status = React.useMemo(() => {
      if (!normalRange || !value || isNaN(Number(value))) return "none" as const;
      const n = Number(value);
      if (n < normalRange.min) return "low" as const;
      if (n > normalRange.max) return "high" as const;
      return "normal" as const;
    }, [value, normalRange]);

    return (
      <div
        className={cn(
          "rounded-xl border p-3 backdrop-blur-sm transition-all hover:bg-white/10",
          statusBorder({ state: status }),
          className,
        )}
      >
        {/* Header */}
        <div className="mb-3 flex items-center space-x-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white">
            {icon}
          </div>
          <Label htmlFor={id} className="text-sm font-medium text-white/90">
            {label}
          </Label>
        </div>

        {/* Input row */}
        <div className="flex items-center space-x-3">
          <Input
            id={id}
            type={type}
            min={min}
            max={max}
            value={value}
            placeholder="--"
            aria-describedby={normalRange ? `${id}-range` : undefined}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 flex-1 bg-white/5 px-3 text-sm text-white placeholder:text-white/60 focus:bg-white/10 focus:border-blue-400/60"
          />
          <span className="min-w-fit text-sm font-medium text-white/80">{unit}</span>
        </div>

        {/* Range helper */}
        {normalRange && (
          <p
            id={`${id}-range`}
            className="mt-2 text-xs text-white/70"
          >
            Normal: {normalRange.min}-{normalRange.max} {unit}
          </p>
        )}
      </div>
    );
  },
);
VitalSign.displayName = "VitalSign";

// -----------------------------------------------------------------------------
// VitalsCard -------------------------------------------------------------------
export const VitalsCard: React.FC<VitalsCardProps> = ({
  onVitalsChange,
  initialVitals = {},
  surface = "glass-elevated",
}) => {
  const [vitals, setVitals] = useState<Record<string, string>>(initialVitals);

  // Callback to bubble up state ---------------------------------------------
  const handleChange = useCallback(
    (key: string, val: string) => {
      const next = { ...vitals, [key]: val };
      setVitals(next);
      onVitalsChange?.(next);
    },
    [vitals, onVitalsChange],
  );

  return (
    <Card variant={surface} className="w-full">
      <CardHeader className="mb-4 p-0">
        <h3 className="text-lg font-semibold text-white">Vital Signs</h3>
      </CardHeader>

      <CardContent className="grid auto-rows-min grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Temperature */}
        <VitalSign
          id="temperature"
          label="Body Temperature"
          value={vitals.temperature ?? ""}
          unit="°C"
          type="number"
          min={30}
          max={45}
          normalRange={{ min: 36.5, max: 37.5 }}
          icon={<Thermometer className="h-4 w-4" />}
          onChange={(v) => handleChange("temperature", v)}
          className="md:col-span-2"
        />

        {/* Heart Rate */}
        <VitalSign
          id="heartRate"
          label="Heart Rate"
          value={vitals.heartRate ?? ""}
          unit="bpm"
          type="number"
          min={30}
          max={200}
          normalRange={{ min: 60, max: 100 }}
          icon={<HeartPulse className="h-4 w-4" />}
          onChange={(v) => handleChange("heartRate", v)}
        />

        {/* Respiratory Rate */}
        <VitalSign
          id="respiratoryRate"
          label="Respiratory Rate"
          value={vitals.respiratoryRate ?? ""}
          unit="bpm"
          type="number"
          min={5}
          max={50}
          normalRange={{ min: 12, max: 20 }}
          icon={<Wind className="h-4 w-4" />}
          onChange={(v) => handleChange("respiratoryRate", v)}
        />

        {/* Blood Pressure */}
        <VitalSign
          id="bloodPressure"
          label="Blood Pressure (S/D)"
          value={vitals.bloodPressure ?? ""}
          unit="mmHg"
          icon={<Activity className="h-4 w-4" />}
          onChange={(v) => handleChange("bloodPressure", v)}
          className="col-span-2"
        />

        {/* Oxygen Saturation */}
        <VitalSign
          id="oxygenSaturation"
          label="O₂ Saturation"
          value={vitals.oxygenSaturation ?? ""}
          unit="%"
          type="number"
          min={70}
          max={100}
          normalRange={{ min: 95, max: 100 }}
          icon={<Gauge className="h-4 w-4" />}
          onChange={(v) => handleChange("oxygenSaturation", v)}
          className="col-span-2"
        />
      </CardContent>
    </Card>
  );
};
