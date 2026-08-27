import { BaseService } from './base.service';
import { supabase } from '@/lib/supabase';
import { Result } from '@/types/common';
import { Profile } from '@/types/auth';

export class AuthService extends BaseService {
  /**
   * Fetch user profile by Auth user ID
   */
  async getProfile(userId: string): Promise<Result<Profile>> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*, organization:organizations(*)')
        .eq('user_id', userId)
        .single();

      if (error) {
        return this.handleError<Profile>(error, 'Failed to fetch user profile.');
      }

      return this.handleSuccess<Profile>(data as unknown as Profile);
    } catch (err) {
      return this.handleError<Profile>(err, 'Unexpected error fetching profile.');
    }
  }

  /**
   * Signs out current user session
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
