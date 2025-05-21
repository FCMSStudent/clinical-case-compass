
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface BodyPartSelection {
  id: string;
  name: string;
  relatedSystems: string[];
  relatedSymptoms: Record<string, string[]>;
}

interface InteractiveBodyDiagramProps {
  onBodyPartSelected: (selection: BodyPartSelection) => void;
  className?: string;
}

// Define body parts and their related systems/symptoms
const bodyParts: Record<string, BodyPartSelection> = {
  head: {
    id: "head",
    name: "Head",
    relatedSystems: ["Neurological"],
    relatedSymptoms: {
      "Neurological": ["Headache", "Dizziness", "Vision changes"]
    }
  },
  chest: {
    id: "chest",
    name: "Chest",
    relatedSystems: ["Cardiovascular", "Respiratory"],
    relatedSymptoms: {
      "Cardiovascular": ["Chest pain", "Palpitations"],
      "Respiratory": ["Cough", "Dyspnea", "Wheezing"]
    }
  },
  abdomen: {
    id: "abdomen",
    name: "Abdomen",
    relatedSystems: ["Gastrointestinal"],
    relatedSymptoms: {
      "Gastrointestinal": ["Abdominal pain", "Nausea", "Vomiting", "Diarrhea", "Constipation"]
    }
  },
  pelvis: {
    id: "pelvis",
    name: "Pelvis",
    relatedSystems: ["Urinary", "Gastrointestinal"],
    relatedSymptoms: {
      "Urinary": ["Dysuria", "Frequency", "Urgency", "Hematuria"],
      "Gastrointestinal": ["Lower abdominal pain"]
    }
  },
  leftArm: {
    id: "leftArm",
    name: "Left Arm",
    relatedSystems: ["Musculoskeletal", "Cardiovascular"],
    relatedSymptoms: {
      "Musculoskeletal": ["Joint pain", "Muscle pain", "Weakness"],
      "Cardiovascular": ["Chest pain", "Claudication"]
    }
  },
  rightArm: {
    id: "rightArm",
    name: "Right Arm",
    relatedSystems: ["Musculoskeletal"],
    relatedSymptoms: {
      "Musculoskeletal": ["Joint pain", "Muscle pain", "Weakness"]
    }
  },
  leftLeg: {
    id: "leftLeg",
    name: "Left Leg",
    relatedSystems: ["Musculoskeletal"],
    relatedSymptoms: {
      "Musculoskeletal": ["Joint pain", "Muscle pain", "Weakness", "Limited range of motion"]
    }
  },
  rightLeg: {
    id: "rightLeg",
    name: "Right Leg",
    relatedSystems: ["Musculoskeletal"],
    relatedSymptoms: {
      "Musculoskeletal": ["Joint pain", "Muscle pain", "Weakness", "Limited range of motion"]
    }
  },
  back: {
    id: "back",
    name: "Back",
    relatedSystems: ["Musculoskeletal"],
    relatedSymptoms: {
      "Musculoskeletal": ["Back pain", "Stiffness", "Limited range of motion"]
    }
  }
};

