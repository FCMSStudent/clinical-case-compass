import React, { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InteractiveBodyDiagram } from "@/components/body-diagram/InteractiveBodyDiagram";
import { SymptomChecklist } from "@/components/symptoms/SymptomChecklist";
import { toast } from "@/components/ui/use-toast";
import { createCase, CreateCaseRequest } from "@/lib/api/cases";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * SCHEMA & TYPES
 * ────────────────────────────────────────────────────────────────────────────────
 */
const detailsSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
});

/**
 * Combine clinical selection in a nested object so we can hand everything to the
 * back-end in a single payload.
 */
const clinicalSchema = z.object({
  selectedBodyParts: z.array(z.string()).default([]),
  relatedSystems: z.array(z.string()).default([]),
  symptoms: z.record(z.array(z.string())).default({}),
});

type DetailsForm = z.infer<typeof detailsSchema>;
export type ClinicalSelection = z.infer<typeof clinicalSchema>;

enum Step {
  DETAILS = "details",
  CLINICAL = "clinical",
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * COMPONENT
 * ────────────────────────────────────────────────────────────────────────────────
 */
export const CaseNew: React.FC = memo(() => {
  /** Router / auth / react-query hooks */
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    mutate: createNewCase,
    isPending: isSubmitting,
  } = useMutation({
    mutationFn: (data: CreateCaseRequest) => createCase(data),
    onSuccess: () => {
      toast({ title: "Case created successfully!" });
      navigate("/cases");
    },
    onError: (error: any) => {
      toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  /** Form hooks */
  const detailsForm = useForm<DetailsForm>({
    resolver: zodResolver(detailsSchema),
    defaultValues: { title: "", description: "", priority: "medium" },
  });

  /** Clinical selection state (simple since it’s mostly clicks) */
  const [clinicalSel, setClinicalSel] = useState<ClinicalSelection>({
    selectedBodyParts: [],
    relatedSystems: [],
    symptoms: {},
  });

  const [step, setStep] = useState<Step>(Step.DETAILS);

  /** ———————————— Handlers ———————————— */
  const nextStep = useCallback(() => setStep(Step.CLINICAL), []);
  const prevStep = useCallback(() => setStep(Step.DETAILS), []);

  const handleBodySelect = useCallback((part: string) => {
    setClinicalSel((prev) => {
      const exists = prev.selectedBodyParts.includes(part);
      const parts = exists ? prev.selectedBodyParts.filter((p) => p !== part) : [...prev.selectedBodyParts, part];
      return { ...prev, selectedBodyParts: parts };
    });
  }, []);

  const handleSymptoms = useCallback((symptoms: Record<string, string[]>) => {
    setClinicalSel((prev) => ({ ...prev, symptoms }));
  }, []);

  const submitDetails: SubmitHandler<DetailsForm> = (values) => {
    if (!user?.email) {
      toast({ title: "You must be logged in to create a case.", variant: "destructive" });
      return;
    }

    // Merge both steps into one payload
    const payload: CreateCaseRequest = {
      ...values,
      userId: user.email,
      bodySelection: clinicalSel,
    } as CreateCaseRequest;

    createNewCase(payload);
  };

  /** ———————————— Render ———————————— */
  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Create New Case</h1>

      {/* Step selector buttons */}
      <div className="mb-6 flex gap-2">
        <Button variant={step === Step.DETAILS ? "default" : "outline"} onClick={prevStep}>
          Case Details
        </Button>
        <Button variant={step === Step.CLINICAL ? "default" : "outline"} onClick={nextStep}>
          Clinical Details
        </Button>
      </div>

      {/* DETAILS FORM */}
      {step === Step.DETAILS && (
        <Form {...detailsForm}>
          <form onSubmit={detailsForm.handleSubmit(submitDetails)} className="space-y-8">
            {/* Title */}
            <FormField
              control={detailsForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter case title" {...field} />
                  </FormControl>
                  <FormDescription>Displayed title in the case list.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Description */}
            <FormField
              control={detailsForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief case description" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Priority */}
            <FormField
              control={detailsForm.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={nextStep}>
                Next
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating…" : "Create Case"}
              </Button>
            </div>
          </form>
        </Form>
      )}

      {/* CLINICAL STEP */}
      {step === Step.CLINICAL && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <InteractiveBodyDiagram
              onBodyPartSelected={handleBodySelect}
              highlightedSystems={clinicalSel.selectedBodyParts}
            />
            <SymptomChecklist onSymptomsSelected={handleSymptoms} />
          </div>

          {/* Actions */}
          <div className="flex justify-between gap-2">
            <Button variant="secondary" onClick={prevStep}>
              Previous
            </Button>
            <Button onClick={detailsForm.handleSubmit(submitDetails)} disabled={isSubmitting}>
              {isSubmitting ? "Creating…" : "Create Case"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
});

CaseNew.displayName = "CaseNew";
