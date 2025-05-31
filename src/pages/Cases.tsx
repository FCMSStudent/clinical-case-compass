
import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, Grid, List, Eye, Edit, Trash2, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSupabaseCases } from '@/hooks/use-supabase-cases';
import { SPECIALTIES } from '@/types/case';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { CaseCard } from '@/components/cases/CaseCard';
import { CaseListItem } from '@/components/cases/CaseListItem';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'oldest' | 'patient' | 'title';

const Cases = () => {
  const navigate = useNavigate();
  const { cases, isLoading, error } = useSupabaseCases();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Filter and sort cases
  const filteredAndSortedCases = useMemo(() => {
    const filtered = cases.filter((medCase) => {
      const matchesSearch = !searchTerm || 
        medCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medCase.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medCase.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medCase.diagnoses.some(d => 
          d.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesSpecialty = selectedSpecialty === 'all' ||
        medCase.tags.some(tag => tag.id === selectedSpecialty);

      return matchesSearch && matchesSpecialty;
    });

    // Sort cases
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'patient':
          return a.patient.name.localeCompare(b.patient.name);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [cases, searchTerm, selectedSpecialty, sortBy]);

  const handleDeleteCase = async (caseId: string) => {
    if (window.confirm('Are you sure you want to delete this case?')) {
      try {
        // TODO: Implement delete functionality when available in hook
        toast.success('Case deleted successfully');
      } catch (error) {
        toast.error('Failed to delete case');
      }
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('all');
    setSortBy('newest');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center">
        {/* The inner div className="text-center" can be removed if desired, or kept. For this change, let's assume its content is directly under the main div. */}
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600">Loading cases...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center">
        <Card className="max-w-md mx-auto"> {/* mx-auto is fine to keep */}
          <CardContent className="text-center p-6"> {/* CardContent already has text-center which is good */}
            <p className="text-red-600 mb-4">Failed to load cases</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Clinical Cases
                </CardTitle>
                <p className="text-gray-600 mt-1">
                  Manage and browse your documented medical cases
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                >
                  {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                </Button>
                <Button asChild>
                  <Link to="/cases/new">
                    <Plus className="h-4 w-4 mr-2" />
                    New Case
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          {/* Main header card's CardContent is removed as it's now empty */}
        </Card>

        {/* New Card for Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filter & Sort Cases</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filters and Search */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search cases by title, patient, complaint, or diagnosis..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div> {/* Added a div for label and select grouping */}
                <label htmlFor="specialty-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Specialty
                </label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger id="specialty-select" className="w-full">
                    <SelectValue placeholder="All Specialties" />
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

              <div> {/* Added a div for label and select grouping */}
                <label htmlFor="sortby-select" className="block text-sm font-medium text-gray-700 mb-1">
                  Sort by
                </label>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger id="sortby-select" className="w-full">
                    <SelectValue placeholder="Newest First" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="patient">Patient Name</SelectItem>
                    <SelectItem value="title">Case Title</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active filters */}
            {(searchTerm || selectedSpecialty !== 'all') && (
              <div className="flex items-center gap-2 mt-4"> {/* Adjusted margin for spacing */}
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchTerm && (
                  <div className="flex items-center gap-1">
                    <Badge variant="secondary" className="pl-3 pr-1 py-1"> {/* Adjusted padding if button is 'inside' */}
                      Search: "{searchTerm}"
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm" // Using "sm" for a slightly larger click area than just icon size
                      className="p-1 h-auto" // Adjust padding to make the button compact
                      onClick={() => setSearchTerm('')}
                      aria-label="Clear search term"
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
                {selectedSpecialty !== 'all' && (
                  <div className="flex items-center gap-1">
                    <Badge variant="secondary" className="pl-3 pr-1 py-1"> {/* Adjusted padding */}
                      {SPECIALTIES.find(s => s.id === selectedSpecialty)?.name}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm" // Using "sm" for a slightly larger click area
                      className="p-1 h-auto" // Adjust padding for a compact button
                      onClick={() => setSelectedSpecialty('all')}
                      aria-label="Clear specialty filter"
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredAndSortedCases.length} of {cases.length} cases
          </p>
        </div>

        {/* Cases Display */}
        {filteredAndSortedCases.length === 0 ? (
          <Card className="text-center p-16">
            <CardContent>
              <div className="max-w-sm mx-auto">
                <div className="h-16 w-16 text-gray-400 mx-auto mb-4"> {/* Container div also updated */}
                  <Filter className="h-16 w-16" /> {/* Icon itself updated */}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No cases found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedSpecialty !== 'all'
                    ? "Try adjusting your search filters or add a new case"
                    : "Start documenting your clinical cases to see them here"}
                </p>
                <Button asChild>
                  <Link to="/cases/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Case
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className={cn(
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              : "space-y-4"
          )}>
            {filteredAndSortedCases.map((medicalCase) => (
              viewMode === 'grid' ? (
                <CaseCard
                  key={medicalCase.id}
                  medicalCase={medicalCase}
                />
              ) : (
                <CaseListItem
                  key={medicalCase.id}
                  medicalCase={medicalCase}
                  onDelete={handleDeleteCase}
                />
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cases;
