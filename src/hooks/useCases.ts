import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { MedicalCase, Patient, CaseTag } from '@/types/case';

// Define a more specific type for the data returned by this hook for summaries.
export interface CaseSummary {
  id: MedicalCase['id'];
  title: MedicalCase['title'];
  patient: Pick<Patient, 'name' | 'age' | 'gender'>; // Select specific patient fields
  updatedAt: MedicalCase['updatedAt'];
  tags: Pick<CaseTag, 'id' | 'name' | 'color'>[]; // Array of tags with specific fields
}

export function useCases() {
  const [cases, setCases] = useState<CaseSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCases = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Assuming 'medical_cases' is the table name.
      // Adjust the select query based on actual Supabase table structure and relationships.
      // If 'patient' and 'tags' are foreign relationships, Supabase handles fetching them like this.
      // If they are JSON columns, the select might need to be simpler e.g. 'id, title, patient, updatedAt, tags'
      const { data, error: supabaseError } = await supabase
        .from('medical_cases') 
        .select(`
          id,
          title,
          patient:patients ( name, age, gender ), 
          updatedAt,
          tags:case_tags ( id, name, color )
        `) // This assumes 'patients' and 'case_tags' are related tables.
           // If 'patient' is a JSONB column on 'medical_cases', it would be 'patient->name, patient->age', etc.
           // Or just 'patient' if the whole object is needed.
           // For simplicity and matching RecentCasesList, fetching specific sub-fields is better if possible.
        .order('updatedAt', { ascending: false });

      if (supabaseError) {
        // Check if the error is due to relationship not found, which might mean patient/tags are JSONB
        if (supabaseError.message.includes("relation") && supabaseError.message.includes("does not exist")) {
            // Fallback query for JSONB columns (example)
            const { data: jsonData, error: jsonError } = await supabase
              .from('medical_cases')
              .select('id, title, patient, updatedAt, tags') // Assuming patient and tags are JSON columns
              .order('updatedAt', { ascending: false });

            if (jsonError) throw jsonError;
            
            // We need to ensure the structure matches CaseSummary, especially for patient
            const transformedData = jsonData?.map(item => ({
                ...item,
                patient: { // Assuming item.patient is an object with name, age, gender
                    name: item.patient?.name,
                    age: item.patient?.age,
                    gender: item.patient?.gender,
                }
            })) || [];
            setCases(transformedData as CaseSummary[]);

        } else {
          throw supabaseError;
        }
      } else {
        setCases(data as CaseSummary[] || []);
      }
    } catch (err) {
      setError(err as Error);
      console.error("Error fetching cases:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  return { cases, isLoading, error, refreshCases: fetchCases };
}
