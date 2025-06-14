import React, { useState, useEffect, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  AlertCircle,
  Star,
  StarOff,
  History
} from "lucide-react";
import { systemSymptoms } from "./systemSymptoms";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-is-mobile";

interface SystemReviewChecklistProps {
  onSystemSymptomsChange?: (systemSymptoms: Record<string, string[]>) => void;
  initialSystemSymptoms?: Record<string, string[]>;
  highlightedSymptoms?: Record<string, string[]>;
  recentSymptoms?: string[];
}

export function SystemReviewChecklist({ 
  onSystemSymptomsChange, 
  initialSystemSymptoms = {},
  highlightedSymptoms = {},
  recentSymptoms = []
}: SystemReviewChecklistProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, string[]>>(initialSystemSymptoms);
  
  // Initialize expandedSystems with the first system expanded, if systemSymptoms is not empty
  const [expandedSystems, setExpandedSystems] = useState<Record<string, boolean>>(() => {
    if (systemSymptoms.length > 0) {
      return { [systemSymptoms[0].system]: true };
    }
    return {};
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteSymptoms, setFavoriteSymptoms] = useState<string[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    setSelectedSymptoms(initialSystemSymptoms);
  }, [initialSystemSymptoms]);

  const handleSymptomChange = (system: string, symptom: string, checked: boolean) => {
    const updatedSymptoms = { ...selectedSymptoms };

    if (!updatedSymptoms[system]) {
      updatedSymptoms[system] = [];
    }

    if (checked) {
      if (!updatedSymptoms[system].includes(symptom)) {
        updatedSymptoms[system] = [...updatedSymptoms[system], symptom];
      }
    } else {
      updatedSymptoms[system] = updatedSymptoms[system].filter(s => s !== symptom);
      if (updatedSymptoms[system].length === 0) {
        delete updatedSymptoms[system];
      }
    }

    setSelectedSymptoms(updatedSymptoms);
    if (onSystemSymptomsChange) {
      onSystemSymptomsChange(updatedSymptoms);
    }
  };

  const handleSelectAll = (system: string) => {
    const allSymptoms = systemSymptoms.find(s => s.system === system)?.symptoms || [];
    const updatedSymptoms = {
      ...selectedSymptoms,
      [system]: [...allSymptoms]
    };
    setSelectedSymptoms(updatedSymptoms);
    if (onSystemSymptomsChange) {
      onSystemSymptomsChange(updatedSymptoms);
    }
  };

  const handleClearAll = (system: string) => {
    const updatedSymptoms = { ...selectedSymptoms };
    delete updatedSymptoms[system];
    setSelectedSymptoms(updatedSymptoms);
    if (onSystemSymptomsChange) {
      onSystemSymptomsChange(updatedSymptoms);
    }
  };

  const toggleSystem = (system: string) => {
    setExpandedSystems(prev => ({
      ...prev,
      [system]: !prev[system]
    }));
  };

  const toggleFavorite = (symptom: string) => {
    setFavoriteSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const filteredSystems = useMemo(() => {
    if (!searchTerm) return systemSymptoms;

    return systemSymptoms.map(system => ({
      system: system.system,
      symptoms: system.symptoms.filter(symptom => 
        symptom.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(system => system.symptoms.length > 0);
  }, [searchTerm]);

  const totalSelected = useMemo(() => 
    Object.values(selectedSymptoms).reduce((acc, symptoms) => acc + symptoms.length, 0),
    [selectedSymptoms]
  );

  const SymptomItem = ({ system, symptom }: { system: string; symptom: string }) => {
    const isSelected = selectedSymptoms[system]?.includes(symptom) || false;
    const isHighlighted = highlightedSymptoms[system]?.includes(symptom) || false;
    const isFavorite = favoriteSymptoms.includes(symptom);
    const isRecent = recentSymptoms.includes(symptom);

    return (
      <div
        className={cn(
          "flex items-center space-x-2 p-2 rounded-md transition-colors hover:bg-white/5",
          isHighlighted && "bg-yellow-500/10 ring-1 ring-yellow-500/30",
          isSelected && "bg-blue-500/10"
        )}
      >
        <Checkbox
          id={`${system}-${symptom}`}
          checked={isSelected}
          onCheckedChange={(checked) => handleSymptomChange(system, symptom, checked as boolean)}
          className={cn(
            "border-white/30 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 focus-visible:ring-blue-500 focus-visible:ring-offset-slate-900",
            isHighlighted && "border-yellow-500"
          )}
        />
        <Label
          htmlFor={`${system}-${symptom}`}
          className={cn(
            "text-sm cursor-pointer flex-1 text-white/80",
            isHighlighted && "text-yellow-200 font-medium"
          )}
        >
          {symptom}
        </Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-white/60 hover:text-white hover:bg-transparent"
                onClick={() => toggleFavorite(symptom)}
              >
                {isFavorite ? (
                  <Star className="h-4 w-4 text-yellow-400" />
                ) : (
                  <StarOff className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-800 border-slate-700 text-white">
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {isRecent && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <History className="h-4 w-4 text-blue-400" />
              </TooltipTrigger>
              <TooltipContent className="bg-slate-800 border-slate-700 text-white">Recently used</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <Input
            placeholder="Search symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full bg-white/5 border-white/20 placeholder:text-white/50 text-white rounded-md focus:border-blue-400/50 focus:ring-blue-400/50"
          />
        </div>
        {totalSelected > 0 && (
          <Badge variant="outline" className="bg-blue-500/20 border-blue-400/30 text-white self-start sm:self-center py-1 px-2.5">
            {totalSelected} selected
          </Badge>
        )}
      </div>

      {/* Tabs component removed */}
      {/* 
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/20 rounded-md p-1">
          <TabsTrigger value="all" className="flex items-center justify-center gap-2 py-1.5 text-sm text-white/70 data-[state=active]:bg-blue-500/30 data-[state=active]:text-white hover:bg-white/10 hover:text-white rounded-sm transition-colors">
            <Filter className="h-3.5 w-3.5" />
            All
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center justify-center gap-2 py-1.5 text-sm text-white/70 data-[state=active]:bg-blue-500/30 data-[state=active]:text-white hover:bg-white/10 hover:text-white rounded-sm transition-colors">
            <Star className="h-3.5 w-3.5" />
            Favorites
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center justify-center gap-2 py-1.5 text-sm text-white/70 data-[state=active]:bg-blue-500/30 data-[state=active]:text-white hover:bg-white/10 hover:text-white rounded-sm transition-colors">
            <History className="h-3.5 w-3.5" />
            Recent
          </TabsTrigger>
        </TabsList>
      </Tabs> 
      */}

      <AnimatePresence mode="wait">
        {filteredSystems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4"
          >
            <Alert variant="default" className="bg-white/5 border border-white/10 text-white/70 p-4 rounded-md">
              <AlertCircle className="h-5 w-5 text-white/70" />
              <AlertDescription className="ml-2">
                {searchTerm ? "No symptoms found matching your search." : "No symptoms available."}
              </AlertDescription>
            </Alert>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredSystems.map(({ system, symptoms }) => (
              <Collapsible
                key={system}
                open={!!expandedSystems[system]}
                onOpenChange={() => toggleSystem(system)}
                className="border border-white/20 rounded-lg overflow-hidden bg-transparent"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-white/[.03] hover:bg-white/[.06] transition-colors">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">{system}</span>
                    {selectedSymptoms[system]?.length > 0 && (
                      <Badge variant="outline" className="bg-blue-500/20 border-blue-400/30 text-white text-xs font-normal py-0.5 px-1.5">
                        {selectedSymptoms[system].length}/{systemSymptoms.find(s => s.system === system)?.symptoms.length}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedSymptoms[system]?.length > 0 && (
                       <div
                        role="button"
                        tabIndex={0}
                        className="h-7 px-2 inline-flex items-center justify-center rounded-md text-xs font-medium text-blue-300 hover:text-blue-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/50 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent CollapsibleTrigger from toggling
                          handleClearAll(system);
                        }}
                        onKeyDown={(e) => { // Basic keyboard accessibility
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.stopPropagation();
                            handleClearAll(system);
                          }
                        }}
                      >
                        Clear
                      </div>
                    )}
                    {expandedSystems[system] ? (
                      <ChevronDown className="h-4 w-4 text-blue-300" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-blue-300" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-white/[.01]">
                  <div className="p-3 space-y-2">
                    {symptoms.length > 0 && (
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs border-white/20 text-white/80 hover:bg-white/10 hover:text-white"
                          onClick={() => handleSelectAll(system)}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Select All
                        </Button>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {symptoms.map((symptom) => (
                        <SymptomItem
                          key={symptom}
                          system={system}
                          symptom={symptom}
                        />
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
