import React, { createContext, useState, useEffect, useContext } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: { full_name?: string; specialty?: string; avatar_url?: string }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Signed in successfully",
            description: "Welcome to Medica",
          });
        }
        
        if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out",
          });
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    // Check for placeholder Supabase credentials
    if (
      import.meta.env.VITE_SUPABASE_URL === "YOUR_SUPABASE_URL" ||
      import.meta.env.VITE_SUPABASE_ANON_KEY === "YOUR_SUPABASE_ANON_KEY"
    ) {
      console.warn(
        "Supabase credentials are using placeholder values. Please update them in your .env file for full functionality."
      );
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Sign in failed",
        description: err.message || "An error occurred during sign in",
      });
      throw err;
    }
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });
      if (error) throw error;

      toast({
        title: "Account created",
        description: "Please check your email to verify your account",
      });
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: err.message || "An error occurred during sign up",
      });
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Sign out failed",
        description: err.message || "An error occurred during sign out",
      });
    }
  };

  const updateProfile = async (data: { full_name?: string; specialty?: string; avatar_url?: string }) => {
    try {
      if (!user) throw new Error("No user logged in");

      const { error: dbError } = await supabase.from("profiles").update(data).eq("id", user.id);
      if (dbError) throw dbError;

      const { data: authData, error: authError } = await supabase.auth.updateUser({ data });
      if (authError) throw authError;

      if (authData?.user) {
        setUser(authData.user);
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Profile update failed",
        description: err.message || "An error occurred while updating your profile",
      });
      throw err;
    }
  };

  const value = {
    session,
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};