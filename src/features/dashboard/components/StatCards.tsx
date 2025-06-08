import React from 'react';
import { Briefcase, CheckCircle, FileEdit, Sparkles, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

/**
 * Enhanced utility wrapper for consistent card styling with gradients and animations
 */
function StatFieldCard({
  icon: Icon,
  title,
  children,
  className = '',
  gradient,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}) {
  return (
    <div className={`
      group shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50 
      hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-lg
      ${className}
    `}>
      <div className={`
        pb-4 bg-gradient-to-r rounded-t-lg p-6
        ${gradient || "from-blue-50 to-indigo-50"}
      `}>
        <h3 className="flex items-center gap-3 text-lg font-semibold">
          <div className="p-2 rounded-lg bg-white/80 shadow-sm group-hover:shadow-md transition-shadow">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
          <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h3>
      </div>
      <div className="pt-6 space-y-4 px-6 pb-6">{children}</div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  className?: string;
  gradient?: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  trend,
  className = '',
  gradient
}: StatCardProps) => {
  return (
    <StatFieldCard 
      icon={() => icon} 
      title={title} 
      gradient={gradient}
      className={className}
    >
      {/* Value Display */}
      <div className="space-y-3">
        <div className="text-4xl font-bold text-gray-900 tabular-nums">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        
        {/* Description */}
        {description && (
          <div className="text-gray-600 flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
            <p className="text-base leading-relaxed">{description}</p>
          </div>
        )}
        
        {/* Trend Indicator */}
        {trend && (
          <div className={`
            inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-xl
            border-2 transition-all duration-200
            ${trend.isPositive !== false 
              ? 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:border-emerald-300' 
              : 'text-rose-700 bg-rose-50 border-rose-200 hover:border-rose-300'
            }
          `}>
            {trend.isPositive !== false ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span className="font-semibold">
              {trend.value > 0 ? '+' : ''}{trend.value}%
            </span>
            <span className="text-gray-500">{trend.label}</span>
          </div>
        )}
      </div>
    </StatFieldCard>
  );
};

export const StatCards = () => {
  const stats = [
    {
      title: "Active Cases",
      value: 24,
      icon: <Briefcase className="h-5 w-5 text-blue-600" />,
      description: "Currently ongoing cases requiring attention and follow-up",
      gradient: "from-emerald-50 to-teal-50",
      trend: {
        value: 12,
        label: "from last month",
        isPositive: true
      }
    },
    {
      title: "Draft Cases",
      value: 7,
      icon: <FileEdit className="h-5 w-5 text-blue-600" />,
      description: "Cases saved as drafts awaiting completion and review",
      gradient: "from-rose-50 to-pink-50",
      trend: {
        value: -3,
        label: "from last week",
        isPositive: false
      }
    },
    {
      title: "Completed Cases",
      value: 142,
      icon: <CheckCircle className="h-5 w-5 text-blue-600" />,
      description: "Successfully closed cases with comprehensive documentation",
      gradient: "from-violet-50 to-purple-50",
      trend: {
        value: 8,
        label: "this quarter",
        isPositive: true
      }
    }
  ];

  return (
    <section className="space-y-8">
      {/* Enhanced Header with gradient background - matching CaseInfoStep style */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-4 right-4 opacity-20">
          <Sparkles className="h-12 w-12" />
        </div>
        <div className="relative space-y-3">
          <h3 className="flex items-center text-2xl font-bold">
            <div className="mr-4 rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <BarChart3 className="h-7 w-7" />
            </div>
            Case Statistics Overview
          </h3>
          <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
            Monitor your case management progress and performance metrics with comprehensive analytics and trending data.
          </p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
            gradient={stat.gradient}
            trend={stat.trend}
          />
        ))}
      </div>
    </section>
  );
};

export { StatCard };
export default StatCards;
