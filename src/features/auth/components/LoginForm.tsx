import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { loginSchema, type LoginFormData } from "@/features/auth/authSchemas";
import { useTheme } from "@/design-system/design-system";

interface LoginFormProps {
  onLoginSubmit: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
}

const LoginForm = ({ onLoginSubmit, isLoading }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { currentTheme } = useTheme();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const inputStyles = {
    backgroundColor: currentTheme.colors.glass.background.replace('0.1', '0.05'),
    borderColor: currentTheme.colors.glass.border,
    color: currentTheme.colors.text,
  };

  const buttonStyles = {
    backgroundColor: currentTheme.colors.glass.background.replace('0.1', '0.15'),
    backdropFilter: currentTheme.colors.glass.backdrop,
    borderColor: currentTheme.colors.glass.border,
    color: currentTheme.colors.text,
  };

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-md mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLoginSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel 
                    id="login-email-label"
                    className="text-sm font-medium text-white/90"
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      id="login-email"
                      aria-labelledby="login-email-label"
                      aria-describedby={fieldState.error ? "login-email-error" : undefined}
                      aria-invalid={fieldState.error ? "true" : "false"}
                      aria-required="true"
                      placeholder="Enter your email"
                      variant="elevated"
                      size="lg"
                      leftIcon={<Mail className="h-5 w-5" />}
                      error={!!fieldState.error}
                    />
                  </FormControl>
                  <FormMessage id="login-email-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel 
                    id="login-password-label"
                    className="text-sm font-medium text-white/90"
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="login-password"
                      aria-labelledby="login-password-label"
                      aria-describedby={fieldState.error ? "login-password-error" : undefined}
                      aria-invalid={fieldState.error ? "true" : "false"}
                      aria-required="true"
                      placeholder="Enter your password"
                      variant="elevated"
                      size="lg"
                      leftIcon={<Lock className="h-5 w-5" />}
                      rightIcon={
                        <button
                          type="button"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          aria-pressed={showPassword}
                          onClick={() => setShowPassword(!showPassword)}
                          className="hover:opacity-100 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      }
                      error={!!fieldState.error}
                    />
                  </FormControl>
                  <FormMessage id="login-password-error" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default LoginForm;
