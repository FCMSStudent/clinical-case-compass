
// Remove: import { getCaseById } from "@/data/mock-data";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/button";
import { PageHeader } from "@/shared/components/page-header";
import { BentoContainer } from "@/shared/components/bento-container";
import { ChevronLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { MedicalCase } from "@/shared/types/case";
import { useSupabaseCases } from "@/shared/hooks/use-supabase-cases";
import { cn } from "@/shared/utils/utils";

// Import bento card components
import { PatientInfoCard } from "@/features/cases/detail/PatientInfoCard";
import { DiagnosisCard } from "@/features/cases/detail/DiagnosisCard";
import { ClinicalTextCard } from "@/features/cases/detail/ClinicalTextCard";
import { VitalsCard } from "@/features/cases/detail/VitalsCard";
import { DiagnosticsCard } from "@/features/cases/detail/DiagnosticsCard";
import { LearningPointsCard } from "@/features/cases/detail/LearningPointsCard";
import { ActionsCard } from "@/features/cases/detail/ActionsCard";

import { FileText, Activity } from "lucide-react";

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [storedCases, setStoredCases] = useLocalStorage<MedicalCase[]>("medical-cases", []);
  
  // Use Supabase hook to fetch case data
  const { useGetCaseQuery } = useSupabaseCases();
  const { data: supabaseCase, isLoading, error } = useGetCaseQuery(id || "");
  
  // Determine which case to display: Supabase first, then localStorage (NO mock-data fallback)
  const medicalCase = supabaseCase || 
    storedCases?.find(c => c.id === id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-semibold mb-4 text-white">Loading case...</h2>
      </div>
    );
  }

  if (error || !medicalCase) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-semibold mb-4 text-white">Case not found</h2>
        <Button asChild className="bg-white/10 border border-white/20 text-white hover:bg-white/20">
          <Link to="/cases">Return to all cases</Link>
        </Button>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/cases/edit/${id}`);
  };

  const handleDelete = () => {
    // Delete case from localStorage if it exists there
    if (storedCases) {
      const updatedCases = storedCases.filter(c => c.id !== id);
      setStoredCases(updatedCases);
    }
    setShowDeleteDialog(false);
    navigate("/cases");
    toast.success("Case deleted successfully");
  };

  const handleVitalsChange = (vitals: Record<string, string>) => {
    console.log("Vitals updated:", vitals);
  };

  const handleLabsChange = (labs: any) => {
    console.log("Labs updated:", labs);
  };

  const handleImagingChange = (imaging: any) => {
    console.log("Imaging updated:", imaging);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Link
          to="/cases"
          className="inline-flex items-center text-sm text-white/70 hover:text-white transition-colors gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to all cases
        </Link>
      </div>
      
      {/* Page Header */}
      <PageHeader title={medicalCase.title} className="text-white mb-8" />

      {/* Enhanced Bento Grid Layout */}
      <BentoContainer layout="default">
        {/* Row 1: Patient Info (hero) + Actions (small utility card) */}
        <PatientInfoCard medicalCase={medicalCase} />
        <ActionsCard 
          onEdit={handleEdit}
          onDelete={() => setShowDeleteDialog(true)}
        />

        {/* Row 2: Diagnosis + History */}
        <DiagnosisCard medicalCase={medicalCase} />
        <ClinicalTextCard
          icon={<FileText />}
          title="Medical History"
          content={medicalCase.history}
          layout="medium"
          placeholder="No medical history recorded for this case"
        />

        {/* Row 3: Physical Exam + Vitals */}
        <ClinicalTextCard
          icon={<Activity />}
          title="Physical Examination"
          content={medicalCase.physicalExam}
          layout="medium"
          placeholder="No physical examination findings recorded"
        />
        <VitalsCard 
          medicalCase={medicalCase}
          onVitalsChange={handleVitalsChange}
        />

        {/* Row 4: Diagnostics (full-width card) */}
        <DiagnosticsCard
          onLabChange={handleLabsChange}
          onImagingChange={handleImagingChange}
        />

        {/* Row 5: Learning Points (full-width card) */}
        <LearningPointsCard medicalCase={medicalCase} />
      </BentoContainer>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-white/10 backdrop-blur-md border border-white/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              This action cannot be undone. This will permanently delete this case.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-400/20 border-red-400/30 hover:bg-red-400/30 text-red-300">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CaseDetail;
