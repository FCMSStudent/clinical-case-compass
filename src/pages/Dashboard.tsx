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
    <div className="w-full space-y-6">
      {/* Medical Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Clinical Dashboard
          </h1>
        </div>
        <p className="text-white/80 text-lg">
          Medical Learning & Case Management
        </p>
      </div>

      {/* Welcome Alert */}
      {showWelcome && (
        <Alert className="border-blue-200 bg-blue-50/50 backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          <AlertDescription>
            Welcome back! Your clinical cases are ready for review.
          </AlertDescription>
        </Alert>
      )}

      {/* Medical Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Total Cases</p>
                <p className="text-2xl font-bold text-white">{stats.totalCases}</p>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-lg">
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
                <p className="text-2xl font-bold text-white">{stats.activeCases}</p>
              </div>
              <div className="p-2 bg-green-500/20 rounded-lg">
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
                <p className="text-2xl font-bold text-white">{stats.completionRate}%</p>
              </div>
              <div className="p-2 bg-purple-500/20 rounded-lg">
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
                <p className="text-2xl font-bold text-white">{stats.studyTime}h</p>
              </div>
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Target className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
              <Zap className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate("/cases/new")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Case
              </Button>
              <Button 
                onClick={() => navigate("/cases")}
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                View All Cases
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              <Activity className="h-5 w-5 text-green-400" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Case #1234 updated</span>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                  2h ago
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">New case created</span>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                  4h ago
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Study session completed</span>
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                  6h ago
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Specialty Progress */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Specialty Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {specialtyProgress.map((specialty) => (
              <div key={specialty.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/70">{specialty.name}</span>
                  <span className="text-sm font-bold text-white">{specialty.progress}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${specialty.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
