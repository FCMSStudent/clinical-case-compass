
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, X, Search } from "lucide-react";

// Organized imaging studies by category
const IMAGING_CATEGORIES = {
  "Plain Radiography (X-Ray)": [
    "Chest X-Ray",
    "Abdominal X-Ray",
    "Spine X-Ray (Cervical)",
    "Spine X-Ray (Thoracic)",
    "Spine X-Ray (Lumbar)",
    "Pelvis X-Ray",
    "Hip X-Ray",
    "Knee X-Ray",
    "Ankle X-Ray",
    "Shoulder X-Ray",
    "Elbow X-Ray",
    "Wrist X-Ray",
    "Hand X-Ray",
    "Foot X-Ray",
    "Skull X-Ray",
    "Facial Bones X-Ray",
    "Ribs X-Ray",
  ],
  "Computed Tomography (CT)": [
    "CT Head (Non-contrast)",
    "CT Head (With contrast)",
    "CT Chest",
    "CT Abdomen/Pelvis",
    "CT Cervical Spine",
    "CT Thoracic Spine",
    "CT Lumbar Spine",
    "CT Pulmonary Embolism",
    "CT Angiogram (CTA) Chest",
    "CT Angiogram (CTA) Abdomen",
    "CT Angiogram (CTA) Head/Neck",
    "CT Enterography",
    "CT Coronary Angiogram",
    "CT Urogram",
    "CT Sinus",
    "CT Temporal Bones",
  ],
  "Magnetic Resonance Imaging (MRI)": [
    "MRI Brain",
    "MRI Cervical Spine",
    "MRI Thoracic Spine", 
    "MRI Lumbar Spine",
    "MRI Shoulder",
    "MRI Knee",
    "MRI Hip",
    "MRI Ankle",
    "MRI Wrist",
    "MRI Abdomen",
    "MRI Pelvis",
    "MRA Brain",
    "MRA Neck",
    "MRA Renal",
    "MRCP",
    "Cardiac MRI",
  ],
  "Ultrasound": [
    "Ultrasound Abdomen",
    "Ultrasound Pelvis",
    "Ultrasound Renal",
    "Ultrasound Thyroid",
    "Ultrasound Carotid Doppler",
    "Ultrasound Venous Doppler (Upper)",
    "Ultrasound Venous Doppler (Lower)",
    "Ultrasound Arterial Doppler",
    "Echocardiogram (Transthoracic)",
    "Echocardiogram (Stress)",
    "TEE (Transesophageal Echo)",
    "FAST Exam",
    "Obstetric Ultrasound",
    "Scrotal Ultrasound",
    "Breast Ultrasound",
  ],
  "Nuclear Medicine": [
    "Bone Scan",
    "V/Q Scan",
    "HIDA Scan",
    "Thyroid Scan",
    "PET Scan",
    "PET-CT",
    "Gallium Scan",
    "MUGA Scan",
    "Renal Scan",
    "Liver-Spleen Scan",
    "Gastric Emptying Study",
  ],
  "Interventional & Fluoroscopy": [
    "Upper GI Series",
    "Lower GI Series (Barium Enema)",
    "Small Bowel Follow-through",
    "IVP (Intravenous Pyelogram)",
    "Hysterosalpingography",
    "Arthrography",
    "Myelography",
    "Venography",
    "Fluoroscopy (General)",
  ],
  "Specialized Imaging": [
    "Mammography",
    "Mammography (Diagnostic)",
    "Breast MRI",
    "DEXA Scan",
    "Bone Densitometry",
    "Dental Panoramic X-Ray",
    "Orthopantomogram (OPG)",
    "Cystography",
    "Urethrography",
  ],
} as const;

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [findings, setFindings] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
    
    setSelectedCategory("");
    setSelectedType("");
    setFindings("");
  };

  const removeStudy = (id: string) => {
    const updatedStudies = studies.filter(study => study.id !== id);
    setStudies(updatedStudies);
    onImagingChange?.(updatedStudies);
  };

  const getFilteredStudies = () => {
    if (!selectedCategory) return [];
    const studies = IMAGING_CATEGORIES[selectedCategory as keyof typeof IMAGING_CATEGORIES] || [];
    return searchTerm
      ? studies.filter(study => study.toLowerCase().includes(searchTerm.toLowerCase()))
      : studies;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div>
          <Label className="text-white/90 text-sm">Imaging Category</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white mt-1">
              <SelectValue placeholder="Select imaging category" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(IMAGING_CATEGORIES).map((category) => (
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
              <Label className="text-white/90 text-sm">Search Studies</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                <Input
                  placeholder="Search imaging studies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div>
              <Label className="text-white/90 text-sm">Specific Study</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white mt-1">
                  <SelectValue placeholder="Select specific study" />
                </SelectTrigger>
                <SelectContent>
                  {getFilteredStudies().map((study) => (
                    <SelectItem key={study} value={study}>
                      {study}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
        
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
          disabled={!selectedType || !findings}
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
