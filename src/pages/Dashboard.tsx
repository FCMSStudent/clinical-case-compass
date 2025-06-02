
import { PageHeader } from "@/components/ui/page-header";
import { ActiveCasesWidget } from "@/components/DashboardCombined";
import { DraftsWidget } from "@/components/DashboardCombined";
import { CompletedWidget } from "@/components/DashboardCombined";
import { RecentActivity } from "@/components/DashboardCombined";
import { SearchBar } from "@/components/DashboardCombined";
import { QuickStartPanel } from "@/components/DashboardCombined";
import { UserRound } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Alert */}
      <Alert className="border-primary/20 bg-primary/5">
        <UserRound className="h-5 w-5 text-primary" />
        <AlertDescription className="text-primary">
          Welcome back! This is your central hub for managing clinical cases.
        </AlertDescription>
      </Alert>

      <PageHeader 
        title="Dashboard" 
        description="Overview of your clinical case activities."
      />
      
      <div className="mb-6">
        <SearchBar />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <ActiveCasesWidget />
        <DraftsWidget />
        <CompletedWidget />
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <QuickStartPanel />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
