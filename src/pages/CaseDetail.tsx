import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { getCaseById } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/page-header";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  Edit,
  FileText,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { MedicalCase } from "@/types/case";
import { InteractiveVitalsCard } from "@/features/cases/InteractiveVitalsCard";
import { useSupabaseCases } from "@/hooks/use-supabase-cases";
import { EnhancedAppLayout } from "@/features/navigation";

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [storedCases, setStoredCases] = useLocalStorage<MedicalCase[]>("medical-cases", []);
  
  // Use Supabase hook to fetch case data
  const { useGetCaseQuery } = useSupabaseCases();
  const { data: supabaseCase, isLoading, error } = useGetCaseQuery(id || "");
  
  // Determine which case to display (Supabase first, then localStorage, then mock data)
  const medicalCase = supabaseCase || 
    storedCases?.find(c => c.id === id) || 
    (id ? getCaseById(id) : undefined);

  if (isLoading) {
    return (
      <EnhancedAppLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h2 className="text-2xl font-semibold mb-4 text-white">Loading case...</h2>
        </div>
      </EnhancedAppLayout>
    );
  }

  if (error || !medicalCase) {
    return (
      <EnhancedAppLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h2 className="text-2xl font-semibold mb-4 text-white">Case not found</h2>
          <Button asChild className="bg-white/10 border border-white/20 text-white hover:bg-white/20">
            <Link to="/cases">Return to all cases</Link>
          </Button>
        </div>
      </EnhancedAppLayout>
    );
  }

  const handleEdit = () => {
    // Navigate to the edit page with the case ID
    navigate(`/cases/edit/${id}`);
  };

  const handleDelete = () => {
    // Delete case from localStorage if it exists there
    if (storedCases) {
      const updatedCases = storedCases.filter(c => c.id !== id);
      setStoredCases(updatedCases);
    }
    setShowDeleteDialog(false);
    navigate("/cases");
    toast.success("Case deleted successfully");
  };

  // Handle vitals change for InteractiveVitalsCard
  const handleVitalsChange = (vitals: Record<string, string>) => {
    console.log("Vitals updated:", vitals);
    // Here you could update the case vitals if needed
  };

  // Extract initial vitals from the medical case
  const initialVitals = medicalCase.vitals ? {
    temperature: medicalCase.vitals.temperature?.toString() || "37",
    heartRate: medicalCase.vitals.heartRate?.toString() || "80",
    systolicBP: medicalCase.vitals.systolicBP?.toString() || "120",
    diastolicBP: medicalCase.vitals.diastolicBP?.toString() || "80",
    respiratoryRate: medicalCase.vitals.respiratoryRate?.toString() || "16",
    oxygenSaturation: medicalCase.vitals.oxygenSaturation?.toString() || "98"
  } : undefined;

  return (
    <EnhancedAppLayout>
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <div className="mb-6">
          <Link
            to="/cases"
            className="inline-flex items-center text-sm text-white/70 hover:text-white"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to all cases
          </Link>
        </div>
        
        <PageHeader title={medicalCase.title} className="text-white">
          <div className="flex flex-wrap gap-2">
            {medicalCase.tags && medicalCase.tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${tag.color}20`,
                  color: tag.color,
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </PageHeader>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-base text-white">Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-white/80">
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-white/60">Name:</div>
                  <div className="col-span-2 font-medium">{medicalCase.patient.name}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-white/60">Age:</div>
                  <div className="col-span-2">{medicalCase.patient.age} years</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-white/60">Gender:</div>
                  <div className="col-span-2 capitalize">{medicalCase.patient.gender}</div>
                </div>
                {medicalCase.patient.medicalRecordNumber && (
                  <div className="grid grid-cols-3 gap-1">
                    <div className="text-white/60">MRN:</div>
                    <div className="col-span-2">{medicalCase.patient.medicalRecordNumber}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-base text-white">Diagnosis</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-white/80">
              {medicalCase.diagnoses && medicalCase.diagnoses.length > 0 ? (
                <div className="space-y-3">
                  {medicalCase.diagnoses.map((diagnosis) => (
                    <div key={diagnosis.id} className="space-y-1">
                      <div className="font-medium flex items-center gap-2">
                        {diagnosis.name}
                        <Badge variant={diagnosis.status === "confirmed" ? "default" : "outline"} className="bg-white/10 border border-white/20 text-white">
                          {diagnosis.status}
                        </Badge>
                      </div>
                      {diagnosis.notes && (
                        <div className="text-white/60">
                          Note: {diagnosis.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-white/60">No diagnoses recorded</div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-base text-white">Case Details</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-white/80">
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-white/60">Created:</div>
                  <div className="col-span-2">
                    {format(new Date(medicalCase.createdAt), "MMM d, yyyy")}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-white/60">Updated:</div>
                  <div className="col-span-2">
                    {format(new Date(medicalCase.updatedAt), "MMM d, yyyy")}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-white/60">Status:</div>
                  <div className="col-span-2 capitalize">{medicalCase.status}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="clinical" className="mb-6">
          <TabsList>
            <TabsTrigger value="clinical">Clinical Information</TabsTrigger>
            <TabsTrigger value="study">Study Materials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="clinical" className="mt-6">
            <div className="grid gap-6">
              {medicalCase.history && (
                <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80">{medicalCase.history}</p>
                  </CardContent>
                </Card>
              )}
              
              {medicalCase.physicalExam && (
                <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Physical Examination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80">{medicalCase.physicalExam}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="study" className="mt-6">
            <div className="grid gap-6">
              {medicalCase.learningPoints && (
                <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Learning Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80">{medicalCase.learningPoints}</p>
                  </CardContent>
                </Card>
              )}
              
              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-white">Study Resources</CardTitle>
                    <CardDescription className="text-white/60">
                      Related learning materials
                    </CardDescription>
                  </div>
                  <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <FileText className="mr-2 h-4 w-4" /> Add Resource
                  </Button>
                </CardHeader>
                <CardContent>
                  {medicalCase.resources && medicalCase.resources.length > 0 ? (
                    <div className="space-y-4">
                      {medicalCase.resources.map((resource) => (
                        <div
                          key={resource.id}
                          className="flex items-start p-3 border border-white/20 rounded-lg bg-white/5"
                        >
                          <div className="h-10 w-10 rounded bg-white/10 flex items-center justify-center text-white mr-3">
                            {resource.type === "textbook" ? (
                              <BookOpen className="h-5 w-5" />
                            ) : (
                              <FileText className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-white">{resource.title}</h4>
                            <div className="flex items-center text-xs text-white/60 mt-1">
                              <span className="capitalize">{resource.type}</span>
                            </div>
                            {resource.notes && (
                              <p className="text-sm mt-2 text-white/80">{resource.notes}</p>
                            )}
                          </div>
                          {resource.url && (
                            <Button size="sm" variant="ghost" asChild className="text-white hover:bg-white/10">
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View
                              </a>
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-white/60">
                      No resources added yet
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-base text-white">Vitals</CardTitle>
              </CardHeader>
              <CardContent>
                <InteractiveVitalsCard 
                  onVitalsChange={handleVitalsChange}
                  initialVitals={initialVitals}
                  patientAge={medicalCase.patient.age}
                />
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-4">
            <Button onClick={handleEdit} className="bg-white/10 border border-white/20 text-white hover:bg-white/20">
              <Edit className="mr-2 h-4 w-4" /> Edit Case
            </Button>
            <Button onClick={() => setShowDeleteDialog(true)} variant="destructive" className="bg-red-400/20 border-red-400/30 hover:bg-red-400/30 text-red-300">
              <Trash2 className="mr-2 h-4 w-4" /> Delete Case
            </Button>
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <AlertDialogContent className="bg-white/10 backdrop-blur-md border border-white/20">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-white/70">
                    This action cannot be undone. This will permanently delete this case.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-white/10 border-white/20 hover:bg-white/20 text-white">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-400/20 border-red-400/30 hover:bg-red-400/30 text-red-300">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </EnhancedAppLayout>
  );
};

export default CaseDetail;
