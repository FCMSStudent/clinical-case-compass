import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { Button } from "@/shared/components/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/tabs";
import { Badge } from "@/shared/components/badge";
import { Heart, TestTube, FileImage, Stethoscope } from "lucide-react";
import { InteractiveBodyDiagram } from "../InteractiveBodyDiagram";
import { InteractiveVitalsCard } from "../InteractiveVitalsCard";
import { SystemReviewChecklist } from "../SystemReviewChecklist";
import { DiagnosticsTab } from "./DiagnosticsTab";

interface ClinicalDetailStepProps {
  className?: string;
}

export const ClinicalDetailStep = ({ className }: ClinicalDetailStepProps) => {
  const [activeTab, setActiveTab] = useState("vitals");
  const [vitals, setVitals] = useState<Record<string, string>>({});
  const [systemSymptoms, setSystemSymptoms] = useState<Record<string, string[]>>({});
  const [bodyPartSelections, setBodyPartSelections] = useState<any[]>([]);
  const [labResults, setLabResults] = useState<any[]>([]);
  const [radiologyStudies, setRadiologyStudies] = useState<any[]>([]);

  const { setValue, getValues } = useFormContext();

  // Update form data when components change
  const updateClinicalDetails = () => {
    const clinicalDetails = {
      vitals,
      systemSymptoms,
      bodyPartSelections,
      labResults,
      radiologyStudies,
    };
    setValue("clinicalDetails", clinicalDetails);
  };

  const handleVitalsChange = (newVitals: Record<string, string>) => {
    setVitals(newVitals);
    updateClinicalDetails();
  };

  const handleSystemSymptomsChange = (symptoms: Record<string, string[]>) => {
    setSystemSymptoms(symptoms);
    updateClinicalDetails();
  };

  const handleBodyPartSelection = (selection: any) => {
    setBodyPartSelections(prev => [...prev, selection]);
    updateClinicalDetails();
  };

  const handleLabChange = (labs: any[]) => {
    setLabResults(labs);
    updateClinicalDetails();
  };

  const handleRadiologyChange = (studies: any[]) => {
    setRadiologyStudies(studies);
    updateClinicalDetails();
  };

  return (
    <div className={className}>
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Clinical Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 p-1 rounded-lg">
              <TabsTrigger value="vitals" className="text-white data-[state=active]:bg-white/20">
                <Heart className="h-4 w-4 mr-2" />
                Vitals
              </TabsTrigger>
              <TabsTrigger value="physical" className="text-white data-[state=active]:bg-white/20">
                <Stethoscope className="h-4 w-4 mr-2" />
                Physical
              </TabsTrigger>
              <TabsTrigger value="diagnostics" className="text-white data-[state=active]:bg-white/20">
                <TestTube className="h-4 w-4 mr-2" />
                Diagnostics
              </TabsTrigger>
              <TabsTrigger value="imaging" className="text-white data-[state=active]:bg-white/20">
                <FileImage className="h-4 w-4 mr-2" />
                Imaging
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vitals" className="space-y-4">
              <InteractiveVitalsCard 
                onVitalsChange={handleVitalsChange}
                patientAge={getValues("patientAge") || 30}
              />
            </TabsContent>

            <TabsContent value="physical" className="space-y-4">
              <div className="grid gap-6 lg:grid-cols-2">
                <SystemReviewChecklist 
                  onSymptomsChange={handleSystemSymptomsChange}
                />
                <InteractiveBodyDiagram 
                  onBodyPartSelected={handleBodyPartSelection}
                />
              </div>
            </TabsContent>

            <TabsContent value="diagnostics" className="space-y-4">
              <DiagnosticsTab 
                onLabChange={handleLabChange}
                onRadiologyChange={handleRadiologyChange}
              />
            </TabsContent>

            <TabsContent value="imaging" className="space-y-4">
              <div className="text-center p-8 text-white/70">
                <FileImage className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Advanced imaging upload functionality coming soon.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
