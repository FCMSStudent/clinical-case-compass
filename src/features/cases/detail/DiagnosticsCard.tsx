
import React from "react";
import { BentoCard } from "@/shared/components/bento-card";
import { TestTube, Scan } from "lucide-react";
import { SimpleLabs } from "@/features/cases/create/SimpleLabs";
import { SimpleImaging } from "@/features/cases/create/SimpleImaging";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/tabs";

interface DiagnosticsCardProps {
  onLabChange: (labs: any) => void;
  onImagingChange: (imaging: any) => void;
}

export const DiagnosticsCard: React.FC<DiagnosticsCardProps> = ({ 
  onLabChange, 
  onImagingChange 
}) => {
  return (
    <BentoCard
      layout="wide"
      variant="elevated"
      icon={<TestTube />}
      title="Diagnostic Studies"
    >
      <Tabs defaultValue="labs" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="labs" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Labs
          </TabsTrigger>
          <TabsTrigger value="imaging" className="flex items-center gap-2">
            <Scan className="h-4 w-4" />
            Imaging
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="labs" className="mt-0">
          <SimpleLabs onLabChange={onLabChange} />
        </TabsContent>
        
        <TabsContent value="imaging" className="mt-0">
          <SimpleImaging onImagingChange={onImagingChange} />
        </TabsContent>
      </Tabs>
    </BentoCard>
  );
};
