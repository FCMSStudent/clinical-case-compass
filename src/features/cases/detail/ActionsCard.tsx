
import React from "react";
import { BentoCard } from "@/shared/components/bento-card";
import { Button } from "@/shared/components/button";
import { Edit, Trash2, Settings } from "lucide-react";

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
      <div className="flex flex-col gap-3">
        <Button
          onClick={onEdit}
          size="sm"
          variant="primary"
          className="w-full justify-start gap-2 text-sm font-medium"
        >
          <Edit className="h-4 w-4" />
          Edit Case
        </Button>
        <Button
          onClick={onDelete}
          size="sm"
          variant="destructive"
          className="w-full justify-start gap-2 text-sm font-medium"
        >
          <Trash2 className="h-4 w-4" />
          Delete Case
        </Button>
      </div>
    </BentoCard>
  );
};
