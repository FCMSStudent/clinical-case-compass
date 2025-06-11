import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Search,
  Filter,
  BookOpen,
  CheckCircle2,
  X,
  Pinch,
  Move,
  Info,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import BodySvgView from "./BodySvgView";
import { useIsMobile } from "@/hooks/use-mobile";
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

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * ENHANCED TYPES & CONSTANTS
 * ────────────────────────────────────────────────────────────────────────────────
 */
const ZOOM_MIN = 60;
const ZOOM_MAX = 200;
const ZOOM_STEP = 15;
const PINCH_ZOOM_SENSITIVITY = 0.5;
const DOUBLE_TAP_ZOOM = 150;
const DOUBLE_TAP_DELAY = 300;

export type ViewType = "anterior" | "posterior" | "lateral";
export type SeverityLevel = "low" | "medium" | "high" | "critical";

export type BodyPartId =
  | "head"
  | "neck"
  | "chest"
  | "abdomen"
  | "pelvis"
  | "leftArm"
  | "rightArm"
  | "leftLeg"
  | "rightLeg"
  | "back"
  | "spine"
  | "shoulders";

export interface SymptomData {
  name: string;
  severity: SeverityLevel;
  frequency: "rare" | "common" | "very_common";
  category: "pain" | "functional" | "sensory" | "autonomic";
}

export interface SystemData {
  name: string;
  color: string;
  priority: number;
  commonConditions: string[];
}

export interface BodyPartSelection {
  id: BodyPartId;
  name: string;
  anatomicalRegion: string;
  relatedSystems: readonly string[];
  relatedSymptoms: Record<string, SymptomData[]>;
  commonConditions: string[];
  coordinates: { x: number; y: number };
  urgencyLevel: SeverityLevel;
}

/**
 * Enhanced medical systems with visual coding
 */
export const MEDICAL_SYSTEMS: Record<string, SystemData> = {
  Neurological: {
    name: "Neurological",
    color: "#8B5CF6",
    priority: 1,
    commonConditions: ["Migraine", "Stroke", "Neuropathy", "Seizures"],
  },
  Cardiovascular: {
    name: "Cardiovascular",
    color: "#EF4444",
    priority: 1,
    commonConditions: ["Hypertension", "CAD", "Arrhythmia", "Heart Failure"],
  },
  Respiratory: {
    name: "Respiratory",
    color: "#06B6D4",
    priority: 1,
    commonConditions: ["Asthma", "COPD", "Pneumonia", "PE"],
  },
  Gastrointestinal: {
    name: "Gastrointestinal",
    color: "#F59E0B",
    priority: 2,
    commonConditions: ["GERD", "IBS", "IBD", "Appendicitis"],
  },
  Musculoskeletal: {
    name: "Musculoskeletal",
    color: "#10B981",
    priority: 2,
    commonConditions: ["Arthritis", "Fracture", "Strain", "Tendonitis"],
  },
  Urinary: {
    name: "Urinary",
    color: "#F97316",
    priority: 2,
    commonConditions: ["UTI", "Kidney Stones", "Incontinence"],
  },
} as const;

/**
 * Import the body parts data
 */
import { BODY_PARTS } from "./bodyParts.data";

