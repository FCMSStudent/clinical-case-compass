import { Badge } from "@/shared/components/badge";
import { MedicalCase } from "@/shared/types/case";

interface CaseCardBodyProps {
  medicalCase: MedicalCase;
  primaryDx: any; // TODO: Type this properly
}

export const CaseCardBody = memo(({ medicalCase, primaryDx }: CaseCardBodyProps) => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 space-y-4">
        {/* Chief complaint */}
        <section className="group/section">
          <h4 className="mb-1 flex items-center text-sm md:text-base font-medium text-white">
            <Clipboard className="mr-2 h-4 w-4 flex-shrink-0 transition-transform group-hover/section:scale-110" aria-hidden="true" />
            Chief Complaint
          </h4>
          <p 
            className="line-clamp-2 text-sm md:text-base text-white/80 transition-colors group-hover/section:text-white"
            title={medicalCase.chiefComplaint}
          >
            {medicalCase.chiefComplaint}
          </p>
        </section>

        {/* Diagnosis */}
        {primaryDx && (
          <section className="group/section">
            <h4 className="mb-1 flex items-center text-sm md:text-base font-medium text-white">
              <Stethoscope className="mr-2 h-4 w-4 flex-shrink-0 transition-transform group-hover/section:scale-110" aria-hidden="true" />
              Diagnosis
            </h4>
            <p
              className="line-clamp-2 text-sm md:text-base text-white/80 transition-colors group-hover/section:text-white"
              title={primaryDx.name}
            >
              {primaryDx.name}
              {primaryDx.status !== "confirmed" && (
                <Badge
                  variant="outline"
                  className="ml-2 text-xs md:text-sm bg-white/10 border-white/20 text-white/80"
                >
                  {primaryDx.status}
                </Badge>
              )}
            </p>
          </section>
        )}
      </div>
    </div>
  );
});

CaseCardBody.displayName = "CaseCardBody"; 