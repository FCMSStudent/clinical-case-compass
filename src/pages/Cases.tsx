import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll } from "framer-motion";
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
import { useVirtualScroll } from "@/lib/performance";
import { useGestureDetection } from "@/lib/interactions";
import { useDeepMemo } from "@/lib/performance";
import { useAccessibility } from "@/lib/accessibility";
import { usePerformanceMonitor } from "@/lib/performance";
import { AccessibleMotion } from "@/lib/motion";
import { useTheme } from "@/app/ThemeContext";
import { useDebounce } from "@/lib/performance";
import { useLazyLoad } from "@/lib/performance";
import { useSpatialAudioCues } from "@/lib/interactions";
import { useMotionResponsiveHover } from "@/lib/motion";
import { useEyeTracking } from "@/lib/accessibility";
import { useBatchUpdate } from "@/lib/performance";
import { useVirtualization } from "@/lib/performance";
import { useAdaptiveTinting } from "@/lib/motion";
import type { GestureEvent } from "@/lib/interactions";

const Cases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCases, setSelectedCases] = useState<Set<string>>(new Set());
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Performance monitoring
  usePerformanceMonitor("Cases");

  // Accessibility features
  const accessibility = useAccessibility({
    enableVoiceControl: true,
    enableKeyboardNavigation: true,
    enableFocusIndicators: true,
    enableEyeTracking: true,
  });

  // Theme management
  const { currentTheme } = useTheme();

  // Debounced search
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Spatial audio cues
  const { playNavigationCue, playSuccessCue, playErrorCue } = useSpatialAudioCues();

  // Eye tracking for focus detection
  const { focusedElement, isFocused } = useEyeTracking({
    dwellTime: 600,
    enableFocusIndicators: true,
  });

  // Lazy loading for images
  const { elementRef: lazyLoadRef, isVisible } = useLazyLoad({
    threshold: 0.1,
    rootMargin: "50px"
  });

  // Motion responsive hover effects
  const { scale, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useMotionResponsiveHover();

  // Batch updates for performance
  const batchUpdate = useBatchUpdate();

  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();

  const deleteMutation = useMutation({
    mutationFn: deleteCase,
    onSuccess: (_, caseId: string) => {
      queryClient.setQueriesData<MedicalCase[]>(
        { queryKey: ["cases"] },
        (old = []) => old.filter((c) => c.id !== caseId)
      );
      playSuccessCue();
    },
    onError: (err) => {
      handleError(err, "deleting case");
      playErrorCue();
    },
  });

  const { data: cases, isLoading, isError } = useQuery({
    queryKey: ["cases", debouncedSearchQuery],
    queryFn: () => getCases(debouncedSearchQuery),
  });

  // Memoized filtered cases for performance
  const filteredCases = useDeepMemo(() => {
    if (!cases) return [];
    return cases.filter((caseItem) =>
      caseItem.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      caseItem.patient.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      caseItem.chiefComplaint.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [cases, debouncedSearchQuery]);

  // Virtual scrolling for large lists
  const itemHeight = viewMode === "list" ? 120 : 300;
  const containerHeight = 600;
  const { visibleItems, totalHeight, offsetY, onScroll } = useVirtualScroll(
    filteredCases,
    itemHeight,
    containerHeight,
    5
  );

  // Gesture detection for swipe navigation
  const handleGesture = useCallback((event: GestureEvent) => {
    if (event.type === "swipe") {
      if (event.direction === "left" && viewMode === "grid") {
        playNavigationCue("right");
        setViewMode("list");
      } else if (event.direction === "right" && viewMode === "list") {
        playNavigationCue("left");
        setViewMode("grid");
      }
    } else if (event.type === "doubleTap") {
      playSuccessCue();
      // Quick action on double tap
      window.location.href = "/cases/new";
    } else if (event.type === "longPress") {
      setIsMultiSelectMode(true);
      playNavigationCue("up");
    }
  }, [viewMode, playNavigationCue, playSuccessCue]);

  useGestureDetection(handleGesture, {
    threshold: 50,
    direction: "any"
  });

  const handleDelete = useCallback((caseId: string) => {
    deleteMutation.mutate(caseId);
  }, [deleteMutation]);

  const handleCaseSelect = useCallback((caseId: string) => {
    if (isMultiSelectMode) {
      batchUpdate(() => {
        setSelectedCases(prev => {
          const newSet = new Set(prev);
          if (newSet.has(caseId)) {
            newSet.delete(caseId);
          } else {
            newSet.add(caseId);
          }
          return newSet;
        });
      });
    }
  }, [isMultiSelectMode, batchUpdate]);

  const handleBulkDelete = useCallback(() => {
    if (selectedCases.size === 0) return;
    
    batchUpdate(() => {
      selectedCases.forEach(caseId => {
        deleteMutation.mutate(caseId);
      });
      setSelectedCases(new Set());
      setIsMultiSelectMode(false);
    });
  }, [selectedCases, deleteMutation, batchUpdate]);

  // Register voice commands
  useEffect(() => {
    accessibility.registerVoiceCommand({
      command: "switch to grid view",
      action: () => {
        setViewMode("grid");
        playNavigationCue("up");
      },
      description: "Switch to grid view",
      category: "interaction"
    });

    accessibility.registerVoiceCommand({
      command: "switch to list view",
      action: () => {
        setViewMode("list");
        playNavigationCue("down");
      },
      description: "Switch to list view",
      category: "interaction"
    });

    accessibility.registerVoiceCommand({
      command: "create new case",
      action: () => {
        window.location.href = "/cases/new";
        playSuccessCue();
      },
      description: "Navigate to create new case",
      category: "navigation"
    });

    accessibility.registerVoiceCommand({
      command: "enable multi select",
      action: () => {
        setIsMultiSelectMode(true);
        playNavigationCue("up");
      },
      description: "Enable multi-select mode",
      category: "interaction"
    });

    accessibility.registerVoiceCommand({
      command: "delete selected",
      action: () => {
        handleBulkDelete();
        playErrorCue();
      },
      description: "Delete selected cases",
      category: "interaction"
    });
  }, [accessibility, playNavigationCue, playSuccessCue, playErrorCue, handleBulkDelete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full space-y-6"
    >
      {/* Enhanced Header with Motion */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            style={{ scale, rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <Search className="h-5 w-5 text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-white">Clinical Cases</h1>
            <p className="text-white/70 text-sm">
              {filteredCases.length} case{filteredCases.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Multi-select mode indicator */}
          {isMultiSelectMode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30"
            >
              <Eye className="h-4 w-4 text-orange-300" />
              <span className="text-orange-300 text-sm font-medium">
                {selectedCases.size} selected
              </span>
            </motion.div>
          )}

          {/* View mode toggle */}
          <motion.div
            className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-1"
            whileHover={{ scale: 1.05 }}
          >
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="text-white hover:bg-white/20"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="text-white hover:bg-white/20"
            >
              <List className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Create new case button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => {
                window.location.href = "/cases/new";
                playSuccessCue();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Case
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Search Bar */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-white/70" />
              <Input
                type="text"
                placeholder="Search cases, patients, symptoms, or diagnoses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none text-white placeholder:text-white/50 focus:ring-0"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="text-white/70 hover:text-white"
                >
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Multi-select actions */}
      {isMultiSelectMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-center justify-between p-4 bg-orange-500/10 backdrop-blur-sm rounded-lg border border-orange-500/20"
        >
          <span className="text-orange-300 font-medium">
            {selectedCases.size} case{selectedCases.size !== 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsMultiSelectMode(false);
                setSelectedCases(new Set());
              }}
              className="text-orange-300 border-orange-500/30 hover:bg-orange-500/20"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              disabled={selectedCases.size === 0}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        </motion.div>
      )}

      {/* Cases Content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {viewMode === "grid" ? <CaseGridSkeleton /> : <CaseListSkeleton />}
            </motion.div>
          ) : isError ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <p className="text-white/70">Failed to load cases. Please try again.</p>
            </motion.div>
          ) : filteredCases.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <p className="text-white/70">No cases found.</p>
            </motion.div>
          ) : (
            <motion.div
              key="cases"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              className="relative"
              style={{ height: containerHeight }}
            >
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredCases.map((caseItem, index) => (
                      <motion.div
                        key={caseItem.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        onClick={() => handleCaseSelect(caseItem.id)}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedCases.has(caseItem.id) 
                            ? 'ring-2 ring-orange-500 bg-orange-500/10' 
                            : ''
                        }`}
                      >
                        <CaseCard 
                          medicalCase={caseItem} 
                          onDelete={handleDelete}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div 
                  className="space-y-4 overflow-auto"
                  style={{ height: containerHeight }}
                  onScroll={onScroll}
                >
                  <div style={{ height: totalHeight, position: 'relative' }}>
                    {visibleItems.map((virtualItem) => {
                      const caseItem = filteredCases[virtualItem.index];
                      return (
                        <div
                          key={caseItem.id}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: virtualItem.size,
                            transform: `translateY(${virtualItem.start}px)`,
                          }}
                        >
                          <motion.div
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            whileHover={{ scale: 1.01 }}
                            onClick={() => handleCaseSelect(caseItem.id)}
                            className={`cursor-pointer transition-all duration-200 ${
                              selectedCases.has(caseItem.id) 
                                ? 'ring-2 ring-orange-500 bg-orange-500/10' 
                                : ''
                            }`}
                          >
                            <CaseListItem 
                              medicalCase={caseItem} 
                              onDelete={handleDelete}
                            />
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Cases;
