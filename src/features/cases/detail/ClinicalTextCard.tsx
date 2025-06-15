
import React from "react";
import { BentoCard } from "@/components/ui/bento-card";
import { typography, spacing } from "@/lib/ui-styles";

interface ClinicalTextCardProps {
  icon: React.ReactNode;
  title: string;
  content?: string;
  layout?: "small" | "medium" | "large" | "hero" | "featured" | "tall";
  placeholder?: string;
}

export const ClinicalTextCard: React.FC<ClinicalTextCardProps> = ({ 
  icon, 
  title, 
  content, 
  layout = "medium",
  placeholder = "No information recorded"
}) => {
  return (
    <BentoCard
      layout={layout}
      variant="default"
      icon={icon}
      title={title}
    >
      <div className={spacing.section.sm}>
        {content ? (
          <p className={typography.body.default}>{content}</p>
        ) : (
          <p className={`${typography.body.small} text-white/60`}>{placeholder}</p>
        )}
      </div>
    </BentoCard>
  );
};
