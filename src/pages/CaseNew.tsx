import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { createCase, CreateCaseRequest } from "@/lib/api/cases";
import { useAuth } from "@/app/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InteractiveBodyDiagram } from "@/components/body-diagram/InteractiveBodyDiagram";
import { SymptomChecklist } from "@/features/symptoms/SymptomChecklist";

const caseSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

type CaseSchemaType = z.infer<typeof caseSchema>;

const CaseNew = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState<"case-details" | "clinical-details">("case-details");
  const [bodySelection, setBodySelection] = useState({
    selectedBodyParts: [] as string[],
    relatedSystems: [] as string[],
  });

  const form = useForm<CaseSchemaType>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
    },
  });

  const { mutate: createNewCase, isPending } = useMutation({
    mutationFn: (data: CreateCaseRequest) => createCase(data),
    onSuccess: () => {
      toast({ title: "Case created successfully!" });
      navigate("/cases");
    },
    onError: (error: Error) => {
      toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: CaseSchemaType) => {
    if (!user?.email) {
      toast({ title: "You must be logged in to create a case.", variant: "destructive" });
      return;
    }

    const requestData: CreateCaseRequest = {
      title: values.title,
      description: values.description,
      priority: values.priority,
      userId: user.email,
      bodySelection,
    };

    createNewCase(requestData);
  };

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Case</h1>

      <div className="mb-4">
        <Button
          variant={activeStep === "case-details" ? "default" : "outline"}
          onClick={() => setActiveStep("case-details")}
        >
          Case Details
        </Button>
        <Button
          variant={activeStep === "clinical-details" ? "default" : "outline"}
          onClick={() => setActiveStep("clinical-details")}
          className="ml-2"
        >
          Clinical Details
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {activeStep === "case-details" && (
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter case title" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the title of the case that will be displayed in the list.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter case description" className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>Write a brief description of the case.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Set the priority of the case.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {activeStep === "clinical-details" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InteractiveBodyDiagram
                  onBodyPartSelected={(part) => console.log("Body part selected:", part)}
                  highlightedSystems={bodySelection.relatedSystems}
                />
                <SymptomChecklist
                  onSymptomsSelected={(symptoms) => console.log("Symptoms selected:", symptoms)}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between">
            {activeStep === "clinical-details" && (
              <Button variant="secondary" onClick={() => setActiveStep("case-details")}>
                Previous
              </Button>
            )}
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Case"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CaseNew;
