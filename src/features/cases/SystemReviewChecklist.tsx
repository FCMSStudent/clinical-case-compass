// -----------------------------------------------------------------------------
// System Review Checklist – Liquid Glass Edition
// -----------------------------------------------------------------------------
// 1. Uses design-system primitives (Card, Checkbox, Input, Badge, Button, …).
// 2. System cards render as <Card variant="glass-elevated"> for deep frosted
//    panels that match the new glassmorphic design language.
// 3. Motion powered by framer-motion helpers (fade-in + scale on mount).
// 4. Type-safe props allow initial values, highlights, recent chips, etc.
// -----------------------------------------------------------------------------

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";

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
  Thermometer,
} from "lucide-react";

import { systemSymptoms } from "./systemSymptoms"; // ← your data source
import { cn } from "@/lib/utils";

// -----------------------------------------------------------------------------
// Props ------------------------------------------------------------------------
export interface SystemReviewChecklistProps {
  onSystemSymptomsChange?: (systems: Record<string, string[]>) => void;
  initialSystemSymptoms?: Record<string, string[]>;
  highlightedSymptoms?: Record<string, string[]>;
  recentSymptoms?: string[];
}

// -----------------------------------------------------------------------------
// Icons ------------------------------------------------------------------------
const systemIcons: Record<string, React.ReactNode> = {
  Cardiovascular: <Heart className="h-4 w-4" />,
  Respiratory: <Activity className="h-4 w-4" />,
  Neurological: <Brain className="h-4 w-4" />,
  Gastrointestinal: <Thermometer className="h-4 w-4" />,
  Genitourinary: <Droplet className="h-4 w-4" />,
  Musculoskeletal: <Shield className="h-4 w-4" />,
  Dermatological: <Eye className="h-4 w-4" />,
  HEENT: <Ear className="h-4 w-4" />,
  Endocrine: <Zap className="h-4 w-4" />,
};

