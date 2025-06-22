import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MedicalCase } from '@/shared/types/case';
import { Button } from '@/shared/components/button';
import { 
  User, 
  Clipboard, 
  Eye, 
  Edit, 
  Trash2, 
  Tag as TagIcon, 
  CalendarDays,
  AlertCircle,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/shared/utils/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/tooltip";
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
} from "@/shared/components/alert-dialog";
import { Badge } from "@/shared/components/badge";

interface CaseListItemProps {
  medicalCase: MedicalCase;
  className?: string;
  onDelete: (caseId: string) => void;
}

export const CaseListItem = memo<CaseListItemProps>(({ medicalCase, className, onDelete }) => {
  const primaryTag = medicalCase.tags && medicalCase.tags.length > 0 ? medicalCase.tags[0] : null;
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
        {/* Applying glass-panel styling with p-4 directly to the main motion.div container */}
        {/* The outer 'relative' div and inner 'absolute' div for previous effect were removed. */}
        <div className={cn(
          "bg-white/20 backdrop-blur-lg border border-white/20 rounded-[16px] p-4 hover:shadow-lg transition", // Core glass-panel with p-4
          "flex items-center justify-between", // Added from spec for overall li structure
          "group overflow-hidden", // Keep group for potential inner hover effects, overflow-hidden is good practice
          className
        )}>
            {/* Content structure from spec: left part (icon + text), right part (status dot) */}
            <span className="flex items-center flex-grow min-w-0 mr-3"> {/* Left part, mr-3 for spacing from status dot */}
              {/* Icon section - applying glass-inner */}
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full mr-3 flex-shrink-0">
                {/* Using Sparkles as the example icon from original code, styled as per spec */}
                <Sparkles className="h-5 w-5 text-white/70" />
              </div>

              {/* Text content div */}
              <div className="flex-grow min-w-0"> {/* flex-grow and min-w-0 to handle truncation */}
                {/* Case Title / Name */}
                <div className="font-semibold text-white text-base truncate" title={medicalCase.title}>
                  {medicalCase.title || "Untitled Case"}
                </div>
                {/* Patient Info / Subtitle */}
                <div className="text-sm text-white/70 truncate">
                  {medicalCase.patient ? `${medicalCase.patient.name}, ${medicalCase.patient.age} y/o ${medicalCase.patient.gender}` : "Patient N/A"}
                  {medicalCase.chiefComplaint && ` • ${medicalCase.chiefComplaint.substring(0,30)}${medicalCase.chiefComplaint.length > 30 ? "..." : ""}`}
                </div>
              </div>
            </span>

            {/* Right Section: Status Indicator from spec */}
            {/* Simplified from original tags/actions to a status dot for this iteration. */}
            {/* Logic for color can be expanded. Using green as default. */}
            <span className="inline-block w-3 h-3 rounded-full bg-green-400/80 flex-shrink-0"></span>

            {/* TODO: Decide on placement/styling of original action buttons if they are to be kept. */}
            {/* For this pass, they are omitted to match the simple spec list item. */}
            {/* Original actions and tags were previously in this part of the flex layout:
                <div className="flex-shrink-0 flex flex-col items-start sm:items-end space-y-2 w-full sm:w-auto">
                  ... tags ...
                  ... action buttons ...
                </div>
            */}
        </div>
      </motion.div>
    );
  } catch (error) {
    console.error(`[CaseListItem] Error rendering medicalCase ID: ${medicalCase?.id || 'Unknown'}`, error);
    // Apply new glass panel styling to the error state for consistency
    return (
      <div className={cn(
        "bg-red-700/20 backdrop-blur-lg border border-red-700/40 rounded-[16px] p-4 flex items-center justify-between text-center", // Error panel style
        "hover:shadow-lg transition", // Consistent hover effect
        className
      )}>
        {/* Structure mirroring the successful item display for consistency */}
        <span className="flex items-center flex-grow min-w-0 mr-3">
          <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full mr-3 flex-shrink-0"> {/* Glass-inner for icon */}
            <AlertCircle className="h-5 w-5 text-red-300/70" /> {/* Adjusted icon style */}
          </div>
          <div className="flex-grow min-w-0">
            <p className="font-semibold text-red-200 text-base truncate">Error: Item cannot be displayed.</p> {/* Adjusted text */}
            <p className="text-sm text-red-300/70 truncate">ID: {medicalCase?.id || "Unknown"}</p>
          </div>
        </span>
        {/* Consistent right element, though its utility in error state can be debated */}
        <ChevronRight className="h-6 w-6 text-red-300/50 flex-shrink-0" />
      </div>
    );
  }
});

CaseListItem.displayName = "CaseListItem";
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
