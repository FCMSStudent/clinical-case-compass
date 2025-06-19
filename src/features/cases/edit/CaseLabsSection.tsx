import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestTube } from "lucide-react";
import { SimpleLabs } from "@/features/cases/create/SimpleLabs";
import { medicalSection, iconWithText } from "@/lib/ui-styles";
import { LabTest } from "@/types/case";

interface CaseLabsSectionProps {
  onLabChange: (labResults: LabTest[]) => void;
}

export const CaseLabsSection: React.FC<CaseLabsSectionProps> = ({
  onLabChange
}) => {
  return (
    <Card className={medicalSection.container}>
      <CardHeader className={medicalSection.header}>
        <CardTitle className={medicalSection.title}>
          <TestTube className={iconWithText} />
          Laboratory Results
        </CardTitle>
      </CardHeader>
      <CardContent className={medicalSection.content}>
        <SimpleLabs onLabChange={onLabChange} />
      </CardContent>
    </Card>
  );
};
