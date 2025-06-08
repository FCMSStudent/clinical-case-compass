import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  X, 
  FileText,
  Image as ImageIcon,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { RadiologyStudy } from "@/types/case";

// Common radiology studies with typical findings
const COMMON_RADIOLOGY_STUDIES = [
  { 
    id: "chest-xray",
    name: "Chest X-Ray",
    type: "X-Ray",
    commonFindings: [
      "Normal",
      "Pulmonary infiltrates",
      "Pleural effusion",
      "Cardiomegaly",
      "Pneumothorax",
      "Atelectasis"
    ]
  },
  { 
    id: "ct-chest",
    name: "CT Chest",
    type: "CT",
    commonFindings: [
      "Normal",
      "Ground glass opacities",
      "Consolidation",
      "Pulmonary nodules",
      "Mediastinal lymphadenopathy",
      "Pleural effusion"
    ]
  },
  { 
    id: "ct-abdomen",
    name: "CT Abdomen/Pelvis",
    type: "CT",
    commonFindings: [
      "Normal",
      "Appendicitis",
      "Diverticulitis",
      "Cholecystitis",
      "Bowel obstruction",
      "Free fluid"
    ]
  },
  { 
    id: "mri-brain",
    name: "MRI Brain",
    type: "MRI",
    commonFindings: [
      "Normal",
      "Acute infarct",
      "Mass lesion",
      "White matter changes",
      "Cerebral edema",
      "Hemorrhage"
    ]
  },
  { 
    id: "us-abdomen",
    name: "Ultrasound Abdomen",
    type: "Ultrasound",
    commonFindings: [
      "Normal",
      "Cholelithiasis",
      "Hepatomegaly",
      "Splenomegaly",
      "Ascites",
      "Renal calculi"
    ]
  },
  { 
    id: "echo",
    name: "Echocardiogram",
    type: "Ultrasound",
    commonFindings: [
      "Normal",
      "Reduced EF",
      "Valvular disease",
      "Pericardial effusion",
      "Wall motion abnormality",
      "Cardiac chamber enlargement"
    ]
  }
] as const;

interface RadiologyCardProps {
  onRadiologyChange?: (studies: RadiologyStudy[]) => void;
  initialStudies?: RadiologyStudy[];
}

export function RadiologyCard({ onRadiologyChange, initialStudies = [] }: RadiologyCardProps) {
  const [studies, setStudies] = useState<RadiologyStudy[]>(initialStudies);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<string>("");
  const [findings, setFindings] = useState("");
  const [customStudy, setCustomStudy] = useState({ name: "", type: "" });
  const [selectedFinding, setSelectedFinding] = useState("");

  const handleAddStudy = useCallback(() => {
    if (!selectedStudy && !customStudy.name) return;

    const newStudy: RadiologyStudy = selectedStudy
      ? {
          id: selectedStudy,
          name: COMMON_RADIOLOGY_STUDIES.find(s => s.id === selectedStudy)?.name || "",
          type: COMMON_RADIOLOGY_STUDIES.find(s => s.id === selectedStudy)?.type || "",
          findings: findings || selectedFinding,
          date: new Date().toISOString(),
        }
      : {
          id: `custom-${Date.now()}`,
          name: customStudy.name,
          type: customStudy.type,
          findings: findings,
          date: new Date().toISOString(),
        };

    const updatedStudies = [...studies, newStudy];
    setStudies(updatedStudies);
    if (onRadiologyChange) {
      onRadiologyChange(updatedStudies);
    }

    // Reset form
    setSelectedStudy("");
    setFindings("");
    setCustomStudy({ name: "", type: "" });
    setSelectedFinding("");
    setShowAddForm(false);
  }, [studies, selectedStudy, findings, customStudy, selectedFinding, onRadiologyChange]);

  const handleRemoveStudy = useCallback((id: string) => {
    const updatedStudies = studies.filter(study => study.id !== id);
    setStudies(updatedStudies);
    if (onRadiologyChange) {
      onRadiologyChange(updatedStudies);
    }
  }, [studies, onRadiologyChange]);

  const RadiologyStudyItem = ({ study }: { study: RadiologyStudy }) => {
    const commonStudy = COMMON_RADIOLOGY_STUDIES.find(s => s.name === study.name);
    const date = new Date(study.date).toLocaleDateString();

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="border rounded-lg p-4 space-y-3 bg-white"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{study.name}</span>
              <Badge variant="outline" className="text-xs">
                {study.type}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {date}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            onClick={() => handleRemoveStudy(study.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Findings</Label>
          <div className="text-sm bg-muted/50 rounded-md p-3">
            {study.findings}
          </div>
        </div>

        {commonStudy && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ImageIcon className="h-3 w-3" />
            <span>Common study type with predefined findings</span>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <Card className="border-medical-200 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Radiology Studies</CardTitle>
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
            {showAddForm ? "Cancel" : "Add Study"}
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
                  <Label>Study Type</Label>
                  <Select
                    value={selectedStudy}
                    onValueChange={(value) => {
                      setSelectedStudy(value);
                      if (value) {
                        const study = COMMON_RADIOLOGY_STUDIES.find(s => s.id === value);
                        if (study) {
                          setCustomStudy({ name: "", type: "" });
                          setSelectedFinding("");
                        }
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a study" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Custom Study</SelectItem>
                      {COMMON_RADIOLOGY_STUDIES.map((study) => (
                        <SelectItem key={study.id} value={study.id}>
                          {study.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedStudy ? (
                  <div className="space-y-2">
                    <Label>Common Findings</Label>
                    <Select
                      value={selectedFinding}
                      onValueChange={setSelectedFinding}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select common finding" />
                      </SelectTrigger>
                      <SelectContent>
                        {COMMON_RADIOLOGY_STUDIES.find(s => s.id === selectedStudy)?.commonFindings.map((finding) => (
                          <SelectItem key={finding} value={finding}>
                            {finding}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label>Study Name</Label>
                      <Input
                        value={customStudy.name}
                        onChange={(e) => setCustomStudy(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter study name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Study Type</Label>
                      <Select
                        value={customStudy.type}
                        onValueChange={(value) => setCustomStudy(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="X-Ray">X-Ray</SelectItem>
                          <SelectItem value="CT">CT</SelectItem>
                          <SelectItem value="MRI">MRI</SelectItem>
                          <SelectItem value="Ultrasound">Ultrasound</SelectItem>
                          <SelectItem value="Nuclear Medicine">Nuclear Medicine</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <Label>Findings</Label>
                <Textarea
                  value={findings}
                  onChange={(e) => setFindings(e.target.value)}
                  placeholder="Enter detailed findings"
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleAddStudy}
                  disabled={!findings && !selectedFinding || (!selectedStudy && !customStudy.name)}
                >
                  Add Study
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {studies.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Alert variant="default" className="bg-medical-50">
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    No radiology studies added yet. Click "Add Study" to begin.
                  </AlertDescription>
                </Alert>
              </motion.div>
            ) : (
              studies.map((study) => (
                <RadiologyStudyItem key={study.id} study={study} />
              ))
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

// Badge component for study types
function Badge({ 
  variant = "default", 
  className, 
  children 
}: { 
  variant?: "default" | "outline";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/80",
        variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
