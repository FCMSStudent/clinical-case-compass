import { memo } from "react";
import { User, Sparkles, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { MedicalCase } from "@/shared/types/case";

interface CaseCardHeaderProps {
  medicalCase: MedicalCase;
  isHovered: boolean;
}

export const CaseCardHeader = memo(({ medicalCase, isHovered }: CaseCardHeaderProps) => {
  const createdDate = medicalCase?.createdAt 
    ? format(new Date(medicalCase.createdAt), "MMM d, yyyy") 
    : "N/A";

  return (
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
  );
});

CaseCardHeader.displayName = "CaseCardHeader"; 