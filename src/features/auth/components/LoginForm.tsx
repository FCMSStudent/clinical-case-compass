import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { Checkbox } from "@/shared/components/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { loginSchema, type LoginFormData } from "@/features/auth/authSchemas";

interface LoginFormProps {
  onLoginSubmit: (data: LoginFormData) => Promise<void>;
  onForgotPassword: () => void;
  isLoading: boolean;
}

const LoginForm = ({ onLoginSubmit, onForgotPassword, isLoading }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ 
        duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.01 : 0.3 
      }}
      className="w-full space-y-4"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onLoginSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem className="form-row-spacing form-field-container">
                <FormLabel 
                  id="login-email-label"
                  className="form-label text-white/90"
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
                    size="md"
                    leftIcon={<Mail className="h-4 w-4" />}
                    error={!!fieldState.error}
                    className="h-12 form-input glass-input"
                  />
                </FormControl>
                <FormMessage id="login-email-error" className="form-error-message text-red-300" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem className="form-row-spacing form-field-container">
                <FormLabel 
                  id="login-password-label"
                  className="form-label text-white/90"
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
                    size="md"
                    leftIcon={<Lock className="h-4 w-4" />}
                    rightIcon={
                      <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        onClick={() => setShowPassword(!showPassword)}
                        className="hover:opacity-100 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    }
                    error={!!fieldState.error}
                    className="h-12 form-input glass-input"
                  />
                </FormControl>
                <FormMessage id="login-password-error" className="form-error-message text-red-300" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="remember-me"
                      aria-label="Remember me"
                      variant="elevated"
                      size="md"
                      className="mr-2"
                    />
                  </FormControl>
                  <FormLabel 
                    htmlFor="remember-me"
                    className="text-base text-white/80 font-medium cursor-pointer select-none"
                  >
                    Remember me
                  </FormLabel>
                </FormItem>
              )}
            />
            
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-white/70 hover:text-white transition-colors underline underline-offset-2"
            >
              Forgot password?
            </button>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full py-3 button-text glass-button"
              size="md"
              disabled={isLoading}
              variant="primary"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="button-text">Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default LoginForm;
