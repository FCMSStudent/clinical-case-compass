import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { CaseCard } from "@/components/cases/CaseCard";
import { getAllCases, getAllTags } from "@/data/mock-data";
import { ClipboardList, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { MedicalCase, SPECIALTIES } from "@/types/case";

const Cases = () => {
  // Use location to detect navigation changes
  const location = useLocation();
  
  // Get cases from local storage first, then fallback to mock data
  const [storedCases, setStoredCases] = useLocalStorage<MedicalCase[]>("medical-cases", []);
  const [cases, setCases] = useState<MedicalCase[]>([]);
  const allTags = getAllTags();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Effect to handle navigation and local storage changes
  useEffect(() => {
    // Force a refresh when navigating back to the cases page
    setRefreshKey(prev => prev + 1);
  }, [location.key]);

  // Effect to combine stored cases with mock data
  useEffect(() => {
    // Combine stored cases with mock data, avoiding duplicates by ID
    const mockCases = getAllCases();
    const allCaseIds = new Set();
    const combinedCases: MedicalCase[] = [];
    
    // Add stored cases first
    if (storedCases && Array.isArray(storedCases)) {
      storedCases.forEach(storedCase => {
        if (storedCase && storedCase.id) {
          allCaseIds.add(storedCase.id);
          combinedCases.push(storedCase);
        }
      });
    }
    
    // Add mock cases that don't exist in stored cases
    mockCases.forEach(mockCase => {
      if (!allCaseIds.has(mockCase.id)) {
        combinedCases.push(mockCase);
      }
    });
    
    // Sort cases by createdAt date (newest first)
    combinedCases.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    setCases(combinedCases);
    
    // Debug information
    console.log('Stored cases:', storedCases);
    console.log('Combined cases:', combinedCases);
  }, [storedCases, refreshKey]);

  // Filter cases based on search term and selected tag
  const filteredCases = cases.filter((medCase) => {
    const matchesSearch =
      searchTerm === "" ||
      medCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medCase.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medCase.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (medCase.diagnoses && medCase.diagnoses.some((d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    
    const matchesTag =
      selectedTag === null ||
      selectedTag === "all" ||
      (medCase.tags && medCase.tags.some((tag) => tag.id === selectedTag));
    
    return matchesSearch && matchesTag;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTagChange = (value: string) => {
    setSelectedTag(value === "all" ? null : value);
  };

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <PageHeader 
        title="Clinical Cases" 
        description="Manage and browse your documented cases"
      >
        <Button asChild className="bg-medical-600 hover:bg-medical-700 text-white">
          <Link to="/cases/new">
            <ClipboardList className="mr-2 h-4 w-4" /> 
            New Case
          </Link>
        </Button>
      </PageHeader>
      
      <Card className="border-medical-200 shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search cases by title, patient, complaint, or diagnosis..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 border-medical-200 focus-visible:ring-medical-500"
            />
          </div>
          <Select value={selectedTag || "all"} onValueChange={handleTagChange}>
            <SelectTrigger className="w-full md:w-[180px] border-medical-200 focus-visible:ring-medical-500">
              <SelectValue placeholder="Filter by specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              {SPECIALTIES.map((specialty) => (
                <SelectItem key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {filteredCases.length === 0 ? (
        <Card className="bg-background border-medical-200 shadow-md rounded-lg flex flex-col items-center justify-center py-16 px-4 text-center">
          <ClipboardList className="h-12 w-12 text-medical-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">No cases found</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            {searchTerm || selectedTag
              ? "Try adjusting your search filters or adding a new case"
              : "Start documenting your clinical cases to see them here"}
          </p>
          <Button asChild className="bg-medical-600 hover:bg-medical-700 text-white">
            <Link to="/cases/new">Add New Case</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
          {filteredCases.map((medCase) => (
            <div key={medCase.id} className="flex">
              <CaseCard medicalCase={medCase} className="border-medical-200 shadow-md flex-1" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cases;
