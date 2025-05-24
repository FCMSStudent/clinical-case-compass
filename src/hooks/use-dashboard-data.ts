
import { useSupabaseCases } from './use-supabase-cases';
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

  return {
    cases,
    isLoading,
    error,
    getRecentCases,
    getStatistics,
    getSpecialtyProgress
  };
}
