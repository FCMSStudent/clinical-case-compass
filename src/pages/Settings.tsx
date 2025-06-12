import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/page-header";
import { useAuth } from "@/app/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useErrorHandler } from "@/hooks/use-error-handler";
import { 
  User, 
  Settings as SettingsIcon, 
  Palette, 
  Shield, 
  Bell, 
  Monitor,
  Sun,
  Moon,
  Monitor as MonitorIcon,
  Palette as PaletteIcon
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@/app/ThemeContext";

// Form schemas
const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  specialty: z.string().optional(),
  email: z.string().email("Invalid email address"),
});

const accountSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const appearanceSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  fontSize: z.enum(["small", "medium", "large"]),
  reducedMotion: z.boolean(),
  highContrast: z.boolean(),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type AccountFormData = z.infer<typeof accountSchema>;
type AppearanceFormData = z.infer<typeof appearanceSchema>;

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const { handleError } = useErrorHandler();

  // Theme management
  const { currentTheme, setTheme, availableThemes, getThemeNames } = useTheme();

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.user_metadata?.full_name || "",
      specialty: user?.user_metadata?.specialty || "",
      email: user?.email || "",
    },
  });

  const accountForm = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
  });

  const appearanceForm = useForm<AppearanceFormData>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      theme: "system",
      fontSize: "medium",
      reducedMotion: false,
      highContrast: false,
    },
  });

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile({
        full_name: data.fullName,
        specialty: data.specialty,
      });
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      handleError(error, "updating profile");
    }
  };

  const onAccountSubmit = async (data: AccountFormData) => {
    try {
      // Handle password change logic here
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });
      accountForm.reset();
    } catch (error) {
      handleError(error, "updating password");
    }
  };

  const onAppearanceSubmit = async (data: AppearanceFormData) => {
    try {
      setTheme(data.theme);
      // Update other appearance settings
      toast({
        title: "Appearance updated",
        description: "Your appearance settings have been updated.",
      });
    } catch (error) {
      handleError(error, "updating appearance");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        // Handle account deletion logic here
        toast({
          title: "Account deleted",
          description: "Your account has been deleted successfully.",
        });
      } catch (error) {
        handleError(error, "deleting account");
      }
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account preferences and settings"
        icon={<SettingsIcon className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white text-xl font-bold">
                  {getInitials(user?.user_metadata?.full_name || user?.email || "U")}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {user?.user_metadata?.full_name || "User"}
                </h3>
                <p className="text-gray-400 text-sm">
                  {user?.user_metadata?.specialty || "Medical Professional"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Tabs */}
        <Card className="lg:col-span-3 bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5 bg-white/10">
                <TabsTrigger value="profile" className="text-white data-[state=active]:bg-white/20">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="account" className="text-white data-[state=active]:bg-white/20">
                  <Shield className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="appearance" className="text-white data-[state=active]:bg-white/20">
                  <Palette className="h-4 w-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="notifications" className="text-white data-[state=active]:bg-white/20">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="privacy" className="text-white data-[state=active]:bg-white/20">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4">
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-white">Full Name</Label>
                      <Input
                        id="fullName"
                        {...profileForm.register("fullName")}
                        className="bg-white/10 border-white/20 text-white"
                      />
                      {profileForm.formState.errors.fullName && (
                        <p className="text-red-400 text-sm">{profileForm.formState.errors.fullName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialty" className="text-white">Specialty</Label>
                      <Input
                        id="specialty"
                        {...profileForm.register("specialty")}
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...profileForm.register("email")}
                      className="bg-white/10 border-white/20 text-white"
                    />
                    {profileForm.formState.errors.email && (
                      <p className="text-red-400 text-sm">{profileForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Save Profile
                  </Button>
                </form>
              </TabsContent>

              {/* Account Tab */}
              <TabsContent value="account" className="space-y-4">
                <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      {...accountForm.register("currentPassword")}
                      className="bg-white/10 border-white/20 text-white"
                    />
                    {accountForm.formState.errors.currentPassword && (
                      <p className="text-red-400 text-sm">{accountForm.formState.errors.currentPassword.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-white">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        {...accountForm.register("newPassword")}
                        className="bg-white/10 border-white/20 text-white"
                      />
                      {accountForm.formState.errors.newPassword && (
                        <p className="text-red-400 text-sm">{accountForm.formState.errors.newPassword.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...accountForm.register("confirmPassword")}
                        className="bg-white/10 border-white/20 text-white"
                      />
                      {accountForm.formState.errors.confirmPassword && (
                        <p className="text-red-400 text-sm">{accountForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Update Password
                  </Button>
                </form>

                <div className="pt-6 border-t border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Danger Zone</h4>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete Account
                  </Button>
                </div>
              </TabsContent>

              {/* Appearance Tab */}
              <TabsContent value="appearance" className="space-y-4">
                <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Theme</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {["light", "dark", "system"].map((theme) => (
                        <Button
                          key={theme}
                          type="button"
                          variant={appearanceForm.watch("theme") === theme ? "default" : "outline"}
                          onClick={() => appearanceForm.setValue("theme", theme as any)}
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          {theme === "light" && <Sun className="h-4 w-4 mr-2" />}
                          {theme === "dark" && <Moon className="h-4 w-4 mr-2" />}
                          {theme === "system" && <Monitor className="h-4 w-4 mr-2" />}
                          {theme.charAt(0).toUpperCase() + theme.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Save Appearance
                  </Button>
                </form>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-4">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Notification Preferences</h4>
                  <p className="text-gray-400">Configure your notification settings here.</p>
                  <Button disabled className="bg-gray-600 text-gray-400">
                    Coming Soon
                  </Button>
                </div>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy" className="space-y-4">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Privacy Settings</h4>
                  <p className="text-gray-400">Manage your privacy and data settings here.</p>
                  <Button disabled className="bg-gray-600 text-gray-400">
                    Coming Soon
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
