import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env, validateEnvironment } from '@/config/env';
import { Database } from '@/types/database.types';

let supabaseClient: SupabaseClient<Database> | null = null;

export const getSupabaseClient = (): SupabaseClient<Database> => {
  if (supabaseClient) {
    return supabaseClient;
  }

  const { isValid, missingKeys } = validateEnvironment();

  if (!isValid) {
    console.warn(
      `[Supabase] Running with unconfigured environment variables: ${missingKeys.join(
        ', '
      )}. Please configure .env to enable database connectivity.`
    );
    // Provide a dummy fallback client structure to avoid hard crashes during early setup/build
    supabaseClient = createClient<Database>(
      env.supabaseUrl || 'https://placeholder.supabase.co',
      env.supabaseAnonKey || 'placeholder-anon-key',
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      }
    );
    return supabaseClient;
  }

  supabaseClient = createClient<Database>(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return supabaseClient;
};

export const supabase = getSupabaseClient();
