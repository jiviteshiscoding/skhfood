import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
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
  signUp: (params: SignUpParams) => Promise<Result<{ user: User | null; profile: Profile | null }>>;
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

  const fetchUserProfile = useCallback(async (userId: string) => {
    const result = await authService.getProfile(userId);
    if (result.success && result.data) {
      setProfile(result.data);
    } else {
      // If profile does not exist yet (e.g. metadata-only user), create default profile object
      setProfile({
        id: `profile-${userId}`,
        user_id: userId,
        full_name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Stakeholder',
        role: (user?.user_metadata?.role || 'FARMER'),
        language: user?.user_metadata?.language || 'en',
        created_at: new Date().toISOString(),
      });
    }
  }, [user]);

  // Initialize and persist sessions across page reloads
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
            await fetchUserProfile(currentSession.user.id);
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

    // 3. Listen for Supabase auth state changes (login, token refresh, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!isMounted) return;

      if (newSession?.user) {
        setSession(newSession);
        setUser(newSession.user);
        setIsDemoPreview(false);
        await fetchUserProfile(newSession.user.id);
        sessionStorage.removeItem(DEMO_STORAGE_KEY);
      } else if (!sessionStorage.getItem(DEMO_STORAGE_KEY)) {
        setSession(null);
        setUser(null);
        setProfile(null);
        setIsDemoPreview(false);
      }
      setIsLoading(false);
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
    const result = await authService.signInWithPassword(email, password);

    if (result.success && result.data) {
      setUser(result.data.user);
      setProfile(result.data.profile);
      setIsDemoPreview(false);
      sessionStorage.removeItem(DEMO_STORAGE_KEY);
    }

    setIsLoading(false);
    return result;
  }, []);

  /**
   * Real Supabase registration
   */
  const signUp = useCallback(async (params: SignUpParams): Promise<Result<{ user: User | null; profile: Profile | null }>> => {
    setIsLoading(true);
    const result = await authService.signUp(params);

    if (result.success && result.data && result.data.user) {
      setUser(result.data.user);
      setProfile(result.data.profile);
      setIsDemoPreview(false);
      sessionStorage.removeItem(DEMO_STORAGE_KEY);
    }

    setIsLoading(false);
    return result;
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
    sessionStorage.removeItem(DEMO_STORAGE_KEY);
    await authService.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setIsDemoPreview(false);
    setIsLoading(false);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user && !isDemoPreview) {
      await fetchUserProfile(user.id);
    }
  }, [user, isDemoPreview, fetchUserProfile]);

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
