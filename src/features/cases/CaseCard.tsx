import React, { memo, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { MedicalCase } from "@/types/case";
import { CaseCardHeader } from "./components/CaseCardHeader";
import { CaseCardBody } from "./components/CaseCardBody";
import { CaseCardFooter } from "./components/CaseCardFooter";
import { CaseCardError } from "./components/CaseCardError";
import { getPrimaryDiagnosis, isValidMedicalCase } from "./utils/caseUtils";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * CONSTANTS & HELPERS
 * ────────────────────────────────────────────────────────────────────────────────
 */
const VISIBLE_TAGS = 2;

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
 * Refactored to use smaller, focused components for better maintainability.
 */
export const CaseCard: React.FC<CaseCardProps> = memo(
  ({ medicalCase, className, onDelete }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Derived values
    const primaryDx = useMemo(() => getPrimaryDiagnosis(medicalCase), [medicalCase]);

    try {
      // Validate medical case data
      if (!isValidMedicalCase(medicalCase)) {
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
            <div className="absolute inset-0 bg-white/8 backdrop-blur-[18px] saturate-140 brightness-106 rounded-2xl border border-white/20 shadow-xl"></div>
            <div className={cn(
              "relative bg-white/8 backdrop-blur-[18px] saturate-140 brightness-106 rounded-2xl border border-white/20 p-6 h-full flex flex-col overflow-hidden transition-all duration-200",
              "hover:bg-white/12 hover:border-white/30 hover:scale-[1.02] hover:shadow-2xl",
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
              <CaseCardHeader medicalCase={medicalCase} isHovered={isHovered} />

              {/* Body */}
              <CaseCardBody medicalCase={medicalCase} primaryDx={primaryDx} />

              {/* Footer */}
              <CaseCardFooter 
                medicalCase={medicalCase} 
                isHovered={isHovered} 
                onDelete={onDelete} 
              />
            </div>
          </div>
        </motion.div>
      );
    } catch (error) {
      console.error(`[CaseCard] Error rendering medicalCase ID: ${medicalCase?.id || 'Unknown'}`, error);
      return <CaseCardError medicalCase={medicalCase} className={className} />;
    }
  }
);

CaseCard.displayName = "CaseCard";
