import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { loginSchema, type LoginFormData } from "@/features/auth/authSchemas";
import { useTheme } from "@/lib/styles/theme";

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onLoginSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel 
                  id="login-email-label"
                  className="text-sm font-medium"
                  style={{ color: `${currentTheme.colors.text}E6` }}
                >
                  Email
                </FormLabel>
                <FormControl>
                  <motion.div 
                    className="relative group"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12">
                      <Mail 
                        className="h-5 w-5 group-focus-within:opacity-90 transition-colors" 
                        style={{ color: `${currentTheme.colors.text}B3` }}
                        aria-hidden="true" 
                      />
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
                      className="border pl-12 h-12 rounded-xl transition-all duration-300 hover:border-opacity-30 focus-visible:ring-2 focus-visible:ring-opacity-50"
                      style={{
                        ...inputStyles,
                        '--tw-ring-color': `${currentTheme.colors.primary}80`,
                        '::placeholder': { color: `${currentTheme.colors.text}80` }
                      } as any}
                    />
                  </motion.div>
                </FormControl>
                <FormMessage id="login-email-error" style={{ color: currentTheme.colors.status.error }} />
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
                  className="text-sm font-medium"
                  style={{ color: `${currentTheme.colors.text}E6` }}
                >
                  Password
                </FormLabel>
                <FormControl>
                  <motion.div 
                    className="relative group"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12">
                      <Lock 
                        className="h-5 w-5 group-focus-within:opacity-90 transition-colors" 
                        style={{ color: `${currentTheme.colors.text}B3` }}
                        aria-hidden="true" 
                      />
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
                      className="border pl-12 pr-12 h-12 rounded-xl transition-all duration-300 hover:border-opacity-30 focus-visible:ring-2 focus-visible:ring-opacity-50"
                      style={{
                        ...inputStyles,
                        '--tw-ring-color': `${currentTheme.colors.primary}80`
                      } as any}
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 hover:opacity-100 transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-30 rounded"
                      style={{ 
                        color: `${currentTheme.colors.text}B3`,
                        '--tw-ring-color': `${currentTheme.colors.text}4D`
                      } as any}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                    </motion.button>
                  </motion.div>
                </FormControl>
                <FormMessage id="login-password-error" style={{ color: currentTheme.colors.status.error }} />
              </FormItem>
            )}
          />

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full border transition-all duration-300 rounded-xl h-12 font-medium hover:border-opacity-30"
              style={buttonStyles}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};

export default LoginForm;
