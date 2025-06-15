
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function MetricCardSkeleton() {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-white/20" />
            <Skeleton className="h-8 w-16 bg-white/20" />
          </div>
          <Skeleton className="h-12 w-12 rounded-xl bg-white/20" />
        </div>
      </CardContent>
    </Card>
  );
}

export function RecentActivitySkeleton() {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-32 bg-white/20" />
          <Skeleton className="h-5 w-5 rounded-full bg-white/20" />
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton className="h-4 w-48 bg-white/20" />
              <Skeleton className="h-6 w-16 rounded-full bg-white/20" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function RecentCasesSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-32 bg-white/20" />
        <Skeleton className="h-5 w-5 rounded-full bg-white/20" />
      </div>
      <div className="flex gap-4 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="min-w-[280px] bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <Skeleton className="h-5 w-5 rounded-full bg-white/20" />
                  <Skeleton className="h-4 w-16 rounded-full bg-white/20" />
                </div>
                <Skeleton className="h-5 w-full bg-white/20" />
                <Skeleton className="h-4 w-24 bg-white/20" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full bg-white/20" />
                  <Skeleton className="h-6 w-20 rounded-full bg-white/20" />
                </div>
              </div>
            </CardContent>
          </Card>
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
