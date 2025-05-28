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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// 1. Zod Schema Definition
export const patientStepSchema = z.object({
  patientName: z.string().min(1, "Patient name is required."),
  medicalRecordNumber: z.string().optional(),
  age: z.coerce
    .number({ invalid_type_error: "Age must be a number." })
    .int("Age must be an integer.")
    .positive("Age must be a positive number.")
    .optional()
    .or(z.literal("")), // Allow empty string, which will be coerced to undefined by optional()
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required." }),
});

// Optional: Define a type for the form data based on the schema
export type PatientStepFormData = z.infer<typeof patientStepSchema>;

// 2. Component Props
interface PatientStepProps {
  control: Control<any>; // Control object from react-hook-form
}

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

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
            <FormLabel>Patient Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g., John Doe" {...field} />
            </FormControl>
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
              <Input placeholder="e.g., MRN12345" {...field} />
            </FormControl>
            <FormDescription>
              Patient's unique medical identifier, if available.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Age Field */}
      <FormField
        control={control}
        name="age"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Age</FormLabel>
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

      {/* Gender Field */}
      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Gender</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                {genderOptions.map((option) => (
                  <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormDescription>
              Select the patient's gender.
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
