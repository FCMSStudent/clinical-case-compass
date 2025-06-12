import React, { useState, useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Filter, Grid, List, Target, ChevronDown, Eye, Edit, Trash2, BookOpen, Users, Calendar, Activity, TrendingUp, Brain, Heart, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { getCases, deleteCase } from "@/lib/api/cases";
import type { MedicalCase } from "@/types/case";
import { CaseCard } from "@/features/cases/CaseCard";
import { CaseListItem } from "@/features/cases/CaseListItem";
import { PageHeader } from "@/components/ui/page-header";
import { useErrorHandler } from "@/hooks/use-error-handler";
import { CaseGridSkeleton, CaseListSkeleton } from "@/features/cases/CaseCardSkeleton";
import { useTheme } from "@/app/ThemeContext";

const Cases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCases, setSelectedCases] = useState<Set<string>>(new Set());
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);

  // Theme management
  const { currentTheme } = useTheme();

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
    onError: (err) => {
      handleError(err, "deleting case");
    },
  });

  const { data: cases, isLoading, isError } = useQuery({
    queryKey: ["cases", searchQuery],
    queryFn: () => getCases(searchQuery),
  });

  // Filtered cases
  const filteredCases = useMemo(() => {
    if (!cases) return [];
    return cases.filter((caseItem) =>
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cases, searchQuery]);

  const handleDelete = useCallback((caseId: string) => {
    deleteMutation.mutate(caseId);
  }, [deleteMutation]);

  const handleCaseSelect = useCallback((caseId: string) => {
    if (isMultiSelectMode) {
      setSelectedCases(prev => {
        const newSet = new Set(prev);
        if (newSet.has(caseId)) {
          newSet.delete(caseId);
        } else {
          newSet.add(caseId);
        }
        return newSet;
      });
    }
  }, [isMultiSelectMode]);

  const handleBulkDelete = useCallback(() => {
    if (selectedCases.size === 0) return;
    
    selectedCases.forEach(caseId => {
      deleteMutation.mutate(caseId);
    });
    setSelectedCases(new Set());
    setIsMultiSelectMode(false);
  }, [selectedCases, deleteMutation]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Clinical Cases"
          description="Manage and review your medical cases"
          actions={
            <Button disabled>
              <Plus className="h-4 w-4 mr-2" />
              New Case
            </Button>
          }
        />
        {viewMode === "grid" ? <CaseGridSkeleton /> : <CaseListSkeleton />}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Clinical Cases"
          description="Manage and review your medical cases"
        />
        <Alert>
          <AlertDescription>
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
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button asChild>
              <Link to="/cases/new">
                <Plus className="h-4 w-4 mr-2" />
                New Case
              </Link>
            </Button>
          </div>
        }
      />

      {/* Search and Filters */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search cases by title, patient name, or chief complaint..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Multi-select Actions */}
      {isMultiSelectMode && (
        <Card className="bg-yellow-500/10 backdrop-blur-sm border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-yellow-400">
                  {selectedCases.size} case(s) selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCases(new Set());
                    setIsMultiSelectMode(false);
                  }}
                  className="border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10"
                >
                  Cancel
                </Button>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                disabled={selectedCases.size === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cases Display */}
      {filteredCases.length === 0 ? (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No cases found</h3>
            <p className="text-gray-400 mb-4">
              {searchQuery ? "Try adjusting your search terms" : "Get started by creating your first case"}
            </p>
            <Button asChild>
              <Link to="/cases/new">
                <Plus className="h-4 w-4 mr-2" />
                Create New Case
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredCases.map((caseItem) => (
            <div key={caseItem.id}>
              {viewMode === "grid" ? (
                <CaseCard
                  caseData={caseItem}
                  onDelete={handleDelete}
                  isSelected={selectedCases.has(caseItem.id)}
                  onSelect={handleCaseSelect}
                  isMultiSelectMode={isMultiSelectMode}
                />
              ) : (
                <CaseListItem
                  caseData={caseItem}
                  onDelete={handleDelete}
                  isSelected={selectedCases.has(caseItem.id)}
                  onSelect={handleCaseSelect}
                  isMultiSelectMode={isMultiSelectMode}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cases;
