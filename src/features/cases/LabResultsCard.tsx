import { useState, useCallback } from "react";
import { Input } from "@/shared/components/input";
import { Label } from "@/shared/components/label";
import { Button } from "@/shared/components/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  X, 
  TrendingUp, 
  TrendingDown,
  CheckCircle2,
  FileText
} from "lucide-react";
import { cn } from "@/shared/utils/utils";
import type { LabTest } from "@/shared/types/case";

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
  onLabResultsChange?: (results: LabTest[]) => void;
  initialResults?: LabTest[];
}

export function LabResultsCard({ onLabResultsChange, initialResults = [] }: LabResultsCardProps) {
  const [labResults, setLabResults] = useState<LabTest[]>(initialResults);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string>("");
  const [testValue, setTestValue] = useState("");
  const [customTest, setCustomTest] = useState({ name: "", unit: "" });

  const handleAddTest = useCallback(() => {
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
    setLabResults(updatedResults);
    if (onLabResultsChange) {
      onLabResultsChange(updatedResults);
    }

    // Reset form
    setSelectedTest("");
    setTestValue("");
    setCustomTest({ name: "", unit: "" });
    setShowAddForm(false);
  }, [labResults, selectedTest, testValue, customTest, onLabResultsChange]);

  const handleRemoveTest = useCallback((id: string) => {
    const updatedResults = labResults.filter(test => test.id !== id);
    setLabResults(updatedResults);
    if (onLabResultsChange) {
      onLabResultsChange(updatedResults);
    }
  }, [labResults, onLabResultsChange]);

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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={cn(
          "flex items-center justify-between p-3 rounded-lg border text-white",
          status === "high" && "bg-red-500/10 border-red-400/30",
          status === "low" && "bg-blue-500/10 border-blue-400/30",
          status === "normal" && "bg-green-500/10 border-green-400/30"
        )}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{test.name}</span>
            {status && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    {status === "high" ? (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    ) : status === "low" ? (
                      <TrendingDown className="h-4 w-4 text-blue-500" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    )}
                  </TooltipTrigger>
                  <TooltipContent className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
                    {status === "high" ? "Above normal range" :
                     status === "low" ? "Below normal range" :
                     "Within normal range"}
                    {commonTest?.range && (
                      <div className="text-xs mt-1">
                        Range: {commonTest.range.min} - {commonTest.range.max} {test.unit}
                      </div>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="text-sm text-white/70 mt-1">
            {test.value} {test.unit}
          </div>
        </div>
        <Button
          type="button" // Added type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
          onClick={() => handleRemoveTest(test.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </motion.div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-white/80" />
          Laboratory Studies
        </h3>
        <Button
          type="button" // Added type="button"
          variant="outline"
          size="sm"
          className="h-8 bg-white/10 border-white/20 hover:bg-white/20 text-white"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? (
            <X className="h-4 w-4 mr-2" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          {showAddForm ? "Cancel" : "Add Test"}
        </Button>
      </div>
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 p-4 border rounded-lg bg-white/5 backdrop-blur-md border-white/10"
            >
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
                  type="button" // Added type="button"
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button" // Added type="button"
                  variant="default"
                  size="sm"
                  className="bg-blue-500/80 hover:bg-blue-600 text-white"
                  onClick={handleAddTest}
                >
                  Add
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="space-y-3">
          <AnimatePresence>
            {labResults.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white/70 text-sm"
              >
                No lab results added yet.
              </motion.div>
            )}
            {labResults.map((test) => (
              <LabTestItem key={test.id} test={test} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
