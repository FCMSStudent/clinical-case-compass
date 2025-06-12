import React, { useState, useRef, useEffect } from "react";
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
  Palette as PaletteIcon,
  AlertTriangle,
  Eye,
  EyeOff
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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const { handleError } = useErrorHandler();
  const deleteConfirmRef = useRef<HTMLDialogElement>(null);

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

  // Focus management for tabs
  useEffect(() => {
    const activeTabContent = document.querySelector(`[data-state="active"][role="tabpanel"]`);
    if (activeTabContent) {
      const firstFocusable = activeTabContent.querySelector('input, button, [tabindex]:not([tabindex="-1"])') as HTMLElement;
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }, [activeTab]);

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
    setIsDeleting(true);
    try {
      // Handle account deletion logic here
      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully.",
      });
    } catch (error) {
      handleError(error, "deleting account");
    } finally {
      setIsDeleting(false);
      deleteConfirmRef.current?.close();
    }
  };

  const openDeleteConfirm = () => {
    deleteConfirmRef.current?.showModal();
  };

  const closeDeleteConfirm = () => {
    deleteConfirmRef.current?.close();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <main role="main" aria-labelledby="settings-title" className="space-y-6">
      {/* Skip Navigation */}
      <nav aria-label="Settings navigation" className="sr-only">
        <a 
          href="#profile-tab" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          Skip to profile settings
        </a>
        <a 
          href="#account-tab" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-32 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          Skip to account settings
        </a>
      </nav>

      <PageHeader
        title="Settings"
        description="Manage your account preferences and settings"
        icon={<SettingsIcon className="h-6 w-6" aria-hidden="true" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Card */}
        <section aria-labelledby="profile-card-title">
          <Card className="lg:col-span-1 bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div 
                  className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto"
                  role="img"
                  aria-label={`Profile avatar for ${user?.user_metadata?.full_name || user?.email || "User"}`}
                >
                  <span className="text-white text-xl font-bold">
                    {getInitials(user?.user_metadata?.full_name || user?.email || "U")}
                  </span>
                </div>
                <div>
                  <h3 id="profile-card-title" className="text-lg font-semibold text-white">
                    {user?.user_metadata?.full_name || "User"}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {user?.user_metadata?.specialty || "Medical Professional"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Settings Tabs */}
        <section aria-labelledby="settings-tabs-title" className="lg:col-span-3">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h2 id="settings-tabs-title" className="sr-only">Settings Options</h2>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList 
                  className="grid w-full grid-cols-5 bg-white/10"
                  role="tablist"
                  aria-label="Settings categories"
                >
                  <TabsTrigger 
                    value="profile" 
                    className="text-white data-[state=active]:bg-white/20"
                    role="tab"
                    aria-selected={activeTab === "profile"}
                    aria-controls="profile-tab"
                    id="profile-tab-trigger"
                  >
                    <User className="h-4 w-4 mr-2" aria-hidden="true" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="account" 
                    className="text-white data-[state=active]:bg-white/20"
                    role="tab"
                    aria-selected={activeTab === "account"}
                    aria-controls="account-tab"
                    id="account-tab-trigger"
                  >
                    <Shield className="h-4 w-4 mr-2" aria-hidden="true" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger 
                    value="appearance" 
                    className="text-white data-[state=active]:bg-white/20"
                    role="tab"
                    aria-selected={activeTab === "appearance"}
                    aria-controls="appearance-tab"
                    id="appearance-tab-trigger"
                  >
                    <Palette className="h-4 w-4 mr-2" aria-hidden="true" />
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="text-white data-[state=active]:bg-white/20"
                    role="tab"
                    aria-selected={activeTab === "notifications"}
                    aria-controls="notifications-tab"
                    id="notifications-tab-trigger"
                  >
                    <Bell className="h-4 w-4 mr-2" aria-hidden="true" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="privacy" 
                    className="text-white data-[state=active]:bg-white/20"
                    role="tab"
                    aria-selected={activeTab === "privacy"}
                    aria-controls="privacy-tab"
                    id="privacy-tab-trigger"
                  >
                    <Shield className="h-4 w-4 mr-2" aria-hidden="true" />
                    Privacy
                  </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent 
                  value="profile" 
                  className="space-y-4"
                  role="tabpanel"
                  id="profile-tab"
                  aria-labelledby="profile-tab-trigger"
                >
                  <h3 className="text-lg font-semibold text-white">Profile Information</h3>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-white">Full Name</Label>
                        <Input
                          id="fullName"
                          {...profileForm.register("fullName")}
                          className="bg-white/10 border-white/20 text-white focus:ring-2 focus:ring-white/30"
                          aria-describedby={profileForm.formState.errors.fullName ? "fullName-error" : "fullName-help"}
                          aria-invalid={!!profileForm.formState.errors.fullName}
                        />
                        {profileForm.formState.errors.fullName && (
                          <p id="fullName-error" className="text-red-400 text-sm" role="alert">
                            {profileForm.formState.errors.fullName.message}
                          </p>
                        )}
                        <p id="fullName-help" className="sr-only">Enter your full name as it should appear on your profile</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="specialty" className="text-white">Specialty</Label>
                        <Input
                          id="specialty"
                          {...profileForm.register("specialty")}
                          className="bg-white/10 border-white/20 text-white focus:ring-2 focus:ring-white/30"
                          aria-describedby="specialty-help"
                        />
                        <p id="specialty-help" className="sr-only">Enter your medical specialty or area of practice</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...profileForm.register("email")}
                        className="bg-white/10 border-white/20 text-white focus:ring-2 focus:ring-white/30"
                        aria-describedby={profileForm.formState.errors.email ? "email-error" : "email-help"}
                        aria-invalid={!!profileForm.formState.errors.email}
                      />
                      {profileForm.formState.errors.email && (
                        <p id="email-error" className="text-red-400 text-sm" role="alert">
                          {profileForm.formState.errors.email.message}
                        </p>
                      )}
                      <p id="email-help" className="sr-only">Your email address for account notifications</p>
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700 text-white focus:ring-2 focus:ring-white/30"
                      aria-describedby="profile-submit-help"
                    >
                      Save Profile
                    </Button>
                    <p id="profile-submit-help" className="sr-only">Click to save your profile changes</p>
                  </form>
                </TabsContent>

                {/* Account Tab */}
                <TabsContent 
                  value="account" 
                  className="space-y-4"
                  role="tabpanel"
                  id="account-tab"
                  aria-labelledby="account-tab-trigger"
                >
                  <h3 className="text-lg font-semibold text-white">Account Security</h3>
                  <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          {...accountForm.register("currentPassword")}
                          className="bg-white/10 border-white/20 text-white focus:ring-2 focus:ring-white/30 pr-10"
                          aria-describedby={accountForm.formState.errors.currentPassword ? "currentPassword-error" : "currentPassword-help"}
                          aria-invalid={!!accountForm.formState.errors.currentPassword}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          aria-label={showCurrentPassword ? "Hide current password" : "Show current password"}
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4 text-white" aria-hidden="true" />
                          ) : (
                            <Eye className="h-4 w-4 text-white" aria-hidden="true" />
                          )}
                        </Button>
                      </div>
                      {accountForm.formState.errors.currentPassword && (
                        <p id="currentPassword-error" className="text-red-400 text-sm" role="alert">
                          {accountForm.formState.errors.currentPassword.message}
                        </p>
                      )}
                      <p id="currentPassword-help" className="sr-only">Enter your current password to verify your identity</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-white">New Password</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            {...accountForm.register("newPassword")}
                            className="bg-white/10 border-white/20 text-white focus:ring-2 focus:ring-white/30 pr-10"
                            aria-describedby={accountForm.formState.errors.newPassword ? "newPassword-error" : "newPassword-help"}
                            aria-invalid={!!accountForm.formState.errors.newPassword}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4 text-white" aria-hidden="true" />
                            ) : (
                              <Eye className="h-4 w-4 text-white" aria-hidden="true" />
                            )}
                          </Button>
                        </div>
                        {accountForm.formState.errors.newPassword && (
                          <p id="newPassword-error" className="text-red-400 text-sm" role="alert">
                            {accountForm.formState.errors.newPassword.message}
                          </p>
                        )}
                        <p id="newPassword-help" className="sr-only">Enter your new password (minimum 6 characters)</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            {...accountForm.register("confirmPassword")}
                            className="bg-white/10 border-white/20 text-white focus:ring-2 focus:ring-white/30 pr-10"
                            aria-describedby={accountForm.formState.errors.confirmPassword ? "confirmPassword-error" : "confirmPassword-help"}
                            aria-invalid={!!accountForm.formState.errors.confirmPassword}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-white" aria-hidden="true" />
                            ) : (
                              <Eye className="h-4 w-4 text-white" aria-hidden="true" />
                            )}
                          </Button>
                        </div>
                        {accountForm.formState.errors.confirmPassword && (
                          <p id="confirmPassword-error" className="text-red-400 text-sm" role="alert">
                            {accountForm.formState.errors.confirmPassword.message}
                          </p>
                        )}
                        <p id="confirmPassword-help" className="sr-only">Re-enter your new password to confirm</p>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700 text-white focus:ring-2 focus:ring-white/30"
                      aria-describedby="password-submit-help"
                    >
                      Update Password
                    </Button>
                    <p id="password-submit-help" className="sr-only">Click to update your password</p>
                  </form>

                  <section aria-labelledby="danger-zone-title" className="pt-6 border-t border-white/20">
                    <h4 id="danger-zone-title" className="text-lg font-semibold text-white mb-4 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-red-400" aria-hidden="true" />
                      Danger Zone
                    </h4>
                    <p className="text-white/70 mb-4">Permanently delete your account and all associated data.</p>
                    <Button
                      variant="destructive"
                      onClick={openDeleteConfirm}
                      className="bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-300"
                      aria-describedby="delete-account-help"
                    >
                      Delete Account
                    </Button>
                    <p id="delete-account-help" className="sr-only">Click to permanently delete your account. This action cannot be undone.</p>
                  </section>
                </TabsContent>

                {/* Appearance Tab */}
                <TabsContent 
                  value="appearance" 
                  className="space-y-4"
                  role="tabpanel"
                  id="appearance-tab"
                  aria-labelledby="appearance-tab-trigger"
                >
                  <h3 className="text-lg font-semibold text-white">Appearance Settings</h3>
                  <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white">Theme</Label>
                      <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Theme selection">
                        {["light", "dark", "system"].map((theme) => (
                          <Button
                            key={theme}
                            type="button"
                            variant={appearanceForm.watch("theme") === theme ? "default" : "outline"}
                            onClick={() => appearanceForm.setValue("theme", theme as any)}
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-2 focus:ring-white/30"
                            role="radio"
                            aria-checked={appearanceForm.watch("theme") === theme}
                            aria-describedby={`theme-${theme}-description`}
                          >
                            {theme === "light" && <Sun className="h-4 w-4 mr-2" aria-hidden="true" />}
                            {theme === "dark" && <Moon className="h-4 w-4 mr-2" aria-hidden="true" />}
                            {theme === "system" && <Monitor className="h-4 w-4 mr-2" aria-hidden="true" />}
                            {theme.charAt(0).toUpperCase() + theme.slice(1)}
                          </Button>
                        ))}
                      </div>
                      <div className="sr-only">
                        <p id="theme-light-description">Light theme with bright colors</p>
                        <p id="theme-dark-description">Dark theme with dark colors</p>
                        <p id="theme-system-description">Follow system theme preference</p>
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700 text-white focus:ring-2 focus:ring-white/30"
                      aria-describedby="appearance-submit-help"
                    >
                      Save Appearance
                    </Button>
                    <p id="appearance-submit-help" className="sr-only">Click to save your appearance settings</p>
                  </form>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent 
                  value="notifications" 
                  className="space-y-4"
                  role="tabpanel"
                  id="notifications-tab"
                  aria-labelledby="notifications-tab-trigger"
                >
                  <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
                  <p className="text-gray-400">Configure your notification settings here.</p>
                  <Button 
                    disabled 
                    className="bg-gray-600 text-gray-400"
                    aria-describedby="notifications-coming-soon"
                  >
                    Coming Soon
                  </Button>
                  <p id="notifications-coming-soon" className="sr-only">Notification settings will be available in a future update</p>
                </TabsContent>

                {/* Privacy Tab */}
                <TabsContent 
                  value="privacy" 
                  className="space-y-4"
                  role="tabpanel"
                  id="privacy-tab"
                  aria-labelledby="privacy-tab-trigger"
                >
                  <h3 className="text-lg font-semibold text-white">Privacy Settings</h3>
                  <p className="text-gray-400">Manage your privacy and data settings here.</p>
                  <Button 
                    disabled 
                    className="bg-gray-600 text-gray-400"
                    aria-describedby="privacy-coming-soon"
                  >
                    Coming Soon
                  </Button>
                  <p id="privacy-coming-soon" className="sr-only">Privacy settings will be available in a future update</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <dialog
        ref={deleteConfirmRef}
        className="backdrop:bg-black/50 backdrop:backdrop-blur-sm p-6 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400" aria-hidden="true" />
            <h3 id="delete-dialog-title" className="text-lg font-semibold text-white">
              Delete Account
            </h3>
          </div>
          <p id="delete-dialog-description" className="text-white/70">
            Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={closeDeleteConfirm}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
              aria-describedby={isDeleting ? "deleting-account" : undefined}
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </Button>
            {isDeleting && (
              <p id="deleting-account" className="sr-only">Account deletion in progress</p>
            )}
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default Settings;
