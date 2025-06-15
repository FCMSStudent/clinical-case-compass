import React from "react";
import { BentoCard } from "@/components/ui/bento-card";
import { BookOpen } from "lucide-react";
import { MedicalCase } from "@/types/case";
import { typography } from "@/lib/ui-styles";
import { cn } from "@/lib/utils";

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
          <div className={cn(typography.body.default, "leading-relaxed")}>
            {medicalCase.learningPoints}
          </div>
        ) : (
          <div className={cn(typography.body.small, "text-white/60 p-4 bg-white/5 rounded-lg border border-white/10")}>
            No learning points recorded for this case
          </div>
        )}
      </div>
    </BentoCard>
  );
};
