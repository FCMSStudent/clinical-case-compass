
import React, { useState, useEffect, memo, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  Search,
  Check,
  X,
  Circle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SymptomChecklistProps {
  onSelectionChange: (selections: Record<string, string[]>) => void;
  initialSelections?: Record<string, string[]>;
  highlightedSymptoms?: Record<string, string[]>;
  // Add backward compatibility for the old props used in CaseEdit.tsx
  onSymptomChange?: (symptoms: Record<string, boolean>) => void;
  initialSymptoms?: Record<string, boolean>;
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

// Memoized symptom item to prevent unnecessary re-renders
const SymptomItem = memo(({
  system,
  symptom,
  isChecked,
  isHighlighted,
  onToggle,
  id
}: {
  system: string;
  symptom: string;
  isChecked: boolean;
  isHighlighted: boolean;
  onToggle: (checked: boolean) => void;
  id: string;
}) => (
  <div 
    className={cn(
      "flex items-start space-x-2 p-1 transition-colors rounded",
      isHighlighted && "bg-yellow-50",
      isChecked && "bg-medical-50"
    )}
  >
    <Checkbox 
      id={id} 
      checked={isChecked}
      onCheckedChange={(checked) => onToggle(checked === true)}
      className={cn(
        "mt-1 transition-all duration-200",
        isChecked && "bg-medical-600 border-medical-600",
        isHighlighted && "ring-2 ring-yellow-400"
      )}
    />
    <Label 
      htmlFor={id}
      className={cn(
        "text-sm leading-tight cursor-pointer",
        isChecked && "text-medical-900",
        isHighlighted && "font-medium"
      )}
    >
      {symptom}
    </Label>
  </div>
));
SymptomItem.displayName = "SymptomItem";

export function SymptomChecklist({ 
  onSelectionChange, 
  initialSelections = {}, 
  highlightedSymptoms = {},
  // Support for old prop interface
  onSymptomChange,
  initialSymptoms
}: SymptomChecklistProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, string[]>>(initialSelections);
  const [activeSystem, setActiveSystem] = useState<string>(systemSymptoms[0].system);
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();

  // Convert old format (boolean record) to new format (string array record) if needed
  useEffect(() => {
    if (initialSymptoms && Object.keys(initialSymptoms).length > 0 && 
        Object.keys(initialSelections).length === 0) {
      const convertedSelections: Record<string, string[]> = {};
      
      systemSymptoms.forEach(({ system, symptoms }) => {
        convertedSelections[system] = symptoms.filter(
          symptom => initialSymptoms[`${system}-${symptom}`]
        );
      });
      
      setSelectedSymptoms(convertedSelections);
    }
  }, [initialSymptoms, initialSelections]);

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
      
      // Notify parent component using new prop
      onSelectionChange(updatedSelections);
      
      // Support for backward compatibility - convert to old format and notify if callback exists
      if (onSymptomChange) {
        const booleanFormat: Record<string, boolean> = {};
        
        Object.entries(updatedSelections).forEach(([system, symptoms]) => {
          symptoms.forEach(symptom => {
            booleanFormat[`${system}-${symptom}`] = true;
          });
        });
        
        onSymptomChange(booleanFormat);
      }
      
      return updatedSelections;
    });
  };

  const handleSelectAll = (system: string) => {
    const allSystemSymptoms = systemSymptoms.find(s => s.system === system)?.symptoms || [];
    
    setSelectedSymptoms(prev => {
      const updatedSelections = {
        ...prev,
        [system]: [...allSystemSymptoms]
      };
      
      // Notify parent components
      onSelectionChange(updatedSelections);
      
      // Support for backward compatibility
      if (onSymptomChange) {
        const booleanFormat: Record<string, boolean> = {};
        
        Object.entries(updatedSelections).forEach(([system, symptoms]) => {
          symptoms.forEach(symptom => {
            booleanFormat[`${system}-${symptom}`] = true;
          });
        });
        
        onSymptomChange(booleanFormat);
      }
      
      return updatedSelections;
    });
  };

  const handleClearAll = (system: string) => {
    setSelectedSymptoms(prev => {
      const updatedSelections = {
        ...prev,
        [system]: []
      };
      
      // Notify parent components
      onSelectionChange(updatedSelections);
      
      // Support for backward compatibility
      if (onSymptomChange) {
        // Create a new boolean format with the system's symptoms cleared
        const booleanFormat: Record<string, boolean> = {};
        
        Object.entries(updatedSelections).forEach(([system, symptoms]) => {
          if (symptoms.length > 0) {
            symptoms.forEach(symptom => {
              booleanFormat[`${system}-${symptom}`] = true;
            });
          }
        });
        
        onSymptomChange(booleanFormat);
      }
      
      return updatedSelections;
    });
  };

  const isChecked = (system: string, symptom: string): boolean => {
    return selectedSymptoms[system]?.includes(symptom) || false;
  };

  const isHighlighted = (system: string, symptom: string): boolean => {
    return highlightedSymptoms[system]?.includes(symptom) || false;
  };

  // Calculate selection counts for each system
  const selectionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    systemSymptoms.forEach(({ system }) => {
      counts[system] = selectedSymptoms[system]?.length || 0;
    });
    
    return counts;
  }, [selectedSymptoms]);

  // Filter symptoms based on search term
  const filteredSystems = useMemo(() => {
    if (!searchTerm) return systemSymptoms;
    
    return systemSymptoms.map(system => ({
      system: system.system,
      symptoms: system.symptoms.filter(symptom => 
        symptom.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(system => system.symptoms.length > 0);
  }, [searchTerm]);

  // Mobile view uses Collapsible components
  if (isMobile) {
    return (
      <div className="bg-white rounded-lg border border-medical-200 overflow-hidden shadow-sm">
        <div className="p-3 bg-medical-50 border-b border-medical-200">
          <h3 className="font-medium text-medical-800">System Review Checklist</h3>
        </div>
        
        <div className="p-3 border-b border-medical-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 border-medical-200"
            />
          </div>
        </div>
        
        <div className="divide-y divide-medical-100 max-h-[400px] overflow-y-auto">
          {filteredSystems.map((systemItem) => {
            const totalCount = systemItem.symptoms.length;
            const selectedCount = selectedSymptoms[systemItem.system]?.filter(
              s => systemItem.symptoms.includes(s)
            ).length || 0;
            
            return (
              <Collapsible 
                key={systemItem.system} 
                className="w-full"
                open={systemItem.system === activeSystem || Object.keys(highlightedSymptoms).includes(systemItem.system)}
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between p-3 font-medium text-left hover:bg-medical-50/60 transition-colors">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{systemItem.system}</span>
                    {selectedCount > 0 && (
                      <Badge variant="outline" className="bg-medical-100 font-normal text-xs">
                        {selectedCount}/{totalCount}
                      </Badge>
                    )}
                  </div>
                  <ChevronDown className="h-4 w-4 text-medical-500 transition-transform duration-200 ui-open:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-2 pb-3 bg-medical-50/20">
                  <div className="flex justify-between items-center mb-2 px-1">
                    <span className="text-xs text-muted-foreground">
                      {selectedCount} of {totalCount} selected
                    </span>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => handleSelectAll(systemItem.system)}
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Select All
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-xs"
                        onClick={() => handleClearAll(systemItem.system)}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Clear
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {systemItem.symptoms.map((symptom) => (
                      <SymptomItem
                        key={symptom}
                        system={systemItem.system}
                        symptom={symptom}
                        isChecked={isChecked(systemItem.system, symptom)}
                        isHighlighted={isHighlighted(systemItem.system, symptom)}
                        onToggle={(checked) => handleSymptomToggle(systemItem.system, symptom, checked)}
                        id={`${systemItem.system}-${symptom}-mobile`}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
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
      
      <div className="p-3 border-b border-medical-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 border-medical-200"
          />
        </div>
      </div>
      
      <Tabs 
        value={activeSystem} 
        onValueChange={setActiveSystem}
        className="w-full"
      >
        <TabsList className="flex overflow-x-auto w-full rounded-none bg-medical-50/50 border-b border-medical-200">
          {systemSymptoms.map((item) => {
            const count = selectionCounts[item.system];
            const hasHighlights = Object.keys(highlightedSymptoms).includes(item.system);
            
            return (
              <TabsTrigger 
                key={item.system} 
                value={item.system}
                className={cn(
                  "text-xs py-1.5 px-3 flex-shrink-0 flex items-center gap-2",
                  "data-[state=active]:bg-white data-[state=active]:border-x data-[state=active]:border-t data-[state=active]:border-medical-200 data-[state=active]:border-b-0 data-[state=active]:rounded-b-none",
                  hasHighlights && "ring-2 ring-yellow-300"
                )}
              >
                {item.system}
                {count > 0 && (
                  <Badge variant="outline" className="bg-medical-100 text-xs">
                    {count}
                  </Badge>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="max-h-[400px] overflow-y-auto">
          {systemSymptoms.map((systemItem) => {
            const totalCount = systemItem.symptoms.length;
            const selectedCount = selectionCounts[systemItem.system] || 0;
            
            return (
              <TabsContent key={systemItem.system} value={systemItem.system} className="p-3 m-0">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-muted-foreground">
                    {selectedCount} of {totalCount} selected
                  </span>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSelectAll(systemItem.system)}
                      className="h-8 bg-medical-50/50 border-medical-200 hover:bg-medical-100"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Select All
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleClearAll(systemItem.system)}
                      className="h-8"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {systemItem.symptoms.filter(symptom => {
                    // Filter based on search if active
                    if (searchTerm) {
                      return symptom.toLowerCase().includes(searchTerm.toLowerCase());
                    }
                    return true;
                  }).map((symptom) => (
                    <SymptomItem
                      key={symptom}
                      system={systemItem.system}
                      symptom={symptom}
                      isChecked={isChecked(systemItem.system, symptom)}
                      isHighlighted={isHighlighted(systemItem.system, symptom)}
                      onToggle={(checked) => handleSymptomToggle(systemItem.system, symptom, checked)}
                      id={`${systemItem.system}-${symptom}`}
                    />
                  ))}
                </div>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
}
