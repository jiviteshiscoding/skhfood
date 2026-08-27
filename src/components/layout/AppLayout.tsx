import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { validateEnvironment } from '@/config/env';
import { Alert } from '@/components/ui/Alert';

export const AppLayout: React.FC = () => {
  const { isValid, missingKeys } = validateEnvironment();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      {!isValid && (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-4">
          <Alert variant="warning" title="Supabase Configuration Needed">
            Missing environment variables: <code className="font-mono">{missingKeys.join(', ')}</code>. 
            Please configure your <code className="font-mono">.env</code> file with valid Supabase project credentials.
          </Alert>
        </div>
      )}

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
