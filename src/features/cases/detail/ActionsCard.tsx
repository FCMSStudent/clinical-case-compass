
import React from "react";
import { BentoCard } from "@/components/ui/bento-card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Settings } from "lucide-react";
import { buttonVariants } from "@/lib/ui-styles";

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
      compact={true}
    >
      <div className="flex flex-col gap-2">
        <Button
          onClick={onEdit}
          size="sm"
          className={`${buttonVariants.primary} w-full justify-start`}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button
          onClick={onDelete}
          size="sm"
          variant="destructive"
          className={`${buttonVariants.destructive} w-full justify-start`}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </BentoCard>
  );
};
