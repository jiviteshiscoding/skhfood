import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { ROLE_LABELS } from '@/config/constants';
import { LayoutDashboard, Shield, AlertCircle } from 'lucide-react';

export const DashboardHomeView: React.FC = () => {
  const { user, profile } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Stakeholder Dashboard</h1>
          <p className="text-sm text-slate-600">
            Welcome back, {profile?.full_name || user?.email}
          </p>
        </div>
        {profile?.role && (
          <Badge variant="success" size="md">
            {ROLE_LABELS[profile.role] || profile.role}
          </Badge>
        )}
      </div>

      <Card variant="glass" className="border-brand-200">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Phase 0 Protected Shell Active</h3>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              This is the foundational authenticated layout. In upcoming phases, this dashboard will 
              render role-specific modules (Farmer batch creation, Mandi receiving, Processor transformations, 
              Distributor handoffs, Retail stock receipt, and Authority recall controls).
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="default">
          <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-brand-600" />
            Security & Session
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Session validated via Supabase Auth client singleton with protected route guards.
          </p>
        </Card>

        <Card variant="default">
          <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            Upcoming Slices
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Next steps: Phase 1 (Login frontend) → Phase 2 (Supabase Auth & Roles) → Phase 3 (Batch Core).
          </p>
        </Card>
      </div>
    </div>
  );
};
