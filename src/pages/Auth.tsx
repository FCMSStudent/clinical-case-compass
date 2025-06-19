import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/app/AuthContext";
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
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import UnifiedBackground from "@/components/backgrounds/UnifiedBackground";
import { useTheme } from "@/lib/design-system";
import {
  pageTransitionVariants as globalPageTransitionVariants, // Renamed to avoid conflict
  reducedMotionPageTransitionVariants as globalReducedMotionPageVariants, // Renamed
  getMotionVariants
} from "@/lib/motion"; // Added motion imports

import type { LoginFormData, SignupFormData } from "@/features/auth/authSchemas";
import LoginForm from "@/features/auth/components/LoginForm";
import SignupForm from "@/features/auth/components/SignupForm";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [verificationSent, setVerificationSent] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { currentTheme } = useTheme();

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
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      await signUp(data.email, data.password, data.fullName);
      setVerificationSent(true);
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get page transition variants, respecting reduced motion settings.
  const pageVariants = getMotionVariants(globalPageTransitionVariants, globalReducedMotionPageVariants);

  return (
    // This outermost motion.div applies the global page transition animations.
    // It's keyed by the route in App.tsx's AnimatePresence setup.
    // The Auth page also has internal animations for its content card, which will play
    // as this main container animates in.
    <motion.div
      className="min-h-screen relative overflow-hidden"
      style={{ background: currentTheme.colors.background }}
      variants={pageVariants}
      initial="initial" // Start state from globalPageTransitionVariants.
      animate="animate" // End state from globalPageTransitionVariants.
      exit="exit"       // Exit state from globalPageTransitionVariants.
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-white/30"
        style={{ 
          backgroundColor: currentTheme.colors.primary,
          color: currentTheme.colors.text
        }}
      >
        Skip to main content
      </a>

      <UnifiedBackground />

      <div id="main-content" className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg"
        >
          <Card 
            className="border shadow-2xl transition-all duration-300 hover:border-opacity-30"
            style={{
              backgroundColor: currentTheme.colors.glass.background,
              backdropFilter: currentTheme.colors.glass.backdrop,
              borderColor: currentTheme.colors.glass.border,
              boxShadow: currentTheme.colors.glass.shadow,
            }}
          >
            <CardHeader className="text-center pb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center mb-6"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <h1 className="text-3xl font-bold tracking-wide" style={{ color: currentTheme.colors.text }}>
                    Medica
                  </h1>
                </div>
                <p className="text-base font-light" style={{ color: currentTheme.colors.textSecondary }}>
                  Sign in to your account or create a new one
                </p>
              </motion.div>
            </CardHeader>

            <CardContent className="px-8 pb-8 space-y-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList 
                  className="grid w-full grid-cols-2 rounded-2xl p-1 mb-8 relative overflow-hidden"
                  style={{
                    backgroundColor: currentTheme.colors.glass.background,
                    backdropFilter: currentTheme.colors.glass.backdrop,
                    borderColor: currentTheme.colors.glass.border,
                  }}
                >
                  <motion.div
                    className="absolute inset-y-1 rounded-xl shadow-sm"
                    style={{
                      backgroundColor: currentTheme.colors.glass.background.replace('0.1', '0.2'),
                    }}
                    initial={false}
                    animate={{
                      x: activeTab === "login" ? "2px" : "calc(50% - 2px)",
                      width: "calc(50% - 2px)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                  <TabsTrigger 
                    value="login" 
                    className="relative z-10 rounded-xl text-sm font-medium transition-all data-[state=active]:text-opacity-100"
                    style={{ 
                      color: `${currentTheme.colors.text}90`,
                    }}
                    aria-label="Sign in to your account"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup" 
                    className="relative z-10 rounded-xl text-sm font-medium transition-all data-[state=active]:text-opacity-100"
                    style={{ 
                      color: `${currentTheme.colors.text}90`,
                    }}
                    aria-label="Create a new account"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <TabsContent value="login" className="space-y-6">
                    <LoginForm isLoading={isLoading} onLoginSubmit={onLoginSubmit} />
                  </TabsContent>

                  <TabsContent value="signup" className="space-y-6">
                    <SignupForm isLoading={isLoading} onSignupSubmit={onSignupSubmit} />
                  </TabsContent>
                </AnimatePresence>
              </Tabs>

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
                    <Alert 
                      className="rounded-xl"
                      style={{
                        backgroundColor: `${currentTheme.colors.status.success}10`,
                        backdropFilter: currentTheme.colors.glass.backdrop,
                        borderColor: `${currentTheme.colors.status.success}20`,
                      }}
                    >
                      <CheckCircle2 className="h-4 w-4" style={{ color: currentTheme.colors.status.success }} aria-hidden="true" />
                      <AlertTitle style={{ color: currentTheme.colors.status.success }} className="font-medium">
                        Verification Email Sent
                      </AlertTitle>
                      <AlertDescription style={{ color: `${currentTheme.colors.status.success}CC` }} className="font-light">
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
    </motion.div>
  );
};

export default Auth;
