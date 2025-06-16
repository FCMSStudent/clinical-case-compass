import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { X, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { RadiologyStudy } from "@/types/case";
import { getStudyByName } from "../utils/radiologyData";

// Common radiology studies with typical findings
const COMMON_RADIOLOGY_STUDIES = [
  { 
    id: "chest-xray",
    name: "Chest X-Ray",
    type: "X-Ray",
    commonFindings: [
      "Normal",
      "Pulmonary infiltrates",
      "Pleural effusion",
      "Cardiomegaly",
      "Pneumothorax",
      "Atelectasis"
    ]
  },
  { 
    id: "ct-chest",
    name: "CT Chest",
    type: "CT",
    commonFindings: [
      "Normal",
      "Ground glass opacities",
      "Consolidation",
      "Pulmonary nodules",
      "Mediastinal lymphadenopathy",
      "Pleural effusion"
    ]
  },
  { 
    id: "ct-abdomen",
    name: "CT Abdomen/Pelvis",
    type: "CT",
    commonFindings: [
      "Normal",
      "Appendicitis",
      "Diverticulitis",
      "Cholecystitis",
      "Bowel obstruction",
      "Free fluid"
    ]
  },
  { 
    id: "mri-brain",
    name: "MRI Brain",
    type: "MRI",
    commonFindings: [
      "Normal",
      "Acute infarct",
      "Mass lesion",
      "White matter changes",
      "Cerebral edema",
      "Hemorrhage"
    ]
  },
  { 
    id: "us-abdomen",
    name: "Ultrasound Abdomen",
    type: "Ultrasound",
    commonFindings: [
      "Normal",
      "Cholelithiasis",
      "Hepatomegaly",
      "Splenomegaly",
      "Ascites",
      "Renal calculi"
    ]
  },
  { 
    id: "echo",
    name: "Echocardiogram",
    type: "Ultrasound",
    commonFindings: [
      "Normal",
      "Reduced EF",
      "Valvular disease",
      "Pericardial effusion",
      "Wall motion abnormality",
      "Cardiac chamber enlargement"
    ]
  }
] as const;

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