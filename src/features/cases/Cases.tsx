import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import type { MedicalCase } from "@/types/case";
import { CaseCard } from "@/features/cases/CaseCard";
import { PageHeader } from "@/components/ui/page-header";
import { CaseGridSkeleton } from "@/features/cases/CaseCardSkeleton";
import { CasesErrorBoundary } from "@/features/cases/components/CasesErrorBoundary";
import { useSupabaseCases } from "@/hooks/use-supabase-cases";
import { useAuth } from "@/app/AuthContext";
import { typo } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { liquidGlassClasses, getGlassTransitionVariants, getGlassHoverVariants } from "@/lib/glass-effects";

const Cases = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
      <motion.div 
        className="space-y-6"
        variants={getGlassTransitionVariants('medium')}
        initial="initial"
        animate="animate"
      >
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
        <Alert className={cn(liquidGlassClasses.alert)}>
          <AlertDescription className="text-white/70">
            Cases are not available in offline mode. Please configure your database connection to access cases.
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.div 
        className="space-y-6"
        variants={getGlassTransitionVariants('medium')}
        initial="initial"
        animate="animate"
      >
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
        <CaseGridSkeleton />
      </motion.div>
    );
  }

  if (error) {
    console.error("[CasesPage] Rendering error state:", error);
    return (
      <motion.div 
        className="space-y-6"
        variants={getGlassTransitionVariants('medium')}
        initial="initial"
        animate="animate"
      >
        <PageHeader
          title="Clinical Cases"
          description="Manage and review your medical cases"
        />
        <Alert variant="destructive" className={cn(liquidGlassClasses.alert, "bg-red-900/30 border-red-700/50")}>
          <AlertDescription className="text-red-200">
            Failed to load cases: {error.message || 'Unknown error occurred'}. Please check your connection and try again.
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  return (
    <CasesErrorBoundary>
      <motion.div 
        className="space-y-6"
        variants={getGlassTransitionVariants('medium')}
        initial="initial"
        animate="animate"
      >
        <PageHeader
          title="Clinical Cases"
          description="Manage and review your medical cases"
          actions={
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                onClick={() => navigate("/cases/new")}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Case
              </Button>
            </motion.div>
          }
        />

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <Card className={cn(liquidGlassClasses.card)}>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                <Input
                  placeholder="Search cases by title, patient name, or chief complaint..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50 transition-all duration-300"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cases Display */}
        <AnimatePresence mode="wait">
          {filteredCases.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <Card className={cn(liquidGlassClasses.card)}>
                <CardContent className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <BookOpen className="h-12 w-12 text-white/60 mx-auto mb-4" />
                  </motion.div>
                  <h3 className={cn(typo.h3, "text-white mb-2")}>No cases found</h3>
                  <p className={cn(typo.body, "text-white/70 mb-4")}>
                    {searchQuery ? "Try adjusting your search terms" : "Get started by creating your first case"}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button 
                      onClick={() => navigate("/cases/new")}
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Case
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="cases-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCases.map((caseItem: MedicalCase, index: number) => {
                try {
                  // Add safety check for case item
                  if (!caseItem || !caseItem.id) {
                    console.warn("[CasesPage] Skipping invalid case item:", caseItem);
                    return null;
                  }

                  return (
                    <motion.div 
                      key={caseItem.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1,
                        ease: "cubic-bezier(0.16, 1, 0.3, 1)"
                      }}
                      whileHover={{ y: -4 }}
                    >
                      <CaseCard medicalCase={caseItem} />
                    </motion.div>
                  );
                } catch (renderError) {
                  console.error("[CasesPage] Error rendering case item:", caseItem?.id, renderError);
                  return (
                    <motion.div 
                      key={caseItem?.id || Math.random()} 
                      className="p-4 border border-red-500 rounded bg-red-900/20 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <p className="text-red-300 text-sm">Error rendering case: {caseItem?.title || 'Unknown'}</p>
                    </motion.div>
                  );
                }
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </CasesErrorBoundary>
  );
};

export default Cases;
