
import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getCases, deleteCase } from "@/lib/api/cases";
import type { MedicalCase } from "@/types/case";
import { CaseCard } from "@/features/cases/CaseCard";
import { CaseListItem } from "@/features/cases/CaseListItem";
import { PageHeader } from "@/components/ui/page-header";
import { useErrorHandler } from "@/hooks/use-error-handler";

const Cases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();

  const deleteMutation = useMutation({
    mutationFn: deleteCase,
    onSuccess: (_, caseId: string) => {
      queryClient.setQueriesData<MedicalCase[]>(
        { queryKey: ["cases"] },
        (old = []) => old.filter((c) => c.id !== caseId)
      );
    },
    onError: (err) => handleError(err, "deleting case"),
  });

  const { data: cases, isLoading, isError } = useQuery({
    queryKey: ["cases", searchQuery],
    queryFn: () => getCases(searchQuery),
  });

  const filteredCases = useMemo(() => {
    if (!cases) return [];
    return cases.filter((caseItem) =>
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cases, searchQuery]);

  const handleDelete = (caseId: string) => {
    deleteMutation.mutate(caseId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading cases...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Error loading cases. Please try again.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Cases" 
        description="Manage and review clinical cases"
      >
        <Link to="/cases/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Case
          </Button>
        </Link>
      </PageHeader>

      {/* Search and Filter Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search cases by title, patient, or complaint..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              >
                {viewMode === "grid" ? (
                  <>
                    <List className="mr-2 h-4 w-4" />
                    List
                  </>
                ) : (
                  <>
                    <Grid className="mr-2 h-4 w-4" />
                    Grid
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cases Display */}
      {filteredCases.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No cases found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {searchQuery 
                ? "No cases match your search criteria. Try adjusting your search terms."
                : "No cases have been created yet. Click 'Add Case' to create your first case."
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className={
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
        }>
          {viewMode === "grid" ? (
            filteredCases.map((caseItem) => (
              <CaseCard key={caseItem.id} medicalCase={caseItem} />
            ))
          ) : (
            filteredCases.map((caseItem) => (
              <CaseListItem key={caseItem.id} medicalCase={caseItem} onDelete={handleDelete} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Cases;