// -----------------------------------------------------------------------------
// Component --------------------------------------------------------------------
export const SystemReviewChecklist: React.FC<SystemReviewChecklistProps> = ({
  onSystemSymptomsChange,
  initialSystemSymptoms = {},
  highlightedSymptoms = {},
  recentSymptoms = [],
}) => {
  const [selectedSymptoms, setSelected] = useState<Record<string, string[]>>(
    initialSystemSymptoms,
  );
  const [search, setSearch] = useState("");

  // Keep local state in sync if parent changes base values -------------------
  useEffect(() => setSelected(initialSystemSymptoms), [initialSystemSymptoms]);

  // -------------------------------------------------------------------------
  // Helpers
  // -------------------------------------------------------------------------
  const mutate = (next: Record<string, string[]>) => {
    setSelected(next);
    onSystemSymptomsChange?.(next);
  };

  const handleToggle = (system: string, symptom: string, checked: boolean) => {
    const next = { ...selectedSymptoms };
    if (!next[system]) next[system] = [];
    if (checked) {
      if (!next[system].includes(symptom)) next[system].push(symptom);
    } else {
      next[system] = next[system].filter((s) => s !== symptom);
      if (!next[system].length) delete next[system];
    }
    mutate({ ...next });
  };

  const handleSelectAll = (system: string) => {
    const all = systemSymptoms.find((s) => s.system === system)?.symptoms ?? [];
    mutate({ ...selectedSymptoms, [system]: [...all] });
  };

  const handleClear = (system: string) => {
    const next = { ...selectedSymptoms };
    delete next[system];
    mutate(next);
  };

  // -------------------------------------------------------------------------
  // Derived state
  // -------------------------------------------------------------------------
  const filteredSystems = useMemo(() => {
    if (!search.trim()) return systemSymptoms;
    const q = search.toLowerCase();
    return systemSymptoms
      .map((s) => ({
        system: s.system,
        symptoms: s.symptoms.filter((sym) => sym.toLowerCase().includes(q)),
      }))
      .filter((s) => s.symptoms.length);
  }, [search]);

  const totalSelected = useMemo(
    () => Object.values(selectedSymptoms).reduce((acc, v) => acc + v.length, 0),
    [selectedSymptoms],
  );

  // -------------------------------------------------------------------------
  // Render helpers
  // -------------------------------------------------------------------------
  const SymptomItem: React.FC<{ system: string; symptom: string }> = ({
    system,
    symptom,
  }) => {
    const isSelected = selectedSymptoms[system]?.includes(symptom);
    const isHighlighted = highlightedSymptoms[system]?.includes(symptom);
    const isRecent = recentSymptoms.includes(symptom);

    return (
      <div
        className={cn(
          "flex items-center space-x-2 rounded-md p-2 transition-colors hover:bg-white/10",
          isHighlighted && "bg-blue-500/20 ring-1 ring-blue-400/30",
          isSelected && "bg-white/20",
        )}
      >
        <Checkbox
          id={`${system}-${symptom}`}
          checked={isSelected}
          onCheckedChange={(c) => handleToggle(system, symptom, c as boolean)}
          className={cn(
            "border-white/30 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500",
            isHighlighted && "border-blue-400/50",
          )}
        />
        <Label
          htmlFor={`${system}-${symptom}`}
          className={cn(
            "flex-1 cursor-pointer text-xs text-white/80",
            isHighlighted && "font-medium text-blue-200",
            isSelected && "font-semibold text-white",
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
              <TooltipContent className="glass-subtle border-white/20 text-white">
                Recently used
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  };

  const SystemCard: React.FC<{ system: string; symptoms: string[] }> = ({
    system,
    symptoms,
  }) => {
    const selectedCount = selectedSymptoms[system]?.length ?? 0;
    const icon = systemIcons[system] ?? <Shield className="h-4 w-4" />;

    // Heuristic span rules for responsive grids -----------------------------
    const span = (() => {
      if (["Cardiovascular", "Respiratory"].includes(system)) return "lg:col-span-2";
      if (system === "Neurological") return "md:col-span-2";
      if (symptoms.length > 10) return "md:col-span-2";
      return "";
    })();

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={cn(span)}
      >
        <Card variant="glass-elevated" className="h-full">
          <CardHeader className="mb-3 flex items-center justify-between p-0">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/20 text-white">
                {icon}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">{system}</span>
                {selectedCount > 0 && (
                  <Badge variant="outline" className="border-blue-400/30 bg-blue-500/20 text-white text-xs">
                    {selectedCount}/{symptoms.length}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 border-white/30 bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                onClick={() => handleSelectAll(system)}
              >
                <Check className="h-3 w-3" />
              </Button>
              {selectedCount > 0 && (
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 border-white/30 bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                  onClick={() => handleClear(system)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="max-h-40 overflow-y-auto scrollbar-thin scrollbar-track-white/10 scrollbar-thumb-white/30">
            {symptoms.map((s) => (
              <SymptomItem key={s} system={system} symptom={s} />
            ))}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  // -------------------------------------------------------------------------
  // JSX ----------------------------------------------------------------------
  return (
    <div className="space-y-4">
      {/* Search + Total ------------------------------------------------------ */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
          <Input
            placeholder="Search symptoms…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/10 pl-9 text-white placeholder:text-white/60 focus:bg-white/15"
          />
        </div>
        {totalSelected > 0 && (
          <Badge variant="outline" className="self-start border-blue-400/30 bg-blue-500/20 text-white sm:self-center">
            {totalSelected} selected
          </Badge>
        )}
      </div>

      {/* Grid ---------------------------------------------------------------- */}
      <AnimatePresence mode="wait">
        {filteredSystems.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Alert variant="default" className="glass-subtle border-white/20">
              <AlertCircle className="h-5 w-5 text-white/80" />
              <AlertDescription className="ml-2 text-white">
                {search ? "No symptoms found matching your search." : "No symptoms available."}
              </AlertDescription>
            </Alert>
          </motion.div>
        ) : (
          <div
            key="list"
            className="grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredSystems.map(({ system, symptoms }) => (
              <SystemCard key={system} system={system} symptoms={symptoms} />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};