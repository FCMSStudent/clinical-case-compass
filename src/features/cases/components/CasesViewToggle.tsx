
import React from "react";
import { Grid, List, Plus } from "lucide-react";
import { Button } from "@/shared/components/button";
import { useNavigate } from "react-router-dom";

interface CasesViewToggleProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export const CasesViewToggle: React.FC<CasesViewToggleProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={viewMode === "grid" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewModeChange("grid")}
        className="bg-white/20 border-white/30 text-white hover:bg-white/30"
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewModeChange("list")}
        className="bg-white/20 border-white/30 text-white hover:bg-white/30"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button 
        onClick={() => navigate("/cases/new")}
        className="bg-white/20 border-white/30 text-white hover:bg-white/30"
      >
        <Plus className="h-4 w-4 mr-2" />
        New Case
      </Button>
    </div>
  );
};
