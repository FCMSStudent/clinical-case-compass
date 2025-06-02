
import React from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export const SearchBar = () => {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search cases, patients, or topics..."
            className="pl-10 w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};
