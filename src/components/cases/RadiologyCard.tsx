import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Scan, Plus, X } from "lucide-react";

interface RadiologyCardProps {
  onRadiologyChange?: (results: RadiologyExam[]) => void;
  initialResults?: RadiologyExam[];
}

export interface RadiologyExam {
  id: string;
  modality: string;
  findings: string;
}

const RADIOLOGY_MODALITIES = [
  "X-Ray",
  "CT Scan",
  "MRI",
  "Ultrasound",
  "PET Scan",
  "Mammography",
  "Fluoroscopy",
  "Angiography",
  "Echocardiography",
  "Nuclear Medicine",
  "Other"
];

export function RadiologyCard({ onRadiologyChange, initialResults = [] }: RadiologyCardProps) {
  const [radiologyExams, setRadiologyExams] = useState<RadiologyExam[]>(initialResults);

  const handleAddExam = () => {
    const newExam: RadiologyExam = {
      id: `rad-${Date.now()}`,
      modality: "",
      findings: ""
    };
    
    const updatedExams = [...radiologyExams, newExam];
    setRadiologyExams(updatedExams);
    
    if (onRadiologyChange) {
      onRadiologyChange(updatedExams);
    }
  };

  const handleRemoveExam = (id: string) => {
    const updatedExams = radiologyExams.filter(exam => exam.id !== id);
    setRadiologyExams(updatedExams);
    
    if (onRadiologyChange) {
      onRadiologyChange(updatedExams);
    }
  };

  const handleExamChange = (id: string, field: keyof RadiologyExam, value: string) => {
    const updatedExams = radiologyExams.map(exam => {
      if (exam.id === id) {
        return { ...exam, [field]: value };
      }
      return exam;
    });
    
    setRadiologyExams(updatedExams);
    
    if (onRadiologyChange) {
      onRadiologyChange(updatedExams);
    }
  };

  return (
    <Card className="border-medical-200 shadow-sm">
      <CardContent className="p-4 space-y-3">
        {radiologyExams.length === 0 ? (
          <div className="text-sm text-medical-500 italic">No radiology exams added yet</div>
        ) : (
          radiologyExams.map((exam) => (
            <div key={exam.id} className="border border-medical-100 rounded-md p-3 bg-white">
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <Scan className="h-4 w-4 text-medical-600 mr-2" />
                  <Label className="text-xs font-medium text-medical-700">Imaging Study</Label>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0" 
                  onClick={() => handleRemoveExam(exam.id)}
                >
                  <X className="h-4 w-4 text-medical-500" />
                </Button>
              </div>
              <Select
                value={exam.modality}
                onValueChange={(value) => handleExamChange(exam.id, "modality", value)}
              >
                <SelectTrigger className="w-full mb-2 h-8 text-xs border-medical-200">
                  <SelectValue placeholder="Select modality" />
                </SelectTrigger>
                <SelectContent>
                  {RADIOLOGY_MODALITIES.map((modality) => (
                    <SelectItem key={modality} value={modality} className="text-xs">
                      {modality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div>
                <Label className="text-xs text-medical-600">Findings</Label>
                <Textarea
                  value={exam.findings}
                  onChange={(e) => handleExamChange(exam.id, "findings", e.target.value)}
                  className="h-20 text-sm border-medical-200 resize-none"
                  placeholder="Describe imaging findings..."
                />
              </div>
            </div>
          ))
        )}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full mt-2 text-xs border-dashed border-medical-300 hover:bg-medical-50"
          onClick={handleAddExam}
        >
          <Plus className="h-3 w-3 mr-1" /> Add Imaging Exam
        </Button>
      </CardContent>
    </Card>
  );
}
