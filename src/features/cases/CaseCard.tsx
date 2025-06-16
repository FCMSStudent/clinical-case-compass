import React, { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { 
  Clipboard, 
  Stethoscope, 
  Tag, 
  User,
  Sparkles,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  CalendarDays
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MedicalCase } from "@/types/case";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * CONSTANTS & HELPERS
 * ────────────────────────────────────────────────────────────────────────────────
 */
const VISIBLE_TAGS = 2;

function getPrimaryDiagnosis(caseData: MedicalCase) {
  if (!caseData.diagnoses?.length) return null;
  return (
    caseData.diagnoses.find((d) => d.status === "confirmed") ||
    caseData.diagnoses[0]
  );
}

interface TagPillProps {
  tag: { id: string; name: string; color: string };
  className?: string;
}

const TagPill = memo(({ tag, className }: TagPillProps) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className={cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors",
      className
    )}
    style={{
      backgroundColor: `${tag.color}20`,
      color: tag.color,
    }}
  >
    <Tag className="h-3 w-3 mr-1" aria-hidden="true" />
    {tag.name}
  </motion.span>
));
TagPill.displayName = "TagPill";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * PROPS
 * ────────────────────────────────────────────────────────────────────────────────
 */
export interface CaseCardProps {
  medicalCase: MedicalCase;
  className?: string;
  onDelete?: (caseId: string) => void;
}

/**
 * Compact card summarising a clinical case.
 */
