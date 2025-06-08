import React, { useState, useEffect, memo, useMemo, useCallback } from "react";
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
import { 
  ChevronDown, 
  Search,
  Check,
  X,
  Circle,
  Filter,
  AlertCircle,
  Info,
  Star,
  Clock,
  Sparkles,
  ArrowUpDown,
  BookOpen,
  Tag,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { systemSymptoms } from "./systemSymptoms";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SymptomChecklistProps {
  onSelectionChange: (selections: Record<string, string[]>) => void;
  initialSelections?: Record<string, string[]>;
  highlightedSymptoms?: Record<string, string[]>;
  // Add backward compatibility for the old props used in CaseEdit.tsx
  onSymptomChange?: (symptoms: Record<string, boolean>) => void;
  initialSymptoms?: Record<string, boolean>;
}

// Memoized symptom item with enhanced visual feedback
const SymptomItem = memo(({
  system,
  symptom,
  isChecked,
  isHighlighted,
  onToggle,
  id,
  isSearchResult,
  isRecentlyUsed,
  isFrequentlyUsed,
}: {
  system: string;
  symptom: string;
  isChecked: boolean;
  isHighlighted: boolean;
  onToggle: (checked: boolean) => void;
  id: string;
  isSearchResult?: boolean;
  isRecentlyUsed?: boolean;
  isFrequentlyUsed?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{
        scale: isHovered ? 1.02 : 1,
        backgroundColor: isChecked 
          ? "hsl(var(--medical-50))" 
          : isHovered 
          ? "hsl(var(--medical-50/0.5))" 
          : "transparent",
      }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex items-start space-x-2 p-2 rounded-lg transition-all duration-200",
        isHighlighted && "bg-yellow-50 ring-1 ring-yellow-200",
        isSearchResult && "bg-blue-50/50",
        isRecentlyUsed && "bg-green-50/50",
        isFrequentlyUsed && "bg-purple-50/50",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Checkbox 
        id={id} 
        checked={isChecked}
        onCheckedChange={(checked) => onToggle(checked === true)}
        className={cn(
          "mt-1 transition-all duration-200",
          isChecked && "bg-medical-600 border-medical-600",
          isHighlighted && "ring-2 ring-yellow-400",
          isHovered && "scale-110",
        )}
      />
      <div className="flex-1 min-w-0">
        <Label 
          htmlFor={id}
          className={cn(
            "text-sm leading-tight cursor-pointer block",
            isChecked && "text-medical-900 font-medium",
            isHighlighted && "font-medium",
            isSearchResult && "text-blue-700",
            isRecentlyUsed && "text-green-700",
            isFrequentlyUsed && "text-purple-700",
          )}
        >
          {symptom}
        </Label>
        {(isRecentlyUsed || isFrequentlyUsed) && (
          <div className="flex items-center gap-1 mt-1">
            {isRecentlyUsed && (
              <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Recent
              </Badge>
            )}
            {isFrequentlyUsed && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 text-xs">
                <Star className="h-3 w-3 mr-1" />
                Frequent
              </Badge>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
});
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
  const [sortBy, setSortBy] = useState<"alphabetical" | "frequency" | "recent">("alphabetical");
  const [filterBy, setFilterBy] = useState<"all" | "selected" | "highlighted">("all");
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);
  const [frequentlyUsed, setFrequentlyUsed] = useState<string[]>([]);
  const [showMobileHelp, setShowMobileHelp] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const isMobile = useIsMobile();

  // Track recently and frequently used symptoms
  useEffect(() => {
    const recentlyUsedSymptoms = localStorage.getItem("recentlyUsedSymptoms");
    const frequentlyUsedSymptoms = localStorage.getItem("frequentlyUsedSymptoms");
    
    if (recentlyUsedSymptoms) {
      setRecentlyUsed(JSON.parse(recentlyUsedSymptoms));
    }
    if (frequentlyUsedSymptoms) {
      setFrequentlyUsed(JSON.parse(frequentlyUsedSymptoms));
    }
  }, []);

  const updateUsageStats = useCallback((symptom: string) => {
    // Update recently used
    const newRecentlyUsed = [symptom, ...recentlyUsed.filter(s => s !== symptom)].slice(0, 5);
    setRecentlyUsed(newRecentlyUsed);
    localStorage.setItem("recentlyUsedSymptoms", JSON.stringify(newRecentlyUsed));

    // Update frequently used
    const currentFreq = frequentlyUsed.filter(s => s === symptom).length;
    const newFrequentlyUsed = [...frequentlyUsed];
    if (currentFreq === 0) {
      newFrequentlyUsed.push(symptom);
    }
    setFrequentlyUsed(newFrequentlyUsed);
    localStorage.setItem("frequentlyUsedSymptoms", JSON.stringify(newFrequentlyUsed));
  }, [recentlyUsed, frequentlyUsed]);

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
                  "text-xs py-1 px-3 flex-shrink-0 flex items-center gap-2",
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
