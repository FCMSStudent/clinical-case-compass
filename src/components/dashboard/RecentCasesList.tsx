
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert
import { Terminal } from "lucide-react"; // For error alert icon
import { useCases, CaseSummary } from "@/hooks/useCases"; // Import the hook and CaseSummary type
import { cn } from "@/lib/utils";

// Props are no longer needed as the component fetches its own data
// interface RecentCasesListProps {
//   cases: CaseSummary[]; // Using CaseSummary from the hook
// }

export function RecentCasesList() {
  const { cases, isLoading, error } = useCases();

  if (isLoading) {
    return (
      <Card className="border-medical-200 shadow-md transition-all duration-200 hover:shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-medical-700">Recent Cases</CardTitle>
          <CardDescription>Your most recently updated cases</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-medical-100">
            {[...Array(3)].map((_, i) => ( // Display 3 skeleton items
              <div key={i} className="px-6 py-4">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-3" />
                <div className="flex gap-2 mt-2 flex-wrap">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Error Fetching Cases</AlertTitle>
        <AlertDescription>
          There was a problem loading recent cases. Please try again later.
          {error.message && <p className="text-xs mt-2">Details: {error.message}</p>}
        </AlertDescription>
      </Alert>
    );
  }
  
  if (cases.length === 0) {
    return (
      <Card className="border-medical-200 shadow-md transition-all duration-200 hover:shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-medical-700">Recent Cases</CardTitle>
          <CardDescription>Your most recently updated cases</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4 text-center">No cases found</p>
          <Button asChild className="bg-medical-600 hover:bg-medical-700 text-white">
            <Link to="/cases/new">Add your first case</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-medical-200 shadow-md transition-all duration-200 hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-medical-700">Recent Cases</CardTitle>
        <CardDescription>Your most recently updated cases</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-medical-100">
          {cases.map((medCase: CaseSummary) => ( // Use CaseSummary type here
            <Link
              key={medCase.id}
              to={`/cases/${medCase.id}`}
              className="block hover:bg-medical-50 px-6 py-4 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-medical-700">{medCase.title}</h3>
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
                      backgroundColor: `${tag.color}20`, // Assuming color is hex
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
