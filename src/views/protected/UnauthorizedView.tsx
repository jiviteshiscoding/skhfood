import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { ROUTE_PATHS } from '@/routes/route-paths';

export const UnauthorizedView: React.FC = () => {
  return (
    <div className="min-h-full flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full">
        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Restricted</h2>
        <p className="text-sm text-slate-600 mb-6">
          Your current user role does not possess the permissions required to view this module.
        </p>
        <Link to={ROUTE_PATHS.DASHBOARD}>
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};
