
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
import { z } from "zod";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Trash2, 
  PlusCircle, 
  Lightbulb, 
  BookOpen, 
  Link2, 
  FileText,
  Sparkles,
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
import { Progress } from "@/components/ui/progress";
import { useFormValidation } from "@/hooks/use-form-validation";
import { 
  learningPointsStepSchema, 
  LearningPointsFormData, 
  ResourceLink 
} from "./schemas/learning-points-schema";
import { StepHeader } from "./components/StepHeader";

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
 * Validation feedback component for resource links
 */
const ResourceLinkValidation = memo(({ 
  isValid, 
  message,
  type = "url"
}: { 
  isValid: boolean; 
  message?: string;
  type?: "url" | "description";
}) => (
  <AnimatePresence mode="wait">
    {message && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className={cn(
          "flex items-center gap-2 mt-2 text-sm",
          isValid ? "text-emerald-600" : "text-red-600"
        )}
      >
        {isValid ? (
          <CheckCircle className="h-4 w-4" />
        ) : (
          <AlertCircle className="h-4 w-4" />
        )}
        <span>{message}</span>
      </motion.div>
    )}
  </AnimatePresence>
));
ResourceLinkValidation.displayName = "ResourceLinkValidation";

/**
 * Enhanced resource link card with better validation and animations
 */
const ResourceLinkCard = memo(({ 
  index, 
  onRemove,
  isLast,
  totalLinks
}: { 
  index: number; 
  onRemove: () => void;
  isLast: boolean;
  totalLinks: number;
}) => {
  const { control, formState } = useFormContext();
  const error = formState.errors?.resourceLinks?.[index];
  const urlError = error?.url;
  const descriptionError = error?.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      <Card className={cn(
        "border-2 transition-all duration-200",
        error ? "border-red-200 bg-red-50/50" : "border-gray-200 hover:border-purple-200 hover:shadow-md"
      )}>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-4">
              <FormField
                control={control}
                name={`resourceLinks.${index}.url` as Path<FieldValues>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Link2 className="h-4 w-4 text-blue-500" />
                      Resource URL
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Enter a valid URL to an educational resource (e.g., journal article, guideline, or video)</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/resource"
                        className={cn(
                          "font-mono text-sm transition-all duration-200",
                          urlError ? "border-red-300 focus:border-red-400 bg-red-50/50" : "border-gray-200 focus:border-blue-400"
                        )}
                        value={field.value || ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <ResourceLinkValidation
                      isValid={!urlError}
                      message={urlError?.message || "URL looks good!"}
                      type="url"
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`resourceLinks.${index}.description` as Path<FieldValues>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Description
                      <span className="text-sm text-gray-500">(Optional)</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Briefly describe what makes this resource valuable for learning</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Brief description of the resource's key points or relevance"
                        className={cn(
                          "text-sm transition-all duration-200",
                          descriptionError ? "border-red-300 focus:border-red-400 bg-red-50/50" : "border-gray-200 focus:border-blue-400"
                        )}
                        value={field.value || ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <ResourceLinkValidation
                      isValid={!descriptionError}
                      message={descriptionError?.message}
                      type="description"
                    />
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
                    className={cn(
                      "h-8 w-8 transition-colors duration-200",
                      isLast && totalLinks > 1
                        ? "text-red-500 hover:text-red-600 hover:bg-red-50"
                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove this resource link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

ResourceLinkCard.displayName = "ResourceLinkCard";

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

  // Use shared validation utilities
  const { completedFields, totalFields, completionPercentage, errors } = useFormValidation<T>({
    requiredFields: ["learningPoints"],
    watchFields: ["learningPoints", "generalNotes", "resourceLinks"],
  });

  // Create a memoized append function with proper documentation
  const handleAppendResourceLink = React.useMemo(
    () => appendResourceLinkSafely<T>(append),
    [append]
  );

  const learningPoints = useWatch({
    control,
    name: "learningPoints" as Path<T>,
  });
  const generalNotes = useWatch({
    control,
    name: "generalNotes" as Path<T>,
  });
  const resourceLinks = useWatch({
    control,
    name: "resourceLinks" as Path<T>,
  }) as ResourceLink[];

  const canAddMoreLinks = fields.length < maxLinks;

  return (
    <section className={cn("space-y-8", className)}>
      <StepHeader
        title="Educational Insights"
        description="Capture key learning points, reflections, and educational resources to maximize the educational value of this case."
        icon={Lightbulb}
      />

      {/* Validation Summary */}
      {Object.keys(formState.errors).length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Validation Errors</AlertTitle>
          <AlertDescription>
            Please review and correct the highlighted fields below.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Learning Points Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg font-semibold text-white">
                Key Learning Points
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <FormField
              control={control}
              name={"learningPoints" as Path<T>}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="• Importance of early ECG in suspected MI\n• Differential diagnosis for acute chest pain\n• Management protocol for STEMI"
                      className={cn(
                        undefined,
                        fieldState.error && "border-red-400/50 focus-visible:ring-red-400/30"
                      )}
                      value={(field.value as string) || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormDescription className="mt-3 flex items-start gap-2 text-white/70">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                      fieldState.error ? "bg-red-400" : "bg-amber-400"
                    )}></div>
                    Summarize the main educational insights or lessons learned from this case. Use bullet points for clarity.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* General Notes Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg font-semibold text-white">
                General Notes & Reflections
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <FormField
              control={control}
              name={"generalNotes" as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Any other thoughts, reflections, areas for further study, or personal notes…"
                      className="min-h-[200px] text-base border-2 border-gray-200 focus:border-blue-400 focus:ring-blue-100 rounded-xl p-4 leading-6 transition-all duration-200 resize-none"
                      value={(field.value as string) || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormDescription className="mt-3 flex items-start gap-2 text-white/70">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    Optional space for additional reflections or miscellaneous notes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>

      {/* Resource Links Section */}
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-lg font-semibold text-white">
                Educational Resources
              </CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-white/70 hover:text-white" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add links to educational resources like journal articles, guidelines, or videos</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2">
              {fields.length > 0 && (
                <Badge variant="secondary" className="text-sm">
                  {fields.length} of {maxLinks} resources
                </Badge>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAppendResourceLink}
                      disabled={!canAddMoreLinks}
                      className={cn(
                        "gap-2 transition-all duration-200",
                        !canAddMoreLinks && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <PlusCircle className="h-4 w-4" />
                      Add Resource
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {canAddMoreLinks 
                        ? "Add a link to an educational resource"
                        : `Maximum ${maxLinks} resources allowed`
                      }
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {fields.map((field, index) => (
                <ResourceLinkCard
                  key={field.id}
                  index={index}
                  onRemove={() => remove(index)}
                  isLast={index === fields.length - 1}
                  totalLinks={fields.length}
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
                <BookOpen className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                <p>No resources added yet. Click "Add Resource" to include educational materials.</p>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
});

LearningPointsStep.displayName = "LearningPointsStep";
