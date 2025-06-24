import React from "react";
import { Card, CardContent, CardHeader } from "@/shared/components/card";
import { Skeleton } from "@/shared/components/skeleton";
import { cn } from "@/shared/utils/utils";

interface CaseCardSkeletonProps {
  className?: string;
}

export function CaseCardSkeleton({ className }: CaseCardSkeletonProps) {
  return (
    <Card className={cn("flex h-full flex-col overflow-hidden", className)}>
      {/* Header */}
      <CardHeader className="flex-shrink-0 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
      </CardHeader>

      {/* Body */}
      <CardContent className="flex flex-1 flex-col">
        <div className="flex-1 space-y-4">
          {/* Chief complaint */}
          <section>
            <div className="mb-1 flex items-center">
              <Skeleton className="mr-2 h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-3/4" />
          </section>

          {/* Diagnosis */}
          <section>
            <div className="mb-1 flex items-center">
              <Skeleton className="mr-2 h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-2/3" />
          </section>
        </div>

        {/* Tags & action */}
        <footer className="mt-6 border-t border-medical-100 pt-4">
          <div className="mb-4">
            <div className="mb-2 flex items-center">
              <Skeleton className="mr-2 h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-16" />
          </div>
        </footer>
      </CardContent>
    </Card>
  );
}

export function CaseListItemSkeleton({ className }: CaseCardSkeletonProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex-grow space-y-2 min-w-0">
            <div className="flex items-start gap-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Right Section */}
          <div className="flex-shrink-0 flex flex-col items-start sm:items-end space-y-2 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="flex items-center gap-1 pt-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CaseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CaseCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CaseListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <CaseListItemSkeleton key={i} />
      ))}
    </div>
  );
} 