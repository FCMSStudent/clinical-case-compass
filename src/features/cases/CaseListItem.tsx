import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MedicalCase } from '@/types/case';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Clipboard, 
  Eye, 
  Edit, 
  Trash2, 
  Tag as TagIcon, 
  CalendarDays,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
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
import { Badge } from "@/components/ui/badge";

interface CaseListItemProps {
  medicalCase: MedicalCase;
  className?: string;
  onDelete: (caseId: string) => void;
}

export const CaseListItem = memo<CaseListItemProps>(({ medicalCase, className, onDelete }) => {
  const primaryTag = medicalCase.tags && medicalCase.tags.length > 0 ? medicalCase.tags[0] : null;
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    onDelete(medicalCase.id);
    setShowDeleteDialog(false);
  };

  // Defensive access for potentially undefined properties
  const formattedDate = medicalCase?.createdAt
    ? format(new Date(medicalCase.createdAt), "MMM d, yyyy")
    : "N/A";

  try {
    // Basic check for essential data
    if (!medicalCase || !medicalCase.patient) {
      throw new Error("Medical case or patient data is missing for list item.");
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
            "relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 group overflow-hidden transition-all duration-200",
            "hover:bg-white/15 hover:border-white/30",
            "focus-within:ring-2 focus-within:ring-white/20 focus-within:ring-offset-2",
            className
          )}>
            {/* Gradient overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Left Section: Main Info */}
              <div className="flex-grow space-y-2 min-w-0">
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
                      className="font-semibold text-lg truncate text-white group-hover:text-white transition-colors"
                      title={medicalCase.title}
                    >
                      {medicalCase.title}
                    </h3>
                    <div className="flex items-center text-sm text-white/70">
                      <User className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
                      <span className="truncate">
                        {medicalCase.patient.name}, {medicalCase.patient.age} y/o {medicalCase.patient.gender}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start text-sm text-white/70">
                  <Clipboard className="h-4 w-4 mr-2 mt-1 flex-shrink-0" aria-hidden="true" />
                  <p className="truncate" title={medicalCase.chiefComplaint}>
                    {medicalCase.chiefComplaint}
                  </p>
                </div>

                <div className="flex items-center text-xs text-white/60 pt-1">
                  <CalendarDays className="h-3 w-3 mr-1 flex-shrink-0" aria-hidden="true" />
                  <time dateTime={medicalCase.createdAt ? new Date(medicalCase.createdAt).toISOString() : undefined}>
                    Created: {formattedDate}
                  </time>
                </div>
              </div>

              {/* Right Section: Tags & Actions */}
              <div className="flex-shrink-0 flex flex-col items-start sm:items-end space-y-2 w-full sm:w-auto">
                {/* Tags */}
                <div className="flex items-center gap-2">
                  <AnimatePresence mode="popLayout">
                    {primaryTag && (
                      <motion.span
                        key={primaryTag.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors"
                        style={{
                          backgroundColor: `${primaryTag.color}20`,
                          color: primaryTag.color,
                        }}
                      >
                        <TagIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                        {primaryTag.name}
                      </motion.span>
                    )}
                    {medicalCase.tags && medicalCase.tags.length > 1 && (
                      <Badge variant="secondary" className="text-xs bg-white/10 border-white/20 text-white/80">
                        +{medicalCase.tags.length - 1}
                      </Badge>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 pt-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="relative group/btn bg-white/10 hover:bg-white/20 text-white"
                        >
                          <Link to={`/cases/${medicalCase.id}`} className="flex items-center">
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                              <span className="sr-only">View Case</span>
                            </span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
                        View Case Details
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="relative group/btn bg-white/10 hover:bg-white/20 text-white"
                        >
                          <Link to={`/cases/edit/${medicalCase.id}`} className="flex items-center">
                            <span className="flex items-center">
                              <Edit className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                              <span className="sr-only">Edit Case</span>
                            </span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
                        Edit Case
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="relative group/btn bg-white/10 hover:bg-red-400/10 text-red-300 hover:text-red-200"
                      >
                        <Trash2 className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                        <span className="sr-only">Delete Case</span>
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
                </div>
              </div>
            </div>

            {/* Hover indicator */}
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60"
              animate={{
                x: isHovered ? -8 : 0,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  } catch (error) {
    console.error(`[CaseListItem] Error rendering medicalCase ID: ${medicalCase?.id || 'Unknown'}`, error);
    return (
      <div className={cn(
        "relative bg-red-900/30 backdrop-blur-md rounded-2xl border border-red-700/50 p-4 flex items-center justify-between text-center",
        "hover:bg-red-900/40",
        className
      )}>
        <div className="flex items-center">
          <AlertCircle className="h-6 w-6 text-red-400 mr-3" />
          <div>
            <p className="text-sm font-medium text-red-200">Error displaying this case item.</p>
            <p className="text-xs text-red-300">ID: {medicalCase?.id || "Unknown"}</p>
          </div>
        </div>
        <ChevronRight className="h-6 w-6 text-red-400/50" />
      </div>
    );
  }
});

CaseListItem.displayName = "CaseListItem";
