import { BentoCard } from "@/shared/components/bento-card";
import { Badge } from "@/shared/components/badge";
import { User, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";
import { MedicalCase } from "@/shared/types/case";
import { typography } from "@/design-system/ui-styles";
import { cn } from "@/shared/utils/utils";

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
        {/* Patient Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-white/60 text-xs uppercase tracking-wide font-medium">Medical Record</div>
            <div className={cn(typography.body.small, "font-medium")}>
              {medicalCase.patient.medicalRecordNumber || "Not provided"}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-white/60 text-xs uppercase tracking-wide font-medium">Case Status</div>
            <Badge 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white capitalize font-medium"
            >
              {medicalCase.status}
            </Badge>
          </div>
        </div>

        {/* Case Timeline */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/70">
            <Calendar className="h-4 w-4 text-white/60" />
            <span className="text-sm">
              Created {format(new Date(medicalCase.createdAt), "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <FileText className="h-4 w-4 text-white/60" />
            <span className="text-sm">
              Updated {format(new Date(medicalCase.updatedAt), "MMM d, yyyy")}
            </span>
          </div>
        </div>

        {/* Tags Section */}
        {medicalCase.tags && medicalCase.tags.length > 0 && (
          <div className="pt-4 border-t border-white/10">
            <div className="text-white/60 text-xs uppercase tracking-wide font-medium mb-3">Tags</div>
            <div className="flex flex-wrap gap-2">
              {medicalCase.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ring-1 ring-white/10"
                  style={{
                    backgroundColor: `${tag.color}15`,
                    color: tag.color,
                    borderColor: `${tag.color}30`
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
