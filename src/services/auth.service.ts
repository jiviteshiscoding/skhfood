import { BaseService } from './base.service';
import { supabase } from '@/lib/supabase';
import { Result } from '@/types/common';
import { Profile, UserRole, Organization } from '@/types/auth';
import { User, Session } from '@supabase/supabase-js';

export interface SignUpParams {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  organizationId?: string;
  language?: string;
}

export class AuthService extends BaseService {
  /**
   * Real Supabase Authentication: Sign in with email and password
   */
  async signInWithPassword(email: string, password: string): Promise<Result<{ user: User; profile: Profile | null }>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return this.handleError(error, error.message || 'Invalid email or password.');
      }

      if (!data.user) {
        return this.handleError(new Error('User object missing from response'), 'Authentication failed.');
      }

      // Retrieve associated profile
      const profileResult = await this.getProfile(data.user.id);
      const profile = profileResult.success ? profileResult.data : null;

      return this.handleSuccess({
        user: data.user,
        profile,
      });
    } catch (err) {
      return this.handleError(err, 'An unexpected error occurred during sign in.');
    }
  }

  /**
   * Real Supabase Authentication: Register a new stakeholder user
   */
  async signUp(params: SignUpParams): Promise<Result<{ user: User | null; profile: Profile | null; session: Session | null }>> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: params.email.trim(),
        password: params.password,
        options: {
          data: {
            full_name: params.fullName.trim(),
            role: params.role,
            organization_id: params.organizationId,
            language: params.language || 'en',
          },
        },
      });

      if (error) {
        console.error('[AUTH SIGNUP ERROR]', {
          message: error.message,
          status: error.status,
          name: error.name,
          code: (error as any)?.code,
          raw: error,
        });
        return this.handleError(error, error.message || 'Failed to create user account.');
      }

      if (!data.user) {
        const missingUserErr = new Error('Sign up did not return a user');
        console.error('[AUTH SIGNUP ERROR]', missingUserErr);
        return this.handleError(missingUserErr, 'Account registration failed: No user returned.');
      }

      // Signup succeeded in creating user in auth.users
      let profile: Profile | null = null;
      try {
        const profileResult = await this.getProfile(data.user.id);
        if (profileResult.success && profileResult.data) {
          profile = profileResult.data;
        }
      } catch (profileErr) {
        console.warn('[AUTH SIGNUP] Profile lookup deferred after successful signup:', profileErr);
      }

      return this.handleSuccess({
        user: data.user,
        profile,
        session: data.session,
      });
    } catch (err) {
      console.error('[AUTH SIGNUP ERROR]', err);
      return this.handleError(err, err instanceof Error ? err.message : 'An unexpected error occurred during sign up.');
    }
  }

  /**
   * Fetch user profile joined with organization data
   */
  async getProfile(userId: string): Promise<Result<Profile>> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          user_id,
          full_name,
          phone,
          role,
          organization_id,
          language,
          created_at,
          updated_at,
          organization:organizations (
            id,
            name,
            type,
            license_number,
            address,
            city,
            state,
            country,
            lat,
            lng,
            created_at,
            updated_at
          )
        `)
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        return this.handleError<Profile>(error, 'Failed to fetch user profile.');
      }

      if (!data) {
        return this.handleError<Profile>(new Error('Profile not found'), 'User profile not found in database.');
      }

      return this.handleSuccess<Profile>(data as unknown as Profile);
    } catch (err) {
      return this.handleError<Profile>(err, 'Unexpected error fetching profile.');
    }
  }

  /**
   * Fetch all registered organizations (for signup dropdown / organization selection)
   */
  async getOrganizations(): Promise<Result<Organization[]>> {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        return this.handleError<Organization[]>(error, 'Failed to fetch organizations.');
      }

      return this.handleSuccess<Organization[]>((data || []) as unknown as Organization[]);
    } catch (err) {
      return this.handleError<Organization[]>(err, 'Unexpected error fetching organizations.');
    }
  }

  /**
   * Signs out current user session from Supabase Auth
   */
  async signOut(): Promise<Result<null>> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return this.handleError<null>(error, 'Failed to sign out.');
      }
      return this.handleSuccess<null>(null);
    } catch (err) {
      return this.handleError<null>(err, 'Unexpected error signing out.');
    }
  }
}

export const authService = new AuthService();
