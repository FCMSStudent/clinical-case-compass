
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { signupSchema, type SignupFormData } from "@/features/auth/authSchemas";

interface SignupFormProps {
  onSignupSubmit: (data: SignupFormData) => Promise<void>;
  isLoading: boolean;
}

const SignupForm = ({ onSignupSubmit, isLoading }: SignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <motion.div
      key="signup"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ 
        duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.01 : 0.3 
      }}
      className="w-full"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSignupSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field, fieldState }) => (
              <FormItem className="form-row-spacing form-field-container">
                <FormLabel 
                  id="signup-fullname-label"
                  className="form-label text-white/90"
                >
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    id="signup-fullname"
                    aria-labelledby="signup-fullname-label"
                    aria-describedby={fieldState.error ? "signup-fullname-error" : undefined}
                    aria-invalid={fieldState.error ? "true" : "false"}
                    aria-required="true"
                    placeholder="Enter your full name"
                    variant="elevated"
                    size="md"
                    leftIcon={<User className="h-4 w-4" />}
                    error={!!fieldState.error}
                    className="h-12 form-input glass-input"
                  />
                </FormControl>
                <FormMessage id="signup-fullname-error" className="text-red-300 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem className="form-row-spacing form-field-container">
                <FormLabel 
                  id="signup-email-label"
                  className="form-label text-white/90"
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    id="signup-email"
                    aria-labelledby="signup-email-label"
                    aria-describedby={fieldState.error ? "signup-email-error" : undefined}
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
                <FormMessage id="signup-email-error" className="text-red-300 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem className="form-row-spacing form-field-container">
                <FormLabel 
                  id="signup-password-label"
                  className="form-label text-white/90"
                >
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    id="signup-password"
                    aria-labelledby="signup-password-label"
                    aria-describedby={fieldState.error ? "signup-password-error" : undefined}
                    aria-invalid={fieldState.error ? "true" : "false"}
                    aria-required="true"
                    placeholder="Create a password"
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
                <FormMessage id="signup-password-error" className="text-red-300 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem className="form-row-spacing form-field-container">
                <FormLabel 
                  id="signup-confirm-password-label"
                  className="form-label text-white/90"
                >
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    id="signup-confirm-password"
                    aria-labelledby="signup-confirm-password-label"
                    aria-describedby={fieldState.error ? "signup-confirm-password-error" : undefined}
                    aria-invalid={fieldState.error ? "true" : "false"}
                    aria-required="true"
                    placeholder="Confirm your password"
                    variant="elevated"
                    size="md"
                    leftIcon={<Lock className="h-4 w-4" />}
                    rightIcon={
                      <button
                        type="button"
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                        aria-pressed={showConfirmPassword}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="hover:opacity-100 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    }
                    error={!!fieldState.error}
                    className="h-12 form-input glass-input"
                  />
                </FormControl>
                <FormMessage id="signup-confirm-password-error" className="text-red-300 text-sm" />
              </FormItem>
            )}
          />

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
                  <span className="button-text">Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default SignupForm;
