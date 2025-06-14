
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Search, TestTube, Microscope, Activity, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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

const categoryIcons: Record<string, React.ReactNode> = {
  "Complete Blood Count (CBC)": <Activity className="h-4 w-4" />,
  "Comprehensive Metabolic Panel (CMP)": <TestTube className="h-4 w-4" />,
  "Cardiac Markers": <Activity className="h-4 w-4" />,
  "Coagulation Studies": <Microscope className="h-4 w-4" />,
  "Inflammatory Markers": <Zap className="h-4 w-4" />,
  "Thyroid Function": <TestTube className="h-4 w-4" />,
  "Lipid Panel": <Activity className="h-4 w-4" />,
  "Diabetes Markers": <TestTube className="h-4 w-4" />,
  "Tumor Markers": <Microscope className="h-4 w-4" />,
  "Urinalysis": <Activity className="h-4 w-4" />,
};

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
    const categoryTests = LAB_TEST_CATEGORIES[categoryKey];
    if (!categoryTests) return [];
    
    return searchTerm
      ? categoryTests.filter((test) => test.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : categoryTests;
  };

  const selectedTestUnit = () => {
    const allTests = Object.values(LAB_TEST_CATEGORIES).flat();
    const test = allTests.find(t => t.name === selectedTest);
    return test?.unit || "";
  };

  const groupedLabs = labs.reduce((acc, lab) => {
    // Find which category this lab belongs to
    const category = Object.entries(LAB_TEST_CATEGORIES).find(([_, tests]) => 
      tests.some(test => test.name === lab.name)
    )?.[0] || "Other";
    
    if (!acc[category]) acc[category] = [];
    acc[category].push(lab);
    return acc;
  }, {} as Record<string, LabResult[]>);

  return (
    <div className="space-y-4">
      {/* Add Lab Section */}
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-600/50 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
            <Plus className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-medium text-slate-200">Add Lab Result</h3>
        </div>

        <div className="space-y-3">
          <div>
            <Label className="text-slate-200 text-sm">Test Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-slate-700/50 border-slate-500/50 text-slate-100 mt-1">
                <SelectValue placeholder="Select test category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800/90 border-slate-600/50">
                {Object.keys(LAB_TEST_CATEGORIES).map((category) => (
                  <SelectItem key={category} value={category} className="text-slate-100">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCategory && (
            <>
              <div className="relative">
                <Label className="text-slate-200 text-sm">Search Tests</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search tests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-slate-700/50 border-slate-500/50 text-slate-100 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-200 text-sm">Specific Test</Label>
                <Select value={selectedTest} onValueChange={setSelectedTest}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-500/50 text-slate-100 mt-1">
                    <SelectValue placeholder="Select specific test" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800/90 border-slate-600/50">
                    {getFilteredTests().map((test) => (
                      <SelectItem key={test.name} value={test.name} className="text-slate-100">
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
              <Label className="text-slate-200 text-sm">Value</Label>
              <Input
                type="text"
                placeholder="Enter value"
                value={testValue}
                onChange={(e) => setTestValue(e.target.value)}
                className="bg-slate-700/50 border-slate-500/50 text-slate-100 placeholder:text-slate-400 mt-1"
              />
            </div>
            <div>
              <Label className="text-slate-200 text-sm">Unit</Label>
              <div className="mt-1 h-10 flex items-center px-3 bg-slate-700/50 border border-slate-500/50 rounded-md text-slate-300 text-sm">
                {selectedTestUnit() || "Select test first"}
              </div>
            </div>
          </div>
          
          <Button
            type="button"
            onClick={addLab}
            size="sm"
            className="bg-blue-500/80 text-white w-full"
            disabled={!selectedTest || !testValue}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Lab Result
          </Button>
        </div>
      </div>

      {/* Results Display - Bentogrid Layout */}
      {Object.keys(groupedLabs).length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
          {Object.entries(groupedLabs).map(([category, categoryLabs]) => (
            <div
              key={category}
              className={cn(
                "bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-600/50 p-4 transition-all",
                categoryLabs.length > 3 && "md:col-span-2",
                category === "Complete Blood Count (CBC)" && "lg:col-span-2"
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                  {categoryIcons[category] || <TestTube className="h-4 w-4" />}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-200 text-sm">{category}</span>
                  <Badge variant="outline" className="bg-blue-500/20 border-blue-400/30 text-white text-xs">
                    {categoryLabs.length}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-track-slate-700/50 scrollbar-thumb-slate-500/50">
                {categoryLabs.map((lab) => (
                  <div key={lab.id} className="flex items-center justify-between p-2 bg-slate-700/50 rounded-md">
                    <div className="text-sm text-slate-200">
                      <span className="font-medium">{lab.name}:</span> {lab.value} {lab.unit}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLab(lab.id)}
                      className="h-6 w-6 p-0 text-slate-400"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-600/50 p-8 text-center">
          <TestTube className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-400">No lab results added yet</p>
        </div>
      )}
    </div>
  );
}
