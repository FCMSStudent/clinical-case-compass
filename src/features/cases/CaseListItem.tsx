
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { MedicalCase } from '@/types/case';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Clipboard, Eye, Edit, Trash2, Tag as TagIcon, CalendarDays } from 'lucide-react'; // Changed ClipboardText to Clipboard
import { format } from 'date-fns';
import { cn } from '@/utils'; // For optional className

interface CaseListItemProps {
  medicalCase: MedicalCase;
  className?: string;
  onDelete: (caseId: string) => void;
}

export const CaseListItem = memo<CaseListItemProps>(({ medicalCase, className, onDelete }) => {
  const primaryTag = medicalCase.tags && medicalCase.tags.length > 0 ? medicalCase.tags[0] : null;
  // Simplified: just show the first tag, or more sophisticated logic like in CaseCard can be adopted if needed.

  const handleDelete = () => {
    onDelete(medicalCase.id);
  };

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4"> {/* Main flex container: items-start for alignment if content heights differ */}
          
          {/* Left Section: Main Info (takes up more space) */}
          <div className="flex-grow space-y-2 min-w-0"> {/* min-w-0 for proper truncation */}
            <h3 className="font-semibold text-lg truncate" title={medicalCase.title}>
              {medicalCase.title}
            </h3>

            <div className="flex items-center text-sm text-muted-foreground" title={`Patient: ${medicalCase.patient.name}, ${medicalCase.patient.age} y/o ${medicalCase.patient.gender}`}>
              <User className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{medicalCase.patient.name}, {medicalCase.patient.age} y/o {medicalCase.patient.gender}</span>
            </div>

            <div className="flex items-start text-sm text-muted-foreground" title={`Complaint: ${medicalCase.chiefComplaint}`}>
              <Clipboard className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" /> {/* Changed ClipboardText to Clipboard */}
              <p className="truncate">
                {medicalCase.chiefComplaint}
              </p>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground pt-1">
              <CalendarDays className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
              <span>Created: {format(new Date(medicalCase.createdAt), "MMM d, yyyy")}</span>
            </div>
          </div>

          {/* Right Section: Tags & Actions (fixed width or shrinks less) */}
          <div className="flex-shrink-0 flex flex-col items-end space-y-2">
            {/* Tags */}
            <div className="flex items-center gap-2">
              {primaryTag && (
                <span
                  key={primaryTag.id}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${primaryTag.color}20`, // Assuming hex color with alpha
                    color: primaryTag.color,
                  }}
                  title={`Tag: ${primaryTag.name}`}
                >
                  <TagIcon className="h-3 w-3 mr-1" /> {primaryTag.name}
                </span>
              )}
              {/* Add more tags or a "+N" badge if needed, similar to CaseCard */}
               {medicalCase.tags && medicalCase.tags.length > 1 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    +{medicalCase.tags.length - 1}
                  </span>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 pt-2">
              <Button variant="ghost" size="sm" asChild title="View Case">
                <Link to={`/cases/${medicalCase.id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild title="Edit Case">
                <Link to={`/cases/edit/${medicalCase.id}`}>
                  <Edit className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDelete} title="Delete Case">
                <Trash2 className="h-4 w-4 text-destructive hover:text-destructive/80" />
              </Button>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
});

CaseListItem.displayName = "CaseListItem";
