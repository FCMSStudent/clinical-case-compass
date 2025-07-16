
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { Scan } from "lucide-react";
import { SimpleImaging } from "@/features/cases/create/SimpleImaging";

interface CaseRadiologySectionProps {
  onImagingChange: (radiologyStudies: any[]) => void;
}

export const CaseRadiologySection: React.FC<CaseRadiologySectionProps> = ({
  onImagingChange
}) => {
  return (
    <Card className={medicalSection.container}>
      <CardHeader className={medicalSection.header}>
        <CardTitle className={medicalSection.title}>
          <Scan className={iconWithText} />
          Radiology Studies
        </CardTitle>
      </CardHeader>
      <CardContent className={medicalSection.content}>
        <SimpleImaging onImagingChange={onImagingChange} />
      </CardContent>
    </Card>
  );
};
