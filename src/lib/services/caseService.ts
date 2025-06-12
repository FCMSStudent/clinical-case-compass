import { v4 as uuidv4 } from "uuid";
import { MedicalCase } from "@/types/case";
import { CreateCaseFormData } from "@/pages/CreateCaseFlow";

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
    const errors: string[] = [];

    if (!caseData.title?.trim()) {
      errors.push("Case title is required");
    }

    if (!caseData.chiefComplaint?.trim()) {
      errors.push("Chief complaint is required");
    }

    if (!caseData.patient?.name?.trim()) {
      errors.push("Patient name is required");
    }

    if (!caseData.patient?.age || caseData.patient.age <= 0) {
      errors.push("Valid patient age is required");
    }

    return {
      isValid: errors.length === 0,
      errors,
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