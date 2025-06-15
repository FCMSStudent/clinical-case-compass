
import React from "react";
import { BentoCard } from "@/components/ui/bento-card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Settings } from "lucide-react";
import { buttonVariants, spacing, layouts } from "@/lib/ui-styles";

interface ActionsCardProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionsCard: React.FC<ActionsCardProps> = ({ onEdit, onDelete }) => {
  return (
    <BentoCard
      layout="small"
      variant="compact"
      icon={<Settings />}
      title="Actions"
    >
      <div className={`${spacing.section.sm} ${layouts.flex.col} gap-2`}>
        <Button
          onClick={onEdit}
          size="sm"
          className={buttonVariants.primary}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Case
        </Button>
        <Button
          onClick={onDelete}
          size="sm"
          variant="destructive"
          className={buttonVariants.destructive}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Case
        </Button>
      </div>
    </BentoCard>
  );
};
