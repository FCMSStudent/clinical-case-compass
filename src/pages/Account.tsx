
import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/AuthContext";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { BentoCard } from "@/components/ui/bento-card";
import { BentoContainer } from "@/components/ui/bento-container";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  User, Mail, Calendar, Shield, Edit3, Save, X, Bell, Moon, Database, Trash2, Download, LogOut, AlertTriangle, Settings as SettingsIcon
} from "lucide-react";

const Account = () => {
  const { user, updateProfile, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [storedCases, setStoredCases] = useLocalStorage("medical-cases", []);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dataSync, setDataSync] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setDisplayName(user.user_metadata.full_name);
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!displayName.trim()) {
      toast.error("Display name cannot be empty");
      return;
    }
    setIsLoading(true);
    try {
      await updateProfile({ full_name: displayName });
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setDisplayName(user?.user_metadata?.full_name || "");
    setIsEditing(false);
  };
  
  const handleExportData = () => {
    try {
      const dataBlob = new Blob([JSON.stringify(storedCases, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `medical-cases-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Data exported successfully");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export data");
    }
  };

  const handleClearData = () => {
    if (showDeleteConfirm) {
      setStoredCases([]);
      setShowDeleteConfirm(false);
      toast.success("All local data cleared");
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 5000);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  const getInitials = (name: string) => name.split(" ").map((part) => part.charAt(0)).join("").toUpperCase().slice(0, 2);
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  if (!user) return null;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Account"
        description="Manage your profile, settings, and preferences"
        icon={<User className="h-8 w-8" />}
      />

      <BentoContainer>
        <BentoCard layout="hero" className="col-span-full lg:col-span-4" size="large" title="Profile" icon={<User />}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <Avatar className="h-20 w-20 lg:h-24 lg:w-24 flex-shrink-0">
              <AvatarImage src={user.user_metadata?.avatar_url} alt={displayName || "User avatar"} />
              <AvatarFallback className="bg-blue-500/20 text-xl">{displayName ? getInitials(displayName) : "U"}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 w-full space-y-4">
              {isEditing ? (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input 
                      id="displayName" 
                      value={displayName} 
                      onChange={(e) => setDisplayName(e.target.value)} 
                      placeholder="Enter your full name" 
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveProfile} loading={isLoading} variant="success">
                      {!isLoading && <Save className="h-4 w-4" />}
                      Save
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleCancelEdit} disabled={isLoading}>
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-semibold text-white">{displayName || "No name set"}</h2>
                    <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </BentoCard>

        <BentoCard layout="tall" className="col-span-full lg:col-span-2" size="large" title="Account Details" icon={<Shield />}>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white/70 text-xs uppercase tracking-wide">User ID</Label>
              <p className="font-mono bg-white/5 p-3 rounded-lg text-xs break-all border border-white/10">{user.id}</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-white/70 text-xs uppercase tracking-wide">Account Created</Label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-white/50" />
                <p className="text-sm">{formatDate(user.created_at)}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-white/70 text-xs uppercase tracking-wide">Email Status</Label>
              <Badge variant={user.email_confirmed_at ? "success" : "secondary"}>
                {user.email_confirmed_at ? "Verified" : "Unverified"}
              </Badge>
            </div>
          </div>
        </BentoCard>

        <BentoCard layout="medium" className="col-span-full lg:col-span-3" title="Preferences" icon={<SettingsIcon />}>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="notifications" className="text-white">Push Notifications</Label>
                <p className="text-sm text-white/60">Receive updates about your cases</p>
              </div>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="dark-mode" className="text-white">Dark Mode</Label>
                <p className="text-sm text-white/60">Toggle dark theme appearance</p>
              </div>
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="data-sync" className="text-white">Data Synchronization</Label>
                <p className="text-sm text-white/60">Sync data across devices</p>
              </div>
              <Switch id="data-sync" checked={dataSync} onCheckedChange={setDataSync} />
            </div>
          </div>
        </BentoCard>
        
        <BentoCard layout="medium" className="col-span-full lg:col-span-3" title="Data Management" icon={<Database />}>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-white">Export Data</h4>
                  <p className="text-sm text-white/70">Download all your data as JSON</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleExportData}>
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-white">Clear All Data</h4>
                  <p className="text-sm text-white/70">Permanently delete all local data</p>
                </div>
                <Button variant="destructive" size="sm" onClick={handleClearData}>
                  <Trash2 className="h-4 w-4" />
                  {showDeleteConfirm ? "Confirm" : "Clear Data"}
                </Button>
              </div>
              
              {showDeleteConfirm && (
                <Alert variant="destructive" className="mt-3">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>This action is irreversible. Click "Confirm" again to proceed.</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </BentoCard>
        
        <BentoCard variant="interactive" className="col-span-full" onClick={handleSignOut}>
          <div className="flex items-center justify-between p-2">
            <div className="space-y-1">
              <h3 className="font-semibold text-white">Sign Out</h3>
              <p className="text-sm text-white/70">Sign out of your account on this device</p>
            </div>
            <LogOut className="h-5 w-5 text-red-400 flex-shrink-0" />
          </div>
        </BentoCard>
      </BentoContainer>
    </div>
  );
};

export default Account;
