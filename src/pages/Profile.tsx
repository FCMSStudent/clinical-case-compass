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
      const completedCases = storedCases.filter((c) => c.status === "completed");
      const totalRating = storedCases.reduce((acc, c) => acc + (c.rating || 0), 0);
      const casesBySpecialty = storedCases.reduce((acc, c) => {
        const specialty = c.specialty || "General";
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
    <div className="w-full max-w-6xl mx-auto space-y-6 p-4 md:p-6">
      <PageHeader
        title="Profile"
        description="View and manage your profile information"
        icon={<User className="h-6 w-6" />}
      />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="text-lg">
                  {getInitials(user?.user_metadata?.full_name || "User")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <CardTitle className="text-xl">
                  {user?.user_metadata?.full_name || "User"}
                </CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </div>
              <Button variant="outline" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium">
                  {format(new Date(user?.created_at || Date.now()), "MMM yyyy")}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Specialty</span>
                <Badge variant="secondary">
                  {user?.user_metadata?.specialty || "General"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCases}</div>
                <Progress
                  value={(stats.completedCases / stats.totalCases) * 100}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {stats.completedCases} completed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold">
                    {stats.averageRating.toFixed(1)}
                  </div>
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on {stats.totalCases} cases
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>
                Track your educational journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Learning Points</span>
                  <span className="font-medium">{stats.totalLearningPoints}</span>
                </div>
                <Progress
                  value={(stats.totalLearningPoints / (stats.totalCases * 3)) * 100}
                  className="h-2"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(stats.casesBySpecialty).map(([specialty, count]) => (
                  <div
                    key={specialty}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <span className="text-sm font-medium">{specialty}</span>
                    <Badge variant="secondary">{count} cases</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest actions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50"
                  >
                    <div className="mt-1">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(activity.date, "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Case History</CardTitle>
              <CardDescription>
                Detailed view of your case management activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {storedCases
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((medicalCase, index) => (
                    <motion.div
                      key={medicalCase.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50"
                    >
                      <div className="mt-1">
                        <HeartPulse className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{medicalCase.title}</p>
                          <Badge
                            variant={cn(
                              medicalCase.status === "completed"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-blue-500/10 text-blue-500"
                            )}
                          >
                            {medicalCase.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {medicalCase.chiefComplaint}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>
                            Created: {format(new Date(medicalCase.createdAt), "MMM d, yyyy")}
                          </span>
                          <span>
                            Updated: {format(new Date(medicalCase.updatedAt), "MMM d, yyyy")}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                Your milestones and accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center p-6 rounded-lg bg-muted/50 text-center"
                >
                  <Award className="h-8 w-8 text-yellow-500 mb-2" />
                  <h3 className="font-medium">Case Master</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Created {stats.totalCases} cases
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col items-center p-6 rounded-lg bg-muted/50 text-center"
                >
                  <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
                  <h3 className="font-medium">Learning Champion</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stats.totalLearningPoints} learning points
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center p-6 rounded-lg bg-muted/50 text-center"
                >
                  <Star className="h-8 w-8 text-yellow-500 mb-2" />
                  <h3 className="font-medium">Quality Expert</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {stats.averageRating.toFixed(1)} average rating
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile; 