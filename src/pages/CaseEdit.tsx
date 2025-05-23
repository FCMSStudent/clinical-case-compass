import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/ui/page-header";
import { ChevronLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { InteractiveVitalsCard } from "@/components/cases/InteractiveVitalsCard";
import { UrinaryReviewCard } from "@/components/cases/UrinaryReviewCard";
import { SymptomChecklist } from "@/components/cases/SymptomChecklist";
import { LabResultsCard, LabTest } from "@/components/cases/LabResultsCard";
import { RadiologyCard, RadiologyExam } from "@/components/cases/RadiologyCard";
import { getCaseById } from "@/data/mock-data";
import { MedicalCase, Patient, Diagnosis, CaseTag, Resource } from "@/types/case";

// Define the form schema
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  patientName: z.string().min(1, { message: "Patient name is required" }),
  patientAge: z.coerce.number().min(0).max(120),
  patientGender: z.enum(["male", "female", "other"]),
  patientMRN: z.string().optional(),
  chiefComplaint: z.string().min(1, { message: "Chief complaint is required" }),
  history: z.string().optional(),
  physicalExam: z.string().optional(),
  learningPoints: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CaseEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [storedCases, setStoredCases] = useLocalStorage<MedicalCase[]>("medical-cases", []);
  const [medicalCase, setMedicalCase] = useState<MedicalCase | undefined>(undefined);
  
  // State for specialized inputs
  const [vitals, setVitals] = useState<Record<string, string>>({});
  const [urinarySymptoms, setUrinarySymptoms] = useState<string[]>([]);
  const [symptoms, setSymptoms] = useState<Record<string, boolean>>({});
  const [systemSymptoms, setSystemSymptoms] = useState<Record<string, string[]>>({});
  const [labResults, setLabResults] = useState<LabTest[]>([]);
  const [radiologyExams, setRadiologyExams] = useState<RadiologyExam[]>([]);
  
  // Set up form with existing case data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      patientName: "",
      patientAge: 0,
      patientGender: "male" as const,
      patientMRN: "",
      chiefComplaint: "",
      history: "",
      physicalExam: "",
      learningPoints: "",
    },
  });
  
  // Load case data
  useEffect(() => {
    if (!id) {
      navigate("/cases");
      return;
    }
    
    // First check localStorage
    let foundCase = storedCases?.find(c => c.id === id);
    
    // If not found in localStorage, check mock data
    if (!foundCase) {
      foundCase = getCaseById(id);
    }
    
    // Case not found in either source
    if (!foundCase) {
      toast.error("Case not found");
      navigate("/cases");
      return;
    }
    
    setMedicalCase(foundCase);
    
    // Populate form with case data
    form.reset({
      title: foundCase.title || "",
      patientName: foundCase.patient.name || "",
      patientAge: foundCase.patient.age || 0,
      patientGender: foundCase.patient.gender || "male",
      patientMRN: foundCase.patient.medicalRecordNumber || "",
      chiefComplaint: foundCase.chiefComplaint || "",
      history: foundCase.history || "",
      physicalExam: foundCase.physicalExam || "",
      learningPoints: foundCase.learningPoints || "",
    });
    
    // Load specialized inputs if they exist
    if (foundCase.vitals) {
      setVitals(foundCase.vitals);
    }
    
    if (foundCase.urinarySymptoms) {
      setUrinarySymptoms(foundCase.urinarySymptoms);
    }
    
    if (foundCase.symptoms) {
      setSymptoms(foundCase.symptoms);
    }
    
    if (foundCase.labTests) {
      setLabResults(foundCase.labTests);
    }
    
    if (foundCase.radiologyExams) {
      setRadiologyExams(foundCase.radiologyExams);
    }
  }, [id, storedCases, navigate, form]);
  
  const onSubmit = (values: FormValues) => {
    if (!medicalCase) return;
    
    setIsSaving(true);
    
    try {
      // Create updated case object
      const updatedCase: MedicalCase = {
        ...medicalCase,
        title: values.title,
        updatedAt: new Date().toISOString(),
        chiefComplaint: values.chiefComplaint,
        history: values.history || undefined,
        physicalExam: values.physicalExam || undefined,
        learningPoints: values.learningPoints || undefined,
        patient: {
          ...medicalCase.patient,
          name: values.patientName,
          age: values.patientAge,
          gender: values.patientGender,
          medicalRecordNumber: values.patientMRN || undefined,
        },
        vitals: vitals,
        urinarySymptoms: urinarySymptoms,
        symptoms: symptoms,
        labTests: labResults,
        radiologyExams: radiologyExams,
      };
      
      // Update case in localStorage
      const updatedCases = storedCases
        ? storedCases.map(c => c.id === id ? updatedCase : c)
        : [updatedCase];
      
      setStoredCases(updatedCases);
      
      toast.success("Case updated successfully");
      navigate(`/cases/${id}`);
    } catch (error) {
      console.error("Error updating case:", error);
      toast.error("Failed to update case");
    } finally {
      setIsSaving(false);
    }
  };

  // Convert boolean record format to system-based string arrays
  const handleSymptomSelectionChange = (selections: Record<string, string[]>) => {
    setSystemSymptoms(selections);
    
    // Also update the old format for backward compatibility
    const booleanFormat: Record<string, boolean> = {};
    Object.entries(selections).forEach(([system, symptoms]) => {
      symptoms.forEach(symptom => {
        booleanFormat[`${system}-${symptom}`] = true;
      });
    });
    setSymptoms(booleanFormat);
  };

  return (
    <div>
      <div className="mb-4">
        <Link
          to={`/cases/${id}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to case
        </Link>
      </div>
      
      <PageHeader title="Edit Case" description="Update an existing medical case" />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Case Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="chiefComplaint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chief Complaint</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="patientAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={0} max={120} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="patientGender"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <select
                        className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                        {...field}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="patientMRN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Record Number (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>If applicable</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <InteractiveVitalsCard 
              onVitalsChange={setVitals} 
              initialVitals={vitals} 
              patientAge={form.watch("patientAge")}
            />
            <UrinaryReviewCard 
              onSelectionChange={setUrinarySymptoms} 
              initialSelections={urinarySymptoms}
            />
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-medium text-sm mb-2">Other Symptoms</h3>
              <SymptomChecklist 
                onSelectionChange={handleSymptomSelectionChange}
                initialSelections={systemSymptoms}
              />
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="history"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>History</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Relevant medical history" 
                      className="min-h-32" 
                      {...field} 
                      value={field.value || ""}
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
                  <FormLabel>Physical Examination</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Physical examination findings" 
                      className="min-h-32" 
                      {...field} 
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <LabResultsCard 
              onLabResultsChange={setLabResults} 
              initialResults={labResults}
            />
            <RadiologyCard 
              onRadiologyChange={setRadiologyExams}
              initialResults={radiologyExams}
            />
          </div>
          
          <FormField
            control={form.control}
            name="learningPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Learning Points</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Key learning points for this case" 
                    className="min-h-32" 
                    {...field} 
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving} className="bg-medical-600 hover:bg-medical-700">
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CaseEdit;
