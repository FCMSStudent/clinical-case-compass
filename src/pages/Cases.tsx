import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, ClipboardList, Calendar, User, Stethoscope, Filter, SortAsc, Eye, Edit, Trash2, Plus } from 'lucide-react';

// Mock data for demonstration
const SPECIALTIES = [
  { id: 'cardiology', name: 'Cardiology', color: '#ef4444' },
  { id: 'neurology', name: 'Neurology', color: '#8b5cf6' },
  { id: 'orthopedics', name: 'Orthopedics', color: '#06b6d4' },
  { id: 'pediatrics', name: 'Pediatrics', color: '#10b981' },
  { id: 'emergency', name: 'Emergency Medicine', color: '#f59e0b' },
  { id: 'internal', name: 'Internal Medicine', color: '#6366f1' }
];

const SAMPLE_CASES = [
  {
    id: '1',
    title: 'Acute Myocardial Infarction in 55-year-old Male',
    patient: { name: 'John Smith', age: 55, gender: 'male' },
    chiefComplaint: 'Chest pain and shortness of breath',
    diagnoses: [{ id: '1', name: 'STEMI', status: 'confirmed' }],
    tags: [SPECIALTIES[0]],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    history: 'Patient presents with acute onset chest pain...',
    physicalExam: 'Vitals stable, chest examination reveals...',
    learningPoints: 'Key learning points about STEMI management...'
  },
  {
    id: '2',
    title: 'Pediatric Asthma Exacerbation',
    patient: { name: 'Emma Johnson', age: 8, gender: 'female' },
    chiefComplaint: 'Difficulty breathing and wheezing',
    diagnoses: [{ id: '2', name: 'Asthma Exacerbation', status: 'confirmed' }],
    tags: [SPECIALTIES[3]],
    createdAt: '2024-01-14T08:15:00Z',
    updatedAt: '2024-01-14T12:45:00Z',
    history: '8-year-old with history of asthma...',
    physicalExam: 'Respiratory distress noted...',
    learningPoints: 'Pediatric asthma management protocols...'
  },
  {
    id: '3',
    title: 'Stroke in Elderly Patient',
    patient: { name: 'Robert Davis', age: 72, gender: 'male' },
    chiefComplaint: 'Sudden onset left-sided weakness',
    diagnoses: [{ id: '3', name: 'Acute Ischemic Stroke', status: 'confirmed' }],
    tags: [SPECIALTIES[1]],
    createdAt: '2024-01-13T16:20:00Z',
    updatedAt: '2024-01-13T18:30:00Z',
    history: 'Sudden onset neurological symptoms...',
    physicalExam: 'Neurological examination reveals...',
    learningPoints: 'Stroke assessment and management...'
  }
];

// Custom hook for localStorage with error handling
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage?.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage?.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

// Enhanced Case Card Component
const CaseCard = ({ medicalCase, onView, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAgeColor = (age) => {
    if (age < 18) return 'bg-green-100 text-green-800';
    if (age < 65) return 'bg-blue-100 text-blue-800';
    return 'bg-orange-100 text-orange-800';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2">
          {medicalCase.title}
        </h3>
        <div className="flex gap-1 ml-2">
          <button
            onClick={() => onView(medicalCase.id)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="View case"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => onEdit(medicalCase.id)}
            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
            title="Edit case"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(medicalCase.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Delete case"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <User className="h-4 w-4 mr-2 text-gray-400" />
          <span className="font-medium">{medicalCase.patient.name}</span>
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${getAgeColor(medicalCase.patient.age)}`}>
            {medicalCase.patient.age}y
          </span>
        </div>

        <div className="flex items-start text-sm text-gray-600">
          <Stethoscope className="h-4 w-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-2">{medicalCase.chiefComplaint}</span>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
          <span>{formatDate(medicalCase.createdAt)}</span>
        </div>
      </div>

      {medicalCase.diagnoses && medicalCase.diagnoses.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {medicalCase.diagnoses.slice(0, 2).map((diagnosis) => (
              <span
                key={diagnosis.id}
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  diagnosis.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {diagnosis.name}
              </span>
            ))}
            {medicalCase.diagnoses.length > 2 && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{medicalCase.diagnoses.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}

      {medicalCase.tags && medicalCase.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {medicalCase.tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${tag.color}15`,
                color: tag.color,
                border: `1px solid ${tag.color}30`
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Cases Component
const ImprovedCasesSystem = () => {
  const [storedCases, setStoredCases] = useLocalStorage('medical-cases', []);
  const [cases, setCases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  // Combine stored cases with sample data
  useEffect(() => {
    const combinedCases = [...SAMPLE_CASES];
    
    if (storedCases && Array.isArray(storedCases)) {
      const existingIds = new Set(combinedCases.map(c => c.id));
      storedCases.forEach(storedCase => {
        if (storedCase && storedCase.id && !existingIds.has(storedCase.id)) {
          combinedCases.push(storedCase);
        }
      });
    }

    setCases(combinedCases);
    setIsLoading(false);
  }, [storedCases]);

  // Memoized filtered and sorted cases
  const filteredAndSortedCases = useMemo(() => {
    let filtered = cases.filter((medCase) => {
      const matchesSearch = !searchTerm || 
        medCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medCase.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medCase.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (medCase.diagnoses && medCase.diagnoses.some(d => 
          d.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));

      const matchesSpecialty = selectedSpecialty === 'all' ||
        (medCase.tags && medCase.tags.some(tag => tag.id === selectedSpecialty));

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

  // Event handlers
  const handleViewCase = useCallback((caseId) => {
    console.log('Viewing case:', caseId);
    // In a real app, this would navigate to the case detail page
  }, []);

  const handleEditCase = useCallback((caseId) => {
    console.log('Editing case:', caseId);
    // In a real app, this would navigate to the case edit page
  }, []);

  const handleDeleteCase = useCallback((caseId) => {
    if (window.confirm('Are you sure you want to delete this case?')) {
      const updatedStoredCases = storedCases.filter(c => c.id !== caseId);
      setStoredCases(updatedStoredCases);
      console.log('Deleted case:', caseId);
    }
  }, [storedCases, setStoredCases]);

  const handleAddCase = () => {
    console.log('Adding new case');
    // In a real app, this would navigate to the new case page
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('all');
    setSortBy('newest');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Clinical Cases</h1>
              <p className="text-gray-600">Manage and browse your documented medical cases</p>
            </div>
            <button
              onClick={handleAddCase}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Case
            </button>
          </div>

          {/* Filters and Search */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Specialties</option>
                {SPECIALTIES.map((specialty) => (
                  <option key={specialty.id} value={specialty.id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="patient">Patient Name</option>
                <option value="title">Case Title</option>
              </select>
            </div>
          </div>

          {/* Active filters */}
          {(searchTerm || selectedSpecialty !== 'all') && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedSpecialty !== 'all' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {SPECIALTIES.find(s => s.id === selectedSpecialty)?.name}
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredAndSortedCases.length} of {cases.length} cases
          </p>
        </div>

        {/* Cases Grid */}
        {filteredAndSortedCases.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
            <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cases found</h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              {searchTerm || selectedSpecialty !== 'all'
                ? "Try adjusting your search filters or add a new case"
                : "Start documenting your clinical cases to see them here"}
            </p>
            <button
              onClick={handleAddCase}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Case
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedCases.map((medCase) => (
              <CaseCard
                key={medCase.id}
                medicalCase={medCase}
                onView={handleViewCase}
                onEdit={handleEditCase}
                onDelete={handleDeleteCase}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImprovedCasesSystem;
