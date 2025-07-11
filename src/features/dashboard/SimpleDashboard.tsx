
import { Button } from "@/shared/components/button";
import { Plus, Eye, Activity, Clock, TrendingUp, Users, FileText, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { Badge } from "@/shared/components/badge";
import { cn } from "@/shared/utils/utils";

const SimpleDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const userName = user?.user_metadata?.full_name || 'Doctor';
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

  const quickStats = [
    { label: "Total Cases", value: 24, icon: FileText, change: "+12%" },
    { label: "This Week", value: 8, icon: Clock, change: "+8%" },
    { label: "Completed", value: 18, icon: Activity, change: "+15%" },
    { label: "In Progress", value: 6, icon: TrendingUp, change: "+5%" },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <header className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {greeting}, {userName}! 👋
            </h1>
            <p className="text-white/70 text-lg">
              Here's your medical cases overview for today
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => navigate('/cases/new')}
              className="bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Case
            </Button>
            <Button
              onClick={() => navigate('/cases')}
              variant="outline"
              className="bg-transparent text-white border border-white/20 hover:bg-white/10"
            >
              <Eye className="h-5 w-5 mr-2" />
              View All Cases
            </Button>
          </div>
        </div>
      </header>

      {/* Quick Stats Grid */}
      <section className="mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="h-8 w-8 text-white/80" />
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-white/60 text-sm">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Recent Cases */}
        <section className="lg:col-span-2">
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Cases
                </CardTitle>
                <Badge variant="secondary" className="bg-white/10 text-white/80">
                  5 active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, title: "Acute Pneumonia Case", patient: "John Doe", status: "In Progress" },
                  { id: 2, title: "Cardiovascular Assessment", patient: "Jane Smith", status: "Completed" },
                  { id: 3, title: "Neurological Examination", patient: "Bob Johnson", status: "In Progress" },
                ].map((caseItem) => (
                  <div key={caseItem.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">{caseItem.title}</h3>
                        <p className="text-white/60 text-sm">Patient: {caseItem.patient}</p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "text-xs",
                          caseItem.status === "Completed" 
                            ? "bg-green-500/20 text-green-300" 
                            : "bg-blue-500/20 text-blue-300"
                        )}
                      >
                        {caseItem.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Right Column - Quick Actions & Stats */}
        <section className="space-y-6">
          {/* Quick Actions */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => navigate('/cases/new')}
              >
                <Plus className="h-4 w-4 mr-3" />
                New Case
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => navigate('/cases')}
              >
                <FileText className="h-4 w-4 mr-3" />
                Browse Cases
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
              >
                <BarChart3 className="h-4 w-4 mr-3" />
                Analytics
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white/80 hover:text-white hover:bg-white/10"
              >
                <Users className="h-4 w-4 mr-3" />
                Patients
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-white">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 text-sm">
                    Case "Acute Pneumonia" completed
                  </p>
                  <p className="text-white/60 text-xs">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 text-sm">
                    New patient added to system
                  </p>
                  <p className="text-white/60 text-xs">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 text-sm">
                    Lab results updated
                  </p>
                  <p className="text-white/60 text-xs">1 day ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default SimpleDashboard;
