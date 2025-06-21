
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { loginSchema, type LoginFormData } from "@/features/auth/authSchemas";

interface LoginFormProps {
  onLoginSubmit: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
}

const LoginForm = ({ onLoginSubmit, isLoading }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onLoginSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-2">
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
                    className="h-12 text-base md:text-lg"
                  />
                </FormControl>
                <FormMessage id="login-email-error" className="text-red-300" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-2">
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
                    className="h-12 text-base md:text-lg"
                  />
                </FormControl>
                <FormMessage id="login-password-error" className="text-red-300" />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full h-12 text-base md:text-lg font-medium"
              size="lg"
              disabled={isLoading}
              variant="primary"
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
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default LoginForm;
