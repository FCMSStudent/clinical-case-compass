import React, { useEffect, useState } from 'react';
import { UserRound } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  StatCards,
  RecentActivityList,
  SearchPanel,
  QuickStartPanel,
} from '@/features/dashboard';

/**
 * PanelCard: Enhanced wrapper for consistent card styling with gradients and animations
 */
function PanelCard({
  title,
  icon: Icon,
  children,
  className = '',
  gradient,
}: {
  title?: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}) {
  return (
    <div
      className={`
        group shadow-lg border-0 rounded-2xl
        bg-gradient-to-br from-white to-gray-50/50
        hover:shadow-xl transition-all duration-300 hover:-translate-y-1
        ${className}
      `}
    >
      {title && Icon && (
        <div
          className={`
            pb-4 rounded-t-2xl p-6 bg-gradient-to-r
            ${gradient || 'from-blue-50 to-indigo-50'}
          `}
        >
          <h3 className="flex items-center gap-3 text-lg font-semibold">
            <div className="p-2 rounded-lg bg-white/80 shadow-sm group-hover:shadow-md transition-shadow">
              <Icon className="h-5 w-5 text-blue-600" />
            </div>
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {title}
            </span>
          </h3>
        </div>
      )}
      <div className="px-6 pt-6 pb-6">{children}</div>
    </div>
  );
}

/**
 * Dashboard component: your central hub for managing clinical cases.
 * - Shows a temporary welcome alert
 * - Provides search, stats, quick-start guide, and recent activity panels
 */
const Dashboard: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Welcome Alert */}
      {showWelcome && (
        <PanelCard className="bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <UserRound className="h-5 w-5 text-primary" />
            <AlertDescription className="text-primary p-0">
              Welcome back! This is your central hub for managing clinical cases.
            </AlertDescription>
          </div>
        </PanelCard>
      )}

      {/* Header */}
      <PageHeader
        title="Dashboard"
        description="Overview of your clinical case activities."
      />

      {/* Search Panel */}
      <PanelCard title="Search Cases" icon={() => <SearchPanel />} gradient="from-emerald-50 to-teal-50">
        <SearchPanel />
      </PanelCard>

      {/* Statistics */}
      <PanelCard title="Case Statistics" icon={() => null} gradient="from-blue-50 to-indigo-50">
        <StatCards />
      </PanelCard>

      {/* Quick Start & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PanelCard title="Quick Start" icon={() => <QuickStartPanel />} gradient="from-violet-50 to-purple-50">
            <QuickStartPanel />
          </PanelCard>
        </div>
        <div className="lg:col-span-1">
          <PanelCard title="Recent Activity" icon={() => <RecentActivityList />} gradient="from-rose-50 to-pink-50">
            <RecentActivityList />
          </PanelCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
