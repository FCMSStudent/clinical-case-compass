import { Control } from "react-hook-form"; // useFieldArray removed
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
// Input import removed
import { Textarea } from "@/components/ui/textarea";
// Button import removed
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Trash2, PlusCircle imports removed

// 1. Zod Schema Definition
export const learningPointsStepSchema = z.object({
  learningPoints: z.string().optional(),
  // generalNotes and resourceLinks removed
});

// Optional: Define a type for the form data based on the schema
export type LearningPointsFormData = z.infer<typeof learningPointsStepSchema>;

// 2. Component Props
interface LearningPointsStepProps {
  control: Control<any>; // Control object from react-hook-form
}

// 3. Component Definition
export const LearningPointsStep: React.FC<LearningPointsStepProps> = ({ control }) => {
  // useFieldArray hook for resourceLinks removed

  return (
    <div className="space-y-6 py-2">
      <Card>
        <CardHeader>
          <CardTitle>Educational Takeaways</CardTitle>
        </CardHeader>
        <CardContent> {/* Removed space-y-6 from here as only one field remains */}
          <FormField
            control={control}
            name="learningPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key Learning Points (Differential, Management, Follow-up, Pearls)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g.,&#10;- Differential diagnoses considered: ...&#10;- Key management decisions: ...&#10;- Important follow-up actions: ...&#10;- Take-home pearls: ..."
                    className="min-h-[150px]" // Increased min-height for more content
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Summarize differential diagnoses, management strategies, follow-up considerations, and key take-home pearls from this case.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* FormField for generalNotes removed */}
        </CardContent>
      </Card>
      {/* Supporting Resources Card removed */}
    </div>
  );
};

// 4. Export the component and schema
export default LearningPointsStep;
