
import React from "react";
import { BentoCard } from "@/shared/components/bento-card";
import { Activity } from "lucide-react";
import { InteractiveVitalsCard } from "@/features/cases/InteractiveVitalsCard";
import { MedicalCase } from "@/shared/types/case";

interface VitalsCardProps {
  medicalCase: MedicalCase;
  onVitalsChange: (vitals: Record<string, string>) => void;
}

export const VitalsCard: React.FC<VitalsCardProps> = ({ medicalCase, onVitalsChange }) => {
  // Extract initial vitals from the medical case
  const initialVitals = medicalCase.vitals ? {
    temperature: medicalCase.vitals.temperature?.toString() || "37",
    heartRate: medicalCase.vitals.heartRate?.toString() || "80",
    systolicBP: medicalCase.vitals.systolicBP?.toString() || "120",
    diastolicBP: medicalCase.vitals.diastolicBP?.toString() || "80",
    respiratoryRate: medicalCase.vitals.respiratoryRate?.toString() || "16",
    oxygenSaturation: medicalCase.vitals.oxygenSaturation?.toString() || "98"
  } : undefined;

  return (
    <BentoCard
      layout="large"
      variant="interactive"
      icon={<Activity />}
      title="Vital Signs"
    >
      <InteractiveVitalsCard 
        onVitalsChange={onVitalsChange}
        initialVitals={initialVitals}
        patientAge={medicalCase.patient.age}
      />
    </BentoCard>
  );
};
