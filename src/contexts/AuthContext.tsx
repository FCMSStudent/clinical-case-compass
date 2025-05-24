
import React, { createContext, useState, useEffect, useContext } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner"; // Changed import from useToast to sonner

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
  // const { toast } = useToast(); // Removed useToast hook

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN') {
          toast.success("Signed in successfully", {
            description: "Welcome to Medical Case Manager",
          });
        }
        
        if (event === 'SIGNED_OUT') {
          toast("Signed out", { // Using default toast type for info
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

    return () => {
      subscription.unsubscribe();
    };
  }, []); // Removed toast from dependency array as sonner's toast is stable

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // Sonner doesn't typically show a success toast on sign-in by default in examples
      // but if desired, it can be added here:
      // toast.success("Signed in successfully"); 
    } catch (error: any) {
      toast.error("Sign in failed", {
        description: error.message || "An error occurred during sign in",
      });
      throw error;
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
      
      toast("Account created", { // Using default toast type for info
        description: "Please check your email to verify your account",
      });
    } catch (error: any) {
      toast.error("Sign up failed", {
        description: error.message || "An error occurred during sign up",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      // Sonner doesn't typically show a success toast on sign-out by default
      // but if desired, it can be added here:
      // toast("Signed out");
    } catch (error: any) {
      toast.error("Sign out failed", {
        description: error.message || "An error occurred during sign out",
      });
    }
  };

  const updateProfile = async (data: { full_name?: string; specialty?: string; avatar_url?: string }) => {
    try {
      if (!user) throw new Error("No user logged in");
      
      const { error } = await supabase.from("profiles").update(data).eq("id", user.id);
      
      if (error) throw error;
      
      toast.success("Profile updated", {
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      toast.error("Profile update failed", {
        description: error.message || "An error occurred while updating your profile",
      });
      throw error;
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
