
import { useMemo } from 'react';
import { useSupabaseCases } from '@/shared/hooks/use-supabase-cases';
import { MedicalCase } from '@/shared/types/case';

export function useDashboardData() {
  const { cases = [], isLoading, error } = useSupabaseCases();

  // Memoize expensive calculations to prevent recalculation on every render
  const data = useMemo(() => {
    // Always return a data structure, even if empty
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    if (!cases || cases.length === 0) {
      return {
        totalCases: 0,
        activeCases: 0,
        monthlyCases: 0,
        totalPatients: 0,
        recentCases: [],
        recentActivity: []
      };
    }
    
    // Calculate metrics once
    const totalCases = cases.length;
    const activeCases = cases.filter(c => c.status !== 'archived').length;
    const monthlyCases = cases.filter(c => {
      const date = new Date(c.createdAt);
      return date >= monthStart && date <= now;
    }).length;
    const totalPatients = new Set(cases.map(c => c.patient.id)).size;
    
    // Get recent cases (sorted once)
    const recentCases = cases
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

    return {
      totalCases,
      activeCases,
      monthlyCases,
      totalPatients,
      recentCases,
      recentActivity
    };
  }, [cases]);

  // Memoize helper functions
  const getRecentCases = useMemo(() => 
    (limit: number = 5): MedicalCase[] => {
      if (!cases) return [];
      return cases
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, limit);
    }, [cases]
  );

  const getStatistics = useMemo(() => 
    () => {
      if (!cases) {
        return {
          totalCases: 0,
          totalResources: 0,
          casesWithLearningPoints: 0,
          thisWeekCases: 0
        };
      }

      const totalCases = cases.length;
      const totalResources = cases.reduce((acc, curr) => acc + curr.resources.length, 0);
      const casesWithLearningPoints = cases.filter(c => c.learningPoints && c.learningPoints.length > 0).length;
      
      const now = new Date();
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      
      const thisWeekCases = cases.filter(c => {
        const date = new Date(c.createdAt);
        return date >= weekAgo && date <= now;
      }).length;

      return {
        totalCases,
        totalResources,
        casesWithLearningPoints,
        thisWeekCases
      };
    }, [cases]
  );

  const getSpecialtyProgress = useMemo(() => 
    () => {
      if (!cases) return [];
      
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
    }, [cases]
  );

  return {
    data,
    cases: cases || [],
    isLoading,
    error,
    getRecentCases,
    getStatistics,
    getSpecialtyProgress
  };
}
