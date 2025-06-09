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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Main glassmorphic card */}
          <div className="relative">
            {/* Backdrop blur layer */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"></div>
            
            {/* Main content */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                  className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                >
                  <Sparkles className="h-10 w-10 text-white" />
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-4xl font-bold text-white mb-2 tracking-tight"
                >
                  Medica
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-white/70 text-sm"
                >
                  Sign in or create an account to manage your medical cases
                </motion.p>
              </div>

              {/* Tabs */}
              <div className="mb-8">
                <div className="relative">
                  {/* Tab background */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"></div>
                  
                  <div className="relative flex p-1">
                    <button
                      onClick={() => setActiveTab("login")}
                      className={cn(
                        "flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 relative",
                        activeTab === "login"
                          ? "text-white bg-white/20 backdrop-blur-sm shadow-lg"
                          : "text-white/70 hover:text-white/90"
                      )}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Lock className="h-4 w-4" />
                        Login
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("signup")}
                      className={cn(
                        "flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 relative",
                        activeTab === "signup"
                          ? "text-white bg-white/20 backdrop-blur-sm shadow-lg"
                          : "text-white/70 hover:text-white/90"
                      )}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        Sign Up
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Form content */}
              <AnimatePresence mode="wait">
                {activeTab === "login" ? (
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
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/90 text-sm font-medium">Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                                  <div className="relative flex items-center">
                                    <Mail className="absolute left-4 h-4 w-4 text-white/60" />
                                    <Input
                                      placeholder="m.smith@example.com"
                                      className="pl-12 pr-4 py-3 bg-transparent border-0 text-white placeholder:text-white/50 focus:ring-0 focus:outline-none"
                                      {...field}
                                      disabled={isLoading}
                                    />
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage className="text-red-300" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/90 text-sm font-medium">Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                                  <div className="relative flex items-center">
                                    <Lock className="absolute left-4 h-4 w-4 text-white/60" />
                                    <Input
                                      type={showPassword ? "text" : "password"}
                                      className="pl-12 pr-12 py-3 bg-transparent border-0 text-white placeholder:text-white/50 focus:ring-0 focus:outline-none"
                                      {...field}
                                      disabled={isLoading}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => setShowPassword(!showPassword)}
                                      className="absolute right-4 text-white/60 hover:text-white/80 transition-colors"
                                    >
                                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage className="text-red-300" />
                            </FormItem>
                          )}
                        />
                        
                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Signing in...
                            </div>
                          ) : (
                            "Sign In"
                          )}
                        </motion.button>
                      </form>
                    </Form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {verificationSent ? (
                      <div className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-400" />
                          <div>
                            <h3 className="text-green-400 font-medium">Verification Email Sent</h3>
                            <p className="text-green-300 text-sm">Please check your email to verify your account.</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Form {...signupForm}>
                        <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-6">
                          <FormField
                            control={signupForm.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white/90 text-sm font-medium">Full Name</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                                    <div className="relative flex items-center">
                                      <User className="absolute left-4 h-4 w-4 text-white/60" />
                                      <Input
                                        placeholder="Dr. Michael Smith"
                                        className="pl-12 pr-4 py-3 bg-transparent border-0 text-white placeholder:text-white/50 focus:ring-0 focus:outline-none"
                                        {...field}
                                        disabled={isLoading}
                                      />
                                    </div>
                                  </div>
                                </FormControl>
                                <FormMessage className="text-red-300" />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={signupForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white/90 text-sm font-medium">Email</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                                    <div className="relative flex items-center">
                                      <Mail className="absolute left-4 h-4 w-4 text-white/60" />
                                      <Input
                                        placeholder="m.smith@example.com"
                                        className="pl-12 pr-4 py-3 bg-transparent border-0 text-white placeholder:text-white/50 focus:ring-0 focus:outline-none"
                                        {...field}
                                        disabled={isLoading}
                                      />
                                    </div>
                                  </div>
                                </FormControl>
                                <FormMessage className="text-red-300" />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={signupForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white/90 text-sm font-medium">Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                                    <div className="relative flex items-center">
                                      <Lock className="absolute left-4 h-4 w-4 text-white/60" />
                                      <Input
                                        type={showPassword ? "text" : "password"}
                                        className="pl-12 pr-12 py-3 bg-transparent border-0 text-white placeholder:text-white/50 focus:ring-0 focus:outline-none"
                                        {...field}
                                        disabled={isLoading}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 text-white/60 hover:text-white/80 transition-colors"
                                      >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                      </button>
                                    </div>
                                  </div>
                                </FormControl>
                                <FormDescription className="text-white/60 text-xs">
                                  Must be at least 8 characters
                                </FormDescription>
                                <FormMessage className="text-red-300" />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={signupForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white/90 text-sm font-medium">Confirm Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"></div>
                                    <div className="relative flex items-center">
                                      <Lock className="absolute left-4 h-4 w-4 text-white/60" />
                                      <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="pl-12 pr-12 py-3 bg-transparent border-0 text-white placeholder:text-white/50 focus:ring-0 focus:outline-none"
                                        {...field}
                                        disabled={isLoading}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 text-white/60 hover:text-white/80 transition-colors"
                                      >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                      </button>
                                    </div>
                                  </div>
                                </FormControl>
                                <FormMessage className="text-red-300" />
                              </FormItem>
                            )}
                          />
                          
                          <motion.button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {isLoading ? (
                              <div className="flex items-center justify-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Creating Account...
                              </div>
                            ) : (
                              "Create Account"
                            )}
                          </motion.button>
                        </form>
                      </Form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"></div>
              <div className="relative p-4">
                <p className="text-white/60 text-xs">
                  By continuing, you agree to our{" "}
                  <a href="#" className="text-white/80 hover:text-white underline underline-offset-2">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-white/80 hover:text-white underline underline-offset-2">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
