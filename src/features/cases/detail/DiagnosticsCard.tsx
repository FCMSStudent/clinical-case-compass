
import React from "react";
import { BentoCard } from "@/components/ui/bento-card";
import { TestTube, Scan } from "lucide-react";
import { SimpleLabs } from "@/features/cases/create/SimpleLabs";
import { SimpleImaging } from "@/features/cases/create/SimpleImaging";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      layout="large"
      variant="elevated"
      icon={<TestTube />}
      title="Diagnostic Studies"
    >
      <Tabs defaultValue="labs" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="labs" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Labs
          </TabsTrigger>
          <TabsTrigger value="imaging" className="flex items-center gap-2">
            <Scan className="h-4 w-4" />
            Imaging
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="labs" className="mt-4">
          <SimpleLabs onLabChange={onLabChange} />
        </TabsContent>
        
        <TabsContent value="imaging" className="mt-4">
          <SimpleImaging onImagingChange={onImagingChange} />
        </TabsContent>
      </Tabs>
    </BentoCard>
  );
};
