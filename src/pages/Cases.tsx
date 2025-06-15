
import React, { useState } from "react";
import { Plus, Search, Grid, List, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import type { MedicalCase } from "@/types/case";
import { CaseCard } from "@/features/cases/CaseCard";
import { CaseListItem } from "@/features/cases/CaseListItem";
import { PageHeader } from "@/components/ui/page-header";
import { CaseGridSkeleton, CaseListSkeleton } from "@/features/cases/CaseCardSkeleton";
import { useSupabaseCases } from "@/hooks/use-supabase-cases";

const Cases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Use Supabase hook for real-time case data
  const { cases, isLoading, error } = useSupabaseCases();

  // Filtering cases based on search query
  const filteredCases = React.useMemo(() => {
    if (!cases) return [];
    return cases.filter((caseItem: MedicalCase) =>
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (caseItem.patient?.name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (caseItem.chiefComplaint ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cases, searchQuery]);

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
    return (
      <div className="space-y-6">
        <PageHeader
          title="Clinical Cases"
          description="Manage and review your medical cases"
        />
        <Alert className="bg-red-500/20 border-red-400/30">
          <AlertDescription className="text-white">
            Failed to load cases. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
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
            <Button asChild className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              <Link to="/cases/new">
                <Plus className="h-4 w-4 mr-2" />
                New Case
              </Link>
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
            <h3 className="text-lg font-semibold text-white mb-2">No cases found</h3>
            <p className="text-white/70 mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Get started by creating your first case"}
            </p>
            <Button asChild className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              <Link to="/cases/new">
                <Plus className="h-4 w-4 mr-2" />
                Create New Case
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredCases.map((caseItem: MedicalCase) => (
            <div key={caseItem.id}>
              {viewMode === "grid" ? (
                <CaseCard medicalCase={caseItem} />
              ) : (
                <CaseListItem medicalCase={caseItem} onDelete={() => {}} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cases;
