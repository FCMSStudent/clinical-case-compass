import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/app/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
  FormDescription,
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
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

      {/* Glassy background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div id="main-content" className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md sm:max-w-lg lg:max-w-xl"
        >
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <h1 className="text-3xl font-bold text-white">Medica</h1>
                </div>
                <p className="text-white/80 text-lg">
                  Sign in to your account or create a new one
                </p>
              </div>
            </CardHeader>

            <CardContent className="px-6 pb-6">
              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-1 mb-6">
                  <TabsTrigger 
                    value="login" 
                    className={cn(
                      "rounded-xl text-sm font-medium transition-all",
                      activeTab === "login" 
                        ? "bg-white/20 text-white shadow-sm" 
                        : "text-white/70 hover:text-white/90"
                    )}
                    aria-label="Sign in to your account"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className={cn(
                      "rounded-xl text-sm font-medium transition-all",
                      activeTab === "signup" 
                        ? "bg-white/20 text-white shadow-sm" 
                        : "text-white/70 hover:text-white/90"
                    )}
                    aria-label="Create a new account"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login" className="space-y-6">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
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
                              <div className="relative">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10">
                                  <Mail className="h-5 w-5 text-white/70" aria-hidden="true" />
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
                                  className="bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 pl-12"
                                />
                              </div>
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
                              <div className="relative">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10">
                                  <Lock className="h-5 w-5 text-white/70" aria-hidden="true" />
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
                                  className="bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 pl-12 pr-10"
                                />
                                <button
                                  type="button"
                                  aria-label={showPassword ? "Hide password" : "Show password"}
                                  aria-pressed={showPassword}
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                                >
                                  <span className="sr-only">
                                    {showPassword ? "Hide password" : "Show password"}
                                  </span>
                                  {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage id="login-password-error" className="text-red-300" />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={isLoading}
                        aria-describedby={isLoading ? "login-loading" : undefined}
                        className="w-full bg-white/20 backdrop-blur-sm border border-white/20 text-white hover:bg-white/30 transition-all duration-300 rounded-xl h-12"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            <span id="login-loading" className="sr-only">Signing in...</span>
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                {/* Signup Tab */}
                <TabsContent value="signup" className="space-y-6">
                  <Form {...signupForm}>
                    <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
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
                              <div className="relative">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10">
                                  <User className="h-5 w-5 text-white/70" aria-hidden="true" />
                                </span>
                                <Input
                                  {...field}
                                  type="text"
                                  id="signup-fullname"
                                  aria-labelledby="signup-fullname-label"
                                  aria-describedby={fieldState.error ? "signup-fullname-error" : "signup-fullname-description"}
                                  aria-invalid={fieldState.error ? "true" : "false"}
                                  aria-required="true"
                                  placeholder="Enter your full name"
                                  className="bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 pl-12"
                                />
                              </div>
                            </FormControl>
                            <FormMessage id="signup-fullname-error" className="text-red-300" />
                          </FormItem>
                        )}
                      />

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
                              <div className="relative">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10">
                                  <Mail className="h-5 w-5 text-white/70" aria-hidden="true" />
                                </span>
                                <Input
                                  {...field}
                                  type="email"
                                  id="signup-email"
                                  aria-labelledby="signup-email-label"
                                  aria-describedby={fieldState.error ? "signup-email-error" : "signup-email-description"}
                                  aria-invalid={fieldState.error ? "true" : "false"}
                                  aria-required="true"
                                  placeholder="Enter your email"
                                  className="bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 pl-12"
                                />
                              </div>
                            </FormControl>
                            <FormMessage id="signup-email-error" className="text-red-300" />
                          </FormItem>
                        )}
                      />

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
                              <div className="relative">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10">
                                  <Lock className="h-5 w-5 text-white/70" aria-hidden="true" />
                                </span>
                                <Input
                                  {...field}
                                  type={showPassword ? "text" : "password"}
                                  id="signup-password"
                                  aria-labelledby="signup-password-label"
                                  aria-describedby={fieldState.error ? "signup-password-error" : "signup-password-description"}
                                  aria-invalid={fieldState.error ? "true" : "false"}
                                  aria-required="true"
                                  placeholder="Create a password"
                                  className="bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 pl-12 pr-10"
                                />
                                <button
                                  type="button"
                                  aria-label={showPassword ? "Hide password" : "Show password"}
                                  aria-pressed={showPassword}
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                                >
                                  <span className="sr-only">
                                    {showPassword ? "Hide password" : "Show password"}
                                  </span>
                                  {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                                </button>
                              </div>
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
                              <div className="relative">
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10">
                                  <Lock className="h-5 w-5 text-white/70" aria-hidden="true" />
                                </span>
                                <Input
                                  {...field}
                                  type={showConfirmPassword ? "text" : "password"}
                                  id="signup-confirm-password"
                                  aria-labelledby="signup-confirm-password-label"
                                  aria-describedby={fieldState.error ? "signup-confirm-password-error" : "signup-confirm-password-description"}
                                  aria-invalid={fieldState.error ? "true" : "false"}
                                  aria-required="true"
                                  placeholder="Confirm your password"
                                  className="bg-transparent border-0 text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:ring-offset-0 pl-12 pr-10"
                                />
                                <button
                                  type="button"
                                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                  aria-pressed={showConfirmPassword}
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                                >
                                  <span className="sr-only">
                                    {showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                  </span>
                                  {showConfirmPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage id="signup-confirm-password-error" className="text-red-300" />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={isLoading}
                        aria-describedby={isLoading ? "signup-loading" : undefined}
                        className="w-full bg-white/20 backdrop-blur-sm border border-white/20 text-white hover:bg-white/30 transition-all duration-300 rounded-xl h-12"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            <span id="signup-loading" className="sr-only">Creating account...</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4 mr-2" aria-hidden="true" />
                            Create Account
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>

              {/* Verification Success Message */}
              <AnimatePresence>
                {verificationSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                    role="alert"
                    aria-live="polite"
                  >
                    <Alert className="bg-green-500/10 backdrop-blur-sm border border-green-400/20">
                      <CheckCircle2 className="h-4 w-4 text-green-400" aria-hidden="true" />
                      <AlertTitle className="text-green-400">Verification Email Sent</AlertTitle>
                      <AlertDescription className="text-green-300">
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
