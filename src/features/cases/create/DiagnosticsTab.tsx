import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { LabResultsCard } from "../LabResultsCard";
import { RadiologyCard } from "../RadiologyCard";
import { TestTube, FileImage } from "lucide-react";

interface DiagnosticsTabProps {
  onLabChange: (labs: any[]) => void;
  onRadiologyChange: (studies: any[]) => void;
}

export const DiagnosticsTab = ({ onLabChange, onRadiologyChange }: DiagnosticsTabProps) => {
  const [labResults, setLabResults] = useState<any[]>([]);
  const [radiologyStudies, setRadiologyStudies] = useState<any[]>([]);

  const handleLabChange = (labs: any[]) => {
    setLabResults(labs);
    onLabChange(labs);
  };

  const handleRadiologyChange = (studies: any[]) => {
    setRadiologyStudies(studies);
    onRadiologyChange(studies);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TestTube className="h-5 w-5" />
              Laboratory Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LabResultsCard 
              labResults={labResults}
              onLabChange={handleLabChange}
            />
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileImage className="h-5 w-5" />
              Radiology Studies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadiologyCard 
              radiologyStudies={radiologyStudies}
              onRadiologyChange={handleRadiologyChange}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
