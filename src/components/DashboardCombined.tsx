import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/utils";
import { MedicalCase } from "@/types/case";
import { format } from "date-fns";
import { Briefcase, CheckCircle, FileEdit, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  description,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export function ActiveCasesWidget() {
  return (
    <StatCard
      title="Active Cases"
      value="0" 
      icon={<Briefcase className="h-4 w-4 text-muted-foreground" />}
      description="Currently ongoing cases"
    />
  );
}

export function CompletedWidget() {
  return (
    <StatCard
      title="Completed Cases"
      value="0" 
      icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
      description="Successfully closed cases"
    />
  );
}

export function DraftsWidget() {
  return (
    <StatCard
      title="Drafts"
      value="0" 
      icon={<FileEdit className="h-4 w-4 text-muted-foreground" />}
      description="Cases saved as drafts"
    />
  );
}

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

export function RecentActivity() {
  // Placeholder for actual activity items
  const activityItems = [
    { id: 1, description: "Case 'Viral Pneumonia' updated", time: "2 hours ago" },
    { id: 2, description: "New case 'Sprained Ankle' created", time: "1 day ago" },
    { id: 3, description: "Settings updated: Notifications enabled", time: "3 days ago" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activityItems.length > 0 ? (
          <ul className="space-y-4">
            {activityItems.map((item) => (
              <li key={item.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {/* Placeholder for an icon, e.g., based on activity type */}
                  <span className="text-sm text-muted-foreground">●</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {item.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No recent activity yet.</p>
        )}
      </CardContent>
    </Card>
  );
}

interface RecentCasesListProps {
  cases: MedicalCase[];
}

export function RecentCasesList({ cases }: RecentCasesListProps) {
  if (cases.length === 0) {
    return (
      <Card className="border-border shadow-md transition-all duration-200 hover:shadow-lg">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4 text-center">No cases found</p>
          <Button asChild>
            <Link to="/cases/new">Add your first case</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border shadow-md transition-all duration-200 hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Recent Cases</CardTitle>
        <CardDescription>Your most recently updated cases</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {cases.map((medCase) => (
            <Link
              key={medCase.id}
              to={`/cases/${medCase.id}`}
              className="block hover:bg-muted/50 px-6 py-4 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-primary">{medCase.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {medCase.patient.name}, {medCase.patient.age} y/o{" "}
                    {medCase.patient.gender}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {format(new Date(medCase.updatedAt), "MMM d, yyyy")}
                </div>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {medCase.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs"
                    style={{
                      backgroundColor: `${tag.color}20`,
                      color: tag.color,
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function SearchBar() {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <Input
        type="search"
        placeholder="Search case titles and chief complaints..."
        className="pl-10 pr-4 py-2 w-full" // Added padding for the icon and some general styling
      />
    </div>
  );
}
