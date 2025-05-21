
import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface SymptomChecklistProps {
  onSelectionChange: (selections: Record<string, string[]>) => void;
  initialSelections?: Record<string, string[]>;
  highlightedSymptoms?: Record<string, string[]>;
}

interface SystemSymptoms {
  system: string;
  symptoms: string[];
}

const systemSymptoms: SystemSymptoms[] = [
  {
    system: "Cardiovascular",
    symptoms: [
      "Chest pain",
      "Palpitations",
      "Shortness of breath",
      "Edema",
      "Orthopnea",
      "Syncope",
      "Claudication",
      "Cyanosis",
      "Hypertension",
      "Hypotension",
    ],
  },
  {
    system: "Gastrointestinal",
    symptoms: [
      "Abdominal pain",
      "Nausea",
      "Vomiting",
      "Diarrhea",
      "Constipation",
      "Heartburn",
      "Dysphagia",
      "Hematemesis",
      "Melena",
      "Jaundice",
    ],
  },
  {
    system: "Musculoskeletal",
    symptoms: [
      "Joint pain",
      "Muscle pain",
      "Swelling",
      "Stiffness",
      "Limited range of motion",
      "Weakness",
      "Back pain",
      "Fractures",
      "Redness",
      "Deformity",
    ],
  },
  {
    system: "Neurological",
    symptoms: [
      "Headache",
      "Dizziness",
      "Seizures",
      "Paresthesia",
      "Weakness",
      "Vision changes",
      "Speech changes",
      "Altered mental status",
      "Tremor",
      "Ataxia",
    ],
  },
  {
    system: "Respiratory",
    symptoms: [
      "Cough",
      "Dyspnea",
      "Wheezing",
      "Hemoptysis",
      "Sputum production",
      "Pleuritic pain",
      "Orthopnea",
      "Stridor",
      "Apnea",
      "Tachypnea",
    ],
  },
  {
    system: "Urinary",
    symptoms: [
      "Dysuria",
      "Frequency",
      "Urgency",
      "Hesitancy",
      "Nocturia",
      "Hematuria",
      "Incontinence",
      "Polyuria",
      "Oliguria",
      "Flank pain",
      "Suprapubic pain",
      "Urinary retention"
    ],
  }
];

