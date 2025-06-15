
import React from "react";
import { BentoCard } from "@/components/ui/bento-card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, AlertCircle } from "lucide-react";
import { MedicalCase } from "@/types/case";
import { typography, spacing } from "@/lib/ui-styles";

interface DiagnosisCardProps {
  medicalCase: MedicalCase;
}

export const DiagnosisCard: React.FC<DiagnosisCardProps> = ({ medicalCase }) => {
  return (
    <BentoCard
      layout="medium"
      variant="elevated"
      icon={<Stethoscope />}
      title="Diagnosis"
    >
      <div className={spacing.section.sm}>
        {medicalCase.diagnoses && medicalCase.diagnoses.length > 0 ? (
          <div className="space-y-3">
            {medicalCase.diagnoses.map((diagnosis) => (
              <div key={diagnosis.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className={typography.body.default}>{diagnosis.name}</div>
                  <Badge 
                    variant={diagnosis.status === "confirmed" ? "default" : "outline"}
                    className="bg-white/10 border-white/20 text-white capitalize"
                  >
                    {diagnosis.status}
                  </Badge>
                </div>
                {diagnosis.notes && (
                  <div className={typography.body.small}>
                    <span className="text-white/60">Note:</span> {diagnosis.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-white/60">
            <AlertCircle className="h-4 w-4" />
            <span className={typography.body.small}>No diagnoses recorded</span>
          </div>
        )}
      </div>
    </BentoCard>
  );
};
