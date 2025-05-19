
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { CaseCard } from "@/components/cases/CaseCard";
import { getAllCases, getAllTags } from "@/data/mock-data";
import { MedicalCase, CaseTag } from "@/types/case";
import { ClipboardList, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Cases = () => {
  const allCases = getAllCases();
  const allTags = getAllTags();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter cases based on search term and selected tag
  const filteredCases = allCases.filter((medCase) => {
    const matchesSearch =
      searchTerm === "" ||
      medCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medCase.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medCase.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medCase.diagnoses.some((d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesTag =
      selectedTag === null ||
      selectedTag === "all" ||
      medCase.tags.some((tag) => tag.id === selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTagChange = (value: string) => {
    setSelectedTag(value === "all" ? null : value);
  };

  return (
    <div>
      <PageHeader 
        title="Clinical Cases" 
        description="Manage and browse your documented cases"
      >
        <Button asChild>
          <Link to="/cases/new">
            <ClipboardList className="mr-2 h-4 w-4" /> 
            New Case
          </Link>
        </Button>
      </PageHeader>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search cases by title, patient, complaint, or diagnosis..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
        <Select value={selectedTag || "all"} onValueChange={handleTagChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            {allTags.map((tag) => (
              <SelectItem key={tag.id} value={tag.id}>
                {tag.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredCases.length === 0 ? (
        <div className="bg-background border rounded-lg flex flex-col items-center justify-center py-16 px-4 text-center">
          <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No cases found</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            {searchTerm || selectedTag
              ? "Try adjusting your search filters or adding a new case"
              : "Start documenting your clinical cases to see them here"}
          </p>
          <Button asChild>
            <Link to="/cases/new">Add New Case</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((medCase) => (
            <CaseCard key={medCase.id} medicalCase={medCase} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cases;
