import { useSupabaseCases } from '@/hooks/use-supabase-cases';
import { MedicalCase } from '@/types/case';

export function useDashboardData() {
  const { cases, isLoading, error } = useSupabaseCases();

  const getRecentCases = (limit: number = 5): MedicalCase[] => {
    return cases
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit);
  };

  const getStatistics = () => {
    const totalCases = cases.length;
    const totalResources = cases.reduce((acc, curr) => acc + curr.resources.length, 0);
    const casesWithLearningPoints = cases.filter(c => c.learningPoints && c.learningPoints.length > 0).length;
    
    const thisWeekCases = cases.filter(c => {
      const date = new Date(c.createdAt);
      const now = new Date();
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      return date >= weekAgo && date <= now;
    }).length;

    return {
      totalCases,
      totalResources,
      casesWithLearningPoints,
      thisWeekCases
    };
  };

  const getSpecialtyProgress = () => {
    const specialtyCount = cases.reduce((acc, caseItem) => {
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
  };

  // Create the data object that Dashboard.tsx expects
  const data = {
    totalCases: cases.length,
    activeCases: cases.filter(c => c.status !== 'archived').length,
    monthlyCases: cases.filter(c => {
      const date = new Date(c.createdAt);
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      return date >= monthStart && date <= now;
    }).length,
    totalPatients: new Set(cases.map(c => c.patient.id)).size,
    recentCases: getRecentCases(),
    recentActivity: getRecentCases(10).map(caseItem => ({
      id: caseItem.id,
      type: 'updated',
      description: `Case "${caseItem.title}" updated`,
      time: caseItem.updatedAt,
      caseId: caseItem.id
    }))
  };

  return {
    data,
    cases,
    isLoading,
    error,
    getRecentCases,
    getStatistics,
    getSpecialtyProgress
  };
}
