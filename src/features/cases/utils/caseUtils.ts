import { MedicalCase } from "@/types/case";

/**
 * Get the primary diagnosis from a medical case
 * @param caseData - The medical case data
 * @returns The primary diagnosis or null if none exists
 */
export function getPrimaryDiagnosis(caseData: MedicalCase) {
  if (!caseData.diagnoses?.length) return null;
  return (
    caseData.diagnoses.find((d) => d.status === "confirmed") ||
    caseData.diagnoses[0]
  );
}

/**
 * Validate that a medical case has the required data for rendering
 * @param medicalCase - The medical case to validate
 * @returns True if the case is valid, false otherwise
 */
export function isValidMedicalCase(medicalCase: MedicalCase): boolean {
  return !!(medicalCase && medicalCase.patient);
} 