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
  Activity,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * ENHANCED TYPES & CONSTANTS
 * ────────────────────────────────────────────────────────────────────────────────
 */
const ZOOM_MIN = 60;
const ZOOM_MAX = 200;
const ZOOM_STEP = 15;

export type ViewType = "anterior" | "posterior" | "lateral";
export type InteractionMode = "select" | "diagnose" | "annotate";
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
  mode?: InteractionMode;
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
  mode = "select",
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
  const [interactionMode, setInteractionMode] = useState<InteractionMode>(mode);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [searchFilter, setSearchFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState<SeverityLevel | "all">(
    "all"
  );

  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleZoomChange = useCallback((value: number[]) => {
    setZoom(value[0]);
  }, []);

  const toggleView = useCallback(() => {
    setViewType((prev) => {
      const views: ViewType[] = ["anterior", "posterior", "lateral"];
      const currentIndex = views.indexOf(prev);
      return views[(currentIndex + 1) % views.length];
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedParts(new Set());
    if (onMultiplePartsSelected) {
      onMultiplePartsSelected([]);
    }
  }, [onMultiplePartsSelected]);

  // ——— VISUAL HELPERS ————————————————————————————————————————————————————
  const getPartColor = useCallback(
    (part: BodyPartId, isHovered: boolean, isSelected: boolean) => {
      // Dim parts that do not match search filter
      if (searchFilter && !searchableParts.has(part)) {
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

      return "hsl(var(--muted))";
    },
    [showSystemColors, showUrgencyIndicators, searchFilter, searchableParts]
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

      return React.cloneElement(shape, {
        key: part,
        fill: getPartColor(part, isHovered, isSelected),
        stroke: getStrokeColor(part, isSelected),
        strokeWidth: isSelected ? 3 : isHovered ? 2.5 : 2,
        className: cn(
          "cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary",
          isHovered && "drop-shadow-lg",
          shape.props.className
        ),
        onClick: (e: React.MouseEvent) => handleSelect(part, e),
        onMouseEnter: (e: React.MouseEvent) => handleMouseEnter(part, e),
        onMouseLeave: handleMouseLeave,
        tabIndex: 0,
        role: "button",
        "aria-label": `${BODY_PARTS[part].name} – ${BODY_PARTS[part].urgencyLevel} priority – click to select`,
        "aria-pressed": isSelected,
        style: {
          filter: isHovered
            ? "brightness(1.1)"
            : isSelected
            ? "brightness(1.05)"
            : "none",
        },
      });
    },
    [selectedParts, hoveredPart, getPartColor, getStrokeColor, handleSelect, handleMouseEnter, handleMouseLeave]
  );

  // ——— SVG BODY SHAPES ————————————————————————————————————————————————————
  const BodySvg = useMemo(() => {
    const AnimatedSVG = motion.svg;

    return (
      <AnimatedSVG
        ref={svgRef}
        key={viewType}
        initial={{ opacity: 0, rotateY: viewType === "posterior" ? 180 : 0 }}
        animate={{ opacity: 1, rotateY: 0 }}
        exit={{ opacity: 0, rotateY: viewType === "anterior" ? -180 : 180 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {viewType === "anterior" ? (
          <>
            {/* ----- ANTERIOR VIEW ----- */}
            {renderBodyShape("head", <ellipse cx={140} cy={60} rx={45} ry={50} />)}
            {renderBodyShape("neck", <rect x={125} y={105} width={30} height={25} rx={15} />)}
            {renderBodyShape("shoulders", <ellipse cx={140} cy={140} rx={80} ry={20} />)}
            {renderBodyShape(
              "chest",
              <path d="M85 130 L195 130 L190 220 L165 250 L115 250 L90 220 Z" />
            )}
            {renderBodyShape(
              "abdomen",
              <path d="M115 250 L165 250 L160 320 L120 320 Z" />
            )}
            {renderBodyShape(
              "pelvis",
              <path d="M120 320 L160 320 L170 370 L110 370 Z" />
            )}
            {renderBodyShape(
              "leftArm",
              <path d="M85 140 L60 145 L45 200 L50 280 L70 285 L85 220" />
            )}
            {renderBodyShape(
              "rightArm",
              <path d="M195 140 L220 145 L235 200 L230 280 L210 285 L195 220" />
            )}
            {renderBodyShape(
              "leftLeg",
              <path d="M120 370 L110 370 L100 485 L130 485 L135 370" />
            )}
            {renderBodyShape(
              "rightLeg",
              <path d="M145 370 L145 485 L175 485 L170 370 Z" />
            )}
          </>
        ) : viewType === "posterior" ? (
          <>
            {/* ----- POSTERIOR VIEW ----- */}
            {renderBodyShape("head", <ellipse cx={140} cy={60} rx={45} ry={50} />)}
            {renderBodyShape("neck", <rect x={125} y={105} width={30} height={25} rx={15} />)}
            {renderBodyShape(
              "back",
              <path d="M85 130 L195 130 L190 320 L90 320 Z" />
            )}
            {renderBodyShape("spine", <rect x={135} y={130} width={10} height={190} rx={5} />)}
            {renderBodyShape(
              "pelvis",
              <path d="M90 320 L190 320 L170 370 L110 370 Z" />
            )}
            {renderBodyShape(
              "leftArm",
              <path d="M85 140 L60 145 L45 200 L50 280 L70 285 L85 220" />
            )}
            {renderBodyShape(
              "rightArm",
              <path d="M195 140 L220 145 L235 200 L230 280 L210 285 L195 220" />
            )}
            {renderBodyShape(
              "leftLeg",
              <path d="M120 370 L110 370 L100 485 L130 485 L135 370" />
            )}
            {renderBodyShape(
              "rightLeg",
              <path d="M145 370 L145 485 L175 485 L170 370 Z" />
            )}
          </>
        ) : (
          <>
            {/* ----- LATERAL VIEW (simplified silhouette) ----- */}
            {renderBodyShape("head", <ellipse cx={140} cy={60} rx={35} ry={50} />)}
            {renderBodyShape("neck", <rect x={135} y={105} width={20} height={25} rx={10} />)}
            {renderBodyShape(
              "shoulders",
              <path d="M140 130 L200 150 L140 150 Z" />
            )}
            {renderBodyShape(
              "chest",
              <path d="M140 150 L190 170 L180 240 L140 240 Z" />
            )}
            {renderBodyShape(
              "abdomen",
              <path d="M140 240 L180 240 L175 300 L140 300 Z" />
            )}
            {renderBodyShape(
              "pelvis",
              <path d="M140 300 L175 300 L180 350 L140 350 Z" />
            )}
            {renderBodyShape(
              "rightArm",
              <path d="M190 170 L215 175 L225 230 L220 285 L200 290 L190 240" />
            )}
            {renderBodyShape(
              "rightLeg",
              <path d="M140 350 L165 355 L175 485 L145 485 Z" />
            )}
          </>
        )}
      </AnimatedSVG>
    );
  }, [viewType, renderBodyShape]);

  // ——— COMPONENT UI ———————————————————————————————————————————————————————
  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col items-center", className)}
    >
      {/* Controls */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          aria-label="Zoom in"
          onClick={() => setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX))}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          aria-label="Zoom out"
          onClick={() => setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN))}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Slider
          value={[zoom]}
          min={ZOOM_MIN}
          max={ZOOM_MAX}
          step={ZOOM_STEP}
          onValueChange={handleZoomChange}
          className="w-32"
        />
        <Button
          size="icon"
          variant="outline"
          aria-label="Toggle view"
          onClick={toggleView}
        >
          <RotateCw className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          aria-label="Clear selection"
          onClick={clearSelection}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="relative flex items-center">
          <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search symptoms / parts"
            className="pl-8 w-48"
          />
        </div>
        <div className="flex items-center gap-1">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={severityFilter}
            onChange={(e) =>
              setSeverityFilter(e.target.value as SeverityLevel | "all")
            }
            className="border rounded-md text-sm px-2 py-1"
          >
            <option value="all">All severities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <Button
          size="icon"
          variant={showTooltip ? "default" : "outline"}
          aria-label="Toggle tooltip"
          onClick={() => setShowTooltip((p) => !p)}
        >
          <BookOpen className="h-4 w-4" />
        </Button>
      </div>

      {/* Diagram container */}
      <div className="overflow-auto">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
          }}
        >
          {BodySvg}
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredPart && showTooltip && (
          <motion.div
            key={hoveredPart}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 pointer-events-none bg-popover text-popover-foreground border rounded-md shadow-lg px-2 py-1 text-xs"
            style={{ left: tooltipPosition.x + 8, top: tooltipPosition.y + 8 }}
          >
            <span className="font-medium">
              {BODY_PARTS[hoveredPart].name}
            </span>
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
                {Array.from(selectedParts).map((id) => (
                  <li key={id} className="flex items-start gap-1">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-1" />
                    <span>{BODY_PARTS[id].name}</span>
                  </li>
                ))}
              </ul>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default React.memo(InteractiveBodyDiagram);
