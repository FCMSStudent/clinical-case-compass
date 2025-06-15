
import React, { useState } from "react";
import { useAuth } from "@/app/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/ui/page-header";
import { EnhancedAppLayout } from "@/features/navigation/components/EnhancedAppLayout";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Moon, 
  Shield, 
  Database,
  Trash2,
  Download,
  AlertTriangle,
  LogOut
} from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLocalStorage } from "@/hooks/use-local-storage";

const Settings = () => {
  const { signOut } = useAuth();
  const [storedCases, setStoredCases] = useLocalStorage("medical-cases", []);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dataSync, setDataSync] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleExportData = () => {
    try {
      const dataBlob = new Blob(
        [JSON.stringify(storedCases, null, 2)],
        { type: "application/json" }
      );
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

  return (
    <EnhancedAppLayout>
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <PageHeader
          title="Settings"
          description="Manage your application preferences and account settings"
          icon={<SettingsIcon className="h-8 w-8" />}
        />

        {/* Notifications Settings */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-white">Push Notifications</Label>
                <p className="text-white/70 text-sm">
                  Receive notifications about case updates and reminders
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Moon className="mr-2 h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-white">Dark Mode</Label>
                <p className="text-white/70 text-sm">
                  Toggle between light and dark themes
                </p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-white">Data Synchronization</Label>
                <p className="text-white/70 text-sm">
                  Sync your data across devices when signed in
                </p>
              </div>
              <Switch
                checked={dataSync}
                onCheckedChange={setDataSync}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Export Data</Label>
                  <p className="text-white/70 text-sm">
                    Download your cases and data as a JSON file
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportData}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              <div className="border-t border-white/20 pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-white">Clear All Data</Label>
                      <p className="text-white/70 text-sm">
                        Permanently delete all local cases and settings
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleClearData}
                      className="bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {showDeleteConfirm ? "Confirm Delete" : "Clear Data"}
                    </Button>
                  </div>

                  {showDeleteConfirm && (
                    <Alert className="bg-red-500/20 border-red-400/30">
                      <AlertTriangle className="h-4 w-4 text-red-300" />
                      <AlertDescription className="text-red-300">
                        This action cannot be undone. Click "Confirm Delete" again to proceed.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Account Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-white">Sign Out</Label>
                <p className="text-white/70 text-sm">
                  Sign out of your account on this device
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </EnhancedAppLayout>
  );
};

export default Settings;
