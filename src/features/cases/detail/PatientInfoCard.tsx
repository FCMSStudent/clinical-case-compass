
import React from "react";
import { BentoCard } from "@/components/ui/bento-card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";
import { MedicalCase } from "@/types/case";
import { typography, spacing } from "@/lib/ui-styles";

interface PatientInfoCardProps {
  medicalCase: MedicalCase;
}

export const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ medicalCase }) => {
  return (
    <BentoCard
      layout="hero"
      variant="featured"
      icon={<User />}
      title={medicalCase.patient.name}
      subtitle={`${medicalCase.patient.age} years old • ${medicalCase.patient.gender}`}
    >
      <div className="space-y-4">
        {/* Patient Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-white/60 text-xs uppercase tracking-wide mb-1">Medical Record</div>
            <div className={typography.body.small}>
              {medicalCase.patient.medicalRecordNumber || "Not provided"}
            </div>
          </div>
          <div>
            <div className="text-white/60 text-xs uppercase tracking-wide mb-1">Case Status</div>
            <Badge variant="outline" className="bg-white/10 border-white/20 text-white capitalize">
              {medicalCase.status}
            </Badge>
          </div>
        </div>

        {/* Case Information */}
        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/70">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              Created {format(new Date(medicalCase.createdAt), "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <FileText className="h-4 w-4" />
            <span className="text-sm">
              Updated {format(new Date(medicalCase.updatedAt), "MMM d, yyyy")}
            </span>
          </div>
        </div>

        {/* Tags */}
        {medicalCase.tags && medicalCase.tags.length > 0 && (
          <div className="pt-3 border-t border-white/10">
            <div className="text-white/60 text-xs uppercase tracking-wide mb-2">Tags</div>
            <div className="flex flex-wrap gap-2">
              {medicalCase.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${tag.color}20`,
                    color: tag.color,
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </BentoCard>
  );
};
