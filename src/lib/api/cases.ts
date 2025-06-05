import { MedicalCase, BodyPart } from "@/types/case";

export interface CreateCaseRequest {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  userId: string;
  bodySelection?: {
    selectedBodyParts: BodyPart[];
    relatedSystems: string[];
  };
}

export const getCases = async (searchQuery?: string): Promise<MedicalCase[]> => {
  // For now, return mock data since we don't have a real API
  // In a real app, this would make an API call with the search query
  console.log("Getting cases with search query:", searchQuery);
  
  // Return empty array for now as the component will handle the empty state
  return [];
};

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

export const deleteCase = async (caseId: string): Promise<void> => {
  // Placeholder for future API integration
  console.log('Deleting case:', caseId);
  if (typeof window !== 'undefined') {
    const stored = JSON.parse(localStorage.getItem('cases') || '[]') as MedicalCase[];
    const updated = stored.filter((c) => c.id !== caseId);
    localStorage.setItem('cases', JSON.stringify(updated));
  }
}

