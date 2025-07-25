
import { Button } from "@/shared/components/button";
import { Label } from "@/shared/components/label";
import { motion } from "framer-motion";
import { X, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/shared/components/badge";
import type { RadiologyStudy } from "@/shared/types/case";
import { getStudyByName } from "../utils/radiologyData";

// Common radiology studies with typical findings (commented out as unused)

interface RadiologyStudyItemProps {
  study: RadiologyStudy;
  onRemove: (id: string) => void;
}

export const RadiologyStudyItem: React.FC<RadiologyStudyItemProps> = ({ 
  study, 
  onRemove 
}) => {
  const commonStudy = getStudyByName(study.name);
  const date = new Date(study.date).toLocaleDateString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="border rounded-lg p-4 space-y-3 bg-white"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{study.name}</span>
            <Badge variant="outline" className="text-xs">
              {study.type}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            {date}
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
          onClick={() => onRemove(study.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground">Findings</Label>
        <div className="text-sm bg-muted/50 rounded-md p-3">
          {study.findings}
        </div>
      </div>

      {commonStudy && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ImageIcon className="h-3 w-3" />
          <span>Common study type with predefined findings</span>
        </div>
      )}
    </motion.div>
  );
}; 