
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Droplet } from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <Card className="border-medical-200 shadow-sm">
      <CardHeader className="pb-2 pt-4 px-4 bg-medical-50/70 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Droplet className="h-4 w-4 text-medical-600" />
          <CardTitle className="text-sm font-medium text-medical-800">Urinary System Review</CardTitle>
          {selections.length > 0 && (
            <Badge variant="outline" className="bg-medical-100 text-xs font-normal">
              {selections.length}/{URINARY_SYMPTOMS.length}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <Button 
            variant="outline" 
            size="sm"
            className="h-7 text-xs border-medical-300"
            onClick={handleSelectAll}
          >
            <Check className="h-3 w-3 mr-1" />
            All
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="h-7 text-xs border-medical-300"
            onClick={handleClearAll}
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-2">
          {URINARY_SYMPTOMS.map((symptom) => (
            <div 
              key={symptom} 
              className={cn(
                "flex items-center space-x-2 p-1 rounded transition-colors",
                selections.includes(symptom) && "bg-medical-50"
              )}
            >
              <Checkbox 
                id={`urinary-${symptom}`}
                checked={selections.includes(symptom)}
                onCheckedChange={(checked) => handleCheckboxChange(symptom, checked === true)}
                className={cn(
                  "border-medical-300 transition-all duration-200",
                  selections.includes(symptom) && "bg-medical-600 border-medical-600"
                )}
              />
              <Label 
                htmlFor={`urinary-${symptom}`}
                className={cn(
                  "text-xs cursor-pointer",
                  selections.includes(symptom) && "text-medical-900"
                )}
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
