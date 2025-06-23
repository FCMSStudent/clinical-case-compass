
import React from "react";
import { Search, Filter, Sparkles } from "lucide-react";
import { useAuth } from "@/app/providers/AuthContext";
import { glass } from "@/design-system/components/components";
import { cn } from "@/shared/utils/utils";

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  searchQuery,
  onSearchChange
}) => {
  const { user } = useAuth();

  return (
    <header className={cn(
      "sticky top-0 z-10 p-6 mb-8",
      glass.cardElevated
    )}>
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className={cn(
              "p-2 rounded-full",
              glass.subtle
            )}>
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {user?.user_metadata?.full_name || 'Doctor'}!
              </h1>
              <p className="text-lg text-white/90">
                Here's what's happening with your clinical cases today.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 ml-6">
          <div className="relative min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
            <input
              type="text"
              placeholder="Search cases..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={cn(
                "w-full pl-10 pr-4 py-3 text-base placeholder:text-white/60 text-white border-0 rounded-xl",
                glass.subtle,
                "focus:ring-2 focus:ring-white/30 focus:outline-none transition-all duration-200"
              )}
            />
          </div>
          <button
            aria-label="Open filters"
            className={cn(
              "p-3 rounded-xl text-white/90 hover:text-white transition-all duration-200",
              glass.subtle,
              "hover:scale-105 focus:ring-2 focus:ring-white/30 focus:outline-none"
            )}
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
