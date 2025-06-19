import React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/app/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Shield, 
  Settings, 
  Download, 
  Trash2, 
  LogOut,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { typo, responsiveType } from "@/lib/typography";
import { cn } from "@/lib/utils";

const Account = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { getStatistics } = useDashboardData();
  const stats = getStatistics();
  
  // State for settings
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  // Get user metadata
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0];
  const email = user?.email;
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Data exported successfully!");
    } catch (error) {
      toast.error("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  const handleClearData = async () => {
    if (!window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      return;
    }
    
    setIsClearing(true);
    try {
      // Simulate clearing process
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Data cleared successfully!");
    } catch (error) {
      toast.error("Failed to clear data");
    } finally {
      setIsClearing(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className={cn(typo.h2, "text-white mb-2")}>Access Denied</h2>
          <p className={cn(typo.body, "text-white/70")}>Please sign in to view your account</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className={cn(responsiveType.h1, "text-white")}>Account Settings</h1>
        <p className={cn(typo.body, "text-white/70")}>Manage your profile and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader className="text-center">
              <div className="mx-auto w-24 h-24 mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className={cn("bg-blue-500/20", typo.vital)}>{displayName ? getInitials(displayName) : "U"}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className={cn(typo.h2, "text-white")}>{displayName || "No name set"}</CardTitle>
              <p className={cn(typo.body, "text-white/70")}>{email}</p>
              <Badge variant="success" className="mx-auto">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* User Information */}
              <div className="space-y-3">
                <div>
                  <Label className={cn(typo.caption, "text-white/70 uppercase tracking-wide")}>User ID</Label>
                  <p className={cn(typo.code, "bg-white/5 p-3 rounded-lg break-all border border-white/10")}>{user.id}</p>
                </div>
                
                <div>
                  <Label className={cn(typo.caption, "text-white/70 uppercase tracking-wide")}>Account Created</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-4 h-4 text-white/70" />
                    <p className={cn(typo.bodySmall)}>{formatDate(user.created_at)}</p>
                  </div>
                </div>
                
                <div>
                  <Label className={cn(typo.caption, "text-white/70 uppercase tracking-wide")}>Email Status</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Verified</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preferences */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className={cn(typo.h3, "text-white flex items-center gap-2")}>
                <Settings className="w-5 h-5" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={cn(typo.label, "text-white")}>Email Notifications</h4>
                  <p className={cn(typo.bodySmall, "text-white/60")}>Receive updates about your cases</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={cn(typo.label, "text-white")}>Dark Theme</h4>
                  <p className={cn(typo.bodySmall, "text-white/60")}>Toggle dark theme appearance</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={cn(typo.label, "text-white")}>Auto Sync</h4>
                  <p className={cn(typo.bodySmall, "text-white/60")}>Sync data across devices</p>
                </div>
                <Switch checked={autoSync} onCheckedChange={setAutoSync} />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className={cn(typo.h3, "text-white flex items-center gap-2")}>
                <Shield className="w-5 h-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <h4 className={cn(typo.label, "text-white")}>Export Data</h4>
                  <p className={cn(typo.bodySmall, "text-white/70")}>Download all your data as JSON</p>
                </div>
                <Button
                  onClick={handleExportData}
                  disabled={isExporting}
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isExporting ? "Exporting..." : "Export"}
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-lg border border-red-400/30">
                <div>
                  <h4 className={cn(typo.label, "text-white")}>Clear All Data</h4>
                  <p className={cn(typo.bodySmall, "text-white/70")}>Permanently delete all local data</p>
                </div>
                <Button
                  onClick={handleClearData}
                  disabled={isClearing}
                  variant="destructive"
                  className="bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {isClearing ? "Clearing..." : "Clear"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className={cn(typo.h3, "text-white")}>Account Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <h3 className={cn(typo.label, "text-white")}>Sign Out</h3>
                  <p className={cn(typo.bodySmall, "text-white/70")}>Sign out of your account on this device</p>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
