import { BentoCard } from "@/shared/components/bento-card";
import { Badge } from "@/shared/components/badge";
import { Stethoscope, AlertCircle } from "lucide-react";
import { MedicalCase } from "@/shared/types/case";
import { typography } from '@/design-system/tokens/typography';
import { cn } from "@/shared/utils/utils";

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
      <div className="space-y-4">
        {medicalCase.diagnoses && medicalCase.diagnoses.length > 0 ? (
          <div className="space-y-4">
            {medicalCase.diagnoses.map((diagnosis) => (
              <div key={diagnosis.id} className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className={cn(typography.body.default, "font-medium leading-relaxed")}>
                    {diagnosis.name}
                  </div>
                  <Badge 
                    variant={diagnosis.status === "confirmed" ? "default" : "outline"}
                    className="bg-white/10 border-white/20 text-white capitalize text-xs font-medium flex-shrink-0"
                  >
                    {diagnosis.status}
                  </Badge>
                </div>
                {diagnosis.notes && (
                  <div className={cn(typography.body.small, "text-white/70 leading-relaxed")}>
                    <span className="text-white/60 font-medium">Note:</span> {diagnosis.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3 text-white/60 p-4 bg-white/5 rounded-lg border border-white/10">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span className={typography.body.small}>No diagnoses recorded for this case</span>
          </div>
        )}
      </div>
    </BentoCard>
  );
};
