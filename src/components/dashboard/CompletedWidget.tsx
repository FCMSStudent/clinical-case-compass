
import { StatCard } from "@/components/dashboard/StatCard";
import { CheckCircle } from "lucide-react";

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
