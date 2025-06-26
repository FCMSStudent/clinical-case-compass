import { useSupabaseCases } from '@/shared/hooks/use-supabase-cases';
import { MedicalCase } from '@/shared/types/case';
import { useMemo, useState, useCallback, useRef } from 'react';

export interface TrendData {
  period: string;
  value: number;
  trend?: number;
}

export interface EnhancedDashboardData {
  // Basic metrics
  totalCases: number;
  activeCases: number;
  monthlyCases: number;
  totalPatients: number;

  // Enhanced metrics with trends
  metrics: {
    totalCases: {
      value: number;
      trend: { value: number; isPositive: boolean; percentage: number };
      sparklineData: TrendData[];
    };
    activeCases: {
      value: number;
      trend: { value: number; isPositive: boolean; percentage: number };
      sparklineData: TrendData[];
    };
    monthlyCases: {
      value: number;
      trend: { value: number; isPositive: boolean; percentage: number };
      sparklineData: TrendData[];
    };
    totalPatients: {
      value: number;
      trend: { value: number; isPositive: boolean; percentage: number };
      sparklineData: TrendData[];
    };
  };

  // Analytics data
  specialtyDistribution: { name: string; value: number; trend?: number }[];
  caseTrends: TrendData[];
  activityData: TrendData[];
  
  // Filtered data
  recentCases: MedicalCase[];
  recentActivity: any[];
  
  // Filtering
  filteredCases: MedicalCase[];
}

// Cache for expensive sparkline calculations
const sparklineDataCache = new Map<string, TrendData[]>();

