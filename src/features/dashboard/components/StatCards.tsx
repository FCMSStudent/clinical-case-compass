import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, CheckCircle, FileEdit } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  className?: string;
}

const StatCard = ({ title, value, icon, description, className }: StatCardProps) => {
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
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export const StatCards = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Active Cases"
        value="0"
        icon={<Briefcase className="h-5 w-5 text-muted-foreground" />}
        description="Currently ongoing cases"
      />
      <StatCard
        title="Drafts"
        value="0"
        icon={<FileEdit className="h-5 w-5 text-muted-foreground" />}
        description="Cases saved as drafts"
      />
      <StatCard
        title="Completed Cases"
        value="0"
        icon={<CheckCircle className="h-5 w-5 text-muted-foreground" />}
        description="Successfully closed cases"
      />
    </div>
  );
};

export { StatCard };
