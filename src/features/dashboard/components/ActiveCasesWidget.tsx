
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Clock, TrendingUp } from "lucide-react";

export const ActiveCasesWidget = () => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">8</div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <TrendingUp className="h-3 w-3" />
          <span>+2 from last week</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs">Cardiology: 3</Badge>
          <Badge variant="secondary" className="text-xs">Emergency: 2</Badge>
          <Badge variant="secondary" className="text-xs">Internal: 3</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
