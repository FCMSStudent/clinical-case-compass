import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/app/AuthContext';
import { toast } from '@/hooks/use-toast';
import { useErrorHandler } from './use-error-handler';
import { MedicalCase, Patient, Diagnosis, Resource, CaseTag, LabTest as ComponentLabTest, RadiologyStudy, DiagnosisStatus as ComponentDiagnosisStatus } from '@/types/case';
import { Database } from '@/integrations/supabase/types';

type DbCase = Database['public']['Tables']['medical_cases']['Row'];
type DbCaseInsert = Database['public']['Tables']['medical_cases']['Insert'];
type DbPatient = Database['public']['Tables']['patients']['Row'];
type DbDiagnosis = Database['public']['Tables']['diagnoses']['Row'];
type DbResource = Database['public']['Tables']['resources']['Row'];
type DbCaseTag = Database['public']['Tables']['case_tags']['Row'];

interface DbLabTest {
  id?: string;
  name?: string | null;
  value?: string | null;
  unit?: string | null;
  normalRange?: string | null;
}

interface DbRadiologyExam {
  id?: string;
  modality?: string | null;
  type?: string | null;
  findings?: string | null;
  impression?: string | null;
}

type DiagnosisStatus = 'pending' | 'confirmed' | 'ruled_out';

export function useSupabaseCases() {
  const { user, isOfflineMode } = useAuth();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();

  // Fetch all cases with simplified query
  const {
    data: cases = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['cases', user?.id],
    queryFn: async (): Promise<MedicalCase[]> => {
      if (!user) {
        throw new Error('User not authenticated');
      }

      if (isOfflineMode) {
        return [];
      }

      try {
        // First, get basic case data with patient info
        const { data: casesData, error: casesError } = await supabase
          .from('medical_cases')
          .select(`
            *,
            patient:patients(*)
          `)
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });

        if (casesError) {
          console.error("[useSupabaseCases] Error fetching cases:", casesError);
          throw casesError;
        }

        if (!casesData || casesData.length === 0) {
          return [];
        }

        // Transform the data with better error handling
        const transformedCases = casesData.map(caseData => {
          try {
            return transformDbCaseToMedicalCase(caseData);
          } catch (transformError) {
            console.error("[useSupabaseCases] Error transforming case:", caseData.id, transformError);
            // Return a minimal case object instead of failing completely
            return {
              id: caseData.id,
              title: caseData.title || 'Untitled Case',
              priority: "medium" as const,
              patient: caseData.patient ? {
                id: caseData.patient.id,
                name: caseData.patient.name || 'Unknown Patient',
                age: caseData.patient.age || 0,
                gender: caseData.patient.gender || 'unknown',
                medicalRecordNumber: caseData.patient.medical_record_number || ''
              } : {
                id: 'unknown',
                name: 'Unknown Patient',
                age: 0,
                gender: 'unknown',
                medicalRecordNumber: ''
              },
              createdAt: caseData.created_at,
              updatedAt: caseData.updated_at,
              chiefComplaint: caseData.chief_complaint || 'No complaint recorded',
              chiefComplaintAnalysis: caseData.chief_complaint_analysis || undefined,
              history: caseData.history || undefined,
              physicalExam: caseData.physical_exam || undefined,
              learningPoints: caseData.learning_points || undefined,
              vitals: (caseData.vitals as Record<string, string>) || {},
              symptoms: (caseData.symptoms as Record<string, string[]>) || {}, // Corrected type
              urinarySymptoms: (caseData.urinary_symptoms as string[]) || [],
              labTests: [],
              radiologyStudies: [],
              diagnoses: [],
              resources: [],
              tags: [],
              status: "draft" as const
            };
          }
        });

        return transformedCases;

      } catch (error) {
        console.error("[useSupabaseCases] Query failed:", error);
        throw error;
      }
    },
    enabled: !!user && !isOfflineMode,
    retry: 1,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Fetch single case
  const useGetCaseQuery = (id: string) => useQuery({
    queryKey: ['case', id],
    queryFn: async (): Promise<MedicalCase | null> => {
      if (!user) throw new Error('User not authenticated');
      if (isOfflineMode) return null;

      const { data, error } = await supabase
        .from('medical_cases')
        .select(`
          *,
          patient:patients(*),
          diagnoses(*),
          resources(*),
          case_tag_assignments(
            case_tags(*)
          )
        `)
        .eq('id', id)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return transformDbCaseToMedicalCase(data);
    },
    enabled: !!user && !!id && !isOfflineMode
  });

  // Create case mutation
  const createCaseMutation = useMutation({
    mutationFn: async (caseData: {
      patient: Omit<Patient, 'id'>;
      case: Omit<MedicalCase, 'id' | 'patient' | 'createdAt' | 'updatedAt' | 'diagnoses' | 'tags' | 'resources'>;
      diagnoses?: Omit<Diagnosis, 'id'>[];
      resources?: Omit<Resource, 'id'>[];
      tagIds?: string[];
    }) => {
      if (!user) throw new Error('User not authenticated');
      if (isOfflineMode) throw new Error('Cannot create cases in offline mode');

      // Create patient first
      const { data: patientData, error: patientError } = await supabase
        .from('patients')
        .insert({
          name: caseData.patient.name,
          age: caseData.patient.age,
          gender: caseData.patient.gender,
          medical_record_number: caseData.patient.medicalRecordNumber,
          user_id: user.id
        })
        .select()
        .single();

      if (patientError) throw patientError;

      // Create case
      const caseInsertData: DbCaseInsert = {
        title: caseData.case.title,
        chief_complaint: caseData.case.chiefComplaint,
        chief_complaint_analysis: caseData.case.chiefComplaintAnalysis,
        history: caseData.case.history,
        physical_exam: caseData.case.physicalExam,
        learning_points: caseData.case.learningPoints,
        vitals: caseData.case.vitals || {},
        symptoms: caseData.case.symptoms || {},
        urinary_symptoms: caseData.case.urinarySymptoms || [],
        lab_tests: (caseData.case.labTests || []) as unknown as Database['public']['Tables']['medical_cases']['Insert']['lab_tests'],
        // The DB column is still radiology_exams, but we populate it from radiologyStudies
        radiology_exams: (caseData.case.radiologyStudies || []) as unknown as Database['public']['Tables']['medical_cases']['Insert']['radiology_exams'],
        user_id: user.id,
        patient_id: patientData.id
      };

      const { data: caseDbData, error: caseError } = await supabase
        .from('medical_cases')
        .insert(caseInsertData)
        .select()
        .single();

      if (caseError) throw caseError;

      // Create diagnoses if provided
      if (caseData.diagnoses?.length) {
        const { error: diagnosesError } = await supabase
          .from('diagnoses')
          .insert(
            caseData.diagnoses.map(diagnosis => ({
              name: diagnosis.name,
              status: diagnosis.status,
              notes: diagnosis.notes,
              case_id: caseDbData.id
            }))
          );

        if (diagnosesError) throw diagnosesError;
      }

      // Create resources if provided
      if (caseData.resources?.length) {
        const { error: resourcesError } = await supabase
          .from('resources')
          .insert(
            caseData.resources.map(resource => ({
              title: resource.title,
              type: resource.type,
              url: resource.url,
              notes: resource.notes,
              case_id: caseDbData.id
            }))
          );

        if (resourcesError) throw resourcesError;
      }

      // Create tag assignments if provided
      if (caseData.tagIds?.length) {
        const { error: tagsError } = await supabase
          .from('case_tag_assignments')
          .insert(
            caseData.tagIds.map(tagId => ({
              case_id: caseDbData.id,
              tag_id: tagId
            }))
          );

        if (tagsError) throw tagsError;
      }

      return caseDbData.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
    onError: (error) => {
      handleError(error, 'creating case');
    }
  });

  const createCase = (
    caseData: Parameters<typeof createCaseMutation.mutate>[0],
    options?: {
      onSuccess?: (caseId: string) => void;
      onError?: (error: Error) => void;
    }
  ) => {
    createCaseMutation.mutate(caseData, {
      onSuccess: (caseId) => {
        options?.onSuccess?.(caseId);
      },
      onError: (error) => {
        options?.onError?.(error as Error);
      }
    });
  };

  // Fetch available tags
  const {
    data: availableTags = [],
    isLoading: tagsLoading
  } = useQuery({
    queryKey: ['case-tags'],
    queryFn: async (): Promise<CaseTag[]> => {
      if (isOfflineMode) return [];
      
      const { data, error } = await supabase
        .from('case_tags')
        .select('*')
        .order('name');

      if (error) throw error;

      return data.map(tag => ({
        id: tag.id,
        name: tag.name,
        color: tag.color
      }));
    },
    enabled: !isOfflineMode
  });

  return {
    cases,
    isLoading,
    error,
    useGetCaseQuery,
    createCase,
    isCreating: createCaseMutation.isPending,
    availableTags,
    tagsLoading
  };
}

