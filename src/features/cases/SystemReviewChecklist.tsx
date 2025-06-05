
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { systemSymptoms } from "./systemSymptoms";

interface SystemReviewChecklistProps {
  onSystemSymptomsChange?: (systemSymptoms: Record<string, string[]>) => void;
  initialSystemSymptoms?: Record<string, string[]>;
}


export function SystemReviewChecklist({ onSystemSymptomsChange, initialSystemSymptoms = {} }: SystemReviewChecklistProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, string[]>>(initialSystemSymptoms);
  const [expandedSystems, setExpandedSystems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setSelectedSymptoms(initialSystemSymptoms);
  }, [initialSystemSymptoms]);

  const handleSymptomChange = (system: string, symptom: string, checked: boolean) => {
    const updatedSymptoms = { ...selectedSymptoms };
    
    if (!updatedSymptoms[system]) {
      updatedSymptoms[system] = [];
    }
    
    if (checked) {
      if (!updatedSymptoms[system].includes(symptom)) {
        updatedSymptoms[system] = [...updatedSymptoms[system], symptom];
      }
    } else {
      updatedSymptoms[system] = updatedSymptoms[system].filter(s => s !== symptom);
      if (updatedSymptoms[system].length === 0) {
        delete updatedSymptoms[system];
      }
    }
    
    setSelectedSymptoms(updatedSymptoms);
    
    if (onSystemSymptomsChange) {
      onSystemSymptomsChange(updatedSymptoms);
    }
  };

  const toggleSystem = (system: string) => {
    setExpandedSystems(prev => ({
      ...prev,
      [system]: !prev[system]
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Review & Symptoms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {systemSymptoms.map(({ system, symptoms }) => (
          <Collapsible
            key={system}
            open={expandedSystems[system]}
            onOpenChange={() => toggleSystem(system)}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-medical-50 hover:bg-medical-100 rounded-md transition-colors">
              <span className="font-medium text-medical-700">{system}</span>
              <div className="flex items-center space-x-2">
                {selectedSymptoms[system]?.length > 0 && (
                  <span className="text-xs bg-medical-200 text-medical-800 px-2 py-1 rounded">
                    {selectedSymptoms[system].length} selected
                  </span>
                )}
                {expandedSystems[system] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="grid grid-cols-2 gap-2 ml-4">
                {symptoms.map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${system}-${symptom}`}
                      checked={selectedSymptoms[system]?.includes(symptom) || false}
                      onCheckedChange={(checked) => 
                        handleSymptomChange(system, symptom, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`${system}-${symptom}`} 
                      className="text-sm cursor-pointer"
                    >
                      {symptom}
                    </Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
}
