
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, Stethoscope } from "lucide-react";

// 1. Zod Schema Definition
export const caseInfoSchema = z.object({
  caseTitle: z.string().min(5, "Title must be at least 5 characters long."),
  chiefComplaint: z.string().min(10, "Chief complaint must be at least 10 characters long."),
  specialty: z.string().min(1, "Medical specialty is required."),
});

// Optional: Define a type for the form data based on the schema
export type CaseInfoFormData = z.infer<typeof caseInfoSchema>;

// 2. Component Props
interface CaseInfoStepProps {
  control: Control<any>; // Control object from react-hook-form
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
  "Emergency Medicine",
  "General Surgery",
  "Psychiatry",
  "Radiology",
  "Anesthesiology",
  "Pathology",
  "Ophthalmology",
  "ENT (Otolaryngology)",
  "Urology",
  "Obstetrics & Gynecology"
];

// 3. Component Definition
export const CaseInfoStep: React.FC<CaseInfoStepProps> = ({ control }) => {
  return (
    <div className="space-y-6 py-2">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-medical-800 mb-2 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Case Overview
        </h3>
        <p className="text-sm text-muted-foreground">
          Provide the basic information about this clinical case.
        </p>
      </div>

      {/* Case Title Field */}
      <Card className="border-medical-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-medical-700 flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Case Title
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="caseTitle"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    placeholder="e.g., Acute Myocardial Infarction in a 65-year-old Male" 
                    className="border-medical-200 focus:border-medical-500 text-base"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  A concise and descriptive title that summarizes the case. Include key details like condition, patient demographics, or unique aspects.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Chief Complaint Field */}
      <Card className="border-medical-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-medical-700 flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chief Complaint
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="chiefComplaint"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Patient presents with severe chest pain that started 2 hours ago, described as crushing and radiating to the left arm..."
                    className="min-h-[120px] border-medical-200 focus:border-medical-500"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The primary reason the patient sought medical attention, preferably in the patient's own words. Include onset, duration, and key characteristics.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Specialty Field */}
      <Card className="border-medical-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-medical-700 flex items-center">
            <Stethoscope className="h-4 w-4 mr-2" />
            Medical Specialty
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="specialty"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-medical-200 focus:border-medical-500">
                      <SelectValue placeholder="Select the primary medical specialty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60">
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  The primary medical specialty most relevant to this case. This helps categorize and route the case appropriately.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

// 4. Export the component and schema
export default CaseInfoStep;
