
import { MedicalCase } from "@/types/case";

export interface CreateCaseRequest {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  userId: string;
  bodySelection?: {
    selectedBodyParts: any[];
    relatedSystems: any[];
  };
}

export const createCase = async (data: CreateCaseRequest): Promise<MedicalCase> => {
  // For now, return a mock response since we don't have a real API
  // In a real app, this would make an API call
  console.log("Creating case with data:", data);
  
  const newCase: MedicalCase = {
    id: Date.now().toString(),
    title: data.title,
    priority: data.priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    patient: {
      id: "patient-1",
      name: "Sample Patient",
      age: 30,
      gender: "male"
    },
    chiefComplaint: "Sample chief complaint",
    diagnoses: [],
    tags: [],
    resources: []
  };

  return newCase;
};
