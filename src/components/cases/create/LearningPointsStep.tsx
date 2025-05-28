import { Control, useFieldArray } from "react-hook-form";
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

// 1. Zod Schema Definition
export const learningPointsStepSchema = z.object({
  learningPoints: z.string().optional(),
  generalNotes: z.string().optional(),
  resourceLinks: z
    .array(
      z.object({
        url: z.string().url("Invalid URL format.").min(1, "URL cannot be empty."),
        description: z.string().optional(),
      })
    )
    .optional().default([]),
});

// Optional: Define a type for the form data based on the schema
export type LearningPointsFormData = z.infer<typeof learningPointsStepSchema>;

// 2. Component Props
interface LearningPointsStepProps {
  control: Control<any>; // Control object from react-hook-form
}

// 3. Component Definition
export const LearningPointsStep: React.FC<LearningPointsStepProps> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "resourceLinks",
  });

  return (
    <div className="space-y-6 py-2">
      <Card>
        <CardHeader>
          <CardTitle>Educational Takeaways</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={control}
            name="learningPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Learning Points</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., - Importance of early ECG in suspected MI.&#10;- Differential diagnosis for acute chest pain.&#10;- Management protocol for STEMI."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Summarize the main educational insights or lessons learned from this case. Use bullet points for clarity.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="generalNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>General Reflections & Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any other thoughts, reflections, areas for further study, or personal notes related to this case..."
                    className="min-h-[100px]"
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

      <Card>
        <CardHeader>
          <CardTitle>Supporting Resources</CardTitle>
          <FormDescription>
            Add links to relevant articles, guidelines, studies, or other educational materials.
          </FormDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((item, index) => (
            <Card key={item.id} className="p-4 bg-muted/30 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <FormField
                  control={control}
                  name={`resourceLinks.${index}.url`}
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
                <FormField
                  control={control}
                  name={`resourceLinks.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., AHA Guidelines for STEMI" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-1 md:pt-6">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                    aria-label="Remove resource link"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
           {/* FormField to show array-level errors for resourceLinks if any */}
           <FormField
            control={control}
            name="resourceLinks"
            render={() => (
              <FormItem>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ url: "", description: "" })}
            className="mt-2"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Resource Link
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

// 4. Export the component and schema
export default LearningPointsStep;
