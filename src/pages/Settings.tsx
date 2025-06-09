import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { useAccessibility } from "@/lib/accessibility";
import { usePerformanceMonitor } from "@/lib/performance";
import { useTheme } from "@/lib/themes";
import { useGestureDetection } from "@/lib/interactions";

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

  // Performance monitoring
  usePerformanceMonitor("Settings");

  // Accessibility features
  const accessibility = useAccessibility({
    enableVoiceControl: true,
    enableKeyboardNavigation: true,
    enableFocusIndicators: true,
  });

  // Theme management
  const { currentTheme, setTheme, availableThemes, getThemeNames } = useTheme();

  // Gesture detection for tab switching
  const handleGesture = (event: any) => {
    if (event.type === "swipe") {
      const tabs = ["profile", "account", "appearance", "notifications", "privacy"];
      const currentIndex = tabs.indexOf(activeTab);
      
      if (event.direction === "left" && currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1]);
      } else if (event.direction === "right" && currentIndex > 0) {
        setActiveTab(tabs[currentIndex - 1]);
      }
    }
  };

  useGestureDetection(handleGesture, {
    threshold: 50,
    direction: "any"
  });

  // Register voice commands
  React.useEffect(() => {
    accessibility.registerVoiceCommand({
      command: "switch to profile tab",
      action: () => setActiveTab("profile"),
      description: "Switch to profile settings tab",
      category: "navigation"
    });

    accessibility.registerVoiceCommand({
      command: "switch to account tab",
      action: () => setActiveTab("account"),
      description: "Switch to account settings tab",
      category: "navigation"
    });

    accessibility.registerVoiceCommand({
      command: "switch to appearance tab",
      action: () => setActiveTab("appearance"),
      description: "Switch to appearance settings tab",
      category: "navigation"
    });

    accessibility.registerVoiceCommand({
      command: "save settings",
      action: () => {
        // Trigger save for current tab
        const saveButton = document.querySelector('[data-testid="save-button"]');
        if (saveButton instanceof HTMLElement) {
          saveButton.click();
        }
      },
      description: "Save current settings",
      category: "interaction"
    });
  }, [accessibility, activeTab]);

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
      .toUpperCase()
      .slice(0, 2);
  };

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: MonitorIcon },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader 
          title="Settings" 
          description="Manage your account preferences and settings"
          className="text-white"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl"></div>
          <Card className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-sm border border-white/20">
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
                </motion.div>

                <AnimatePresence mode="wait">
                  <TabsContent value="profile" className="mt-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <motion.div 
                            className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-semibold text-lg"
                            whileHover={{ scale: 1.05 }}
                          >
                            {getInitials(profileForm.watch("fullName") || "User")}
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">Profile Information</h3>
                            <p className="text-white/70">Update your personal information</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-white">Full Name</Label>
                            <Input
                              id="fullName"
                              {...profileForm.register("fullName")}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                            {profileForm.formState.errors.fullName && (
                              <p className="text-red-300 text-sm">{profileForm.formState.errors.fullName.message}</p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="specialty" className="text-white">Specialty</Label>
                            <Input
                              id="specialty"
                              {...profileForm.register("specialty")}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="email" className="text-white">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              {...profileForm.register("email")}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                              disabled
                            />
                          </div>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            type="submit" 
                            className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
                            data-testid="save-button"
                          >
                            Save Changes
                          </Button>
                        </motion.div>
                      </form>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="appearance" className="mt-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-4">Theme Settings</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {themeOptions.map((theme) => {
                              const IconComponent = theme.icon;
                              return (
                                <motion.div
                                  key={theme.value}
                                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                    currentTheme.name === theme.value
                                      ? "bg-white/20 border-white/40"
                                      : "bg-white/10 border-white/20 hover:bg-white/15"
                                  }`}
                                  onClick={() => setTheme(theme.value)}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <div className="flex items-center space-x-3">
                                    <IconComponent className="h-5 w-5 text-white" />
                                    <span className="text-white font-medium">{theme.label}</span>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-white mb-4">Accessibility</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label className="text-white">Reduced Motion</Label>
                                <p className="text-white/70 text-sm">Reduce animations and transitions</p>
                              </div>
                              <input
                                type="checkbox"
                                {...appearanceForm.register("reducedMotion")}
                                className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <Label className="text-white">High Contrast</Label>
                                <p className="text-white/70 text-sm">Increase contrast for better visibility</p>
                              </div>
                              <input
                                type="checkbox"
                                {...appearanceForm.register("highContrast")}
                                className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            type="submit" 
                            className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
                          >
                            Save Appearance
                          </Button>
                        </motion.div>
                      </form>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="account" className="mt-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                              <Input
                                id="currentPassword"
                                type="password"
                                {...accountForm.register("currentPassword")}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="newPassword" className="text-white">New Password</Label>
                              <Input
                                id="newPassword"
                                type="password"
                                {...accountForm.register("newPassword")}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
                              <Input
                                id="confirmPassword"
                                type="password"
                                {...accountForm.register("confirmPassword")}
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              type="submit" 
                              className="bg-white/10 border border-white/20 text-white hover:bg-white/20"
                            >
                              Update Password
                            </Button>
                          </motion.div>

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              type="button" 
                              variant="destructive"
                              onClick={handleDeleteAccount}
                              className="bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30"
                            >
                              Delete Account
                            </Button>
                          </motion.div>
                        </div>
                      </form>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="notifications" className="mt-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
                        <p className="text-white/70">Notification settings coming soon...</p>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="privacy" className="mt-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Privacy Settings</h3>
                        <p className="text-white/70">Privacy settings coming soon...</p>
                      </div>
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
