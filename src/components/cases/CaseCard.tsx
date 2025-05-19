
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
  const primaryDiagnosis = medicalCase.diagnoses.find(d => d.status === "confirmed") || medicalCase.diagnoses[0];
  
  return (
    <Card className={cn("transition-all duration-200 hover:shadow-lg h-full", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-medical-700">{medicalCase.title}</CardTitle>
          <div className="text-xs text-muted-foreground whitespace-nowrap">
            {format(new Date(medicalCase.createdAt), "MMM d, yyyy")}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {medicalCase.patient.name}, {medicalCase.patient.age} y/o{" "}
          {medicalCase.patient.gender}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <div className="text-sm font-medium text-medical-600">Chief Complaint</div>
          <p className="text-sm text-muted-foreground">
            {medicalCase.chiefComplaint}
          </p>
        </div>
        
        {primaryDiagnosis && (
          <div>
            <div className="text-sm font-medium text-medical-600">Diagnosis</div>
            <p className="text-sm text-muted-foreground">
              {primaryDiagnosis.name}
              {primaryDiagnosis.status !== "confirmed" && (
                <span className="ml-1 text-xs">({primaryDiagnosis.status})</span>
              )}
            </p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 pt-1">
          {medicalCase.tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs"
              style={{
                backgroundColor: `${tag.color}20`,
                color: tag.color,
              }}
            >
              {tag.name}
            </span>
          ))}
          <div className="flex-1"></div>
          <Link 
            to={`/cases/${medicalCase.id}`} 
            className="text-xs font-medium text-medical-600 hover:text-medical-800 hover:underline"
          >
            View details →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
