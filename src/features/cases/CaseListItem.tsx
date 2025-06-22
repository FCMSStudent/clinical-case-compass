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
