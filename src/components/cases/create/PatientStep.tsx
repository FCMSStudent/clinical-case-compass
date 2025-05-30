
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Hash, Calendar, Users } from "lucide-react";

// 1. Updated Zod Schema Definition
export const patientStepSchema = z.object({
  patientName: z.string().min(2, "Patient name must be at least 2 characters."),
  medicalRecordNumber: z.string().optional(),
  patientAge: z.coerce
    .number({ invalid_type_error: "Age must be a number." })
    .int("Age must be an integer.")
    .min(0, "Age must be 0 or greater.")
    .max(150, "Age must be 150 or less.")
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
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-medical-800 mb-2 flex items-center">
          <User className="h-5 w-5 mr-2" />
          Patient Information
        </h3>
        <p className="text-sm text-muted-foreground">
          Enter the patient's basic demographic and identification information.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Patient Name Field */}
        <Card className="border-medical-200">
          <CardContent className="p-4">
            <FormField
              control={control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-medical-700">
                    <User className="h-4 w-4 mr-2" />
                    Patient Name *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., John Doe" 
                      className="border-medical-200 focus:border-medical-500"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Full name of the patient (can be anonymized if needed).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Medical Record Number Field */}
        <Card className="border-medical-200">
          <CardContent className="p-4">
            <FormField
              control={control}
              name="medicalRecordNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-medical-700">
                    <Hash className="h-4 w-4 mr-2" />
                    Medical Record Number
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., MRN123456" 
                      className="border-medical-200 focus:border-medical-500"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Patient's medical record number or hospital ID (optional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Patient Age Field */}
        <Card className="border-medical-200">
          <CardContent className="p-4">
            <FormField
              control={control}
              name="patientAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-medical-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Age
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="e.g., 35" 
                      min="0"
                      max="150"
                      className="border-medical-200 focus:border-medical-500"
                      {...field} 
                      onChange={e => field.onChange(e.target.value === '' ? '' : Number(e.target.value))}
                      value={field.value === undefined || field.value === null ? '' : String(field.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    The patient's age in years (0-150).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Patient Gender Field */}
        <Card className="border-medical-200">
          <CardContent className="p-4">
            <FormField
              control={control}
              name="patientSex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center text-medical-700">
                    <Users className="h-4 w-4 mr-2" />
                    Gender
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-6 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="male" className="border-medical-300" />
                        <Label htmlFor="male" className="text-sm font-normal cursor-pointer">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="female" className="border-medical-300" />
                        <Label htmlFor="female" className="text-sm font-normal cursor-pointer">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Other" id="other" className="border-medical-300" />
                        <Label htmlFor="other" className="text-sm font-normal cursor-pointer">Other</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Patient's gender identity (optional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>

      {/* Relevant Medical History Field */}
      <Card className="border-medical-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-medical-700">Medical History</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="medicalHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relevant Past Medical History</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Hypertension (2018), Type 2 Diabetes (2020), Previous MI (2022)..."
                    className="min-h-[120px] border-medical-200 focus:border-medical-500"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A brief summary of the patient's relevant past medical conditions, surgeries, allergies, and current medications.
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

export default PatientStep;
