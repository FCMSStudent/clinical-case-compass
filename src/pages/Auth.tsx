import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/app/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  UserPlus,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import UnifiedBackground from "@/components/backgrounds/UnifiedBackground";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [verificationSent, setVerificationSent] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Check for redirect from email verification
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("verified") === "true") {
      toast({
        title: "Email verified",
        description: "Your email has been verified. You can now log in.",
        variant: "default",
      });
    }
  }, [location.search, toast]);

  // Focus management for keyboard navigation
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Clear focus or handle escape key
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const onLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      navigate("/");
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
        variant: "default",
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      await signUp(data.email, data.password, data.fullName);
      setVerificationSent(true);
      toast({
        title: "Account created",
        description: "Please check your email to verify your account.",
        variant: "default",
      });
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: "An error occurred while creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900">
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-white/30"
      >
        Skip to main content
      </a>

      {/* Enhanced background with parallax and animations */}
      <UnifiedBackground />

      {/* Main Content */}
      <div id="main-content" className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg"
        >
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300 hover:bg-white/15 hover:border-white/30">
            <CardHeader className="text-center pb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center mb-6"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <h1 className="text-3xl font-bold text-white tracking-wide">Medica</h1>
                </div>
                <p className="text-white/70 text-base font-light">
                  Sign in to your account or create a new one
                </p>
              </motion.div>
            </CardHeader>

            <CardContent className="px-8 pb-8 space-y-8">
              {/* Enhanced Tabs with smooth transitions */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-1 mb-8 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-1 bg-white/20 rounded-xl shadow-sm"
                    initial={false}
                    animate={{
                      x: activeTab === "login" ? "2px" : "calc(50% - 2px)",
                      width: "calc(50% - 2px)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  <TabsTrigger 
                    value="login" 
                    className="relative z-10 rounded-xl text-sm font-medium transition-all text-white/90 data-[state=active]:text-white"
                    aria-label="Sign in to your account"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="relative z-10 rounded-xl text-sm font-medium transition-all text-white/90 data-[state=active]:text-white"
                    aria-label="Create a new account"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  {/* Login Tab */}
                  <TabsContent value="login" className="space-y-6">
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                          <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel 
                                  id="login-email-label"
                                  className="text-white/90 text-sm font-medium"
                                >
                                  Email
                                </FormLabel>
                                <FormControl>
                                  <motion.div 
                                    className="relative group"
                                    whileFocus={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12">
                                      <Mail className="h-5 w-5 text-white/70 group-focus-within:text-white/90 transition-colors" aria-hidden="true" />
                                    </span>
                                    <Input
                                      {...field}
                                      type="email"
                                      id="login-email"
                                      aria-labelledby="login-email-label"
                                      aria-describedby={fieldState.error ? "login-email-error" : undefined}
                                      aria-invalid={fieldState.error ? "true" : "false"}
                                      aria-required="true"
                                      placeholder="Enter your email"
                                      className="bg-white/5 border border-white/20 text-white placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:border-blue-400/50 focus-visible:bg-white/10 pl-12 h-12 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                                    />
                                  </motion.div>
                                </FormControl>
                                <FormMessage id="login-email-error" className="text-red-300" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel 
                                  id="login-password-label"
                                  className="text-white/90 text-sm font-medium"
                                >
                                  Password
                                </FormLabel>
                                <FormControl>
                                  <motion.div 
                                    className="relative group"
                                    whileFocus={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12">
                                      <Lock className="h-5 w-5 text-white/70 group-focus-within:text-white/90 transition-colors" aria-hidden="true" />
                                    </span>
                                    <Input
                                      {...field}
                                      type={showPassword ? "text" : "password"}
                                      id="login-password"
                                      aria-labelledby="login-password-label"
                                      aria-describedby={fieldState.error ? "login-password-error" : undefined}
                                      aria-invalid={fieldState.error ? "true" : "false"}
                                      aria-required="true"
                                      placeholder="Enter your password"
                                      className="bg-white/5 border border-white/20 text-white placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:border-blue-400/50 focus-visible:bg-white/10 pl-12 pr-12 h-12 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                                    />
                                    <motion.button
                                      type="button"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      aria-label={showPassword ? "Hide password" : "Show password"}
                                      aria-pressed={showPassword}
                                      onClick={() => setShowPassword(!showPassword)}
                                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                                    >
                                      {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                                    </motion.button>
                                  </motion.div>
                                </FormControl>
                                <FormMessage id="login-password-error" className="text-red-300" />
                              </FormItem>
                            )}
                          />

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              type="submit"
                              disabled={isLoading}
                              className="w-full bg-white/15 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25 transition-all duration-300 rounded-xl h-12 font-medium"
                            >
                              {isLoading ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
                                  Signing in...
                                </>
                              ) : (
                                "Sign In"
                              )}
                            </Button>
                          </motion.div>
                        </form>
                      </Form>
                    </motion.div>
                  </TabsContent>

                  {/* Signup Tab */}
                  <TabsContent value="signup" className="space-y-6">
                    <motion.div
                      key="signup"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Form {...signupForm}>
                        <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-6">
                          <FormField
                            control={signupForm.control}
                            name="fullName"
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel 
                                  id="signup-fullname-label"
                                  className="text-white/90 text-sm font-medium"
                                >
                                  Full Name
                                </FormLabel>
                                <FormControl>
                                  <motion.div 
                                    className="relative group"
                                    whileFocus={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12">
                                      <User className="h-5 w-5 text-white/70 group-focus-within:text-white/90 transition-colors" aria-hidden="true" />
                                    </span>
                                    <Input
                                      {...field}
                                      type="text"
                                      id="signup-fullname"
                                      aria-labelledby="signup-fullname-label"
                                      aria-describedby={fieldState.error ? "signup-fullname-error" : undefined}
                                      aria-invalid={fieldState.error ? "true" : "false"}
                                      aria-required="true"
                                      placeholder="Enter your full name"
                                      className="bg-white/5 border border-white/20 text-white placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:border-blue-400/50 focus-visible:bg-white/10 pl-12 h-12 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                                    />
                                  </motion.div>
                                </FormControl>
                                <FormMessage id="signup-fullname-error" className="text-red-300" />
                              </FormItem>
                            )}
                          />

                          {/* Email field for signup - similar pattern */}
                          <FormField
                            control={signupForm.control}
                            name="email"
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel 
                                  id="signup-email-label"
                                  className="text-white/90 text-sm font-medium"
                                >
                                  Email
                                </FormLabel>
                                <FormControl>
                                  <motion.div 
                                    className="relative group"
                                    whileFocus={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12">
                                      <Mail className="h-5 w-5 text-white/70 group-focus-within:text-white/90 transition-colors" aria-hidden="true" />
                                    </span>
                                    <Input
                                      {...field}
                                      type="email"
                                      id="signup-email"
                                      aria-labelledby="signup-email-label"
                                      aria-describedby={fieldState.error ? "signup-email-error" : undefined}
                                      aria-invalid={fieldState.error ? "true" : "false"}
                                      aria-required="true"
                                      placeholder="Enter your email"
                                      className="bg-white/5 border border-white/20 text-white placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:border-blue-400/50 focus-visible:bg-white/10 pl-12 h-12 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                                    />
                                  </motion.div>
                                </FormControl>
                                <FormMessage id="signup-email-error" className="text-red-300" />
                              </FormItem>
                            )}
                          />

                          {/* Password and confirm password fields - similar patterns with respective show/hide functionality */}
                          <FormField
                            control={signupForm.control}
                            name="password"
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel 
                                  id="signup-password-label"
                                  className="text-white/90 text-sm font-medium"
                                >
                                  Password
                                </FormLabel>
                                <FormControl>
                                  <motion.div 
                                    className="relative group"
                                    whileFocus={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12">
                                      <Lock className="h-5 w-5 text-white/70 group-focus-within:text-white/90 transition-colors" aria-hidden="true" />
                                    </span>
                                    <Input
                                      {...field}
                                      type={showPassword ? "text" : "password"}
                                      id="signup-password"
                                      aria-labelledby="signup-password-label"
                                      aria-describedby={fieldState.error ? "signup-password-error" : undefined}
                                      aria-invalid={fieldState.error ? "true" : "false"}
                                      aria-required="true"
                                      placeholder="Create a password"
                                      className="bg-white/5 border border-white/20 text-white placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:border-blue-400/50 focus-visible:bg-white/10 pl-12 pr-12 h-12 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                                    />
                                    <motion.button
                                      type="button"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      aria-label={showPassword ? "Hide password" : "Show password"}
                                      aria-pressed={showPassword}
                                      onClick={() => setShowPassword(!showPassword)}
                                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                                    >
                                      {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                                    </motion.button>
                                  </motion.div>
                                </FormControl>
                                <FormMessage id="signup-password-error" className="text-red-300" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={signupForm.control}
                            name="confirmPassword"
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel 
                                  id="signup-confirm-password-label"
                                  className="text-white/90 text-sm font-medium"
                                >
                                  Confirm Password
                                </FormLabel>
                                <FormControl>
                                  <motion.div 
                                    className="relative group"
                                    whileFocus={{ scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12">
                                      <Lock className="h-5 w-5 text-white/70 group-focus-within:text-white/90 transition-colors" aria-hidden="true" />
                                    </span>
                                    <Input
                                      {...field}
                                      type={showConfirmPassword ? "text" : "password"}
                                      id="signup-confirm-password"
                                      aria-labelledby="signup-confirm-password-label"
                                      aria-describedby={fieldState.error ? "signup-confirm-password-error" : undefined}
                                      aria-invalid={fieldState.error ? "true" : "false"}
                                      aria-required="true"
                                      placeholder="Confirm your password"
                                      className="bg-white/5 border border-white/20 text-white placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:border-blue-400/50 focus-visible:bg-white/10 pl-12 pr-12 h-12 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                                    />
                                    <motion.button
                                      type="button"
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                      aria-pressed={showConfirmPassword}
                                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                                    >
                                      {showConfirmPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                                    </motion.button>
                                  </motion.div>
                                </FormControl>
                                <FormMessage id="signup-confirm-password-error" className="text-red-300" />
                              </FormItem>
                            )}
                          />

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              type="submit"
                              disabled={isLoading}
                              className="w-full bg-white/15 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25 transition-all duration-300 rounded-xl h-12 font-medium"
                            >
                              {isLoading ? (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
                                  Creating account...
                                </>
                              ) : (
                                <>
                                  <UserPlus className="h-4 w-4 mr-2" aria-hidden="true" />
                                  Create Account
                                </>
                              )}
                            </Button>
                          </motion.div>
                        </form>
                      </Form>
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>

              {/* Enhanced Verification Success Message */}
              <AnimatePresence>
                {verificationSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="mt-6"
                    role="alert"
                    aria-live="polite"
                  >
                    <Alert className="bg-green-500/10 backdrop-blur-sm border border-green-400/20 rounded-xl">
                      <CheckCircle2 className="h-4 w-4 text-green-400" aria-hidden="true" />
                      <AlertTitle className="text-green-400 font-medium">Verification Email Sent</AlertTitle>
                      <AlertDescription className="text-green-300 font-light">
                        Please check your email to verify your account before signing in.
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
