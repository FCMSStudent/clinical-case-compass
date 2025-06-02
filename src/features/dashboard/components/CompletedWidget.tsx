
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Trophy } from "lucide-react";

export const CompletedWidget = () => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Completed</CardTitle>
        <CheckCircle className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">24</div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Trophy className="h-3 w-3" />
          <span>This month</span>
        </div>
        <div className="mt-3">
          <Badge variant="default" className="text-xs">Great progress!</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
