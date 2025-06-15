
import React from "react";
import { BentoCard } from "@/components/ui/bento-card";
import { BookOpen } from "lucide-react";
import { MedicalCase } from "@/types/case";
import { typography } from "@/lib/ui-styles";

interface LearningPointsCardProps {
  medicalCase: MedicalCase;
}

export const LearningPointsCard: React.FC<LearningPointsCardProps> = ({ medicalCase }) => {
  return (
    <BentoCard
      layout="wide"
      variant="default"
      icon={<BookOpen />}
      title="Learning Points"
    >
      <div className="space-y-3">
        {medicalCase.learningPoints ? (
          <p className={`${typography.body.default} leading-relaxed`}>{medicalCase.learningPoints}</p>
        ) : (
          <p className={`${typography.body.small} text-white/60`}>
            No learning points recorded for this case
          </p>
        )}
      </div>
    </BentoCard>
  );
};
