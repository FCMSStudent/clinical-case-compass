
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/shared/components/form";
import { Button } from "@/shared/components/button";
import { Save } from "lucide-react";
import { CaseBasicInfoSection } from "./CaseBasicInfoSection";
import { CaseVitalsSection } from "./CaseVitalsSection";
import { CaseTextSection } from "./CaseTextSection";
import { CaseLabsSection } from "./CaseLabsSection";
import { CaseRadiologySection } from "./CaseRadiologySection";
import { spacing } from '@/design-system/tokens/spacing';

interface CaseEditFormProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  isSaving: boolean;
  onVitalsChange: (vitals: Record<string, string>) => void;
  onLabChange: (labResults: any[]) => void;
  onImagingChange: (radiologyStudies: any[]) => void;
  initialVitals?: Record<string, string>;
  patientAge?: number;
}

export const CaseEditForm: React.FC<CaseEditFormProps> = ({
  form,
  onSubmit,
  isSaving,
  onVitalsChange,
  onLabChange,
  onImagingChange,
  initialVitals = {},
  patientAge
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="case-edit-form"
        className={spacing.section.lg}
      >
        {/* Basic Information Section */}
        <CaseBasicInfoSection form={form} />

        {/* Vital Signs Section */}
        <CaseVitalsSection
          onVitalsChange={onVitalsChange}
          initialVitals={initialVitals}
          patientAge={patientAge}
        />

        {/* History Section */}
        <CaseTextSection
          form={form}
          fieldName="history"
          title="History"
          placeholder="Relevant medical history"
        />

        {/* Physical Examination Section */}
        <CaseTextSection
          form={form}
          fieldName="physicalExam"
          title="Physical Examination"
          placeholder="Physical examination findings"
        />

        {/* Laboratory Results Section */}
        <CaseLabsSection onLabChange={onLabChange} />

        {/* Radiology Studies Section */}
        <CaseRadiologySection onImagingChange={onImagingChange} />

        {/* Learning Points Section */}
        <CaseTextSection
          form={form}
          fieldName="learningPoints"
          title="Learning Points"
          placeholder="Key learning points for this case"
        />

        {/* Submit Button */}
        <div className={spacing.layouts.flex.between}>
          <div></div>
          <Button
            type="submit"
            disabled={isSaving}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
