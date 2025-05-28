
import { StatCard } from "@/components/dashboard/StatCard";
import { Briefcase } from "lucide-react";

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