// Improved transform function with better error handling
function transformDbCaseToMedicalCase(dbCase: Record<string, unknown>): MedicalCase {
  try {
    // Defensive checks for required fields
    if (!dbCase.id || !dbCase.title || !dbCase.chief_complaint) {
      throw new Error(`Missing required case fields: ${JSON.stringify({
        id: !!dbCase.id,
        title: !!dbCase.title,
        chief_complaint: !!dbCase.chief_complaint
      })}`);
    }

    // Ensure patient exists
    if (!dbCase.patient) {
      throw new Error('Patient data is missing');
    }

    const patient = dbCase.patient as DbPatient;
    if (!patient.id || !patient.name) {
      throw new Error(`Invalid patient data: ${JSON.stringify({
        id: !!patient.id,
        name: !!patient.name
      })}`);
    }

    return {
      id: dbCase.id as string,
      title: dbCase.title as string,
      priority: "medium",
      patient: {
        id: patient.id,
        name: patient.name,
        age: patient.age || 0,
        gender: patient.gender || 'unknown',
        medicalRecordNumber: patient.medical_record_number || ''
      },
      createdAt: dbCase.created_at as string,
      updatedAt: dbCase.updated_at as string,
      chiefComplaint: dbCase.chief_complaint as string,
      chiefComplaintAnalysis: dbCase.chief_complaint_analysis as string | undefined,
      history: dbCase.history as string | undefined,
      physicalExam: dbCase.physical_exam as string | undefined,
      learningPoints: dbCase.learning_points as string | undefined,
      vitals: (dbCase.vitals as Record<string, string>) || {},
      symptoms: (dbCase.symptoms as Record<string, string[]>) || {}, // Corrected type
      urinarySymptoms: (dbCase.urinary_symptoms as string[]) || [],
      labTests: ((dbCase.lab_tests as DbLabTest[]) || []).map((test) => ({
        id: test.id ?? (() => { console.error('Lab test missing ID:', test); return `error-missing-id-${Math.random()}`; })(),
        name: test.name ?? '',
        value: test.value ?? '',
        unit: test.unit ?? '',
        normalRange: test.normalRange ?? undefined
      })) as ComponentLabTest[],
      radiologyStudies: ((dbCase.radiology_exams as DbRadiologyExam[]) || []).map((study) => ({
        id: study.id ?? (() => { console.error('Radiology study missing ID:', study); return `error-missing-id-${Math.random()}`; })(),
        name: study.modality ?? 'Unknown Study', // Use modality for name, or a default
        type: study.type ?? 'Unknown', // exam.type is modality like CT, X-Ray
        findings: study.findings ?? '',
        impression: study.impression ?? undefined,
        date: dbCase.updated_at as string // Fallback to case update date, ideally this should be in DB
      })) as RadiologyStudy[],
      diagnoses: ((dbCase.diagnoses as DbDiagnosis[]) || []).map((d: DbDiagnosis) => ({
        id: d.id,
        name: d.name,
        status: d.status as ComponentDiagnosisStatus,
        notes: d.notes
      })),
      resources: ((dbCase.resources as DbResource[]) || []).map((r: DbResource) => ({
        id: r.id,
        title: r.title,
        type: r.type as Resource['type'],
        url: r.url,
        notes: r.notes
      })),
      tags: ((dbCase.case_tag_assignments as { case_tags: DbCaseTag }[]) || []).map((assignment: { case_tags: Pick<DbCaseTag, 'id' | 'name' | 'color'> }) => ({
        id: assignment.case_tags.id,
        name: assignment.case_tags.name,
        color: assignment.case_tags.color
      })),
      status: "draft"
    };
  } catch (error) {
    console.error('[transformDbCaseToMedicalCase] Error transforming case:', error);
    throw new Error(`Failed to transform case data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
