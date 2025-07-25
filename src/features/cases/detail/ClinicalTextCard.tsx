
import { BentoCard } from "@/shared/components/bento-card";
import { typography } from '@/design-system/tokens/typography';
import { cn } from "@/shared/utils/utils";

interface ClinicalTextCardProps {
  icon: React.ReactNode;
  title: string;
  content?: string;
  layout?: "small" | "medium" | "large" | "hero" | "wide" | "tall";
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
      <div className="space-y-2">
        {content ? (
          <div className={cn(typography.body.default, "leading-relaxed")}>
            {content}
          </div>
        ) : (
          <div className={cn(typography.body.small, "text-white/60 p-4 bg-white/5 rounded-lg border border-white/10")}>
            {placeholder}
          </div>
        )}
      </div>
    </BentoCard>
  );
};
