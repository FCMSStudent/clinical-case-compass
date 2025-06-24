import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { Checkbox } from "@/shared/components/checkbox";
import { Label } from "@/shared/components/label";
import { Droplet } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { Button } from "@/shared/components/button";
import { Check, X } from "lucide-react";
import { Badge } from "@/shared/components/badge";

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

  const handleSelectAll = () => {
    setSelections([...URINARY_SYMPTOMS]);
    
    if (onSelectionChange) {
      onSelectionChange([...URINARY_SYMPTOMS]);
    }
  };

  const handleClearAll = () => {
    setSelections([]);
    
    if (onSelectionChange) {
      onSelectionChange([]);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
        <div className="pb-2 pt-4 px-6 flex items-center gap-2">
          <Droplet className="h-5 w-5 text-white/80" />
          <h3 className="text-sm font-medium text-white">Urinary System Review</h3>
          {selections.length > 0 && (
            <Badge variant="outline" className="bg-white/20 text-xs font-normal text-white ml-2">
              {selections.length}/{URINARY_SYMPTOMS.length}
            </Badge>
          )}
          <div className="flex items-center space-x-1 ml-auto">
            <Button 
              variant="outline" 
              size="sm"
              className="h-7 text-xs border-white/20 bg-white/10 text-white"
              onClick={handleSelectAll}
            >
              <Check className="h-3 w-3 mr-1" />
              All
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="h-7 text-xs border-white/20 bg-white/10 text-white"
              onClick={handleClearAll}
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-2">
            {URINARY_SYMPTOMS.map((symptom) => (
              <div
                key={symptom}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={`urinary-${symptom}`}
                  checked={selections.includes(symptom)}
                  onCheckedChange={(checked) => handleCheckboxChange(symptom, checked === true)}
                  className={cn(selections.includes(symptom) && "bg-blue-500 border-blue-500")}
                />
                <Label
                  htmlFor={`urinary-${symptom}`}
                  className={cn(
                    "text-xs cursor-pointer text-white",
                    selections.includes(symptom) && "font-semibold"
                  )}
                >
                  {symptom}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </Card>
  );
}
