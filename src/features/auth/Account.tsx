import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/avatar";
import { Button } from "@/shared/components/button";
import { Label } from "@/shared/components/label";
import { Badge } from "@/shared/components/badge";
import { Switch } from "@/shared/components/switch";
import { useAuth } from "@/app/providers/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Shield, 
  Settings, 
  Download, 
  Trash2, 
  LogOut,
  CheckCircle
} from "lucide-react";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { typo, responsiveType } from "@/design-system/tokens/typography";
import { cn } from "@/shared/utils/utils";
import { liquidGlassClasses, getGlassTransitionVariants } from "@/design-system/components/glass-effects";

const Account = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { getStatistics } = useDashboardData();
  getStatistics(); // Call but don't store result since it's not used
  
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
      <motion.div 
        className="flex items-center justify-center min-h-[400px]"
        variants={getGlassTransitionVariants('medium')}
        initial="initial"
        animate="animate"
      >
        <div className="text-center">
          <h2 className={cn(typo.h2, "text-white mb-2")}>Access Denied</h2>
          <p className={cn(typo.body, "text-white/70")}>Please sign in to view your account</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-6"
      variants={getGlassTransitionVariants('medium')}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <motion.div 
        className="text-center space-y-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <h1 className={cn(responsiveType.h1, "text-white")}>Account Settings</h1>
        <p className={cn(typo.body, "text-white/70")}>Manage your profile and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <Card className={cn(liquidGlassClasses.card)}>
            <CardHeader className="text-center">
              <motion.div 
                className="mx-auto w-24 h-24 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback className={cn("bg-blue-500/20", typo.vital)}>{displayName ? getInitials(displayName) : "U"}</AvatarFallback>
                </Avatar>
              </motion.div>
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
                  <p className={cn(typo.code, "bg-white/5 p-3 rounded-lg break-all border border-white/10 backdrop-blur-sm")}>{user.id}</p>
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
        </motion.div>

        {/* Settings */}
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {/* Preferences */}
          <Card className={cn(liquidGlassClasses.card)}>
            <CardHeader>
              <CardTitle className={cn(typo.h3, "text-white flex items-center gap-2")}>
                <Settings className="w-5 h-5" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <h4 className={cn(typo.label, "text-white")}>Email Notifications</h4>
                  <p className={cn(typo.bodySmall, "text-white/60")}>Receive updates about your cases</p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <h4 className={cn(typo.label, "text-white")}>Dark Theme</h4>
                  <p className={cn(typo.bodySmall, "text-white/60")}>Toggle dark theme appearance</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <h4 className={cn(typo.label, "text-white")}>Auto Sync</h4>
                  <p className={cn(typo.bodySmall, "text-white/60")}>Sync data across devices</p>
                </div>
                <Switch checked={autoSync} onCheckedChange={setAutoSync} />
              </motion.div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className={cn(liquidGlassClasses.card)}>
            <CardHeader>
              <CardTitle className={cn(typo.h3, "text-white flex items-center gap-2")}>
                <Shield className="w-5 h-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <h4 className={cn(typo.label, "text-white")}>Export Data</h4>
                  <p className={cn(typo.bodySmall, "text-white/60")}>Download all your case data</p>
                </div>
                <Button 
                  onClick={handleExportData} 
                  disabled={isExporting}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isExporting ? "Exporting..." : "Export"}
                </Button>
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <h4 className={cn(typo.label, "text-white")}>Clear Data</h4>
                  <p className={cn(typo.bodySmall, "text-white/60")}>Permanently delete all your data</p>
                </div>
                <Button 
                  onClick={handleClearData} 
                  disabled={isClearing}
                  variant="destructive"
                  className="bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30 transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {isClearing ? "Clearing..." : "Clear"}
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className={cn(liquidGlassClasses.card)}>
            <CardHeader>
              <CardTitle className={cn(typo.h3, "text-white flex items-center gap-2")}>
                <User className="w-5 h-5" />
                Account Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  <h4 className={cn(typo.label, "text-white")}>Sign Out</h4>
                  <p className={cn(typo.bodySmall, "text-white/60")}>Sign out of your account</p>
                </div>
                <Button 
                  onClick={handleSignOut}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Account;
