
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";

const IMAGING_TYPES = [
  "Chest X-Ray",
  "CT Chest",
  "CT Abdomen/Pelvis",
  "MRI Brain",
  "Ultrasound Abdomen",
  "Echocardiogram",
] as const;

interface ImagingStudy {
  id: string;
  type: string;
  findings: string;
}

interface SimpleImagingProps {
  onImagingChange?: (studies: ImagingStudy[]) => void;
}

export function SimpleImaging({ onImagingChange }: SimpleImagingProps) {
  const [studies, setStudies] = useState<ImagingStudy[]>([]);
  const [selectedType, setSelectedType] = useState("");
  const [findings, setFindings] = useState("");

  const addStudy = () => {
    if (!selectedType || !findings) return;

    const newStudy: ImagingStudy = {
      id: `study-${Date.now()}`,
      type: selectedType,
      findings: findings,
    };

    const updatedStudies = [...studies, newStudy];
    setStudies(updatedStudies);
    onImagingChange?.(updatedStudies);
    
    setSelectedType("");
    setFindings("");
  };

  const removeStudy = (id: string) => {
    const updatedStudies = studies.filter(study => study.id !== id);
    setStudies(updatedStudies);
    onImagingChange?.(updatedStudies);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div>
          <Label className="text-white/90 text-sm">Study Type</Label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white mt-1">
              <SelectValue placeholder="Select imaging study" />
            </SelectTrigger>
            <SelectContent>
              {IMAGING_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-white/90 text-sm">Findings</Label>
          <Textarea
            placeholder="Enter study findings..."
            value={findings}
            onChange={(e) => setFindings(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mt-1"
            rows={3}
          />
        </div>
        
        <Button
          type="button"
          onClick={addStudy}
          size="sm"
          className="bg-blue-500/80 hover:bg-blue-600 text-white w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Study
        </Button>
      </div>

      <div className="space-y-2">
        {studies.map((study) => (
          <div key={study.id} className="p-3 bg-white/10 rounded-md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-white text-sm">{study.type}</div>
                <div className="text-white/80 text-xs mt-1">{study.findings}</div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeStudy(study.id)}
                className="h-6 w-6 p-0 text-white/60 hover:text-white ml-2"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
        {studies.length === 0 && (
          <div className="text-sm text-white/60 text-center py-4">
            No imaging studies added yet
          </div>
        )}
      </div>
    </div>
  );
}
