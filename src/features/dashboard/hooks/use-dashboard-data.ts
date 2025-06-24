import { useMemo } from 'react';
import { useSupabaseCases } from '@/shared/hooks/use-supabase-cases';
import { useAuth } from '@/app/providers/AuthContext';
import { MedicalCase } from '@/shared/types/case';

// Mock data for demo mode
const DEMO_CASES: MedicalCase[] = [
  {
    id: 'demo-1',
    title: 'Acute Chest Pain in Young Adult',
    priority: 'high',
    patient: {
      id: 'patient-1',
      name: 'John Doe',
      age: 28,
      gender: 'male',
      medicalRecordNumber: 'MR001'
    },
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    chiefComplaint: 'Severe chest pain with shortness of breath',
    history: 'Patient presents with sudden onset chest pain...',
    physicalExam: 'Vital signs stable, chest clear to auscultation...',
    learningPoints: 'Important to consider pulmonary embolism in young adults...',
    vitals: {
      temperature: '98.6°F',
      bloodPressure: '120/80',
      heartRate: '88',
      respiratoryRate: '16',
      oxygenSaturation: '98%'
    },
    symptoms: {
      cardiovascular: ['chest pain', 'palpitations'],
      respiratory: ['shortness of breath']
    },
    urinarySymptoms: [],
    labTests: [
      {
        id: 'lab-1',
        name: 'D-Dimer',
        value: '150',
        unit: 'ng/mL',
        normalRange: '<500'
      }
    ],
    radiologyStudies: [
      {
        id: 'rad-1',
        name: 'Chest X-Ray',
        type: 'X-Ray',
        findings: 'Clear lung fields',
        date: new Date().toISOString()
      }
    ],
    diagnoses: [
      {
        id: 'diag-1',
        name: 'Costochondritis',
        status: 'confirmed',
        notes: 'Likely musculoskeletal cause'
      }
    ],
    resources: [],
    tags: [
      { id: 'tag-1', name: 'Cardiology', color: '#ef4444' },
      { id: 'tag-2', name: 'Emergency', color: '#f97316' }
    ],
    status: 'draft'
  },
  {
    id: 'demo-2',
    title: 'Pediatric Fever Investigation',
    priority: 'medium',
    patient: {
      id: 'patient-2',
      name: 'Emily Smith',
      age: 5,
      gender: 'female',
      medicalRecordNumber: 'MR002'
    },
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    chiefComplaint: 'Fever and decreased appetite',
    history: '5-year-old with 3 days of fever...',
    physicalExam: 'Alert, interactive child with mild fever...',
    learningPoints: 'Fever without focal source in children...',
    vitals: {
      temperature: '101.2°F',
      bloodPressure: '95/60',
      heartRate: '110',
      respiratoryRate: '22'
    },
    symptoms: {
      general: ['fever', 'decreased appetite'],
      gastrointestinal: ['mild nausea']
    },
    urinarySymptoms: [],
    labTests: [],
    radiologyStudies: [],
    diagnoses: [
      {
        id: 'diag-2',
        name: 'Viral Syndrome',
        status: 'pending',
        notes: 'Monitoring for improvement'
      }
    ],
    resources: [],
    tags: [
      { id: 'tag-3', name: 'Pediatrics', color: '#10b981' },
      { id: 'tag-4', name: 'Infectious Disease', color: '#8b5cf6' }
    ],
    status: 'draft'
  }
];

export function useDashboardData() {
  const { isOfflineMode } = useAuth();
  const { cases = [], isLoading, error } = useSupabaseCases();

  // Use demo data in offline mode
  const effectiveCases = isOfflineMode ? DEMO_CASES : cases;
  const effectiveIsLoading = isOfflineMode ? false : isLoading;
  const effectiveError = isOfflineMode ? null : error;

  // Debug logging
  console.log('useDashboardData - Hook state:', {
    cases: effectiveCases?.length || 0,
    isLoading: effectiveIsLoading,
    error: effectiveError?.message || null,
    isOfflineMode,
    casesData: effectiveCases
  });

  // Memoize expensive calculations to prevent recalculation on every render
  const data = useMemo(() => {
    console.log('useDashboardData - Computing data with cases:', effectiveCases?.length || 0);
    
    // Always return a data structure, even if empty
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    if (!effectiveCases || effectiveCases.length === 0) {
      const emptyData = {
        totalCases: 0,
        activeCases: 0,
        monthlyCases: 0,
        totalPatients: 0,
        recentCases: [],
        recentActivity: []
      };
      console.log('useDashboardData - Returning empty data:', emptyData);
      return emptyData;
    }
    
    // Calculate metrics once
    const totalCases = effectiveCases.length;
    const activeCases = effectiveCases.filter(c => c.status !== 'archived').length;
    const monthlyCases = effectiveCases.filter(c => {
      const date = new Date(c.createdAt);
      return date >= monthStart && date <= now;
    }).length;
    const totalPatients = new Set(effectiveCases.map(c => c.patient.id)).size;
    
    // Get recent cases (sorted once)
    const recentCases = effectiveCases
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);
    
    // Create recent activity
    const recentActivity = recentCases.map(caseItem => ({
      id: caseItem.id,
      type: 'updated' as const,
      description: `Case "${caseItem.title}" updated`,
      time: caseItem.updatedAt,
      caseId: caseItem.id
    }));

    const computedData = {
      totalCases,
      activeCases,
      monthlyCases,
      totalPatients,
      recentCases,
      recentActivity
    };
    
    console.log('useDashboardData - Computed data:', computedData);
    return computedData;
  }, [effectiveCases]);

  // Memoize helper functions
  const getRecentCases = useMemo(() => 
    (limit: number = 5): MedicalCase[] => {
      return effectiveCases
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, limit);
    }, [effectiveCases]
  );

  const getStatistics = useMemo(() => 
    () => {
      const totalCases = effectiveCases.length;
      const totalResources = effectiveCases.reduce((acc, curr) => acc + curr.resources.length, 0);
      const casesWithLearningPoints = effectiveCases.filter(c => c.learningPoints && c.learningPoints.length > 0).length;
      
      const now = new Date();
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      
      const thisWeekCases = effectiveCases.filter(c => {
        const date = new Date(c.createdAt);
        return date >= weekAgo && date <= now;
      }).length;

      return {
        totalCases,
        totalResources,
        casesWithLearningPoints,
        thisWeekCases
      };
    }, [effectiveCases]
  );

  const getSpecialtyProgress = useMemo(() => 
    () => {
      const specialtyCount = effectiveCases.reduce((acc, caseItem) => {
        caseItem.tags.forEach(tag => {
          if (!acc[tag.name]) {
            acc[tag.name] = 0;
          }
          acc[tag.name]++;
        });
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(specialtyCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3);
    }, [effectiveCases]
  );

  const finalResult = {
    data,
    cases: effectiveCases,
    isLoading: effectiveIsLoading,
    error: effectiveError,
    getRecentCases,
    getStatistics,
    getSpecialtyProgress
  };
  
  console.log('useDashboardData - Final result:', {
    hasData: !!finalResult.data,
    dataKeys: Object.keys(finalResult.data || {}),
    isLoading: finalResult.isLoading,
    hasError: !!finalResult.error,
    isOfflineMode
  });

  return finalResult;
}
