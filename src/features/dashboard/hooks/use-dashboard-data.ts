import { useSupabaseCases } from '@/hooks/use-supabase-cases';
import { MedicalCase } from '@/types/case';

export function useDashboardData() {
  const { cases, isLoading, error } = useSupabaseCases();

  const getRecentCases = (limit: number = 5): MedicalCase[] => {
    if (!cases || !Array.isArray(cases)) {
      return [];
    }
    return cases
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit);
  };

  const getStatistics = () => {
    if (!cases || !Array.isArray(cases)) {
      return {
        totalCases: 0,
        totalResources: 0,
        casesWithLearningPoints: 0,
        thisWeekCases: 0,
        activeCases: 0,
        monthlyCases: 0,
        totalPatients: 0
      };
    }

    const totalCases = cases.length;
    const totalResources = cases.reduce((acc, curr) => {
      return acc + (curr.resources ? curr.resources.length : 0);
    }, 0);
    const casesWithLearningPoints = cases.filter(c => c.learningPoints && c.learningPoints.length > 0).length;
    
    const thisWeekCases = cases.filter(c => {
      const date = new Date(c.createdAt);
      const now = new Date();
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      return date >= weekAgo && date <= now;
    }).length;

    const activeCases = cases.filter(c => c.status === 'active').length;
    const now = new Date();
    const monthlyCases = cases.filter(c => {
      const date = new Date(c.createdAt);
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
    }).length;
    const patientIds = new Set(cases.map(c => c.patient.id));
    const totalPatients = patientIds.size;

    return {
      totalCases,
      totalResources,
      casesWithLearningPoints,
      thisWeekCases,
      activeCases,
      monthlyCases,
      totalPatients
    };
  };

  const getSpecialtyProgress = () => {
    if (!cases || !Array.isArray(cases)) {
      return [];
    }

    const specialtyCount = cases.reduce((acc, caseItem) => {
      if (caseItem.tags && Array.isArray(caseItem.tags)) {
        caseItem.tags.forEach(tag => {
          if (tag && tag.name) {
            if (!acc[tag.name]) {
              acc[tag.name] = 0;
            }
            acc[tag.name]++;
          }
        });
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(specialtyCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);
  };

  return {
    cases: cases || [],
    isLoading,
    error,
    getRecentCases,
    getStatistics,
    getSpecialtyProgress
  };
}
