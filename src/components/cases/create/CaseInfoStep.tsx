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
export const caseInfoSchema = z.object({
  caseTitle: z.string().min(3, "Title must be at least 3 characters long."),
  chiefComplaint: z.string().min(5, "Chief complaint must be at least 5 characters long."),
  specialty: z.string().min(1, "Specialty is required."),
});

// Optional: Define a type for the form data based on the schema
export type CaseInfoFormData = z.infer<typeof caseInfoSchema>;

// 2. Component Props
interface CaseInfoStepProps {
  control: Control<any>; // Control object from react-hook-form
  // We can add other RHF methods if needed, like formState, trigger, etc.
  // For now, 'control' is sufficient as per the subtask description.
}

const specialties = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "General Medicine",
  "Oncology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Pulmonology",
];

// 3. Component Definition
export const CaseInfoStep: React.FC<CaseInfoStepProps> = ({ control }) => {
  return (
    <div className="space-y-6 py-2">
      {/* Case Title Field */}
      <FormField
        control={control}
        name="caseTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Case Title</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Acute Myocardial Infarction" {...field} />
            </FormControl>
            <FormDescription>
              A concise and descriptive title for the case.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Chief Complaint Field */}
      <FormField
        control={control}
        name="chiefComplaint"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Chief Complaint</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., Patient presents with severe chest pain for 2 hours..."
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              The primary reason the patient sought medical attention, in their own words if possible.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Specialty Field */}
      <FormField
        control={control}
        name="specialty"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Medical Specialty</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a medical specialty" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              The primary medical specialty relevant to this case.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

// 4. Export the component and schema
export default CaseInfoStep;
