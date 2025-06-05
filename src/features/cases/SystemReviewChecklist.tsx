import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button"; // Common import
import { Badge } from "@/components/ui/badge"; // From main
import { Check, X, ChevronDown, ChevronRight } from "lucide-react"; // Combined icons
import { systemSymptoms } from "./systemSymptoms"; // From main

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

  const handleSelectAll = (system: string) => {
    // Using systemSymptoms as the source of truth for all possible symptoms
    const allSymptoms = systemSymptoms.find(s => s.system === system)?.symptoms || [];
    const updatedSymptoms = {
      ...selectedSymptoms,
      [system]: [...allSymptoms]
    };
    setSelectedSymptoms(updatedSymptoms);
    if (onSystemSymptomsChange) {
      onSystemSymptomsChange(updatedSymptoms);
    }
  };

  const handleClearAll = (system: string) => {
    const updatedSymptoms = { ...selectedSymptoms };
    delete updatedSymptoms[system];
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
              <div className="flex items-center space-x-2">
                <span className="font-medium text-medical-700">{system}</span>
                {selectedSymptoms[system]?.length > 0 && (
                  <Badge variant="outline" className="bg-medical-100 text-xs font-normal">
                    {selectedSymptoms[system].length}/{symptoms.length}
                  </Badge>
                )}
              </div>
              {expandedSystems[system] ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              {/* This div combines the styling and content for Select All/Clear buttons */}
              <div className="flex justify-end space-x-1 mb-2 mr-2">
                <Button variant="outline" size="sm" className="h-7 text-xs border-medical-300" onClick={() => handleSelectAll(system)}>
                  <Check className="h-3 w-3 mr-1" /> All
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs border-medical-300" onClick={() => handleClearAll(system)}>
                  <X className="h-3 w-3 mr-1" /> Clear
                </Button>
              </div>
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