export interface InteractiveBodyDiagramProps {
  onBodyPartSelected: (selection: BodyPartSelection) => void;
  onMultiplePartsSelected?: (selections: BodyPartSelection[]) => void;
  allowMultiSelect?: boolean;
  showUrgencyIndicators?: boolean;
  showSystemColors?: boolean;
  className?: string;
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * ADVANCED MEDICAL BODY DIAGRAM COMPONENT
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const InteractiveBodyDiagram: React.FC<InteractiveBodyDiagramProps> = ({
  onBodyPartSelected,
  onMultiplePartsSelected,
  allowMultiSelect = false,
  showUrgencyIndicators = true,
  showSystemColors = true,
  className,
}) => {
  // ——— STATE MANAGEMENT ————————————————————————————————————————————————————
  const [selectedParts, setSelectedParts] = useState<Set<BodyPartId>>(new Set());
  const [hoveredPart, setHoveredPart] = useState<BodyPartId | null>(null);
  const [zoom, setZoom] = useState(100);
  const [viewType, setViewType] = useState<ViewType>("anterior");
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [searchFilter, setSearchFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState<SeverityLevel | "all">(
    "all"
  );
  const [isDragging, setIsDragging] = useState(false);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [showMobileHelp, setShowMobileHelp] = useState(true);
  const [isPinching, setIsPinching] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Motion values for smooth animations
  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform motion values for smooth zoom transitions
  const transformScale = useTransform(scale, (s) => `scale(${s})`);
  const transformTranslate = useTransform(
    [x, y],
    ([latestX, latestY]) => `translate(${latestX}px, ${latestY}px)`
  );

  // ——— DERIVED STATE ———————————————————————————————————————————————————————
  const searchableParts = useMemo(() => {
    if (!searchFilter.trim()) return new Set<BodyPartId>();
    const term = searchFilter.toLowerCase();

    const matches = Object.values(BODY_PARTS).filter((p) => {
      const inName = p.name.toLowerCase().includes(term);
      const inConditions = p.commonConditions.some((c) =>
        c.toLowerCase().includes(term)
      );
      const inSymptoms = Object.values(p.relatedSymptoms).some((syms) =>
        syms.some((s) => s.name.toLowerCase().includes(term))
      );
      return inName || inConditions || inSymptoms;
    });

    return new Set(matches.map((m) => m.id));
  }, [searchFilter]);

  const severityParts = useMemo(() => {
    if (severityFilter === "all") {
      return new Set(Object.keys(BODY_PARTS) as BodyPartId[]);
    }
    return new Set(
      Object.values(BODY_PARTS)
        .filter((p) => p.urgencyLevel === severityFilter)
        .map((p) => p.id)
    );
  }, [severityFilter]);

  // ——— CALLBACKS ————————————————————————————————————————————————————————
  const handleSelect = useCallback(
    (part: BodyPartId, event?: React.MouseEvent) => {
      const data = BODY_PARTS[part];

      if (allowMultiSelect && event?.ctrlKey) {
        setSelectedParts((prev) => {
          const newSelection = new Set(prev);
          if (newSelection.has(part)) {
            newSelection.delete(part);
          } else {
            newSelection.add(part);
          }

          if (onMultiplePartsSelected) {
            const selections = Array.from(newSelection).map(
              (id) => BODY_PARTS[id]
            );
            onMultiplePartsSelected(selections);
          }

          return newSelection;
        });
      } else {
        setSelectedParts(new Set([part]));
        onBodyPartSelected(data);
      }

      // Enhanced toast with urgency level
      const urgencyIcon =
        data.urgencyLevel === "critical"
          ? "🚨"
          : data.urgencyLevel === "high"
          ? "⚠️"
          : data.urgencyLevel === "medium"
          ? "ℹ️"
          : "✓";

      toast.info(`${urgencyIcon} Selected: ${data.name}`, {
        description: `${data.anatomicalRegion} • ${data.relatedSystems.join(", ")}`,
      });
    },
    [allowMultiSelect, onBodyPartSelected, onMultiplePartsSelected]
  );

  const handleMouseEnter = useCallback(
    (part: BodyPartId, event: React.MouseEvent) => {
      setHoveredPart(part);
      if (showTooltip) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          setTooltipPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          });
        }
      }
    },
    [showTooltip]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredPart(null);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setIsPinching(true);
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const initialDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      const initialZoom = zoom;

      const handleTouchMove = (moveEvent: TouchEvent) => {
        if (moveEvent.touches.length !== 2) return;

        const touch1 = moveEvent.touches[0];
        const touch2 = moveEvent.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );

        const delta = (currentDistance - initialDistance) * PINCH_ZOOM_SENSITIVITY;
        const newZoom = Math.min(Math.max(initialZoom + delta, ZOOM_MIN), ZOOM_MAX);
        setZoom(newZoom);
        scale.set(newZoom / 100);
      };

      const handleTouchEnd = () => {
        setIsPinching(false);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    } else if (e.touches.length === 1) {
      const now = Date.now();
      const timeSinceLastTap = now - lastTapTime;
      
      if (timeSinceLastTap < DOUBLE_TAP_DELAY) {
        // Double tap detected
        setZoom((prev) => (prev === DOUBLE_TAP_ZOOM ? 100 : DOUBLE_TAP_ZOOM));
        scale.set(DOUBLE_TAP_ZOOM / 100);
      }
      
      setLastTapTime(now);
    }
  }, [zoom, lastTapTime, scale]);

  const handlePanStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (isPinching) return;
    setIsDragging(true);
    const startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const startTranslateX = x?.get?.() ?? 0;
    const startTranslateY = y?.get?.() ?? 0;

    const handlePanMove = (moveEvent: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      
      const currentX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;
      
      x.set(startTranslateX + deltaX);
      y.set(startTranslateY + deltaY);
    };

    const handlePanEnd = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handlePanMove);
      document.removeEventListener('mouseup', handlePanEnd);
      document.removeEventListener('touchmove', handlePanMove);
      document.removeEventListener('touchend', handlePanEnd);
    };

    document.addEventListener('mousemove', handlePanMove);
    document.addEventListener('mouseup', handlePanEnd);
    document.addEventListener('touchmove', handlePanMove);
    document.addEventListener('touchend', handlePanEnd);
  }, [isDragging, isPinching, x, y]);

  const handleZoomChange = useCallback((value: number[]) => {
    const newZoom = value[0];
    setZoom(newZoom);
    scale.set(newZoom / 100);
  }, [scale]);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => {
      const newZoom = Math.min(prev + ZOOM_STEP, ZOOM_MAX);
      scale.set(newZoom / 100);
      return newZoom;
    });
  }, [scale]);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - ZOOM_STEP, ZOOM_MIN);
      scale.set(newZoom / 100);
      return newZoom;
    });
  }, [scale]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, part: BodyPartId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(part);
    }
  }, [handleSelect]);

  // ——— VISUAL HELPERS ————————————————————————————————————————————————————
  const getPartColor = useCallback(
    (part: BodyPartId, isHovered: boolean, isSelected: boolean) => {
      // Dim parts that do not match search filter
      if (searchFilter && !searchableParts.has(part)) {
        return "hsl(var(--muted) / 0.2)";
      }

      // Dim parts that do not match selected severity
      if (severityFilter !== "all" && !severityParts.has(part)) {
        return "hsl(var(--muted) / 0.2)";
      }

      if (isSelected) return "hsl(var(--primary))";
      if (isHovered) return "hsl(var(--primary) / 0.3)";

      if (showSystemColors && BODY_PARTS[part].relatedSystems.length > 0) {
        const primarySystem = BODY_PARTS[part].relatedSystems[0];
        const systemData = MEDICAL_SYSTEMS[primarySystem];
        return systemData ? `${systemData.color}40` : "hsl(var(--muted))";
      }

      if (showUrgencyIndicators) {
        const urgencyColors = {
          critical: "#DC262640",
          high: "#F5970540",
          medium: "#3B82F640",
          low: "#6B728040",
        } as const;
        return urgencyColors[BODY_PARTS[part].urgencyLevel];
      }

      // Add visual feedback for touch interactions
      if (isMobile && isHovered) {
        return "hsl(var(--primary) / 0.4)";
      }

      return "hsl(var(--muted))";
    },
    [
      showSystemColors,
      showUrgencyIndicators,
      searchFilter,
      searchableParts,
      severityFilter,
      severityParts,
      isMobile,
    ]
  );

  const getStrokeColor = useCallback(
    (part: BodyPartId, isSelected: boolean) => {
      if (isSelected) return "hsl(var(--primary))";

      if (showUrgencyIndicators) {
        const urgencyColors = {
          critical: "#DC2626",
          high: "#F59705",
          medium: "#3B82F6",
          low: "#6B7280",
        } as const;
        return urgencyColors[BODY_PARTS[part].urgencyLevel];
      }

      return "hsl(var(--border))";
    },
    [showUrgencyIndicators]
  );

  // ——— RENDER HELPERS ————————————————————————————————————————————————————
  const renderBodyShape = useCallback(
    (part: BodyPartId, shape: JSX.Element) => {
      const isSelected = selectedParts.has(part);
      const isHovered = hoveredPart === part;
      const partData = BODY_PARTS[part];

      return React.cloneElement(shape, {
        key: part,
        fill: getPartColor(part, isHovered, isSelected),
        stroke: getStrokeColor(part, isSelected),
        strokeWidth: isSelected ? 3 : isHovered ? 2.5 : 2,
        className: cn(
          "cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary",
          isHovered && "drop-shadow-lg",
          isDragging && "pointer-events-none",
          shape.props.className
        ),
        onClick: (e: React.MouseEvent) => {
          if (isDragging) return;
          handleSelect(part, e);
        },
        onMouseEnter: (e: React.MouseEvent) => handleMouseEnter(part, e),
        onMouseLeave: handleMouseLeave,
        onTouchStart: handleTouchStart,
        onKeyDown: (e: React.KeyboardEvent) => handleKeyDown(e, part),
        tabIndex: 0,
        role: "button",
        "aria-label": `${partData.name} – ${partData.urgencyLevel} priority – ${partData.anatomicalRegion} region – click to select`,
        "aria-pressed": isSelected,
        "aria-describedby": `part-description-${part}`,
        style: {
          filter: isHovered
            ? "brightness(1.1)"
            : isSelected
            ? "brightness(1.05)"
            : "none",
        },
      });
    },
    [selectedParts, hoveredPart, getPartColor, getStrokeColor, handleSelect, handleMouseEnter, handleMouseLeave, handleTouchStart, handleKeyDown, isDragging]
  );

  // ——— SVG BODY SHAPES ————————————————————————————————————————————————————
  const BodySvg = useMemo(
    () => (
      <BodySvgView
        viewType={viewType}
        svgRef={svgRef}
        renderBodyShape={renderBodyShape}
      />
    ),
    [viewType, renderBodyShape]
  );

  // ——— COMPONENT UI ———————————————————————————————————————————————————————
  return (
    <div className={cn("relative w-full h-full", className)}>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl z-0"></div>
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 z-10">
        {/* Mobile Help Alert */}
        {isMobile && showMobileHelp && (
          <Alert className="mb-4 bg-primary/5 border-primary/20">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-primary">Mobile Controls</AlertTitle>
            <AlertDescription className="text-primary/80">
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Pinch to zoom in/out</li>
                <li>Double tap to zoom in/out quickly</li>
                <li>Drag to pan the diagram</li>
                <li>Tap body parts to select them</li>
              </ul>
            </AlertDescription>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => setShowMobileHelp(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        )}

        {/* Controls */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <TooltipProvider>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleZoomIn}
                    disabled={zoom >= ZOOM_MAX}
                    aria-label="Zoom in"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom in</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={handleZoomOut}
                    disabled={zoom <= ZOOM_MIN}
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom out</TooltipContent>
              </Tooltip>

              <Slider
                value={[zoom]}
                min={ZOOM_MIN}
                max={ZOOM_MAX}
                step={ZOOM_STEP}
                onValueChange={handleZoomChange}
                className="w-32"
                aria-label="Zoom level"
              />
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={toggleView}
                  aria-label={`Switch to ${viewType === "anterior" ? "posterior" : "anterior"} view`}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Switch view</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={clearSelection}
                  disabled={selectedParts.size === 0}
                  aria-label="Clear selection"
                >
                  <X className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear selection</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="relative flex items-center">
            <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search symptoms / parts"
              className="pl-8 w-48"
              aria-label="Search body parts and symptoms"
            />
          </div>

          <div className="flex items-center gap-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as SeverityLevel | "all")}
              className="border rounded-md text-sm px-2 py-1"
              aria-label="Filter by severity level"
            >
              <option value="all">All severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant={showTooltip ? "default" : "outline"}
                onClick={() => setShowTooltip((p) => !p)}
                aria-label="Toggle tooltips"
              >
                <BookOpen className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle tooltips</TooltipContent>
          </Tooltip>
        </div>

        {/* Diagram container */}
        <motion.div
          className="relative overflow-auto touch-none"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handlePanStart}
          onTouchStart={handlePanStart}
        >
          <motion.div
            style={{
              transform: `${transformTranslate} ${transformScale}`,
              transformOrigin: "center center",
            }}
            animate={{
              scale: zoom / 100,
              x: x?.get?.() ?? 0,
              y: y?.get?.() ?? 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {BodySvg}
          </motion.div>

          {/* Hidden descriptions for screen readers */}
          <div className="sr-only" aria-live="polite">
            {selectedParts.size === 0
              ? "No body parts selected"
              : `Selected: ${Array.from(selectedParts)
                  .map((id) => BODY_PARTS[id].name)
                  .join(", ")}`}
          </div>
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredPart && showTooltip && (
            <motion.div
              key={hoveredPart}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 pointer-events-none bg-popover text-popover-foreground border rounded-md shadow-lg p-2 text-sm"
              style={{
                left: tooltipPosition.x + 8,
                top: tooltipPosition.y + 8,
                maxWidth: "200px",
              }}
            >
              <div className="font-medium">{BODY_PARTS[hoveredPart].name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {BODY_PARTS[hoveredPart].anatomicalRegion}
              </div>
              <div className="text-xs text-muted-foreground">
                {BODY_PARTS[hoveredPart].relatedSystems.join(", ")}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected parts accordion */}
        <Accordion type="single" collapsible className="mt-4 w-full max-w-sm">
          <AccordionItem value="selected">
            <AccordionTrigger>
              Selected ({selectedParts.size})
            </AccordionTrigger>
            <AccordionContent>
              {selectedParts.size === 0 ? (
                <p className="text-muted-foreground text-sm">No part selected.</p>
              ) : (
                <ul className="text-sm space-y-1">
                  {Array.from(selectedParts).map((id) => {
                    const part = BODY_PARTS[id];
                    return (
                      <li
                        key={id}
                        className="flex items-start gap-1"
                        id={`part-description-${id}`}
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1" />
                        <div>
                          <span className="font-medium">{part.name}</span>
                          <div className="text-xs text-muted-foreground">
                            {part.anatomicalRegion} • {part.relatedSystems.join(", ")}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default React.memo(InteractiveBodyDiagram);
