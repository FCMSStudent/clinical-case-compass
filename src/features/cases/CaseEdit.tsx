// Remove: import { getCaseById } from "@/data/mock-data";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/shared/components/page-header";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { MedicalCase, RadiologyStudy } from "@/shared/types/case";
import { useSupabaseCases } from "@/shared/hooks/use-supabase-cases";
import { CaseEditForm } from "@/features/cases/edit/CaseEditForm";
import { typography, layouts } from "@/design-system/ui-styles";
import { colors } from "@/design-system/tokens/design-tokens";

// Define the form schema with optional fields
const formSchema = z.object({
  title: z.string().optional(),
  patientName: z.string().optional(),
  patientAge: z.coerce.number().min(0).max(120).optional(),
  patientGender: z.enum(["male", "female", "other"]).optional(),
  patientMRN: z.string().optional(),
  chiefComplaint: z.string().optional(),
  history: z.string().optional(),
  physicalExam: z.string().optional(),
  learningPoints: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CaseEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [storedCases, setStoredCases] = useLocalStorage<MedicalCase[]>(
    "medical-cases",
    [],
  );

  // Use Supabase hook to fetch case data
  const { useGetCaseQuery } = useSupabaseCases();
  const { data: supabaseCase, isLoading, error } = useGetCaseQuery(id || "");
  
  // Determine which case to use (Supabase first, then localStorage only)
  const medicalCase = supabaseCase || 
    storedCases?.find(c => c.id === id);

  // State for specialized inputs
  const [vitals, setVitals] = useState<Record<string, string>>({});
  const [labResults, setLabResults] = useState<any[]>([]); // Consider typing this if structure is known
  const [radiologyStudies, setRadiologyStudies] = useState<RadiologyStudy[]>([]);

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
    mode: "onChange",
  });

  // Load case data when available
  useEffect(() => {
    if (!id) {
      navigate("/cases");
      return;
    }

    if (!medicalCase) {
      if (!isLoading && !error) {
        toast.error("Case not found");
        navigate("/cases");
      }
      return;
    }

    // Populate form with case data - handle gender mapping
    const patientGender = medicalCase.patient.gender;
    const mappedGender = patientGender === "unknown" ? "other" : patientGender;
    
    form.reset({
      title: medicalCase.title || "",
      patientName: medicalCase.patient.name || "",
      patientAge: medicalCase.patient.age || 0,
      patientGender: mappedGender as "male" | "female" | "other",
      patientMRN: medicalCase.patient.medicalRecordNumber || "",
      chiefComplaint: medicalCase.chiefComplaint || "",
      history: medicalCase.history || "",
      physicalExam: medicalCase.physicalExam || "",
      learningPoints: medicalCase.learningPoints || "",
    });

    // Load specialized inputs if they exist
    if (medicalCase.vitals) {
      setVitals(medicalCase.vitals);
    }

    if (medicalCase.labTests) {
      setLabResults(medicalCase.labTests);
    }

    if (medicalCase.radiologyStudies) {
      setRadiologyStudies(medicalCase.radiologyStudies);
    }
    // Removed backward compatibility for radiologyExams as it's handled by the hook
  }, [medicalCase, id, navigate, form, isLoading, error]);

  // Helper to map SimpleImaging's output to RadiologyStudy[]
  // This is a placeholder and might need more sophisticated logic
  // to determine 'type' (modality) and 'date'.
  const mapSimpleImagingToRadiologyStudy = (simpleStudies: {id: string, type: string, findings: string}[]): RadiologyStudy[] => {
    return simpleStudies.map(ss => ({
      id: ss.id,
      name: ss.type, // SimpleImaging's 'type' is more like a 'name' (e.g., "Chest X-Ray")
      type: extractModalityFromName(ss.type), // Needs a helper to get "X-Ray" from "Chest X-Ray"
      findings: ss.findings,
      date: new Date().toISOString().split('T')[0], // Default to today
      impression: "", // SimpleImaging doesn't have impression
    }));
  };

  // This function would try to extract modality like "CT", "MRI", "X-Ray"
  // from a study name like "CT Head" or "Chest X-Ray".
  // This is a simplistic implementation.
  const extractModalityFromName = (studyName: string): string => {
    const lowerName = studyName.toLowerCase();
    if (lowerName.includes("ct") || lowerName.includes("computed tomography")) return "CT";
    if (lowerName.includes("mri") || lowerName.includes("magnetic resonance")) return "MRI";
    if (lowerName.includes("x-ray") || lowerName.includes("radiography")) return "X-Ray";
    if (lowerName.includes("ultrasound")) return "Ultrasound";
    if (lowerName.includes("pet")) return "PET";
    // Add more rules as needed
    return "Other"; // Default modality
  };


  const handleImagingChange = (studiesFromSimpleImaging: {id: string, type: string, findings: string}[]) => {
    setRadiologyStudies(mapSimpleImagingToRadiologyStudy(studiesFromSimpleImaging));
  };

  const onSubmit = (values: FormValues) => {
    if (!medicalCase) return;

    setIsSaving(true);

    try {
      // Create updated case object
      const updatedCase: MedicalCase = {
        ...medicalCase,
        title: values.title || medicalCase.title,
        updatedAt: new Date().toISOString(),
        chiefComplaint: values.chiefComplaint || medicalCase.chiefComplaint,
        history: values.history || undefined,
        physicalExam: values.physicalExam || undefined,
        learningPoints: values.learningPoints || undefined,
        patient: {
          ...medicalCase.patient,
          name: values.patientName || medicalCase.patient.name,
          age: values.patientAge || medicalCase.patient.age,
          gender: values.patientGender || medicalCase.patient.gender,
          medicalRecordNumber: values.patientMRN || undefined,
        },
        vitals: vitals,
        labTests: labResults,
        radiologyStudies: radiologyStudies,
      };

      // Update case in localStorage if it exists there
      if (storedCases && storedCases.find(c => c.id === id)) {
        const updatedCases = storedCases.map((c) => (c.id === id ? updatedCase : c));
        setStoredCases(updatedCases);
      }

      toast.success("Case updated successfully");
      navigate(`/cases/${id}`);
    } catch (error) {
      console.error("Error updating case:", error);
      toast.error("Failed to update case");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`${layouts.flex.center} min-h-[50vh]`}>
        <h2 className={`${typography.h3} mb-4`}>Loading case...</h2>
      </div>
    );
  }

  if (error || !medicalCase) {
    return (
      <div className={`${layouts.flex.center} min-h-[50vh] flex-col`}>
        <h2 className={`${typography.h3} mb-4`}>Case not found</h2>
        <Link
          to="/cases"
          className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-4 py-2 rounded-xl transition-all duration-200"
        >
          Return to all cases
        </Link>
      </div>
    );
  }

  // Extract initial vitals from the medical case
  const initialVitals = medicalCase.vitals ? {
    temperature: medicalCase.vitals.temperature?.toString() || "37",
    heartRate: medicalCase.vitals.heartRate?.toString() || "80",
    systolicBP: medicalCase.vitals.systolicBP?.toString() || "120",
    diastolicBP: medicalCase.vitals.diastolicBP?.toString() || "80",
    respiratoryRate: medicalCase.vitals.respiratoryRate?.toString() || "16",
    oxygenSaturation: medicalCase.vitals.oxygenSaturation?.toString() || "98"
  } : undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to={`/cases/${id}`}
          className={`inline-flex items-center text-sm text-sky-300 hover:text-sky-400`}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to case
        </Link>
      </div>

      <PageHeader
        title="Edit Case"
        description="Update an existing medical case"
        className="text-sky-300"
      />

      <CaseEditForm
        form={form}
        onSubmit={onSubmit}
        isSaving={isSaving}
        onVitalsChange={setVitals}
        onLabChange={setLabResults} // Consider mapping this if SimpleLabs output is different
        onImagingChange={handleImagingChange}
        initialVitals={initialVitals}
        patientAge={form.watch("patientAge")}
      />
    </div>
  );
};

export default CaseEdit;
