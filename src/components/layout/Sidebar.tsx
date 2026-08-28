import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from '@/routes/route-paths';
import { useAuth } from '@/context/AuthContext';
import { ROLE_LABELS } from '@/config/constants';
import { 
  LayoutDashboard, 
  Boxes, 
  History, 
  GitFork, 
  AlertOctagon, 
  Settings,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const { profile } = useAuth();
  const role = profile?.role || 'FARMER';

  const allNavItems = [
    { to: ROUTE_PATHS.DASHBOARD, label: 'Role Workspace', icon: LayoutDashboard, roles: ['*'] },
    { to: ROUTE_PATHS.BATCHES, label: role === 'FARMER' ? 'My Harvest Batches' : 'Batch Inventory', icon: Boxes, roles: ['*'] },
    { to: ROUTE_PATHS.EVENTS, label: 'Supply Chain Events', icon: History, roles: ['*'] },
    { 
      to: ROUTE_PATHS.LINEAGE, 
      label: 'Lineage & Transforms', 
      icon: GitFork, 
      roles: ['PROCESSOR', 'FACTORY', 'MANDI', 'AUTHORITY', 'ADMIN'] 
    },
    { 
      to: ROUTE_PATHS.RECALLS, 
      label: 'Safety & Recalls', 
      icon: AlertOctagon, 
      roles: ['AUTHORITY', 'ADMIN', 'PROCESSOR', 'FACTORY', 'RETAILER'] 
    },
    { to: ROUTE_PATHS.SETTINGS, label: 'Organization Profile', icon: Settings, roles: ['*'] },
  ];

  const visibleNavItems = allNavItems.filter(
    (item) => item.roles.includes('*') || item.roles.includes(role)
  );

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col shrink-0 min-h-[calc(100vh-4rem)] p-4">
      {/* Active Organization Header */}
      <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
        <div className="flex items-center gap-2 text-slate-800 font-semibold text-xs mb-1">
          <Building2 className="w-3.5 h-3.5 text-brand-600 shrink-0" />
          <span className="truncate">{profile?.organization?.name || 'Assigned Organization'}</span>
        </div>
        <div className="text-[11px] text-slate-500 font-medium truncate flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-slate-400" />
          <span>{ROLE_LABELS[role] || role}</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1 flex-1">
        <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Module Navigation
        </div>
        {visibleNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Scope Footer */}
      <div className="mt-auto p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-500">
        <div className="flex items-center justify-between font-semibold text-slate-700 mb-0.5">
          <span>Phase 1 Scope</span>
          <span className="text-[10px] bg-brand-100 text-brand-800 px-1.5 py-0.2 rounded font-mono">UI Shell</span>
        </div>
        <p className="text-[10px] text-slate-500 leading-relaxed">
          Full batch, event, and lineage logic activates in Phase 3+.
        </p>
      </div>
    </aside>
  );
};
