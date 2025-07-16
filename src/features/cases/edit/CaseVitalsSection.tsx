
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { HeartPulse } from "lucide-react";
import { InteractiveVitalsCard } from "@/features/cases/InteractiveVitalsCard";

interface CaseVitalsSectionProps {
  onVitalsChange: (vitals: Record<string, string>) => void;
  initialVitals?: Record<string, string>;
  patientAge?: number;
}

export const CaseVitalsSection: React.FC<CaseVitalsSectionProps> = ({
  onVitalsChange,
  initialVitals,
  patientAge
}) => {
  return (
    <Card className="medical-section-container">
      <CardHeader className="medical-section-header">
        <CardTitle className="medical-section-title">
          <HeartPulse className="icon-with-text" />
          Vital Signs
        </CardTitle>
      </CardHeader>
      <CardContent className="medical-section-content">
        <InteractiveVitalsCard
          onVitalsChange={onVitalsChange}
          initialVitals={initialVitals}
          patientAge={patientAge}
        />
      </CardContent>
    </Card>
  );
};
