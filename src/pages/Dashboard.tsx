
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentCasesList } from "@/components/dashboard/RecentCasesList";
import { getRecentCases, mockCases } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ClipboardList, 
  BookOpen, 
  FileText, 
  Calendar,
  UserRound
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Dashboard = () => {
  const recentCases = getRecentCases(5);
  
  const stats = [
    {
      title: "Total Cases",
      value: mockCases.length,
      icon: <ClipboardList className="h-4 w-4" />,
      description: "Documented patient cases",
    },
    {
      title: "Study Resources",
      value: mockCases.reduce((acc, curr) => acc + curr.resources.length, 0),
      icon: <BookOpen className="h-4 w-4" />,
      description: "Linked learning materials",
    },
    {
      title: "Learning Notes",
      value: mockCases.filter(c => c.learningPoints && c.learningPoints.length > 0).length,
      icon: <FileText className="h-4 w-4" />,
      description: "Cases with learning points",
    },
    {
      title: "This Week",
      value: mockCases.filter(c => {
        const date = new Date(c.createdAt);
        const now = new Date();
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return date >= weekAgo && date <= now;
      }).length,
      icon: <Calendar className="h-4 w-4" />,
      description: "New cases this week",
    },
  ];

  return (
    <div className="space-y-6">
      <Alert className="border-primary/20 bg-primary/5 mb-6">
        <UserRound className="h-5 w-5 text-primary" />
        <AlertDescription className="text-primary">
          Welcome to Clinical Case Manager! This application was created by <strong>Alwaleed Alabdali</strong> for medical students to document and learn from clinical cases.
        </AlertDescription>
      </Alert>
      
      <PageHeader 
        title="Medical Case Manager" 
        description="Document and learn from clinical cases"
      >
        <Button asChild>
          <Link to="/cases/new">
            <ClipboardList className="mr-2 h-4 w-4" />
            Add New Case
          </Link>
        </Button>
      </PageHeader>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
          />
        ))}
      </div>
      
      <RecentCasesList /> {/* Removed cases prop */}
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Quick Start</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <Button variant="outline" asChild className="w-full justify-start mb-2">
              <Link to="/cases/new">
                <ClipboardList className="mr-2 h-4 w-4" /> 
                Document a new case
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full justify-start mb-2">
              <Link to="/resources">
                <BookOpen className="mr-2 h-4 w-4" /> 
                Browse study resources
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full justify-start">
              <Link to="/study">
                <FileText className="mr-2 h-4 w-4" /> 
                Generate practice questions
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Study Progress</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Cardiology</span>
                  <span className="text-muted-foreground">1 case</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "20%" }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Neurology</span>
                  <span className="text-muted-foreground">1 case</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "20%" }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Respiratory</span>
                  <span className="text-muted-foreground">1 case</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "20%" }} />
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground bg-accent/30 p-3 rounded-md">
              Add more cases to track your progress across specialties
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
