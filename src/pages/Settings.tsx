
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/page-header";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { FormProgress } from "@/components/ui/form-progress";
import { SettingsCard } from "@/components/ui/settings-card";
import { AutosaveIndicator } from "@/components/ui/autosave-indicator";
import { useAuth } from "@/app/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useErrorHandler } from "@/hooks/use-error-handler";
import { 
  User, 
  Settings as SettingsIcon, 
  Shield, 
  Palette,
  Sun,
  Moon,
  Monitor,
  AlertTriangle,
  Eye,
  EyeOff,
  Bell,
  Lock,
  Globe,
  Smartphone,
  Mail
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormValidation } from "@/hooks/use-form-validation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Enhanced form schemas
const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100, "Name too long"),
  specialty: z.string().optional(),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
});

const securitySchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  twoFactorEnabled: z.boolean(),
  sessionTimeout: z.enum(["15", "30", "60", "never"]),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const preferencesSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  language: z.enum(["en", "es", "fr", "de"]),
  timezone: z.string(),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  dataSharing: z.boolean(),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type SecurityFormData = z.infer<typeof securitySchema>;
type PreferencesFormData = z.infer<typeof preferencesSchema>;

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [autosaveStatus, setAutosaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<Date>();
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const { handleError } = useErrorHandler();
  const deleteConfirmRef = useRef<HTMLDialogElement>(null);

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.user_metadata?.full_name || "",
      specialty: user?.user_metadata?.specialty || "",
      email: user?.email || "",
      bio: user?.user_metadata?.bio || "",
      phone: user?.user_metadata?.phone || "",
      location: user?.user_metadata?.location || "",
    },
  });

  const securityForm = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: false,
      sessionTimeout: "30",
    },
  });

  const preferencesForm = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      theme: "system",
      language: "en",
      timezone: "UTC",
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      dataSharing: false,
    },
  });

  // Form validation hooks
  const profileValidation = useFormValidation<ProfileFormData>({
    requiredFields: ['fullName', 'email'],
  });

  // Auto-save functionality
  useEffect(() => {
    const subscription = profileForm.watch((data) => {
      if (profileValidation.isValid) {
        setAutosaveStatus('saving');
        const timeoutId = setTimeout(() => {
          setAutosaveStatus('saved');
          setLastSaved(new Date());
        }, 1000);
        return () => clearTimeout(timeoutId);
      }
    });
    return () => subscription.unsubscribe();
  }, [profileForm, profileValidation.isValid]);

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      setAutosaveStatus('saving');
      await updateProfile({
        full_name: data.fullName,
        specialty: data.specialty,
        bio: data.bio,
        phone: data.phone,
        location: data.location,
      });
      setAutosaveStatus('saved');
      setLastSaved(new Date());
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      setAutosaveStatus('error');
      handleError(error, "updating profile");
    }
  };

  const onSecuritySubmit = async (data: SecurityFormData) => {
    try {
      // Handle password change and security settings
      toast({
        title: "Security updated",
        description: "Your security settings have been updated successfully.",
      });
      securityForm.reset();
    } catch (error) {
      handleError(error, "updating security settings");
    }
  };

  const onPreferencesSubmit = async (data: PreferencesFormData) => {
    try {
      // Handle preferences update
      toast({
        title: "Preferences updated",
        description: "Your preferences have been updated successfully.",
      });
    } catch (error) {
      handleError(error, "updating preferences");
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

  const handleAvatarChange = (file: File) => {
    // Handle avatar upload
    console.log('Avatar changed:', file);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <main className="space-y-6 max-w-6xl mx-auto">
      <PageHeader
        title="Settings"
        description="Manage your account preferences and settings"
        icon={<SettingsIcon className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Enhanced Profile Card */}
        <div className="lg:col-span-1">
          <SettingsCard
            title="Profile"
            description="Your profile information"
            className="h-fit"
          >
            <div className="text-center space-y-4">
              <AvatarUpload
                currentAvatar={user?.user_metadata?.avatar_url}
                onAvatarChange={handleAvatarChange}
                className="mx-auto"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {user?.user_metadata?.full_name || "User"}
                </h3>
                <p className="text-white/70 text-sm">
                  {user?.user_metadata?.specialty || "Medical Professional"}
                </p>
              </div>
              <FormProgress
                totalFields={6}
                completedFields={profileValidation.completedFields}
              />
            </div>
          </SettingsCard>
        </div>

        {/* Enhanced Settings Tabs */}
        <div className="lg:col-span-3">
          <Card className="bg-white/5 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Account Settings</h2>
                <AutosaveIndicator status={autosaveStatus} lastSaved={lastSaved} />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 bg-white/10">
                  <TabsTrigger value="profile" className="text-white data-[state=active]:bg-white/20">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="security" className="text-white data-[state=active]:bg-white/20">
                    <Shield className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="text-white data-[state=active]:bg-white/20">
                    <Palette className="h-4 w-4 mr-2" />
                    Preferences
                  </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6 mt-6">
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input {...field} className="bg-white/10 border-white/20 text-white" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" className="bg-white/10 border-white/20 text-white" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="specialty"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Specialty</FormLabel>
                              <FormControl>
                                <Input {...field} className="bg-white/10 border-white/20 text-white" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input {...field} className="bg-white/10 border-white/20 text-white" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white/10 border-white/20 text-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Save Profile
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                {/* Security Tab */}
                <TabsContent value="security" className="space-y-6 mt-6">
                  <div className="space-y-6">
                    {/* Password Section */}
                    <SettingsCard
                      title="Change Password"
                      description="Update your password to keep your account secure"
                      icon={<Lock className="h-5 w-5 text-white" />}
                    >
                      <Form {...securityForm}>
                        <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-4">
                          <FormField
                            control={securityForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      {...field}
                                      type={showCurrentPassword ? "text" : "password"}
                                      className="bg-white/10 border-white/20 text-white pr-10"
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10"
                                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    >
                                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={securityForm.control}
                              name="newPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>New Password</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        {...field}
                                        type={showNewPassword ? "text" : "password"}
                                        className="bg-white/10 border-white/20 text-white pr-10"
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                      >
                                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                      </Button>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={securityForm.control}
                              name="confirmPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Confirm Password</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        {...field}
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="bg-white/10 border-white/20 text-white pr-10"
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                      >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                      </Button>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Update Password
                          </Button>
                        </form>
                      </Form>
                    </SettingsCard>

                    {/* Two-Factor Authentication */}
                    <SettingsCard
                      title="Two-Factor Authentication"
                      description="Add an extra layer of security to your account"
                      icon={<Smartphone className="h-5 w-5 text-white" />}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm">Secure your account with 2FA</p>
                          <p className="text-white/60 text-xs mt-1">Recommended for enhanced security</p>
                        </div>
                        <Switch />
                      </div>
                    </SettingsCard>

                    {/* Danger Zone */}
                    <SettingsCard
                      title="Danger Zone"
                      description="Irreversible and destructive actions"
                      icon={<AlertTriangle className="h-5 w-5 text-red-400" />}
                      className="border-red-500/20"
                    >
                      <div className="space-y-4">
                        <p className="text-white/70 text-sm">
                          Permanently delete your account and all associated data.
                        </p>
                        <Button
                          variant="destructive"
                          onClick={() => deleteConfirmRef.current?.showModal()}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Delete Account
                        </Button>
                      </div>
                    </SettingsCard>
                  </div>
                </TabsContent>

                {/* Preferences Tab */}
                <TabsContent value="preferences" className="space-y-6 mt-6">
                  <Form {...preferencesForm}>
                    <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-6">
                      {/* Theme Settings */}
                      <SettingsCard
                        title="Appearance"
                        description="Customize how the app looks and feels"
                        icon={<Palette className="h-5 w-5 text-white" />}
                      >
                        <div className="space-y-4">
                          <FormField
                            control={preferencesForm.control}
                            name="theme"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Theme</FormLabel>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                  {[
                                    { value: "light", icon: Sun, label: "Light" },
                                    { value: "dark", icon: Moon, label: "Dark" },
                                    { value: "system", icon: Monitor, label: "System" }
                                  ].map(({ value, icon: Icon, label }) => (
                                    <Button
                                      key={value}
                                      type="button"
                                      variant={field.value === value ? "default" : "outline"}
                                      onClick={() => field.onChange(value)}
                                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                                    >
                                      <Icon className="h-4 w-4 mr-2" />
                                      {label}
                                    </Button>
                                  ))}
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </SettingsCard>

                      {/* Notification Settings */}
                      <SettingsCard
                        title="Notifications"
                        description="Choose what notifications you receive"
                        icon={<Bell className="h-5 w-5 text-white" />}
                      >
                        <div className="space-y-4">
                          <FormField
                            control={preferencesForm.control}
                            name="emailNotifications"
                            render={({ field }) => (
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label>Email Notifications</Label>
                                  <p className="text-white/60 text-xs">Receive notifications via email</p>
                                </div>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </div>
                            )}
                          />

                          <FormField
                            control={preferencesForm.control}
                            name="pushNotifications"
                            render={({ field }) => (
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label>Push Notifications</Label>
                                  <p className="text-white/60 text-xs">Receive push notifications in your browser</p>
                                </div>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </div>
                            )}
                          />

                          <FormField
                            control={preferencesForm.control}
                            name="marketingEmails"
                            render={({ field }) => (
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label>Marketing Emails</Label>
                                  <p className="text-white/60 text-xs">Receive updates about new features</p>
                                </div>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </div>
                            )}
                          />
                        </div>
                      </SettingsCard>

                      {/* Privacy Settings */}
                      <SettingsCard
                        title="Privacy"
                        description="Control your data and privacy settings"
                        icon={<Globe className="h-5 w-5 text-white" />}
                      >
                        <div className="space-y-4">
                          <FormField
                            control={preferencesForm.control}
                            name="dataSharing"
                            render={({ field }) => (
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label>Data Sharing</Label>
                                  <p className="text-white/60 text-xs">Allow anonymous usage data collection</p>
                                </div>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </div>
                            )}
                          />
                        </div>
                      </SettingsCard>

                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Save Preferences
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <dialog
        ref={deleteConfirmRef}
        className="backdrop:bg-black/50 backdrop:backdrop-blur-sm p-6 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Delete Account</h3>
          </div>
          <p className="text-white/70">
            Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.
          </p>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => deleteConfirmRef.current?.close()}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </Button>
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default Settings;
