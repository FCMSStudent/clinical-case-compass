import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  Filter,
  AlertCircle,
  Info,
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
  const [expandedSystems, setExpandedSystems] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
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
    if (!searchTerm && activeTab === "all") return systemSymptoms;

    return systemSymptoms.map(system => ({
      system: system.system,
      symptoms: system.symptoms.filter(symptom => {
        const matchesSearch = searchTerm 
          ? symptom.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
        
        const matchesTab = activeTab === "all" 
          ? true 
          : activeTab === "favorites" 
            ? favoriteSymptoms.includes(symptom)
            : activeTab === "recent" 
              ? recentSymptoms.includes(symptom)
              : true;

        return matchesSearch && matchesTab;
      })
    })).filter(system => system.symptoms.length > 0);
  }, [searchTerm, activeTab, favoriteSymptoms, recentSymptoms]);

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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex items-center space-x-2 p-2 rounded-md transition-colors",
          isHighlighted && "bg-yellow-50",
          isSelected && "bg-medical-50"
        )}
      >
        <Checkbox
          id={`${system}-${symptom}`}
          checked={isSelected}
          onCheckedChange={(checked) => handleSymptomChange(system, symptom, checked as boolean)}
          className={cn(
            "data-[state=checked]:bg-medical-600 data-[state=checked]:border-medical-600",
            isHighlighted && "border-yellow-500"
          )}
        />
        <Label
          htmlFor={`${system}-${symptom}`}
          className={cn(
            "text-sm cursor-pointer flex-1",
            isHighlighted && "text-yellow-800 font-medium"
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
                className="h-6 w-6 p-0 hover:bg-transparent"
                onClick={() => toggleFavorite(symptom)}
              >
                {isFavorite ? (
                  <Star className="h-4 w-4 text-yellow-500" />
                ) : (
                  <StarOff className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {isRecent && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <History className="h-4 w-4 text-blue-500" />
              </TooltipTrigger>
              <TooltipContent>Recently used</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </motion.div>
    );
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
        <Card className="border-medical-200 shadow-sm">
          <CardHeader className="space-y-4 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">System Review & Symptoms</CardTitle>
              {totalSelected > 0 && (
                <Badge variant="secondary" className="bg-medical-100 text-medical-800">
                  {totalSelected} selected
                </Badge>
              )}
            </div>
            
            <div className="flex flex-col space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search symptoms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    All
                  </TabsTrigger>
                  <TabsTrigger value="favorites" className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Favorites
                  </TabsTrigger>
                  <TabsTrigger value="recent" className="flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Recent
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredSystems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Alert variant="default" className="bg-medical-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No symptoms found matching your search criteria.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {filteredSystems.map(({ system, symptoms }) => (
                    <Collapsible
                      key={system}
                      open={expandedSystems[system]}
                      onOpenChange={() => toggleSystem(system)}
                      className="border rounded-lg overflow-hidden"
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-medical-50 hover:bg-medical-100 transition-colors">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-medical-800">{system}</span>
                          {selectedSymptoms[system]?.length > 0 && (
                            <Badge variant="outline" className="bg-medical-100 text-xs font-normal">
                              {selectedSymptoms[system].length}/{symptoms.length}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {selectedSymptoms[system]?.length > 0 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-medical-600 hover:text-medical-800"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleClearAll(system);
                              }}
                            >
                              Clear
                            </Button>
                          )}
                          {expandedSystems[system] ? (
                            <ChevronDown className="h-4 w-4 text-medical-600" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-medical-600" />
                          )}
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="p-3 space-y-2">
                          <div className="flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => handleSelectAll(system)}
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Select All
                            </Button>
                          </div>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}