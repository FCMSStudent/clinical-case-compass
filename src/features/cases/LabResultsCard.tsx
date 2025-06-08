import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  X, 
  AlertCircle, 
  Info, 
  TrendingUp, 
  TrendingDown,
  CheckCircle2,
  Clock,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LabTest } from "@/types/case";

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
          "flex items-center justify-between p-3 rounded-lg border",
          status === "high" && "bg-red-50 border-red-200",
          status === "low" && "bg-blue-50 border-blue-200",
          status === "normal" && "bg-green-50 border-green-200"
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
                  <TooltipContent>
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
          <div className="text-sm text-muted-foreground mt-1">
            {test.value} {test.unit}
          </div>
        </div>
        <Button
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
    <Card className="border-medical-200 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Laboratory Studies</CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="h-8"
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
      </CardHeader>

      <CardContent className="space-y-4">
        <AnimatePresence mode="wait">
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 p-4 border rounded-lg bg-medical-50"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Test Type</Label>
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
                    <SelectTrigger>
                      <SelectValue placeholder="Select a test" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Custom Test</SelectItem>
                      {COMMON_LAB_TESTS.map((test) => (
                        <SelectItem key={test.id} value={test.id}>
                          {test.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedTest ? (
                  <div className="space-y-2">
                    <Label>Value</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={testValue}
                        onChange={(e) => setTestValue(e.target.value)}
                        placeholder="Enter value"
                      />
                      <div className="flex items-center px-3 bg-muted rounded-md text-sm text-muted-foreground">
                        {COMMON_LAB_TESTS.find(t => t.id === selectedTest)?.unit}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label>Test Name</Label>
                      <Input
                        value={customTest.name}
                        onChange={(e) => setCustomTest(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter test name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Value</Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          value={testValue}
                          onChange={(e) => setTestValue(e.target.value)}
                          placeholder="Enter value"
                        />
                        <Input
                          value={customTest.unit}
                          onChange={(e) => setCustomTest(prev => ({ ...prev, unit: e.target.value }))}
                          placeholder="Unit"
                          className="w-24"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleAddTest}
                  disabled={!testValue || (!selectedTest && !customTest.name)}
                >
                  Add Test
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {labResults.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Alert variant="default" className="bg-medical-50">
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    No laboratory tests added yet. Click "Add Test" to begin.
                  </AlertDescription>
                </Alert>
              </motion.div>
            ) : (
              labResults.map((test) => (
                <LabTestItem key={test.id} test={test} />
              ))
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
