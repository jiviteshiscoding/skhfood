import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types/auth';
import { authService, SignUpParams } from '@/services/auth.service';
import { DemoRoleProfile } from '@/components/auth/DemoWorkspaceModal';
import { Result } from '@/types/common';
import { validateEnvironment } from '@/config/env';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isDemoPreview: boolean;
  signIn: (email: string, password: string) => Promise<Result<{ user: User; profile: Profile | null }>>;
  signUp: (params: SignUpParams) => Promise<Result<{ user: User | null; profile: Profile | null; session: Session | null }>>;
  loginAsDemoRole: (roleProfile: DemoRoleProfile) => void;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_STORAGE_KEY = 'skh_farm_tracer_preview_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isDemoPreview, setIsDemoPreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Keep a ref to current user to allow refreshProfile to read latest user without recreating callbacks
  const userRef = useRef<User | null>(null);
  const isDemoPreviewRef = useRef<boolean>(false);

  useEffect(() => {
    userRef.current = user;
    isDemoPreviewRef.current = isDemoPreview;
  }, [user, isDemoPreview]);

  /**
   * Completely stable fetchUserProfile that takes targetUser directly.
   * Does NOT depend on [user] state, preventing infinite React effect re-runs.
   */
  const fetchUserProfile = useCallback(async (targetUser: User): Promise<Profile> => {
    try {
      const result = await authService.getProfile(targetUser.id);
      if (result.success && result.data) {
        setProfile(result.data);
        return result.data;
      }
    } catch (err) {
      console.warn('[AuthContext] Profile fetch from DB error, falling back to metadata:', err);
    }

    // Fallback profile object generated from metadata
    const fallbackProfile: Profile = {
      id: `profile-${targetUser.id}`,
      user_id: targetUser.id,
      full_name: targetUser.user_metadata?.full_name || targetUser.email?.split('@')[0] || 'Stakeholder',
      role: targetUser.user_metadata?.role || 'FARMER',
      organization_id: targetUser.user_metadata?.organization_id || undefined,
      language: targetUser.user_metadata?.language || 'en',
      created_at: new Date().toISOString(),
    };

    setProfile(fallbackProfile);
    return fallbackProfile;
  }, []);

  // Initialize Auth on Mount only (once)
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const { isValid } = validateEnvironment();

        if (isValid) {
          // 1. Check for active Supabase Auth session
          const { data: { session: currentSession } } = await supabase.auth.getSession();

          if (!isMounted) return;

          if (currentSession?.user) {
            setSession(currentSession);
            setUser(currentSession.user);
            setIsDemoPreview(false);
            // Fetch profile safely
            await fetchUserProfile(currentSession.user);
            setIsLoading(false);
            return;
          }
        }

        // 2. Check for temporary preview session stored in sessionStorage
        const storedPreview = sessionStorage.getItem(DEMO_STORAGE_KEY);
        if (storedPreview && isMounted) {
          try {
            const parsed = JSON.parse(storedPreview) as { user: User; profile: Profile };
            if (parsed.user && parsed.profile) {
              setUser(parsed.user);
              setProfile(parsed.profile);
              setIsDemoPreview(true);
            }
          } catch {
            sessionStorage.removeItem(DEMO_STORAGE_KEY);
          }
        }
      } catch (err) {
        console.error('[Auth Provider] Initialization error:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // 3. Listen for Supabase auth state changes without blocking the event dispatcher
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (!isMounted) return;

      if (event === 'SIGNED_OUT' || !newSession) {
        if (!sessionStorage.getItem(DEMO_STORAGE_KEY)) {
          setSession(null);
          setUser(null);
          setProfile(null);
          setIsDemoPreview(false);
        }
        setIsLoading(false);
      } else if (newSession?.user) {
        setSession(newSession);
        setUser(newSession.user);
        setIsDemoPreview(false);
        sessionStorage.removeItem(DEMO_STORAGE_KEY);
        setIsLoading(false);

        // Defer profile fetch asynchronously without awaiting in the callback
        fetchUserProfile(newSession.user).catch((err) => {
          console.warn('[AuthContext] Deferred profile hydration error:', err);
        });
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchUserProfile]);

  /**
   * Real Supabase sign in with credentials
   */
  const signIn = useCallback(async (email: string, password: string): Promise<Result<{ user: User; profile: Profile | null }>> => {
    setIsLoading(true);
    try {
      const result = await authService.signInWithPassword(email, password);

      if (result.success && result.data) {
        setUser(result.data.user);
        setProfile(result.data.profile);
        setIsDemoPreview(false);
        sessionStorage.removeItem(DEMO_STORAGE_KEY);
      }

      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Real Supabase registration
   */
  const signUp = useCallback(async (params: SignUpParams): Promise<Result<{ user: User | null; profile: Profile | null; session: Session | null }>> => {
    setIsLoading(true);
    try {
      const result = await authService.signUp(params);
      console.log('[AuthContext.signUp] authService.signUp returned:', result);

      if (result.success && result.data && result.data.user) {
        if (result.data.profile) {
          setUser(result.data.user);
          setProfile(result.data.profile);
        }
        setIsDemoPreview(false);
        sessionStorage.removeItem(DEMO_STORAGE_KEY);
      }

      return result;
    } catch (err) {
      console.error('[AUTH SIGNUP ERROR in AuthContext]', err);
      return {
        success: false,
        data: null,
        error: {
          message: err instanceof Error ? err.message : 'An unexpected error occurred during sign up.',
        },
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 1-Click Controlled Demo Role Preview
   */
  const loginAsDemoRole = useCallback((roleProfile: DemoRoleProfile) => {
    const dummyUser = {
      id: `demo-${roleProfile.role.toLowerCase()}-001`,
      email: roleProfile.email,
      app_metadata: {},
      user_metadata: { full_name: roleProfile.title, role: roleProfile.role },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as unknown as User;

    const dummyProfile: Profile = {
      id: `profile-${roleProfile.role.toLowerCase()}-001`,
      user_id: dummyUser.id,
      full_name: roleProfile.title,
      role: roleProfile.role,
      organization_id: `org-${roleProfile.role.toLowerCase()}-001`,
      organization: {
        id: `org-${roleProfile.role.toLowerCase()}-001`,
        name: roleProfile.organization,
        type: (roleProfile.tier === 'Origin' ? 'FARM' : roleProfile.tier === 'Aggregation' ? 'MANDI' : roleProfile.tier === 'Processing' ? 'PROCESSOR' : roleProfile.tier === 'Logistics' ? 'DISTRIBUTOR' : 'AUTHORITY'),
        created_at: new Date().toISOString(),
      },
      language: 'en',
      created_at: new Date().toISOString(),
    };

    setUser(dummyUser);
    setProfile(dummyProfile);
    setIsDemoPreview(true);

    sessionStorage.setItem(
      DEMO_STORAGE_KEY,
      JSON.stringify({ user: dummyUser, profile: dummyProfile })
    );
  }, []);

  /**
   * Sign Out from Supabase Auth & clear local preview state
   */
  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      sessionStorage.removeItem(DEMO_STORAGE_KEY);
      await authService.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsDemoPreview(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    const currentUser = userRef.current;
    if (currentUser && !isDemoPreviewRef.current) {
      await fetchUserProfile(currentUser);
    }
  }, [fetchUserProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        isDemoPreview,
        signIn,
        signUp,
        loginAsDemoRole,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
