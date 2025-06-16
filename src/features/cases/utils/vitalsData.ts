import { Thermometer, Heart, ArrowUp, ArrowDown, Wind, Activity } from "lucide-react";

export type VitalName =
  | "temperature"
  | "heartRate"
  | "systolicBP"
  | "diastolicBP"
  | "respiratoryRate"
  | "oxygenSaturation";

export interface VitalRange {
  min: number;
  max: number;
}

export interface VitalSign {
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

// Create initial vital signs configuration
export function createInitialVitalSigns(
  normalRanges: ReturnType<typeof getNormalRanges>,
  initialVitals: Partial<Record<VitalName, string>> = {}
): VitalSign[] {
  return [
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
  ];
} 