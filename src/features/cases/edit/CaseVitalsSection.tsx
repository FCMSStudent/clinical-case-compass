
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { HeartPulse } from "lucide-react";
import { InteractiveVitalsCard } from "@/features/cases/InteractiveVitalsCard";
import { medicalSection, iconWithText } from "@/design-system/ui-styles";

interface CaseVitalsSectionProps {
  onVitalsChange: (vitals: Record<string, string>) => void;
  initialVitals: Record<string, string>;
  patientAge?: number;
}

export const CaseVitalsSection: React.FC<CaseVitalsSectionProps> = ({
  onVitalsChange,
  initialVitals,
  patientAge
}) => {
  return (
    <Card className={medicalSection.container}>
      <CardHeader className={medicalSection.header}>
        <CardTitle className={medicalSection.title}>
          <HeartPulse className={iconWithText} />
          Vital Signs
        </CardTitle>
      </CardHeader>
      <CardContent className={medicalSection.content}>
        <InteractiveVitalsCard
          onVitalsChange={onVitalsChange}
          initialVitals={initialVitals}
          patientAge={patientAge}
        />
      </CardContent>
    </Card>
  );
};
