
import React, { useState } from "react";
import { Plus, Search, Grid, List, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import type { MedicalCase } from "@/types/case";
import { CaseCard } from "@/features/cases/CaseCard";
import { CaseListItem } from "@/features/cases/CaseListItem";
import { PageHeader } from "@/components/ui/page-header";
import { CaseGridSkeleton, CaseListSkeleton } from "@/features/cases/CaseCardSkeleton";
import { CasesErrorBoundary } from "@/features/cases/components/CasesErrorBoundary";
import { useSupabaseCases } from "@/hooks/use-supabase-cases";
import { useAuth } from "@/app/AuthContext";
import { typo } from "@/lib/typography";
import { cn } from "@/lib/utils";

const Cases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { isOfflineMode } = useAuth();
  const navigate = useNavigate();

  // Use Supabase hook for real-time case data
  const { cases, isLoading, error } = useSupabaseCases();

  // Filtering cases based on search query
  const filteredCases = React.useMemo(() => {
    if (!cases || cases.length === 0) {
      return [];
    }
    
    try {
      const filtered = cases.filter((caseItem: MedicalCase) => {
        if (!caseItem) return false;
        
        const searchLower = searchQuery.toLowerCase();
        const titleMatch = caseItem.title?.toLowerCase().includes(searchLower) || false;
        const patientMatch = caseItem.patient?.name?.toLowerCase().includes(searchLower) || false;
        const complaintMatch = caseItem.chiefComplaint?.toLowerCase().includes(searchLower) || false;
        
        return titleMatch || patientMatch || complaintMatch;
      });
      
      return filtered;
    } catch (filterError) {
      console.error("[CasesPage] Error filtering cases:", filterError);
      return [];
    }
  }, [cases, searchQuery]);

  if (isOfflineMode) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Clinical Cases"
          description="Manage and review your medical cases"
          actions={
            <Button disabled className="bg-white/20 border-white/30 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Case (Offline)
            </Button>
          }
        />
        <Alert className="bg-white/10 backdrop-blur-sm border-white/20">
          <AlertDescription className="text-white/70">
            Cases are not available in offline mode. Please configure your database connection to access cases.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Clinical Cases"
          description="Manage and review your medical cases"
          actions={
            <Button disabled className="bg-white/20 border-white/30 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Case
            </Button>
          }
        />
        {viewMode === "grid" ? <CaseGridSkeleton /> : <CaseListSkeleton />}
      </div>
    );
  }

  if (error) {
    console.error("[CasesPage] Rendering error state:", error);
    return (
      <div className="space-y-6">
        <PageHeader
          title="Clinical Cases"
          description="Manage and review your medical cases"
        />
        <Alert variant="destructive" className="bg-red-900/30 border-red-700/50">
          <AlertDescription className="text-red-200">
            Failed to load cases: {error.message || 'Unknown error occurred'}. Please check your connection and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <CasesErrorBoundary>
      <div className="space-y-6">
        <PageHeader
          title="Clinical Cases"
          description="Manage and review your medical cases"
          actions={
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                onClick={() => navigate("/cases/new")}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Case
              </Button>
            </div>
          }
        />

        {/* Search Bar */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
              <Input
                placeholder="Search cases by title, patient name, or chief complaint..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Cases Display */}
        {filteredCases.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-white/60 mx-auto mb-4" />
              <h3 className={cn(typo.h3, "text-white mb-2")}>No cases found</h3>
              <p className={cn(typo.body, "text-white/70 mb-4")}>
                {searchQuery ? "Try adjusting your search terms" : "Get started by creating your first case"}
              </p>
              <Button 
                onClick={() => navigate("/cases/new")}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Case
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredCases.map((caseItem: MedicalCase) => {
              try {
                // Add safety check for case item
                if (!caseItem || !caseItem.id) {
                  console.warn("[CasesPage] Skipping invalid case item:", caseItem);
                  return null;
                }

                return (
                  <div key={caseItem.id}>
                    {viewMode === "grid" ? (
                      <CaseCard medicalCase={caseItem} />
                    ) : (
                      <CaseListItem medicalCase={caseItem} onDelete={() => {}} />
                    )}
                  </div>
                );
              } catch (renderError) {
                console.error("[CasesPage] Error rendering case item:", caseItem?.id, renderError);
                return (
                  <div key={caseItem?.id || Math.random()} className="p-4 border border-red-500 rounded bg-red-900/20">
                    <p className="text-red-300 text-sm">Error rendering case: {caseItem?.title || 'Unknown'}</p>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </CasesErrorBoundary>
  );
};

export default Cases;
