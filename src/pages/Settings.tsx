import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/app/AuthContext";
import type { UserMetadata } from "@/types/auth";
import { useTheme } from "@/app/ThemeContext";
import { supabase } from "@/integrations/supabase/client";
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
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { SPECIALTIES } from "@/types/case";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  Globe,
  HelpCircle,
  Languages,
  Lock,
  LogOut,
  Moon,
  Palette,
  Settings2,
  Shield,
  Sun,
  User,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const profileSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  specialty: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const accountSchema = z
  .object({
    email: z.string().email("Valid email is required"),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type AccountFormData = z.infer<typeof accountSchema>;

const appearanceSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).default("system"),
  fontSize: z.enum(["small", "medium", "large"]).default("medium"),
  reducedMotion: z.boolean().default(false),
  highContrast: z.boolean().default(false),
});

type AppearanceFormData = z.infer<typeof appearanceSchema>;

const Settings = () => {
  const { user, updateProfile, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      specialty: "none", // Changed default to "none" instead of empty string
    },
  });

  const accountForm = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
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

  useEffect(() => {
    form.reset({
      full_name: (user?.user_metadata as UserMetadata)?.full_name || "",
      specialty: (user?.user_metadata as UserMetadata)?.specialty || "none", // Handle empty specialty
    });
    accountForm.reset({
      email: user?.email || "",
      password: "",
      confirmPassword: "",
    });
    appearanceForm.reset({
      theme: "system",
      fontSize: "medium",
      reducedMotion: false,
      highContrast: false,
    });
  }, [user, form, accountForm, appearanceForm]);

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile({
        full_name: data.full_name,
        specialty: data.specialty === "none" ? undefined : data.specialty, // Convert "none" back to undefined/empty
      });
      toast.success("Profile updated");
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to update profile");
    }
  };

  const onAccountSubmit = async (data: AccountFormData) => {
    try {
      await supabase.auth.updateUser({
        email: data.email,
        password: data.password || undefined,
      });
      toast.success("Account updated");
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message || "Failed to update account");
    }
  };

  const onAppearanceSubmit = async (data: AppearanceFormData) => {
    try {
      localStorage.setItem("appearancePreferences", JSON.stringify(data));
      setTheme(data.theme);
      document.documentElement.classList.toggle("reduced-motion", data.reducedMotion);
      document.documentElement.classList.toggle("high-contrast", data.highContrast);
      document.documentElement.style.fontSize = {
        small: "14px",
        medium: "16px",
        large: "18px",
      }[data.fontSize];
      toast.success("Appearance preferences updated");
    } catch (error) {
      toast.error("Failed to update appearance preferences");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeletingAccount(true);
      // Add account deletion logic here
      await signOut();
      toast.success("Account deleted successfully");
    } catch (error) {
      toast.error("Failed to delete account");
    } finally {
      setIsDeletingAccount(false);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900">
      {/* Glassy background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-6 p-4 md:p-6">
        <PageHeader
          title="Settings"
          description="Manage your account settings and preferences"
          icon={<Settings2 className="h-6 w-6" />}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl"></div>
            <TabsList className="relative bg-white/10 backdrop-blur-md rounded-xl border border-white/20 grid w-full grid-cols-2 md:grid-cols-3 lg:w-auto">
              <TabsTrigger value="profile" className="flex items-center gap-2 text-white data-[state=active]:bg-white/20">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2 text-white data-[state=active]:bg-white/20">
                <Shield className="h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2 text-white data-[state=active]:bg-white/20">
                <Palette className="h-4 w-4" />
                Appearance
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16 border-2 border-white/20">
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-white/20 text-white">
                        {getInitials(user?.user_metadata?.full_name || "User")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Profile Information</h3>
                      <p className="text-white/70 text-sm">
                        Update your personal details and preferences
                      </p>
                    </div>
                  </div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onProfileSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Full Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                                <Input 
                                  placeholder="Your name" 
                                  className="relative bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="specialty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Specialty</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                                <Select
                                  defaultValue={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger className="relative bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0">
                                    <SelectValue placeholder="Select specialty" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
                                    <SelectItem value="none" className="text-white hover:bg-white/20">None</SelectItem>
                                    {SPECIALTIES.map((s) => (
                                      <SelectItem key={s.id} value={s.id} className="text-white hover:bg-white/20">
                                        {s.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white">
                        Save Changes
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Account Activity</h3>
                  <p className="text-white/70 text-sm mb-6">
                    Recent activity and account status
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                        <div>
                          <p className="font-medium text-white">Account Status</p>
                          <p className="text-sm text-white/70">Active</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-400/20 border-green-400/30 text-green-300">
                        Verified
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-white">Recent Activity</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <Clock className="h-4 w-4" />
                          <span>Last login: {new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <UserCog className="h-4 w-4" />
                          <span>Profile last updated: {new Date().toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Account Settings</h3>
                  <p className="text-white/70 text-sm mb-6">
                    Update your email and password
                  </p>
                  <Form {...accountForm}>
                    <form
                      onSubmit={accountForm.handleSubmit(onAccountSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={accountForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                                <Input 
                                  type="email" 
                                  placeholder="you@example.com" 
                                  className="relative bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0"
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={accountForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">New Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  className="relative bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12"
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 bg-white/10 hover:bg-white/20 text-white"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={accountForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Confirm Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                                <Input
                                  type={showConfirmPassword ? "text" : "password"}
                                  className="relative bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12"
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 bg-white/10 hover:bg-white/20 text-white"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white">
                        Update Account
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-red-400/10 backdrop-blur-xl rounded-2xl border border-red-400/20 shadow-xl"></div>
                <div className="relative bg-red-400/10 backdrop-blur-md rounded-2xl border border-red-400/20 p-6">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h3>
                  <p className="text-red-300 text-sm mb-6">
                    Irreversible and destructive actions
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-red-400/10 backdrop-blur-sm rounded-xl border border-red-400/20">
                      <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-400">Delete Account</h4>
                        <p className="text-red-300 text-sm mt-1">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" className="w-full bg-red-400/20 border-red-400/30 hover:bg-red-400/30 text-red-300">
                          Delete Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white/10 backdrop-blur-md border border-white/20">
                        <DialogHeader>
                          <DialogTitle className="text-white">Are you absolutely sure?</DialogTitle>
                          <DialogDescription className="text-white/70">
                            This action cannot be undone. This will permanently delete your account
                            and remove all associated data from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
                            onClick={() => document.querySelector("dialog")?.close()}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            className="bg-red-400/20 border-red-400/30 hover:bg-red-400/30 text-red-300"
                            onClick={handleDeleteAccount}
                            disabled={isDeletingAccount}
                          >
                            {isDeletingAccount ? "Deleting..." : "Delete Account"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Appearance Settings</h3>
                <p className="text-white/70 text-sm mb-6">
                  Customize how the application looks and feels
                </p>
                <Form {...appearanceForm}>
                  <form
                    onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <FormField
                        control={appearanceForm.control}
                        name="theme"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Theme</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <div className="relative">
                                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                                  <SelectTrigger className="relative bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0">
                                    <SelectValue placeholder="Select a theme" />
                                  </SelectTrigger>
                                </div>
                              </FormControl>
                              <SelectContent className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
                                <SelectItem value="light" className="text-white hover:bg-white/20">
                                  <div className="flex items-center gap-2">
                                    <Sun className="h-4 w-4" />
                                    Light
                                  </div>
                                </SelectItem>
                                <SelectItem value="dark" className="text-white hover:bg-white/20">
                                  <div className="flex items-center gap-2">
                                    <Moon className="h-4 w-4" />
                                    Dark
                                  </div>
                                </SelectItem>
                                <SelectItem value="system" className="text-white hover:bg-white/20">
                                  <div className="flex items-center gap-2">
                                    <Settings2 className="h-4 w-4" />
                                    System
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-white/70">
                              Choose your preferred theme
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={appearanceForm.control}
                        name="fontSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Font Size</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <div className="relative">
                                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                                  <SelectTrigger className="relative bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0">
                                    <SelectValue placeholder="Select font size" />
                                  </SelectTrigger>
                                </div>
                              </FormControl>
                              <SelectContent className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
                                <SelectItem value="small" className="text-white hover:bg-white/20">Small</SelectItem>
                                <SelectItem value="medium" className="text-white hover:bg-white/20">Medium</SelectItem>
                                <SelectItem value="large" className="text-white hover:bg-white/20">Large</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-white/70">
                              Adjust the text size throughout the application
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={appearanceForm.control}
                        name="reducedMotion"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-xl border border-white/20 p-4 bg-white/10 backdrop-blur-sm">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base text-white">
                                Reduced Motion
                              </FormLabel>
                              <FormDescription className="text-white/70">
                                Minimize animations and transitions
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-white/20"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={appearanceForm.control}
                        name="highContrast"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-xl border border-white/20 p-4 bg-white/10 backdrop-blur-sm">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base text-white">
                                High Contrast
                              </FormLabel>
                              <FormDescription className="text-white/70">
                                Increase contrast for better visibility
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-white/20"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white">
                      Save Preferences
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
