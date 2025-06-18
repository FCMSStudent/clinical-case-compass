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
    console.log("[AuthProvider] Starting auth initialization");
    
    // Check if we're in offline mode (missing Supabase credentials)
    const isCredentialsMissing = 
      import.meta.env.VITE_SUPABASE_URL === undefined || 
      import.meta.env.VITE_SUPABASE_ANON_KEY === undefined ||
      import.meta.env.VITE_SUPABASE_URL === "YOUR_SUPABASE_URL" ||
      import.meta.env.VITE_SUPABASE_ANON_KEY === "YOUR_SUPABASE_ANON_KEY";

    if (isCredentialsMissing) {
      console.log("[AuthProvider] Running in offline mode - Supabase credentials not configured");
      dispatch({ type: 'SET_OFFLINE_MODE', payload: true });
      return;
    }

    console.log("[AuthProvider] Setting up Supabase auth listener");

    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("[AuthProvider] Auth state change:", { event, hasSession: !!currentSession });
        dispatch({ type: 'SET_SESSION', payload: currentSession });
        
        if (event === 'SIGNED_IN') {
          console.log("[AuthProvider] User signed in");
          toast({
            title: "Signed in successfully",
            description: "Welcome to Clinical Case Compass",
          });
        }
        
        if (event === 'SIGNED_OUT') {
          console.log("[AuthProvider] User signed out");
          toast({
            title: "Signed out",
            description: "You have been signed out",
          });
        }
      }
    );

    // Then check for existing session
    console.log("[AuthProvider] Checking for existing session");
    supabase.auth.getSession().then(({ data: { session: currentSession }, error }) => {
      if (error) {
        console.error("[AuthProvider] Error getting session:", error);
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }

      console.log("[AuthProvider] Session check complete:", { hasSession: !!currentSession });
      const initializedUser = currentSession?.user ?? null;
      dispatch({ 
        type: 'INITIALIZE_AUTH', 
        payload: { 
          session: currentSession, 
          user: initializedUser,
          isOfflineMode: false 
        } 
      });
    }).catch((error) => {
      console.error("[AuthProvider] Error getting session:", error);
      // Always set loading to false, even on error
      dispatch({ type: 'SET_LOADING', payload: false });
    });

    return () => {
      console.log("[AuthProvider] Cleaning up auth listener");
      subscription.unsubscribe();
    };
  }, [toast]); // `dispatch` is stable

  const signIn = useCallback(async (email: string, password: string) => {
    if (isOfflineMode) {
      console.log("[AuthProvider] Sign in attempted in offline mode");
      toast({
        variant: "destructive",
        title: "Offline Mode",
        description: "Authentication is not available in offline mode. Please configure Supabase credentials.",
      });
      return;
    }

    try {
      console.log("[AuthProvider] Attempting sign in");
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      console.log("[AuthProvider] Sign in successful");
    } catch (error: unknown) {
      const err = error as Error;
      console.error("[AuthProvider] Sign in failed:", err);
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
      console.log("[AuthProvider] Sign up attempted in offline mode");
      toast({
        variant: "destructive",
        title: "Offline Mode",
        description: "Authentication is not available in offline mode. Please configure Supabase credentials.",
      });
      return;
    }

    try {
      console.log("[AuthProvider] Attempting sign up");
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });
      if (error) throw error;

      console.log("[AuthProvider] Sign up successful");
      toast({
        title: "Account created",
        description: "Please check your email to verify your account",
      });
    } catch (error: unknown) {
      const err = error as Error;
      console.error("[AuthProvider] Sign up failed:", err);
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
      console.log("[AuthProvider] Attempting sign out");
      await supabase.auth.signOut();
      console.log("[AuthProvider] Sign out successful");
    } catch (error: unknown) {
      const err = error as Error;
      console.error("[AuthProvider] Sign out failed:", err);
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

  const value = useMemo(() => {
    console.log("[AuthProvider] Context value:", { hasSession: !!session, hasUser: !!user, loading, isOfflineMode });
    return {
      session,
      user,
      loading,
      isOfflineMode,
      signIn,
      signUp,
      signOut,
      updateProfile,
    };
  }, [session, user, loading, isOfflineMode, signIn, signUp, signOut, updateProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
