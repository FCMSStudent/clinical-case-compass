import React, { memo } from "react";
import {
  useFormContext,
  FieldValues,
  Path,
  useFieldArray,
  ArrayPath,
  useWatch,
  FieldArrayWithId,
} from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Trash2, 
  PlusCircle, 
  Lightbulb, 
  BookOpen, 
  Link2, 
  FileText as FileTextIcon, 
  AlertCircle,
  CheckCircle,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useFormValidation } from "@/hooks/use-form-validation";
import { 
  learningPointsStepSchema, 
  LearningPointsFormData, 
  ResourceLink 
} from "./schemas/learning-points-schema";
import { StepHeader, StatusFieldCard } from "./components";

// Create a type for the field array
type ResourceLinksFieldArray = FieldArrayWithId<LearningPointsFormData, "resourceLinks", "id">;

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * PROPS
 * ────────────────────────────────────────────────────────────────────────────────
 */
export interface LearningPointsStepProps<T extends LearningPointsFormData = LearningPointsFormData> {
  className?: string;
  /** Optional limit for resource links. */
  maxLinks?: number;
}

/**
 * Enhanced resource link card with better validation and animations
 */
const ResourceLinkItem = memo(({ 
  index, 
  onRemove,
  control, // Pass control for FormField
  formState // Pass formState for errors
}: { 
  index: number; 
  onRemove: () => void;
  control: any; // Control from useFormContext
  formState: any; // formState from useFormContext
}) => {
  const urlError = formState.errors?.resourceLinks?.[index]?.url;
  const descriptionError = formState.errors?.resourceLinks?.[index]?.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="p-4 border border-white/10 rounded-lg space-y-4" // Simplified container
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-4">
          <FormField
            control={control}
            name={`resourceLinks.${index}.url` as Path<FieldValues>}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-white">
                  <Link2 className="h-4 w-4 text-blue-400" />
                  Resource URL
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild><Info className="h-4 w-4 text-white/60 hover:text-white" /></TooltipTrigger>
                      <TooltipContent><p>Enter a valid URL.</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/resource"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`resourceLinks.${index}.description` as Path<FieldValues>}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-white">
                  Description <span className="text-sm text-white/70">(Optional)</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild><Info className="h-4 w-4 text-white/60 hover:text-white" /></TooltipTrigger>
                      <TooltipContent><p>Briefly describe the resource.</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Brief description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onRemove}
                className="h-8 w-8 text-white/70 hover:text-red-400 hover:bg-white/5"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent><p>Remove resource</p></TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
});
ResourceLinkItem.displayName = "ResourceLinkItem";

/**
 * Type-safe wrapper for the field array append function.
 */
function appendResourceLinkSafely<T extends LearningPointsFormData>(
  append: ReturnType<typeof useFieldArray<T>>["append"]
) {
  return () => {
    const newLink: ResourceLink = { url: "", description: "" };
    (append as any)(newLink);
  };
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * COMPONENT
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const LearningPointsStep = memo(function LearningPointsStep<
  T extends LearningPointsFormData = LearningPointsFormData,
>({ className, maxLinks = 5 }: LearningPointsStepProps<T>) {
  const { control, formState } = useFormContext<T>();
  
  const { fields, append, remove } = useFieldArray<T>({
    control,
    name: "resourceLinks" as ArrayPath<T>,
  });

  const { errors: validationErrors, watchedFields } = useFormValidation<T>({
    requiredFields: ["learningPoints"],
    watchFields: ["learningPoints", "generalNotes", "resourceLinks"],
  });
  
  const learningPointsValue = (watchedFields as any)?.learningPoints;
  const generalNotesValue = (watchedFields as any)?.generalNotes;
  // resourceLinks value is handled by `fields` from useFieldArray for rendering

  const handleAppendResourceLink = React.useMemo(
    () => appendResourceLinkSafely<T>(append),
    [append]
  );

  const canAddMoreLinks = fields.length < maxLinks;

  return (
    <section className={cn("space-y-6", className)}> {/* Reduced space-y from 8 to 6 */}
      <StepHeader
        title="Educational Insights"
        description="Capture key learning points, reflections, and educational resources to maximize the educational value of this case."
        icon={Lightbulb}
      />

      {Object.keys(formState.errors).length > 0 && !formState.isValid && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Errors</AlertTitle>
          <AlertDescription>
            Please review and correct the highlighted fields below.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <StatusFieldCard
            icon={Lightbulb}
            title="Key Learning Points"
            isRequired
            tooltip="Summarize the main educational insights. Use bullet points for clarity."
            hasError={!!validationErrors.learningPoints}
            fieldValue={learningPointsValue}
        >
            <FormField
              control={control}
              name={"learningPoints" as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="• Importance of early ECG in suspected MI..."
                      rows={6}
                      {...field}
                      value={(field.value as string) || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </StatusFieldCard>

        <StatusFieldCard
            icon={FileTextIcon}
            title="General Notes & Reflections"
            tooltip="Optional space for additional thoughts or miscellaneous notes."
            hasError={!!validationErrors.generalNotes} // Assuming generalNotes might have validation
            fieldValue={generalNotesValue}
        >
            <FormField
              control={control}
              name={"generalNotes" as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Any other thoughts, reflections, areas for further study..."
                      rows={6}
                      {...field}
                      value={(field.value as string) || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </StatusFieldCard>
      </div>

      {/* Resource Links Section - Simplified */}
      <div className="p-4 border border-white/10 rounded-lg space-y-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20 text-white border border-blue-400/30">
                <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Educational Resources</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild><Info className="h-4 w-4 text-white/60 hover:text-white" /></TooltipTrigger>
                <TooltipContent><p>Add links to relevant educational materials.</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            {fields.length > 0 && (
              <Badge variant="outline" className="text-sm bg-transparent border-white/30 text-white/80">
                {fields.length} of {maxLinks}
              </Badge>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="outline" // Standard outline button
                    size="sm"
                    onClick={handleAppendResourceLink}
                    disabled={!canAddMoreLinks}
                    className="gap-2" // Simplified classes
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Resource
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{canAddMoreLinks ? "Add a resource" : `Max ${maxLinks} resources`}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {fields.map((field, index) => (
              <ResourceLinkItem
                key={field.id}
                index={index}
                onRemove={() => remove(index)}
                control={control}
                formState={formState}
              />
            ))}
          </AnimatePresence>

          {fields.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-8 text-white/70"
            >
              <BookOpen className="h-8 w-8 mx-auto mb-3 text-white/50" />
              <p className="text-white/70">No resources added. Click "Add Resource" to include materials.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
});

LearningPointsStep.displayName = "LearningPointsStep";
