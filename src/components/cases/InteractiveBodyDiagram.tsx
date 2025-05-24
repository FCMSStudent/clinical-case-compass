
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
      "Neurological": ["Headache", "Dizziness", "Vision changes", "Memory problems", "Confusion", "Seizures"]
    }
  },
  chest: {
    id: "chest",
    name: "Chest",
    relatedSystems: ["Cardiovascular", "Respiratory"],
    relatedSymptoms: {
      "Cardiovascular": ["Chest pain", "Palpitations", "Irregular heartbeat"],
      "Respiratory": ["Cough", "Dyspnea", "Wheezing", "Chest tightness"]
    }
  },
  abdomen: {
    id: "abdomen",
    name: "Abdomen",
    relatedSystems: ["Gastrointestinal"],
    relatedSymptoms: {
      "Gastrointestinal": ["Abdominal pain", "Nausea", "Vomiting", "Diarrhea", "Constipation", "Bloating", "Loss of appetite"]
    }
  },
  pelvis: {
    id: "pelvis",
    name: "Pelvis",
    relatedSystems: ["Urinary", "Gastrointestinal"],
    relatedSymptoms: {
      "Urinary": ["Dysuria", "Frequency", "Urgency", "Hematuria", "Incontinence"],
      "Gastrointestinal": ["Lower abdominal pain", "Pelvic pressure"]
    }
  },
  leftArm: {
    id: "leftArm",
    name: "Left Arm",
    relatedSystems: ["Musculoskeletal", "Cardiovascular"],
    relatedSymptoms: {
      "Musculoskeletal": ["Joint pain", "Muscle pain", "Weakness", "Stiffness"],
      "Cardiovascular": ["Radiating chest pain", "Claudication"]
    }
  },
  rightArm: {
    id: "rightArm",
    name: "Right Arm",
    relatedSystems: ["Musculoskeletal"],
    relatedSymptoms: {
      "Musculoskeletal": ["Joint pain", "Muscle pain", "Weakness", "Stiffness", "Limited range of motion"]
    }
  },
  leftLeg: {
    id: "leftLeg",
    name: "Left Leg",
    relatedSystems: ["Musculoskeletal"],
    relatedSymptoms: {
      "Musculoskeletal": ["Joint pain", "Muscle pain", "Weakness", "Limited range of motion", "Swelling", "Cramps"]
    }
  },
  rightLeg: {
    id: "rightLeg",
    name: "Right Leg",
    relatedSystems: ["Musculoskeletal"],
    relatedSymptoms: {
      "Musculoskeletal": ["Joint pain", "Muscle pain", "Weakness", "Limited range of motion", "Swelling", "Cramps"]
    }
  },
  back: {
    id: "back",
    name: "Back",
    relatedSystems: ["Musculoskeletal"],
    relatedSymptoms: {
      "Musculoskeletal": ["Back pain", "Stiffness", "Limited range of motion", "Muscle spasms", "Radiating pain"]
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

  const handleKeyDown = (event: React.KeyboardEvent, partId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePartClick(partId);
    }
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
    <div className={cn("relative border rounded-lg p-4 bg-card", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-medium">Interactive Body Diagram</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={decreaseZoom}
            className="h-8 w-8 p-0"
            aria-label="Zoom out"
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
              aria-label="Zoom level"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={increaseZoom}
            className="h-8 w-8 p-0"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleView}
            className="h-8 p-1"
            aria-label={`Switch to ${viewType === "anterior" ? "back" : "front"} view`}
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
          role="img"
          aria-label={`Human body diagram - ${viewType} view`}
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
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill={selectedPart === "head" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  className="hover:fill-primary/20 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => handlePartClick("head")}
                  onKeyDown={(e) => handleKeyDown(e, "head")}
                  tabIndex={0}
                  role="button"
                  aria-label="Head - click to select and view related symptoms"
                />
                
                {/* Torso */}
                <path
                  d="M80 90 L160 90 L170 200 L150 240 L90 240 L70 200 Z"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill={selectedPart === "chest" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  className="hover:fill-primary/20 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => handlePartClick("chest")}
                  onKeyDown={(e) => handleKeyDown(e, "chest")}
                  tabIndex={0}
                  role="button"
                  aria-label="Chest - click to select and view related symptoms"
                />
                
                {/* Abdomen */}
                <path
                  d="M90 240 L150 240 L155 300 L85 300 Z"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill={selectedPart === "abdomen" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  className="hover:fill-primary/20 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => handlePartClick("abdomen")}
                  onKeyDown={(e) => handleKeyDown(e, "abdomen")}
                  tabIndex={0}
                  role="button"
                  aria-label="Abdomen - click to select and view related symptoms"
                />
                
                {/* Pelvis */}
                <path
                  d="M85 300 L155 300 L165 340 L75 340 Z"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill={selectedPart === "pelvis" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  className="hover:fill-primary/20 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => handlePartClick("pelvis")}
                  onKeyDown={(e) => handleKeyDown(e, "pelvis")}
                  tabIndex={0}
                  role="button"
                  aria-label="Pelvis - click to select and view related symptoms"
                />
                
                {/* Left Arm */}
                <path
                  d="M70 100 L50 100 L40 180 L50 250 L70 250"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill={selectedPart === "leftArm" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  className="hover:fill-primary/20 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => handlePartClick("leftArm")}
                  onKeyDown={(e) => handleKeyDown(e, "leftArm")}
                  tabIndex={0}
                  role="button"
                  aria-label="Left Arm - click to select and view related symptoms"
                />
                
                {/* Right Arm */}
                <path
                  d="M170 100 L190 100 L200 180 L190 250 L170 250"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill={selectedPart === "rightArm" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  className="hover:fill-primary/20 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => handlePartClick("rightArm")}
                  onKeyDown={(e) => handleKeyDown(e, "rightArm")}
                  tabIndex={0}
                  role="button"
                  aria-label="Right Arm - click to select and view related symptoms"
                />
                
                {/* Left Leg */}
                <path
                  d="M85 340 L75 340 L65 450 L105 450 L105 340"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill={selectedPart === "leftLeg" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  className="hover:fill-primary/20 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => handlePartClick("leftLeg")}
                  onKeyDown={(e) => handleKeyDown(e, "leftLeg")}
                  tabIndex={0}
                  role="button"
                  aria-label="Left Leg - click to select and view related symptoms"
                />
                
                {/* Right Leg */}
                <path
                  d="M135 340 L135 450 L175 450 L165 340 Z"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill={selectedPart === "rightLeg" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  className="hover:fill-primary/20 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => handlePartClick("rightLeg")}
                  onKeyDown={(e) => handleKeyDown(e, "rightLeg")}
                  tabIndex={0}
                  role="button"
                  aria-label="Right Leg - click to select and view related symptoms"
                />
              </>
            ) : (
              // Posterior (back) view with same enhancements
              <>
                {/* Head */}
                <circle
                  cx="120"
                  cy="50"
                  r="40"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill={selectedPart === "head" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  className="hover:fill-primary/20 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => handlePartClick("head")}
                  onKeyDown={(e) => handleKeyDown(e, "head")}
                  tabIndex={0}
                  role="button"
                  aria-label="Head - click to select and view related symptoms"
                />
                
                {/* Back */}
                <path
                  d="M80 90 L160 90 L170 240 L70 240 Z"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill={selectedPart === "back" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  className="hover:fill-primary/20 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => handlePartClick("back")}
                  onKeyDown={(e) => handleKeyDown(e, "back")}
                  tabIndex={0}
                  role="button"
                  aria-label="Back - click to select and view related symptoms"
                />
                
                {/* Pelvis */}
                <path
                  d="M70 240 L170 240 L165 300 L75 300 Z"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill={selectedPart === "pelvis" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  className="hover:fill-primary/20 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => handlePartClick("pelvis")}
                  onKeyDown={(e) => handleKeyDown(e, "pelvis")}
                  tabIndex={0}
                  role="button"
                  aria-label="Pelvis - click to select and view related symptoms"
                />
                
                {/* Left Arm */}
                <path
                  d="M70 100 L50 100 L40 180 L50 250 L70 250"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill={selectedPart === "leftArm" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  className="hover:fill-primary/20 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => handlePartClick("leftArm")}
                  onKeyDown={(e) => handleKeyDown(e, "leftArm")}
                  tabIndex={0}
                  role="button"
                  aria-label="Left Arm - click to select and view related symptoms"
                />
                
                {/* Right Arm */}
                <path
                  d="M170 100 L190 100 L200 180 L190 250 L170 250"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill={selectedPart === "rightArm" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  className="hover:fill-primary/20 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => handlePartClick("rightArm")}
                  onKeyDown={(e) => handleKeyDown(e, "rightArm")}
                  tabIndex={0}
                  role="button"
                  aria-label="Right Arm - click to select and view related symptoms"
                />
                
                {/* Left Leg */}
                <path
                  d="M85 300 L75 300 L65 450 L105 450 L105 300"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill={selectedPart === "leftLeg" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  className="hover:fill-primary/20 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => handlePartClick("leftLeg")}
                  onKeyDown={(e) => handleKeyDown(e, "leftLeg")}
                  tabIndex={0}
                  role="button"
                  aria-label="Left Leg - click to select and view related symptoms"
                />
                
                {/* Right Leg */}
                <path
                  d="M135 300 L135 450 L175 450 L165 300 Z"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                  fill={selectedPart === "rightLeg" ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  className="hover:fill-primary/20 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => handlePartClick("rightLeg")}
                  onKeyDown={(e) => handleKeyDown(e, "rightLeg")}
                  tabIndex={0}
                  role="button"
                  aria-label="Right Leg - click to select and view related symptoms"
                />
              </>
            )}
          </svg>
        </div>
      </div>

      {selectedPart && (
        <div className="mt-4 p-3 bg-muted/50 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-foreground">{bodyParts[selectedPart].name} Selected</p>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Related systems: {bodyParts[selectedPart].relatedSystems.join(", ")}
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="symptoms">
              <AccordionTrigger className="text-sm font-medium">
                Related Symptoms
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {Object.entries(bodyParts[selectedPart].relatedSymptoms).map(([system, symptoms]) => (
                    <div key={system}>
                      <h4 className="text-sm font-medium text-foreground mb-2">{system}</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {symptoms.map((symptom) => (
                          <span
                            key={symptom}
                            className="text-xs px-2 py-1 bg-background rounded border text-muted-foreground"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );
}
