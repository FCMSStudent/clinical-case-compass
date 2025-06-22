
import { Skeleton } from "@/shared/components/skeleton";
// Card and CardContent might not be needed if all skeletons become divs
// import { Card, CardContent } from "@/shared/components/card";

export function MetricCardSkeleton() {
  return (
    <div className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-[16px] p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 bg-white/30" /> {/* Increased opacity for skeleton items */}
          <Skeleton className="h-8 w-16 bg-white/30" />
        </div>
        <Skeleton className="h-12 w-12 rounded-xl bg-white/30" />
      </div>
    </div>
  );
}

export function RecentActivitySkeleton() {
  return (
    <div className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-[16px] p-6">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-32 bg-white/30" />
        <Skeleton className="h-5 w-5 rounded-full bg-white/30" />
      </div>
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <Skeleton className="h-4 w-48 bg-white/30" />
            <Skeleton className="h-6 w-16 rounded-full bg-white/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecentCasesSkeleton() {
  return (
    // The outer container for RecentCasesSkeleton doesn't need to be a glass-panel itself,
    // only the items within it.
    <div className="space-y-4">
      <div className="flex items-center justify-between"> {/* This is like a header for the skeleton section */}
        <Skeleton className="h-6 w-32 bg-white/30" /> {/* Adjusted opacity */}
        <Skeleton className="h-5 w-5 rounded-full bg-white/30" /> {/* Adjusted opacity */}
      </div>
      <div className="flex gap-4 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          // Applying glass-panel styling with p-4 for list items
          <div key={i} className="min-w-[280px] bg-white/20 backdrop-blur-lg border border-white/20 rounded-[16px] p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <Skeleton className="h-5 w-5 rounded-full bg-white/30" /> {/* Adjusted opacity */}
                <Skeleton className="h-4 w-16 rounded-full bg-white/30" /> {/* Adjusted opacity */}
              </div>
              <Skeleton className="h-5 w-full bg-white/30" /> {/* Adjusted opacity */}
              <Skeleton className="h-4 w-24 bg-white/30" /> {/* Adjusted opacity */}
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full bg-white/30" /> {/* Adjusted opacity */}
                <Skeleton className="h-6 w-20 rounded-full bg-white/30" /> {/* Adjusted opacity */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const DashboardSkeleton = {
  MetricCard: MetricCardSkeleton,
  RecentActivity: RecentActivitySkeleton,
  RecentCases: RecentCasesSkeleton,
};

export default DashboardSkeleton;
