import React from "react";
import { MedicalCase } from "@/shared/types/case";
import { CaseCard } from "../CaseCard";
import { CaseListItem } from "../CaseListItem";

interface CasesGridProps {
  cases: MedicalCase[];
  viewMode: "grid" | "list";
}

export const CasesGrid: React.FC<CasesGridProps> = ({ cases, viewMode }) => {
  return (
    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
      {cases.map((caseItem: MedicalCase) => {
        try {
          // Add safety check for case item
          if (!caseItem || !caseItem.id) {
            console.warn("[CasesGrid] Skipping invalid case item:", caseItem);
            return null;
          }

          return (
            <div key={caseItem.id}>
              {viewMode === "grid" ? (
                <CaseCard medicalCase={caseItem} />
              ) : (
                <CaseListItem medicalCase={caseItem} onDelete={() => {}} />
              )}
            </div>
          );
        } catch (renderError) {
          console.error("[CasesGrid] Error rendering case item:", caseItem?.id, renderError);
          return (
            <div key={caseItem?.id || Math.random()} className="p-4 border border-red-500 rounded bg-red-900/20">
              <p className="text-red-300 text-sm">Error rendering case: {caseItem?.title || 'Unknown'}</p>
            </div>
          );
        }
      })}
    </div>
  );
}; 