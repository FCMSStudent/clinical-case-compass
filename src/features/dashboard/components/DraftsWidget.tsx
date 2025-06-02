
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { FileText, Edit } from "lucide-react";

export const DraftsWidget = () => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Draft Cases</CardTitle>
        <FileText className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">3</div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Edit className="h-3 w-3" />
          <span>Last edited 2 hrs ago</span>
        </div>
        <div className="mt-3">
          <Badge variant="outline" className="text-xs">Continue editing</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
