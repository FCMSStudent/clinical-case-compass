
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface SymptomChecklistProps {
  onSymptomsSelected: (symptoms: string[]) => void;
}

export const SymptomChecklist: React.FC<SymptomChecklistProps> = ({
  onSymptomsSelected
}) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const symptoms = [
    "Fever", "Headache", "Nausea", "Fatigue", "Dizziness", 
    "Chest Pain", "Shortness of Breath", "Cough", "Sore Throat"
  ];

  const handleSymptomToggle = (symptom: string, checked: boolean) => {
    let updatedSymptoms;
    if (checked) {
      updatedSymptoms = [...selectedSymptoms, symptom];
    } else {
      updatedSymptoms = selectedSymptoms.filter(s => s !== symptom);
    }
    setSelectedSymptoms(updatedSymptoms);
    onSymptomsSelected(updatedSymptoms);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Symptoms</h3>
      <div className="space-y-3">
        {symptoms.map((symptom) => (
          <div key={symptom} className="flex items-center space-x-2">
            <Checkbox
              id={symptom}
              checked={selectedSymptoms.includes(symptom)}
              onCheckedChange={(checked) => handleSymptomToggle(symptom, checked as boolean)}
            />
            <label htmlFor={symptom} className="text-sm">
              {symptom}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
