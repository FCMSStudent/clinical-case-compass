
import { format } from "date-fns";
import { MedicalCase } from "@/types/case";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CaseCardProps {
  medicalCase: MedicalCase;
  className?: string;
}

export function CaseCard({ medicalCase, className }: CaseCardProps) {
  const primaryDiagnosis = medicalCase.diagnoses && medicalCase.diagnoses.length > 0
    ? (medicalCase.diagnoses.find(d => d.status === "confirmed") || medicalCase.diagnoses[0])
    : null;
  
  return (
    <Card className={cn("transition-all duration-200 hover:shadow-lg flex flex-col h-full", className)}>
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex justify-between items-start gap-3">
          <CardTitle className="text-lg text-medical-700 line-clamp-2 leading-tight">
            {medicalCase.title}
          </CardTitle>
          <div className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
            {format(new Date(medicalCase.createdAt), "MMM d, yyyy")}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {medicalCase.patient.name}, {medicalCase.patient.age} y/o{" "}
          {medicalCase.patient.gender}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <div>
            <div className="text-sm font-medium text-medical-600 mb-1">Chief Complaint</div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {medicalCase.chiefComplaint}
            </p>
          </div>
          
          {primaryDiagnosis && (
            <div>
              <div className="text-sm font-medium text-medical-600 mb-1">Diagnosis</div>
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
          <div className="flex flex-wrap gap-2 mb-3">
            {medicalCase.tags && medicalCase.tags.slice(0, 2).map((tag) => (
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
            {medicalCase.tags && medicalCase.tags.length > 2 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-medical-100 text-medical-600">
                +{medicalCase.tags.length - 2}
              </span>
            )}
          </div>
          <div className="flex justify-end">
            <Link 
              to={`/cases/${medicalCase.id}`} 
              className="text-xs font-medium text-medical-600 hover:text-medical-800 hover:underline transition-colors"
            >
              View details →
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
