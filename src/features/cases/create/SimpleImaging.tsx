import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, X, Search, Scan, Camera, Zap, Activity, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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

const categoryIcons: Record<string, React.ReactNode> = {
  "Plain Radiography (X-Ray)": <Camera className="h-4 w-4" />,
  "Computed Tomography (CT)": <Scan className="h-4 w-4" />,
  "Magnetic Resonance Imaging (MRI)": <Monitor className="h-4 w-4" />,
  "Ultrasound": <Activity className="h-4 w-4" />,
  "Nuclear Medicine": <Zap className="h-4 w-4" />,
  "Interventional & Fluoroscopy": <Scan className="h-4 w-4" />,
  "Specialized Imaging": <Camera className="h-4 w-4" />,
};

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

  const getFilteredStudies = (): readonly string[] => {
    if (!selectedCategory) return [];
    const categoryKey = selectedCategory as keyof typeof IMAGING_CATEGORIES;
    const categoryStudies = IMAGING_CATEGORIES[categoryKey];
    if (!categoryStudies) return [];
    
    return searchTerm
      ? categoryStudies.filter((study) => study.toLowerCase().includes(searchTerm.toLowerCase()))
      : categoryStudies;
  };

  const groupedStudies = studies.reduce((acc, study) => {
    // Find which category this study belongs to
    const category = Object.entries(IMAGING_CATEGORIES).find(([_, categoryStudies]) => 
      (categoryStudies as readonly string[]).includes(study.type)
    )?.[0] || "Other";
    
    if (!acc[category]) acc[category] = [];
    acc[category].push(study);
    return acc;
  }, {} as Record<string, ImagingStudy[]>);

  return (
    <div className="space-y-4">
      {/* Add Study Section */}
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-600/50 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
            <Plus className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-medium text-slate-200">Add Imaging Study</h3>
        </div>

        <div className="space-y-3">
          <div>
            <Label className="text-slate-200 text-sm">Imaging Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-slate-700/50 border-slate-500/50 text-slate-100 mt-1">
                <SelectValue placeholder="Select imaging category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800/90 border-slate-600/50">
                {Object.keys(IMAGING_CATEGORIES).map((category) => (
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
                <Label className="text-slate-200 text-sm">Search Studies</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search imaging studies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-slate-700/50 border-slate-500/50 text-slate-100 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-200 text-sm">Specific Study</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-500/50 text-slate-100 mt-1">
                    <SelectValue placeholder="Select specific study" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800/90 border-slate-600/50">
                    {getFilteredStudies().map((study) => (
                      <SelectItem key={study} value={study} className="text-slate-100">
                        {study}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
          
          <div>
            <Label className="text-slate-200 text-sm">Findings</Label>
            <Textarea
              placeholder="Enter study findings..."
              value={findings}
              onChange={(e) => setFindings(e.target.value)}
              className="bg-slate-700/50 border-slate-500/50 text-slate-100 placeholder:text-slate-400 mt-1"
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
      </div>

      {/* Studies Display - Bentogrid Layout */}
      {Object.keys(groupedStudies).length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
          {Object.entries(groupedStudies).map(([category, categoryStudies]) => (
            <div
              key={category}
              className={cn(
                "bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-600/50 p-4 transition-all hover:bg-slate-700/60 hover:border-slate-500/70",
                categoryStudies.length > 2 && "md:col-span-2",
                category === "Computed Tomography (CT)" && "lg:col-span-2"
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                  {categoryIcons[category] || <Scan className="h-4 w-4" />}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-200 text-sm">{category}</span>
                  <Badge variant="outline" className="bg-blue-500/20 border-blue-400/30 text-white text-xs">
                    {categoryStudies.length}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-track-slate-700/50 scrollbar-thumb-slate-500/50">
                {categoryStudies.map((study) => (
                  <div key={study.id} className="p-3 bg-slate-700/50 rounded-md">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-slate-200 text-sm">{study.type}</div>
                        <div className="text-slate-300 text-xs mt-1 line-clamp-2">{study.findings}</div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStudy(study.id)}
                        className="h-6 w-6 p-0 text-slate-400 hover:text-white hover:bg-slate-600/50 ml-2 flex-shrink-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-600/50 p-8 text-center">
          <Scan className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-400">No imaging studies added yet</p>
        </div>
      )}
    </div>
  );
}
