
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/ui/page-header";
import { ChevronLeft, FileText, Clipboard, UserCircle, Stethoscope } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllTags } from "@/data/mock-data";

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  patientName: z.string().min(2, { message: "Patient name is required" }),
  patientAge: z.string().min(1, { message: "Age is required" }),
  patientGender: z.string().min(1, { message: "Gender is required" }),
  patientMRN: z.string().optional(),
  chiefComplaint: z.string().min(3, { message: "Chief complaint is required" }),
  diagnoses: z.string().optional(),
  tags: z.string().min(1, { message: "Please select at least one specialty" }),
  history: z.string().optional(),
  physicalExam: z.string().optional(),
  learningPoints: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CaseNew = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const allTags = getAllTags();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      patientName: "",
      patientAge: "",
      patientGender: "",
      patientMRN: "",
      chiefComplaint: "",
      diagnoses: "",
      tags: "",
      history: "",
      physicalExam: "",
      learningPoints: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, we would save this to the database
      console.log("Form values:", values);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Case created successfully!");
      navigate("/cases");
    } catch (error) {
      console.error("Error creating case:", error);
      toast.error("Failed to create case. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <Button
        onClick={() => navigate("/cases")}
        variant="ghost"
        className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to all cases
      </Button>

      <PageHeader 
        title="New Clinical Case" 
        description="Document a new clinical case for learning and reference"
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 mt-6">
          <Card className="border-medical-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-medical-50 to-medical-100 rounded-t-lg">
              <div className="flex items-center">
                <FileText className="h-6 w-6 text-medical-800 mr-2" />
                <CardTitle>Case Information</CardTitle>
              </div>
              <CardDescription>Enter the basic details about this clinical case</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-medium">Case Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Acute Appendicitis in a 25-Year-Old Male" 
                        {...field}
                        className="border-medical-200 focus-visible:ring-medical-500" 
                      />
                    </FormControl>
                    <FormDescription>
                      A descriptive title for this clinical case
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-medium">Clinical Specialty</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-medical-200 focus-visible:ring-medical-500">
                          <SelectValue placeholder="Select a specialty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allTags.map((tag) => (
                          <SelectItem key={tag.id} value={tag.id}>
                            {tag.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the primary specialty for this case
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="chiefComplaint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-medium">Chief Complaint</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Severe abdominal pain" 
                          {...field} 
                          className="border-medical-200 focus-visible:ring-medical-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="diagnoses"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-medium">Diagnosis (Primary)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Acute Appendicitis" 
                          {...field} 
                          className="border-medical-200 focus-visible:ring-medical-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-medical-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-medical-50 to-medical-100 rounded-t-lg">
              <div className="flex items-center">
                <UserCircle className="h-6 w-6 text-medical-800 mr-2" />
                <CardTitle>Patient Information</CardTitle>
              </div>
              <CardDescription>Enter patient demographics and identifiers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="patientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-medium">Patient Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Patient name" 
                          {...field} 
                          className="border-medical-200 focus-visible:ring-medical-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="patientMRN"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-medium">Medical Record Number (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="MRN" 
                          {...field} 
                          className="border-medical-200 focus-visible:ring-medical-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="patientAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-medium">Age</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Age" 
                          {...field} 
                          className="border-medical-200 focus-visible:ring-medical-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="patientGender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md font-medium">Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-medical-200 focus-visible:ring-medical-500">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-medical-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-medical-50 to-medical-100 rounded-t-lg">
              <div className="flex items-center">
                <Stethoscope className="h-6 w-6 text-medical-800 mr-2" />
                <CardTitle>Clinical Details</CardTitle>
              </div>
              <CardDescription>Document the patient's history and examination findings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <FormField
                control={form.control}
                name="history"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-medium">History</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the patient's history..."
                        className="min-h-[120px] resize-none border-medical-200 focus-visible:ring-medical-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="physicalExam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-medium">Physical Examination</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Document physical exam findings..."
                        className="min-h-[120px] resize-none border-medical-200 focus-visible:ring-medical-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="border-medical-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-medical-50 to-medical-100 rounded-t-lg">
              <div className="flex items-center">
                <Clipboard className="h-6 w-6 text-medical-800 mr-2" />
                <CardTitle>Learning</CardTitle>
              </div>
              <CardDescription>Document key learning points from this clinical case</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="learningPoints"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-medium">Learning Points</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Document key learning points from this case..."
                        className="min-h-[120px] resize-none border-medical-200 focus-visible:ring-medical-500"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include important insights, literature references, or best practices
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Separator className="my-8" />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/cases")}
              className="border-medical-300 hover:bg-medical-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-medical-600 hover:bg-medical-700 text-white"
            >
              {isSubmitting ? "Creating..." : "Create Case"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CaseNew;
