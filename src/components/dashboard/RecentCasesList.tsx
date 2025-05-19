
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
import { MedicalCase } from "@/types/case";
import { cn } from "@/lib/utils";

interface RecentCasesListProps {
  cases: MedicalCase[];
}

export function RecentCasesList({ cases }: RecentCasesListProps) {
  if (cases.length === 0) {
    return (
      <Card className="border-medical-200 shadow-md transition-all duration-200 hover:shadow-lg">
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
          {cases.map((medCase) => (
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
