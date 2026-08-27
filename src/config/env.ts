/**
 * Environment configuration helper with runtime validation
 */

interface EnvConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  appName: string;
  appEnv: string;
  isProduction: boolean;
  isDevelopment: boolean;
}

export const env: EnvConfig = {
  supabaseUrl: (import.meta.env.VITE_SUPABASE_URL as string) || '',
  supabaseAnonKey: (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '',
  appName: (import.meta.env.VITE_APP_NAME as string) || 'SKH Farm Tracer',
  appEnv: (import.meta.env.VITE_APP_ENV as string) || 'development',
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
};

export interface EnvValidationResult {
  isValid: boolean;
  missingKeys: string[];
}

export const validateEnvironment = (): EnvValidationResult => {
  const missingKeys: string[] = [];

  if (!env.supabaseUrl || env.supabaseUrl.includes('your-project-ref')) {
    missingKeys.push('VITE_SUPABASE_URL');
  }

  if (!env.supabaseAnonKey || env.supabaseAnonKey.includes('your-anon-key')) {
    missingKeys.push('VITE_SUPABASE_ANON_KEY');
  }

  return {
    isValid: missingKeys.length === 0,
    missingKeys,
  };
};
