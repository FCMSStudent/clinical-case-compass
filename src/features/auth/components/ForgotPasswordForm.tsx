import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";

import { Button } from "@/shared/components/button";
import { Input } from "@/shared/components/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/form";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/features/auth/authSchemas";

interface ForgotPasswordFormProps {
  onForgotPasswordSubmit: (data: ForgotPasswordFormData) => Promise<void>;
  onBackToLogin: () => void;
  isLoading: boolean;
}

const ForgotPasswordForm = ({ onForgotPasswordSubmit, onBackToLogin, isLoading }: ForgotPasswordFormProps) => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await onForgotPasswordSubmit(data);
      setIsEmailSent(true);
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  if (isEmailSent) {
    return (
      <motion.div
        key="email-sent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full space-y-4"
      >
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-green-400" />
          </div>
          <div className="space-y-2 text-left">
            <h3 className="text-xl font-semibold text-white">Check your email</h3>
            <p className="text-white/70 text-sm">
              We've sent a password reset link to <strong>{form.getValues("email")}</strong>
            </p>
          </div>
          <div className="pt-4">
            <Button
              onClick={onBackToLogin}
              variant="secondary"
              className="button-text glass-button text-left"
              size="md"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="forgot-password"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ 
        duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.01 : 0.3 
      }}
      className="w-full space-y-4"
    >
      <div className="space-y-2 text-left">
        <h3 className="text-xl sm:text-2xl font-semibold leading-tight text-white">Forgot your password?</h3>
        <p className="text-sm sm:text-base text-gray-400 leading-snug">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem className="form-row-spacing form-field-container">
                <FormLabel 
                  id="forgot-email-label"
                  className="form-label text-sm font-medium text-white/90"
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    id="forgot-email"
                    aria-labelledby="forgot-email-label"
                    aria-describedby={fieldState.error ? "forgot-email-error" : undefined}
                    aria-invalid={fieldState.error ? "true" : "false"}
                    aria-required="true"
                    placeholder="Enter your email"
                    variant="elevated"
                    size="md"
                    leftIcon={<Mail className="h-4 w-4" />}
                    error={!!fieldState.error}
                    className="h-12 form-input glass-input text-sm text-gray-500 placeholder:text-gray-500"
                  />
                </FormControl>
                <FormMessage id="forgot-email-error" className="form-error-message text-red-300" />
              </FormItem>
            )}
          />

          <div className="pt-4 flex flex-row gap-3">
            <Button
              type="submit"
              className="button-text glass-button text-base font-semibold"
              size="md"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span className="button-text">Sending...</span>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </Button>
            <Button
              type="button"
              onClick={onBackToLogin}
              variant="secondary"
              size="md"
              className="button-text glass-button text-base font-semibold"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default ForgotPasswordForm; 