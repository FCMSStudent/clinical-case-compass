import React from "react";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface CasesSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CasesSearchBar: React.FC<CasesSearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardContent className="p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
          <Input
            placeholder="Search cases by title, patient name, or chief complaint..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
          />
        </div>
      </CardContent>
    </Card>
  );
}; 