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
import { CaseGridSkeleton, CaseListSkeleton } from "@/features/cases/CaseCardSkeleton";
import { motion, AnimatePresence } from "framer-motion";

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

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center min-h-[400px] relative z-10"
        >
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
            <Card className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <CardHeader>
                <CardTitle className="text-destructive">Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">Error loading cases. Please try again.</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 relative">
      {/* Glassy background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-6 p-4 md:p-6">
        <PageHeader 
          title="Cases" 
          description="Manage and review clinical cases"
          className="text-white"
        >
          <Link to="/cases/new">
            <Button className="bg-white/10 border border-white/20 text-white hover:bg-white/20">
              <Plus className="mr-2 h-4 w-4" />
              Add Case
            </Button>
          </Link>
        </PageHeader>

        {/* Search and Filter Controls */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl"></div>
          <Card className="relative bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                  <Input
                    type="text"
                    placeholder="Search cases by title, patient, or complaint..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-white/10 border border-white/20 text-white hover:bg-white/20">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
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
        </div>

        {/* Cases Display */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {viewMode === "grid" ? (
                <CaseGridSkeleton count={6} />
              ) : (
                <CaseListSkeleton count={4} />
              )}
            </motion.div>
          ) : filteredCases.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
                <Card className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">No cases found</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70">
                      {searchQuery 
                        ? "No cases match your search criteria. Try adjusting your search terms."
                        : "No cases have been created yet. Click 'Add Case' to create your first case."
                      }
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="cases"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "space-y-4"
              }
            >
              <AnimatePresence mode="popLayout">
                {viewMode === "grid" ? (
                  filteredCases.map((caseItem) => (
                    <motion.div
                      key={caseItem.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CaseCard medicalCase={caseItem} onDelete={handleDelete} />
                    </motion.div>
                  ))
                ) : (
                  filteredCases.map((caseItem) => (
                    <motion.div
                      key={caseItem.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CaseListItem medicalCase={caseItem} onDelete={handleDelete} />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Cases;
