
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
import { useState } from "react";
import { toast } from "sonner";

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const medicalCase = id ? getCaseById(id) : undefined;
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!medicalCase) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-xl font-semibold mb-4">Case not found</h2>
        <Button asChild>
          <Link to="/cases">Return to all cases</Link>
        </Button>
      </div>
    );
  }

  const handleEdit = () => {
    // In a real app, this would navigate to an edit page
    // For now, we'll just navigate to the new case page (which would be similar)
    navigate(`/cases/new`);
    toast.info("Editing functionality will be implemented soon");
  };

  const handleDelete = () => {
    // In a real app, this would delete the case from the database
    setShowDeleteDialog(false);
    navigate("/cases");
    toast.success("Case deleted successfully");
  };

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/cases"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to all cases
        </Link>
      </div>
      
      <PageHeader title={medicalCase.title}>
        <div className="flex flex-wrap gap-2">
          {medicalCase.tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
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
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-1">
                <div className="text-muted-foreground">Name:</div>
                <div className="col-span-2 font-medium">{medicalCase.patient.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-muted-foreground">Age:</div>
                <div className="col-span-2">{medicalCase.patient.age} years</div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-muted-foreground">Gender:</div>
                <div className="col-span-2 capitalize">{medicalCase.patient.gender}</div>
              </div>
              {medicalCase.patient.medicalRecordNumber && (
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-muted-foreground">MRN:</div>
                  <div className="col-span-2">{medicalCase.patient.medicalRecordNumber}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Diagnosis</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="space-y-3">
              {medicalCase.diagnoses.map((diagnosis) => (
                <div key={diagnosis.id} className="space-y-1">
                  <div className="font-medium flex items-center gap-2">
                    {diagnosis.name}
                    <Badge variant={diagnosis.status === "confirmed" ? "default" : "outline"}>
                      {diagnosis.status}
                    </Badge>
                  </div>
                  {diagnosis.notes && (
                    <div className="text-muted-foreground">
                      Note: {diagnosis.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Case Details</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-1">
                <div className="text-muted-foreground">Created:</div>
                <div className="col-span-2">
                  {format(new Date(medicalCase.createdAt), "MMM d, yyyy")}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-muted-foreground">Updated:</div>
                <div className="col-span-2">
                  {format(new Date(medicalCase.updatedAt), "MMM d, yyyy")}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="text-muted-foreground">Chief Complaint:</div>
                <div className="col-span-2">{medicalCase.chiefComplaint}</div>
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{medicalCase.history}</p>
                </CardContent>
              </Card>
            )}
            
            {medicalCase.physicalExam && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Physical Examination</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{medicalCase.physicalExam}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="study" className="mt-6">
          <div className="grid gap-6">
            {medicalCase.learningPoints && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Learning Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{medicalCase.learningPoints}</p>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Study Resources</CardTitle>
                  <CardDescription>
                    Related learning materials
                  </CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <FileText className="mr-2 h-4 w-4" /> Add Resource
                </Button>
              </CardHeader>
              <CardContent>
                {medicalCase.resources.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No resources added yet
                  </div>
                ) : (
                  <div className="space-y-4">
                    {medicalCase.resources.map((resource) => (
                      <div
                        key={resource.id}
                        className="flex items-start p-3 border rounded-lg"
                      >
                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center text-primary mr-3">
                          {resource.type === "textbook" ? (
                            <BookOpen className="h-5 w-5" />
                          ) : (
                            <FileText className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{resource.title}</h4>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <span className="capitalize">{resource.type}</span>
                          </div>
                          {resource.notes && (
                            <p className="text-sm mt-2">{resource.notes}</p>
                          )}
                        </div>
                        {resource.url && (
                          <Button size="sm" variant="ghost" asChild>
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
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => setShowDeleteDialog(true)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Case
        </Button>
        <Button onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Case
        </Button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the case
              and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CaseDetail;