export function InteractiveBodyDiagram({ onBodyPartSelected, className }: InteractiveBodyDiagramProps) {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [viewType, setViewType] = useState<"anterior" | "posterior">("anterior");
  
  const handlePartClick = (partId: string) => {
    const part = bodyParts[partId];
    setSelectedPart(partId);
    onBodyPartSelected(part);
    toast.info(`Selected: ${part.name}`);
  };

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };

  const increaseZoom = () => {
    setZoom(Math.min(zoom + 10, 150));
  };

  const decreaseZoom = () => {
    setZoom(Math.max(zoom - 10, 80));
  };

  const toggleView = () => {
    setViewType(viewType === "anterior" ? "posterior" : "anterior");
  };

  return (
    <div className={cn("relative border rounded-lg p-4 bg-white", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-medium">Interactive Body Diagram</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={decreaseZoom}
            className="h-8 w-8 p-0"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <div className="w-24">
            <Slider
              value={[zoom]}
              min={80}
              max={150}
              step={1}
              onValueChange={handleZoomChange}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={increaseZoom}
            className="h-8 w-8 p-0"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleView}
            className="h-8 p-1"
          >
            <RotateCw className="h-4 w-4 mr-1" />
            {viewType === "anterior" ? "Front" : "Back"}
          </Button>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div 
          className="relative" 
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "center center" }}
        >
          {/* Body Outline SVG */}
          <svg
            width="240"
            height="460"
            viewBox="0 0 240 460"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {viewType === "anterior" ? (
              // Anterior (front) view
              <>
                {/* Head */}
                <circle
                  cx="120"
                  cy="50"
                  r="40"
                  stroke="#333"
                  strokeWidth="2"
                  fill={selectedPart === "head" ? "#5e9de0" : "#f2f2f2"}
                  className="hover:fill-medical-200 cursor-pointer transition-colors"
                  onClick={() => handlePartClick("head")}
                />
                
                {/* Torso */}
                <path
                  d="M80 90 L160 90 L170 200 L150 240 L90 240 L70 200 Z"
                  stroke="#333"
                  strokeWidth="2"
                  fill={selectedPart === "chest" ? "#5e9de0" : "#f2f2f2"}
                  className="hover:fill-medical-200 cursor-pointer transition-colors"
                  onClick={() => handlePartClick("chest")}
                />
                
                {/* Abdomen */}
                <path
                  d="M90 240 L150 240 L155 300 L85 300 Z"
                  stroke="#333"
                  strokeWidth="2"
                  fill={selectedPart === "abdomen" ? "#5e9de0" : "#f2f2f2"}
                  className="hover:fill-medical-200 cursor-pointer transition-colors"
                  onClick={() => handlePartClick("abdomen")}
                />
                
                {/* Pelvis */}
                <path
                  d="M85 300 L155 300 L165 340 L75 340 Z"
                  stroke="#333"
                  strokeWidth="2"
                  fill={selectedPart === "pelvis" ? "#5e9de0" : "#f2f2f2"}
                  className="hover:fill-medical-200 cursor-pointer transition-colors"
                  onClick={() => handlePartClick("pelvis")}
                />
                
                {/* Left Arm */}
                <path
                  d="M70 100 L50 100 L40 180 L50 250 L70 250"
                  stroke="#333"
                  strokeWidth="2"
                  fill={selectedPart === "leftArm" ? "#5e9de0" : "#f2f2f2"}
                  className="hover:fill-medical-200 cursor-pointer transition-colors"
                  onClick={() => handlePartClick("leftArm")}
                />
                
                {/* Right Arm */}
                <path
                  d="M170 100 L190 100 L200 180 L190 250 L170 250"
                  stroke="#333"
                  strokeWidth="2"
                  fill={selectedPart === "rightArm" ? "#5e9de0" : "#f2f2f2"}
                  className="hover:fill-medical-200 cursor-pointer transition-colors"
                  onClick={() => handlePartClick("rightArm")}
                />
                
                {/* Left Leg */}
                <path
                  d="M85 340 L75 340 L65 450 L105 450 L105 340"
                  stroke="#333"
                  strokeWidth="2"
                  fill={selectedPart === "leftLeg" ? "#5e9de0" : "#f2f2f2"}
                  className="hover:fill-medical-200 cursor-pointer transition-colors"
                  onClick={() => handlePartClick("leftLeg")}
                />
                
                {/* Right Leg */}
                <path
                  d="M135 340 L135 450 L175 450 L165 340 Z"
                  stroke="#333"
                  strokeWidth="2"
                  fill={selectedPart === "rightLeg" ? "#5e9de0" : "#f2f2f2"}
                  className="hover:fill-medical-200 cursor-pointer transition-colors"
                  onClick={() => handlePartClick("rightLeg")}
                />
              </>
            ) : (
              // Posterior (back) view
              <>
                {/* Head */}
                <circle
                  cx="120"
                  cy="50"
                  r="40"
                  stroke="#333"
                  strokeWidth="2"
                  fill={selectedPart === "head" ? "#5e9de0" : "#f2f2f2"}
                  className="hover:fill-medical-200 cursor-pointer transition-colors"
                  onClick={() => handlePartClick("head")}
                />
                
                {/* Back */}
                <path
                  d="M80 90 L160 90 L170 240 L70 240 Z"
                  stroke="#333"
                  strokeWidth="2"
                  fill={selectedPart === "back" ? "#5e9de0" : "#f2f2f2"}
                  className="hover:fill-medical-200 cursor-pointer transition-colors"
                  onClick={() => handlePartClick("back")}
                />
                
                {/* Pelvis */}
                <path
                  d="M70 240 L170 240 L165 300 L75 300 Z"
                  stroke="#333"
                  strokeWidth="2"
                  fill={selectedPart === "pelvis" ? "#5e9de0" : "#f2f2f2"}
                  className="hover:fill-medical-200 cursor-pointer transition-colors"
                  onClick={() => handlePartClick("pelvis")}
                />
                
                {/* Left Arm */}
                <path
                  d="M70 100 L50 100 L40 180 L50 250 L70 250"
                  stroke="#333"
                  strokeWidth="2"
                  fill={selectedPart === "leftArm" ? "#5e9de0" : "#f2f2f2"}
                  className="hover:fill-medical-200 cursor-pointer transition-colors"
                  onClick={() => handlePartClick("leftArm")}
                />
                
                {/* Right Arm */}
                <path
                  d="M170 100 L190 100 L200 180 L190 250 L170 250"
                  stroke="#333"
                  strokeWidth="2"
                  fill={selectedPart === "rightArm" ? "#5e9de0" : "#f2f2f2"}
                  className="hover:fill-medical-200 cursor-pointer transition-colors"
                  onClick={() => handlePartClick("rightArm")}
                />
                
                {/* Left Leg */}
                <path
                  d="M85 300 L75 300 L65 450 L105 450 L105 300"
                  stroke="#333"
                  strokeWidth="2"
                  fill={selectedPart === "leftLeg" ? "#5e9de0" : "#f2f2f2"}
                  className="hover:fill-medical-200 cursor-pointer transition-colors"
                  onClick={() => handlePartClick("leftLeg")}
                />
                
                {/* Right Leg */}
                <path
                  d="M135 300 L135 450 L175 450 L165 300 Z"
                  stroke="#333"
                  strokeWidth="2"
                  fill={selectedPart === "rightLeg" ? "#5e9de0" : "#f2f2f2"}
                  className="hover:fill-medical-200 cursor-pointer transition-colors"
                  onClick={() => handlePartClick("rightLeg")}
                />
              </>
            )}
          </svg>
        </div>
      </div>

      {selectedPart && (
        <div className="mt-4 p-3 bg-medical-50 rounded-md">
          <p className="font-medium">{bodyParts[selectedPart].name} Selected</p>
          <p className="text-sm text-muted-foreground">
            Related systems: {bodyParts[selectedPart].relatedSystems.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}
