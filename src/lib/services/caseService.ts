
import { v4 as uuidv4 } from "uuid";
import { MedicalCase } from "@/types/case";

// Define the form data type locally since it's not properly exported
export interface CreateCaseFormData {
  caseTitle: string;
  chiefComplaint: string;
  specialty?: string;
  patientName: string;
  patientAge?: number;
  patientSex?: "male" | "female" | "other" | "unknown";
  medicalRecordNumber?: string;
  medicalHistory?: string;
  vitals?: Record<string, string>;
  selectedBodyParts?: string[];
  systemSymptoms?: Record<string, boolean>;
  physicalExam?: string;
  labResults?: any[];
  radiologyStudies?: any[];
  learningPoints?: string;
  resourceLinks?: any[];
}

export interface CaseCreationResult {
  success: boolean;
  case?: MedicalCase;
  error?: string;
}

export class CaseService {
  /**
   * Creates a new medical case from form data
   */
  static createCase(formData: CreateCaseFormData): CaseCreationResult {
    try {
      const newCase: MedicalCase = {
        id: uuidv4(),
        title: formData.caseTitle,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        priority: "medium",
        chiefComplaint: formData.chiefComplaint,
        patient: {
          id: uuidv4(), // Add missing id field
          name: formData.patientName,
          age: formData.patientAge || 0,
          gender: formData.patientSex === "unknown" ? "male" : formData.patientSex || "male",
          medicalRecordNumber: formData.medicalRecordNumber,
        },
        vitals: formData.vitals,
        history: formData.medicalHistory,
        physicalExam: formData.physicalExam,
        learningPoints: formData.learningPoints,
        labTests: formData.labResults,
        radiologyStudies: formData.radiologyStudies,
        diagnoses: [],
        tags: [],
        resources: [],
        status: "draft",
      };

      return {
        success: true,
        case: newCase,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create case",
      };
    }
  }

  /**
   * Validates case data
   */
  static validateCase(caseData: Partial<MedicalCase>): { isValid: boolean; errors: string[] } {
    // No required field validation, always return valid
    return {
      isValid: true,
      errors: [],
    };
  }

  /**
   * Updates case data
   */
  static updateCase(existingCase: MedicalCase, updates: Partial<MedicalCase>): MedicalCase {
    return {
      ...existingCase,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Deletes a case
   */
  static deleteCase(cases: MedicalCase[], caseId: string): MedicalCase[] {
    return cases.filter(c => c.id !== caseId);
  }

  /**
   * Finds a case by ID
   */
  static findCaseById(cases: MedicalCase[], caseId: string): MedicalCase | undefined {
    return cases.find(c => c.id === caseId);
  }
} 