export function SymptomChecklist({ 
  onSelectionChange, 
  initialSelections = {}, 
  highlightedSymptoms = {} 
}: SymptomChecklistProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, string[]>>(initialSelections);
  const [activeSystem, setActiveSystem] = useState<string>(systemSymptoms[0].system);
  const isMobile = useIsMobile();

  // Effect to update active system when highlighted symptoms change
  useEffect(() => {
    if (highlightedSymptoms && Object.keys(highlightedSymptoms).length > 0) {
      // Set the active system to the first system that has highlighted symptoms
      const systemWithHighlights = Object.keys(highlightedSymptoms)[0];
      if (systemWithHighlights) {
        setActiveSystem(systemWithHighlights);
      }
    }
  }, [highlightedSymptoms]);

  const handleSymptomToggle = (system: string, symptom: string, checked: boolean) => {
    setSelectedSymptoms((prev) => {
      const systemSymptoms = prev[system] || [];
      let updatedSystemSymptoms: string[];
      
      if (checked) {
        updatedSystemSymptoms = [...systemSymptoms, symptom];
      } else {
        updatedSystemSymptoms = systemSymptoms.filter(s => s !== symptom);
      }
      
      const updatedSelections = {
        ...prev,
        [system]: updatedSystemSymptoms
      };
      
      // Notify parent component
      onSelectionChange(updatedSelections);
      
      return updatedSelections;
    });
  };

  const isChecked = (system: string, symptom: string): boolean => {
    return selectedSymptoms[system]?.includes(symptom) || false;
  };

  const isHighlighted = (system: string, symptom: string): boolean => {
    return highlightedSymptoms[system]?.includes(symptom) || false;
  };

  // Mobile view uses Collapsible components
  if (isMobile) {
    return (
      <div className="bg-white rounded-lg border border-medical-200 overflow-hidden shadow-sm">
        <div className="p-3 bg-medical-50 border-b border-medical-200">
          <h3 className="font-medium text-medical-800">System Review Checklist</h3>
        </div>
        
        <div className="divide-y divide-medical-100">
          {systemSymptoms.map((systemItem) => (
            <Collapsible 
              key={systemItem.system} 
              className="w-full"
              open={Object.keys(highlightedSymptoms).includes(systemItem.system)}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between p-3 font-medium text-left hover:bg-medical-50/60 transition-colors">
                <span className="text-sm">{systemItem.system}</span>
                <ChevronDown className="h-4 w-4 text-medical-500 transition-transform duration-200 ui-open:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-2 pb-3 bg-medical-50/20">
                <div className="grid grid-cols-1 gap-2">
                  {systemItem.symptoms.map((symptom) => (
                    <div 
                      key={symptom} 
                      className={cn(
                        "flex items-start space-x-2 py-1",
                        isHighlighted(systemItem.system, symptom) && "bg-yellow-50 rounded-md px-1"
                      )}
                    >
                      <Checkbox 
                        id={`${systemItem.system}-${symptom}-mobile`} 
                        checked={isChecked(systemItem.system, symptom)}
                        onCheckedChange={(checked) => 
                          handleSymptomToggle(systemItem.system, symptom, checked === true)
                        }
                        className={cn(
                          "mt-0.5",
                          isHighlighted(systemItem.system, symptom) && "ring-2 ring-yellow-400"
                        )}
                      />
                      <Label 
                        htmlFor={`${systemItem.system}-${symptom}-mobile`}
                        className={cn(
                          "text-sm leading-tight cursor-pointer",
                          isHighlighted(systemItem.system, symptom) && "font-medium"
                        )}
                      >
                        {symptom}
                      </Label>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    );
  }
  
  // Desktop view uses Tabs
  return (
    <div className="bg-white rounded-lg border border-medical-200 overflow-hidden shadow-sm">
      <div className="p-3 bg-medical-50 border-b border-medical-200">
        <h3 className="font-medium text-medical-800">System Review Checklist</h3>
      </div>
      
      <Tabs 
        value={activeSystem} 
        onValueChange={setActiveSystem}
        className="w-full"
      >
        <TabsList className="grid grid-cols-6 w-full rounded-none bg-medical-50/50 border-b border-medical-200">
          {systemSymptoms.map((item) => (
            <TabsTrigger 
              key={item.system} 
              value={item.system}
              className={cn(
                "text-xs py-1.5 px-2",
                "data-[state=active]:bg-white data-[state=active]:border-x data-[state=active]:border-t data-[state=active]:border-medical-200 data-[state=active]:border-b-0 data-[state=active]:rounded-b-none",
                Object.keys(highlightedSymptoms).includes(item.system) && "ring-2 ring-yellow-300"
              )}
            >
              {item.system}
            </TabsTrigger>
          ))}
        </TabsList>

        {systemSymptoms.map((systemItem) => (
          <TabsContent key={systemItem.system} value={systemItem.system} className="p-2 pt-3">
            <div className="grid grid-cols-2 gap-2">
              {systemItem.symptoms.map((symptom) => (
                <div 
                  key={symptom} 
                  className={cn(
                    "flex items-start space-x-2",
                    isHighlighted(systemItem.system, symptom) && "bg-yellow-50 rounded-md p-0.5"
                  )}
                >
                  <Checkbox 
                    id={`${systemItem.system}-${symptom}`} 
                    checked={isChecked(systemItem.system, symptom)}
                    onCheckedChange={(checked) => 
                      handleSymptomToggle(systemItem.system, symptom, checked === true)
                    }
                    className={cn(
                      "mt-1",
                      isHighlighted(systemItem.system, symptom) && "ring-2 ring-yellow-400"
                    )}
                  />
                  <Label 
                    htmlFor={`${systemItem.system}-${symptom}`}
                    className={cn(
                      "text-sm leading-tight cursor-pointer",
                      isHighlighted(systemItem.system, symptom) && "font-medium"
                    )}
                  >
                    {symptom}
                  </Label>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
