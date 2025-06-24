import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { Label } from "@/shared/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/select";
import { Trash2, Plus } from "lucide-react";
import { LabTest } from "@/shared/types/case";

// Common lab tests with reference ranges
const COMMON_LAB_TESTS = [
  { id: "cbc-wbc", name: "WBC", unit: "10^9/L", range: { min: 4.5, max: 11.0 } },
  { id: "cbc-hgb", name: "Hemoglobin", unit: "g/dL", range: { min: 13.5, max: 17.5 } },
  { id: "cbc-plt", name: "Platelets", unit: "10^9/L", range: { min: 150, max: 450 } },
  { id: "chem-na", name: "Sodium", unit: "mmol/L", range: { min: 135, max: 145 } },
  { id: "chem-k", name: "Potassium", unit: "mmol/L", range: { min: 3.5, max: 5.0 } },
  { id: "chem-cl", name: "Chloride", unit: "mmol/L", range: { min: 98, max: 107 } },
  { id: "chem-co2", name: "CO2", unit: "mmol/L", range: { min: 23, max: 29 } },
  { id: "chem-bun", name: "BUN", unit: "mg/dL", range: { min: 7, max: 20 } },
  { id: "chem-cr", name: "Creatinine", unit: "mg/dL", range: { min: 0.7, max: 1.3 } },
  { id: "chem-glu", name: "Glucose", unit: "mg/dL", range: { min: 70, max: 100 } },
  { id: "lft-ast", name: "AST", unit: "U/L", range: { min: 10, max: 40 } },
  { id: "lft-alt", name: "ALT", unit: "U/L", range: { min: 7, max: 56 } },
  { id: "lft-alp", name: "Alkaline Phosphatase", unit: "U/L", range: { min: 44, max: 147 } },
  { id: "lft-tbil", name: "Total Bilirubin", unit: "mg/dL", range: { min: 0.1, max: 1.2 } },
  { id: "coag-pt", name: "PT", unit: "seconds", range: { min: 11, max: 13.5 } },
  { id: "coag-inr", name: "INR", unit: "", range: { min: 0.8, max: 1.1 } },
  { id: "coag-aptt", name: "aPTT", unit: "seconds", range: { min: 25, max: 35 } },
] as const;

interface LabResultsCardProps {
  labResults: LabTest[];
  onLabChange: (labs: LabTest[]) => void;
}

export const LabResultsCard = ({ labResults, onLabChange }: LabResultsCardProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string>("");
  const [testValue, setTestValue] = useState("");
  const [customTest, setCustomTest] = useState({ name: "", unit: "" });

  const handleAddTest = () => {
    if (!selectedTest && !customTest.name) return;

    const newTest: LabTest = selectedTest
      ? {
          id: selectedTest,
          name: COMMON_LAB_TESTS.find(t => t.id === selectedTest)?.name || "",
          value: testValue,
          unit: COMMON_LAB_TESTS.find(t => t.id === selectedTest)?.unit || "",
        }
      : {
          id: `custom-${Date.now()}`,
          name: customTest.name,
          value: testValue,
          unit: customTest.unit,
        };

    const updatedResults = [...labResults, newTest];
    onLabChange(updatedResults);

    // Reset form
    setSelectedTest("");
    setTestValue("");
    setCustomTest({ name: "", unit: "" });
    setShowAddForm(false);
  };

  const handleRemoveTest = (id: string) => {
    const updatedResults = labResults.filter(test => test.id !== id);
    onLabChange(updatedResults);
  };

  const getTestStatus = (test: LabTest) => {
    const commonTest = COMMON_LAB_TESTS.find(t => t.name === test.name);
    if (!commonTest?.range) return null;

    const value = parseFloat(test.value);
    if (isNaN(value)) return null;

    if (value < commonTest.range.min) return "low";
    if (value > commonTest.range.max) return "high";
    return "normal";
  };

  const LabTestItem = ({ test }: { test: LabTest }) => {
    const status = getTestStatus(test);
    const commonTest = COMMON_LAB_TESTS.find(t => t.name === test.name);

    return (
      <div className="flex items-center justify-between p-3 rounded-lg border text-white">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{test.name}</span>
            {status && (
              <div className="text-xs mt-1">
                {status === "high" ? "Above normal range" :
                 status === "low" ? "Below normal range" :
                 "Within normal range"}
                {commonTest?.range && (
                  <div className="text-xs mt-1">
                    Range: {commonTest.range.min} - {commonTest.range.max} {test.unit}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="text-sm text-white/70 mt-1">
            {test.value} {test.unit}
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
          onClick={() => handleRemoveTest(test.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <div className="h-5 w-5 text-white/80">
            Laboratory Studies
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 bg-white/10 border-white/20 hover:bg-white/20 text-white"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? (
              <div className="h-4 w-4 mr-2">
                Cancel
              </div>
            ) : (
              <div className="h-4 w-4 mr-2">
                Add Test
              </div>
            )}
          </Button>
        </h3>
      </div>
      <div className="space-y-4">
        {showAddForm && (
          <div className="space-y-4 p-4 border rounded-lg bg-white/5 backdrop-blur-md border-white/10">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-white">Test Type</Label>
                <Select
                  value={selectedTest}
                  onValueChange={(value) => {
                    setSelectedTest(value);
                    if (value) {
                      const test = COMMON_LAB_TESTS.find(t => t.id === value);
                      if (test) {
                        setCustomTest({ name: "", unit: "" });
                      }
                    }
                  }}
                >
                  <SelectTrigger className="rounded-xl shadow-xl py-3 px-4 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select a test" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl p-1 bg-white/10 backdrop-blur-md border-white/20 text-white">
                    <SelectItem value="" className="py-3 px-4 rounded-lg focus:bg-white/20">
                      Custom Test
                    </SelectItem>
                    {COMMON_LAB_TESTS.map((test) => (
                      <SelectItem key={test.id} value={test.id} className="py-3 px-4 rounded-lg focus:bg-white/20">
                        {test.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Value</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={testValue}
                    onChange={(e) => setTestValue(e.target.value)}
                    placeholder="Enter value"
                  />
                  <div className="flex items-center px-3 bg-white/10 rounded-md text-sm text-white/80">
                    {COMMON_LAB_TESTS.find(t => t.id === selectedTest)?.unit}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="default"
                size="sm"
                className="bg-blue-500/80 hover:bg-blue-600 text-white"
                onClick={handleAddTest}
              >
                Add
              </Button>
            </div>
          </div>
        )}
        <div className="space-y-3">
          {labResults.length === 0 && (
            <div className="text-white/70 text-sm">
              No lab results added yet.
            </div>
          )}
          {labResults.map((test) => (
            <LabTestItem key={test.id} test={test} />
          ))}
        </div>
      </div>
    </div>
  );
}
