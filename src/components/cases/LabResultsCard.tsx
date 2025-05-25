
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TestTube, Plus, X } from "lucide-react";

interface LabResultsCardProps {
  onLabResultsChange?: (results: LabTest[]) => void;
  initialResults?: LabTest[];
}

export interface LabTest {
  id: string;
  name: string;
  value: string;
  unit: string;
}

// Expanded lab test options in alphabetical order
const LAB_TEST_OPTIONS = [
  { name: "ALT (Alanine Aminotransferase)", unit: "U/L" },
  { name: "Albumin", unit: "g/dL" },
  { name: "Alkaline Phosphatase", unit: "U/L" },
  { name: "AST (Aspartate Aminotransferase)", unit: "U/L" },
  { name: "Bilirubin, Direct", unit: "mg/dL" },
  { name: "Bilirubin, Total", unit: "mg/dL" },
  { name: "Blood Glucose", unit: "mg/dL" },
  { name: "Blood Urea Nitrogen", unit: "mg/dL" },
  { name: "C-Reactive Protein", unit: "mg/L" },
  { name: "Calcium", unit: "mg/dL" },
  { name: "Chloride", unit: "mmol/L" },
  { name: "Complete Blood Count (CBC)", unit: "" },
  { name: "Creatinine", unit: "mg/dL" },
  { name: "D-Dimer", unit: "ng/mL" },
  { name: "Erythrocyte Sedimentation Rate", unit: "mm/hr" },
  { name: "Ferritin", unit: "ng/mL" },
  { name: "Fibrinogen", unit: "mg/dL" },
  { name: "GGT (Gamma-Glutamyl Transferase)", unit: "U/L" },
  { name: "Hematocrit", unit: "%" },
  { name: "Hemoglobin", unit: "g/dL" },
  { name: "Hemoglobin A1C", unit: "%" },
  { name: "Iron", unit: "μg/dL" },
  { name: "Lactate", unit: "mmol/L" },
  { name: "Lipase", unit: "U/L" },
  { name: "Lipid Panel", unit: "mg/dL" },
  { name: "Magnesium", unit: "mg/dL" },
  { name: "Partial Thromboplastin Time", unit: "sec" },
  { name: "Platelets", unit: "K/μL" },
  { name: "Potassium", unit: "mmol/L" },
  { name: "Procalcitonin", unit: "ng/mL" },
  { name: "Prothrombin Time", unit: "sec" },
  { name: "Sodium", unit: "mmol/L" },
  { name: "Thyroid Stimulating Hormone", unit: "mIU/L" },
  { name: "Thyroxine (T4)", unit: "μg/dL" },
  { name: "Troponin I", unit: "ng/mL" },
  { name: "Urinalysis", unit: "" },
  { name: "White Blood Cell Count", unit: "K/μL" },
  { name: "Other", unit: "" }
];

export function LabResultsCard({ onLabResultsChange, initialResults = [] }: LabResultsCardProps) {
  const [labResults, setLabResults] = useState<LabTest[]>(initialResults);

  const handleAddTest = () => {
    const newTest: LabTest = {
      id: `lab-${Date.now()}`,
      name: "",
      value: "",
      unit: ""
    };
    
    const updatedResults = [...labResults, newTest];
    setLabResults(updatedResults);
    
    if (onLabResultsChange) {
      onLabResultsChange(updatedResults);
    }
  };

  const handleRemoveTest = (id: string) => {
    const updatedResults = labResults.filter(test => test.id !== id);
    setLabResults(updatedResults);
    
    if (onLabResultsChange) {
      onLabResultsChange(updatedResults);
    }
  };

  const handleTestChange = (id: string, field: keyof LabTest, value: string) => {
    const updatedResults = labResults.map(test => {
      if (test.id === id) {
        const updatedTest = { ...test, [field]: value };
        
        // Set the unit when test name is selected
        if (field === "name") {
          const selectedTest = LAB_TEST_OPTIONS.find(option => option.name === value);
          if (selectedTest) {
            updatedTest.unit = selectedTest.unit;
          }
        }
        
        return updatedTest;
      }
      return test;
    });
    
    setLabResults(updatedResults);
    
    if (onLabResultsChange) {
      onLabResultsChange(updatedResults);
    }
  };

  return (
    <Card className="border-medical-200 shadow-sm">
      <CardContent className="p-4 space-y-3">
        {labResults.length === 0 ? (
          <div className="text-sm text-medical-500 italic">No lab tests added yet</div>
        ) : (
          labResults.map((test) => (
            <div key={test.id} className="border border-medical-100 rounded-md p-3 bg-white">
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <TestTube className="h-4 w-4 text-medical-600 mr-2" />
                  <Label className="text-xs font-medium text-medical-700">Test</Label>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0" 
                  onClick={() => handleRemoveTest(test.id)}
                >
                  <X className="h-4 w-4 text-medical-500" />
                </Button>
              </div>
              <Select
                value={test.name}
                onValueChange={(value) => handleTestChange(test.id, "name", value)}
              >
                <SelectTrigger className="w-full mb-2 h-8 text-xs border-medical-200">
                  <SelectValue placeholder="Select test" />
                </SelectTrigger>
                <SelectContent>
                  {LAB_TEST_OPTIONS.map((option) => (
                    <SelectItem key={option.name} value={option.name} className="text-xs">
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <div className="flex-grow">
                  <Label className="text-xs text-medical-600">Result Value</Label>
                  <Input
                    value={test.value}
                    onChange={(e) => handleTestChange(test.id, "value", e.target.value)}
                    className="h-8 px-2 py-1 text-sm border-medical-200"
                    placeholder="Result"
                  />
                </div>
                {test.unit && (
                  <div className="w-16 flex-shrink-0">
                    <Label className="text-xs text-medical-600">Unit</Label>
                    <div className="h-8 px-2 py-1 text-sm border border-medical-200 bg-medical-50 rounded-md flex items-center">
                      {test.unit}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full mt-2 text-xs border-dashed border-medical-300 hover:bg-medical-50"
          onClick={handleAddTest}
        >
          <Plus className="h-3 w-3 mr-1" /> Add Lab Test
        </Button>
      </CardContent>
    </Card>
  );
}
