import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Added for potential draft progress

export function QuickStartPanel() {
  // Placeholder for actual draft cases
  const draftCases = [
    { id: 1, title: "Draft: Follow-up on Patient Y", progress: 50, currentStep: "Step 2 of 4: Patient Info" },
    { id: 2, title: "Draft: Initial Assessment for Patient Z", progress: 25, currentStep: "Step 1 of 4: Chief Complaint" },
  ];
  // const draftCases = []; // Use this to test the "No draft cases" message

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Start</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Link to="/cases/new" className="block">
          <Button size="lg" className="w-full text-lg py-6 shadow-md hover:shadow-lg transition-shadow">
            + New Clinical Case
          </Button>
        </Link>

        <div>
          <h3 className="text-md font-semibold mb-3 text-foreground">Resume Drafts</h3>
          {draftCases.length > 0 ? (
            <div className="space-y-4">
              {draftCases.map((draft) => (
                <Link to={`/cases/new?draftId=${draft.id}`} key={draft.id} className="block hover:no-underline">
                  <Card className="hover:shadow-md transition-shadow bg-background/50 hover:bg-background/80">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-foreground">{draft.title}</p>
                        {/* Optional: Add an icon or action here, e.g., a resume button or delete icon */}
                      </div>
                      <Progress value={draft.progress} className="h-2 mb-1" />
                      <p className="text-xs text-muted-foreground">{draft.currentStep}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No draft cases to resume. Start a new case to see it here.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
