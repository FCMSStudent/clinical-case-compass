
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/ui/page-header";
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
  AlertTriangle,
  Eye,
  EyeOff,
  Lock
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { UserMetadata } from "@/types/auth";

// Simplified form schemas
const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100, "Name too long"),
  specialty: z.string().optional(),
  email: z.string().email("Invalid email address"),
});

const securitySchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type SecurityFormData = z.infer<typeof securitySchema>;

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

  // Safe access to user metadata with fallbacks
  const getUserMetadata = (field: keyof UserMetadata): string => {
    return user?.user_metadata?.[field] as string || "";
  };

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: getUserMetadata('full_name'),
      specialty: getUserMetadata('specialty'),
      email: user?.email || "",
    },
  });

  const securityForm = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Calculate completed fields for progress indicator
  const getCompletedFields = () => {
    const values = profileForm.getValues();
    let completed = 0;
    if (values.fullName) completed++;
    if (values.email) completed++;
    if (values.specialty) completed++;
    return completed;
  };

  // Auto-save functionality
  useEffect(() => {
    const subscription = profileForm.watch(() => {
      const values = profileForm.getValues();
      const errors = profileForm.formState.errors;
      
      // Only auto-save if form is valid
      if (Object.keys(errors).length === 0 && values.fullName && values.email) {
        setAutosaveStatus('saving');
        const timeoutId = setTimeout(() => {
          setAutosaveStatus('saved');
          setLastSaved(new Date());
        }, 1000);
        return () => clearTimeout(timeoutId);
      }
    });
    return () => subscription.unsubscribe();
  }, [profileForm]);

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      setAutosaveStatus('saving');
      const updateData: UserMetadata = {
        full_name: data.fullName,
        specialty: data.specialty,
      };
      await updateProfile(updateData);
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
      toast({
        title: "Security updated",
        description: "Your security settings have been updated successfully.",
      });
      securityForm.reset();
    } catch (error) {
      handleError(error, "updating security settings");
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
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

  return (
    <main className="space-y-6 max-w-6xl mx-auto">
      <PageHeader
        title="Settings"
        description="Manage your account preferences and settings"
        icon={<SettingsIcon className="h-6 w-6" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <SettingsCard
            title="Profile"
            description="Your profile information"
            className="h-fit"
          >
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white/20">
                <span className="text-white text-lg font-bold">
                  {getUserMetadata('full_name') ? getUserMetadata('full_name').charAt(0) : "U"}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {getUserMetadata('full_name') || "User"}
                </h3>
                <p className="text-white/70 text-sm">
                  {getUserMetadata('specialty') || "Medical Professional"}
                </p>
              </div>
              <FormProgress
                totalFields={3}
                completedFields={getCompletedFields()}
              />
            </div>
          </SettingsCard>
        </div>

        {/* Settings Tabs */}
        <div className="lg:col-span-3">
          <Card className="bg-white/5 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Account Settings</h2>
                <AutosaveIndicator status={autosaveStatus} lastSaved={lastSaved} />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 bg-white/10">
                  <TabsTrigger value="profile" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="security" className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white">
                    <Shield className="h-4 w-4 mr-2" />
                    Security
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
                              <FormLabel className="text-white">Full Name *</FormLabel>
                              <FormControl>
                                <Input {...field} className="bg-white/10 border-white/20 text-white placeholder:text-white/60" />
                              </FormControl>
                              <FormMessage className="text-red-300" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">Email *</FormLabel>
                              <FormControl>
                                <Input {...field} type="email" className="bg-white/10 border-white/20 text-white placeholder:text-white/60" />
                              </FormControl>
                              <FormMessage className="text-red-300" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="specialty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Specialty</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white/10 border-white/20 text-white placeholder:text-white/60" />
                            </FormControl>
                            <FormMessage className="text-red-300" />
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
                                <FormLabel className="text-white">Current Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      {...field}
                                      type={showCurrentPassword ? "text" : "password"}
                                      className="bg-white/10 border-white/20 text-white pr-10 placeholder:text-white/60"
                                    />
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10 text-white/70"
                                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    >
                                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage className="text-red-300" />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={securityForm.control}
                              name="newPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">New Password</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        {...field}
                                        type={showNewPassword ? "text" : "password"}
                                        className="bg-white/10 border-white/20 text-white pr-10 placeholder:text-white/60"
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10 text-white/70"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                      >
                                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                      </Button>
                                    </div>
                                  </FormControl>
                                  <FormMessage className="text-red-300" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={securityForm.control}
                              name="confirmPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">Confirm Password</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        {...field}
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="bg-white/10 border-white/20 text-white pr-10 placeholder:text-white/60"
                                      />
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10 text-white/70"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                      >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                      </Button>
                                    </div>
                                  </FormControl>
                                  <FormMessage className="text-red-300" />
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
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Delete Account
                        </Button>
                      </div>
                    </SettingsCard>
                  </div>
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
              className="bg-red-600 hover:bg-red-700 text-white"
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
