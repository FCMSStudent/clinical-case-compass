import React from "react";
import { BookOpen, Plus } from "lucide-react";
import { Card, CardContent } from "@/shared/components/card";
import { Button } from "@/shared/components/button";
import { Link } from "react-router-dom";
import { typo } from "@/design-system/tokens/typography";
import { cn } from "@/shared/utils/utils";

interface CasesEmptyStateProps {
  searchQuery: string;
}

export const CasesEmptyState: React.FC<CasesEmptyStateProps> = ({ searchQuery }) => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardContent className="p-12 text-center">
        <BookOpen className="h-12 w-12 text-white/60 mx-auto mb-4" />
        <h3 className={cn(typo.h3, "text-white mb-2")}>No cases found</h3>
        <p className={cn(typo.body, "text-white/70 mb-4")}>
          {searchQuery ? "Try adjusting your search terms" : "Get started by creating your first case"}
        </p>
        <Button asChild className="bg-white/20 border-white/30 text-white hover:bg-white/30">
          <Link to="/cases/new">
            <Plus className="h-4 w-4 mr-2" />
            Create New Case
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}; 