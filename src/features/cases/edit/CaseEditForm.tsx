
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/shared/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { CaseBasicInfoSection } from "./CaseBasicInfoSection";
import { CaseTextSection } from "./CaseTextSection";
import { CaseVitalsSection } from "./CaseVitalsSection";
import { CaseLabsSection } from "./CaseLabsSection";
import { CaseRadiologySection } from "./CaseRadiologySection";
import { LabTest, RadiologyStudy } from "@/shared/types/case";
import { Loader2 } from "lucide-react";

interface FormData {
  title: string;
  patientName: string;
  patientAge: number;
  patientGender: "male" | "female" | "other";
  patientMRN: string;
  chiefComplaint: string;
  history: string;
  physicalExam: string;
  learningPoints: string;
}

export interface CaseEditFormProps {
  form: UseFormReturn<FormData>;
  onSubmit: (data: FormData) => void;
  isSaving: boolean;
  onVitalsChange: (vitals: Record<string, string>) => void;
  onLabChange: (labs: LabTest[]) => void;
  onImagingChange: (studies: {id: string, type: string, findings: string}[]) => void;
  initialVitals: Record<string, string>;
  patientAge: number;
}

export const CaseEditForm: React.FC<CaseEditFormProps> = ({
  form,
  onSubmit,
  isSaving,
  onVitalsChange,
  onLabChange,
  onImagingChange,
  initialVitals,
  patientAge,
}) => {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card className="auth-glass-container">
          <CardHeader>
            <CardTitle className="text-white">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CaseBasicInfoSection form={form} />
          </CardContent>
        </Card>

        {/* Clinical Text */}
        <Card className="auth-glass-container">
          <CardHeader>
            <CardTitle className="text-white">Clinical Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CaseTextSection form={form} />
          </CardContent>
        </Card>
      </div>

      {/* Vitals Section */}
      <Card className="auth-glass-container">
        <CardHeader>
          <CardTitle className="text-white">Vital Signs</CardTitle>
        </CardHeader>
        <CardContent>
          <CaseVitalsSection
            onVitalsChange={onVitalsChange}
            initialVitals={initialVitals}
            patientAge={patientAge}
          />
        </CardContent>
      </Card>

      {/* Lab Results Section */}
      <Card className="auth-glass-container">
        <CardHeader>
          <CardTitle className="text-white">Laboratory Results</CardTitle>
        </CardHeader>
        <CardContent>
          <CaseLabsSection onLabChange={onLabChange} patientAge={patientAge} />
        </CardContent>
      </Card>

      {/* Radiology Section */}
      <Card className="auth-glass-container">
        <CardHeader>
          <CardTitle className="text-white">Imaging Studies</CardTitle>
        </CardHeader>
        <CardContent>
          <CaseRadiologySection onImagingChange={onImagingChange} />
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={isSaving}
          className="min-w-32"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
};
