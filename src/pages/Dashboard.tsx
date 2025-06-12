import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import {
  StatCards,
  RecentActivityList,
  SearchPanel,
  QuickStartPanel,
  ProgressChart,
  SpecialtyProgress
} from "@/features/dashboard";
import { UserRound, TrendingUp, Activity, Sparkles, Target, Zap, Plus, BookOpen, Users, Settings } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/app/ThemeContext";

const Dashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const { isLoading, getStatistics, getSpecialtyProgress } = useDashboardData();
  const stats = getStatistics();
  const specialtyProgress = getSpecialtyProgress();
  const navigate = useNavigate();

  // Theme management
  const { currentTheme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main role="main" aria-labelledby="dashboard-title" className="w-full space-y-6">
      {/* Skip Navigation */}
      <nav aria-label="Dashboard navigation" className="sr-only">
        <a 
          href="#metrics" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          Skip to metrics
        </a>
        <a 
          href="#actions" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-32 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          Skip to actions
        </a>
      </nav>

      {/* Loading and Error States */}
      {isLoading && (
        <div role="status" aria-live="polite" className="sr-only">
          Loading dashboard data...
        </div>
      )}

      {/* Medical Header */}
      <header className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <Activity className="h-8 w-8 text-white" aria-hidden="true" />
          </div>
          <h1 id="dashboard-title" className="text-4xl font-bold text-white">
            Clinical Dashboard
          </h1>
        </div>
        <p className="text-white/80 text-lg">
          Medical Learning & Case Management
        </p>
      </header>

      {/* Welcome Alert */}
      {showWelcome && (
        <Alert 
          className="border-blue-200 bg-blue-50/50 backdrop-blur-sm"
          role="alert"
          aria-live="polite"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          <AlertDescription>
            Welcome back! Your clinical cases are ready for review.
          </AlertDescription>
        </Alert>
      )}

      {/* Medical Metrics */}
      <section id="metrics" aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" className="sr-only">Key Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/70">Total Cases</p>
                  <p className="text-2xl font-bold text-white" aria-label={`${stats.totalCases} total cases`}>
                    {stats.totalCases}
                  </p>
                </div>
                <div className="p-2 bg-blue-500/20 rounded-lg" aria-hidden="true">
                  <BookOpen className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/70">Active Cases</p>
                  <p className="text-2xl font-bold text-white" aria-label={`${stats.activeCases} active cases`}>
                    {stats.activeCases}
                  </p>
                </div>
                <div className="p-2 bg-green-500/20 rounded-lg" aria-hidden="true">
                  <Activity className="h-6 w-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/70">Completion Rate</p>
                  <p className="text-2xl font-bold text-white" aria-label={`${stats.completionRate}% completion rate`}>
                    {stats.completionRate}%
                  </p>
                </div>
                <div className="p-2 bg-purple-500/20 rounded-lg" aria-hidden="true">
                  <TrendingUp className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/70">Study Time</p>
                  <p className="text-2xl font-bold text-white" aria-label={`${stats.studyTime} hours of study time`}>
                    {stats.studyTime}h
                  </p>
                </div>
                <div className="p-2 bg-orange-500/20 rounded-lg" aria-hidden="true">
                  <Target className="h-6 w-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Actions */}
      <section id="actions" aria-labelledby="actions-heading">
        <h2 id="actions-heading" className="sr-only">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
                <Zap className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate("/cases/new")}
                  aria-label="Create a new clinical case"
                  aria-describedby="create-case-description"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                  Create New Case
                </Button>
                <div id="create-case-description" className="sr-only">
                  Start documenting a new clinical case with AI assistance
                </div>
                
                <Button 
                  onClick={() => navigate("/cases")}
                  aria-label="View all clinical cases"
                  aria-describedby="view-cases-description"
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  <BookOpen className="h-4 w-4 mr-2" aria-hidden="true" />
                  View All Cases
                </Button>
                <div id="view-cases-description" className="sr-only">
                  Browse and review all your documented clinical cases
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                <Activity className="h-5 w-5 text-green-400" aria-hidden="true" />
              </div>
              <div className="space-y-2" role="list" aria-label="Recent activity">
                <div className="flex items-center justify-between text-sm" role="listitem">
                  <span className="text-white/70">Case #1234 updated</span>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                    2h ago
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm" role="listitem">
                  <span className="text-white/70">New case created</span>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                    4h ago
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm" role="listitem">
                  <span className="text-white/70">Study session completed</span>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                    6h ago
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Specialty Progress */}
      <section aria-labelledby="specialty-progress-heading">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <h3 id="specialty-progress-heading" className="text-lg font-semibold text-white mb-4">
              Specialty Progress
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="list" aria-label="Specialty progress">
              {specialtyProgress.map((specialty) => (
                <div key={specialty.name} className="space-y-2" role="listitem">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/70">{specialty.name}</span>
                    <span className="text-sm font-bold text-white" aria-label={`${specialty.progress}% complete`}>
                      {specialty.progress}%
                    </span>
                  </div>
                  <div 
                    role="progressbar"
                    aria-label={`${specialty.name} progress`}
                    aria-valuenow={specialty.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-describedby={`${specialty.name}-progress-description`}
                    className="w-full bg-white/20 rounded-full h-2"
                  >
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${specialty.progress}%` }}
                    />
                  </div>
                  <div id={`${specialty.name}-progress-description`} className="sr-only">
                    {specialty.progress}% complete in {specialty.name}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Dashboard;
