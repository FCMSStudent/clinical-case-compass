import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert
import { Terminal } from "lucide-react"; // For error alert icon
import { useCases, CaseSummary } from "../hooks/useCases"; // Corrected import path for useCases
import { cn } from "@/lib/utils"; // Assuming cn is still needed for other parts, though not directly used in the provided snippet

// The component now fetches its own data, so props are no longer needed
// interface RecentCasesListProps {
//   cases: CaseSummary[]; // Using CaseSummary from the hook
// }

export function RecentCasesList() {
  const { cases, isLoading, error } = useCases();

  // Displays a loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <Card className="border-border shadow-md transition-all duration-200 hover:shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-primary">Recent Cases</CardTitle>
          <CardDescription>Your most recently updated cases</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {/* Display 3 skeleton items to indicate loading */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="px-6 py-4">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-3" />
                <div className="flex gap-2 mt-2 flex-wrap">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Displays an error alert if data fetching fails
  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <Terminal className="h-4 w-4" /> {/* Icon for the error alert */}
        <AlertTitle>Error Fetching Cases</AlertTitle>
        <AlertDescription>
          There was a problem loading recent cases. Please try again later.
          {/* Display error message details if available */}
          {error.message && <p className="text-xs mt-2">Details: {error.message}</p>}
        </AlertDescription>
      </Alert>
    );
  }

  // Displays a message and a button to add the first case if no cases are found
  if (cases.length === 0) {
    return (
      <Card className="border-border shadow-md transition-all duration-200 hover:shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-primary">Recent Cases</CardTitle>
          <CardDescription>Your most recently updated cases</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4 text-center">No cases found</p>
          <Button asChild>
            <Link to="/cases/new">Add your first case</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Renders the list of recent cases
  return (
    <Card className="border-border shadow-md transition-all duration-200 hover:shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-primary">Recent Cases</CardTitle>
        <CardDescription>Your most recently updated cases</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {cases.map((medCase: CaseSummary) => ( // Iterate over the fetched cases
            <Link
              key={medCase.id}
              to={`/cases/${medCase.id}`} // Link to the individual case detail page
              className="block hover:bg-muted/50 px-6 py-4 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-primary">{medCase.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {/* Display patient information */}
                    {medCase.patient.name}, {medCase.patient.age} y/o{" "}
                    {medCase.patient.gender}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {/* Format and display the last updated date */}
                  {format(new Date(medCase.updatedAt), "MMM d, yyyy")}
                </div>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {/* Display tags associated with the case */}
                {medCase.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs"
                    style={{
                      // Apply dynamic background and text color based on tag color
                      backgroundColor: `${tag.color}20`, // Assuming color is hex, adding transparency
                      color: tag.color,
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Ensure the main App component that uses RecentCasesList is set up correctly.
// For example:
/*
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Assuming the path to your RecentCasesList component
// import { RecentCasesList } from './components/RecentCasesList';
// import { CaseDetail } from './components/CaseDetail'; // Example for case detail page
// import { NewCaseForm } from './components/NewCaseForm'; // Example for new case form

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Medical Case Management</h1>
        <Routes>
          <Route path="/" element={<RecentCasesList />} />
          <Route path="/cases/new" element={<div>New Case Form Placeholder</div>} />
          <Route path="/cases/:id" element={<div>Case Detail Placeholder</div>} />
          { // Add other routes as needed }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
*/
