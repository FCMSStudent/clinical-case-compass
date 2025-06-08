import React, { useEffect, useState } from 'react';
import {
  UserRound,
  LayoutDashboard,
  Search,
  Zap,
  History,
  Sparkles
} from "lucide-react";

// Assuming these are your feature components.
// The StatCards component is the styled component from your example.
import { StatCards } from "@/features/dashboard/StatCards";
import { RecentActivityList } from "@/features/dashboard/RecentActivityList";
import { SearchPanel } from "@/features/dashboard/SearchPanel";
import { QuickStartPanel } from "@/features/dashboard/QuickStartPanel";

/**
 * A reusable card component with consistent styling inspired by the provided example.
 * It features a gradient header, an icon, and hover effects.
 */
function DashboardCard({
  icon: Icon,
  title,
  children,
  className = '',
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`
      group shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50
      hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl
      ${className}
    `}>
      {/* Card Header */}
      <div className="pb-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-2xl p-6">
        <h3 className="flex items-center gap-3 text-lg font-semibold">
          <div className="p-2 rounded-lg bg-white/80 shadow-sm group-hover:shadow-md transition-shadow">
            <Icon className="h-5 w-5 text-indigo-600" />
          </div>
          <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {title}
          </span>
        </h3>
      </div>
      {/* Card Content */}
      <div className="pt-6 space-y-4 px-6 pb-6">{children}</div>
    </div>
  );
}


const Dashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 p-4 md:p-6">
      {/* Welcome Alert - Restyled */}
      {showWelcome && (
        <div className="relative flex items-center gap-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-5 text-white shadow-lg transition-opacity duration-500">
           <div className="absolute top-2 right-2 opacity-20">
             <Sparkles className="h-8 w-8" />
           </div>
           <div className="flex-shrink-0 rounded-full bg-white/20 p-3">
             <UserRound className="h-6 w-6" />
           </div>
           <p className="text-base font-medium">
             Welcome back! This is your central hub for managing clinical cases.
           </p>
        </div>
      )}

      {/* Page Header - Restyled */}
      <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 text-white shadow-2xl">
         <div className="absolute inset-0 bg-black/10"></div>
         <div className="absolute top-4 right-4 opacity-20">
           <Sparkles className="h-12 w-12" />
         </div>
         <div className="relative space-y-3">
           <h1 className="flex items-center text-3xl font-bold">
             <div className="mr-4 rounded-xl bg-white/20 p-3 backdrop-blur-sm">
               <LayoutDashboard className="h-8 w-8" />
             </div>
             Dashboard
           </h1>
           <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
            Overview of your clinical case activities.
           </p>
         </div>
       </header>

      {/* Search Panel Card */}
      <DashboardCard icon={Search} title="Case Search">
        <SearchPanel />
      </DashboardCard>

      {/* StatCards Component - This component is already styled as per the example */}
      <StatCards />

      {/* Grid for Quick Start and Recent Activity */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <DashboardCard icon={Zap} title="Quick Start">
                <QuickStartPanel />
            </DashboardCard>
        </div>
        <div className="lg:col-span-1">
            <DashboardCard icon={History} title="Recent Activity">
                <RecentActivityList />
            </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
