
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useErrorHandler } from './use-error-handler';
import { MedicalCase, Patient, Diagnosis, Resource, CaseTag } from '@/types/case';
import { Database } from '@/integrations/supabase/types';

type DbCase = Database['public']['Tables']['medical_cases']['Row'];
type DbPatient = Database['public']['Tables']['patients']['Row'];
type DbDiagnosis = Database['public']['Tables']['diagnoses']['Row'];
type DbResource = Database['public']['Tables']['resources']['Row'];
type DbCaseTag = Database['public']['Tables']['case_tags']['Row'];

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
  const getCaseQuery = (id: string) => useQuery({
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
          ...caseData.patient,
          user_id: user.id
        })
        .select()
        .single();

      if (patientError) throw patientError;

      // Create case
      const { data: caseDbData, error: caseError } = await supabase
        .from('medical_cases')
        .insert({
          title: caseData.case.title,
          chief_complaint: caseData.case.chiefComplaint,
          chief_complaint_analysis: caseData.case.chiefComplaintAnalysis,
          history: caseData.case.history,
          physical_exam: caseData.case.physicalExam,
          learning_points: caseData.case.learningPoints,
          vitals: caseData.case.vitals || {},
          symptoms: caseData.case.symptoms || {},
          urinary_symptoms: caseData.case.urinarySymptoms || [],
          lab_tests: caseData.case.labTests || [],
          radiology_exams: caseData.case.radiologyExams || [],
          user_id: user.id,
          patient_id: patientData.id
        })
        .select()
        .single();

      if (caseError) throw caseError;

      // Create diagnoses if provided
      if (caseData.diagnoses?.length) {
        const { error: diagnosesError } = await supabase
          .from('diagnoses')
          .insert(
            caseData.diagnoses.map(diagnosis => ({
              ...diagnosis,
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
              ...resource,
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
    getCaseQuery,
    createCase: createCaseMutation.mutate,
    isCreating: createCaseMutation.isPending,
    availableTags,
    tagsLoading
  };
}

// Transform database case to MedicalCase type
function transformDbCaseToMedicalCase(dbCase: any): MedicalCase {
  return {
    id: dbCase.id,
    title: dbCase.title,
    patient: {
      id: dbCase.patient.id,
      name: dbCase.patient.name,
      age: dbCase.patient.age,
      gender: dbCase.patient.gender,
      medicalRecordNumber: dbCase.patient.medical_record_number
    },
    createdAt: dbCase.created_at,
    updatedAt: dbCase.updated_at,
    chiefComplaint: dbCase.chief_complaint,
    chiefComplaintAnalysis: dbCase.chief_complaint_analysis,
    history: dbCase.history,
    physicalExam: dbCase.physical_exam,
    learningPoints: dbCase.learning_points,
    vitals: dbCase.vitals || {},
    symptoms: dbCase.symptoms || {},
    urinarySymptoms: dbCase.urinary_symptoms || [],
    labTests: dbCase.lab_tests || [],
    radiologyExams: dbCase.radiology_exams || [],
    diagnoses: dbCase.diagnoses?.map((d: DbDiagnosis) => ({
      id: d.id,
      name: d.name,
      status: d.status as any,
      notes: d.notes
    })) || [],
    resources: dbCase.resources?.map((r: DbResource) => ({
      id: r.id,
      title: r.title,
      type: r.type as any,
      url: r.url,
      notes: r.notes
    })) || [],
    tags: dbCase.case_tag_assignments?.map((assignment: any) => ({
      id: assignment.case_tags.id,
      name: assignment.case_tags.name,
      color: assignment.case_tags.color
    })) || []
  };
}
