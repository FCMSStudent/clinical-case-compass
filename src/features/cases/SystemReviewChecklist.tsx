
import React, { useState, useEffect, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  Search, 
  AlertCircle,
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
  const [openSystems, setOpenSystems] = useState<string[]>(
    systemSymptoms.length > 0 ? [systemSymptoms[0].system] : []
  );
  const [searchTerm, setSearchTerm] = useState("");
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
    const isRecent = recentSymptoms.includes(symptom);

    return (
      <div
        className={cn(
          "flex items-center space-x-2 p-2 rounded-md transition-colors hover:bg-slate-100",
          isHighlighted && "bg-yellow-50 ring-1 ring-yellow-200",
          isSelected && "bg-blue-50"
        )}
      >
        <Checkbox
          id={`${system}-${symptom}`}
          checked={isSelected}
          onCheckedChange={(checked) => handleSymptomChange(system, symptom, checked as boolean)}
          className={cn(
            "border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600",
            isHighlighted && "border-yellow-500"
          )}
        />
        <Label
          htmlFor={`${system}-${symptom}`}
          className={cn(
            "text-sm cursor-pointer flex-1 text-slate-700",
            isHighlighted && "text-yellow-800 font-medium"
          )}
        >
          {symptom}
        </Label>
        {isRecent && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <History className="h-4 w-4 text-blue-500" />
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
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full bg-white border-slate-200 placeholder:text-slate-400"
          />
        </div>
        {totalSelected > 0 && (
          <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 self-start sm:self-center">
            {totalSelected} selected
          </Badge>
        )}
      </div>

      <AnimatePresence mode="wait">
        {filteredSystems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4"
          >
            <Alert variant="default" className="bg-slate-50 border-slate-200">
              <AlertCircle className="h-5 w-5 text-slate-500" />
              <AlertDescription className="ml-2 text-slate-600">
                {searchTerm ? "No symptoms found matching your search." : "No symptoms available."}
              </AlertDescription>
            </Alert>
          </motion.div>
        ) : (
          <Accordion
            type="multiple"
            className="space-y-3 border-none"
            value={openSystems}
            onValueChange={setOpenSystems}
          >
            {filteredSystems.map(({ system, symptoms }) => (
              <AccordionItem
                key={system}
                value={system}
                className="border border-slate-200 rounded-lg overflow-hidden bg-white"
              >
                <AccordionTrigger className="flex items-center justify-between w-full p-3 bg-slate-50 hover:bg-slate-100 transition-colors hover:no-underline">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-slate-800">{system}</span>
                    {selectedSymptoms[system]?.length > 0 && (
                      <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 text-xs">
                        {selectedSymptoms[system].length}/{systemSymptoms.find(s => s.system === system)?.symptoms.length}
                      </Badge>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-white">
                  <div className="p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs border-slate-200 hover:bg-slate-50"
                          onClick={() => handleSelectAll(system)}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Select All
                        </Button>
                        {selectedSymptoms[system]?.length > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs border-slate-200 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleClearAll(system)}
                          >
                            Clear
                          </Button>
                        )}
                      </div>
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
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </AnimatePresence>
    </div>
  );
}
