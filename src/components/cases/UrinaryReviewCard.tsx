
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Droplet } from "lucide-react";

interface UrinaryReviewCardProps {
  onSelectionChange?: (selections: string[]) => void;
  initialSelections?: string[];
}

const URINARY_SYMPTOMS = [
  "Dysuria",
  "Frequency",
  "Urgency",
  "Hesitancy",
  "Nocturia",
  "Hematuria",
  "Incontinence",
  "Polyuria",
  "Oliguria",
  "Flank pain",
  "Suprapubic pain",
  "Urinary retention"
];

export function UrinaryReviewCard({ onSelectionChange, initialSelections = [] }: UrinaryReviewCardProps) {
  const [selections, setSelections] = useState<string[]>(initialSelections);

  const handleCheckboxChange = (symptom: string, checked: boolean) => {
    let updatedSelections: string[];
    
    if (checked) {
      updatedSelections = [...selections, symptom];
    } else {
      updatedSelections = selections.filter(item => item !== symptom);
    }
    
    setSelections(updatedSelections);
    
    if (onSelectionChange) {
      onSelectionChange(updatedSelections);
    }
  };

  return (
    <Card className="border-medical-200 shadow-sm">
      <CardHeader className="pb-2 pt-4 px-4 bg-medical-50/70 flex flex-row items-center space-x-2">
        <Droplet className="h-4 w-4 text-medical-600" />
        <CardTitle className="text-sm font-medium text-medical-800">Urinary System Review</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-2">
          {URINARY_SYMPTOMS.map((symptom) => (
            <div key={symptom} className="flex items-center space-x-2">
              <Checkbox 
                id={`urinary-${symptom}`}
                checked={selections.includes(symptom)}
                onCheckedChange={(checked) => handleCheckboxChange(symptom, checked === true)}
                className="border-medical-300 data-[state=checked]:bg-medical-600"
              />
              <Label 
                htmlFor={`urinary-${symptom}`}
                className="text-xs cursor-pointer"
              >
                {symptom}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
