
import React, { useState, useEffect, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
  History,
  X,
  Heart,
  Activity,
  Brain,
  Eye,
  Ear,
  Droplet,
  Zap,
  Shield,
  Thermometer
} from "lucide-react";
import { systemSymptoms } from "./systemSymptoms";
import { cn } from "@/lib/utils";

interface SystemReviewChecklistProps {
  onSystemSymptomsChange?: (systemSymptoms: Record<string, string[]>) => void;
  initialSystemSymptoms?: Record<string, string[]>;
  highlightedSymptoms?: Record<string, string[]>;
  recentSymptoms?: string[];
}

const systemIcons: Record<string, React.ReactNode> = {
  "Cardiovascular": <Heart className="h-4 w-4" />,
  "Respiratory": <Activity className="h-4 w-4" />,
  "Neurological": <Brain className="h-4 w-4" />,
  "Gastrointestinal": <Thermometer className="h-4 w-4" />,
  "Genitourinary": <Droplet className="h-4 w-4" />,
  "Musculoskeletal": <Shield className="h-4 w-4" />,
  "Dermatological": <Eye className="h-4 w-4" />,
  "HEENT": <Ear className="h-4 w-4" />,
  "Endocrine": <Zap className="h-4 w-4" />,
};

export function SystemReviewChecklist({ 
  onSystemSymptomsChange, 
  initialSystemSymptoms = {},
  highlightedSymptoms = {},
  recentSymptoms = []
}: SystemReviewChecklistProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, string[]>>(initialSystemSymptoms);
  const [searchTerm, setSearchTerm] = useState("");

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
          "flex items-center space-x-2 p-2 rounded-md transition-colors hover:bg-slate-600/50",
          isHighlighted && "bg-blue-500/20 ring-1 ring-blue-400/30",
          isSelected && "bg-slate-600/60"
        )}
      >
        <Checkbox
          id={`${system}-${symptom}`}
          checked={isSelected}
          onCheckedChange={(checked) => handleSymptomChange(system, symptom, checked as boolean)}
          className={cn(
            "border-slate-400/50 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500",
            isHighlighted && "border-blue-400/50"
          )}
        />
        <Label
          htmlFor={`${system}-${symptom}`}
          className={cn(
            "text-xs cursor-pointer flex-1 text-slate-200",
            isHighlighted && "text-blue-200 font-medium",
            isSelected && "font-semibold text-white"
          )}
        >
          {symptom}
        </Label>
        {isRecent && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <History className="h-3 w-3 text-blue-400" />
              </TooltipTrigger>
              <TooltipContent className="bg-slate-800/90 border-slate-600/50 text-slate-100">Recently used</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  };

  const SystemCard = ({ system, symptoms }: { system: string; symptoms: string[] }) => {
    const selectedCount = selectedSymptoms[system]?.length || 0;
    const icon = systemIcons[system] || <Shield className="h-4 w-4" />;
    
    // Determine card size based on system importance and symptom count
    const getCardClassName = () => {
      if (system === "Cardiovascular" || system === "Respiratory") return "md:col-span-2 lg:col-span-2";
      if (system === "Neurological") return "md:col-span-2";
      if (symptoms.length > 10) return "md:col-span-2";
      return "";
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-600/50 p-4 transition-all hover:bg-slate-700/60 hover:border-slate-500/70",
          getCardClassName()
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              {icon}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-200 text-sm">{system}</span>
              {selectedCount > 0 && (
                <Badge variant="outline" className="bg-blue-500/20 border-blue-400/30 text-white text-xs">
                  {selectedCount}/{symptoms.length}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0 border-slate-500/50 bg-slate-700/50 text-slate-300 hover:bg-slate-600/60 hover:text-white"
              onClick={() => handleSelectAll(system)}
            >
              <Check className="h-3 w-3" />
            </Button>
            {selectedCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="h-6 w-6 p-0 border-slate-500/50 bg-slate-700/50 text-slate-300 hover:bg-slate-600/60 hover:text-white"
                onClick={() => handleClearAll(system)}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-1 max-h-40 overflow-y-auto scrollbar-thin scrollbar-track-slate-700/50 scrollbar-thumb-slate-500/50">
          {symptoms.map((symptom) => (
            <SymptomItem
              key={symptom}
              system={system}
              symptom={symptom}
            />
          ))}
        </div>
      </motion.div>
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
            className="pl-9 w-full bg-slate-700/50 border-slate-500/50 placeholder:text-slate-400 text-slate-100"
          />
        </div>
        {totalSelected > 0 && (
          <Badge variant="outline" className="bg-blue-500/20 border-blue-400/30 text-white self-start sm:self-center">
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
            <Alert variant="default" className="bg-slate-800/60 border-slate-600/50">
              <AlertCircle className="h-5 w-5 text-slate-300" />
              <AlertDescription className="ml-2 text-slate-200">
                {searchTerm ? "No symptoms found matching your search." : "No symptoms available."}
              </AlertDescription>
            </Alert>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
            {filteredSystems.map(({ system, symptoms }) => (
              <SystemCard
                key={system}
                system={system}
                symptoms={symptoms}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
