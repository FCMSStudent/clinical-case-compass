
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
                  className="text-white/90 text-sm font-medium"
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
                      <Mail className="h-5 w-5 text-white/70 group-focus-within:text-white/90 transition-colors" aria-hidden="true" />
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
                      className="bg-white/5 border border-white/20 text-white placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:border-blue-400/50 focus-visible:bg-white/10 pl-12 h-12 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                    />
                  </motion.div>
                </FormControl>
                <FormMessage id="login-email-error" className="text-red-300" />
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
                  className="text-white/90 text-sm font-medium"
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
                      <Lock className="h-5 w-5 text-white/70 group-focus-within:text-white/90 transition-colors" aria-hidden="true" />
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
                      className="bg-white/5 border border-white/20 text-white placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:border-blue-400/50 focus-visible:bg-white/10 pl-12 pr-12 h-12 rounded-xl transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-8 w-8 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                    </motion.button>
                  </motion.div>
                </FormControl>
                <FormMessage id="login-password-error" className="text-red-300" />
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
              className="w-full bg-white/15 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25 transition-all duration-300 rounded-xl h-12 font-medium"
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
