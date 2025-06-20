import React, { createContext, useReducer, useEffect, useContext, useMemo, useCallback } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { authReducer, initialAuthState, type AuthState, type AuthAction } from "@/lib/reducers/authReducer";
import type { UserMetadata } from "@/types/auth";

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isOfflineMode: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: UserMetadata) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const { session, user, loading, isOfflineMode } = state;
  const { toast } = useToast();

  useEffect(() => {
    // Check if Supabase is properly configured
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn("Running in offline mode - Supabase credentials not configured");
      dispatch({ type: 'SET_OFFLINE_MODE', payload: true });
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error getting session:", error);
          dispatch({ type: 'SET_OFFLINE_MODE', payload: true });
        } else {
          dispatch({ type: 'SET_SESSION', payload: session });
          dispatch({ type: 'SET_USER', payload: session?.user ?? null });
        }
      } catch (error) {
        console.error("Error getting session:", error);
        dispatch({ type: 'SET_OFFLINE_MODE', payload: true });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        dispatch({ type: 'SET_SESSION', payload: currentSession });
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Signed in successfully",
            description: "Welcome to Clinical Case Compass",
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

    getInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]); // `dispatch` is stable

  const signIn = useCallback(async (email: string, password: string) => {
    if (isOfflineMode) {
      toast({
        variant: "destructive",
        title: "Offline Mode",
        description: "Authentication is not available in offline mode. Please configure Supabase credentials.",
      });
      return;
    }

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
  }, [isOfflineMode, toast]);

  const signUp = useCallback(async (email: string, password: string, fullName?: string) => {
    if (isOfflineMode) {
      toast({
        variant: "destructive",
        title: "Offline Mode",
        description: "Authentication is not available in offline mode. Please configure Supabase credentials.",
      });
      return;
    }

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
  }, [isOfflineMode, toast]);

  const signOut = useCallback(async () => {
    if (isOfflineMode) {
      return;
    }

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
  }, [isOfflineMode, toast]);

  const updateProfile = useCallback(async (data: UserMetadata) => {
    if (isOfflineMode) {
      toast({
        variant: "destructive",
        title: "Offline Mode",
        description: "Profile updates are not available in offline mode.",
      });
      return;
    }

    try {
      if (!user) throw new Error("No user logged in");

      // Update the profiles table with the new data
      const { error: dbError } = await supabase.from("profiles").update({
        full_name: data.full_name,
        specialty: data.specialty,
        avatar_url: data.avatar_url,
        bio: data.bio,
        phone: data.phone,
        location: data.location,
      }).eq("id", user.id);
      
      if (dbError) throw dbError;

      // Update the auth user metadata
      const { data: authData, error: authError } = await supabase.auth.updateUser({ 
        data: {
          full_name: data.full_name,
          specialty: data.specialty,
          avatar_url: data.avatar_url,
          bio: data.bio,
          phone: data.phone,
          location: data.location,
        }
      });
      
      if (authError) throw authError;

      if (authData?.user) {
        dispatch({ type: 'SET_USER', payload: authData.user });
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
  }, [isOfflineMode, toast, user, dispatch]);

  const value = useMemo(() => ({
    session,
    user,
    loading,
    isOfflineMode,
    signIn,
    signUp,
    signOut,
    updateProfile,
  }), [session, user, loading, isOfflineMode, signIn, signUp, signOut, updateProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
