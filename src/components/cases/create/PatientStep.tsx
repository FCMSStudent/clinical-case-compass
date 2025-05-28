
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// 1. Updated Zod Schema Definition
export const patientStepSchema = z.object({
  patientName: z.string().min(1, "Patient name is required."),
  medicalRecordNumber: z.string().optional(),
  patientAge: z.coerce
    .number({ invalid_type_error: "Age must be a number." })
    .int("Age must be an integer.")
    .positive("Age must be a positive number.")
    .optional()
    .or(z.literal("")),
  patientSex: z.enum(["Male", "Female", "Other"]).optional(),
  medicalHistory: z.string().optional(),
});

// Optional: Define a type for the form data based on the schema
export type PatientStepFormData = z.infer<typeof patientStepSchema>;

// 2. Component Props
interface PatientStepProps {
  control: Control<any>;
}

// 3. Component Definition
export const PatientStep: React.FC<PatientStepProps> = ({ control }) => {
  return (
    <div className="space-y-6 py-2">
      {/* Patient Name Field */}
      <FormField
        control={control}
        name="patientName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Patient Name *</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., John Doe" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Full name of the patient.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Medical Record Number Field */}
      <FormField
        control={control}
        name="medicalRecordNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Medical Record Number (Optional)</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., MRN123456" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Patient's medical record number or hospital ID.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

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

      {/* Patient Gender Field */}
      <FormField
        control={control}
        name="patientSex"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender (Optional)</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormDescription>
              Patient's gender identity.
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

export default PatientStep;
