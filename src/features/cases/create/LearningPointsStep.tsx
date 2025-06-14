
import React, { memo } from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  FileText, 
  Link as LinkIcon,
  Plus,
  X,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  StepHeader, 
  StatusFieldCard 
} from "./components";
import { useFormValidation } from "@/hooks/use-form-validation";

interface ResourceLink {
  url: string;
  description: string;
}

interface LearningPointsFormData {
  learningPoints: string;
  generalNotes: string;
  resourceLinks: ResourceLink[];
}

export interface LearningPointsStepProps<T extends FieldValues = LearningPointsFormData> {
  className?: string;
}

export const LearningPointsStep = memo(function LearningPointsStep<
  T extends FieldValues = LearningPointsFormData,
>({ className }: LearningPointsStepProps<T>) {
  const { control, watch, setValue } = useFormContext<T>();
  
  const { errors, watchedFields } = useFormValidation<T>({
    requiredFields: ["learningPoints"],
    watchFields: [
      "learningPoints", 
      "generalNotes", 
      "resourceLinks"
    ],
  });

  const learningPointsValue = (watchedFields as any)?.learningPoints;
  const generalNotesValue = (watchedFields as any)?.generalNotes;
  const resourceLinksValue = (watchedFields as any)?.resourceLinks || [];

  const addResourceLink = () => {
    const currentLinks = watch("resourceLinks" as Path<T>) || [];
    const newLinks = [...currentLinks, { url: "", description: "" }];
    setValue("resourceLinks" as Path<T>, newLinks as any, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const removeResourceLink = (index: number) => {
    const currentLinks = watch("resourceLinks" as Path<T>) || [];
    const newLinks = currentLinks.filter((_, i) => i !== index);
    setValue("resourceLinks" as Path<T>, newLinks as any, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const updateResourceLink = (index: number, field: 'url' | 'description', value: string) => {
    const currentLinks = watch("resourceLinks" as Path<T>) || [];
    const newLinks = [...currentLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setValue("resourceLinks" as Path<T>, newLinks as any, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  return (
    <div className={cn("space-y-6", className)}>
      <StepHeader
        title="Learning Points & Resources"
        description="Document key learning objectives and educational outcomes from this clinical case."
        icon={BookOpen}
      />

      {/* Bentogrid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
        {/* Learning Points - Large prominent card spanning 2 columns */}
        <StatusFieldCard
          icon={Lightbulb}
          title="Key Learning Points"
          tooltip="Outline the main educational objectives and clinical insights that students should gain from this case."
          isRequired
          fieldValue={learningPointsValue}
          hasError={!!errors.learningPoints}
          className="md:col-span-2 lg:col-span-3"
        >
          <FormField
            control={control}
            name={"learningPoints" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Understanding the differential diagnosis of chest pain, recognition of cardiac risk factors, interpretation of ECG changes..."
                    rows={6}
                    className="bg-slate-700/50 border-slate-500/50 text-slate-100 placeholder:text-slate-400 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </StatusFieldCard>

        {/* General Notes - Medium spanning card */}
        <StatusFieldCard
          icon={FileText}
          title="Additional Notes"
          tooltip="Any supplementary information, teaching tips, or contextual notes for educators."
          fieldValue={generalNotesValue}
          hasError={!!errors.generalNotes}
          className="md:col-span-2"
        >
          <FormField
            control={control}
            name={"generalNotes" as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="e.g., This case is particularly relevant for emergency medicine residents, consider discussing the importance of early recognition..."
                    rows={4}
                    className="bg-slate-700/50 border-slate-500/50 text-slate-100 placeholder:text-slate-400 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </StatusFieldCard>

        {/* Resource Links - Standalone card */}
        <StatusFieldCard
          icon={LinkIcon}
          title="Educational Resources"
          tooltip="Add relevant links to guidelines, research papers, or educational materials that complement this case."
          fieldValue={resourceLinksValue}
          hasError={!!errors.resourceLinks}
          className="lg:col-span-1"
        >
          <div className="space-y-3">
            {resourceLinksValue.map((link: ResourceLink, index: number) => (
              <div key={index} className="space-y-2 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">Resource {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeResourceLink(index)}
                    className="h-6 w-6 p-0 text-slate-400 hover:text-white hover:bg-slate-600/50"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <Input
                  placeholder="Description (e.g., AHA Guidelines for Chest Pain)"
                  value={link.description}
                  onChange={(e) => updateResourceLink(index, 'description', e.target.value)}
                  className="bg-slate-700/50 border-slate-500/50 text-slate-100 placeholder:text-slate-400 text-sm"
                />
                <Input
                  placeholder="URL (e.g., https://www.ahajournals.org/...)"
                  value={link.url}
                  onChange={(e) => updateResourceLink(index, 'url', e.target.value)}
                  className="bg-slate-700/50 border-slate-500/50 text-slate-100 placeholder:text-slate-400 text-sm"
                />
              </div>
            ))}
            
            <Button
              type="button"
              onClick={addResourceLink}
              size="sm"
              className="bg-blue-500/80 hover:bg-blue-600 text-white w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Resource Link
            </Button>
          </div>
        </StatusFieldCard>
      </div>
    </div>
  );
});

LearningPointsStep.displayName = "LearningPointsStep";
