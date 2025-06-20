import React, { useState, useCallback, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Switch } from "@/shared/components/switch";
import { Label } from "@/shared/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/select";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/shared/components/tooltip";
import { Button } from "@/shared/components/button";
import { Info, RotateCcw } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { 
  BODY_PARTS as bodyPartsData, 
  type BodyPartDefinition, 
  type SeverityLevel 
} from "./bodyParts.data";
import BodySvgView from "./BodySvgView";

export type ViewType = "anterior" | "posterior" | "lateral";
export type SeverityFilter = "all" | SeverityLevel;

export type BodyPartId = keyof typeof bodyPartsData;

export interface BodyPartSelection extends BodyPartDefinition {
  view: ViewType;
}

interface InteractiveBodyDiagramProps {
  onBodyPartSelected?: (selection: BodyPartSelection) => void;
  initialSelectedParts?: BodyPartSelection[];
  className?: string;
}

export const InteractiveBodyDiagram: React.FC<InteractiveBodyDiagramProps> = ({
  onBodyPartSelected,
  initialSelectedParts = [],
  className,
}) => {
  const [view, setView] = useState<ViewType>("anterior");
  const [selectedParts, setSelectedParts] = useState<BodyPartSelection[]>(initialSelectedParts);
  const [hoveredPart, setHoveredPart] = useState<BodyPartId | null>(null);
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("all");
  const svgRef = useRef<SVGSVGElement>(null);

  const handlePartClick = useCallback(
    (partId: BodyPartId) => {
      const partData = bodyPartsData[partId];

      if (!partData) {
        console.warn(`Data not found for partId: ${partId}`);
        return;
      }

      const selection: BodyPartSelection = { ...partData, view };
      
      const existingIndex = selectedParts.findIndex(p => p.id === partId && p.view === view);

      let newSelectedParts;
      if (existingIndex > -1) {
        newSelectedParts = selectedParts.filter((_, index) => index !== existingIndex);
      } else {
        newSelectedParts = [...selectedParts, selection];
      }
      setSelectedParts(newSelectedParts);
      if (onBodyPartSelected) {
        onBodyPartSelected(existingIndex > -1 ? selection : newSelectedParts[newSelectedParts.length-1]);
      }
    },
    [selectedParts, view, onBodyPartSelected]
  );
  
  const getPartFill = useCallback((partId: BodyPartId, partDataFromDiagram: BodyPartDefinition) => {
    const isSelected = selectedParts.some(p => p.id === partId);
    const isHovered = hoveredPart === partId;

    if (severityFilter !== "all" && partDataFromDiagram.priority !== severityFilter) {
      return "hsl(var(--muted) / 0.2)";
    }
    
    if (isSelected) return "hsl(var(--primary))";
    if (isHovered) return "hsl(var(--primary) / 0.5)";

    switch(partDataFromDiagram.priority) {
        case "critical": return "hsl(0 72% 51% / 0.7)";
        case "high": return "hsl(39 100% 50% / 0.7)";
        case "medium": return "hsl(48 95% 52% / 0.7)";
        case "low": return "hsl(142 71% 45% / 0.7)";
        default: return "hsl(var(--muted-foreground) / 0.3)";
    }
  }, [selectedParts, hoveredPart, severityFilter]);

  const renderBodyShape = useCallback(
    (partId: BodyPartId, shape: JSX.Element): React.ReactNode => {
      const partData = bodyPartsData[partId];

      if (!partData) {
        console.warn(`No data for partId: ${partId} in view: ${view}`);
        return React.cloneElement(shape, {
          fill: "hsl(var(--muted-foreground) / 0.1)",
          stroke: "hsl(var(--border) / 0.5)",
          strokeWidth: 1,
        });
      }
      
      const fill = getPartFill(partId, partData);
      const isFilteredOut = severityFilter !== "all" && partData.priority !== severityFilter;

      const interactiveProps = isFilteredOut ? {} : {
        onClick: () => handlePartClick(partId),
        onMouseEnter: () => setHoveredPart(partId),
        onMouseLeave: () => setHoveredPart(null),
        style: { cursor: "pointer", transition: "fill 0.2s ease-out" },
        "aria-label": `${partData.name} – ${partData.priority} priority`,
        role: "button",
        tabIndex: 0,
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handlePartClick(partId);
          }
        },
      };
      
      const pathElement = React.cloneElement(shape, {
        fill: fill,
        stroke: "hsl(var(--border) / 0.5)",
        strokeWidth: 1,
        "data-part-id": String(partId),
        ...interactiveProps,
      });

      if (isFilteredOut || !partData.name) {
        return pathElement;
      }

      return (
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>{pathElement}</TooltipTrigger>
          <TooltipContent side="top" className="bg-background/80 backdrop-blur-md text-foreground border-border shadow-lg rounded-md px-3 py-1.5 text-xs">
            <p className="font-semibold">{partData.name}</p>
            <p className="capitalize text-muted-foreground">{partData.priority} Priority</p>
          </TooltipContent>
        </Tooltip>
      );
    },
    [handlePartClick, getPartFill, setHoveredPart, view, severityFilter]
  );

  return (
    <div className={cn("p-4 bg-background/30 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl space-y-4", className)}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-3">
          <Label htmlFor="view-switch" className="text-sm font-medium text-white/90">
            {view.charAt(0).toUpperCase() + view.slice(1)} View
          </Label>
          <Switch
            id="view-switch"
            checked={view === "posterior"}
            onCheckedChange={(checked) => {
              if (view === "anterior") setView("posterior");
              else if (view === "posterior") setView("lateral");
              else setView("anterior");
            }}
            aria-label={`Switch to ${view === "anterior" ? "posterior" : view === "posterior" ? "lateral" : "anterior"} view`}
            className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-600"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-white/70 hover:text-white hover:bg-white/10"
                onClick={() => {
                  if (view === "anterior") setView("posterior");
                  else if (view === "posterior") setView("lateral");
                  else setView("anterior");
                }}
                aria-label="Cycle body view"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Cycle View (Anterior, Posterior, Lateral)</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="severity-filter" className="text-sm font-medium text-white/90">Filter:</Label>
          <Select value={severityFilter} onValueChange={(value) => setSeverityFilter(value as SeverityFilter)}>
            <SelectTrigger id="severity-filter" className="w-[130px] h-9 text-xs bg-white/10 border-white/20 text-white focus:ring-blue-500">
              <SelectValue placeholder="Filter severity" />
            </SelectTrigger>
            <SelectContent className="bg-background/80 backdrop-blur-md border-white/20 text-white">
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative aspect-[280/500] w-full max-w-[280px] mx-auto overflow-hidden">
        <AnimatePresence mode="wait">
          <BodySvgView
            svgRef={svgRef}
            key={view}
            viewType={view}
            renderBodyShape={renderBodyShape}
          />
        </AnimatePresence>
      </div>
      
      {selectedParts.length > 0 && (
        <div className="pt-3 border-t border-white/10">
          <h4 className="text-xs font-semibold text-white/80 mb-1.5">Selected Areas:</h4>
          <div className="flex flex-wrap gap-1.5">
            {selectedParts.map((part) => (
              <motion.div
                key={`${part.id}-${part.view}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-blue-500/20 text-blue-100 text-[11px] px-2 py-0.5 rounded-full border border-blue-400/30"
              >
                {part.name} <span className="text-blue-300/70 text-[10px]">({part.view.substring(0,3)})</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
