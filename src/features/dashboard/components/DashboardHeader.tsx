
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
    <header className="glass-hero sticky top-0 z-10 mb-8">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-3">
            <div className="glass-inner p-3 rounded-full">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-1">
                Welcome back, {user?.user_metadata?.full_name || 'Doctor'}!
              </h1>
              <p className="text-xl text-white/95 leading-relaxed">
                Here's what's happening with your clinical cases today.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 ml-8">
          <div className="relative min-w-[350px]">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white/80" />
            <input
              type="text"
              placeholder="Search cases, patients, diagnoses..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="glass-inner w-full pl-12 pr-4 py-4 text-lg placeholder:text-white/60 text-white border-0 rounded-xl focus:ring-2 focus:ring-white/40 focus:outline-none transition-all duration-200"
            />
          </div>
          <button
            aria-label="Open filters"
            className="glass-inner p-4 rounded-xl text-white/90 hover:text-white transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-white/40 focus:outline-none"
          >
            <Filter className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
