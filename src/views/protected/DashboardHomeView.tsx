import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { ROLE_LABELS } from '@/config/constants';
import { DemoWorkspaceModal, DemoRoleProfile } from '@/components/auth/DemoWorkspaceModal';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Info,
  CheckCircle2
} from 'lucide-react';

export const DashboardHomeView: React.FC = () => {
  const { user, profile, isDemoPreview, loginAsDemoRole } = useAuth();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const role = profile?.role || 'FARMER';
  const roleLabel = ROLE_LABELS[role] || role;

  const getRoleResponsibilities = (userRole: string): { title: string; items: string[] } => {
    switch (userRole) {
      case 'FARMER':
        return {
          title: 'Agricultural Producer Operational Scope',
          items: [
            'Record initial crop harvest with crop variety, quantity, and harvest timestamp.',
            'Generate traceable origin batch code with geo-coordinates.',
            'Log dispatch handoff to Mandi aggregator or direct processor.',
          ],
        };
      case 'MANDI':
        return {
          title: 'APMC Mandi Aggregator Operational Scope',
          items: [
            'Scan farmer batch QR codes to acknowledge inbound receipt.',
            'Aggregate multiple farmer lots into consolidated commodity batches (Merge operation).',
            'Log storage weighment, mandi auction transfers, and dispatch to processors.',
          ],
        };
      case 'WAREHOUSE':
        return {
          title: 'Storage & Cold Chain Operational Scope',
          items: [
            'Log warehouse receiving and storage bin assignment.',
            'Monitor storage ambient and refrigeration conditions (Temperature/Humidity).',
            'Record outbound dispatch staging to distributors and factories.',
          ],
        };
      case 'PROCESSOR':
        return {
          title: 'Primary Food Processor Operational Scope',
          items: [
            'Receive aggregated raw produce (e.g. Wheat lots from Mandi).',
            'Execute transformation operations (e.g. Milling Wheat into Maida batches).',
            'Preserve ingredient-to-product lineage edges and loss/waste accounting.',
          ],
        };
      case 'FACTORY':
        return {
          title: 'Packaged Food Manufacturing Operational Scope',
          items: [
            'Receive multiple processed ingredient inputs (Maida, Sugar, Oil, Milk Powder).',
            'Record production runs (e.g. Biscuit manufacturing) linking all parent ingredient batches.',
            'Generate unit consumer packaging batches with public verification QR codes.',
          ],
        };
      case 'DISTRIBUTOR':
        return {
          title: 'Regional FMCG Distributor Operational Scope',
          items: [
            'Receive factory finished-goods shipments with batch manifest verification.',
            'Split wholesale pallets into regional retail shipments (Split operation).',
            'Record logistics dispatch to retail store networks.',
          ],
        };
      case 'TRANSPORTER':
        return {
          title: 'Logistics & Fleet Transport Operational Scope',
          items: [
            'Initiate transit leg custody transfers (Transport Start).',
            'Log highway checkpoint scans and transit conditions.',
            'Confirm destination handoff to retailer or warehouse.',
          ],
        };
      case 'RETAILER':
        return {
          title: 'Retail Store & Supermarket Operational Scope',
          items: [
            'Acknowledge retail store receiving and verify shelf-life / expiry dates.',
            'Display verified batch provenance on retail shelf displays.',
            'Quarantine affected batches immediately upon recall notification.',
          ],
        };
      case 'AUTHORITY':
        return {
          title: 'Food Safety Authority & Regulatory Scope',
          items: [
            'Inspect complete end-to-end supply-chain graph for any food batch.',
            'Execute trace-back (identifying farm origins) and trace-forward (identifying all downstream derivative products).',
            'Issue targeted recalls pinpointing exact affected retail inventories.',
          ],
        };
      case 'ADMIN':
      default:
        return {
          title: 'System Administration & Governance Scope',
          items: [
            'Manage stakeholder organizations, licenses, and verified facilities.',
            'Oversee system-wide cryptographic audit logs and event immutability.',
            'Configure alert thresholds and system health parameters.',
          ],
        };
    }
  };

  const responsibilities = getRoleResponsibilities(role);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Banner with Role Identity */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="status" statusKey={role} size="md">
              {roleLabel}
            </Badge>
            {isDemoPreview && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                <Sparkles className="w-3 h-3" /> Phase 1 Demo Mode
              </span>
            )}
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {profile?.full_name || user?.email}
          </h1>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>{profile?.organization?.name || 'Assigned Organization'}</span>
          </div>
        </div>

        {isDemoPreview && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDemoModalOpen(true)}
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-brand-600" />}
          >
            Switch Demo Role
          </Button>
        )}
      </div>

      {/* Role Operational Scope Card */}
      <Card variant="glass" className="border-emerald-200/80 shadow-sm">
        <div className="flex items-start gap-3.5 mb-4">
          <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl shrink-0 mt-0.5">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {responsibilities.title}
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Authorized supply chain responsibilities as defined in the master specification (Brain V2).
            </p>
          </div>
        </div>

        <div className="space-y-2.5 pt-2 border-t border-slate-100">
          {responsibilities.items.map((item, index) => (
            <div key={index} className="flex items-start gap-2.5 text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Phase Roadmap Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="default" className="p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700 mb-2">
            <ShieldCheck className="w-4 h-4" />
            Current Phase Status
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">
            Phase 1: Authentication & Role Shell
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Frontend login experience, role-aware routing boundaries, and UI previews are active. 
            Real Supabase authentication policies are prepared for Phase 2.
          </p>
        </Card>

        <Card variant="default" className="p-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            <Info className="w-4 h-4 text-slate-400" />
            Next Build Slices
          </div>
          <h3 className="font-bold text-slate-900 text-sm mb-1">
            Phase 2 → Phase 3 Core Slices
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Phase 2: Supabase Auth & RLS policies → Phase 3: Real batch creation & Supabase persistence → Phase 4: Event logging.
          </p>
        </Card>
      </div>

      {/* Demo Workspace Modal */}
      <DemoWorkspaceModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectRole={(roleProfile: DemoRoleProfile) => {
          loginAsDemoRole(roleProfile);
        }}
      />
    </div>
  );
};