export function useEnhancedDashboardData() {
  const { cases, isLoading, error } = useSupabaseCases();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  // Separate memoization for filtered cases
  const filteredCases = useMemo(() => {
    let result = cases;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(case_ =>
        case_.title.toLowerCase().includes(query) ||
        case_.patient.firstName.toLowerCase().includes(query) ||
        case_.patient.lastName.toLowerCase().includes(query) ||
        case_.diagnosis.toLowerCase().includes(query) ||
        case_.tags.some(tag => tag.name.toLowerCase().includes(query))
      );
    }

    // Apply filters
    if (activeFilters.length > 0) {
      result = result.filter(case_ => {
        return activeFilters.some(filter => {
          switch (filter) {
            case 'recent':
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return new Date(case_.updatedAt) >= weekAgo;
            
            case 'priority':
              return case_.tags.some(tag => 
                ['urgent', 'critical', 'high-priority'].includes(tag.name.toLowerCase())
              );
            
            case 'completed':
              return case_.status === 'completed';
            
            case 'active':
              return case_.status === 'active';
            
            case 'this-week':
              const thisWeekStart = new Date();
              thisWeekStart.setDate(thisWeekStart.getDate() - 7);
              return new Date(case_.createdAt) >= thisWeekStart;
            
            default:
              return case_.tags.some(tag => 
                tag.name.toLowerCase().includes(filter.toLowerCase())
              );
          }
        });
      });
    }

    return result;
  }, [cases, searchQuery, activeFilters]);

  // Memoized sparkline generation with caching
  const generateSparklineData = useCallback((currentValue: number, periods: number = 7, cacheKey: string): TrendData[] => {
    if (sparklineDataCache.has(cacheKey)) {
      return sparklineDataCache.get(cacheKey)!;
    }

    const data: TrendData[] = [];
    const baseValue = currentValue * 0.7;
    
    for (let i = 0; i < periods; i++) {
      const variation = (Math.random() - 0.5) * 0.3;
      const value = Math.max(0, Math.round(baseValue + (baseValue * variation) + (i * (currentValue - baseValue) / periods)));
      data.push({
        period: `Day ${i + 1}`,
        value
      });
    }
    
    sparklineDataCache.set(cacheKey, data);
    return data;
  }, []);

  // Memoized trend calculation
  const calculateTrend = useCallback((current: number, previous: number) => {
    if (previous === 0) return { value: 0, isPositive: true, percentage: 0 };
    const change = current - previous;
    const percentage = Math.round((change / previous) * 100);
    return {
      value: change,
      isPositive: change >= 0,
      percentage: Math.abs(percentage)
    };
  }, []);

  // Memoized basic metrics
  const basicMetrics = useMemo(() => {
    const totalCases = filteredCases.length;
    const activeCases = filteredCases.filter(c => c.status !== 'archived').length;
    const totalPatients = new Set(filteredCases.map(c => c.patient.id)).size;
    
    const thisMonth = new Date();
    const monthStart = new Date(thisMonth.getFullYear(), thisMonth.getMonth(), 1);
    const monthlyCases = filteredCases.filter(c => 
      new Date(c.createdAt) >= monthStart && new Date(c.createdAt) <= thisMonth
    ).length;

    return { totalCases, activeCases, totalPatients, monthlyCases };
  }, [filteredCases]);

  // Memoized enhanced data with proper dependency tracking
  const enhancedData = useMemo((): EnhancedDashboardData => {
    const { totalCases, activeCases, totalPatients, monthlyCases } = basicMetrics;

    // Previous values for trend calculation (using estimated previous values)
    const previousMonthCases = Math.max(1, monthlyCases - Math.floor(Math.random() * 5));

    // Generate trends with memoized calculations
    const totalCasesTrend = calculateTrend(totalCases, Math.max(1, totalCases - 5));
    const activeCasesTrend = calculateTrend(activeCases, Math.max(1, activeCases - 2));
    const monthlyCasesTrend = calculateTrend(monthlyCases, previousMonthCases);
    const patientsTrend = calculateTrend(totalPatients, Math.max(1, totalPatients - 3));

    // Memoized specialty distribution
    const specialtyCount = filteredCases.reduce((acc, case_) => {
      case_.tags.forEach(tag => {
        const specialty = tag.name;
        if (!acc[specialty]) {
          acc[specialty] = 0;
        }
        acc[specialty]++;
      });
      return acc;
    }, {} as Record<string, number>);

    const specialtyDistribution = Object.entries(specialtyCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 6)
      .map(([name, value]) => ({
        name,
        value,
        trend: Math.random() > 0.5 ? Math.floor(Math.random() * 20) : -Math.floor(Math.random() * 10)
      }));

    // Generate case trends over time (memoized)
    const caseTrends: TrendData[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);
      
      const casesForDay = filteredCases.filter(c => {
        const caseDate = new Date(c.createdAt);
        return caseDate >= dayStart && caseDate <= dayEnd;
      }).length;

      caseTrends.push({
        period: date.toLocaleDateString('en-US', { weekday: 'short' }),
        value: casesForDay
      });
    }

    // Activity data (simplified)
    const activityData: TrendData[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const updatesForDay = Math.floor(Math.random() * 5) + 1;

      activityData.push({
        period: date.toLocaleDateString('en-US', { weekday: 'short' }),
        value: updatesForDay
      });
    }

    // Recent cases and activity
    const recentCases = filteredCases
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);

    const recentActivity = recentCases.slice(0, 10).map(case_ => ({
      id: case_.id,
      type: 'updated',
      description: `Case "${case_.title}" updated`,
      time: case_.updatedAt,
      caseId: case_.id
    }));

    return {
      totalCases,
      activeCases,
      monthlyCases,
      totalPatients,
      metrics: {
        totalCases: {
          value: totalCases,
          trend: totalCasesTrend,
          sparklineData: generateSparklineData(totalCases, 7, `total-${totalCases}`)
        },
        activeCases: {
          value: activeCases,
          trend: activeCasesTrend,
          sparklineData: generateSparklineData(activeCases, 7, `active-${activeCases}`)
        },
        monthlyCases: {
          value: monthlyCases,
          trend: monthlyCasesTrend,
          sparklineData: generateSparklineData(monthlyCases, 7, `monthly-${monthlyCases}`)
        },
        totalPatients: {
          value: totalPatients,
          trend: patientsTrend,
          sparklineData: generateSparklineData(totalPatients, 7, `patients-${totalPatients}`)
        }
      },
      specialtyDistribution,
      caseTrends,
      activityData,
      recentCases,
      recentActivity,
      filteredCases
    };
  }, [basicMetrics, filteredCases, generateSparklineData, calculateTrend]);

  // Cleanup function for cache management
  const clearCache = useCallback(() => {
    sparklineDataCache.clear();
  }, []);

  return {
    data: enhancedData,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    activeFilters,
    setActiveFilters,
    clearCache // Expose cache clearing for memory management
  };
}