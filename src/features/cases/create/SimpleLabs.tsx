
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Search } from "lucide-react";

// Organized lab tests by category
const LAB_TEST_CATEGORIES = {
  "Complete Blood Count (CBC)": [
    { name: "Hemoglobin", unit: "g/dL" },
    { name: "Hematocrit", unit: "%" },
    { name: "WBC", unit: "10^9/L" },
    { name: "Neutrophils", unit: "%" },
    { name: "Lymphocytes", unit: "%" },
    { name: "Monocytes", unit: "%" },
    { name: "Eosinophils", unit: "%" },
    { name: "Basophils", unit: "%" },
    { name: "Platelets", unit: "10^9/L" },
    { name: "MCV", unit: "fL" },
    { name: "MCH", unit: "pg" },
    { name: "MCHC", unit: "g/dL" },
    { name: "RDW", unit: "%" },
  ],
  "Comprehensive Metabolic Panel (CMP)": [
    { name: "Glucose", unit: "mg/dL" },
    { name: "BUN", unit: "mg/dL" },
    { name: "Creatinine", unit: "mg/dL" },
    { name: "Sodium", unit: "mmol/L" },
    { name: "Potassium", unit: "mmol/L" },
    { name: "Chloride", unit: "mmol/L" },
    { name: "CO2", unit: "mmol/L" },
    { name: "Calcium", unit: "mg/dL" },
    { name: "Total Protein", unit: "g/dL" },
    { name: "Albumin", unit: "g/dL" },
    { name: "Total Bilirubin", unit: "mg/dL" },
    { name: "Alkaline Phosphatase", unit: "U/L" },
    { name: "AST", unit: "U/L" },
    { name: "ALT", unit: "U/L" },
  ],
  "Cardiac Markers": [
    { name: "Troponin I", unit: "ng/mL" },
    { name: "Troponin T", unit: "ng/mL" },
    { name: "CK-MB", unit: "ng/mL" },
    { name: "BNP", unit: "pg/mL" },
    { name: "NT-proBNP", unit: "pg/mL" },
  ],
  "Coagulation Studies": [
    { name: "PT", unit: "seconds" },
    { name: "INR", unit: "" },
    { name: "PTT", unit: "seconds" },
    { name: "D-Dimer", unit: "mg/L" },
    { name: "Fibrinogen", unit: "mg/dL" },
  ],
  "Inflammatory Markers": [
    { name: "ESR", unit: "mm/hr" },
    { name: "CRP", unit: "mg/L" },
    { name: "Procalcitonin", unit: "ng/mL" },
  ],
  "Thyroid Function": [
    { name: "TSH", unit: "mIU/L" },
    { name: "Free T4", unit: "ng/dL" },
    { name: "Free T3", unit: "pg/mL" },
    { name: "T3", unit: "ng/dL" },
    { name: "T4", unit: "μg/dL" },
  ],
  "Lipid Panel": [
    { name: "Total Cholesterol", unit: "mg/dL" },
    { name: "HDL Cholesterol", unit: "mg/dL" },
    { name: "LDL Cholesterol", unit: "mg/dL" },
    { name: "Triglycerides", unit: "mg/dL" },
  ],
  "Diabetes Markers": [
    { name: "HbA1c", unit: "%" },
    { name: "Fructosamine", unit: "μmol/L" },
  ],
  "Tumor Markers": [
    { name: "PSA", unit: "ng/mL" },
    { name: "CEA", unit: "ng/mL" },
    { name: "CA 19-9", unit: "U/mL" },
    { name: "CA 125", unit: "U/mL" },
    { name: "AFP", unit: "ng/mL" },
  ],
  "Urinalysis": [
    { name: "Specific Gravity", unit: "" },
    { name: "Protein", unit: "mg/dL" },
    { name: "Glucose", unit: "mg/dL" },
    { name: "Ketones", unit: "mg/dL" },
    { name: "Blood", unit: "" },
    { name: "Leukocyte Esterase", unit: "" },
    { name: "Nitrites", unit: "" },
    { name: "RBC/hpf", unit: "/hpf" },
    { name: "WBC/hpf", unit: "/hpf" },
    { name: "Bacteria", unit: "" },
    { name: "Casts", unit: "/lpf" },
  ],
} as const;

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTest, setSelectedTest] = useState("");
  const [testValue, setTestValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addLab = () => {
    if (!selectedTest || !testValue) return;

    const allTests = Object.values(LAB_TEST_CATEGORIES).flat();
    const test = allTests.find(t => t.name === selectedTest);
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
    
    setSelectedCategory("");
    setSelectedTest("");
    setTestValue("");
  };

  const removeLab = (id: string) => {
    const updatedLabs = labs.filter(lab => lab.id !== id);
    setLabs(updatedLabs);
    onLabChange?.(updatedLabs);
  };

  const getFilteredTests = () => {
    if (!selectedCategory) return [];
    const categoryKey = selectedCategory as keyof typeof LAB_TEST_CATEGORIES;
    const tests = LAB_TEST_CATEGORIES[categoryKey] || [];
    return searchTerm
      ? tests.filter(test => test.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : tests;
  };

  const selectedTestUnit = () => {
    const allTests = Object.values(LAB_TEST_CATEGORIES).flat();
    const test = allTests.find(t => t.name === selectedTest);
    return test?.unit || "";
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div>
          <Label className="text-white/90 text-sm">Test Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white mt-1">
              <SelectValue placeholder="Select test category" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(LAB_TEST_CATEGORIES).map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCategory && (
          <>
            <div className="relative">
              <Label className="text-white/90 text-sm">Search Tests</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                <Input
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div>
              <Label className="text-white/90 text-sm">Specific Test</Label>
              <Select value={selectedTest} onValueChange={setSelectedTest}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white mt-1">
                  <SelectValue placeholder="Select specific test" />
                </SelectTrigger>
                <SelectContent>
                  {getFilteredTests().map((test) => (
                    <SelectItem key={test.name} value={test.name}>
                      {test.name} {test.unit && `(${test.unit})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-white/90 text-sm">Value</Label>
            <Input
              type="text"
              placeholder="Enter value"
              value={testValue}
              onChange={(e) => setTestValue(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mt-1"
            />
          </div>
          <div>
            <Label className="text-white/90 text-sm">Unit</Label>
            <div className="mt-1 h-10 flex items-center px-3 bg-white/5 border border-white/20 rounded-md text-white/70 text-sm">
              {selectedTestUnit() || "Select test first"}
            </div>
          </div>
        </div>
        
        <Button
          type="button"
          onClick={addLab}
          size="sm"
          className="bg-blue-500/80 hover:bg-blue-600 text-white w-full"
          disabled={!selectedTest || !testValue}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Lab Result
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
