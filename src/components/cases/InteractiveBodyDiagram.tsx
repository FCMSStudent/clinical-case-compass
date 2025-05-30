import React, {
  useCallback,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * TYPES & CONSTANTS
 * ────────────────────────────────────────────────────────────────────────────────
 */
const ZOOM_MIN = 80;
const ZOOM_MAX = 150;
const ZOOM_STEP = 10;

export type ViewType = "anterior" | "posterior";

export interface BodyPartSelection {
  id: BodyPart;
  name: string;
  relatedSystems: readonly string[];
  relatedSymptoms: Record<string, readonly string[]>;
}

/**
 * Body parts meta-data. Declared with `as const` so we can infer literal types.
 */
export const BODY_PARTS = {
  head: {
    id: "head",
    name: "Head",
    relatedSystems: ["Neurological"],
    relatedSymptoms: {
      Neurological: [
        "Headache",
        "Dizziness",
        "Vision changes",
        "Memory problems",
        "Confusion",
        "Seizures",
      ],
    },
  },
  chest: {
    id: "chest",
    name: "Chest",
    relatedSystems: ["Cardiovascular", "Respiratory"],
    relatedSymptoms: {
      Cardiovascular: [
        "Chest pain",
        "Palpitations",
        "Irregular heartbeat",
      ],
      Respiratory: [
        "Cough",
        "Dyspnea",
        "Wheezing",
        "Chest tightness",
      ],
    },
  },
  abdomen: {
    id: "abdomen",
    name: "Abdomen",
    relatedSystems: ["Gastrointestinal"],
    relatedSymptoms: {
      Gastrointestinal: [
        "Abdominal pain",
        "Nausea",
        "Vomiting",
        "Diarrhea",
        "Constipation",
        "Bloating",
        "Loss of appetite",
      ],
    },
  },
  pelvis: {
    id: "pelvis",
    name: "Pelvis",
    relatedSystems: ["Urinary", "Gastrointestinal"],
    relatedSymptoms: {
      Urinary: [
        "Dysuria",
        "Frequency",
        "Urgency",
        "Hematuria",
        "Incontinence",
      ],
      Gastrointestinal: ["Lower abdominal pain", "Pelvic pressure"],
    },
  },
  leftArm: {
    id: "leftArm",
    name: "Left Arm",
    relatedSystems: ["Musculoskeletal", "Cardiovascular"],
    relatedSymptoms: {
      Musculoskeletal: [
        "Joint pain",
        "Muscle pain",
        "Weakness",
        "Stiffness",
      ],
      Cardiovascular: ["Radiating chest pain", "Claudication"],
    },
  },
  rightArm: {
    id: "rightArm",
    name: "Right Arm",
    relatedSystems: ["Musculoskeletal"],
    relatedSymptoms: {
      Musculoskeletal: [
        "Joint pain",
        "Muscle pain",
        "Weakness",
        "Stiffness",
        "Limited range of motion",
      ],
    },
  },
  leftLeg: {
    id: "leftLeg",
    name: "Left Leg",
    relatedSystems: ["Musculoskeletal"],
    relatedSymptoms: {
      Musculoskeletal: [
        "Joint pain",
        "Muscle pain",
        "Weakness",
        "Limited range of motion",
        "Swelling",
        "Cramps",
      ],
    },
  },
  rightLeg: {
    id: "rightLeg",
    name: "Right Leg",
    relatedSystems: ["Musculoskeletal"],
    relatedSymptoms: {
      Musculoskeletal: [
        "Joint pain",
        "Muscle pain",
        "Weakness",
        "Limited range of motion",
        "Swelling",
        "Cramps",
      ],
    },
  },
  back: {
    id: "back",
    name: "Back",
    relatedSystems: ["Musculoskeletal"],
    relatedSymptoms: {
      Musculoskeletal: [
        "Back pain",
        "Stiffness",
        "Limited range of motion",
        "Muscle spasms",
        "Radiating pain",
      ],
    },
  },
} as const satisfies Record<string, BodyPartSelection>;

export type BodyPart = keyof typeof BODY_PARTS;

export interface InteractiveBodyDiagramProps {
  /**
   * Fired whenever the user selects a body part.
   */
  onBodyPartSelected: (selection: BodyPartSelection) => void;
  /**
   * Extra class names for the outer wrapper.
   */
  className?: string;
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * COMPONENT
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const InteractiveBodyDiagram: React.FC<InteractiveBodyDiagramProps> = (
  { onBodyPartSelected, className },
) => {
  // ——— STATE ————————————————————————————————————————————————————————
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [zoom, setZoom] = useState(100);
  const [viewType, setViewType] = useState<ViewType>("anterior");

  // ——— CALLBACKS ————————————————————————————————————————————————————
  const handleSelect = useCallback(
    (part: BodyPart) => {
      const data = BODY_PARTS[part];
      setSelectedPart(part);
      onBodyPartSelected(data);
      toast.info(`Selected: ${data.name}`);
    },
    [onBodyPartSelected],
  );

  const handleZoomChange = useCallback((value: number[]) => {
    setZoom(value[0]);
  }, []);

  const toggleView = useCallback(() => {
    setViewType((prev) => (prev === "anterior" ? "posterior" : "anterior"));
  }, []);

  // Utility hot-keys (Enter/Space) handler shared between shapes.
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, part: BodyPart) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelect(part);
      }
    },
    [handleSelect],
  );

  // ——— MEMOIZED DERIVATIONS ———————————————————————————————————————
  const selectedData = selectedPart ? BODY_PARTS[selectedPart] : null;

  // ——— INTERNAL RENDER UTILS ——————————————————————————————————————
  const renderBodyShape = useCallback(
    (part: BodyPart, shape: JSX.Element) => {
      const isActive = part === selectedPart;
      return React.cloneElement(shape, {
        key: part,
        fill: isActive ? "hsl(var(--primary))" : "hsl(var(--muted))",
        className: cn(
          "cursor-pointer transition-colors hover:fill-primary/20 focus:outline-none focus:ring-2 focus:ring-primary",
          shape.props.className,
        ),
        onClick: () => handleSelect(part),
        onKeyDown: (e: React.KeyboardEvent<SVGElement>) => handleKeyDown(e, part),
        tabIndex: 0,
        role: "button",
        "aria-label": `${BODY_PARTS[part].name} – click to select and view related symptoms`,
      });
    },
    [handleKeyDown, handleSelect, selectedPart],
  );

  const BodySvg = useMemo(() => {
    // A helper to shorten stroke props.
    const strokeProps = {
      stroke: "hsl(var(--border))",
      strokeWidth: 2,
    } as const;

    return (
      <motion.svg
        key={viewType}
        initial={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: -10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        width={240}
        height={460}
        viewBox="0 0 240 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {viewType === "anterior" ? (
          <>
            {renderBodyShape(
              "head",
              <circle cx={120} cy={50} r={40} {...strokeProps} />,
            )}
            {renderBodyShape(
              "chest",
              <path d="M80 90 L160 90 L170 200 L150 240 L90 240 L70 200 Z" {...strokeProps} />,
            )}
            {renderBodyShape(
              "abdomen",
              <path d="M90 240 L150 240 L155 300 L85 300 Z" {...strokeProps} />,
            )}
            {renderBodyShape(
              "pelvis",
              <path d="M85 300 L155 300 L165 340 L75 340 Z" {...strokeProps} />,
            )}
            {renderBodyShape(
              "leftArm",
              <path d="M70 100 L50 100 L40 180 L50 250 L70 250" {...strokeProps} />,
            )}
            {renderBodyShape(
              "rightArm",
              <path d="M170 100 L190 100 L200 180 L190 250 L170 250" {...strokeProps} />,
            )}
            {renderBodyShape(
              "leftLeg",
              <path d="M85 340 L75 340 L65 450 L105 450 L105 340" {...strokeProps} />,
            )}
            {renderBodyShape(
              "rightLeg",
              <path d="M135 340 L135 450 L175 450 L165 340 Z" {...strokeProps} />,
            )}
          </>
        ) : (
          <>
            {renderBodyShape(
              "head",
              <circle cx={120} cy={50} r={40} {...strokeProps} />,
            )}
            {renderBodyShape(
              "back",
              <path d="M80 90 L160 90 L170 240 L70 240 Z" {...strokeProps} />,
            )}
            {renderBodyShape(
              "pelvis",
              <path d="M70 240 L170 240 L165 300 L75 300 Z" {...strokeProps} />,
            )}
            {renderBodyShape(
              "leftArm",
              <path d="M70 100 L50 100 L40 180 L50 250 L70 250" {...strokeProps} />,
            )}
            {renderBodyShape(
              "rightArm",
              <path d="M170 100 L190 100 L200 180 L190 250 L170 250" {...strokeProps} />,
            )}
            {renderBodyShape(
              "leftLeg",
              <path d="M85 300 L75 300 L65 450 L105 450 L105 300" {...strokeProps} />,
            )}
            {renderBodyShape(
              "rightLeg",
              <path d="M135 300 L135 450 L175 450 L165 300 Z" {...strokeProps} />,
            )}
          </>
        )}
      </motion.svg>
    );
  }, [renderBodyShape, viewType]);

  // ——— RENDER ————————————————————————————————————————————————————————
  return (
    <div className={cn("relative rounded-2xl border bg-card p-6", className)}>
      {/* — Controls — */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Interactive Body Diagram</h3>
        <div className="flex items-center gap-2">
          {/* Zoom – / slider / + */}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            aria-label="Zoom out"
            onClick={() => setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN))}
            disabled={zoom <= ZOOM_MIN}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <div className="w-24">
            <Slider
              value={[zoom]}
              min={ZOOM_MIN}
              max={ZOOM_MAX}
              step={1}
              onValueChange={handleZoomChange}
              aria-label="Zoom level"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            aria-label="Zoom in"
            onClick={() => setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX))}
            disabled={zoom >= ZOOM_MAX}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          {/* Front / Back toggle */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2"
            aria-label={`Switch to ${viewType === "anterior" ? "back" : "front"} view`}
            onClick={toggleView}
          >
            <RotateCw className="mr-1 h-4 w-4" />
            {viewType === "anterior" ? "Front" : "Back"}
          </Button>
        </div>
      </div>

      {/* — Body SVG — */}
      <div className="flex justify-center" style={{ perspective: 1000 }}>
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "center center",
          }}
        >
          {BodySvg}
        </div>
      </div>

      {/* — Info panel — */}
      {selectedData && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.25 }}
          className="mt-6 rounded-lg bg-muted/50 p-4"
        >
          <p className="mb-1 text-base font-medium">
            {selectedData.name} Selected
          </p>
          <p className="mb-3 text-sm text-muted-foreground">
            Related systems: {selectedData.relatedSystems.join(", ")}
          </p>

          <Accordion type="single" collapsible>
            <AccordionItem value="symptoms">
              <AccordionTrigger className="text-sm font-medium">
                Related Symptoms
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {Object.entries(selectedData.relatedSymptoms).map(
                    ([system, symptoms]) => (
                      <div key={system} className="space-y-2">
                        <h4 className="text-sm font-semibold">{system}</h4>
                        <div className="grid grid-cols-2 gap-1">
                          {symptoms.map((symptom) => (
                            <span
                              key={symptom}
                              className="rounded border bg-background px-2 py-1 text-xs text-muted-foreground"
                            >
                              {symptom}
                            </span>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      )}
    </div>
  );
};

InteractiveBodyDiagram.displayName = "InteractiveBodyDiagram";
