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
    const primaryDx = useMemo(() => getPrimaryDiagnosis(medicalCase), [medicalCase]);

    const createdDate = useMemo(
      () => format(new Date(medicalCase.createdAt), "MMM d, yyyy"),
      [medicalCase.createdAt],
    );

    const visibleTags = medicalCase.tags?.slice(0, VISIBLE_TAGS) ?? [];
    const hiddenTagCount = (medicalCase.tags?.length ?? 0) - visibleTags.length;

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

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card
          className={cn(
            "group relative flex h-full flex-col overflow-hidden transition-all duration-200",
            "hover:shadow-lg hover:border-primary/20 hover:scale-[1.02]",
            "focus-within:ring-2 focus-within:ring-primary/20 focus-within:ring-offset-2",
            className
          )}
        >
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Header */}
          <CardHeader className="relative flex-shrink-0 pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="mt-1"
                >
                  <Sparkles className="h-5 w-5 text-primary/60" />
                </motion.div>
                <div className="space-y-1">
                  <CardTitle 
                    className="line-clamp-2 text-lg md:text-xl leading-tight group-hover:text-primary transition-colors"
                    title={medicalCase.title}
                  >
                    {medicalCase.title}
                  </CardTitle>
                  <div className="flex items-center text-sm md:text-base text-muted-foreground">
                    <User className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <span className="truncate">
                      {medicalCase.patient.name}, {medicalCase.patient.age} y/o {medicalCase.patient.gender}
                    </span>
                  </div>
                </div>
              </div>
              <time
                dateTime={new Date(medicalCase.createdAt).toISOString()}
                className="flex items-center gap-1 flex-shrink-0 whitespace-nowrap text-xs md:text-sm text-muted-foreground"
              >
                <CalendarDays className="h-3 w-3" aria-hidden="true" />
                {createdDate}
              </time>
            </div>
          </CardHeader>

          {/* Body */}
          <CardContent className="flex flex-1 flex-col">
            <div className="flex-1 space-y-4">
              {/* Chief complaint */}
              <section className="group/section">
                <h4 className="mb-1 flex items-center text-sm md:text-base font-medium text-primary">
                  <Clipboard className="mr-2 h-4 w-4 flex-shrink-0 transition-transform group-hover/section:scale-110" aria-hidden="true" />
                  Chief Complaint
                </h4>
                <p 
                  className="line-clamp-2 text-sm md:text-base text-muted-foreground transition-colors group-hover/section:text-foreground/80"
                  title={medicalCase.chiefComplaint}
                >
                  {medicalCase.chiefComplaint}
                </p>
              </section>

              {/* Diagnosis */}
              {primaryDx && (
                <section className="group/section">
                  <h4 className="mb-1 flex items-center text-sm md:text-base font-medium text-primary">
                    <Stethoscope className="mr-2 h-4 w-4 flex-shrink-0 transition-transform group-hover/section:scale-110" aria-hidden="true" />
                    Diagnosis
                  </h4>
                  <p 
                    className="line-clamp-2 text-sm md:text-base text-muted-foreground transition-colors group-hover/section:text-foreground/80"
                    title={primaryDx.name}
                  >
                    {primaryDx.name}
                    {primaryDx.status !== "confirmed" && (
                      <Badge 
                        variant="outline" 
                        className="ml-2 text-xs md:text-sm"
                      >
                        {primaryDx.status}
                      </Badge>
                    )}
                  </p>
                </section>
              )}
            </div>

            {/* Tags & action */}
            <footer className="mt-6 border-t border-medical-100 pt-4">
              <div className="mb-4">
                <h4 className="mb-2 flex items-center text-sm md:text-base font-medium text-primary">
                  <Tag className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence mode="popLayout">
                    {visibleTags.map((tag) => (
                      <TagPill key={tag.id} tag={tag} />
                    ))}
                    {hiddenTagCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
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
                        className="group/btn relative"
                      >
                        <Link to={`/cases/${medicalCase.id}`}>
                          View Details
                          <motion.div
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-primary/40"
                            animate={{ 
                              x: isHovered ? 4 : 0,
                              opacity: isHovered ? 1 : 0 
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </motion.div>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View full case details</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {onDelete && (
                  <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-destructive hover:text-destructive/80"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Case</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this case? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={confirmDelete}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </footer>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

CaseCard.displayName = "CaseCard";
