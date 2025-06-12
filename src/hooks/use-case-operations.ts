import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { MedicalCase } from '@/types/case';
import { CaseService, CaseCreationResult } from '@/lib/services/caseService';
import { useLocalStorage } from './use-local-storage';

export const useCaseOperations = () => {
  const navigate = useNavigate();
  const [storedCases, setStoredCases] = useLocalStorage<MedicalCase[]>("medical-cases", []);

  const createCase = useCallback(async (formData: any): Promise<CaseCreationResult> => {
    try {
      const result = CaseService.createCase(formData);
      
      if (result.success && result.case) {
        // Add to stored cases
        const updatedCases = storedCases ? [...storedCases, result.case] : [result.case];
        setStoredCases(updatedCases);
        
        toast.success("Case created successfully", {
          description: "Your new clinical case has been saved.",
        });
        
        // Navigate to case detail page
        navigate(`/cases/${result.case.id}`);
        
        return result;
      } else {
        toast.error("Failed to create case", {
          description: result.error || "An error occurred while saving your case.",
        });
        return result;
      }
    } catch (error) {
      console.error("Error creating case:", error);
      toast.error("Failed to create case", {
        description: "An unexpected error occurred.",
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }, [navigate, storedCases, setStoredCases]);

  const updateCase = useCallback((caseId: string, updates: Partial<MedicalCase>) => {
    try {
      const existingCase = CaseService.findCaseById(storedCases, caseId);
      if (!existingCase) {
        toast.error("Case not found");
        return false;
      }

      const updatedCase = CaseService.updateCase(existingCase, updates);
      const updatedCases = storedCases.map(c => c.id === caseId ? updatedCase : c);
      setStoredCases(updatedCases);
      
      toast.success("Case updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating case:", error);
      toast.error("Failed to update case");
      return false;
    }
  }, [storedCases, setStoredCases]);

  const deleteCase = useCallback((caseId: string) => {
    try {
      const updatedCases = CaseService.deleteCase(storedCases, caseId);
      setStoredCases(updatedCases);
      
      toast.success("Case deleted successfully");
      navigate("/cases");
      return true;
    } catch (error) {
      console.error("Error deleting case:", error);
      toast.error("Failed to delete case");
      return false;
    }
  }, [storedCases, setStoredCases, navigate]);

  const findCaseById = useCallback((caseId: string): MedicalCase | undefined => {
    return CaseService.findCaseById(storedCases, caseId);
  }, [storedCases]);

  return {
    createCase,
    updateCase,
    deleteCase,
    findCaseById,
    cases: storedCases,
  };
}; 