
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { BookOpen, File, FileText, Video } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const ResourceItem = ({ 
  title, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
}) => {
  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-start space-y-0 pb-2">
        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary mr-3">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-xs mt-1">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

const Resources = () => {
  return (
    <div className="container">
      <PageHeader
        title="Study Resources"
        description="Organize and access your learning materials"
      >
        <Button>Add Resource</Button>
      </PageHeader>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="textbooks">Textbooks</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ResourceItem
              title="Harrison's Principles of Internal Medicine"
              description="Reference textbook"
              icon={BookOpen}
            />
            <ResourceItem
              title="AHA Guidelines for Management of STEMI"
              description="Clinical guideline"
              icon={FileText}
            />
            <ResourceItem
              title="Pathophysiology of Heart Failure"
              description="Educational video"
              icon={Video}
            />
            <ResourceItem
              title="Current Stroke Guidelines"
              description="Clinical guideline"
              icon={FileText}
            />
            <ResourceItem
              title="GOLD Guidelines for COPD"
              description="Clinical guideline"
              icon={FileText}
            />
            <ResourceItem
              title="Braunwald's Heart Disease"
              description="Reference textbook"
              icon={BookOpen}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="textbooks" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ResourceItem
              title="Harrison's Principles of Internal Medicine"
              description="Reference textbook"
              icon={BookOpen}
            />
            <ResourceItem
              title="Braunwald's Heart Disease"
              description="Reference textbook"
              icon={BookOpen}
            />
          </div>
        </TabsContent>

        <TabsContent value="articles" className="mt-6">
          <div className="text-center py-12 text-muted-foreground">
            <File className="h-12 w-12 mx-auto mb-4 text-muted-foreground/60" />
            <h3 className="text-lg font-medium mb-2">No articles yet</h3>
            <p className="max-w-md mx-auto">
              Add articles from journals and online sources to organize your reading materials
            </p>
            <Button className="mt-4">Add Article</Button>
          </div>
        </TabsContent>

        <TabsContent value="guidelines" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ResourceItem
              title="AHA Guidelines for Management of STEMI"
              description="Clinical guideline"
              icon={FileText}
            />
            <ResourceItem
              title="Current Stroke Guidelines"
              description="Clinical guideline"
              icon={FileText}
            />
            <ResourceItem
              title="GOLD Guidelines for COPD"
              description="Clinical guideline"
              icon={FileText}
            />
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ResourceItem
              title="Pathophysiology of Heart Failure"
              description="Educational video"
              icon={Video}
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Connected Cases</CardTitle>
          <CardDescription>
            Resources linked to your documented cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">AHA Guidelines for Management of STEMI</h4>
                <span className="text-xs bg-medical-100 text-medical-700 px-2 py-1 rounded-full">
                  Cardiology
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Connected to: Acute Chest Pain with ECG Changes
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Current Stroke Guidelines</h4>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  Neurology
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Connected to: Acute Onset Hemiparesis
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">GOLD Guidelines for COPD</h4>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Respiratory
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Connected to: Progressive Dyspnea with Cough
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import { Search } from "lucide-react";

export default Resources;