export const CaseCard: React.FC<CaseCardProps> = memo(
  ({ medicalCase, className, onDelete }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // Props and state derived values should be calculated outside the try block
    // if they are needed for the fallback UI or if they themselves could throw.
    // For simplicity, we'll calculate them here, assuming medicalCase is mostly valid.
    // If medicalCase itself could be null/undefined, more checks would be needed.
    const primaryDx = useMemo(() => getPrimaryDiagnosis(medicalCase), [medicalCase]);
    const createdDate = useMemo(
      () => medicalCase?.createdAt ? format(new Date(medicalCase.createdAt), "MMM d, yyyy") : "N/A",
      [medicalCase?.createdAt],
    );
    const visibleTags = medicalCase?.tags?.slice(0, VISIBLE_TAGS) ?? [];
    const hiddenTagCount = (medicalCase?.tags?.length ?? 0) - visibleTags.length;

    const handleDelete = () => {
      if (onDelete) {
        setShowDeleteDialog(true);
      }
    };

    const confirmDelete = () => {
      if (onDelete) {
        onDelete(medicalCase.id);
        setShowDeleteDialog(false);
      }
    };

    try {
      // Ensure medicalCase and patient exist before trying to render them.
      // This is a basic check; more granular checks might be needed inside.
      if (!medicalCase || !medicalCase.patient) {
        throw new Error("Medical case or patient data is missing.");
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
            <div className={cn(
              "relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 h-full flex flex-col overflow-hidden transition-all duration-200",
              "hover:bg-white/15 hover:border-white/30 hover:scale-[1.02]",
              "focus-within:ring-2 focus-within:ring-white/20 focus-within:ring-offset-2",
              className
            )}>
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 opacity-0"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />

              {/* Header */}
              <div className="relative flex-shrink-0 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <motion.div
                      animate={{ scale: isHovered ? 1.1 : 1 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1"
                    >
                      <Sparkles className="h-5 w-5 text-white/80" />
                    </motion.div>
                    <div className="space-y-1">
                      <h3
                        className="line-clamp-2 text-lg md:text-xl leading-tight text-white group-hover:text-white transition-colors font-semibold"
                        title={medicalCase.title}
                      >
                        {medicalCase.title}
                      </h3>
                      <div className="flex items-center text-sm md:text-base text-white/70">
                        <User className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        <span className="truncate">
                          {medicalCase.patient.name}, {medicalCase.patient.age} y/o {medicalCase.patient.gender}
                        </span>
                      </div>
                    </div>
                  </div>
                  <time
                    dateTime={medicalCase.createdAt ? new Date(medicalCase.createdAt).toISOString() : undefined}
                    className="flex items-center gap-1 flex-shrink-0 whitespace-nowrap text-xs md:text-sm text-white/60"
                  >
                    <CalendarDays className="h-3 w-3" aria-hidden="true" />
                    {createdDate}
                  </time>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col">
                <div className="flex-1 space-y-4">
                  {/* Chief complaint */}
                  <section className="group/section">
                    <h4 className="mb-1 flex items-center text-sm md:text-base font-medium text-white">
                      <Clipboard className="mr-2 h-4 w-4 flex-shrink-0 transition-transform group-hover/section:scale-110" aria-hidden="true" />
                      Chief Complaint
                    </h4>
                    <p 
                      className="line-clamp-2 text-sm md:text-base text-white/80 transition-colors group-hover/section:text-white"
                      title={medicalCase.chiefComplaint}
                    >
                      {medicalCase.chiefComplaint}
                    </p>
                  </section>

                  {/* Diagnosis */}
                  {primaryDx && (
                    <section className="group/section">
                      <h4 className="mb-1 flex items-center text-sm md:text-base font-medium text-white">
                        <Stethoscope className="mr-2 h-4 w-4 flex-shrink-0 transition-transform group-hover/section:scale-110" aria-hidden="true" />
                        Diagnosis
                      </h4>
                      <p
                        className="line-clamp-2 text-sm md:text-base text-white/80 transition-colors group-hover/section:text-white"
                        title={primaryDx.name}
                      >
                        {primaryDx.name}
                        {primaryDx.status !== "confirmed" && (
                          <Badge
                            variant="outline"
                            className="ml-2 text-xs md:text-sm bg-white/10 border-white/20 text-white/80"
                          >
                            {primaryDx.status}
                          </Badge>
                        )}
                      </p>
                    </section>
                  )}
                </div>

                {/* Tags & action */}
                <footer className="mt-6 border-t border-white/20 pt-4">
                  <div className="mb-4">
                    <h4 className="mb-2 flex items-center text-sm md:text-base font-medium text-white">
                      <Tag className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence mode="popLayout">
                        {visibleTags.map((tag) => (
                          <TagPill key={tag.id} tag={tag} />
                        ))}
                        {hiddenTagCount > 0 && (
                          <Badge variant="secondary" className="text-xs bg-white/10 border-white/20 text-white/80">
                            +{hiddenTagCount}
                          </Badge>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="group/btn relative bg-white/10 border-white/20 hover:bg-white/20 text-white"
                          >
                            <Link to={`/cases/${medicalCase.id}`} className="flex items-center">
                              <span className="flex items-center justify-center">
                                View Details
                                <motion.div
                                  className="ml-1 absolute right-0 top-1/2 -translate-y-1/2 text-white/60"
                                  style={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0, position: 'relative', right: isHovered ? '-0.25rem' : '0rem' }}
                                  animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </motion.div>
                              </span>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
                          View full case details
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {onDelete && (
                      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-300 hover:text-red-200 hover:bg-red-400/10"
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white/10 backdrop-blur-md border border-white/20">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">Delete Case</AlertDialogTitle>
                            <AlertDialogDescription className="text-white/70">
                              Are you sure you want to delete this case? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={confirmDelete}
                              className="bg-red-400/20 border-red-400/30 hover:bg-red-400/30 text-red-300"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </motion.div>
      );
    } catch (error) {
      console.error(`[CaseCard] Error rendering medicalCase ID: ${medicalCase?.id || 'Unknown'}`, error);
      return (
        <div className={cn(
          "relative bg-red-900/30 backdrop-blur-md rounded-2xl border border-red-700/50 p-6 h-full flex flex-col items-center justify-center text-center",
          "hover:bg-red-900/40",
          className
        )}>
          <AlertCircle className="h-10 w-10 text-red-400 mb-3" />
          <h3 className="text-lg font-semibold text-red-200 mb-1">Case Rendering Error</h3>
          <p className="text-sm text-red-300">There was an issue displaying this case card.</p>
          <p className="text-xs text-red-400 mt-2">Case ID: {medicalCase?.id || "Unknown"}</p>
        </div>
      );
    }
  }
);

CaseCard.displayName = "CaseCard";
