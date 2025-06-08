
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import {
  StatCards,
  RecentActivityList,
  SearchPanel,
  QuickStartPanel
} from "@/features/dashboard";
import { UserRound } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 10000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Welcome Alert */}
      {showWelcome && (
        <Alert className="border-primary/20 bg-primary/5">
          <UserRound className="h-5 w-5 text-primary" />
          <AlertDescription className="text-primary">
            Welcome back! This is your central hub for managing clinical cases.
          </AlertDescription>
        </Alert>
      )}

      <PageHeader 
        title="Dashboard" 
        description="Overview of your clinical case activities."
      />
      
      <Card className="bg-card shadow-sm border-border">
        <CardContent>
          <SearchPanel />
        </CardContent>
      </Card>

      <Card className="bg-card shadow-sm border-border">
        <CardContent>
          <StatCards />
        </CardContent>
      </Card>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-card shadow-sm border-border">
          <CardContent>
            <QuickStartPanel />
          </CardContent>
        </Card>
        <Card className="lg:col-span-1 bg-card shadow-sm border-border">
          <CardContent>
            <RecentActivityList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
