
import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { MedicalCase } from "@/types/case";
import { TagPill } from "./TagPill";

interface CaseCardFooterProps {
  medicalCase: MedicalCase;
  isHovered: boolean;
  onDelete?: (caseId: string) => void;
}

const VISIBLE_TAGS = 2;

export const CaseCardFooter = memo(({ medicalCase, isHovered, onDelete }: CaseCardFooterProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();
  
  const visibleTags = medicalCase?.tags?.slice(0, VISIBLE_TAGS) ?? [];
  const hiddenTagCount = (medicalCase?.tags?.length ?? 0) - visibleTags.length;

  const confirmDelete = () => {
    if (onDelete) {
      onDelete(medicalCase.id);
      setShowDeleteDialog(false);
    }
  };

  return (
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
                size="sm"
                variant="outline"
                onClick={() => navigate(`/cases/${medicalCase.id}`)}
                className="group/btn relative bg-white/10 border-white/20 hover:bg-white/20 text-white"
              >
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
  );
});

CaseCardFooter.displayName = "CaseCardFooter";
