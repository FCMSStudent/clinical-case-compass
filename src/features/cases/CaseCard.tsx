import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Clipboard, Stethoscope, Tag, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MedicalCase } from "@/types/case";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * CONSTANTS & HELPERS
 * ────────────────────────────────────────────────────────────────────────────────
 */
const VISIBLE_TAGS = 2;

function getPrimaryDiagnosis(caseData: MedicalCase) {
  if (!caseData.diagnoses?.length) return null;
  return (
    caseData.diagnoses.find((d) => d.status === "confirmed") ||
    caseData.diagnoses[0]
  );
}

function TagPill({ tag }: { tag: MedicalCase["tags"][number] }) {
  return (
    <span
      key={tag.id}
      className="inline-flex items-center rounded-full px-2 py-1 text-xs md:text-sm font-medium"
      style={{
        backgroundColor: `${tag.color}20`, // subtle tint
        color: tag.color,
      }}
    >
      {tag.name}
    </span>
  );
}

/**
 * ────────────────────────────────────────────────────────────────────────────────
 * PROPS
 * ────────────────────────────────────────────────────────────────────────────────
 */
export interface CaseCardProps {
  medicalCase: MedicalCase;
  className?: string;
}

/**
 * Compact card summarising a clinical case.
 */
export const CaseCard: React.FC<CaseCardProps> = memo(
  ({ medicalCase, className }) => {
    const primaryDx = useMemo(() => getPrimaryDiagnosis(medicalCase), [medicalCase]);

    const createdDate = useMemo(
      () => format(new Date(medicalCase.createdAt), "MMM d, yyyy"),
      [medicalCase.createdAt],
    );

    const visibleTags = medicalCase.tags?.slice(0, VISIBLE_TAGS) ?? [];
    const hiddenTagCount = (medicalCase.tags?.length ?? 0) - visibleTags.length;

    return (
      <Card
        className={cn(
          "flex h-full flex-col transition-all duration-200 hover:scale-[1.02] hover:shadow-lg",
          className,
        )}
      >
        {/* — Header — */}
        <CardHeader className="flex-shrink-0 pb-3">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="line-clamp-2 text-lg md:text-xl leading-tight" title={medicalCase.title}>
              {medicalCase.title}
            </CardTitle>
            <time
              dateTime={new Date(medicalCase.createdAt).toISOString()}
              className="flex-shrink-0 whitespace-nowrap text-xs md:text-sm text-muted-foreground"
            >
              {createdDate}
            </time>
          </div>

          <div className="mt-2 flex items-center text-sm md:text-base text-muted-foreground truncate">
            <User className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden />
            {medicalCase.patient.name}, {medicalCase.patient.age} y/o {medicalCase.patient.gender}
          </div>
        </CardHeader>

        {/* — Body — */}
        <CardContent className="flex flex-1 flex-col">
          <div className="flex-1 space-y-3">
            {/* Chief complaint */}
            <section>
              <h4 className="mb-1 flex items-center text-sm md:text-base font-medium text-primary">
                <Clipboard className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden /> Chief Complaint
              </h4>
              <p className="line-clamp-2 text-sm md:text-base text-muted-foreground" title={medicalCase.chiefComplaint}>
                {medicalCase.chiefComplaint}
              </p>
            </section>

            {/* Diagnosis */}
            {primaryDx && (
              <section>
                <h4 className="mb-1 flex items-center text-sm md:text-base font-medium text-primary">
                  <Stethoscope className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden /> Diagnosis
                </h4>
                <p className="line-clamp-2 text-sm md:text-base text-muted-foreground" title={primaryDx.name}>
                  {primaryDx.name}
                  {primaryDx.status !== "confirmed" && (
                    <span className="ml-1 text-xs md:text-sm">({primaryDx.status})</span>
                  )}
                </p>
              </section>
            )}
          </div>

          {/* Tags & action */}
          <footer className="mt-4 border-t border-medical-100 pt-3">
            <h4 className="mb-1 flex items-center text-sm md:text-base font-medium text-primary">
              <Tag className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden /> Tags
            </h4>
            <div className="mb-3 flex flex-wrap gap-2">
              {visibleTags.map((tag) => (
                <TagPill key={tag.id} tag={tag} />
              ))}
              {hiddenTagCount > 0 && (
                <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs md:text-sm font-medium text-muted-foreground">
                  +{hiddenTagCount}
                </span>
              )}
            </div>
            <div className="flex justify-end">
              <Button asChild size="sm" variant="outline">
                <Link to={`/cases/${medicalCase.id}`}>View Details</Link>
              </Button>
            </div>
          </footer>
        </CardContent>
      </Card>
    );
  },
);

CaseCard.displayName = "CaseCard";
