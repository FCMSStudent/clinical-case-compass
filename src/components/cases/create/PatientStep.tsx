import { Control } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// 1. Zod Schema Definition
export const patientStepSchema = z.object({
  patientAge: z.coerce
    .number({ invalid_type_error: "Age must be a number." })
    .int("Age must be an integer.")
    .positive("Age must be a positive number.")
    .optional()
    .or(z.literal("")), // Allow empty string, which will be coerced to undefined by optional()
  patientSex: z.enum(["Male", "Female", "Other", "Prefer not to say"]).optional(),
  medicalHistory: z.string().optional(),
});

// Optional: Define a type for the form data based on the schema
export type PatientStepFormData = z.infer<typeof patientStepSchema>;

// 2. Component Props
interface PatientStepProps {
  control: Control<any>; // Control object from react-hook-form
}

const sexOptions = ["Male", "Female", "Other", "Prefer not to say"];

// 3. Component Definition
export const PatientStep: React.FC<PatientStepProps> = ({ control }) => {
  return (
    <div className="space-y-6 py-2">
      {/* Patient Age Field */}
      <FormField
        control={control}
        name="patientAge"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Patient Age (Optional)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="e.g., 35" 
                {...field} 
                onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                value={field.value === undefined || field.value === null ? '' : String(field.value)}
              />
            </FormControl>
            <FormDescription>
              The patient's age in years.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Patient Sex Field */}
      <FormField
        control={control}
        name="patientSex"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Patient Sex (Optional)</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient's sex" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {sexOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              The patient's biological sex or gender identity.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Relevant Medical History Field */}
      <FormField
        control={control}
        name="medicalHistory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Relevant Medical History (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., Hypertension, Type 2 Diabetes, Previous MI..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              A brief summary of the patient's relevant past medical conditions or surgeries.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

// 4. Export the component and schema
export default PatientStep;
