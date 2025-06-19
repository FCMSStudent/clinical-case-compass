import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/app/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  getGlassHoverVariants,
  getGlassTransitionVariants,
  liquidGlassClasses,
} from "@/lib/glass-effects";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, user } = useAuth();

  useEffect(() => {
    if (user) {
      // Redirect to the intended page after authentication
      const redirectPath = location.state?.from || "/dashboard";
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (authError: unknown) {
      const errorMessage = authError instanceof Error ? authError.message : "Authentication failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Background Bubbles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary-500 opacity-10 filter blur-xl"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              width: `${Math.random() * 50 + 50}px`,
              height: `${Math.random() * 50 + 50}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Authentication Card */}
      <motion.div
        className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl rounded-2xl"
        variants={getGlassTransitionVariants('medium')}
        initial="initial"
        animate="animate"
      >
        <div className="z-10 p-8 md:p-12">
          {/* Title */}
          <motion.h2
            className={cn(
              typography.title,
              "mb-4 text-center text-white tracking-tight"
            )}
            variants={getGlassHoverVariants("medium")}
            initial="initial"
            animate="animate"
          >
            {isSignUp ? "Create Account" : "Welcome Back"}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className={cn(
              typography.body,
              "mb-6 text-center text-white/70 tracking-wide"
            )}
            variants={getGlassHoverVariants("medium")}
            initial="initial"
            animate="animate"
          >
            {isSignUp
              ? "Join our community and start your journey."
              : "Sign in to access your dashboard."}
          </motion.p>

          {/* Error Message */}
          {error && (
            <motion.div
              className="mb-4 rounded-md bg-red-500/10 p-4 text-sm text-red-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <Label htmlFor="fullName" className="text-white/80">
                  Full Name
                </Label>
                <Input
                  type="text"
                  id="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-white/80">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white/80">
                Password
              </Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                required
              />
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                    className="border-white/20 focus-visible:ring-0"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none text-white/60"
                  >
                    Remember me
                  </Label>
                </div>
                <NavLink
                  to="/forgot-password"
                  className="text-sm text-white/60 hover:text-white/80 transition-colors"
                >
                  Forgot password?
                </NavLink>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Loading..." : (isSignUp ? "Create Account" : "Sign In")}
            </Button>
          </form>

          {/* Toggle Authentication Mode */}
          <div className="mt-6 text-center">
            <p className="text-sm text-white/60">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <Button
                variant="link"
                className="text-sm text-primary-500 hover:text-primary-400 px-1"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Sign In" : "Create Account"}
              </Button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
