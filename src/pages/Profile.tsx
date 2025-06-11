import { useEffect, useState } from "react";
import { useAuth } from "@/app/AuthContext";
import { PageHeader } from "@/components/ui/page-header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Activity,
  Award,
  BookOpen,
  Calendar,
  Clock,
  Edit,
  FileText,
  HeartPulse,
  History,
  Star,
  Trophy,
  User,
  UserCog,
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { MedicalCase } from "@/types/case";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [storedCases] = useLocalStorage<MedicalCase[]>("medical-cases", []);
  const [stats, setStats] = useState({
    totalCases: 0,
    completedCases: 0,
    averageRating: 0,
    totalLearningPoints: 0,
    casesBySpecialty: {} as Record<string, number>,
    recentActivity: [] as Array<{
      type: string;
      title: string;
      date: Date;
      description: string;
    }>,
  });

  useEffect(() => {
    if (storedCases.length > 0) {
      // Calculate statistics
      const completedCases = storedCases.filter((c) => (c as any).status === "completed");
      const totalRating = storedCases.reduce((acc, c) => acc + ((c as any).rating ?? 0), 0);
      const casesBySpecialty = storedCases.reduce((acc, c) => {
        const specialty = (c as any).specialty || "General";
        acc[specialty] = (acc[specialty] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Generate recent activity
      const recentActivity = storedCases
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 5)
        .map((c) => ({
          type: "case_update",
          title: c.title,
          date: new Date(c.updatedAt),
          description: `Updated case "${c.title}"`,
        }));

      setStats({
        totalCases: storedCases.length,
        completedCases: completedCases.length,
        averageRating: totalRating / storedCases.length || 0,
        totalLearningPoints: storedCases.reduce(
          (acc, c) => acc + (c.learningPoints?.length || 0),
          0
        ),
        casesBySpecialty,
        recentActivity,
      });
    }
  }, [storedCases]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 relative">
      {/* Glassy background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-6 p-4 md:p-6">
        <PageHeader
          title="Profile"
          description="View and manage your profile information"
          className="text-white"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <div className="relative md:col-span-1">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
            <Card className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <CardHeader>
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24 border-2 border-white/20">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="text-lg bg-white/20 text-white">
                      {getInitials(user?.user_metadata?.full_name || "User")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <CardTitle className="text-xl text-white">
                      {user?.user_metadata?.full_name || "User"}
                    </CardTitle>
                    <CardDescription className="text-white/70">{user?.email}</CardDescription>
                  </div>
                  <Button variant="outline" className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Member Since</span>
                    <span className="font-medium text-white">
                      {format(new Date(user?.created_at || Date.now()), "MMM yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Specialty</span>
                    <Badge variant="secondary" className="bg-white/10 border border-white/20 text-white">
                      {user?.user_metadata?.specialty || "General"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
                <Card className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-white">Total Cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{stats.totalCases}</div>
                    <Progress
                      value={(stats.completedCases / stats.totalCases) * 100}
                      className="mt-2"
                    />
                    <p className="text-xs text-white/70 mt-2">
                      {stats.completedCases} completed
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
                <Card className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-white">Average Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-bold text-white">
                        {stats.averageRating.toFixed(1)}
                      </div>
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    </div>
                    <p className="text-xs text-white/70 mt-2">
                      Based on {stats.totalCases} cases
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
              <Card className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Learning Progress</CardTitle>
                  <CardDescription className="text-white/70">
                    Track your educational journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-blue-300" />
                      <span className="text-white">Total Learning Points:</span>
                      <span className="font-bold text-white">{stats.totalLearningPoints}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-300" />
                      <span className="text-white">Cases by Specialty:</span>
                      <span className="font-bold text-white">
                        {Object.entries(stats.casesBySpecialty)
                          .map(([spec, count]) => `${spec}: ${count}`)
                          .join(", ")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
              <Card className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                  <CardDescription className="text-white/70">
                    Your latest case updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {stats.recentActivity.length === 0 ? (
                      <li className="text-white/60">No recent activity</li>
                    ) : (
                      stats.recentActivity.map((activity, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <History className="h-4 w-4 text-blue-300" />
                          <span className="text-white/80">{activity.description}</span>
                          <span className="ml-auto text-xs text-white/60">
                            {format(activity.date, "MMM d, yyyy")}
                          </span>
                        </li>
                      ))
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 