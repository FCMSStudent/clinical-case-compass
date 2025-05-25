
import { format } from "date-fns";
import { User, ClipboardText, Stethoscope, Tag } from 'lucide-react';
import { MedicalCase } from "@/types/case";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface CaseCardProps {
  medicalCase: MedicalCase;
  className?: string;
}

export const CaseCard = memo<CaseCardProps>(({ medicalCase, className }) => {
  const primaryDiagnosis = medicalCase.diagnoses && medicalCase.diagnoses.length > 0
    ? (medicalCase.diagnoses.find(d => d.status === "confirmed") || medicalCase.diagnoses[0])
    : null;
  
  return (
    <Card className={cn("transition-all duration-200 hover:shadow-lg hover:scale-[1.02] flex flex-col h-full", className)}>
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="text-lg line-clamp-2 leading-tight">
            {medicalCase.title}
          </CardTitle>
          <div className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
            {format(new Date(medicalCase.createdAt), "MMM d, yyyy")}
          </div>
        </div>
        <div className="text-sm text-muted-foreground flex items-center">
          <User className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{medicalCase.patient.name}, {medicalCase.patient.age} y/o{" "}
          {medicalCase.patient.gender}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <div>
            <div className="text-sm font-medium text-primary mb-1 flex items-center">
              <ClipboardText className="h-4 w-4 mr-2 flex-shrink-0" />
              Chief Complaint
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {medicalCase.chiefComplaint}
            </p>
          </div>
          
          {primaryDiagnosis && (
            <div>
              <div className="text-sm font-medium text-primary mb-1 flex items-center">
                <Stethoscope className="h-4 w-4 mr-2 flex-shrink-0" />
                Diagnosis
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {primaryDiagnosis.name}
                {primaryDiagnosis.status !== "confirmed" && (
                  <span className="ml-1 text-xs">({primaryDiagnosis.status})</span>
                )}
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-3 border-t border-medical-100">
          <div className="text-sm font-medium text-primary mb-1 flex items-center">
            <Tag className="h-4 w-4 mr-2 flex-shrink-0" />
            Tags
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {medicalCase.tags && medicalCase.tags.slice(0, medicalCase.tags.length > 3 ? 2 : medicalCase.tags.length).map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${tag.color}20`, // Ensure good contrast
                  color: tag.color,
                }}
              >
                {tag.name}
              </span>
            ))}
            {medicalCase.tags && medicalCase.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                +{medicalCase.tags.length - 2}
              </span>
            )}
          </div>
          <div className="flex justify-end">
            <Button asChild variant="outline" size="sm">
              <Link to={`/cases/${medicalCase.id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

CaseCard.displayName = "CaseCard";
