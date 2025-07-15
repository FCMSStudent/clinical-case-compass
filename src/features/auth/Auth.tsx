import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/shared/components/card";
import { useToast } from "@/shared/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/alert";
import { CheckCircle2 } from "lucide-react";
import { useTheme } from "@/design-system/design-system";
import {
  pageTransitionVariants as globalPageTransitionVariants,
  reducedMotionPageTransitionVariants as globalReducedMotionPageVariants,
  getMotionVariants
} from "@/design-system/animations/motion";
import { cn } from "@/shared/utils/utils";

import type { LoginFormData, SignupFormData, ForgotPasswordFormData } from "@/features/auth/authSchemas";
import LoginForm from "@/features/auth/components/LoginForm";
import SignupForm from "@/features/auth/components/SignupForm";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [verificationSent, setVerificationSent] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { currentTheme: _currentTheme } = useTheme();
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
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
    setError(null);
    try {
      await signIn(data.email, data.password);
      navigate("/");
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
        variant: "default",
      });
    } catch (error: unknown) {
      console.error("Login error:", error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred during login";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await signUp(data.email, data.password, data.fullName);
      setVerificationSent(true);
    } catch (error: unknown) {
      console.error("Signup error:", error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred during signup";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onForgotPasswordSubmit = async (_data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implement actual password reset functionality
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Reset link sent",
        description: "Check your email for password reset instructions.",
        variant: "default",
      });
    } catch (error: unknown) {
      console.error("Forgot password error:", error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred while sending reset link";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setActiveTab("forgot-password");
    setError(null);
  };

  const handleBackToLogin = () => {
    setActiveTab("login");
    setError(null);
  };

  // Get page transition variants, respecting reduced motion settings.
  const pageVariants = getMotionVariants(globalPageTransitionVariants, globalReducedMotionPageVariants);

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden auth-gradient-bg"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div id="main-content" className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          className="w-full max-w-sm mx-auto p-4"
        >
          {/* Refined glassmorphic container */}
          <div className="auth-glass-container">
            <Card 
              className="border-0 bg-transparent shadow-none relative z-10"
            >
              <CardHeader className="text-left p-6 pb-4">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.2, 
                    duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.01 : 0.5, 
                    ease: "cubic-bezier(0.16, 1, 0.3, 1)" 
                  }}
                  className="text-left"
                >
                  <motion.div 
                    className="mb-2"
                    whileHover={window.matchMedia('(prefers-reduced-motion: reduce)').matches ? {} : { scale: 1.02 }}
                    transition={{ duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.2 }}
                  >
                    <h1 className="auth-title text-2xl sm:text-3xl font-bold leading-tight text-white transition-all duration-300 hover:brightness-110">
                      Medica
                    </h1>
                  </motion.div>
                  <p className="auth-subtitle text-base sm:text-lg text-gray-300 leading-snug">
                    {activeTab === "forgot-password" 
                      ? "Reset your password"
                      : "Sign in to your account or create a new one"
                    }
                  </p>
                </motion.div>
              </CardHeader>

              <CardContent className="p-6 pt-0 space-y-4 relative z-10">
                {/* Apple Liquid Glass toggle - Only show for login/signup */}
                {activeTab !== "forgot-password" && (
                  <div className="relative toggle-track p-1 h-12 overflow-hidden whitespace-nowrap rounded-2xl flex items-center">
                    <motion.div
                      className="absolute top-1 bottom-1 left-1 toggle-thumb rounded-2xl"
                      style={{
                        width: `50%`,
                      }}
                      animate={{
                        x: activeTab === "login" ? 0 : "100%",
                      }}
                      transition={window.matchMedia('(prefers-reduced-motion: reduce)').matches 
                        ? { duration: 0.01 }
                        : {
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                          }
                      }
                    />
                    <div className="relative z-10 flex flex-row h-full w-full">
                      <button 
                        onClick={() => setActiveTab("login")}
                        className={cn(
                          "flex-1 flex items-center justify-center toggle-text transition-all duration-300 h-full text-lg font-semibold",
                          activeTab === "login" 
                            ? "text-white" 
                            : "text-white/70 hover:text-white/90"
                        )}
                        aria-label="Sign in to your account"
                        type="button"
                      >
                        Sign In
                      </button>
                      <button 
                        onClick={() => setActiveTab("signup")}
                        className={cn(
                          "flex-1 flex items-center justify-center toggle-text transition-all duration-300 h-full text-lg font-semibold",
                          activeTab === "signup" 
                            ? "text-white" 
                            : "text-white/70 hover:text-white/90"
                        )}
                        aria-label="Create a new account"
                        type="button"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {activeTab === "login" && (
                    <LoginForm 
                      isLoading={isLoading} 
                      onLoginSubmit={onLoginSubmit}
                      onForgotPassword={handleForgotPassword}
                    />
                  )}

                  {activeTab === "signup" && (
                    <SignupForm 
                      isLoading={isLoading} 
                      onSignupSubmit={onSignupSubmit}
                    />
                  )}

                  {activeTab === "forgot-password" && (
                    <ForgotPasswordForm
                      isLoading={isLoading}
                      onForgotPasswordSubmit={onForgotPasswordSubmit}
                      onBackToLogin={handleBackToLogin}
                    />
                  )}
                </AnimatePresence>

                {/* Error Alert */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Alert variant="destructive" className="border-red-500/20 bg-red-500/10">
                      <AlertTitle className="text-red-300">Authentication Error</AlertTitle>
                      <AlertDescription className="text-red-200">
                        {error}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}

                {/* Success Alert for Email Verification */}
                {verificationSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Alert className="border-green-500/20 bg-green-500/10">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      <AlertTitle className="text-green-300">Verification Email Sent</AlertTitle>
                      <AlertDescription className="text-green-200">
                        Please check your email and click the verification link to complete your registration.
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Auth;
