
import React, { memo } from "react";
import {
  Control,
  FieldValues,
  Path,
  useFieldArray,
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
import { Trash2, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * SCHEMA
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const learningPointsStepSchema = z.object({
  learningPoints: z.string().optional(),
  generalNotes: z.string().optional(),
  resourceLinks: z
    .array(
      z.object({
        url: z.string().url({ message: "Invalid URL format" }),
        description: z.string().optional(),
      }),
    )
    .default([]),
});
export type LearningPointsFormData = z.infer<typeof learningPointsStepSchema>;

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * PROPS
 * ────────────────────────────────────────────────────────────────────────────────
 */
export interface LearningPointsStepProps<
  T extends FieldValues = LearningPointsFormData,
> {
  control: Control<T>;
  className?: string;
  /** Optional limit for resource links. */
  maxLinks?: number;
}

/**
 * Row component for each resource link form group.
 */
const ResourceRow = <T extends FieldValues>({
  control,
  index,
  onRemove,
}: {
  control: Control<T>;
  index: number;
  onRemove: () => void;
}) => (
  <Card className="bg-muted/30 p-4 shadow-sm">
    <div className="flex flex-col gap-4 md:flex-row">
      {/* URL */}
      <FormField
        control={control}
        name={`resourceLinks.${index}.url` as Path<T>}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>URL</FormLabel>
            <FormControl>
              <Input placeholder="https://example.com/article" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Description */}
      <FormField
        control={control}
        name={`resourceLinks.${index}.description` as Path<T>}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Description (optional)</FormLabel>
            <FormControl>
              <Input placeholder="e.g., AHA Guidelines for STEMI" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Remove */}
      <div className="pt-1 md:pt-6">
        <Button
          type="button"
          variant="destructive"
          size="icon"
          onClick={onRemove}
          aria-label="Remove resource link"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </Card>
);

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * COMPONENT
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const LearningPointsStep = memo(function LearningPointsStep<
  T extends FieldValues = LearningPointsFormData,
>({ control, className, maxLinks = 8 }: LearningPointsStepProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "resourceLinks" as Path<T>,
  });

  return (
    <section className={cn("space-y-6", className)}>
      {/* --------------------------------- Takeaways + Notes --------------------------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Educational Takeaways</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={control}
            name={"learningPoints" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Learning Points</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="• Importance of early ECG in suspected MI&#10;• Differential diagnosis for acute chest pain&#10;• Management protocol for STEMI"
                    className="min-h-[120px] text-sm"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Summarise the main educational insights or lessons learned from this case. Use bullet points for clarity.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={"generalNotes" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormLabel>General Reflections & Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any other thoughts, reflections, areas for further study, or personal notes…"
                    className="min-h-[100px] text-sm"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Optional space for additional reflections or miscellaneous notes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* --------------------------------- Resource Links --------------------------------- */}
      <Card>
        <CardHeader>
          <CardTitle>Supporting Resources</CardTitle>
          <FormDescription>
            Add links to relevant articles, guidelines, or other educational material.
          </FormDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Dynamic link rows */}
          {fields.map((field, index) => (
            <ResourceRow
              key={field.id}
              control={control}
              index={index}
              onRemove={() => remove(index)}
            />
          ))}

          {/* Array-level validation */}
          <FormField
            control={control}
            name={"resourceLinks" as Path<T>}
            render={() => (
              <FormItem>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Add new link */}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({ url: "", description: "" } as unknown as { url: string; description?: string })
            }
            disabled={fields.length >= maxLinks}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Resource Link
          </Button>
        </CardContent>
      </Card>
    </section>
  );
});

LearningPointsStep.displayName = "LearningPointsStep";
