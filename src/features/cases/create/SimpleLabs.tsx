
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

const COMMON_TESTS = [
  { name: "Hemoglobin", unit: "g/dL" },
  { name: "WBC", unit: "10^9/L" },
  { name: "Platelets", unit: "10^9/L" },
  { name: "Sodium", unit: "mmol/L" },
  { name: "Potassium", unit: "mmol/L" },
  { name: "Creatinine", unit: "mg/dL" },
  { name: "Glucose", unit: "mg/dL" },
  { name: "AST", unit: "U/L" },
  { name: "ALT", unit: "U/L" },
] as const;

interface LabResult {
  id: string;
  name: string;
  value: string;
  unit: string;
}

interface SimpleLabsProps {
  onLabChange?: (labs: LabResult[]) => void;
}

export function SimpleLabs({ onLabChange }: SimpleLabsProps) {
  const [labs, setLabs] = useState<LabResult[]>([]);
  const [selectedTest, setSelectedTest] = useState("");
  const [testValue, setTestValue] = useState("");

  const addLab = () => {
    if (!selectedTest || !testValue) return;

    const test = COMMON_TESTS.find(t => t.name === selectedTest);
    if (!test) return;

    const newLab: LabResult = {
      id: `lab-${Date.now()}`,
      name: test.name,
      value: testValue,
      unit: test.unit,
    };

    const updatedLabs = [...labs, newLab];
    setLabs(updatedLabs);
    onLabChange?.(updatedLabs);
    
    setSelectedTest("");
    setTestValue("");
  };

  const removeLab = (id: string) => {
    const updatedLabs = labs.filter(lab => lab.id !== id);
    setLabs(updatedLabs);
    onLabChange?.(updatedLabs);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <Select value={selectedTest} onValueChange={setSelectedTest}>
          <SelectTrigger className="bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Select test" />
          </SelectTrigger>
          <SelectContent>
            {COMMON_TESTS.map((test) => (
              <SelectItem key={test.name} value={test.name}>
                {test.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Input
          type="number"
          placeholder="Value"
          value={testValue}
          onChange={(e) => setTestValue(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
        
        <Button
          type="button"
          onClick={addLab}
          size="sm"
          className="bg-blue-500/80 hover:bg-blue-600 text-white"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {labs.map((lab) => (
          <div key={lab.id} className="flex items-center justify-between p-2 bg-white/10 rounded-md">
            <div className="text-sm text-white">
              <span className="font-medium">{lab.name}:</span> {lab.value} {lab.unit}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeLab(lab.id)}
              className="h-6 w-6 p-0 text-white/60 hover:text-white"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        {labs.length === 0 && (
          <div className="text-sm text-white/60 text-center py-4">
            No lab results added yet
          </div>
        )}
      </div>
    </div>
  );
}
