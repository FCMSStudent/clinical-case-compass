
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { getCases } from "@/lib/api/cases";
import { CaseCard } from "@/features/cases/CaseCard";
import { CaseListItem } from "@/features/cases/CaseListItem";

const Cases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: cases, isLoading, isError } = useQuery({
    queryKey: ["cases", searchQuery],
    queryFn: () => getCases(searchQuery),
  });

  const filteredCases = useMemo(() => {
    if (!cases) return [];
    return cases.filter((caseItem) =>
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cases, searchQuery]);

  const handleDelete = (caseId: string) => {
    console.log("Delete case:", caseId);
    // TODO: Implement delete functionality
  };

  if (isLoading) {
    return <div>Loading cases...</div>;
  }

  if (isError) {
    return <div>Error loading cases.</div>;
  }

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Cases</h1>
        <Link to="/cases/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Case
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <Input
          type="text"
          placeholder="Search cases..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="outline">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
        <Button variant="ghost">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="ghost" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
          {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
        </Button>
      </div>

      {filteredCases.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No cases found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No cases match your search criteria.</p>
          </CardContent>
        </Card>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : ""}>
          {viewMode === "grid" ? (
            filteredCases.map((caseItem) => (
              <CaseCard key={caseItem.id} medicalCase={caseItem} />
            ))
          ) : (
            filteredCases.map((caseItem) => (
              <CaseListItem key={caseItem.id} medicalCase={caseItem} onDelete={handleDelete} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Cases;
