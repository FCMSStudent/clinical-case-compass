
import React, { memo } from "react";
import { useFormContext, Controller, Path } from "react-hook-form";
import { TabsContent } from "@/shared/components/tabs";
import { FormMessage } from "@/shared/components/form";
import { 
  Microscope as MicroscopeIcon,
  Scan as ScanIcon,
} from "lucide-react";
import { StatusFieldCard } from './components/StatusFieldCard';
import { SimpleLabs } from "./SimpleLabs";
import { SimpleImaging } from "./SimpleImaging";
import type { ClinicalDetailFormData } from "./ClinicalDetailConfig";

const FORM_FIELDS = {
  LAB_RESULTS: "labResults",
  RADIOLOGY_STUDIES: "radiologyStudies",
} as const;

export const DiagnosticsTab = memo(() => {
  const { setValue, control, watch, formState } = useFormContext<ClinicalDetailFormData>();

  const labResultsValue = watch(FORM_FIELDS.LAB_RESULTS as Path<ClinicalDetailFormData>);
  const radiologyStudiesValue = watch(FORM_FIELDS.RADIOLOGY_STUDIES as Path<ClinicalDetailFormData>);

  return (
    <TabsContent value="diagnostics" className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <StatusFieldCard
          icon={MicroscopeIcon}
          title="Laboratory Studies"
          fieldValue={labResultsValue}
          hasError={!!formState.errors[FORM_FIELDS.LAB_RESULTS]}
        >
          <SimpleLabs onLabChange={(labs) => setValue(FORM_FIELDS.LAB_RESULTS as Path<ClinicalDetailFormData>, labs, { shouldValidate: true })} />
          <Controller 
            name={FORM_FIELDS.LAB_RESULTS as Path<ClinicalDetailFormData>} 
            control={control} 
            render={({ fieldState }) => fieldState.error ? <FormMessage className="mt-2">{fieldState.error.message}</FormMessage> : null} 
          />
        </StatusFieldCard>
        
        <StatusFieldCard
          icon={ScanIcon}
          title="Imaging Studies"
          fieldValue={radiologyStudiesValue}
          hasError={!!formState.errors[FORM_FIELDS.RADIOLOGY_STUDIES]}
        >
          <SimpleImaging onImagingChange={(studies) => setValue(FORM_FIELDS.RADIOLOGY_STUDIES as Path<ClinicalDetailFormData>, studies, { shouldValidate: true })} />
          <Controller 
            name={FORM_FIELDS.RADIOLOGY_STUDIES as Path<ClinicalDetailFormData>} 
            control={control} 
            render={({ fieldState }) => fieldState.error ? <FormMessage className="mt-2">{fieldState.error.message}</FormMessage> : null} 
          />
        </StatusFieldCard>
      </div>
    </TabsContent>
  );
});
DiagnosticsTab.displayName = "DiagnosticsTab";
