import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/app/AuthContext';
import { toast } from '@/hooks/use-toast';
import { useErrorHandler } from './use-error-handler';
import { MedicalCase, Patient, Diagnosis, Resource, CaseTag, LabTest as ComponentLabTest, RadiologyExam as ComponentRadiologyExam, DiagnosisStatus as ComponentDiagnosisStatus } from '@/types/case';
import { Database } from '@/integrations/supabase/types';

type DbCase = Database['public']['Tables']['medical_cases']['Row'];
type DbCaseInsert = Database['public']['Tables']['medical_cases']['Insert'];
type DbPatient = Database['public']['Tables']['patients']['Row'];
type DbDiagnosis = Database['public']['Tables']['diagnoses']['Row'];
type DbResource = Database['public']['Tables']['resources']['Row'];
type DbCaseTag = Database['public']['Tables']['case_tags']['Row'];

// Use the more flexible DB types for incoming data
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
  type?: string | null; // Keep type as it exists in both
  findings?: string | null;
  impression?: string | null;
}

type DiagnosisStatus = 'pending' | 'confirmed' | 'ruled_out';

export function useSupabaseCases() {
  const { user } = useAuth();
  const { handleError } = useErrorHandler();
  const queryClient = useQueryClient();

  // Fetch all cases
  const {
    data: cases = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['cases', user?.id],
    queryFn: async (): Promise<MedicalCase[]> => {
      if (!user) throw new Error('User not authenticated');

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
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      return data.map(transformDbCaseToMedicalCase);
    },
    enabled: !!user
  });

  // Fetch single case
  const useGetCaseQuery = (id: string) => useQuery({
    queryKey: ['case', id],
    queryFn: async (): Promise<MedicalCase | null> => {
      if (!user) throw new Error('User not authenticated');

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
    enabled: !!user && !!id
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

      // Create case - explicitly type the insert object and cast arrays to Json
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
        radiology_exams: (caseData.case.radiologyExams || []) as unknown as Database['public']['Tables']['medical_cases']['Insert']['radiology_exams'],
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

  // Fetch available tags
  const {
    data: availableTags = [],
    isLoading: tagsLoading
  } = useQuery({
    queryKey: ['case-tags'],
    queryFn: async (): Promise<CaseTag[]> => {
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
    }
  });

  return {
    cases,
    isLoading,
    error,
    useGetCaseQuery,
    createCase: createCaseMutation.mutate,
    isCreating: createCaseMutation.isPending,
    availableTags,
    tagsLoading
  };
}

// Transform database case to MedicalCase type
function transformDbCaseToMedicalCase(dbCase: Record<string, unknown>): MedicalCase {
  return {
    id: dbCase.id as string,
    title: dbCase.title as string,
    priority: "medium", // Default priority since it's not stored in database yet
    patient: {
      id: (dbCase.patient as DbPatient).id,
      name: (dbCase.patient as DbPatient).name,
      age: (dbCase.patient as DbPatient).age,
      gender: (dbCase.patient as DbPatient).gender,
      medicalRecordNumber: (dbCase.patient as DbPatient).medical_record_number
    },
    createdAt: dbCase.created_at as string,
    updatedAt: dbCase.updated_at as string,
    chiefComplaint: dbCase.chief_complaint as string,
    chiefComplaintAnalysis: dbCase.chief_complaint_analysis as string | undefined,
    history: dbCase.history as string | undefined,
    physicalExam: dbCase.physical_exam as string | undefined,
    learningPoints: dbCase.learning_points as string | undefined,
    vitals: (dbCase.vitals || {}) as Record<string, string>,
    symptoms: (dbCase.symptoms || {}) as Record<string, boolean>,
    urinarySymptoms: (dbCase.urinary_symptoms || []) as string[],
    // Use DbLabTest interface and ensure properties are handled for ComponentLabTest
    labTests: ((dbCase.lab_tests || []) as DbLabTest[]).map((test) => ({
      id: test.id ?? `lab-${Date.now()}-${Math.random()}`,
      name: test.name ?? '',
      value: test.value ?? '',
      unit: test.unit ?? '',
      normalRange: test.normalRange ?? undefined // Ensure normalRange is handled
    })) as ComponentLabTest[],
    // Use DbRadiologyExam interface and ensure properties are handled for ComponentRadiologyExam
    radiologyExams: ((dbCase.radiology_exams || []) as DbRadiologyExam[]).map((exam) => ({
      id: exam.id ?? `rad-${Date.now()}-${Math.random()}`,
      modality: exam.modality ?? exam.type ?? '', // Prioritize modality, fallback to type
      findings: exam.findings ?? '',
      impression: exam.impression ?? undefined // Ensure impression is handled
    })) as ComponentRadiologyExam[],
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
    status: "draft" // Add missing status field
  };
}
