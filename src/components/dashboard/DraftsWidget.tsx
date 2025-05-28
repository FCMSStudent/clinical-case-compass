import { StatCard } from "@/components/shared/StatCard";
import { FileEdit } from "lucide-react";

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
