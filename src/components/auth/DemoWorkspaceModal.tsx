import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { UserRole } from '@/types/auth';
import { 
  Sprout, 
  Store, 
  Warehouse, 
  Cog, 
  Factory, 
  Truck, 
  Navigation, 
  ShoppingBag, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export interface DemoRoleProfile {
  role: UserRole;
  title: string;
  tier: 'Origin' | 'Aggregation' | 'Processing' | 'Logistics' | 'Retail & Governance';
  organization: string;
  email: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const DEMO_ROLES: DemoRoleProfile[] = [
  // Tier 1: Origin
  {
    role: 'FARMER',
    title: 'Farmer / Producer',
    tier: 'Origin',
    organization: 'Kopargaon Organic Growers Co-op',
    email: 'farmer.rajesh@kopargaon-farm.org',
    description: 'Initial harvest recording, batch generation, and farm origin coordinates.',
    icon: Sprout,
  },
  // Tier 2: Aggregation & Storage
  {
    role: 'MANDI',
    title: 'Mandi / Aggregator',
    tier: 'Aggregation',
    organization: 'Kopargaon APMC Mandi Market',
    email: 'mandi.ops@kopargaon-apmc.gov.in',
    description: 'Farmer produce receipt, lot lotting, and auction aggregation.',
    icon: Store,
  },
  {
    role: 'WAREHOUSE',
    title: 'Warehouse / Cold Storage',
    tier: 'Aggregation',
    organization: 'Godavari Agri-Storage Facility #4',
    email: 'storage.manager@godavari-warehouses.com',
    description: 'Stock holding, temperature condition monitoring, and dispatch staging.',
    icon: Warehouse,
  },
  // Tier 3: Processing & Manufacturing
  {
    role: 'PROCESSOR',
    title: 'Flour Mill / Primary Processor',
    tier: 'Processing',
    organization: 'Sahyadri Flour & Grain Mills Ltd.',
    email: 'qa.mill@sahyadrimills.com',
    description: 'Wheat lot receiving, cleaning, milling into Maida batches.',
    icon: Cog,
  },
  {
    role: 'FACTORY',
    title: 'Packaged Food Factory',
    tier: 'Processing',
    organization: 'NutriBake Biscuit Manufacturing Unit 2',
    email: 'production.lead@nutribake.com',
    description: 'Multi-ingredient merging (Maida + Sugar + Oil), biscuit packing, and QR affixing.',
    icon: Factory,
  },
  // Tier 4: Logistics & Distribution
  {
    role: 'DISTRIBUTOR',
    title: 'Regional Distributor',
    tier: 'Logistics',
    organization: 'Western Maharashtra FMCG Distributors',
    email: 'dispatch@wm-distributors.com',
    description: 'Wholesale shipment receiving, route dispatch, and retail distribution.',
    icon: Truck,
  },
  {
    role: 'TRANSPORTER',
    title: 'Logistics & Fleet Carrier',
    tier: 'Logistics',
    organization: 'Kisan Express Cold Chain Logistics',
    email: 'fleet.control@kisanexpress.in',
    description: 'Transport leg start/stop, checkpoint scans, and transit cold-chain logs.',
    icon: Navigation,
  },
  // Tier 5: Retail & Safety Governance
  {
    role: 'RETAILER',
    title: 'Supermarket / Retail Store',
    tier: 'Retail & Governance',
    organization: 'Kopargaon Fresh Mart Superstore',
    email: 'inventory@freshmart-kopargaon.com',
    description: 'Retail inventory receiving, shelf-life verification, and consumer sales.',
    icon: ShoppingBag,
  },
  {
    role: 'AUTHORITY',
    title: 'Food Safety Inspector (FSSAI Aligned)',
    tier: 'Retail & Governance',
    organization: 'District Food Safety & Inspection Wing',
    email: 'inspector.sharma@fssai-audit.gov.in',
    description: 'Chain investigation, risk audits, forward trace-back, and targeted recall issuance.',
    icon: ShieldCheck,
  },
  {
    role: 'ADMIN',
    title: 'System Administrator',
    tier: 'Retail & Governance',
    organization: 'SKH Farm Tracer Central Operations',
    email: 'admin@farmtracer.skh.internal',
    description: 'System-wide stakeholder onboarding, organization registry, and audit logging.',
    icon: UserCheck,
  },
];

export interface DemoWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (roleProfile: DemoRoleProfile) => void;
}

export const DemoWorkspaceModal: React.FC<DemoWorkspaceModalProps> = ({
  isOpen,
  onClose,
  onSelectRole,
}) => {
  const tiers: DemoRoleProfile['tier'][] = [
    'Origin',
    'Aggregation',
    'Processing',
    'Logistics',
    'Retail & Governance',
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Explore Demo Workspace" maxWidth="xl">
      <div className="space-y-4">
        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3.5 flex items-start gap-3">
          <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-700 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs text-emerald-900 leading-relaxed">
            <span className="font-semibold block mb-0.5">Phase 1 Controlled UI Preview Mode</span>
            Select any supply-chain stakeholder role below to preview its specialized application shell, 
            navigation scopes, and UI layout. Real Supabase authentication & authorization policies will be activated in Phase 2.
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto pr-1 space-y-5">
          {tiers.map((tier) => {
            const rolesInTier = DEMO_ROLES.filter((r) => r.tier === tier);
            return (
              <div key={tier} className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {tier}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {rolesInTier.length} {rolesInTier.length === 1 ? 'Role' : 'Roles'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {rolesInTier.map((profile) => {
                    const Icon = profile.icon;
                    return (
                      <button
                        key={profile.role}
                        type="button"
                        onClick={() => {
                          onSelectRole(profile);
                          onClose();
                        }}
                        className="group flex flex-col p-3 rounded-xl border border-slate-200/90 bg-white hover:border-brand-500 hover:bg-brand-50/30 text-left transition-all shadow-sm hover:shadow active:scale-[0.99]"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-brand-100 group-hover:text-brand-700 text-slate-700 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-slate-900 group-hover:text-brand-800">
                              {profile.title}
                            </span>
                          </div>
                          <Badge variant="status" statusKey={profile.role === 'FARMER' ? 'HARVESTED' : profile.role === 'AUTHORITY' ? 'RECALLED' : 'PROCESSED'} size="sm">
                            {profile.role}
                          </Badge>
                        </div>

                        <div className="text-[11px] font-semibold text-slate-700 mb-0.5 truncate">
                          {profile.organization}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug line-clamp-2 mb-2 flex-1">
                          {profile.description}
                        </p>

                        <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 text-[10px] text-slate-400 group-hover:text-brand-700 font-medium">
                          <span className="truncate max-w-[180px] font-mono">{profile.email}</span>
                          <span className="inline-flex items-center gap-0.5 shrink-0 font-semibold">
                            Launch Shell <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
